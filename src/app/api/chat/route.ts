import Anthropic from "@anthropic-ai/sdk";
import { headers } from "next/headers";

import { chatSystemPrompt } from "@/server/chat/systemPrompt";
import { consumeChatRequest } from "@/server/chat/chat.rate-limit";

// 대화가 길어져도 비용이 무한히 늘지 않도록 최근 메시지만 모델에 보낸다.
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

type ChatRole = "user" | "assistant";
type ChatPayloadMessage = { role: ChatRole; content: string };

function isValidMessage(value: unknown): value is ChatPayloadMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as ChatPayloadMessage).role !== undefined &&
    ["user", "assistant"].includes((value as ChatPayloadMessage).role) &&
    typeof (value as ChatPayloadMessage).content === "string" &&
    (value as ChatPayloadMessage).content.trim().length > 0 &&
    (value as ChatPayloadMessage).content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  const requestHeaders = await headers();
  const clientAddress =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";

  if (!consumeChatRequest(clientAddress)) {
    return new Response("요청이 많습니다. 잠시 후 다시 시도해 주세요.", { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  if (
    !Array.isArray(rawMessages) ||
    rawMessages.length === 0 ||
    !rawMessages.every(isValidMessage)
  ) {
    return new Response("messages가 올바르지 않습니다.", { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      "챗봇이 아직 연결되지 않았어요. 서버에 ANTHROPIC_API_KEY를 설정해 주세요.",
      { status: 503 },
    );
  }

  // Claude API는 첫 메시지가 user여야 하므로, 자르고 난 뒤 assistant로
  // 시작하면 한 개 더 버려서 정렬을 맞춘다.
  let messages = (rawMessages as ChatPayloadMessage[]).slice(-MAX_HISTORY_MESSAGES);
  if (messages[0]?.role === "assistant") {
    messages = messages.slice(1);
  }
  const client = new Anthropic({ apiKey });

  const stream = client.messages.stream({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    system: [{ type: "text", text: chatSystemPrompt, cache_control: { type: "ephemeral" } }],
    messages,
  });

  const encoder = new TextEncoder();
  const responseStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (error) {
        console.error("[chat:stream-failed]", error);
        controller.enqueue(encoder.encode("답변을 가져오지 못했어요. 잠시 후 다시 시도해 주세요."));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(responseStream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
