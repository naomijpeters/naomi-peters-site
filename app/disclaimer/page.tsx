import { ContactLine, LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = pageMetadata({ title: "Disclaimer", path: "/disclaimer" });

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>
        <strong>{siteConfig.disclaimer}</strong>
      </p>
      <h2>Educational coaching</h2>
      <p>
        {siteConfig.legal.entityName} provides educational coaching, strategy and feedback related to college funding,
        opportunities, careers and planning. Content on this website, in sessions, workshops and materials is for
        educational and informational purposes only.
      </p>
      <h2>Not financial, investment, tax or legal advice</h2>
      <p>
        Naomi Peters holds a finance degree but is not a licensed financial adviser, investment adviser, broker, certified
        financial planner, tax professional, attorney, or financial aid administrator. Nothing provided constitutes
        investment, tax, legal, or individualized financial-planning advice. For decisions about loans, financial aid
        packages, taxes or investments, consult your school&apos;s financial aid office and an appropriately licensed
        professional.
      </p>
      <h2>No guarantees</h2>
      <p>
        Scholarship, grant, admission, internship, employment, fellowship, study-abroad, travel, financial, savings, and
        debt outcomes depend on many factors outside anyone&apos;s control. No specific result is promised or guaranteed.
      </p>
      <h2>Personal results</h2>
      <p>
        Statistics about Naomi&apos;s own college experience (including scholarships, grants, internships, fellowships,
        travel and graduating without student debt) describe her personal results. They are not typical or expected
        results for clients, and not every trip or experience described was funded by a scholarship or grant.
      </p>
      <h2>Student work</h2>
      <p>
        Coaching includes strategy, organization, editing and feedback. Students write and submit their own applications
        and are responsible for the accuracy and originality of everything they submit.
      </p>
      <h2>Third-party opportunities</h2>
      <p>
        References to scholarships, programs, employers, or organizations are informational. Eligibility, deadlines and
        terms are set by those third parties and may change; always verify details directly with the source.
      </p>
      <h2>Questions</h2>
      <p>
        Contact <ContactLine />.
      </p>
    </LegalPage>
  );
}
