import type { CSSProperties } from "react";

/** A short left-to-right (or top-to-bottom on narrow screens) sequence of labelled steps. */
export default function Flow({ steps, label }: { steps: string[]; label: string }) {
  return (
    <ol className="flow" aria-label={label}>
      {steps.map((step, i) => (
        <li key={step} className="flow__step" style={{ "--i": i } as CSSProperties}>
          <span className="flow__dot" aria-hidden="true" />
          <span className="flow__name">{step}</span>
        </li>
      ))}
    </ol>
  );
}
