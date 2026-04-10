import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "appearance", title: "Appearance" },
  ],
  fields: [
    /* ── General ─────────────────────────────────── */
    defineField({ name: "brandName", type: "string", initialValue: "Richard Bravo", group: "general" }),
    defineField({ name: "tagline", type: "string", group: "general" }),
    defineField({ name: "introParagraph", type: "text", rows: 4, group: "general" }),
    defineField({ name: "contactEmail", type: "string", group: "general" }),
    defineField({
      name: "whatsappNumber",
      type: "string",
      description: "International format, no +",
      group: "general",
    }),

    /* ── Appearance ──────────────────────────────── */
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      description: "Homepage hero — recommended 2400 × 1350 px",
      group: "appearance",
    }),
    defineField({
      name: "headerLogo",
      title: "Header logo",
      type: "image",
      description: "Optional logo for the header. If empty, brand name text is shown.",
      group: "appearance",
    }),
    defineField({
      name: "colorCream",
      title: "Background colour",
      type: "string",
      description: "Hex value for page background (default #FAF8F5)",
      group: "appearance",
    }),
    defineField({
      name: "colorInk",
      title: "Text colour",
      type: "string",
      description: "Hex value for body text (default #1A1A1A)",
      group: "appearance",
    }),
    defineField({
      name: "colorSlate",
      title: "Muted text colour",
      type: "string",
      description: "Hex value for secondary / hover text (default #5C6B7A)",
      group: "appearance",
    }),
    defineField({
      name: "colorRule",
      title: "Border colour",
      type: "string",
      description: "Hex value for borders and dividers (default #E6E2DA)",
      group: "appearance",
    }),
    defineField({
      name: "fontSerif",
      title: "Serif font",
      type: "string",
      description: "Google Font name for headings (default Cormorant Garamond)",
      group: "appearance",
    }),
    defineField({
      name: "fontSans",
      title: "Sans-serif font",
      type: "string",
      description: "Google Font name for body text (default Inter)",
      group: "appearance",
    }),
  ],
});
