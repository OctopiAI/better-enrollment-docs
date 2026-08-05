import { getPageImageUrl, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { DocsOG, loadOGFonts, ogSize } from "@/lib/og";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/og/docs/[...slug]">) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(<DocsOG title={page.data.title} description={page.data.description} />, {
    ...ogSize,
    fonts: await loadOGFonts()
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments
  }));
}
