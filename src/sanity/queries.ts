import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  brandName, tagline, contactEmail, whatsappNumber, introParagraph
}`;

export const allPiecesByCollectionQuery = groq`*[_type == "collection"] | order(order asc, title asc){
  _id, title, "slug": slug.current, description,
  "pieces": *[_type == "piece" && references(^._id) && availableForSOR == true]{
    _id, title, "slug": slug.current, materials, dimensions, images
  }
}`;

export const pieceBySlugQuery = groq`*[_type == "piece" && slug.current == $slug][0]{
  _id, title, materials, dimensions, description, images,
  "collection": collection->{title, "slug": slug.current}
}`;

export const allPieceSlugsQuery = groq`*[_type == "piece" && defined(slug.current)][].slug.current`;

export const sorTermsQuery = groq`*[_type == "sorTerms"][0]{ title, intro, body }`;
