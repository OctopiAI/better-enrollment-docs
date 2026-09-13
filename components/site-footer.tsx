import { appName, author, gitConfig } from "@/lib/shared";

const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row">
        <p>
          {appName} is built by{" "}
          <a href={author.url} className="text-foreground underline-offset-4 hover:underline">
            {author.name}
          </a>{" "}
          at{" "}
          <a
            href={author.organization.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground underline-offset-4 hover:underline"
          >
            {author.organization.name}
          </a>
          .
        </p>
        <p className="flex items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <span aria-hidden>/</span>
          <a
            href={`${githubUrl}/blob/${gitConfig.branch}/LICENSE`}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground transition-colors"
          >
            MIT License
          </a>
        </p>
      </div>
    </footer>
  );
}
