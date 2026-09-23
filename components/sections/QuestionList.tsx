"use client";

import { useId, useState } from "react";
import { perspectiveQuestions } from "@/data/content";

export default function QuestionList() {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <ul className="qa">
      {perspectiveQuestions.map((item, i) => {
        const isOpen = open === i;
        const panel = `${base}-${i}`;
        return (
          <li key={item.q} className={`qa__item${isOpen ? " is-open" : ""}`}>
            <h3 className="qa__q">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="qa__icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="qa__a" id={panel} inert={!isOpen}>
              <div className="qa__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
