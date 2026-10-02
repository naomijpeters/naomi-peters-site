import type { BookingKind } from "@/lib/links";

export interface Audience {
  id: string;
  title: string;
  summary: string;
  points: string[];
  cta: { kind: BookingKind; label: string };
}

export const audiences: Audience[] = [
  {
    id: "high-school",
    title: "High School Students",
    summary: "Preparing financially and strategically for college.",
    points: ["Scholarship strategy before senior-year crunch", "Thinking through cost before you commit", "Starting freshman year with a plan"],
    cta: { kind: "freeCall", label: "Start with a free call" },
  },
  {
    id: "college",
    title: "Current College Students",
    summary: "Finding scholarships, internships, study abroad and career direction — with better systems.",
    points: ["Funding the years you have left", "Internships, co-ops and fellowships", "Balancing school, work and life"],
    cta: { kind: "freeCall", label: "Start with a free call" },
  },
  {
    id: "graduates",
    title: "Recent Graduates & Early Career",
    summary: "Working out the next professional step.",
    points: ["Clarifying direction", "Evaluating offers and opportunities", "Planning your first years after school"],
    cta: { kind: "strategySession", label: "Book a strategy session" },
  },
  {
    id: "parents",
    title: "Parents",
    summary: "Helping a student make better college money and opportunity decisions.",
    points: ["A clear, shared plan instead of guesswork", "Support that keeps your student in the driver’s seat", "Welcome on any call"],
    cta: { kind: "freeCall", label: "Book a call together" },
  },
];
