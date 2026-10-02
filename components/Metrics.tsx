import { ledger, metrics } from "@/content/metrics";
import { cx } from "@/components/ui";

/** The founder-proof band shown directly under the homepage hero. */
export function MetricsStrip({ className }: { className?: string }) {
  const primary = metrics.filter((m) => m.primary);
  const secondary = metrics.filter((m) => !m.primary);
  return (
    <section aria-label="Naomi's college results" className={cx("bg-forest text-ivory", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ul className="grid grid-cols-2 border-b border-ivory/15 md:grid-cols-4">
          {primary.map((m, i) => (
            <li
              key={m.label}
              className={cx(
                "flex flex-col gap-1 py-7 sm:py-9",
                i % 2 === 1 && "border-l border-ivory/15 pl-5",
                i < 2 && "border-b border-ivory/15 md:border-b-0",
                i > 0 && "md:border-l md:border-ivory/15 md:pl-6",
              )}
            >
              <span className={cx("display text-5xl sm:text-6xl", m.value === "$0" ? "text-gold" : "text-ivory")}>
                {m.value}
              </span>
              <span className="label text-ivory/80">{m.label}</span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 py-5 text-sm text-ivory/85 sm:gap-x-6">
          {secondary.map((m, i) => (
            <li key={m.label} className="flex items-center gap-4 sm:gap-6">
              {i > 0 && (
                <span aria-hidden="true" className="text-gold">
                  •
                </span>
              )}
              <span>
                <span className="font-semibold text-ivory">{m.value}</span> {m.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Compact proof line for the mobile hero (first screen). */
export function MiniProof({ className }: { className?: string }) {
  const items = metrics.filter((m) => ["Scholarships", "Grants", "Student Debt"].includes(m.label));
  return (
    <ul aria-label="Highlights" className={cx("flex flex-wrap items-baseline gap-x-5 gap-y-1", className)}>
      {items.map((m) => (
        <li key={m.label} className="flex items-baseline gap-1.5">
          <span className={cx("display text-3xl", m.value === "$0" ? "text-terracotta" : "text-ink")}>{m.value}</span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">{m.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** "The ledger" — Naomi's proof points laid out like a balance sheet. */
export function Ledger() {
  return (
    <div className="border-t-2 border-ink bg-paper">
      <div className="flex items-baseline justify-between border-b rule px-5 py-4 sm:px-7">
        <p className="label text-ink">College, itemized</p>
        <p className="label text-muted">Naomi Peters</p>
      </div>
      <dl>
        {ledger.map((row) => (
          <div key={row.item} className="flex items-baseline gap-3 border-b rule px-5 py-3.5 sm:px-7">
            <dt className="text-ink-soft">{row.item}</dt>
            <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-line" />
            <dd className="font-semibold tabular-nums text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-baseline gap-3 border-b-4 border-double border-ink px-5 py-5 sm:px-7">
        <p className="font-semibold text-ink">Student debt at graduation</p>
        <span aria-hidden="true" className="flex-1" />
        <p className="display text-5xl text-terracotta">$0</p>
      </div>
      <p className="px-5 py-4 text-xs leading-relaxed text-muted sm:px-7">
        Naomi&apos;s personal results. They show what&apos;s possible, not what&apos;s promised — coaching helps you build a
        strategy for your own situation.
      </p>
    </div>
  );
}
