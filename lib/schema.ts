import type { source } from "@/lib/source";
import { appDescription, appName, author, gitConfig, siteUrl } from "./shared";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const softwareId = `${siteUrl}/#software`;
const authorId = `${author.url}/#person`;

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: author.organization.name,
      url: author.organization.url,
      sameAs: [`https://github.com/${gitConfig.user}`]
    },
    {
      "@type": "Person",
      "@id": authorId,
      name: author.name,
      url: author.url,
      sameAs: [author.github],
      worksFor: { "@id": organizationId }
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: appName,
      description: appDescription,
      inLanguage: "en",
      publisher: { "@id": organizationId },
      creator: { "@id": authorId }
    }
  ]
};

export const softwareGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      "@id": softwareId,
      name: appName,
      description: appDescription,
      url: `${siteUrl}/`,
      codeRepository: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
      programmingLanguage: "TypeScript",
      runtimePlatform: "Node.js",
      license: "https://spdx.org/licenses/MIT.html",
      isPartOf: { "@id": websiteId },
      author: { "@id": authorId },
      maintainer: { "@id": organizationId },
      targetProduct: {
        "@type": "SoftwareApplication",
        name: "Better Auth",
        applicationCategory: "DeveloperApplication"
      }
    }
  ]
};

export function buildChangelogSchema(releases: { version: string; title: string; date: string }[]) {
  const pageUrl = `${siteUrl}/changelog`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: appName, item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Changelog", item: pageUrl }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${appName} Changelog`,
        description: `New features, fixes, and breaking changes in every ${appName} release.`,
        isPartOf: { "@id": websiteId },
        about: { "@id": softwareId },
        inLanguage: "en",
        ...(releases[0] ? { dateModified: releases[0].date } : {})
      },
      {
        "@type": "ItemList",
        itemListElement: releases.map((release, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `v${release.version}: ${release.title}`,
          url: `${pageUrl}#v${release.version}`
        }))
      }
    ]
  };
}

type Page = ReturnType<(typeof source)["getPages"]>[number];
type TreeNode = { type: string; name?: unknown; url?: string; children?: TreeNode[] };

/**
 * Section groups in meta.json ("Getting Started", "Reference", ...) render as
 * separators in the page tree and have no route of their own, so their crumb
 * points at /docs, the nearest real page.
 */
function findSectionName(nodes: TreeNode[], url: string): string | undefined {
  let section: string | undefined;
  for (const node of nodes) {
    if (node.type === "separator" && typeof node.name === "string") section = node.name;
    if (node.type === "page" && node.url === url) return section;
    if (node.children) {
      const nested = findSectionName(node.children, url);
      if (nested) return nested;
    }
  }
  return undefined;
}

export function buildDocsSchema(page: Page, tree: { children: unknown[] }) {
  const pageUrl = `${siteUrl}${page.url}`;
  const section = findSectionName(tree.children as TreeNode[], page.url);

  const crumbs = [
    { name: "Documentation", item: `${siteUrl}/docs` },
    ...(section ? [{ name: section, item: `${siteUrl}/docs` }] : []),
    ...(page.url === "/docs" ? [] : [{ name: page.data.title, item: pageUrl }])
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item
        }))
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.data.title,
        description: page.data.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": softwareId },
        inLanguage: "en"
      }
    ]
  };
}
