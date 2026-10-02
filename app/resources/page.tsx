import Link from "next/link";
import { ArticleGrid } from "@/components/ArticleCard";
import { LeadMagnetSection } from "@/components/LeadMagnet";
import { Container, PageHeader } from "@/components/ui";
import { categories, categorySlugs } from "@/content/categories";
import { getListedArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Resources: Scholarships, College Money & Career Strategy",
  description:
    "Practical articles on scholarships, college costs, internships, fellowships, study abroad and career direction from Naomi Peters.",
  path: "/resources",
  eyebrow: "Resources",
});

export default function ResourcesPage() {
  const articles = getListedArticles();
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title={
          <>
            Make college pay off. <em className="text-forest">Read the playbook.</em>
          </>
        }
        intro="Specific, practical writing on money, opportunity, career, experience and direction. The first articles are on the way."
      >
        <nav aria-label="Categories">
          <ul className="flex flex-wrap gap-2">
            {categorySlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/resources/category/${slug}`}
                  className="inline-block rounded-full border rule px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
                >
                  {categories[slug].label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>
      <section aria-label="Articles" className="py-14 sm:py-20">
        <Container>
          <ArticleGrid articles={articles} />
        </Container>
      </section>
      <LeadMagnetSection placement="resources" />
    </>
  );
}
