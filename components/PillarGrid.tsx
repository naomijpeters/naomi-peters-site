import Link from "next/link";
import { Arrow } from "@/components/ui";
import { pillars } from "@/content/pillars";

export function PillarGrid() {
  return (
    <ol className="grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((p, i) => (
        <li
          key={p.id}
          className={[
            "group relative flex flex-col border-b rule py-8 sm:pr-6 lg:border-b-0 lg:py-10",
            i % 2 === 1 ? "sm:border-l sm:pl-6" : "",
            i === 2 ? "lg:border-l lg:pl-6" : "",
          ].join(" ")}
        >
          <span className="display text-xl text-terracotta tabular-nums">{p.number}</span>
          <h3 className="display mt-3 text-4xl lg:text-[2.6rem]">{p.name}</h3>
          <p className="mt-4 font-medium text-ink">{p.short}</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{p.summary}</p>
          <p className="mt-5 text-xs leading-relaxed text-muted">{p.topics.slice(0, 5).join(" · ")}</p>
          <Link
            href={`/how-i-help#${p.id}`}
            className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-ink underline decoration-line underline-offset-[6px] hover:decoration-terracotta"
          >
            How we work on it<span className="sr-only">: {p.name}</span>
            <Arrow />
          </Link>
        </li>
      ))}
    </ol>
  );
}
