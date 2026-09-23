/**
 * A full-screen cover used only by navigateToSection (lib/navFade.ts). It sits above every
 * fixed element, including the mobile section panel, so a link tap inside that panel is
 * masked by the same fade rather than showing the panel collapse underneath it.
 */
export default function NavFadeOverlay() {
  return <div id="nav-fade-overlay" className="nav-fade-overlay" aria-hidden="true" />;
}
