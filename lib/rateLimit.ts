import { NextRequest } from "next/server";

// In-memory token-bucket-ish limiter. This is fine for a single-region Vercel
// deployment and low-volume forms; for multi-region or higher scale, swap the
// backing store for Upstash Redis / Vercel KV. The API surface stays the same.

type Entry = { count: number; resetAt: number };

declare global {
  // eslint-disable-next-line no-var
  var __ukcsaRateLimitStores: Map<string, Map<string, Entry>> | undefined;
}

const stores =
  global.__ukcsaRateLimitStores ?? new Map<string, Map<string, Entry>>();
global.__ukcsaRateLimitStores = stores;

function getStore(scope: string) {
  let store = stores.get(scope);
  if (!store) {
    store = new Map<string, Entry>();
    stores.set(scope, store);
  }
  return store;
}

export function clientIp(request: NextRequest | Request) {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") ?? "unknown";
}

export type RateLimitOptions = {
  scope: string;          // logical bucket, e.g. "contact" or "admin-login"
  windowMs: number;       // window size in ms
  max: number;            // allowed hits per window per key
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(
  key: string,
  { scope, windowMs, max }: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const store = getStore(scope);
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  if (current.count >= max) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: max - current.count,
    resetAt: current.resetAt
  };
}

// Cheap periodic cleanup so the in-memory map cannot grow unbounded on a
// long-lived warm Lambda. Runs at most once per minute.
let lastSweep = 0;
export function sweepRateLimits() {
  const now = Date.now();
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const store of stores.values()) {
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) store.delete(key);
    }
  }
}
