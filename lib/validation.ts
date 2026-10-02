export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function str(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export interface ApiResponse {
  ok: boolean;
  message: string;
  /** Present only outside production, to explain configuration problems honestly. */
  devHint?: string;
  fieldErrors?: Record<string, string>;
}

export const isProduction = process.env.NODE_ENV === "production";
