// src/components/TeamRow.tsx
import React from "react";

export const TeamRow: React.FC = () => {
  return (
    <section className="team-row section-wrapper reveal-on-scroll">
      <h2 className="section-title">Leadership</h2>

      <div className="team-grid">
        {/* ---- Person 1 ---- */}
        <figure className="team-member stagger-item">
          {/* Replace the placeholder with your own image */}
          <img
            src="https://crestonbiz.com/_next/image?url=%2Fimages%2Ffounders%2Fali-nauman-gilani.jpg&w=256&q=75&dpl=dpl_5b7wFA6BMfZXPbPncz42enLTpUAd"
            alt="Portrait of Jane Doe – Co‑founder & Chief Technology Officer"
            className="team-img"
          />
          <figcaption className="team-caption">
            <h3>Syed Ali Nauman Gilani</h3>
            <p className="team-role">Co‑founder &amp; CTO</p>
            <p className="team-bio">
              Passionate about scalable AI systems, Jane leads the
              engineering team and drives the core technology roadmap.
            </p>
          </figcaption>
        </figure>

        {/* ---- Person 2 ---- */}
        <figure className="team-member stagger-item">
          {/* Replace the placeholder with your own image */}
          <img
            src="https://crestonbiz.com/_next/image?url=%2Fimages%2Ffounders%2Fzarmina-sanam.jpg&w=256&q=75&dpl=dpl_5b7wFA6BMfZXPbPncz42enLTpUAd"
            alt="Portrait of John Smith – Founder & Chief Executive Officer"
            className="team-img"
          />
          <figcaption className="team-caption">
            <h3>Zarmina Sanam</h3>
            <p className="team-role">Founder &amp; CEO</p>
            <p className="team-bio">
              With 15 years of SaaS leadership, John steers strategy,
              growth, and client success across all service lines.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
