import { COPY, HELP_LINES } from "@/content/site";
import { HelpLineItem } from "@/components/HelpNow";

const linesById = new Map(HELP_LINES.map((line) => [line.id, line]));

// Native <details>: works without JavaScript and opens instantly.
export function Faq() {
  return (
    <div className="faq mt-6">
      {COPY.faq.items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <div className="faq-answer">
            {item.helpLines ? (
              <ul role="list" className="mb-4 grid gap-2">
                {item.helpLines.map((id) => {
                  const line = linesById.get(id);
                  if (!line) throw new Error(`FAQ refers to unknown help line "${id}"`);
                  return (
                    <li key={id}>
                      <HelpLineItem line={line} />
                    </li>
                  );
                })}
              </ul>
            ) : null}
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
