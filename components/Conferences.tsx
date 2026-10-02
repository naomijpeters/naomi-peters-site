import Image from "next/image";
import { conferences, type ConferencePhoto } from "@/content/conferences";
import { cx } from "@/components/ui";

/**
 * Desktop column span for each photo so rows always fill:
 * 1–3 photos sit side by side; 4+ use a mosaic (first photo 2×2, then 1×1),
 * and any photos left over in the last row stretch to fill it.
 */
function layout(count: number) {
  if (count <= 3) return { grid: count === 1 ? "lg:grid-cols-1" : count === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3", spans: [] as string[] };
  const spans: string[] = Array.from({ length: count }, (_, i) => (i === 0 ? "col-span-2 lg:row-span-2" : ""));
  const leftover = (count - 5) % 4;
  if (count > 5 && leftover > 0) {
    const wide = { 1: ["lg:col-span-4"], 2: ["lg:col-span-2", "lg:col-span-2"], 3: ["lg:col-span-2", "", ""] }[leftover] ?? [];
    wide.forEach((span, j) => (spans[count - leftover + j] = span));
  }
  return { grid: "lg:grid-cols-4", spans };
}

function Photo({ photo, large, sizes }: { photo: ConferencePhoto; large: boolean; sizes: string }) {
  return (
    <figure className="flex h-full flex-col">
      <div className={cx("relative overflow-hidden", large ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]")}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption className="mt-2 text-sm text-ink-soft">{photo.caption}</figcaption>
    </figure>
  );
}

export function ConferenceList() {
  return (
    <div className="space-y-16">
      {conferences.map((conf) => {
        const photos = conf.photos ?? [];
        const { grid, spans } = layout(photos.length);
        const mosaic = photos.length > 3;
        const id = `conf-${conf.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        return (
          <article key={conf.name} aria-labelledby={id} className="border-t-2 border-ink pt-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 id={id} className="display text-4xl">
                {conf.name}
              </h3>
              <p className="label text-terracotta">{[conf.field, conf.place].filter(Boolean).join(" · ")}</p>
            </div>
            <p className="mt-3 max-w-2xl text-ink-soft">{conf.description}</p>
            {photos.length > 0 && (
              <ul className={cx("mt-8 grid grid-cols-2 gap-3 sm:gap-4", grid)}>
                {photos.map((photo, i) => (
                  <li key={photo.src} className={spans[i]}>
                    <Photo
                      photo={photo}
                      large={mosaic && i === 0}
                      sizes={mosaic && i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 30vw, 50vw"}
                    />
                  </li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  );
}
