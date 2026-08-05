import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/shared";

// Explicit allows so CDN/WAF bot management and AI answer engines
// (ChatGPT, Claude, Perplexity, Copilot) treat the docs as opt-in.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: aiCrawlers, allow: "/" },
      { userAgent: "*", allow: "/" }
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString()
  };
}
