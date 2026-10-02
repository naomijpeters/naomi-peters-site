import Link from "next/link";
import { BookingButton } from "@/components/CtaButtons";
import { Arrow, Container, buttonClasses } from "@/components/ui";

export const metadata = { title: "Page not found | Naomi Peters", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container narrow>
        <p className="label text-terracotta">404</p>
        <h1 className="display mt-6 text-5xl sm:text-7xl">This page isn&apos;t here.</h1>
        <p className="mt-6 text-lg text-ink-soft">
          The link may be outdated, or the page may have moved. Here are a few good places to go instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link href="/" className={buttonClasses("secondary")}>
            Home
            <Arrow />
          </Link>
          <Link href="/services" className={buttonClasses("ghost")}>
            Services &amp; pricing
            <Arrow />
          </Link>
          <BookingButton kind="freeCall" variant="ghost" placement="404">
            Book a free call
          </BookingButton>
        </div>
      </Container>
    </section>
  );
}
