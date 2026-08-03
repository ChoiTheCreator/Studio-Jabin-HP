import "server-only";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const entries = new Map<string, RateLimitEntry>();

export function consumeInquiryRequest(identifier: string | null) {
  if (!identifier) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const now = Date.now();

  if (entries.size > 1000) {
    for (const [key, entry] of entries) {
      if (entry.resetAt <= now) entries.delete(key);
    }
  }

  const current = entries.get(identifier);

  if (!current || current.resetAt <= now) {
    entries.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
