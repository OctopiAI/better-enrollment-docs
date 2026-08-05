"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const COMMAND = "pnpm add @octopi-ai/better-enrollment";

export function InstallCommand({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy install command"
      className={cn(
        "group bg-muted/40 text-muted-foreground hover:bg-muted/70 inline-flex items-center gap-3 rounded-lg border px-4 py-2.5 font-mono text-sm transition-colors",
        className
      )}
    >
      <span className="text-muted-foreground/60 select-none">~$</span>
      <span className="text-foreground">{COMMAND}</span>
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5 opacity-40 transition-opacity group-hover:opacity-80" />
      )}
    </button>
  );
}
