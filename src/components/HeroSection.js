import React from 'react';

export default function HeroSection({ onStart }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-fyf-logo">
          <img src="/fyf-stacked.png" alt="FACE YOUR FEAR" className="hero-fyf-img" />
        </div>

        <div className="hero-divider" />

        <p className="hero-sub">Does your project deserve<br />to carry the OKTAGON brand?</p>

        <div className="formula-box">
          <span className="formula-term">FEAR</span>
          <span className="formula-operator">&times;</span>
          <span className="formula-term">FACING</span>
          <span className="formula-equals">=</span>
          <span className="formula-term formula-term-accent">CHANGE</span>
        </div>

        <button className="cta-btn" onClick={onStart}>
          FACE YOUR PROJECT
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3L8 13M8 13L13 8M8 13L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="hero-bg-octagon" />
    </section>
  );
}
