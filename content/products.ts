/**
 * FUTURE PRODUCTS — templates, workshops, courses, membership.
 * Nothing here is shown on the site until `published: true`.
 * When at least one product is published, /shop goes live and appears in the sitemap.
 */
export type ProductKind = "template" | "workshop" | "course" | "membership" | "group-coaching";

export interface Product {
  id: string;
  name: string;
  kind: ProductKind;
  price: number;
  description: string;
  /** Stripe Payment Link (or PayPal) for this product. */
  checkoutUrl?: string;
  published: boolean;
}

export const products: Product[] = [
  { id: "scholarship-tracker", name: "Scholarship Tracker", kind: "template", price: 29, description: "", published: false },
  { id: "college-budget", name: "College Budget Template", kind: "template", price: 19, description: "", published: false },
  { id: "opportunity-calendar", name: "Opportunity Calendar", kind: "template", price: 29, description: "", published: false },
  { id: "roi-course", name: "The College ROI Method — Self-Paced", kind: "course", price: 199, description: "", published: false },
];

export const publishedProducts = () => products.filter((p) => p.published && p.checkoutUrl);
