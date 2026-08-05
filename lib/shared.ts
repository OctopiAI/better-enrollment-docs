export const appName = "Better Enrollment";
export const appDescription =
  "Invite-only signups, role-merging invite links, and organization invites for Better Auth.";
// Set NEXT_PUBLIC_SITE_URL to the production origin when deploying.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

export const gitConfig = {
  user: "OctopiAI",
  repo: "better-enrollment",
  branch: "main"
};
