"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BookingButton } from "@/components/CtaButtons";
import { mainNav } from "@/components/navigation";
import { Container, cx } from "@/components/ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 bg-ivory transition-[border-color] duration-200",
        "border-b",
        scrolled || open ? "border-line" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link href="/" className="group flex flex-col leading-none" aria-label="Naomi Peters — home">
          <span className="display text-[1.6rem] sm:text-[1.85rem]">Naomi Peters</span>
          <span className="mt-1 hidden text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted sm:block">
            More Opportunity. Less Debt.
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "text-sm font-medium transition-colors hover:text-terracotta",
                    isActive(item.href) ? "text-terracotta" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <BookingButton kind="freeCall" size="sm" placement="header">
              Book a free call
            </BookingButton>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3.5 w-6">
              <span
                className={cx(
                  "absolute left-0 h-px w-6 bg-ink transition-transform duration-200",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cx(
                  "absolute left-0 h-px w-6 bg-ink transition-transform duration-200",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ivory sm:top-20 lg:hidden"
      >
        <Container className="flex min-h-full flex-col py-8">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line border-y rule">
              {[{ label: "Home", href: "/" }, ...mainNav, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="display flex items-center justify-between py-4 text-3xl"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-lg text-muted">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <BookingButton kind="freeCall" size="lg" placement="mobile_menu">
              Book a free 20-minute call
            </BookingButton>
            <Link
              href="/#starter-kit"
              className="py-2 text-center text-sm font-medium underline underline-offset-4"
              onClick={() => setOpen(false)}
            >
              Get the free College ROI Starter Kit
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
