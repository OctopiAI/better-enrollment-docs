import { ImageResponse } from "next/og";
import { HomeOG, loadOGFonts, ogSize } from "@/lib/og";
import { appDescription, appName } from "@/lib/shared";

export const dynamic = "force-static";
export const alt = `${appName}: ${appDescription}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<HomeOG />, {
    ...ogSize,
    fonts: await loadOGFonts()
  });
}
