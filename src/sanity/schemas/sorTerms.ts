import { defineField, defineType } from "sanity";

export default defineType({
  name: "sorTerms",
  title: "SOR terms page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "How sale or return works" }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
