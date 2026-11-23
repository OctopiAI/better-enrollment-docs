"use client";

import { Popover, PopoverContent, PopoverTrigger } from "fumadocs-ui/components/ui/popover";
import { Check, ChevronsUpDown, Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { DOC_VERSIONS, type DocVersion, pathInVersion, versionOfPath } from "@/lib/versions";

/** "v0.8.0" -> "0.8.0", the way the switcher prints version numbers. */
const number = (v: DocVersion) => v.label.replace(/^v/, "");

/**
 * Version switcher at the top of the docs sidebar. Switching keeps the
 * reader on the same page when it exists in the other version, and falls
 * back to that version's introduction otherwise.
 */
export function VersionSwitcher({ pages }: { pages: string[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { version: current, rest } = versionOfPath(pathname);
  const known = new Set(pages);

  const hrefFor = (v: DocVersion) => {
    const same = pathInVersion(v, rest);
    return known.has(same) ? same : pathInVersion(v, "");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        // Same box as Fumadocs' sidebar search trigger, so the two line up.
        className={cn(
          "bg-fd-secondary/50 text-fd-muted-foreground inline-flex items-center gap-2 rounded-lg border p-1.5 ps-2 text-start text-sm",
          "hover:bg-fd-accent hover:text-fd-accent-foreground data-[popup-open]:bg-fd-accent transition-colors",
          "focus-visible:ring-fd-ring focus-visible:ring-2 focus-visible:outline-none"
        )}
        aria-label={`Documentation version: ${current.title} ${number(current)}`}
        data-version-switcher=""
      >
        <Layers className="size-4 shrink-0" />
        <span className="truncate">{current.title}</span>
        <span className="ms-auto inline-flex items-center gap-1">
          <kbd className="bg-fd-background rounded-md border px-1.5 font-mono">
            {number(current)}
          </kbd>
          <ChevronsUpDown className="size-4 shrink-0" />
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={4}
        className="border-fd-border flex w-(--anchor-width) flex-col gap-0.5 rounded-none border p-1"
      >
        {DOC_VERSIONS.map((v) => {
          const active = v.tag === current.tag;
          return (
            <Link
              key={v.tag}
              href={hrefFor(v)}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 px-3 py-2 transition-colors",
                "hover:bg-fd-accent hover:text-fd-accent-foreground",
                active && "bg-fd-accent/60"
              )}
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-sm leading-tight font-medium">{v.title}</span>
                <span className="text-fd-muted-foreground font-mono text-xs leading-tight">
                  {number(v)}
                </span>
              </span>
              <Check
                className={cn("text-fd-primary ms-auto size-3.5 shrink-0", !active && "invisible")}
              />
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
