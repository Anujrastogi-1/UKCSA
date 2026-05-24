import { NextResponse } from "next/server";

// Consistent JSON response shape across every API route. Frontends can rely on
// { ok, data, error } without per-endpoint guesswork.

export type ApiSuccess<T> = { ok: true; data: T };
export type ApiError = {
  ok: false;
  error: { code: string; message: string; details?: unknown };
};

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>({ ok: true, data }, { status });
}

export function fail(
  status: number,
  code: string,
  message: string,
  details?: unknown
) {
  const body: ApiError = { ok: false, error: { code, message } };
  if (details !== undefined) body.error.details = details;
  return NextResponse.json<ApiError>(body, { status });
}

// Common helpers so codes stay consistent.
export const errors = {
  badRequest: (msg = "Invalid request.", details?: unknown) =>
    fail(400, "BAD_REQUEST", msg, details),
  unauthorized: (msg = "Authentication required.") =>
    fail(401, "UNAUTHORIZED", msg),
  forbidden: (msg = "Forbidden.") => fail(403, "FORBIDDEN", msg),
  notFound: (msg = "Not found.") => fail(404, "NOT_FOUND", msg),
  conflict: (msg = "Resource conflict.") => fail(409, "CONFLICT", msg),
  tooLarge: (msg = "Request body is too large.") => fail(413, "PAYLOAD_TOO_LARGE", msg),
  unsupportedMedia: (msg = "Request must be sent as JSON.") =>
    fail(415, "UNSUPPORTED_MEDIA_TYPE", msg),
  validation: (errors: Record<string, string>, msg = "Validation failed.") =>
    fail(422, "VALIDATION_FAILED", msg, errors),
  rateLimited: (msg = "Too many requests. Please slow down.") =>
    fail(429, "RATE_LIMITED", msg),
  server: (msg = "Something went wrong on our side.") =>
    fail(500, "INTERNAL_ERROR", msg),
  badGateway: (msg = "Upstream service unavailable.") =>
    fail(502, "BAD_GATEWAY", msg)
};
