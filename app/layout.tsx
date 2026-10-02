import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { BookingProvider } from "@/components/BookingProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { ogImageUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: ogImageUrl("Get more out of college. Owe less for it."), width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 bg-ink px-4 py-3 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <BookingProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <StickyMobileCta />
        </BookingProvider>
        <Analytics />
      </body>
    </html>
  );
}
