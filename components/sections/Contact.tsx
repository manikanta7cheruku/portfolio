import { site } from "@/data/site";
import SplitWords from "@/components/motion/SplitWords";
import ExternalLink from "@/components/ui/ExternalLink";

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <span className="rule" data-reveal="line" aria-hidden="true" />
        <div className="contact__grid">
          <div>
            <h2 id="contact-title" className="contact__name" data-reveal="words">
              <SplitWords text={site.name} />
            </h2>
            <p className="contact__where">{site.location}</p>
            <p className="contact__line">Ask me how any of it works.</p>
          </div>

          <ul className="contact__list">
            <li>
              <span className="contact__k">Email</span>
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            {site.phone.show ? (
              <li>
                <span className="contact__k">Phone</span>
                <a className="link" href={`tel:${site.phone.tel}`}>
                  {site.phone.display}
                </a>
              </li>
            ) : null}
            <li>
              <span className="contact__k">GitHub</span>
              <ExternalLink href={site.links.github}>manikanta7cheruku</ExternalLink>
            </li>
            <li>
              <span className="contact__k">LinkedIn</span>
              <ExternalLink href={site.links.linkedin}>manikanta-cheruku</ExternalLink>
            </li>
            <li>
              <span className="contact__k">Instagram</span>
              <ExternalLink href={site.links.instagram}>manikanta_netha.7</ExternalLink>
            </li>
            <li>
              <span className="contact__k">Résumé</span>
              <a className="link" href={site.links.resume} target="_blank" rel="noopener noreferrer">
                Download as PDF
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
