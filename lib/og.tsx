// Shared design for all OG images: dark canvas, Octopi purple wave silhouettes
// along the bottom, the logo mark, and Inter typography. Rendered by satori
// via next/og ImageResponse, so styles are limited to flexbox + gradients.

import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { logoMarkPath } from "@/components/logo";
import { appName } from "@/lib/shared";

export const ogSize = { width: 1200, height: 630 };

const purple = "#6E56CF";
const purpleMid = "#8B7BD8";
const purpleLight = "#9F8CFF";
const gray = "#A1A1AA";

export async function loadOGFonts() {
  const dir = path.join(process.cwd(), "lib/og-fonts");
  const [regular, semibold, extrabold] = await Promise.all([
    readFile(path.join(dir, "inter-regular.ttf")),
    readFile(path.join(dir, "inter-semibold.ttf")),
    readFile(path.join(dir, "inter-extrabold.ttf"))
  ]);

  return [
    { name: "Inter", data: regular, weight: 400 as const },
    { name: "Inter", data: semibold, weight: 600 as const },
    { name: "Inter", data: extrabold, weight: 800 as const }
  ];
}

function Waves() {
  return (
    <svg
      width="1200"
      height="240"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{ position: "absolute", bottom: 0, left: 0 }}
    >
      <path
        d="M0,70 C180,30 380,105 620,72 C860,40 1020,95 1200,55 L1200,120 L0,120 Z"
        fill={purple}
        opacity="0.25"
      />
      <path
        d="M0,88 C240,58 460,112 700,88 C920,66 1060,100 1200,78 L1200,120 L0,120 Z"
        fill={purpleMid}
        opacity="0.3"
      />
      <path
        d="M0,102 C300,82 520,116 780,100 C980,88 1100,108 1200,96 L1200,120 L0,120 Z"
        fill={purpleLight}
        opacity="0.38"
      />
    </svg>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "#0A0A0A",
        fontFamily: "Inter"
      }}
    >
      {/* soft purple glow behind the waves */}
      <div
        style={{
          position: "absolute",
          bottom: -220,
          left: 200,
          width: 800,
          height: 460,
          background:
            "radial-gradient(ellipse at center, rgba(110,86,207,0.35) 0%, rgba(110,86,207,0) 70%)"
        }}
      />
      <Waves />
      {/* purple hairline along the top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 5,
          background: `linear-gradient(90deg, rgba(110,86,207,0) 0%, ${purple} 50%, rgba(110,86,207,0) 100%)`
        }}
      />
      {children}
    </div>
  );
}

function Mark({ size, color = "#FFFFFF" }: { size: number; color?: string }) {
  return (
    <svg width={size * (400 / 300)} height={size} viewBox="0 0 400 300">
      <path fill={color} d={logoMarkPath} />
    </svg>
  );
}

/** OG image for docs pages: brand header, big title, description. */
export function DocsOG({ title, description }: { title: string; description?: string }) {
  return (
    <Frame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 72
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Mark size={30} />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#FFFFFF" }}>
            {appName}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#52525B" }}>/</div>
          <div style={{ display: "flex", fontSize: 30, color: gray }}>Docs</div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 96,
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#FFFFFF",
            maxWidth: 1000
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 33,
              lineHeight: 1.4,
              color: gray,
              maxWidth: 940
            }}
          >
            {description}
          </div>
        ) : null}

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40 }}>
          <div style={{ display: "flex", width: 12, height: 12, backgroundColor: purple }} />
          <div
            style={{
              display: "flex",
              fontSize: 23,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: purpleMid
            }}
          >
            AN INVITE PLUGIN FOR BETTER AUTH
          </div>
        </div>

        {/* keep the text block pinned to the top, clear of the waves */}
        <div style={{ display: "flex", flexGrow: 1 }} />
      </div>
    </Frame>
  );
}

/** OG image for the homepage: centered brand lockup. */
export function HomeOG() {
  return (
    <Frame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingBottom: 60
        }}
      >
        <Mark size={84} />
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#FFFFFF"
          }}
        >
          {appName}
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 37, color: gray }}>
          Invitations, as the front door of your app.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 44 }}>
          <div style={{ display: "flex", width: 12, height: 12, backgroundColor: purple }} />
          <div
            style={{
              display: "flex",
              fontSize: 23,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: purpleMid
            }}
          >
            AN INVITE PLUGIN FOR BETTER AUTH
          </div>
        </div>
      </div>
    </Frame>
  );
}
