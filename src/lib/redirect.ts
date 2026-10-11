/**
 * Only allow same-site relative redirects (prevents open-redirect attacks via
 * `?redirect=https://evil.example`).
 */
export function safeRedirect(value: string | string[] | undefined, fallback = "/"): string {
  const v = Array.isArray(value) ? value[0] : value;
  if (!v) return fallback;
  if (!v.startsWith("/") || v.startsWith("//") || v.startsWith("/\\")) return fallback;
  return v;
}

/** First value of a possibly-repeated query parameter. */
export function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
