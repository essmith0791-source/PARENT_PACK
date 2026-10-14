import { COPY, HELP_LINES, actionLabel, type HelpLine } from "@/content/site";
import { actionHref } from "@/lib/links";

export function HelpNow() {
  return (
    <section className="help" aria-labelledby="help-title">
      <h2 id="help-title" className="text-h2 font-bold">
        {COPY.helpNow.heading}
      </h2>
      <ul role="list" className="mt-2">
        {HELP_LINES.map((line) => (
          <li key={line.id} className="help-row">
            <HelpLineItem line={line} />
          </li>
        ))}
      </ul>
    </section>
  );
}

// Also used inside the FAQ answer about struggling right now.
export function HelpLineItem({ line }: { line: HelpLine }) {
  return (
    <>
      <p className="font-bold">{line.name}</p>
      {line.note ? <p className="text-small text-ink-soft">{line.note}</p> : null}
      <p className="flex flex-wrap gap-x-6">
        {line.actions.map((action) => (
          <a key={actionHref(action)} href={actionHref(action)} className="help-action">
            {actionLabel(action)}
          </a>
        ))}
      </p>
    </>
  );
}
