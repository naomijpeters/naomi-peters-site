import { ContactLine, LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = pageMetadata({ title: "Privacy Policy", path: "/privacy" });

export default function PrivacyPage() {
  const name = siteConfig.legal.entityName;
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what information {name} collects through this website and services, and how it is used. We
        keep it simple: we collect what we need to respond to you and provide coaching, and we do not sell personal
        information.
      </p>
      <h2>Information you give us</h2>
      <ul>
        <li>
          <strong>Email signups</strong> (the College ROI Starter Kit): your email address and, optionally, first name.
        </li>
        <li>
          <strong>Contact and speaking forms:</strong> the details you enter, such as name, email, organization and
          message.
        </li>
        <li>
          <strong>Bookings:</strong> information you provide when scheduling through Calendly.
        </li>
        <li>
          <strong>Purchases:</strong> payments are processed by Stripe. We receive confirmation of payment and your
          name/email, but never your full card number.
        </li>
        <li>
          <strong>Coaching:</strong> information you choose to share in intake questionnaires and sessions.
        </li>
      </ul>
      <h2>Information collected automatically</h2>
      <p>
        {siteConfig.analyticsId
          ? "We use Google Analytics to understand how visitors use the site (pages viewed, approximate location, device type, and clicks on buttons such as booking or checkout). Google Analytics uses cookies. You can opt out with Google’s browser add-on or your browser’s privacy settings."
          : "This website does not currently use analytics cookies. If that changes, this policy will be updated."}
      </p>
      <h2>How we use information</h2>
      <ul>
        <li>To respond to inquiries and deliver booked or purchased services</li>
        <li>To send the resources you requested and occasional emails you can unsubscribe from at any time</li>
        <li>To improve the website and services</li>
        <li>To meet legal, tax and accounting obligations</li>
      </ul>
      <h2>Service providers</h2>
      <p>
        We rely on trusted providers to run the business — such as our website host, email-list provider, form processor,
        Calendly (scheduling) and Stripe (payments). They process information on our behalf under their own privacy
        policies.
      </p>
      <h2>Students under 18</h2>
      <p>
        Our services are not directed to children under 13, and we do not knowingly collect information from them.
        Students aged 13–17 should involve a parent or guardian, and paid services for minors must be purchased by a
        parent or guardian.
      </p>
      <h2>Your choices</h2>
      <p>
        You can unsubscribe from emails using the link in any message, and you may ask us to access, correct or delete
        your personal information by contacting <ContactLine />. Residents of some U.S. states and other countries may have
        additional rights, which we will honor as required by law.
      </p>
      <h2>Retention and security</h2>
      <p>
        We keep information only as long as needed for the purposes above or as required by law, and use reasonable
        safeguards to protect it. No method of transmission or storage is completely secure.
      </p>
      <h2>Changes and contact</h2>
      <p>
        We may update this policy; the date above shows the latest version. Questions: <ContactLine />.
      </p>
    </LegalPage>
  );
}
