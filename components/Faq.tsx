import type { FaqItem } from "@/content/faq";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t-2 border-ink">
      {items.map((item) => (
        <details key={item.question} className="group border-b rule">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <span aria-hidden="true" className="mt-0.5 text-2xl leading-none text-terracotta transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
