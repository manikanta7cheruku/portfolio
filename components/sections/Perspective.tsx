import SplitWords from "@/components/motion/SplitWords";
import QuestionList from "./QuestionList";

export default function Perspective() {
  return (
    <section id="perspective" className="section" aria-labelledby="perspective-title">
      <div className="wrap">
        <span className="rule" data-reveal="line" aria-hidden="true" />
        <div className="split">
          <h2 id="perspective-title" className="display-m" data-reveal="words">
            <SplitWords text="Most of what I build starts with a question I could not leave alone." />
          </h2>
          <div className="prose">
            <p>
              I question things by habit. Why does it work this way. How does it fail. What happens
              if I change one part. Can it be done differently.
            </p>
            <p>
              I like to understand a system properly before I touch it. Then I learn the rest by
              building, because a real problem always shows you something you had not thought to
              ask.
            </p>
            <p>Most of what I make tries to remove effort that never needed a person in the first place.</p>
          </div>
        </div>

        <div className="perspective__qa">
          <h3 className="minor">Where the questions led</h3>
          <QuestionList />
        </div>
      </div>
    </section>
  );
}
