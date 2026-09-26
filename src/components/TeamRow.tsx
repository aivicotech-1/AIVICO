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
            src="./src/images/nouman.png"
            alt="Syed Ali Nauman Gilani – Founding Member & Director"
            className="team-img"
          />
          <figcaption className="team-caption">
            <h3>Syed Ali Nauman Gilani</h3>
            <p className="team-role">Founding Member & Director</p>
            <p className="team-bio">
              Award-winning entrepreneur, Founder & CEO of Skill2Success 
              and Founder of AIVICO Tech, with a strong focus on technology, 
              innovation, education and business development. As a founding member 
              and director of Creston Business Services, he brings an entrepreneurial 
              and technology-driven perspective to the organisation, supporting strategic 
              growth, institutional partnerships and the development of innovative business solutions.
            </p>
          </figcaption>
        </figure>

        {/* ---- Person 2 ---- */}
        <figure className="team-member stagger-item">
          {/* Replace the placeholder with your own image */}
          <img
            src="./src/images/Zarmina.png"
            alt="Zarmina Sanam Founding Member & Managing Director
"
            className="team-img"
          />
          <figcaption className="team-caption">
            <h3>Zarmina Sanam</h3>
            <p className="team-role">Founding Member & Managing Director</p>
            <p className="team-bio">
             Award-winning entrepreneur, business growth professional, corporate trainer 
             and startup mentor with 18+ years of experience across Telecom, FinTech, Social Learning
              and EdTech. Founder and entrepreneur with expertise spanning business development, corporate training, 
              entrepreneurship, technology and strategic partnerships. As a Founding Member & Director at Creston Business Services, 
              she contributes to business growth, corporate events, conferences, workshops, training programmes, client engagement 
              and strategic partnerships, complementing Creston's integrated facilities, events and workplace operations model.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
