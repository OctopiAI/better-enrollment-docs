import type { Metadata } from "next";
import type { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import { ExpandableRelease } from "@/components/expandable-release";
import { getMDXComponents } from "@/components/mdx";
import { JsonLd } from "@/components/json-ld";
import { changelogEntries } from "@/lib/changelog";
import { buildChangelogSchema } from "@/lib/schema";
import { appName, gitConfig } from "@/lib/shared";

const pageTitle = "Changelog";
const pageDescription = `New features, fixes, and breaking changes in every ${appName} release.`;
const releasesUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/releases`;

/** Only the most recent releases render on the page; the rest live on GitHub. */
const MAX_RELEASES = 15;
/** Raw MDX size above which a release body starts collapsed behind a toggle. */
const COLLAPSE_THRESHOLD = 2800;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/changelog"
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/changelog",
    siteName: appName,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription
  }
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });
}

/* Entry bodies share section headings ("Breaking changes", "Fixes"), so the
   auto-generated ids would collide across releases; strip them and keep the
   release anchor (#vX.Y.Z) as the only deep link. */
function plainHeading<T extends "h2" | "h3" | "h4">(Tag: T) {
  return function PlainHeading({ id: _id, ...props }: ComponentProps<T>) {
    const Element = Tag as "h3";
    return <Element {...(props as ComponentProps<"h3">)} />;
  };
}

const mdxComponents = getMDXComponents({
  h2: plainHeading("h2"),
  h3: plainHeading("h3"),
  h4: plainHeading("h4")
});

export default async function ChangelogPage() {
  const visibleEntries = changelogEntries.slice(0, MAX_RELEASES);
  const entries = await Promise.all(
    visibleEntries.map(async (entry) => ({
      entry,
      collapsible: (await entry.getText("raw")).length > COLLAPSE_THRESHOLD
    }))
  );
  const hasOlderReleases = changelogEntries.length > MAX_RELEASES;

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={buildChangelogSchema(visibleEntries)} />
      <section className="mx-auto w-full max-w-4xl px-4 pt-16 pb-12 md:pt-24">
        <span className="text-primary font-mono text-[11px] tracking-widest uppercase">
          Changelog
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          What&apos;s new in {appName}
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl text-base text-balance">
          Every release of the plugin, with the features, fixes, and breaking changes that shipped
          in it. Also published on{" "}
          <a
            href={releasesUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary hover:text-foreground transition-colors"
          >
            GitHub releases
          </a>
          .
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-24">
        {entries.map(({ entry, collapsible }, index) => {
          const anchor = `v${entry.version}`;
          const isLast = index === entries.length - 1;
          const body = (
            <div className="prose mt-6 text-sm [&_h3]:text-base [&_h3]:font-medium">
              <entry.body components={mdxComponents} />
            </div>
          );

          return (
            <article
              key={entry.version}
              id={anchor}
              className="grid scroll-mt-24 gap-y-4 md:grid-cols-[11rem_1fr]"
            >
              <aside className="flex flex-row items-baseline gap-3 pt-0.5 md:sticky md:top-20 md:flex-col md:items-start md:gap-2 md:self-start">
                <Badge
                  variant="outline"
                  className="border-primary/40 bg-background/60 text-foreground gap-2 px-3 py-1 font-mono text-[11px] font-normal tracking-wide"
                  asChild
                >
                  <a
                    href={`${releasesUrl}/tag/v${entry.version}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="bg-primary size-1.5" />v{entry.version}
                  </a>
                </Badge>
                <time dateTime={entry.date} className="text-muted-foreground text-sm">
                  {formatDate(entry.date)}
                </time>
              </aside>

              <div className={`relative border-l pl-6 md:pl-10 ${isLast ? "pb-4" : "pb-16"}`}>
                <span aria-hidden className="bg-primary absolute top-2 -left-1 size-2" />
                <h2 className="text-xl font-semibold tracking-tight text-balance md:text-2xl">
                  <a href={`#${anchor}`} className="hover:text-primary transition-colors">
                    {entry.title}
                  </a>
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed md:text-base">
                  {entry.description}
                </p>
                {collapsible ? <ExpandableRelease>{body}</ExpandableRelease> : body}
              </div>
            </article>
          );
        })}

        {hasOlderReleases && (
          <p className="text-muted-foreground border-t pt-8 text-sm md:ml-[11rem] md:pl-10">
            Showing the last {MAX_RELEASES} releases. Older release notes live on{" "}
            <a
              href={releasesUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary hover:text-foreground transition-colors"
            >
              GitHub releases
            </a>
            .
          </p>
        )}
      </section>
    </main>
  );
}
