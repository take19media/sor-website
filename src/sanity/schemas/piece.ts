import { defineField, defineType } from "sanity";

export default defineType({
  name: "piece",
  title: "Jewellery piece",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "collection",
      type: "reference",
      to: [{ type: "collection" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.min(1),
    }),
    defineField({ name: "materials", type: "string", description: "e.g. 18ct yellow gold, sapphire" }),
    defineField({ name: "dimensions", type: "string", description: "e.g. 18mm drop, 2mm band" }),
    defineField({ name: "description", type: "text", rows: 5 }),
    defineField({
      name: "availableForSOR",
      title: "Available for SOR",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "collection.title", media: "images.0" },
  },
});
