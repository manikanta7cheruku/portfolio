import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="lost">
      <div className="wrap">
        <p className="mono lost__code">404</p>
        <h1 className="display-m">This page does not exist.</h1>
        <p className="lost__text">
          The link may be old, or mistyped. Everything on this site lives on the home page.
        </p>
        <Link className="link" href="/">
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
