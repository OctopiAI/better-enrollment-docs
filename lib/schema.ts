import type { source } from "@/lib/source";
import { appDescription, appName, gitConfig, siteUrl } from "./shared";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const softwareId = `${siteUrl}/#software`;

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: gitConfig.user,
      url: `https://github.com/${gitConfig.user}`,
      sameAs: [`https://github.com/${gitConfig.user}`]
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: appName,
      description: appDescription,
      inLanguage: "en",
      publisher: { "@id": organizationId }
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
      author: { "@id": organizationId },
      targetProduct: {
        "@type": "SoftwareApplication",
        name: "Better Auth",
        applicationCategory: "DeveloperApplication"
      }
    }
  ]
};

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
