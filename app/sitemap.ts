import type { MetadataRoute } from "next";
import { categorySlugs } from "@/content/categories";
import { publishedProducts } from "@/content/products";
import { getPublishedArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/links";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/how-i-help", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/book", priority: 0.8, freq: "monthly" },
    { path: "/resources", priority: 0.7, freq: "weekly" },
    { path: "/speaking", priority: 0.6, freq: "monthly" },
    { path: "/gift", priority: 0.5, freq: "monthly" },
    { path: "/contact", priority: 0.5, freq: "yearly" },
    { path: "/disclaimer", priority: 0.2, freq: "yearly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];
  if (publishedProducts().length) staticRoutes.push({ path: "/shop", priority: 0.6, freq: "monthly" });

  const articles = getPublishedArticles();
  const activeCategories = categorySlugs.filter((c) => articles.some((a) => a.category === c));

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...activeCategories.map((c) => ({
      url: absoluteUrl(`/resources/category/${c}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/resources/${a.slug}`),
      lastModified: new Date(a.updated ?? a.date ?? now),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
