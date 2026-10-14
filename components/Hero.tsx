import { COPY } from "@/content/site";
import { joinHref } from "@/lib/links";

// The sky lives in CSS (.hero in globals.css): a pre-dawn gradient that brightens once on load.
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="column">
        <h1 id="hero-title" className="text-display font-extrabold text-balance">
          {COPY.hero.headline}
        </h1>
        <p className="mt-5 max-w-[34rem] text-lead text-pretty">{COPY.hero.subhead}</p>
        <a href={joinHref} className="button mt-8">
          {COPY.hero.button}
        </a>
        <p className="mt-3.5 text-small">{COPY.hero.note}</p>
      </div>
      <div className="horizon" aria-hidden="true" />
    </section>
  );
}
