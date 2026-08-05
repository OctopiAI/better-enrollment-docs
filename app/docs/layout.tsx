import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/docs">) {
  const base = baseOptions();

  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...base}
      links={[...(base.links ?? []), { text: "llms.txt", url: "/llms.txt" }]}
    >
      {children}
    </DocsLayout>
  );
}
