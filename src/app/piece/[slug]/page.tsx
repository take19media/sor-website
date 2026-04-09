import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/client";
import { allPieceSlugsQuery, pieceBySlugQuery } from "@/sanity/queries";
import PieceImage from "@/components/PieceImage";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(allPieceSlugsQuery).catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export default async function PiecePage({ params }: { params: { slug: string } }) {
  const piece = await sanityClient
    .fetch<any>(pieceBySlugQuery, { slug: params.slug })
    .catch(() => null);

  if (!piece) return notFound();

  return (
    <article className="mx-auto max-w-6xl px-5 md:px-8 pt-12 md:pt-16 pb-20">
      <nav className="text-xs tracking-widest uppercase text-ink/50">
        <Link href="/catalogue">Catalogue</Link>
        {piece.collection && (
          <>
            <span className="mx-2">/</span>
            <span>{piece.collection.title}</span>
          </>
        )}
      </nav>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div className="flex flex-col gap-6">
          {(piece.images || [null]).map((img: any, i: number) => (
            <PieceImage
              key={i}
              image={img}
              alt={piece.title}
              ratio="portrait"
              priority={i === 0}
              sizes="(min-width:768px) 50vw, 100vw"
            />
          ))}
        </div>

        <div className="md:sticky md:top-24 md:self-start">
          <h1 className="serif text-4xl md:text-5xl">{piece.title}</h1>

          <dl className="mt-10 space-y-5 text-sm border-t hairline pt-6">
            {piece.materials && (
              <div>
                <dt className="uppercase tracking-widest text-ink/50 text-xs">Materials</dt>
                <dd className="mt-1">{piece.materials}</dd>
              </div>
            )}
            {piece.dimensions && (
              <div>
                <dt className="uppercase tracking-widest text-ink/50 text-xs">Dimensions</dt>
                <dd className="mt-1">{piece.dimensions}</dd>
              </div>
            )}
          </dl>

          {piece.description && (
            <p className="mt-8 text-ink/80 max-w-prose leading-relaxed">{piece.description}</p>
          )}

          <Link
            href="/apply"
            className="inline-block mt-10 border border-ink px-6 py-3 text-sm tracking-wide hover:bg-ink hover:text-cream transition-colors"
          >
            Enquire about stocking this piece
          </Link>
        </div>
      </div>
    </article>
  );
}
