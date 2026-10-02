import Link from "next/link";
import { cx } from "@/components/ui";
import { formatDate, hasPage, type Article } from "@/lib/articles";

export function ArticleCard({ article, index }: { article: Article; index?: number }) {
  const linked = hasPage(article);
  const body = (
    <>
      <div className="flex items-center gap-3 text-xs">
        {index !== undefined && <span className="tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>}
        <span className="label text-[0.66rem] text-terracotta">{article.categoryLabel}</span>
        {article.status === "coming-soon" && (
          <span className="label rounded-full border rule px-2 py-0.5 text-[0.6rem] text-muted">Coming soon</span>
        )}
        {article.status === "draft" && (
          <span className="label rounded-full bg-gold/30 px-2 py-0.5 text-[0.6rem] text-ink">Draft · dev only</span>
        )}
      </div>
      <h3 className={cx("display mt-3 text-[1.65rem] leading-[1.1]", linked && "group-hover:text-terracotta")}>
        {article.title}
      </h3>
      {article.description && <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{article.description}</p>}
      {linked && article.date && (
        <p className="mt-4 text-xs text-muted">
          {formatDate(article.date)} · {article.readingMinutes} min read
        </p>
      )}
    </>
  );

  return (
    <article className="border-t rule py-7">
      {linked ? (
        <Link href={`/resources/${article.slug}`} className="group block">
          {body}
        </Link>
      ) : (
        body
      )}
    </article>
  );
}

export function ArticleGrid({ articles, numbered }: { articles: Article[]; numbered?: boolean }) {
  return (
    <div className="grid gap-x-12 md:grid-cols-2">
      {articles.map((a, i) => (
        <ArticleCard key={a.slug} article={a} index={numbered ? i : undefined} />
      ))}
    </div>
  );
}
