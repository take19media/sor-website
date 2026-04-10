import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import CookieBanner from "@/components/CookieBanner";
import { sanityClient, urlFor } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Richard Bravo — Sale or Return catalogue",
  description:
    "A curated catalogue of handcrafted jewellery available to independent retailers on a sale or return basis.",
};

function hexToRgb(hex: string): string | null {
  const match = hex.replace("#", "").match(/^[0-9a-f]{6}$/i);
  if (!match) return null;
  const h = match[0];
  return `${parseInt(h.slice(0, 2), 16)} ${parseInt(h.slice(2, 4), 16)} ${parseInt(h.slice(4, 6), 16)}`;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityClient.fetch<any>(siteSettingsQuery).catch(() => null);

  // ── Colour overrides ──────────────────────────
  const vars: string[] = [];
  const colorMap: Record<string, string | undefined> = {
    "--color-cream": settings?.colorCream,
    "--color-ink": settings?.colorInk,
    "--color-slate": settings?.colorSlate,
    "--color-rule": settings?.colorRule,
  };
  for (const [key, hex] of Object.entries(colorMap)) {
    if (hex) {
      const rgb = hexToRgb(hex);
      if (rgb) vars.push(`${key}:${rgb}!important`);
    }
  }

  // ── Font overrides ────────────────────────────
  const fontLinks: string[] = [];
  if (settings?.fontSerif) {
    vars.push(`--font-serif:'${settings.fontSerif}',serif!important`);
    fontLinks.push(settings.fontSerif.replace(/ /g, "+") + ":wght@400;500;600");
  }
  if (settings?.fontSans) {
    vars.push(`--font-sans:'${settings.fontSans}',system-ui,sans-serif!important`);
    fontLinks.push(settings.fontSans.replace(/ /g, "+") + ":wght@400;500;600");
  }

  const overrideCss = vars.length ? `:root{${vars.join(";")}}` : "";
  const googleFontsUrl = fontLinks.length
    ? `https://fonts.googleapis.com/css2?${fontLinks.map((f) => `family=${f}`).join("&")}&display=swap`
    : null;

  // ── Header data ───────────────────────────────
  const logoUrl = settings?.headerLogo
    ? urlFor(settings.headerLogo).height(80).auto("format").url()
    : null;

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        {googleFontsUrl && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={googleFontsUrl} />
          </>
        )}
        {overrideCss && <style dangerouslySetInnerHTML={{ __html: overrideCss }} />}
      </head>
      <body className="min-h-screen flex flex-col">
        <Header brandName={settings?.brandName} logoUrl={logoUrl} />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
        <CookieBanner />
      </body>
    </html>
  );
}
