/**
 * Launch offers. Turn one off by setting `active: false`.
 * These are promises to clients, so only keep them on while you honor them.
 */
export const offers = {
  /** Shown above the services and pricing. */
  foundingClients: {
    active: true,
    title: "Founding clients",
    text: "My first 10 clients get a free 30-minute follow-up session with any service.",
  },
  /** Shown on the $100 Strategy Session. Honor it with a one-time Stripe promotion code. */
  sessionCredit: {
    active: true,
    text: "Upgrade to any package within 7 days and your $100 counts toward it.",
  },
};
