import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

interface PageMetaInput {
  title?: string;
  description?: string;
  path: string;
  noIndex?: boolean;
  /** Override the generated social card. */
  image?: string;
  eyebrow?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function ogImageUrl(title: string, eyebrow?: string) {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `/og?${params.toString()}`;
}

/** Consistent per-page metadata: canonical, OpenGraph, Twitter. */
export function pageMetadata({
  title,
  description = siteConfig.description,
  path,
  noIndex,
  image,
  eyebrow,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const imageUrl = image ?? ogImageUrl(title ?? "Get more out of college. Owe less for it.", eyebrow);
  const openGraphBase = {
    url: path,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: fullTitle,
    description,
    images: [{ url: imageUrl, width: 1200, height: 630, alt: title ?? siteConfig.name }],
  };
  return {
    title: title ? { absolute: fullTitle } : { absolute: siteConfig.title },
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph:
      type === "article"
        ? { ...openGraphBase, type: "article", publishedTime, modifiedTime, authors: [siteConfig.name] }
        : { ...openGraphBase, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
