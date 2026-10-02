/** Resource categories. Each maps to one of the five content themes. */
export const categories = {
  scholarships: {
    label: "Scholarships",
    theme: "Money",
    description: "Where to find scholarships, how to prioritize them, and how to build a system that doesn't take over your life.",
  },
  "college-money": {
    label: "College Money",
    theme: "Money",
    description: "College costs, budgeting, working during school, and thinking clearly about student debt.",
  },
  internships: {
    label: "Internships",
    theme: "Career",
    description: "Finding internships and co-ops, positioning your experience, and building career capital early.",
  },
  fellowships: {
    label: "Fellowships",
    theme: "Opportunity",
    description: "Fellowships, grants, research and programs most students never hear about.",
  },
  "study-abroad": {
    label: "Study Abroad",
    theme: "Experience",
    description: "Evaluating study abroad, international opportunities, and making travel part of a deliberate college plan.",
  },
  career: {
    label: "Career",
    theme: "Direction",
    description: "Major selection, career discernment, and planning the move from college into professional life.",
  },
  "college-life": {
    label: "College Life",
    theme: "Direction",
    description: "Systems, calendars, priorities and work/life balance for a college experience that works.",
  },
} as const;

export type CategorySlug = keyof typeof categories;
export const categorySlugs = Object.keys(categories) as CategorySlug[];
