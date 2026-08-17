import { defineCollections } from "fumadocs-mdx/macro";
import * as z from "zod";

/**
 * Changelog entries live in `content/changelog/*.mdx`, one file per release.
 * `date` stays a string ("YYYY-MM-DD") so the validated frontmatter survives
 * the bundler unchanged; the page formats it for display.
 */
const changelog = defineCollections({
  type: "doc",
  dir: "content/changelog",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    version: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
  })
});

export const changelogEntries = [...changelog.entries].sort((a, b) => b.date.localeCompare(a.date));
