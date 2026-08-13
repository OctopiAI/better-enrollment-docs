import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { PageStatus } from "@/lib/shared";

const statusStyles: Record<PageStatus, string> = {
  new: "border-primary/40 bg-primary/10 text-primary",
  updated: "border-emerald-600/40 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
  beta: "border-sky-600/40 bg-sky-600/10 text-sky-700 dark:text-sky-400",
  experimental: "border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  deprecated: "border-destructive/40 bg-destructive/10 text-destructive"
};

export function renderStatusBadge(status: string): ReactNode {
  return (
    <span
      className={cn(
        "ms-1.5 inline-flex shrink-0 items-center border px-1 text-[10px] font-medium tracking-wide uppercase",
        statusStyles[status as PageStatus] ?? "border-border bg-muted text-muted-foreground"
      )}
    >
      {status}
    </span>
  );
}
