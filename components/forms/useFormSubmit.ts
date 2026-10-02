"use client";

import { useState, type FormEvent } from "react";
import type { ApiResponse } from "@/lib/validation";

export interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
  devHint?: string;
  fieldErrors?: Record<string, string>;
}

export function useFormSubmit(endpoint: string, extra: Record<string, string> = {}, onSuccess?: () => void) {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = { ...Object.fromEntries(new FormData(form).entries()), ...extra };
    setState({ status: "submitting" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as ApiResponse;
      if (res.ok && data.ok) {
        setState({ status: "success", message: data.message });
        form.reset();
        onSuccess?.();
      } else {
        setState({ status: "error", message: data.message, devHint: data.devHint, fieldErrors: data.fieldErrors });
        const firstInvalid = data.fieldErrors && Object.keys(data.fieldErrors)[0];
        if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      }
    } catch {
      setState({ status: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  return { state, handleSubmit };
}
