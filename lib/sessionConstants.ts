// Edge-safe constants shared between middleware (Edge runtime) and Node-only
// auth helpers. Must NOT import anything from bcryptjs / mongoose / next-headers.

export const SESSION_COOKIE_NAME = "ukcsa_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
