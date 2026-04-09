import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "brandName", type: "string", initialValue: "Richard Bravo" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "whatsappNumber", type: "string", description: "International format, no +" }),
    defineField({ name: "introParagraph", type: "text", rows: 4 }),
  ],
});
