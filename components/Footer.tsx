import { COPY } from "@/content/site";
import { ThemeControl } from "@/components/ThemeControl";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="column footer-inner">
        <p className="font-bold">{COPY.footer.tagline}</p>
        <p className="mt-1 text-small text-ink-soft">{COPY.footer.disclaimer}</p>
        <p className="mt-1 text-small text-ink-soft">
          {COPY.footer.copyright} {year}
        </p>
        <ThemeControl />
      </div>
    </footer>
  );
}
