import Link from "next/link";
import {
  ArrowRight,
  Building2,
  DoorClosed,
  FileClock,
  Link2,
  Mail,
  ShieldCheck,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/install-command";
import { GradientWaves } from "@/components/gradient-waves";
import { JsonLd } from "@/components/json-ld";
import { softwareGraph } from "@/lib/schema";
import { appDescription, appName, gitConfig } from "@/lib/shared";
import type { Metadata } from "next";

const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: appName,
    description: appDescription,
    url: "/",
    siteName: appName,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: appDescription
  }
};

const features = [
  {
    icon: DoorClosed,
    title: "Invite-only mode",
    description: "Close every sign-up route and let people in only through invitations."
  },
  {
    icon: Mail,
    title: "Private invites",
    description: "Email-bound, single use, and verified on accept."
  },
  {
    icon: Link2,
    title: "Public invite links",
    description: "Shareable links with use caps, expiry, and revocation."
  },
  {
    icon: Building2,
    title: "Organization onboarding",
    description: "One link joins an org, or lets the invitee found their own with seat limits."
  },
  {
    icon: ShieldCheck,
    title: "Security first",
    description: "Hashed tokens, atomic race-safe redemption, and no email oracles."
  },
  {
    icon: FileClock,
    title: "Audit trail",
    description: "An append-only record of who invited whom and who redeemed what."
  }
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={softwareGraph} />
      <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
        <div aria-hidden className="absolute inset-0">
          <GradientWaves
            horizonColor="#6E56CF"
            waveColor="#4B3A9E"
            crestColor="#9F8CFF"
            speed={0.25}
            amplitude={3.5}
            waveScale={0.8}
            fogDepth={30}
            detail="high"
            brightness={1.05}
            opacity={0.5}
            grain={false}
            mouseInteraction
          />
          <div className="to-background pointer-events-none absolute inset-0 bg-linear-to-b from-transparent from-80%" />
        </div>

        <div className="relative flex flex-col items-center">
          <Badge
            variant="outline"
            className="border-primary/40 bg-background/60 text-muted-foreground mb-7 gap-2 px-3 py-1 font-mono text-[11px] font-normal tracking-wide uppercase backdrop-blur"
          >
            <span className="bg-primary size-1.5" />
            An Invite plugin for Better Auth
          </Badge>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Better Enrollment
          </h1>
          <p className="text-primary mt-3 text-lg font-medium md:text-xl">
            Invitations, as the front door of your app.
          </p>
          <p className="text-muted-foreground mt-5 max-w-xl text-base text-balance md:text-lg">
            Run fully invite-only, hand out shareable invite links, or use invites as role and
            organization grants in an open app.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/85"
              asChild
            >
              <Link href="/docs">
                Get Started
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-background/60 backdrop-blur" asChild>
              <a href={githubUrl} target="_blank" rel="noreferrer noopener">
                <Star />
                Star on GitHub
              </a>
            </Button>
          </div>

          <InstallCommand className="mt-12" />
        </div>

        <div className="text-muted-foreground pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <div className="border-muted-foreground/40 flex h-9 w-5.5 justify-center rounded-full border pt-1.5">
            <span className="bg-muted-foreground/70 h-1.5 w-0.75 animate-[scroll-wheel_1.8s_ease-in-out_infinite] rounded-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pt-8 pb-24">
        <div className="mb-10 flex flex-col items-start gap-2">
          <span className="text-primary font-mono text-[11px] tracking-widest uppercase">
            Features
          </span>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Everything the front door needs
          </h2>
        </div>

        <div className="bg-border grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-background hover:bg-muted/40 p-6 text-left transition-colors"
            >
              <feature.icon className="text-primary size-4.5" />
              <h3 className="mt-3 text-sm font-medium">{feature.title}</h3>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-24">
        <div className="bg-card relative overflow-hidden border text-center">
          <div
            aria-hidden
            className="via-primary absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="bg-primary/20 absolute -bottom-20 left-1/3 h-56 w-2/3 -translate-x-1/2 blur-3xl" />
            <div className="absolute right-0 -bottom-28 h-64 w-1/2 bg-[#8B7BD8]/15 blur-3xl" />
            <svg
              className="absolute bottom-0 left-0 h-24 w-full md:h-32"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,70 C180,30 380,105 620,72 C860,40 1020,95 1200,55 L1200,120 L0,120 Z"
                fill="#6E56CF"
                opacity="0.18"
              />
              <path
                d="M0,88 C240,58 460,112 700,88 C920,66 1060,100 1200,78 L1200,120 L0,120 Z"
                fill="#8B7BD8"
                opacity="0.22"
              />
              <path
                d="M0,102 C300,82 520,116 780,100 C980,88 1100,108 1200,96 L1200,120 L0,120 Z"
                fill="#9F8CFF"
                opacity="0.28"
              />
            </svg>
          </div>
          <div className="relative px-6 py-16 md:py-20">
            <span className="text-primary font-mono text-[11px] tracking-widest uppercase">
              Get started
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
              Put a front door on your app
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm md:text-base">
              Install the plugin, run one migration, and your first invitation is out the door in
              minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/85"
                asChild
              >
                <Link href="/docs/quick-start">
                  Quick Start
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-background/60 backdrop-blur"
                asChild
              >
                <Link href="/docs">Read the docs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
