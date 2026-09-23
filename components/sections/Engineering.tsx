import { alsoWorkedWith, languages, principles, skillGroups } from "@/data/skills";
import SplitWords from "@/components/motion/SplitWords";

export default function Engineering() {
  return (
    <section id="engineering" className="section" aria-labelledby="engineering-title">
      <div className="wrap">
        <span className="rule" data-reveal="line" aria-hidden="true" />
        <div className="split split--tight">
          <h2 id="engineering-title" className="display-m" data-reveal="words">
            <SplitWords text="How I build" />
          </h2>
          <p className="lead">
            These are habits I can point to in code, not adjectives. Each one comes from a specific
            project.
          </p>
        </div>

        <ul className="principles">
          {principles.map((p) => (
            <li key={p.title}>
              <h3 className="principles__title">{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>

        <h3 className="minor stack__heading">Where each tool shows up</h3>
        <dl className="stack">
          <div className="stack__row">
            <dt>Languages</dt>
            <dd>
              <ul className="chips mono">
                {languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <p className="stack__seen">Across every project</p>
            </dd>
          </div>
          {skillGroups.map((g) => (
            <div key={g.title} className="stack__row">
              <dt>{g.title}</dt>
              <dd>
                <ul className="chips mono">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="stack__seen">Seen in {g.seenIn.join(", ")}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="also">
          Also on my résumé: {alsoWorkedWith.join(", ")}.
        </p>
      </div>
    </section>
  );
}
