/**
 * Naomi's verified personal results. Only edit with numbers you can verify.
 * `primary` metrics appear first (and in the mobile hero).
 */
export interface Metric {
  value: string;
  label: string;
  primary?: boolean;
}

export const metrics: Metric[] = [
  { value: "20+", label: "Scholarships", primary: true },
  { value: "5", label: "Grants", primary: true },
  { value: "30+", label: "Countries", primary: true },
  { value: "$0", label: "Student Debt", primary: true },
  { value: "4", label: "Internships" },
  { value: "1", label: "Co-op" },
  { value: "3", label: "Fellowships" },
  { value: "1", label: "Semester Abroad" },
];

/** The "ledger" on the homepage and About page. */
export const ledger: { item: string; value: string }[] = [
  { item: "University of St. Thomas", value: "B.S. Finance" },
  { item: "Need-based scholarships", value: "None" },
  { item: "Tuition paid by family", value: "None" },
  { item: "Scholarships secured", value: "20+" },
  { item: "Grants secured", value: "5" },
  { item: "Internships", value: "4" },
  { item: "Co-op", value: "1" },
  { item: "Fellowships", value: "3" },
  { item: "Semester abroad", value: "1" },
  { item: "Countries visited while in school", value: "30+" },
];
