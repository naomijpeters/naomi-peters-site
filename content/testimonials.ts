/**
 * REAL testimonials only — with the client's written permission.
 * The testimonial section stays hidden while this list is empty.
 *
 * Example:
 * { quote: "…", name: "Jordan P.", role: "College sophomore", permission: true }
 */
export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  /** Must be true — you have written permission to publish. */
  permission: true;
}

export const testimonials: Testimonial[] = [];
