"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { easeOut } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: `안녕하세요! ${brand.name}이 무엇을 하는 스튜디오인지, 어떤 프로젝트를 함께할 수 있는지 물어보세요.`,
};

const fallbackReply = "답변을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.";

function toApiMessages(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.id !== welcomeMessage.id)
    .map((message) => ({ role: message.role, content: message.text }));
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [draft, setDraft] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [messages, isReplying]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isReplying) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text };
    const assistantMessageId = crypto.randomUUID();
    const historyForRequest = toApiMessages([...messages, userMessage]);

    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantMessageId, role: "assistant", text: "" },
    ]);
    setDraft("");
    setIsReplying(true);

    const setAssistantText = (text: string) => {
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessageId ? { ...message, text } : message,
        ),
      );
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyForRequest }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`chat request failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setAssistantText(reply);
      }

      if (!reply) setAssistantText(fallbackReply);
    } catch (error) {
      console.error("[chat:request-failed]", error);
      setAssistantText(fallbackReply);
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <div className="fixed right-5 bottom-5 z-[70] sm:right-6 sm:bottom-6">
      <div
        ref={panelRef}
        role="dialog"
        aria-labelledby={titleId}
        aria-hidden={!open}
        className={`absolute right-0 bottom-[calc(100%+14px)] flex h-[min(70vh,560px)] w-[min(92vw,384px)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-navy-line bg-navy-paper shadow-[0_24px_64px_rgba(7,39,108,0.22)] transition-[opacity,transform,visibility] duration-300 motion-reduce:transition-none ${easeOut} ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-3 scale-95 opacity-0"
        }`}
      >
        <header className="bg-navy-deep px-5 py-4 text-white">
          <p id={titleId} className="text-[14px] leading-[1.2] font-bold">
            {brand.name} 어시스턴트
          </p>
          <p className="mt-0.5 text-[12px] text-white/70">보통 몇 초 안에 답해요</p>
        </header>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.map((message) => {
            // 스트리밍이 아직 첫 글자를 받기 전인 빈 assistant 메시지는
            // 아래 typing indicator로 대신 보여준다.
            if (message.role === "assistant" && message.text === "") return null;
            return (
              <p
                key={message.id}
                className={`w-fit max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-[1.55] ${
                  message.role === "user"
                    ? "ml-auto rounded-br-sm bg-navy-primary text-white"
                    : "rounded-bl-sm bg-navy-surface text-navy-ink"
                }`}
              >
                {message.text}
              </p>
            );
          })}
          {isReplying && messages.at(-1)?.text === "" ? (
            <p
              className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-navy-surface px-4 py-3"
              aria-label="답변 준비 중"
            >
              <span className="size-1.5 animate-bounce rounded-full bg-navy-muted [animation-delay:-0.2s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-navy-muted [animation-delay:-0.1s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-navy-muted" />
            </p>
          ) : null}
        </div>

        <form
          className="flex items-center gap-2 border-t border-navy-line p-3"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            className="min-h-11 flex-1 rounded-full border border-navy-line bg-white px-4 text-[14px] text-navy-ink placeholder:text-navy-muted focus:border-navy-primary focus:outline-none"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="궁금한 점을 입력해 주세요"
            aria-label="채팅 메시지 입력"
            disabled={isReplying}
          />
          <button
            className={`grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-navy-primary text-white transition-[transform,background-color] duration-200 not-disabled:hover:-translate-y-0.5 not-disabled:hover:bg-navy-deep disabled:cursor-default disabled:opacity-50 ${easeOut}`}
            type="submit"
            aria-label="메시지 보내기"
            disabled={!draft.trim() || isReplying}
          >
            <PaperAirplaneIcon className="size-4.5" aria-hidden="true" />
          </button>
        </form>
      </div>

      <button
        className={`grid size-14 cursor-pointer place-items-center rounded-full bg-navy-primary text-white shadow-[0_16px_40px_rgba(24,75,186,0.35)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-navy-deep ${easeOut}`}
        type="button"
        aria-expanded={open}
        aria-label={open ? "채팅 닫기" : "채팅 열기"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? (
          <XMarkIcon className="size-6" aria-hidden="true" />
        ) : (
          <ChatBubbleOvalLeftEllipsisIcon className="size-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
