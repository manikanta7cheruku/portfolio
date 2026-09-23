"use client";

export default function ErrorBoundary({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main" className="lost">
      <div className="wrap">
        <p className="mono lost__code">Error</p>
        <h1 className="display-m">Something broke while loading this page.</h1>
        <p className="lost__text">Try again. If it keeps happening, email me and I will fix it.</p>
        <button type="button" className="link" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
