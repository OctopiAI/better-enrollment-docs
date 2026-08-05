import { execSync } from "node:child_process";

/**
 * Last commit date for a file, resolved at build time. Returns undefined for
 * files with no commit history yet (or when git is unavailable), in which
 * case no "Last updated" stamp is rendered.
 */
export function getLastModified(filePath: string): Date | undefined {
  try {
    const out = execSync(`git log -1 --format=%aI -- "${filePath}"`, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "ignore"]
    })
      .toString()
      .trim();
    return out ? new Date(out) : undefined;
  } catch {
    return undefined;
  }
}
