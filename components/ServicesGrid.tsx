import { CheckoutButton, PayPalLink } from "@/components/CtaButtons";
import { ServiceCta } from "@/components/ServiceCta";
import { cx } from "@/components/ui";
import { services, type Service } from "@/content/services";
import { siteConfig } from "@/lib/siteConfig";

function Check({ light }: { light?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cx("mt-1 h-3.5 w-3.5 shrink-0", light ? "text-gold" : "text-terracotta")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

function PaymentPlanNote({ light }: { light?: boolean }) {
  return (
    <p className={cx("text-sm", light ? "text-ivory/85" : "text-ink-soft")}>
      <span className="font-semibold">Payment plans available.</span>{" "}
      {siteConfig.checkout.paymentPlan ? (
        <CheckoutButton
          kind="paymentPlan"
          arrow={false}
          placement="blueprint_payment_plan"
          className={cx("underline underline-offset-4", light ? "hover:text-gold" : "hover:text-terracotta")}
        >
          Pay in installments
        </CheckoutButton>
      ) : (
        "Ask on your fit call."
      )}
    </p>
  );
}

function ServiceCard({ service, compact, placement }: { service: Service; compact?: boolean; placement: string }) {
  const dark = service.featured;
  const list = service.includes ?? service.choices;
  const listTitle = service.includes ? "Includes" : service.choicesTitle;
  const ListBody = list && (
    <ul className="mt-3 space-y-2 text-sm">
      {list.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check light={dark} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <article
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className={cx(
        "flex scroll-mt-28 flex-col p-6 sm:p-8",
        dark ? "bg-forest text-ivory" : "border rule bg-paper",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className={cx("label", dark ? "text-gold" : "text-terracotta")}>{service.duration}</p>
        {dark && <p className="label rounded-full border border-gold/60 px-2.5 py-1 text-[0.62rem] text-gold">Flagship</p>}
      </div>
      <h3 id={`${service.id}-title`} className="display mt-4 text-3xl sm:text-[2.1rem]">
        {service.name}
      </h3>
      <p className="mt-5 flex items-baseline gap-3">
        <span className="display text-5xl">{service.priceLabel}</span>
        {service.priceNote && (
          <span className={cx("text-sm", dark ? "text-ivory/80" : "text-muted")}>{service.priceNote}</span>
        )}
      </p>
      <p className={cx("mt-5 font-medium", dark ? "text-ivory" : "text-ink")}>{service.summary}</p>
      {!compact && <p className={cx("mt-3 text-[0.95rem] leading-relaxed", dark ? "text-ivory/85" : "text-ink-soft")}>{service.description}</p>}

      {list &&
        (compact && service.includes ? (
          <details className={cx("group/details mt-5 border-t pt-4", dark ? "border-ivory/20" : "rule")}>
            <summary className="label cursor-pointer list-none text-[0.7rem] [&::-webkit-details-marker]:hidden">
              <span className="underline underline-offset-4">What&apos;s included</span>
              <span aria-hidden="true" className="ml-2 inline-block transition-transform group-open/details:rotate-45">
                +
              </span>
            </summary>
            {ListBody}
          </details>
        ) : (
          <div className={cx("mt-5 border-t pt-4", dark ? "border-ivory/20" : "rule")}>
            <p className="label text-[0.7rem]">{listTitle}</p>
            {ListBody}
          </div>
        ))}

      {service.note && !compact && (
        <p className={cx("mt-5 text-sm italic", dark ? "text-ivory/80" : "text-muted")}>{service.note}</p>
      )}

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <ServiceCta cta={service.primaryCta} variant={dark ? "light" : "primary"} placement={placement} />
        {service.secondaryCta && (
          <ServiceCta
            cta={service.secondaryCta}
            variant={dark ? "outline-light" : "secondary"}
            size="sm"
            placement={placement}
          />
        )}
        {service.secondaryCta?.type === "checkout" && <PayPalLink kind={service.secondaryCta.kind} />}
        {service.primaryCta.type === "checkout" && <PayPalLink kind={service.primaryCta.kind} />}
        {service.showPaymentPlan && <PaymentPlanNote light={dark} />}
      </div>
    </article>
  );
}

export function ServicesGrid({ compact, placement = "services" }: { compact?: boolean; placement?: string }) {
  const entry = services.filter((s) => s.tier === "entry");
  const packages = services.filter((s) => s.tier === "package");
  return (
    <div className="space-y-10">
      <div>
        <p className="label mb-4 text-muted">Start here</p>
        <div className="grid gap-5 md:grid-cols-2">
          {entry.map((s) => (
            <ServiceCard key={s.id} service={s} compact={compact} placement={placement} />
          ))}
        </div>
      </div>
      <div>
        <p className="label mb-4 text-muted">Go deeper</p>
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((s) => (
            <ServiceCard key={s.id} service={s} compact={compact} placement={placement} />
          ))}
        </div>
      </div>
    </div>
  );
}
