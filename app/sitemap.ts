import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { siteUrl } from "@/lib/shared";
import { getLastModified } from "@/lib/last-modified";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: new URL("/", siteUrl).toString() },
    ...source.getPages().map((page) => {
      const lastModified = getLastModified(`content/docs/${page.path}`);
      return {
        url: new URL(page.url, siteUrl).toString(),
        ...(lastModified ? { lastModified } : {})
      };
    })
  ];
}
