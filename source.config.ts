import { defineConfig } from "fumadocs-mdx/config";
import { remarkHeadingStatus } from "./lib/remark-heading-status";

export default defineConfig({
  mdxOptions: {
    // Prepended so it runs before remark-heading: status markers must be
    // stripped before slugs and the TOC are computed.
    remarkPlugins: (defaults) => [remarkHeadingStatus, ...defaults]
  }
});
