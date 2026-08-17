import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { changelogEntries } from "@/lib/changelog";
import { siteUrl } from "@/lib/shared";
import { getLastModified } from "@/lib/last-modified";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: new URL("/", siteUrl).toString() },
    {
      url: new URL("/changelog", siteUrl).toString(),
      ...(changelogEntries[0]
        ? { lastModified: new Date(`${changelogEntries[0].date}T00:00:00Z`) }
        : {})
    },
    ...source.getPages().map((page) => {
      const lastModified = getLastModified(`content/docs/${page.path}`);
      return {
        url: new URL(page.url, siteUrl).toString(),
        ...(lastModified ? { lastModified } : {})
      };
    })
  ];
}
