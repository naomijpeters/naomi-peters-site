/**
 * PHOTOS — to replace or add one:
 *   1. Put the photo in /public/images (e.g. /public/images/naomi-graduation.jpg)
 *   2. Set `src` below to "/images/naomi-graduation.jpg"
 *   3. Write a short description in `alt` (for screen readers and Google)
 *
 * `src` can list several files: the first one that exists is used. That lets a
 * photo you haven't added yet fall back to another one instead of breaking.
 * If none exist, a labelled "Photo coming soon" placeholder is shown.
 */
export type PhotoKey =
  | "portrait"
  | "graduation"
  | "studyAbroad"
  | "travel"
  | "professional"
  | "speaking"
  | "sailingUst"
  | "sailingRegatta"
  | "sailingInstructor";

/** A file path, or a stand-in file with its own description. */
export type PhotoSource = string | { src: string; alt: string };

export interface PhotoEntry {
  src: PhotoSource | PhotoSource[] | null;
  alt: string;
  /** Shown on the placeholder until a real photo is added. */
  label: string;
  /** CSS object-position, to keep faces in frame when cropped. */
  position?: string;
}

export const photos: Record<PhotoKey, PhotoEntry> = {
  portrait: {
    src: [
      "/images/naomi-graduation.jpg",
      { src: "/images/travel-kyoto-fushimi-inari.webp", alt: "Naomi Peters at the Fushimi Inari gates in Kyoto" },
    ],
    alt: "Naomi Peters",
    label: "Portrait of Naomi",
    position: "50% 30%",
  },
  graduation: {
    src: [
      "/images/naomi-graduation.jpg",
      { src: "/images/travel-neuschwanstein.webp", alt: "Naomi Peters and a friend at Neuschwanstein Castle" },
    ],
    alt: "Naomi Peters at graduation, University of St. Thomas",
    label: "Graduation photo",
    position: "50% 30%",
  },
  studyAbroad: {
    src: "/images/travel-kyoto-kimono.webp",
    alt: "Naomi Peters in a kimono at Nishiki Market, Kyoto",
    label: "Study abroad photo",
    position: "50% 25%",
  },
  travel: {
    src: "/images/travel-lake-atitlan.webp",
    alt: "Swimming in Lake Atitlán, Guatemala",
    label: "Travel photo",
  },
  professional: {
    src: null,
    alt: "Naomi Peters during an internship",
    label: "Professional / internship photo",
  },
  speaking: {
    src: [
      "/images/naomi-speaking-panel.jpg",
      { src: "/images/sailing-instructor.webp", alt: "Teaching students to rig a sailboat at the dock" },
    ],
    alt: "Naomi Peters moderating a panel discussion",
    label: "Speaking / workshop photo",
    position: "50% 40%",
  },
  sailingUst: {
    src: "/images/sailing-ust-race.webp",
    alt: "Naomi Peters racing with the University of St. Thomas sailing team",
    label: "University of St. Thomas sailing",
  },
  sailingRegatta: {
    src: "/images/sailing-heineken-regatta.webp",
    alt: "Racing aboard Jackknife at the St. Maarten Heineken Regatta",
    label: "St. Maarten Heineken Regatta",
  },
  sailingInstructor: {
    src: "/images/sailing-instructor.webp",
    alt: "Teaching students to rig a sailboat at the dock",
    label: "Sailing instructor",
  },
};

/** Travel gallery on the About page. Captions name the place only. */
export const travelGallery: { src: string; alt: string; caption: string; position?: string }[] = [
  { src: "/images/travel-kyoto-fushimi-inari.webp", alt: "Walking through the torii gates at Fushimi Inari", caption: "Fushimi Inari, Kyoto", position: "50% 40%" },
  { src: "/images/travel-lake-atitlan.webp", alt: "Swimming in Lake Atitlán below a volcano", caption: "Lake Atitlán, Guatemala" },
  { src: "/images/travel-colosseum.webp", alt: "Walking past the Colosseum", caption: "Rome, Italy" },
  { src: "/images/travel-paris-eiffel-tower.webp", alt: "The Eiffel Tower lit up at night", caption: "Paris, France" },
  { src: "/images/travel-paris-opera.webp", alt: "Red and gold balconies inside the Palais Garnier opera house", caption: "Palais Garnier, Paris" },
  { src: "/images/travel-neuschwanstein.webp", alt: "Friends in front of Neuschwanstein Castle", caption: "Neuschwanstein, Germany" },
  { src: "/images/travel-mont-saint-michel.webp", alt: "Mont-Saint-Michel on an overcast day", caption: "Mont-Saint-Michel, France" },
  { src: "/images/travel-alps-hike.webp", alt: "Hiking a ridge trail in the Alps", caption: "Hiking in the Alps" },
  { src: "/images/travel-vatican.webp", alt: "St. Peter's Basilica in the rain", caption: "Vatican City" },
  { src: "/images/travel-japan-dango.webp", alt: "Eating dango on a street in Japan", caption: "Japan", position: "50% 30%" },
  { src: "/images/travel-rafting.webp", alt: "White-water rafting with friends", caption: "White-water rafting" },
];
