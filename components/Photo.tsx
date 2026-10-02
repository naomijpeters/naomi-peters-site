import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { photos, type PhotoKey, type PhotoSource } from "@/content/photos";
import { cx } from "@/components/ui";

/** First listed file that actually exists in /public, checked at build time. */
function resolveSrc(src: PhotoSource | PhotoSource[] | null, alt: string): { src: string; alt: string } | null {
  const candidates = src === null ? [] : Array.isArray(src) ? src : [src];
  for (const c of candidates) {
    const entry = typeof c === "string" ? { src: c, alt } : c;
    if (fs.existsSync(path.join(process.cwd(), "public", entry.src))) return entry;
  }
  return null;
}

/**
 * Renders Naomi's real photo when one is set in content/photos.ts,
 * otherwise a clearly-labelled placeholder (never a stock or AI image).
 * Server component only — it checks the filesystem.
 */
export function Photo({
  name,
  className,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority,
  caption,
}: {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  caption?: string;
}) {
  const photo = photos[name];
  const resolved = resolveSrc(photo.src, photo.alt);
  return (
    <figure className={cx("relative overflow-hidden", className)}>
      {resolved ? (
        <Image
          src={resolved.src}
          alt={resolved.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      ) : (
        <div
          role="img"
          aria-label={`Photo placeholder: ${photo.label}`}
          className="placeholder-hatch absolute inset-0 flex flex-col items-center justify-center gap-3 border rule p-6 text-center"
        >
          <span aria-hidden="true" className="display text-6xl text-ink/15 sm:text-7xl">
            NP
          </span>
          <span className="label text-muted">{photo.label}</span>
          <span className="text-[0.7rem] text-muted">Photo coming soon</span>
        </div>
      )}
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 pb-3 pt-10 text-xs text-ivory">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
