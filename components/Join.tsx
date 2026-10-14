import { COPY, JOIN_KEYWORD, PILOT_PHONE } from "@/content/site";
import { joinHref } from "@/lib/links";

export function Join() {
  return (
    <section id="join" aria-labelledby="join-title" className="section join">
      <h2 id="join-title" className="text-h2 font-bold">
        {COPY.join.heading}
      </h2>
      <p className="mt-3 text-lead">
        {COPY.join.lineStart} <mark>{JOIN_KEYWORD}</mark> {COPY.join.lineMiddle}{" "}
        <span className="whitespace-nowrap">{PILOT_PHONE}</span>
        {COPY.join.lineEnd}
      </p>
      <a href={joinHref} className="button mt-6">
        {COPY.hero.button}
      </a>
      <p className="mt-3 text-small text-ink-soft">{COPY.join.note}</p>
    </section>
  );
}
