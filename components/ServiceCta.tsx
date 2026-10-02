import { BookingButton, CheckoutButton } from "@/components/CtaButtons";
import type { ButtonSize, ButtonVariant } from "@/components/ui";
import type { ServiceCta as Cta } from "@/content/services";

export function ServiceCta({
  cta,
  variant,
  size,
  placement,
}: {
  cta: Cta;
  variant?: ButtonVariant;
  size?: ButtonSize;
  placement: string;
}) {
  return cta.type === "booking" ? (
    <BookingButton kind={cta.kind} variant={variant} size={size} placement={placement}>
      {cta.label}
    </BookingButton>
  ) : (
    <CheckoutButton kind={cta.kind} variant={variant} size={size} placement={placement}>
      {cta.label}
    </CheckoutButton>
  );
}
