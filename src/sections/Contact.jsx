// src/sections/Contact.jsx
import React, { useEffect, useRef } from "react";

export default function Contact() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealEls = root.querySelectorAll(".contactReveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contactReveal--visible");
          } else {
            // allow re-animate on scroll back up
            entry.target.classList.remove("contactReveal--visible");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="contactShell">
      {/* Header */}
      <header className="contactHeader contactReveal">
        <p className="contactEyebrow">CONTACT</p>
        <h2 className="contactTitle">Let’s build something modern.</h2>
        <p className="contactLead">
          I’m based in Hyderabad, India and focused on front‑end work with
          React, GSAP, and animation‑driven layouts. If you have a role or
          project in mind, I’d be happy to hear about it.
        </p>
      </header>

      {/* Main contact content */}
      <div className="contactMain contactReveal">
        {/* Left column – primary CTA */}
        <div className="contactMainLeft">
          <p className="contactLabel">Primary channel</p>
          <a
            href="cherukumanikanta77@gmail.com"  // TODO: put your real email here
            className="contactEmailBtn"
          >
            <span className="contactEmailIcon">✉</span>
            <span className="contactEmailText">
              cherukumanikanta77@gmail.com
            </span>
          </a>
          <p className="contactSmall">
            I usually respond within 24–48 hours. Feel free to write in English,
            Hindi, or Telugu — whichever is easiest.
          </p>

          <div className="contactInfoRow">
            <span className="contactInfoLabel">Location</span>
            <span className="contactInfoValue">Hyderabad, India (IST)</span>
          </div>
        </div>

        {/* Right column – what to include */}
        <div className="contactMainRight">
          <p className="contactLabel">What helps me reply quickly</p>
          <ul className="contactList">
            <li>A short summary of the project or role.</li>
            <li>Any links to designs, repos, or references (if available).</li>
            <li>Rough timelines and what you’re hoping to achieve.</li>
          </ul>
          <p className="contactSmall">
            You don’t have to have everything figured out — a rough idea is
            enough to start the conversation.
          </p>
        </div>
      </div>

      {/* Social links */}
      <section className="contactSocials contactReveal">
        <p className="contactLabel">Elsewhere</p>
        <div className="contactSocialRow">
          {/* TODO: replace hrefs with your real profiles */}
          <a
            href="https://www.linkedin.com/"
            className="contactSocialLink contactSocialLink--linkedin"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contactSocialIcon">
              {/* LinkedIn logo */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.24 8.25H4.76V24H.24V8.25zM8.44 8.25h4.33v2.14h.06c.6-1.13 2.06-2.32 4.23-2.32 4.52 0 5.36 2.98 5.36 6.86V24h-4.52v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V24H8.44V8.25z" />
              </svg>
            </span>
            <span className="contactSocialText">LinkedIn</span>
          </a>

          <a
            href="https://github.com/"
            className="contactSocialLink contactSocialLink--github"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contactSocialIcon">
              {/* GitHub logo */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 0 0 8.3 23.1c.6.1.82-.26.82-.58v-2.02c-3.34.72-4.04-1.6-4.04-1.6-.54-1.37-1.32-1.73-1.32-1.73-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.06 1.82 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.9 0-1.3.46-2.37 1.23-3.21-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.22A11.2 11.2 0 0 1 12 5.3c1.02 0 2.06.14 3.03.41 2.3-1.54 3.3-1.22 3.3-1.22.65 1.65.24 2.87.12 3.17.77.84 1.23 1.9 1.23 3.21 0 4.58-2.81 5.6-5.5 5.89.43.37.81 1.1.81 2.23V22.5c0 .32.22.7.83.58A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </span>
            <span className="contactSocialText">GitHub</span>
          </a>

          <a
            href="https://x.com/"
            className="contactSocialLink contactSocialLink--x"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contactSocialIcon">
              {/* X logo */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.75 2.25h3.17L15.3 10.2l7.12 9.55h-5.58l-3.9-5.11-4.46 5.11H2.31l7.02-8.05L2.5 2.25H8.2l3.5 4.66 4.05-4.66zM7.32 4.07H5.6l11.12 15.1h1.8L7.32 4.07z" />
              </svg>
            </span>
            <span className="contactSocialText">X</span>
          </a>

          <a
            href="https://www.instagram.com/"
            className="contactSocialLink contactSocialLink--instagram"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contactSocialIcon">
              {/* Instagram logo */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.99.24 2.46.4.62.21 1.06.46 1.53.93.47.47.72.91.93 1.53.16.47.35 1.29.4 2.46.06 1.27.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.99-.4 2.46-.21.62-.46 1.06-.93 1.53-.47.47-.91.72-1.53.93-.47.16-1.29.35-2.46.4-1.27.06-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.99-.24-2.46-.4-.62-.21-1.06-.46-1.53-.93-.47-.47-.72-.91-.93-1.53-.16-.47-.35-1.29-.4-2.46C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.99.4-2.46.21-.62.46-1.06.93-1.53.47-.47.91-.72 1.53-.93.47-.16 1.29-.35 2.46-.4C8.416 2.212 8.8 2.2 12 2.2m0-2.2C8.735 0 8.332.013 7.053.07 5.772.127 4.77.33 3.95.66a4.8 4.8 0 0 0-1.74 1.14A4.8 4.8 0 0 0 1.07 3.55C.74 4.37.538 5.37.48 6.65.422 7.93.41 8.335.41 11.6s.013 3.67.07 4.95c.058 1.28.26 2.28.59 3.1.33.82.77 1.47 1.34 2.04.57.57 1.22 1.01 2.04 1.34.82.33 1.82.53 3.1.59 1.28.06 1.685.07 4.95.07s3.67-.013 4.95-.07c1.28-.058 2.28-.26 3.1-.59a4.8 4.8 0 0 0 2.04-1.34 4.8 4.8 0 0 0 1.34-2.04c.33-.82.53-1.82.59-3.1.06-1.28.07-1.685.07-4.95s-.013-3.67-.07-4.95c-.058-1.28-.26-2.28-.59-3.1A4.8 4.8 0 0 0 20.45.66 4.8 4.8 0 0 0 18.41-.68C17.59-.99 16.59-1.19 15.31-1.25 14.03-1.31 13.63-1.32 10.36-1.32H12z" />
                <path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
            </span>
            <span className="contactSocialText">Instagram</span>
          </a>
        </div>
      </section>
    </div>
  );
}