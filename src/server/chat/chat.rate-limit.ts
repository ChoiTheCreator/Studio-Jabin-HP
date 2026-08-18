import "server-only";

import { createHash } from "node:crypto";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

// 문의 폼보다 대화가 오가는 특성상 창은 같고 허용 횟수만 넉넉하게 둔다.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;
const entries = new Map<string, RateLimitEntry>();

export function consumeChatRequest(identifier: string) {
  const now = Date.now();
  const key = createHash("sha256").update(identifier).digest("hex");

  if (entries.size > 1000) {
    for (const [entryKey, entry] of entries) {
      if (entry.resetAt <= now) entries.delete(entryKey);
    }
  }

  const current = entries.get(key);

  if (!current || current.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (current.count >= MAX_REQUESTS) return false;

  current.count += 1;
  return true;
}
