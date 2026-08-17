import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/* Sections for the docs introduction page. Everything is `not-prose` so the
   docs typography styles don't reach inside, and every surface uses theme
   tokens so light and dark both work. */

const glance = [
  { value: "2", label: "Modes" },
  { value: "4", label: "Invite kinds" },
  { value: "1", label: "Redemption page" },
  { value: "0", label: "Extra infrastructure" }
];

export function AtAGlance() {
  return (
    <div className="not-prose bg-border mt-8 grid grid-cols-2 gap-px overflow-hidden border sm:grid-cols-4">
      {glance.map((stat) => (
        <div key={stat.label} className="bg-background flex flex-col gap-1 p-4">
          <span className="text-primary font-mono text-2xl font-semibold">{stat.value}</span>
          <span className="text-muted-foreground text-[11px] tracking-wide uppercase">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ModeGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose grid gap-4 md:grid-cols-2">{children}</div>;
}

export function ModeCard({
  href,
  tag,
  title,
  description,
  points
}: {
  href: string;
  tag: string;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <Link
      href={href}
      data-card
      className="group bg-card hover:bg-muted/40 text-foreground relative flex flex-col overflow-hidden border p-6 transition-colors"
    >
      <div
        aria-hidden
        className="via-primary/70 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent"
      />
      <span className="text-primary font-mono text-[11px] tracking-wide">{tag}</span>
      <span className="mt-2 flex items-center gap-1.5 text-base font-semibold">
        {title}
        <ArrowUpRight className="text-muted-foreground size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      <span className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{description}</span>
      <ul className="mt-4 flex flex-col gap-2">
        {points.map((point) => (
          <li key={point} className="text-muted-foreground flex items-start gap-2.5 text-sm">
            <span aria-hidden className="bg-primary mt-1.75 size-1.5 shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export function FlowSteps({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose bg-border grid gap-px overflow-hidden border md:grid-cols-3">
      {children}
    </div>
  );
}

export function FlowStep({
  step,
  title,
  description
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background flex flex-col p-5">
      <span className="text-primary font-mono text-xs">{step}</span>
      <span className="mt-2.5 text-sm font-semibold">{title}</span>
      <span className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{description}</span>
    </div>
  );
}

export function FeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose bg-border grid gap-px overflow-hidden border sm:grid-cols-2">
      {children}
    </div>
  );
}

export function Feature({
  icon: Icon,
  title,
  description
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background hover:bg-muted/40 p-5 transition-colors">
      <Icon className="text-primary size-4.5" />
      <h3 className="mt-2.5 text-sm font-medium">{title}</h3>
      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
