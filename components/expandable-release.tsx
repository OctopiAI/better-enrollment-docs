"use client";

import { useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Collapses a long release body to a fixed height with a fade-out, behind an
 * "Expand release" toggle. Whether a release is long enough to collapse is
 * decided server-side (from the raw MDX length), so the initial HTML already
 * matches what the user sees and nothing jumps on hydration.
 */
export function ExpandableRelease({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    const next = !expanded;
    setExpanded(next);
    // Collapsing from deep inside a long entry would strand the viewport;
    // snap back to the top of the release.
    if (!next && containerRef.current) {
      const { top } = containerRef.current.getBoundingClientRect();
      if (top < 0) containerRef.current.scrollIntoView({ block: "start" });
    }
  }

  return (
    <div ref={containerRef} className="scroll-mt-24">
      <div className={cn("relative", !expanded && "max-h-[30rem] overflow-hidden")}>
        {children}
        {!expanded && (
          <div
            aria-hidden
            className="to-background absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent"
          />
        )}
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        className="text-muted-foreground hover:text-foreground mt-4 flex items-center gap-1.5 font-mono text-xs tracking-wide transition-colors"
      >
        <ChevronDown
          className={cn("size-3.5 transition-transform", expanded && "rotate-180")}
          aria-hidden
        />
        {expanded ? "Collapse release" : "Expand release"}
      </button>
    </div>
  );
}
