/**
 * Server-only settings. These are NOT prefixed with NEXT_PUBLIC_ and are never
 * sent to the browser bundle. Import only from server components / route handlers.
 */

function env(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export const serverConfig = {
  /** Public form link; the INTAKE_FORM_URL environment variable overrides it. */
  intakeFormUrl: env(process.env.INTAKE_FORM_URL) ?? "https://forms.gle/6JVxzZs1qKcVUVtG8",
  /** Private Calendly event for paying clients; CLIENT_SCHEDULING_URL overrides it. */
  clientSchedulingUrl:
    env(process.env.CLIENT_SCHEDULING_URL) ?? "https://calendly.com/naomijpeters/client-coaching-session",

  email: {
    provider: env(process.env.EMAIL_PROVIDER)?.toLowerCase(),
    kit: { apiKey: env(process.env.KIT_API_KEY), formId: env(process.env.KIT_FORM_ID) },
    beehiiv: {
      apiKey: env(process.env.BEEHIIV_API_KEY),
      publicationId: env(process.env.BEEHIIV_PUBLICATION_ID),
    },
    mailchimp: {
      apiKey: env(process.env.MAILCHIMP_API_KEY),
      audienceId: env(process.env.MAILCHIMP_AUDIENCE_ID),
    },
  },

  forms: {
    contact: env(process.env.FORM_ENDPOINT),
    speaking: env(process.env.SPEAKING_FORM_ENDPOINT) ?? env(process.env.FORM_ENDPOINT),
  },
};
