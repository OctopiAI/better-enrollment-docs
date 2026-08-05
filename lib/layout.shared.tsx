import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { LogoMark } from "@/components/logo";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      transparentMode: "top",
      title: (
        <>
          <LogoMark className="text-primary h-4 w-auto" />
          {appName}
        </>
      )
    },
    links: [
      {
        text: "Documentation",
        url: "/docs",
        active: "nested-url"
      }
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`
  };
}
