import Image from "next/image";
import Link from "next/link";
import { sanityClient, urlFor } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

export const revalidate = 60;

export default async function HomePage() {
  const settings = await sanityClient.fetch<any>(siteSettingsQuery).catch(() => null);

  const intro =
    settings?.introParagraph ||
    "Richard Bravo is an independent jewellery studio producing small-run, handmade pieces for a carefully chosen group of retail partners. Each collection is offered to stockists on a sale or return basis, so outlets can present the work without committing capital upfront.";

  const heroUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(2400).height(1350).auto("format").url()
    : null;

  return (
    <>
      {/* Hero */}
      <section className="relative w-full aspect-[16/9] bg-rule overflow-hidden">
        {heroUrl ? (
          <Image src={heroUrl} alt="" fill className="object-cover" priority sizes="100vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink/30 serif text-xl md:text-3xl">
            Hero image — 2400 × 1350
          </div>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-5 md:px-8 pt-16 md:pt-24">
        <h1 className="serif text-4xl md:text-6xl leading-tight">
          {settings?.tagline || "Quiet jewellery, made by hand."}
        </h1>
        <p className="mt-8 text-ink/80 text-base md:text-lg max-w-prose">{intro}</p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/catalogue"
            className="inline-block border border-ink px-6 py-3 text-sm tracking-wide hover:bg-ink hover:text-cream transition-colors text-center"
          >
            View the catalogue
          </Link>
          <Link
            href="/apply"
            className="inline-block border border-rule px-6 py-3 text-sm tracking-wide hover:border-ink transition-colors text-center"
          >
            Apply to stock
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 md:px-8 mt-24 border-t hairline pt-12">
        <h2 className="serif text-2xl md:text-3xl">On sale or return</h2>
        <p className="mt-4 text-ink/80 max-w-prose">
          Our SOR arrangement lets selected boutiques and galleries present Richard Bravo pieces
          without upfront purchase. Pieces are consigned for an agreed period, sales are reconciled
          monthly, and unsold work is returned at no cost.
        </p>
        <Link
          href="/how-it-works"
          className="inline-block mt-6 text-sm underline underline-offset-4 decoration-slate"
        >
          Read the full terms
        </Link>
      </section>
    </>
  );
}
