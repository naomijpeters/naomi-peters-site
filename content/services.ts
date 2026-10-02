import type { BookingKind, CheckoutKind } from "@/lib/links";

/**
 * Services & prices. Change a price here and it updates everywhere
 * (services page, homepage, structured data).
 */

export type ServiceCta =
  | { type: "booking"; kind: BookingKind; label: string }
  | { type: "checkout"; kind: CheckoutKind; label: string };

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  priceLabel: string;
  priceNote?: string;
  tier: "entry" | "package";
  featured?: boolean;
  summary: string;
  description: string;
  choicesTitle?: string;
  choices?: string[];
  includes?: string[];
  note?: string;
  primaryCta: ServiceCta;
  secondaryCta?: ServiceCta;
  showPaymentPlan?: boolean;
}

export const services: Service[] = [
  {
    id: "free-call",
    name: "Free College ROI Call",
    duration: "20 minutes",
    price: 0,
    priceLabel: "$0",
    tier: "entry",
    summary: "Find your biggest bottleneck and see whether coaching is a fit.",
    description:
      "We'll identify the single biggest thing holding you back right now — and whether I can meaningfully help. No pitch you have to sit through. Parents are welcome to join.",
    primaryCta: { type: "booking", kind: "freeCall", label: "Book free call" },
  },
  {
    id: "strategy-session",
    name: "College ROI Strategy Session",
    duration: "60 minutes",
    price: 100,
    priceLabel: "$100",
    tier: "entry",
    summary: "One focused hour on the decision that matters most right now.",
    description: "Already know what you need? Skip the consultation and book a working session on one priority.",
    choicesTitle: "Choose one priority",
    choices: [
      "Scholarships / funding",
      "College budget",
      "Internship / job strategy",
      "Career / major discernment",
      "Study abroad / opportunity planning",
      "Semester / work-life planning",
    ],
    primaryCta: { type: "booking", kind: "strategySession", label: "Book a strategy session" },
  },
  {
    id: "strategy-pack",
    name: "Strategy Pack",
    duration: "4 sessions",
    price: 375,
    priceLabel: "$375",
    priceNote: "$25 less than four single sessions",
    tier: "package",
    summary: "For several connected decisions that need more than one conversation.",
    description:
      "Funding affects which internships you can take. Internships affect when you can study abroad. Four sessions give us room to connect the pieces and follow through.",
    primaryCta: { type: "checkout", kind: "strategyPack", label: "Get started" },
    secondaryCta: { type: "booking", kind: "freeCall", label: "Questions first? Free call" },
  },
  {
    id: "intensive",
    name: "Scholarship & Opportunity Intensive",
    duration: "Strategy + follow-up",
    price: 500,
    priceLabel: "$500",
    priceNote: "Launch price",
    tier: "package",
    summary: "A structured system for finding, prioritizing and applying to opportunities.",
    description:
      "For students heading into scholarship, internship or fellowship season who want a real system instead of a pile of browser tabs.",
    includes: [
      "Personal strategy assessment",
      "Scholarship-search framework",
      "Opportunity calendar",
      "Application prioritization",
      "Resume / activity positioning",
      "Funding & opportunity roadmap",
      "Follow-up session",
    ],
    note: "I coach, organize, edit and give feedback. I don't write applications for you — your voice is the point.",
    primaryCta: { type: "booking", kind: "fitCall", label: "Apply / book consultation" },
    secondaryCta: { type: "checkout", kind: "intensive", label: "Ready? Enroll now" },
  },
  {
    id: "blueprint",
    name: "The College ROI Blueprint",
    duration: "Flagship 1:1 package",
    price: 1000,
    priceLabel: "$1,000",
    tier: "package",
    featured: true,
    summary: "A complete, personal strategy connecting money, opportunity, experience and what comes next.",
    description:
      "The full College ROI Method, built around you — with multiple coaching sessions and accountability between them.",
    includes: [
      "College cost & funding strategy",
      "Scholarship & grant strategy",
      "Student budget",
      "Internship & job strategy",
      "Opportunity & fellowship strategy",
      "Study-abroad planning",
      "Semester planning",
      "Career direction",
      "Personal opportunity roadmap",
      "Multiple 1:1 coaching sessions",
      "Accountability & follow-up",
    ],
    primaryCta: { type: "booking", kind: "fitCall", label: "Book a free fit call" },
    secondaryCta: { type: "checkout", kind: "blueprint", label: "Enroll now" },
    showPaymentPlan: true,
  },
];

export const serviceById = (id: string) => services.find((s) => s.id === id);

/** Quick guide on the services page. */
export const serviceChooser: { situation: string; serviceId: string }[] = [
  { situation: "I'm not sure what I need yet.", serviceId: "free-call" },
  { situation: "I have one specific question or decision.", serviceId: "strategy-session" },
  { situation: "I have a few connected decisions this semester.", serviceId: "strategy-pack" },
  { situation: "Scholarship or application season is coming.", serviceId: "intensive" },
  { situation: "I want a full plan for the rest of college.", serviceId: "blueprint" },
];
