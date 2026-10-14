import type { Metadata } from "next";
import { COPY } from "@/content/site";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: COPY.notFound.title,
};

// Same sky as the home page, shown in its final frame with no animation.
export default function NotFound() {
  return (
    <>
      <Header joinHref="/#join" />
      <main>
        <section className="hero hero-static" aria-labelledby="not-found-title">
          <div className="column">
            <h1 id="not-found-title" className="text-display font-extrabold">
              {COPY.notFound.heading}
            </h1>
            <p className="mt-6 text-lead">
              <a href="/">{COPY.notFound.link}</a>
            </p>
          </div>
          <div className="horizon" aria-hidden="true" />
        </section>
      </main>
    </>
  );
}
