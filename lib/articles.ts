import fs from "node:fs";
import path from "node:path";
import { parseFrontMatter, parseMarkdown, type Block } from "@/lib/markdown";
import { categories, type CategorySlug } from "@/content/categories";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Articles live as Markdown files in /content/articles.
 * status: published   → live page, in sitemap, indexed
 * status: coming-soon → listed as "Coming soon" (no page)
 * status: draft       → visible only while running locally (`npm run dev`)
 * Files starting with "_" are ignored (templates).
 */

export type ArticleStatus = "published" | "coming-soon" | "draft";

export interface Article {
  slug: string;
  title: string;
  description: string;
  date?: string;
  updated?: string;
  category: CategorySlug;
  categoryLabel: string;
  author: string;
  status: ArticleStatus;
  image?: string;
  imageAlt?: string;
  featured: boolean;
  order: number;
  readingMinutes: number;
  blocks: Block[];
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const isDev = process.env.NODE_ENV === "development";

function load(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
      const { data, body } = parseFrontMatter(raw);
      const slug = file.replace(/\.md$/, "");
      const category = (data.category in categories ? data.category : "college-life") as CategorySlug;
      const status = (["published", "coming-soon", "draft"].includes(data.status)
        ? data.status
        : "draft") as ArticleStatus;
      const words = body.split(/\s+/).filter(Boolean).length;
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || undefined,
        updated: data.updated || undefined,
        category,
        categoryLabel: categories[category].label,
        author: data.author || siteConfig.name,
        status,
        image: data.image || undefined,
        imageAlt: data.imageAlt || undefined,
        featured: data.featured === "true",
        order: Number(data.order) || 999,
        readingMinutes: Math.max(1, Math.round(words / 230)),
        blocks: parseMarkdown(body),
      };
    });
}

function sortArticles(a: Article, b: Article) {
  if (a.date && b.date && a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.order - b.order;
}

/** Every article that should be listed (published + coming soon, plus drafts in dev). */
export function getListedArticles(): Article[] {
  return load()
    .filter((a) => a.status !== "draft" || isDev)
    .sort(sortArticles);
}

/** Articles that have their own page. */
export function getReadableArticles(): Article[] {
  return load()
    .filter((a) => a.status === "published" || (isDev && a.status === "draft"))
    .sort(sortArticles);
}

export function getPublishedArticles(): Article[] {
  return load().filter((a) => a.status === "published").sort(sortArticles);
}

export function getArticle(slug: string): Article | undefined {
  return getReadableArticles().find((a) => a.slug === slug);
}

export function hasPage(article: Article) {
  return article.status === "published" || (isDev && article.status === "draft");
}

export function formatDate(date?: string) {
  if (!date) return "";
  const d = new Date(`${date}T12:00:00Z`);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
