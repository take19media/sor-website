import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { allPiecesByCollectionQuery } from "@/sanity/queries";
import PieceImage from "@/components/PieceImage";

export const revalidate = 60;

type Piece = {
  _id: string;
  title: string;
  slug: string;
  materials?: string;
  dimensions?: string;
  images?: any[];
};
type CollectionGroup = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  pieces: Piece[];
};

export default async function CataloguePage() {
  const collections = await sanityClient
    .fetch<CollectionGroup[]>(allPiecesByCollectionQuery)
    .catch(() => [] as CollectionGroup[]);

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8 pt-12 md:pt-20">
      <header className="max-w-2xl">
        <h1 className="serif text-4xl md:text-5xl">Catalogue</h1>
        <p className="mt-4 text-ink/70 max-w-prose">
          A full index of pieces currently available to stock on a sale or return basis, grouped by
          collection.
        </p>
      </header>

      {collections.length === 0 && (
        <p className="mt-16 text-ink/50 italic">
          Catalogue entries will appear here once pieces are published in the CMS.
        </p>
      )}

      {collections.map((col) => (
        <section key={col._id} className="mt-20 border-t hairline pt-10">
          <div className="flex items-baseline justify-between gap-6 flex-wrap">
            <h2 className="serif text-3xl md:text-4xl">{col.title}</h2>
            <span className="text-xs tracking-widest uppercase text-ink/50">
              {col.pieces?.length || 0} pieces
            </span>
          </div>
          {col.description && (
            <p className="mt-3 text-ink/70 max-w-prose">{col.description}</p>
          )}

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {col.pieces?.map((p) => (
              <Link key={p._id} href={`/piece/${p.slug}`} className="group">
                <PieceImage image={p.images?.[0]} alt={p.title} ratio="portrait" />
                <div className="mt-4">
                  <div className="serif text-xl group-hover:text-slate transition-colors">
                    {p.title}
                  </div>
                  {p.materials && (
                    <div className="text-sm text-ink/60 mt-1">{p.materials}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
