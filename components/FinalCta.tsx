import Link from "next/link";
import { BookingButton } from "@/components/CtaButtons";
import { Container } from "@/components/ui";

export function FinalCta({
  title = "Your College Years Are Too Expensive to Leave to Chance.",
  body = "Let’s identify where you are, what you’re trying to accomplish, and the opportunities you may be missing.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="final-cta-title" className="bg-ivory">
      <Container className="py-20 text-center sm:py-32">
        <p className="label text-terracotta">More opportunity. Less debt.</p>
        <h2 id="final-cta-title" className="display mx-auto mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">{body}</p>
        <div className="mt-10 flex flex-col items-center gap-5">
          <BookingButton kind="freeCall" size="lg" placement="final_cta">
            Book your free 20-minute call
          </BookingButton>
          <Link href="/services" className="text-sm font-medium underline decoration-line underline-offset-[6px] hover:decoration-terracotta">
            Ready now? See services &amp; pricing
          </Link>
        </div>
      </Container>
    </section>
  );
}
