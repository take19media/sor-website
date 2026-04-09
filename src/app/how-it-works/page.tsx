import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/client";
import { sorTermsQuery } from "@/sanity/queries";

export const revalidate = 60;

export default async function HowItWorksPage() {
  const terms = await sanityClient.fetch<any>(sorTermsQuery).catch(() => null);

  return (
    <div className="mx-auto max-w-2xl px-5 md:px-8 pt-12 md:pt-20">
      <h1 className="serif text-4xl md:text-5xl">{terms?.title || "How sale or return works"}</h1>
      {terms?.intro && <p className="mt-6 text-ink/70 text-lg">{terms.intro}</p>}

      <div className="prose prose-neutral max-w-none mt-10 text-ink/85 leading-relaxed space-y-6">
        {terms?.body ? (
          <PortableText value={terms.body} />
        ) : (
          <>
            <p>
              Richard Bravo offers jewellery to selected independent retailers on a sale or return
              basis. This means you can present the work in your shop without purchasing stock
              upfront. You pay only for pieces that sell.
            </p>
            <h2 className="serif text-2xl mt-10">The arrangement</h2>
            <p>
              Pieces are consigned to your outlet for an agreed period, typically three months. At
              the end of each month, sold items are invoiced and unsold items remain in store or
              are rotated.
            </p>
            <h2 className="serif text-2xl mt-10">Care and responsibility</h2>
            <p>
              Stockists are asked to display pieces with reasonable care. Loss or damage is covered
              by the outlet's own insurance for the duration of the consignment.
            </p>
            <h2 className="serif text-2xl mt-10">Returns</h2>
            <p>
              At the end of the consignment period, any unsold pieces are returned to the studio at
              no cost to the outlet. A fresh selection can then be agreed.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
