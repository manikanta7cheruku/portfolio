import { Fragment } from "react";

/**
 * Wraps each word in a clipping mask so it can rise into place.
 * Words stay in normal text order with real spaces between them, so screen readers and
 * search engines read the sentence unchanged.
 */
export default function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="w">
            <span className="wi">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
