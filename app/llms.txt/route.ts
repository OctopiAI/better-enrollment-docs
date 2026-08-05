import { getPageMarkdownUrl, source } from "@/lib/source";
import { appDescription, appName, siteUrl } from "@/lib/shared";

export const revalidate = false;

type TreeNode = {
  type: string;
  name?: unknown;
  url?: string;
  children?: TreeNode[];
};

export function GET() {
  const pagesByUrl = new Map(source.getPages().map((page) => [page.url, page]));
  const lines: string[] = [`# ${appName}`, "", `> ${appDescription}`];

  const walk = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      if (node.type === "separator" && typeof node.name === "string") {
        lines.push("", `## ${node.name}`, "");
      } else if (node.type === "page" && node.url) {
        const page = pagesByUrl.get(node.url);
        if (!page) continue;
        const markdownUrl = `${siteUrl}${getPageMarkdownUrl(page).url}`;
        const description = page.data.description ? `: ${page.data.description}` : "";
        lines.push(`- [${page.data.title}](${markdownUrl})${description}`);
      } else if (node.children) {
        walk(node.children);
      }
    }
  };
  walk(source.getPageTree().children as TreeNode[]);

  return new Response(lines.join("\n") + "\n");
}
