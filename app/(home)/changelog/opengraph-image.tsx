import { ImageResponse } from "next/og";
import { DocsOG, loadOGFonts, ogSize } from "@/lib/og";
import { changelogEntries } from "@/lib/changelog";
import { appName } from "@/lib/shared";

export const dynamic = "force-static";
export const alt = `${appName} Changelog`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const latest = changelogEntries[0];
  const latestDate = latest
    ? new Date(`${latest.date}T00:00:00Z`)
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC"
        })
        .toUpperCase()
    : undefined;

  return new ImageResponse(
    <DocsOG
      section="Changelog"
      title="What's new"
      description={`New features, fixes, and breaking changes in every ${appName} release.`}
      kicker={latest ? `LATEST RELEASE V${latest.version} · ${latestDate}` : "RELEASE BY RELEASE"}
    />,
    {
      ...ogSize,
      fonts: await loadOGFonts()
    }
  );
}
