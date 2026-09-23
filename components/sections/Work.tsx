"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import SplitWords from "@/components/motion/SplitWords";
import ProjectRow from "./ProjectRow";

export default function Work() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <span className="rule" data-reveal="line" aria-hidden="true" />
        <div className="split split--tight">
          <h2 id="work-title" className="display-m" data-reveal="words">
            <SplitWords text="Things I have built" />
          </h2>
          <p className="lead">
            Six projects. SEVEN is the largest, so it also gets its own chapter right after this
            list.
          </p>
        </div>

        <ol className="work">
          {projects.map((project) => (
            <ProjectRow
              key={project.slug}
              project={project}
              open={open === project.slug}
              onToggle={() => setOpen(open === project.slug ? null : project.slug)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
