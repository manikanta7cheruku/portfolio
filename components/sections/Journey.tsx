import { education, experience } from "@/data/content";
import SplitWords from "@/components/motion/SplitWords";

export default function Journey() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="wrap">
        <span className="rule" data-reveal="line" aria-hidden="true" />
        <div className="split split--tight">
          <h2 id="experience-title" className="display-m" data-reveal="words">
            <SplitWords text="One product built alone, and a degree in progress." />
          </h2>
        </div>

        <div className="journey">
          <div className="journey__col">
            <h3 className="minor">Experience</h3>
            <p className="journey__role">{experience.role}</p>
            <p className="journey__org">{experience.org}</p>
            <p className="mono journey__when">{experience.period}</p>
            <ul className="plain plain--loose">
              {experience.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="journey__col">
            <h3 className="minor">Education</h3>
            <p className="journey__role">{education.school}</p>
            <p className="journey__org">{education.degree}</p>
            <p className="mono journey__when">
              {education.period}, {education.place}
            </p>
            <p className="journey__small">{education.cgpa}</p>
            <h4 className="journey__sub">Self-study</h4>
            <ul className="chips mono">
              {education.selfStudy.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <h4 className="journey__sub">Languages</h4>
            <p className="journey__small">{education.languages}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
