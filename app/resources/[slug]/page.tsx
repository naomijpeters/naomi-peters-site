import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingButton } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { LeadMagnetInline } from "@/components/LeadMagnet";
import { Container } from "@/components/ui";
import { formatDate, getArticle, getReadableArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/structuredData";
import type { Block } from "@/lib/markdown";

export function generateStaticParams() {
  return getReadableArticles().map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
    image: article.image,
    eyebrow: article.categoryLabel,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated ?? article.date,
    noIndex: article.status !== "published",
  });
}

function BookCallBox() {
  return (
    <aside aria-label="Book a free call" className="my-12 border-y-2 border-ink py-8">
      <p className="display text-3xl">Want help applying this to your situation?</p>
      <p className="mt-2 text-ink-soft">A free 20-minute call to find your biggest bottleneck.</p>
      <div className="mt-5">
        <BookingButton kind="freeCall" placement="article_inline">
          Book a free call
        </BookingButton>
      </div>
    </aside>
  );
}

function renderBlock(block: Block, i: number, slug: string) {
  switch (block.type) {
    case "html": {
      const Tag = block.tag;
      return <Tag key={i} id={block.id} dangerouslySetInnerHTML={{ __html: block.html }} />;
    }
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag key={i}>
          {block.items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </Tag>
      );
    }
    case "hr":
      return <hr key={i} />;
    case "image":
      return (
        <figure key={i}>
          {/* eslint-disable-next-line @next/next/no-img-element -- author-supplied images of unknown size */}
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" className="w-full" />
          {block.alt && <figcaption className="mt-2 text-sm text-muted">{block.alt}</figcaption>}
        </figure>
      );
    case "starter-kit":
      return <LeadMagnetInline key={i} placement={`article_${slug}`} />;
    case "book-call":
      return <BookCallBox key={i} />;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const hasInlineKit = article.blocks.some((b) => b.type === "starter-kit");

  return (
    <article>
      <JsonLd
        data={[
          articleSchema(article),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: article.categoryLabel, path: `/resources/category/${article.category}` },
            { name: article.title, path: `/resources/${article.slug}` },
          ]),
        ]}
      />
      <header className="border-b rule py-14 sm:py-20">
        <Container narrow>
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/resources" className="hover:text-ink hover:underline">
              Resources
            </Link>{" "}
            /{" "}
            <Link href={`/resources/category/${article.category}`} className="text-terracotta hover:underline">
              {article.categoryLabel}
            </Link>
          </nav>
          <h1 className="display mt-6 text-5xl sm:text-6xl">{article.title}</h1>
          {article.description && <p className="mt-6 text-xl leading-relaxed text-ink-soft">{article.description}</p>}
          <p className="mt-6 text-sm text-muted">
            By {article.author}
            {article.date && (
              <>
                {" · "}
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </>
            )}
            {" · "}
            {article.readingMinutes} min read
          </p>
        </Container>
      </header>

      {article.image && (
        <Container className="mt-10 max-w-5xl">
          <div className="relative aspect-[1200/630] overflow-hidden">
            <Image src={article.image} alt={article.imageAlt ?? ""} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </div>
        </Container>
      )}

      <Container narrow className="py-14 sm:py-16">
        <div className="prose-article">{article.blocks.map((b, i) => renderBlock(b, i, article.slug))}</div>
        {!hasInlineKit && <LeadMagnetInline placement={`article_end_${article.slug}`} />}
        <BookCallBox />
        <p className="text-xs leading-relaxed text-muted">
          Educational content based on personal experience — not financial, tax or legal advice. Results vary.
        </p>
      </Container>
    </article>
  );
}
