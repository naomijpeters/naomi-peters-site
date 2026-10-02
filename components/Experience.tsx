import { experience } from "@/content/experience";

/** Organizations Naomi has worked with, as a typographic list grouped by field. */
export function ExperienceList() {
  return (
    <div className="grid gap-12 md:grid-cols-3 md:gap-10">
      {experience.map((group) => (
        <div key={group.title}>
          <h3 className="label border-b-2 border-ink pb-3 text-ink">{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={`${item.org}-${item.role ?? item.place ?? ""}`} className="border-b rule py-4">
                <p className="display text-[1.75rem] leading-tight">{item.org}</p>
                {(item.role || item.place) && (
                  <p className="mt-1 text-sm text-ink-soft">{[item.role, item.place].filter(Boolean).join(" · ")}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
