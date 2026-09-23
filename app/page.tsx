import { site } from "@/data/site";
import TopBar from "@/components/navigation/TopBar";
import SideIndex from "@/components/navigation/SideIndex";
import Hero from "@/components/hero/Hero";
import Perspective from "@/components/sections/Perspective";
import Work from "@/components/sections/Work";
import Seven from "@/components/sections/Seven";
import Engineering from "@/components/sections/Engineering";
import Journey from "@/components/sections/Journey";
import BeyondCode from "@/components/sections/BeyondCode";
import Questions from "@/components/sections/Questions";
import Contact from "@/components/sections/Contact";
import PageMotion from "@/components/motion/PageMotion";
import NavFadeOverlay from "@/components/motion/NavFadeOverlay";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sree Dattha Institute of Engineering and Science",
  },
  sameAs: [site.links.github, site.links.linkedin, site.links.instagram],
};

export default function Home() {
  return (
    <>
      <TopBar />
      <SideIndex />
      <main id="main">
        <Hero />
        <Perspective />
        <Work />
        <Seven />
        <Engineering />
        <Journey />
        <BeyondCode />
        <Questions />
        <Contact />
      </main>
      <footer className="foot">
        <div className="wrap">
          <p>
            Designed and built by {site.name}. Set in Newsreader, Instrument Sans and JetBrains
            Mono.
          </p>
        </div>
      </footer>
      {/* Mounted last so its effects run after every section has created its own triggers. */}
      <PageMotion />
      <NavFadeOverlay />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
