// src/sections/Footer.jsx
import React, { useEffect, useRef } from "react";

export default function Footer() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 1. Handle the main text/nav reveals
    const revealEls = root.querySelectorAll(".footerReveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footerReveal--visible");
          } else {
            // Optional: remove this else block if you want it to stay visible once revealed
            entry.target.classList.remove("footerReveal--visible");
          }
        });
      },
      { threshold: 0.1 } // Triggers when 10% of the element is visible
    );

    revealEls.forEach((el) => observer.observe(el));

    // 2. Handle the signature image reveal (Separate logic)
    const signatureImg = root.querySelector(".footerSignatureImg");

    const sigObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && signatureImg) {
            signatureImg.classList.add("footerSignatureImg--visible");
          } else if (signatureImg) {
            signatureImg.classList.remove("footerSignatureImg--visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (signatureImg) sigObserver.observe(signatureImg);

    // Cleanup
    return () => {
      observer.disconnect();
      sigObserver.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="footerShell">
      {/* Center signature + tagline */}
      <div className="footerCenter footerReveal">
        <div className="footerSignatureWrap">
          <img
            src="/signature.png" // Ensure this file exists in your public folder
            alt="Signature of Manikanta Cheruku"
            className="footerSignatureImg"
          />
        </div>

        <p className="footerTagline">
          Designed &amp; built by Manikanta Cheruku.
        </p>
      </div>

      {/* Bottom nav + meta */}
      <div className="footerBottom footerReveal">
        <nav className="footerNav" aria-label="Footer">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#whatido">What I Do</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footerMeta">
          <span>Hyderabad, India · IST</span>
          <span>© {new Date().getFullYear()} Manikanta Cheruku</span>
        </div>
      </div>
    </div>
  );
}