import type { Project } from "@/data/projects";
import ExternalLink from "@/components/ui/ExternalLink";
import Flow from "@/components/ui/Flow";
import { navigateToSection } from "@/lib/navFade";

type Props = { project: Project; open: boolean; onToggle: () => void };

export default function ProjectRow({ project: p, open, onToggle }: Props) {
  const panelId = `project-${p.slug}`;

  return (
    <li className={`row${open ? " is-open" : ""}`}>
      <h3 className="row__head">
        <button
          type="button"
          className="row__button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="row__index mono">{p.index}</span>
          <span className="row__name">{p.name}</span>
          <span className="row__descriptor">{p.descriptor}</span>
          <span className="row__meta mono">
            <span className="row__kind">{p.kind}</span>
            <span className="row__peek">{p.stack.slice(0, 3).join(", ")}</span>
          </span>
          <span className="row__icon" aria-hidden="true" />
        </button>
      </h3>

      <div className="row__wrap" id={panelId} inert={!open}>
        <div className="row__panel">
          <div className="row__col">
            <p className="row__summary">{p.summary}</p>
            <dl className="facts">
              <div>
                <dt>The question</dt>
                <dd>{p.question}</dd>
              </div>
              {p.decision ? (
                <div>
                  <dt>A decision worth noting</dt>
                  <dd>{p.decision}</dd>
                </div>
              ) : null}
              <div>
                <dt>My part</dt>
                <dd>{p.role}</dd>
              </div>
            </dl>
          </div>

          <div className="row__col">
            <Flow steps={p.flow} label={`How ${p.name} is put together`} />
            <p className="row__status">
              <span className={`dot${p.status.live ? " dot--on" : ""}`} aria-hidden="true" />
              <span>
                <strong>{p.status.label}.</strong> {p.status.note}
              </span>
            </p>
            <ul className="chips mono" aria-label="Technologies">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <ul className="row__links">
              {p.links.caseStudy ? (
                <li>
                  <a
                    className="link"
                    href={p.links.caseStudy}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection(p.links.caseStudy!.replace("#", ""));
                    }}
                  >
                    Read the case study
                  </a>
                </li>
              ) : null}
              {p.links.live ? (
                <li>
                  <ExternalLink href={p.links.live}>Live site</ExternalLink>
                </li>
              ) : null}
              {p.links.releases ? (
                <li>
                  <ExternalLink href={p.links.releases}>Latest release</ExternalLink>
                </li>
              ) : null}
              <li>
                <ExternalLink href={p.links.github}>Source on GitHub</ExternalLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}
