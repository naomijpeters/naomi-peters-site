import Link from "next/link";
import { Arrow, Container, SectionLabel, buttonClasses } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { serverConfig } from "@/lib/serverConfig";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = pageMetadata({ title: "Welcome", path: "/welcome", noIndex: true });

export default function WelcomePage() {
  const intake = serverConfig.intakeFormUrl;
  const scheduling = serverConfig.clientSchedulingUrl;

  const steps = [
    {
      title: "Check your email for your receipt.",
      body: "Stripe sends a payment receipt to the email you used at checkout. If you don’t see it, check spam or promotions.",
      action: null,
    },
    {
      title: "Complete the intake questionnaire.",
      body: "A few questions about where you are and what you want from college, so our first session starts with substance.",
      action: intake
        ? { href: intake, label: "Open the questionnaire", external: true }
        : { href: "/setup/intake", label: "Questionnaire link coming soon", external: false },
    },
    {
      title: "Schedule your first session.",
      body: "Pick a time that works. You’ll get a calendar confirmation once it’s booked.",
      action: scheduling
        ? { href: scheduling, label: "Choose a time", external: true }
        : { href: "/setup/client-scheduling", label: "Scheduling link coming soon", external: false },
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container narrow>
        <SectionLabel>Welcome</SectionLabel>
        <h1 className="display mt-6 text-5xl sm:text-7xl">
          You&apos;re in. <em className="text-forest">Here&apos;s what happens next.</em>
        </h1>
        <ol className="mt-14 border-t-2 border-ink">
          {steps.map((s, i) => (
            <li key={s.title} className="grid gap-4 border-b rule py-8 sm:grid-cols-[4rem_1fr]">
              <span className="display text-5xl text-terracotta">{i + 1}</span>
              <div>
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
                {s.action &&
                  (s.action.external ? (
                    <a href={s.action.href} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "md", "mt-5")}>
                      {s.action.label}
                      <Arrow />
                    </a>
                  ) : (
                    <Link href={s.action.href} className={buttonClasses("secondary", "md", "mt-5")}>
                      {s.action.label}
                      <Arrow />
                    </Link>
                  ))}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-ink-soft">
          Questions?{" "}
          {siteConfig.email ? (
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-ink underline underline-offset-4">
              {siteConfig.email}
            </a>
          ) : (
            <Link href="/contact" className="font-medium text-ink underline underline-offset-4">
              Send a message
            </Link>
          )}
          .
        </p>
      </Container>
    </section>
  );
}
