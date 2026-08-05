import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { appDescription, appName, siteUrl } from "@/lib/shared";
import { JsonLd } from "@/components/json-ld";
import { siteGraph } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`
  },
  description: appDescription
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <JsonLd data={siteGraph} />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
