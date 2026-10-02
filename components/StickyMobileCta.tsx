"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookingButton } from "@/components/CtaButtons";
import { cx } from "@/components/ui";

const HIDDEN_ON = ["/book", "/welcome", "/setup", "/contact"];

/** A slim bottom bar on phones, shown after the hero scrolls away. */
export function StickyMobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setVisible(window.scrollY > 640 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cx(
        "fixed inset-x-0 bottom-0 z-30 border-t rule bg-ivory/95 px-4 py-3 backdrop-blur-sm transition-transform duration-300 sm:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center gap-3">
        <p className="flex-1 text-xs leading-tight text-ink-soft">
          <span className="block font-semibold text-ink">Free 20-minute call</span>
          Find your biggest bottleneck.
        </p>
        <BookingButton kind="freeCall" size="sm" placement="sticky_mobile">
          Book free
        </BookingButton>
      </div>
    </div>
  );
}
