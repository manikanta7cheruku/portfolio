"use client";

import { site } from "@/data/site";
import { navigateToSection } from "@/lib/navFade";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <header className="top">
      <a
        className="top__mark"
        href="#opening"
        aria-label={`${site.name}, back to the top`}
        onClick={(e) => {
          e.preventDefault();
          navigateToSection("opening");
        }}
      >
        {site.name}
      </a>
      <div className="top__actions">
        <ThemeToggle />
        <a className="top__link" href={site.links.resume} target="_blank" rel="noopener noreferrer">
          Résumé
        </a>
      </div>
    </header>
  );
}
