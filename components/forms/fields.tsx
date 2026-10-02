import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "@/components/ui";

const control =
  "mt-2 block w-full rounded-[3px] border bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/80 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-terracotta";

interface FieldShell {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  dark?: boolean;
}

function Shell({ id, label, error, hint, optional, dark, children }: FieldShell & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={cx("text-sm font-semibold", dark ? "text-ivory" : "text-ink")}>
        {label}
        {optional && <span className={cx("ml-1.5 font-normal", dark ? "text-ivory/75" : "text-muted")}>(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className={cx("mt-1.5 text-xs", dark ? "text-ivory/75" : "text-muted")}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={cx("mt-1.5 text-sm font-medium", dark ? "text-gold" : "text-terracotta")}>
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

export function TextField({
  id,
  label,
  error,
  hint,
  optional,
  dark,
  ...props
}: FieldShell & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} optional={optional} dark={dark}>
      <input
        id={id}
        name={id}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cx(control, error ? "border-terracotta" : "border-line")}
        {...props}
      />
    </Shell>
  );
}

export function TextArea({
  id,
  label,
  error,
  hint,
  optional,
  ...props
}: FieldShell & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea
        id={id}
        name={id}
        rows={5}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cx(control, "resize-y", error ? "border-terracotta" : "border-line")}
        {...props}
      />
    </Shell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  options,
  placeholder = "Select one",
  ...props
}: FieldShell & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder?: string }) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} optional={optional}>
      <select
        id={id}
        name={id}
        required={!optional}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cx(control, "appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10", error ? "border-terracotta" : "border-line")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%2317160f' stroke-width='1.5'%3E%3Cpath d='M1 1.5l5 5 5-5'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Shell>
  );
}

/** Hidden from people; bots tend to fill it in. */
export function Honeypot({ id = "website" }: { id?: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>Website</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormStatus({
  state,
  dark,
}: {
  state: { status: "idle" | "submitting" | "success" | "error"; message?: string; devHint?: string };
  dark?: boolean;
}) {
  return (
    <div role="status" aria-live="polite" className="empty:hidden">
      {state.status === "error" && state.message && (
        <div
          className={cx(
            "rounded-[3px] border px-4 py-3 text-sm",
            dark ? "border-gold/60 text-ivory" : "border-terracotta/50 bg-terracotta/5 text-ink",
          )}
        >
          <p>{state.message}</p>
          {state.devHint && (
            <p className={cx("mt-2 font-mono text-xs", dark ? "text-gold" : "text-terracotta")}>
              Developer note (hidden in production): {state.devHint}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
