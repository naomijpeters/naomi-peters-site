import Link from "next/link";
import { ContactLine, LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = pageMetadata({ title: "Terms of Service", path: "/terms" });

export default function TermsPage() {
  const name = siteConfig.legal.entityName;
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms apply to this website and to coaching sessions, packages, workshops and materials provided by {name}{" "}
        (&quot;we&quot;, &quot;us&quot;). By using the website or purchasing services, you agree to them.
      </p>
      <h2>1. Services</h2>
      <p>
        Services are educational coaching as described on the <Link href="/services">services page</Link> and in the{" "}
        <Link href="/disclaimer">disclaimer</Link>. Coaching does not include writing applications or essays on a
        client&apos;s behalf, and is not financial, investment, tax or legal advice. No outcome is guaranteed.
      </p>
      <h2>2. Eligibility and minors</h2>
      <p>
        Services are intended for students aged 16 and older and for parents or guardians. If a client is under 18, a
        parent or legal guardian must agree to these terms and make any purchase on the student&apos;s behalf.
      </p>
      <h2>3. Booking, payment and pricing</h2>
      <p>
        Prices are listed in U.S. dollars on the services page. Scheduling is handled by Calendly and payments by Stripe
        (or another processor shown at checkout); their own terms also apply. We never receive or store full card
        numbers. Launch or promotional prices may change for future purchases but not for packages already paid.
      </p>
      <h2>4. Rescheduling and cancellations</h2>
      <p>
        Please reschedule or cancel at least 24 hours before a session using the link in your confirmation email.
        Sessions missed without notice may be forfeited. Package sessions should be used within a reasonable period
        agreed at the start of the engagement.
      </p>
      <h2>5. Refunds</h2>
      <p>
        If you are unhappy with a service, contact us promptly at <ContactLine /> and we will work with you in good faith.
        Fees for sessions that have already taken place are generally non-refundable. Unused package sessions may be
        refunded or credited at our discretion.
      </p>
      <h2>6. Client responsibilities</h2>
      <p>
        Clients are responsible for their own decisions, applications, deadlines and the accuracy of information they
        submit to schools, employers and scholarship providers.
      </p>
      <h2>7. Intellectual property</h2>
      <p>
        Website content, frameworks (including The College ROI Method™), templates and materials are owned by {name} and
        are provided for your personal, non-commercial use. Please don&apos;t redistribute or resell them.
      </p>
      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {name} is not liable for indirect or consequential losses, and total
        liability for any claim is limited to the amount you paid for the service giving rise to the claim.
      </p>
      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of {siteConfig.legal.state ?? "the state in which the business is registered"},
        without regard to conflict-of-law rules.
      </p>
      <h2>10. Changes and contact</h2>
      <p>
        We may update these terms; the date above shows the latest version. Questions: <ContactLine />.
      </p>
    </LegalPage>
  );
}
