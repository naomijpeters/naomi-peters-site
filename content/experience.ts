/**
 * "Where I've worked" — organizations and roles, grouped by field.
 * `org` is the name shown large; `role` is the line underneath (leave it out if
 * you'd rather not say). Names are shown as text, not logos, so no trademark
 * permission is needed.
 */
export interface ExperienceItem {
  org: string;
  role?: string;
  place?: string;
}

export interface ExperienceGroup {
  title: string;
  items: ExperienceItem[];
}

export const experience: ExperienceGroup[] = [
  {
    title: "Finance & business",
    items: [
      { org: "IBM", role: "Corporate Financial Analyst · Co-op" },
      { org: "Five Star Financial", role: "Financial advising" },
      { org: "BETA.MN", role: "Project manager & volunteer coordinator" },
      { org: "Startups", role: "Early-stage companies" },
    ],
  },
  {
    title: "Research & healthcare",
    items: [
      { org: "BC Cancer", role: "Radiation oncology researcher" },
      { org: "University of St. Thomas", role: "Microbiology lab" },
      { org: "University College London", role: "Summer researcher · TeQ surgical technology group", place: "Queen Square, London" },
      { org: "Monarch Healthcare", role: "Certified Nursing Assistant (CNA)" },
    ],
  },
  {
    title: "Teaching & the outdoors",
    items: [
      { org: "Wayzata Sailing", role: "Sailing instructor" },
      { org: "University of St. Thomas", role: "Horticulturist · Campus greenhouse" },
    ],
  },
];
