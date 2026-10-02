import { siteConfig } from "@/lib/siteConfig";
import { absoluteUrl, configuredSocials } from "@/lib/links";
import { services } from "@/content/services";
import type { Article } from "@/lib/articles";

const personId = `${siteConfig.url}/#naomi-peters`;
const serviceId = `${siteConfig.url}/#practice`;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "College Money, Opportunity & Career Strategist",
    description:
      "Naomi Peters helps high-school and college students build a strategy for funding college, finding opportunities, gaining experience, and graduating with direction.",
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of St. Thomas" },
    knowsAbout: [
      "Scholarships",
      "College funding strategy",
      "Internships",
      "Fellowships",
      "Study abroad",
      "Career planning",
      "Student budgeting",
    ],
    ...(configuredSocials().length ? { sameAs: configuredSocials().map((s) => s.href) } : {}),
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": serviceId,
    name: `${siteConfig.name} — ${siteConfig.descriptor}`,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    founder: { "@id": personId },
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    priceRange: "$0–$1,000",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "College ROI coaching",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        name: s.name,
        description: s.summary,
        price: s.price,
        priceCurrency: "USD",
        url: absoluteUrl(`/services#${s.id}`),
      })),
    },
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: { "@type": "Person", name: article.author, url: absoluteUrl("/about") },
    publisher: { "@id": personId },
    mainEntityOfPage: absoluteUrl(`/resources/${article.slug}`),
    articleSection: article.categoryLabel,
    image: article.image ? absoluteUrl(article.image) : absoluteUrl(`/og?title=${encodeURIComponent(article.title)}`),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
