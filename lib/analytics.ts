/**
 * GA4 conversion tracking. Safe no-op when NEXT_PUBLIC_GA_ID is not set
 * (the gtag script is never loaded in that case).
 */

export type ConversionEvent =
  | "free_call_click"
  | "paid_session_click"
  | "package_checkout_click"
  | "lead_magnet_signup"
  | "speaking_inquiry"
  | "calendly_open"
  | "booking_scheduled"
  | "contact_submit";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: ConversionEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
