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

/** Compares "1.0.0" and "0.8.1" numerically, part by part. */
const compareVersions = (a: string, b: string) => {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
};

/** Newest first; releases sharing a date are ordered by version. */
export const changelogEntries = [...changelog.entries].sort(
  (a, b) => b.date.localeCompare(a.date) || compareVersions(b.version, a.version)
);
