# Naomi Peters — Website

**More Opportunity. Less Debt.** The website for Naomi Peters' college money, opportunity and career strategy practice.

Built with Next.js, TypeScript and Tailwind CSS. There's no database. Text, prices and articles are plain files you can edit, and every booking, payment and email link is set in one place.

> **You don't need to be a developer to run this site.** Each section below explains one task, step by step. Commands go in the **Terminal** app (Mac) and you paste them exactly as written.

---

## Contents

1. [Install dependencies](#1-install-dependencies)
2. [Run the site on your computer](#2-run-the-site-on-your-computer)
3. [Replace photos](#3-replace-photos)
4. [Change prices](#4-change-prices)
5. [Change copy (words on the site)](#5-change-copy)
6. [Add Calendly booking links](#6-add-calendly-booking-links)
7. [Create Stripe Payment Links](#7-create-stripe-payment-links)
8. [Where to paste Stripe URLs](#8-where-to-paste-stripe-urls)
9. [Add Google Analytics](#9-add-google-analytics)
10. [Connect a custom domain](#10-connect-a-custom-domain)
11. [Deploy to Vercel](#11-deploy-to-vercel)
12. [Add articles](#12-add-articles)
13. [Connect an email provider (and the contact forms)](#13-connect-an-email-provider-and-the-contact-forms)
14. [Where everything lives](#where-everything-lives)
15. [Before publishing: quality checks](#before-publishing-quality-checks)

---

## 1. Install dependencies

You need **Node.js 20.9 or newer** installed once.

1. Go to <https://nodejs.org> and download the **LTS** version. Run the installer.
2. Open **Terminal** and go into the website folder. Type `cd ` (with a space), drag the website folder onto the Terminal window, then press **Enter**.
3. Install the site's building blocks (this takes a minute or two and needs about 1 GB of free disk space):

```bash
npm install
```

## 2. Run the site on your computer

```bash
cp .env.example .env.local
```

That creates your private settings file, `.env.local`. You only need to do this once. Then:

```bash
npm run dev
```

Open <http://localhost:3000> in your browser. Changes you save to files appear in the browser right away. Press **Ctrl + C** in Terminal to stop.

> Until you paste in your Calendly and Stripe links, booking and checkout buttons go to a clearly labelled **"being set up"** page instead of a broken link. While you're running the site locally, that page also tells you which setting to fill in.

## 3. Replace photos

Placeholders say "Photo coming soon". They never show fake or stock faces.

1. Export your photos as **JPG** files, roughly 2000 px on the long side. Portraits work best in a 4:5 shape.
2. Put them in the folder `public/images/`, for example `public/images/naomi-portrait.jpg`.
3. Open `content/photos.ts`. For each photo, change `src: null` to the path, and write a short description in `alt`:

```ts
portrait: { src: "/images/naomi-portrait.jpg", alt: "Naomi Peters smiling outdoors", label: "Portrait of Naomi" },
```

The photo slots are `portrait`, `travel`, `graduation`, `professional` (internship), `studyAbroad` and `speaking`. Next.js automatically resizes and compresses your photos for fast loading.

## 4. Change prices

Open `content/services.ts`. Each service has `price` (a number, used for Google) and `priceLabel` (the text shown on the site). Change both:

```ts
price: 500,
priceLabel: "$500",
priceNote: "Launch price",   // delete this line when the launch price ends
```

Prices update everywhere automatically: the homepage, the services page and Google's structured data. **Remember to change the price in Stripe too** (§7).

## 5. Change copy

| What | File |
|---|---|
| Homepage text | `content/home.ts` |
| The four pillars (Fund It, Build It…) | `content/pillars.ts` |
| Services, descriptions, "includes" lists | `content/services.ts` |
| "Who this is for" cards | `content/audiences.ts` |
| FAQ | `content/faq.ts` |
| Hero metrics and the "ledger" | `content/metrics.ts`. **Only use verified numbers.** |
| Speaking topics, audiences, budget ranges | `content/speaking.ts` |
| Name, tagline, footer disclaimer | `lib/siteConfig.ts` |
| About, How I Help, Book, Speaking, Contact pages | `app/<page-name>/page.tsx` (edit the text between the tags) |
| Terms, Privacy, Disclaimer | `app/terms`, `app/privacy`, `app/disclaimer` |

**Testimonials:** add real ones, with written permission, to `content/testimonials.ts`. The section stays hidden while that list is empty.

> **Legal pages are a starting template.** Read them carefully, especially the rescheduling and refund terms (24-hour notice, refunds at your discretion), which are placeholders. Adjust them to your actual policies and have them reviewed. Set `NEXT_PUBLIC_LEGAL_STATE` to the state your business is registered in.

## 6. Add Calendly booking links

1. Create a free account at <https://calendly.com>.
2. Create three **event types**:
   - **Free 20-Minute College ROI Call** (20 min)
   - **College ROI Strategy Session** (60 min, $100). In the event's settings, open **Collect payments**, connect **Stripe** and set the price to $100. Visitors then pay while booking. This needs a paid Calendly plan.
   - **Flagship Program Fit Call** (for the Intensive and the Blueprint)
3. For each event, click **Copy link** and paste it into `.env.local` (and later into Vercel, §11):

```
NEXT_PUBLIC_CALENDLY_FREE_CALL_URL=https://calendly.com/your-name/free-call
NEXT_PUBLIC_CALENDLY_STRATEGY_URL=https://calendly.com/your-name/strategy-session
NEXT_PUBLIC_CALENDLY_FIT_CALL_URL=https://calendly.com/your-name/fit-call
```

Restart `npm run dev`. Booking buttons now open Calendly in a pop-up on your site.

Also create a client-only scheduling link for paying clients (for example a "Coaching Session" event) and an intake questionnaire (Google Forms, Tally or Typeform). Then add:

```
CLIENT_SCHEDULING_URL=https://calendly.com/your-name/coaching-session
INTAKE_FORM_URL=https://forms.gle/...
```

These appear on the `/welcome` page clients see after paying.

## 7. Create Stripe Payment Links

The site never handles card numbers. Stripe hosts the checkout page.

1. Create an account at <https://stripe.com> and complete business verification.
2. Go to **Product catalog → Add product** and create:
   - **Strategy Pack**: $375, one-time
   - **Scholarship & Opportunity Intensive**: $500, one-time
   - **The College ROI Blueprint**: $1,000, one-time
   - *(Optional)* **Blueprint payment plan**: for example 3 × $350 monthly as a recurring price, which you cancel after the final payment. Or use Stripe's installment options, if your account has them.
3. For each product, go to **Payment Links → New**, and choose the product.
4. Under **After payment**, choose **Don't show confirmation page → Redirect customers to your website**, and enter `https://YOUR-DOMAIN.com/welcome`
5. Under **Settings → Customer emails**, turn on **Successful payments** so customers get a receipt.
6. Copy each payment link. It looks like `https://buy.stripe.com/...`.

> **Test first:** switch Stripe to **Test mode**, make test links, and pay with card `4242 4242 4242 4242` (any future date, any CVC). Confirm you land on `/welcome`. Then create the live links.

## 8. Where to paste Stripe URLs

In `.env.local`, and in Vercel's Environment Variables:

```
NEXT_PUBLIC_STRIPE_STRATEGY_PACK_URL=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_INTENSIVE_URL=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_ROI_BLUEPRINT_URL=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_PAYMENT_PLAN_URL=https://buy.stripe.com/...   # optional
```

If the payment-plan link is blank, the site says "Payment plans available. Ask on your fit call."

**PayPal (optional, later):** fill `NEXT_PUBLIC_PAYPAL_*_URL` and a small "Or pay with PayPal" link appears under that package. Nothing else changes.

## 9. Add Google Analytics

1. At <https://analytics.google.com>, create a **GA4 property** and a **Web data stream** for your domain.
2. Copy the **Measurement ID** (`G-XXXXXXXXXX`) into `NEXT_PUBLIC_GA_ID`.

If this is blank, no analytics code loads at all. The site sends these events, which you can mark as **Key events** in GA4 (Admin → Events):

| Event | When |
|---|---|
| `free_call_click` | Any free call / fit call button |
| `paid_session_click` | $100 strategy session button |
| `package_checkout_click` | Any Stripe checkout button |
| `calendly_open` | Calendly pop-up opened |
| `booking_scheduled` | A Calendly booking was completed |
| `lead_magnet_signup` | Starter Kit signup succeeded |
| `speaking_inquiry` | Speaking form sent |
| `contact_submit` | Contact form sent |

The Privacy page automatically mentions Google Analytics once it's on.

## 10. Connect a custom domain

1. Buy a domain, for example from Namecheap, Cloudflare, Squarespace Domains or GoDaddy.
2. In Vercel, open **Project → Settings → Domains → Add**, and type your domain (for example `naomipeters.com`). Add the `www.` version too.
3. Vercel shows one or two DNS records (usually an **A** record and a **CNAME**). Add them in your domain company's DNS settings.
4. Wait for Vercel to show **Valid Configuration**. This usually takes minutes, but can take up to 48 hours.
5. Set `NEXT_PUBLIC_SITE_URL=https://www.makecollegepayoff.com` in Vercel and **redeploy**. This sets the URLs Google sees and the links in social share previews.
6. Update the Stripe redirect URLs (§7) to your real domain.

## 11. Deploy to Vercel

1. Create a free account at <https://github.com> and upload this folder as a new **private repository**. The GitHub Desktop app makes this point-and-click.
2. At <https://vercel.com>, sign in with GitHub and choose **Add New → Project**, then import the repository. Vercel detects Next.js automatically.
3. Before clicking **Deploy**, open **Environment Variables** and paste every line from your `.env.local` that has a value. You can paste the whole file at once.
4. Click **Deploy**. You'll get a link like `your-site.vercel.app`.
5. **Whenever you change an environment variable in Vercel, redeploy:** go to Deployments, click ⋯ and choose Redeploy. Every time you push changes to GitHub, Vercel republishes automatically.

## 12. Add articles

Articles are Markdown files in `content/articles/`. The file name becomes the address, so `where-i-found-20-scholarships.md` is published at `/resources/where-i-found-20-scholarships`.

Ten articles are already listed as **Coming soon**. To publish one:

1. Open the file, for example `content/articles/where-i-found-20-scholarships.md`.
2. Write the article under the closing `---`. Copy the formatting examples from `content/articles/_template.md`.
3. In the top section, set `status: published` and `date: 2026-11-15` (the publish date).
4. Optional: add a 1200×630 image in `public/images/articles/` and set `image: /images/articles/your-image.jpg` and `imageAlt:`.

To start a brand-new article, copy `_template.md` and rename it without the underscore.

| `status` | What happens |
|---|---|
| `published` | Live page, listed, in sitemap, indexed by Google |
| `coming-soon` | Listed with a "Coming soon" label, no page |
| `draft` | Only visible when running locally |

Special lines you can put in an article:

- `[[starter-kit]]` adds the free Starter Kit signup box. If you don't use it, one is added at the end automatically.
- `[[book-call]]` adds a "Book a free call" box.

Each published article automatically gets SEO metadata, a social share image, Article structured data and a sitemap entry. **Categories:** `scholarships`, `college-money`, `internships`, `fellowships`, `study-abroad`, `career`, `college-life`. You can edit them in `content/categories.ts`.

## 13. Connect an email provider (and the contact forms)

### Starter Kit email list

First, write the Starter Kit guide (*"The 25 Places Students Forget to Look…"*) as a PDF. Then choose **one** provider.

**Kit (formerly ConvertKit):** create a **Form** and an **automation** that emails the PDF to new subscribers. Then:
```
EMAIL_PROVIDER=kit
KIT_API_KEY=...        # Settings → Developer → API Keys (v4)
KIT_FORM_ID=...        # the number in the form's URL
```

**Beehiiv:** set up a welcome email with the PDF link. Then:
```
EMAIL_PROVIDER=beehiiv
BEEHIIV_API_KEY=...
BEEHIIV_PUBLICATION_ID=pub_...
```

**Mailchimp:** create a Customer Journey that sends the guide to the `starter-kit` tag. New subscribers confirm by email first. Then:
```
EMAIL_PROVIDER=mailchimp
MAILCHIMP_API_KEY=...-us21
MAILCHIMP_AUDIENCE_ID=...
```

*Optional:* `NEXT_PUBLIC_LEAD_MAGNET_URL` shows a direct download link right after someone signs up.

Until a provider is connected, the form **does not pretend to work**. Locally it shows a developer note saying what to configure. On the live site, visitors are told signups open soon.

### Contact & speaking forms

1. Create a free form at <https://formspree.io>. Basin, Getform, or a Zapier/Make webhook also work.
2. Copy its endpoint URL:
```
FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
SPEAKING_FORM_ENDPOINT=   # optional, to send speaking inquiries somewhere separate
```
Submissions are emailed to you by that service. Until this is set, the forms say they aren't connected and show your email address, if you've added one.

---

## Where everything lives

```
app/            Pages (each folder = a URL) and API routes for forms
components/     Reusable building blocks (header, buttons, forms…)
content/        ← Edit me: copy, prices, photos, articles, testimonials
lib/            Configuration and helpers (siteConfig.ts = all links/settings)
public/images/  ← Put photos here
.env.example    Every setting the site reads, with explanations
```

**Future products:** `content/products.ts` already describes templates and courses (scholarship tracker, budget template, and so on), all set to `published: false`. When one is ready, add its Stripe link, set `published: true`, and the `/shop` page appears. Until then, `/shop` returns a 404 and nothing unavailable is shown.

## Before publishing: quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

Or run all three:

```bash
npm run check
```

All three should finish without errors before you deploy.

---

## TO START ACCEPTING CLIENTS

- [ ] Purchase/connect domain (§10)
- [ ] Upload professional photos (§3)
- [ ] Review all copy for accuracy, especially your story, the FAQ and the legal pages (§5)
- [ ] Write the College ROI Starter Kit guide (PDF)
- [ ] Create Calendly account (§6)
- [ ] Add free-call event
- [ ] Add paid $100 strategy event
- [ ] Add fit-call event and client-session scheduling link
- [ ] Connect Stripe to Calendly
- [ ] Create Stripe payment links for packages, redirecting to `/welcome` (§7)
- [ ] Create intake questionnaire
- [ ] Paste URLs into environment variables (§8, §11)
- [ ] Add business email (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] Connect lead-magnet email service (§13)
- [ ] Connect contact/speaking form endpoint (§13)
- [ ] Add privacy/contact information and your state (`NEXT_PUBLIC_LEGAL_STATE`)
- [ ] Add Google Analytics ID (§9)
- [ ] Test one real $1 payment in Stripe test mode / appropriate test workflow before going live
- [ ] Publish (§11)
- [ ] Test booking from a different device
- [ ] Test checkout
- [ ] Begin collecting real testimonials only after serving clients
