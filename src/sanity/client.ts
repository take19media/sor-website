import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xua6ijxw";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "product";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const builder = imageUrlBuilder({ projectId, dataset });
export const urlFor = (src: Image) => builder.image(src);
