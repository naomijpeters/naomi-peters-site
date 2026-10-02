import Image from "next/image";
import { photos, type PhotoKey } from "@/content/photos";
import { cx } from "@/components/ui";

/**
 * Renders Naomi's real photo when `src` is set in content/photos.ts,
 * otherwise a clearly-labelled placeholder (never a stock or AI image).
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
  return (
    <figure className={cx("relative overflow-hidden", className)}>
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
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
