import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleGrid } from "@/components/ArticleCard";
import { BookingButton } from "@/components/CtaButtons";
import { LeadMagnetSection } from "@/components/LeadMagnet";
import { Container, PageHeader } from "@/components/ui";
import { categories, categorySlugs, type CategorySlug } from "@/content/categories";
import { getListedArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories[category as CategorySlug];
  if (!cat) return {};
  const hasPublished = getListedArticles().some((a) => a.category === category && a.status === "published");
  return pageMetadata({
    title: `${cat.label} Resources`,
    description: cat.description,
    path: `/resources/category/${category}`,
    eyebrow: "Resources",
    // Thin pages (only "coming soon" items) stay out of search results until real articles exist.
    noIndex: !hasPublished,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories[category as CategorySlug];
  if (!cat) notFound();
  const articles = getListedArticles().filter((a) => a.category === category);

  return (
    <>
      <PageHeader eyebrow={`Resources · ${cat.theme}`} title={cat.label} intro={cat.description}>
        <Link href="/resources" className="text-sm font-medium underline underline-offset-4">
          ← All resources
        </Link>
      </PageHeader>
      <section aria-label={`${cat.label} articles`} className="py-14 sm:py-20">
        <Container>
          {articles.length ? (
            <ArticleGrid articles={articles} />
          ) : (
            <div className="max-w-xl">
              <p className="display text-3xl">Articles in this category are coming soon.</p>
              <p className="mt-4 text-ink-soft">
                Get the free Starter Kit below to hear when they&apos;re published — or bring your question to a free call.
              </p>
              <div className="mt-6">
                <BookingButton kind="freeCall" placement={`category_${category}`}>
                  Book a free call
                </BookingButton>
              </div>
            </div>
          )}
        </Container>
      </section>
      <LeadMagnetSection placement={`category_${category}`} />
    </>
  );
}
