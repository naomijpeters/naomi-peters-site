/**
 * Conferences shown on the About page. The first photo of each is shown large.
 * To add one: copy a block, put its photos in /public/images, and fill it in.
 */
export interface ConferencePhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface Conference {
  name: string;
  field: string;
  place: string;
  description: string;
  photos: ConferencePhoto[];
}

export const conferences: Conference[] = [
  {
    name: "RISKWORLD",
    field: "Risk management & insurance",
    place: "Philadelphia",
    description: "The risk management and insurance industry's annual conference.",
    photos: [
      { src: "/images/conf-riskworld-sign.webp", alt: "Naomi and a fellow student at the lit-up RISKWORLD sign at night", caption: "RISKWORLD, Philadelphia" },
      { src: "/images/conf-riskworld-group.webp", alt: "Student attendees with conference badges outside Philadelphia City Hall", caption: "With fellow student attendees" },
      { src: "/images/conf-riskworld-hall.webp", alt: "The conference hall entrance with signs pointing to the Marketplace", caption: "The conference floor" },
      { src: "/images/conf-riskworld-reception.webp", alt: "Attendees on the grand staircase at the Philadelphia Museum of Art", caption: "Opening reception, Philadelphia Museum of Art" },
      { src: "/images/conf-riskworld-statue.webp", alt: "Students posing playfully in front of a bronze statue", caption: "Between sessions" },
      { src: "/images/conf-riskworld-art-museum.webp", alt: "The Rocky statue in front of the Philadelphia Museum of Art at dusk", caption: "The Rocky statue" },
      { src: "/images/conf-riskworld-rooftop.webp", alt: "Attendees networking at a rooftop pool reception", caption: "Rooftop networking reception" },
    ],
  },
  {
    name: "Minnesota Organoid Symposium",
    field: "Biomedical research",
    place: "Mayo Clinic & University of Minnesota",
    description: "The 3rd annual “Cells to Cures” symposium on organoid research.",
    photos: [
      { src: "/images/conf-organoid-symposium.webp", alt: "Symposium ballroom with “Minnesota Organoid Symposium: Cells to Cures” on the screens", caption: "Cells to Cures, 2025" },
      { src: "/images/conf-organoid-poster.webp", alt: "A Mayo Clinic research poster on dorsal root ganglion organoids", caption: "Research poster session" },
    ],
  },
];
