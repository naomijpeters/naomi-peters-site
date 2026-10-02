"use client";

import { FormStatus, Honeypot, SelectField, TextArea, TextField } from "@/components/forms/fields";
import { useFormSubmit } from "@/components/forms/useFormSubmit";
import { Arrow, buttonClasses } from "@/components/ui";
import { budgetRanges, speakingAudiences } from "@/content/speaking";
import { track } from "@/lib/analytics";

export function SpeakingForm() {
  const { state, handleSubmit } = useFormSubmit("/api/inquiry", { type: "speaking" }, () =>
    track("speaking_inquiry", { form: "speaking" }),
  );
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="border-l-2 border-terracotta pl-5">
        <p className="display text-4xl">Inquiry received.</p>
        <p className="mt-3 text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6" aria-label="Speaking and workshop inquiry">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="name" label="Name" autoComplete="name" error={errors.name} />
        <TextField id="organization" label="Organization" autoComplete="organization" error={errors.organization} />
        <TextField id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
        <TextField id="phone" label="Phone" type="tel" autoComplete="tel" optional />
        <SelectField id="audience" label="Audience" options={[...speakingAudiences, "Other"]} optional />
        <TextField id="attendance" label="Estimated attendance" inputMode="numeric" optional placeholder="e.g. 120" />
        <TextField id="date" label="Event date" type="text" optional placeholder="Date or timeframe" />
        <SelectField id="budget" label="Budget range" options={budgetRanges} optional />
      </div>
      <TextArea
        id="message"
        label="Tell me about your event"
        optional
        placeholder="Who's attending, what you'd like them to leave with, format (in person / virtual), length…"
      />
      <FormStatus state={state} />
      <button type="submit" disabled={state.status === "submitting"} className={buttonClasses("primary", "lg")}>
        {state.status === "submitting" ? "Sending…" : "Send inquiry"}
        <Arrow />
      </button>
    </form>
  );
}
