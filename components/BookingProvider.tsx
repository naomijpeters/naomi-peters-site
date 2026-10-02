"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

interface BookingState {
  url: string;
  title: string;
}

const BookingContext = createContext<{ open: (url: string, title: string) => void } | null>(null);

export function useBooking() {
  return useContext(BookingContext);
}

function embedUrl(url: string) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}embed_domain=${encodeURIComponent(window.location.hostname)}&embed_type=Inline&hide_gdpr_banner=1`;
}

/** One accessible <dialog> hosting the Calendly scheduler for every booking button. */
export function BookingProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [booking, setBooking] = useState<BookingState | null>(null);
  const [loaded, setLoaded] = useState(false);

  const open = useCallback((url: string, title: string) => {
    setLoaded(false);
    setBooking({ url, title });
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!booking || !dialog) return;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [booking]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(event.origin)) return;
      const data = event.data as { event?: string } | undefined;
      if (data?.event === "calendly.event_scheduled") track("booking_scheduled", { title: booking?.title ?? "" });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [booking]);

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="booking-title"
        onClose={() => setBooking(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto h-[min(92dvh,860px)] w-[min(96vw,1040px)] max-w-none overflow-hidden rounded-[4px] bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-[2px]"
      >
        {booking && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 border-b rule px-5 py-3.5">
              <p id="booking-title" className="display text-xl sm:text-2xl">
                {booking.title}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden text-xs font-medium text-muted underline underline-offset-4 hover:text-ink sm:inline"
                >
                  Open in new tab
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="label inline-flex h-10 items-center gap-2 px-2 text-ink hover:text-terracotta"
                >
                  Close
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 3l10 10M13 3L3 13" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative flex-1">
              {!loaded && (
                <p className="absolute inset-0 grid place-items-center text-sm text-muted" role="status">
                  Loading available times…
                </p>
              )}
              <iframe
                title={`Schedule: ${booking.title}`}
                src={embedUrl(booking.url)}
                onLoad={() => setLoaded(true)}
                className="relative h-full w-full border-0"
              />
            </div>
          </div>
        )}
      </dialog>
    </BookingContext.Provider>
  );
}
