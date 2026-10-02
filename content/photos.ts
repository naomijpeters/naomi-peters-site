/**
 * PHOTOS — to replace a placeholder:
 *   1. Put the photo in /public/images (e.g. /public/images/naomi-portrait.jpg)
 *   2. Set `src` below to "/images/naomi-portrait.jpg"
 *   3. Write a short description in `alt` (for screen readers and Google)
 * Leave `src: null` to show the labelled placeholder.
 */
export type PhotoKey = "portrait" | "travel" | "graduation" | "professional" | "studyAbroad" | "speaking";

export interface PhotoEntry {
  src: string | null;
  alt: string;
  /** Shown on the placeholder until a real photo is added. */
  label: string;
  width?: number;
  height?: number;
}

export const photos: Record<PhotoKey, PhotoEntry> = {
  portrait: { src: null, alt: "Naomi Peters", label: "Portrait of Naomi" },
  travel: { src: null, alt: "Naomi Peters traveling during college", label: "Travel photo" },
  graduation: { src: null, alt: "Naomi Peters at graduation, University of St. Thomas", label: "Graduation photo" },
  professional: { src: null, alt: "Naomi Peters during an internship", label: "Professional / internship photo" },
  studyAbroad: { src: null, alt: "Naomi Peters during her semester abroad", label: "Study abroad photo" },
  speaking: { src: null, alt: "Naomi Peters speaking to students", label: "Speaking / workshop photo" },
};
