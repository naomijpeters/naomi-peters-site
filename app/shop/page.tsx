import { notFound } from "next/navigation";
import { Container, PageHeader, buttonClasses } from "@/components/ui";
import { publishedProducts } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";

/**
 * Future digital products (templates, workshops, courses).
 * Returns 404 until at least one product in content/products.ts is published with a checkout URL.
 */

export const metadata = pageMetadata({
  title: "Shop: Templates, Workshops & Courses",
  description: "Templates, workshops and self-paced courses for making college pay off.",
  path: "/shop",
});

export default function ShopPage() {
  const products = publishedProducts();
  if (!products.length) notFound();
  return (
    <>
      <PageHeader eyebrow="Shop" title="Tools for making college pay off." />
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article key={p.id} className="flex flex-col border rule bg-paper p-7">
                <p className="label text-terracotta">{p.kind.replace("-", " ")}</p>
                <h2 className="display mt-3 text-3xl">{p.name}</h2>
                <p className="display mt-3 text-4xl">${p.price}</p>
                <p className="mt-4 text-ink-soft">{p.description}</p>
                <a href={p.checkoutUrl} rel="noopener" className={buttonClasses("primary", "md", "mt-auto self-start")}>
                  Buy now
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
