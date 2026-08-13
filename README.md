<div align="center">
    <h1>【 Better Enrollment Docs 】</h1>
    <h3></h3>
</div>

<div align="center">

![](https://shields.octopi.ai/github/last-commit/FalconiZzare/better-enrollment-docs?&style=for-the-badge&color=8ad7eb&logo=git&logoColor=D9E0EE&labelColor=1E202B)
![](https://shields.octopi.ai/github/stars/FalconiZzare/better-enrollment-docs?style=for-the-badge&logo=andela&color=86dbd7&logoColor=D9E0EE&labelColor=1E202B)
![](https://shields.octopi.ai/github/repo-size/FalconiZzare/better-enrollment-docs?color=86dbce&label=SIZE&logo=protondrive&style=for-the-badge&logoColor=D9E0EE&labelColor=1E202B)
![](https://shields.octopi.ai/github/forks/FalconiZzare/better-enrollment-docs?color=86dbce&label=FORKS&logo=forgejo&style=for-the-badge&logoColor=D9E0EE&labelColor=1E202B)

</div>

<p align="center">
  Documentation and landing site for <a href="https://github.com/OctopiAI/better-enrollment"><code>@octopi-ai/better-enrollment</code></a>, the Better Auth plugin that makes invitations the front door of your app.
  <br />
  <br />
  <a href="https://better-enrollment.octopi.ai">Live site</a>
  ·
  <a href="https://github.com/OctopiAI/better-enrollment">Plugin repo</a>
  ·
  <a href="https://github.com/FalconiZzare/better-enrollment-docs/issues">Issues</a>
</p>

<p align="center">
  <a href="https://choosealicense.com/licenses/mit/">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript&logoColor=white" />
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white" />
  </a>
  <a href="https://fumadocs.dev/">
    <img src="https://img.shields.io/badge/Fumadocs-16-8b5cf6" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white" />
  </a>
</p>

## What's inside

Next.js 16 + Fumadocs 16, styled with Tailwind CSS 4 and shadcn/ui. Ships an OG image per page, `llms.txt` and per-page Markdown endpoints for AI agents, and full-text search.

## Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Docs live in `content/docs` as MDX; sidebar order is set in `content/docs/meta.json`.

## Writing conventions

- `status: new | updated | beta | experimental | deprecated` in a page's frontmatter renders a badge next to its sidebar entry.
- `## Some heading [!new]` tags a single section: the badge shows on the heading and in the table of contents, without touching the anchor slug.
- Keep prose free of em and en dashes; commas, colons, and parentheses instead.

## Build

```bash
pnpm build
pnpm start
```
