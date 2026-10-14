import { COPY, SITE_NAME } from "@/content/site";

// Wordmark and one link. Nothing else, per SITE_SPEC.md 4.1.
export function Header({ joinHref = "#join" }: { joinHref?: string }) {
  return (
    <header className="site-header">
      <div className="column flex items-center justify-between gap-4">
        <p className="text-wordmark font-extrabold tracking-tight">{SITE_NAME}</p>
        <a href={joinHref} className="inline-flex min-h-11 items-center text-ui">
          {COPY.header.joinLink}
        </a>
      </div>
    </header>
  );
}
