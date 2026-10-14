import { COPY } from "@/content/site";

// The only numbered markers on the page: the real three-step sequence.
export function Steps() {
  return (
    <ol role="list" className="mt-6 grid gap-7">
      {COPY.howItWorks.steps.map((step, i) => (
        <li key={step} className="grid grid-cols-[2.75rem_1fr] gap-4">
          <span className="step-number">{i + 1}</span>
          <p className="step-text">{step}</p>
        </li>
      ))}
    </ol>
  );
}
