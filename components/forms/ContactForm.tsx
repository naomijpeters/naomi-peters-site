"use client";

import { FormStatus, Honeypot, SelectField, TextArea, TextField } from "@/components/forms/fields";
import { useFormSubmit } from "@/components/forms/useFormSubmit";
import { Arrow, buttonClasses } from "@/components/ui";
import { track } from "@/lib/analytics";

export const contactRoles = [
  "Parent",
  "High-school student",
  "College student",
  "Recent graduate",
  "School/organization",
  "Other",
] as const;

export const contactTopics = [
  "Scholarships/funding",
  "Budgeting/college cost",
  "Internships/jobs",
  "Fellowships/opportunities",
  "Study abroad/travel opportunities",
  "Career/major discernment",
  "Work/life balance",
  "Speaking/workshop",
  "Other",
] as const;

export function ContactForm() {
  const { state, handleSubmit } = useFormSubmit("/api/inquiry", { type: "contact" }, () =>
    track("contact_submit", { form: "contact" }),
  );
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="border-l-2 border-terracotta pl-5">
        <p className="display text-4xl">Message received.</p>
        <p className="mt-3 text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6" aria-label="Contact Naomi">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="name" label="Name" autoComplete="name" error={errors.name} />
        <TextField id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField id="role" label="I am a…" options={contactRoles} optional />
        <SelectField id="topic" label="What do you need help with?" options={contactTopics} optional />
      </div>
      <TextArea id="message" label="Message" error={errors.message} placeholder="Where are you now, and what are you trying to figure out?" />
      <FormStatus state={state} />
      <button type="submit" disabled={state.status === "submitting"} className={buttonClasses("primary", "lg")}>
        {state.status === "submitting" ? "Sending…" : "Send message"}
        <Arrow />
      </button>
    </form>
  );
}
