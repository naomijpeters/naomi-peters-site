"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useBooking } from "@/components/BookingProvider";
import { Arrow, buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui";
import { track, type ConversionEvent } from "@/lib/analytics";
import { bookingLink, bookingTitles, checkoutLink, paypalLink, type BookingKind, type CheckoutKind } from "@/lib/links";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  arrow?: boolean;
  /** Where the click happened, sent to analytics. */
  placement?: string;
}

const bookingEvents: Record<BookingKind, ConversionEvent> = {
  freeCall: "free_call_click",
  strategySession: "paid_session_click",
  fitCall: "free_call_click",
};

function isModifiedClick(e: MouseEvent) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

/** Opens Calendly in a modal when configured; otherwise links to the setup page. */
export function BookingButton({
  kind,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = true,
  placement = "unknown",
}: BaseProps & { kind: BookingKind }) {
  const booking = useBooking();
  const link = bookingLink(kind);
  const classes = className ?? buttonClasses(variant, size);
  const params = { booking_type: kind, placement, configured: link.configured };

  if (!link.configured) {
    return (
      <Link href={link.href} className={classes} onClick={() => track(bookingEvents[kind], params)}>
        {children}
        {arrow && <Arrow />}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      onClick={(e) => {
        track(bookingEvents[kind], params);
        if (!booking || isModifiedClick(e)) return;
        e.preventDefault();
        track("calendly_open", params);
        booking.open(link.href, bookingTitles[kind]);
      }}
    >
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

/** Sends the visitor to a Stripe-hosted checkout page (no card data touches this site). */
export function CheckoutButton({
  kind,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = true,
  placement = "unknown",
}: BaseProps & { kind: CheckoutKind }) {
  const link = checkoutLink(kind);
  const classes = className ?? buttonClasses(variant, size);
  const onClick = () => track("package_checkout_click", { product: kind, placement, configured: link.configured });

  if (!link.configured) {
    return (
      <Link href={link.href} className={classes} onClick={onClick}>
        {children}
        {arrow && <Arrow />}
      </Link>
    );
  }
  return (
    <a href={link.href} rel="noopener" className={classes} onClick={onClick}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

/** Optional PayPal alternative — renders nothing unless a PayPal URL is configured. */
export function PayPalLink({ kind, className }: { kind: CheckoutKind; className?: string }) {
  const href = paypalLink(kind);
  if (!href) return null;
  return (
    <a
      href={href}
      rel="noopener"
      className={className ?? "text-xs text-muted underline underline-offset-4 hover:text-ink"}
      onClick={() => track("package_checkout_click", { product: kind, processor: "paypal" })}
    >
      Or pay with PayPal
    </a>
  );
}
