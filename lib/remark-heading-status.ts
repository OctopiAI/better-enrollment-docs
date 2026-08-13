import { PAGE_STATUSES } from "./shared";

/**
 * Remark plugin: `## Some heading [!new]` marks a section with a status.
 *
 * The marker is stripped from the text and replaced with a childless
 * `<span data-heading-status="new" />` appended to the heading. Being
 * childless, it adds nothing to the slug (this plugin runs before
 * fumadocs' remark-heading) or to the search index, while rehype-toc
 * copies the heading's children into the TOC, so the badge shows up in
 * both places. The visible label is drawn by CSS from the attribute;
 * see `[data-heading-status]` in global.css.
 */

const MARKER = new RegExp(`\\s*\\[!(${PAGE_STATUSES.join("|")})\\]`);

interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
  name?: string;
  attributes?: { type: string; name: string; value: string }[];
}

export function remarkHeadingStatus() {
  return (tree: MdNode) => walk(tree);
}

function walk(node: MdNode) {
  if (node.type === "heading") {
    tagHeading(node);
    return;
  }
  for (const child of node.children ?? []) walk(child);
}

function tagHeading(heading: MdNode) {
  let status: string | undefined;
  for (const child of heading.children ?? []) {
    if (child.type !== "text" || !child.value) continue;
    const match = MARKER.exec(child.value);
    if (match) {
      status = match[1];
      child.value = child.value.replace(MARKER, "");
      break;
    }
  }
  if (!status) return;
  heading.children?.push({
    type: "mdxJsxTextElement",
    name: "span",
    attributes: [{ type: "mdxJsxAttribute", name: "data-heading-status", value: status }],
    children: []
  });
}
