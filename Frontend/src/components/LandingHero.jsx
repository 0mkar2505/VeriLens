import { Link } from "react-router-dom";

export default function LandingHero() {
  return (
    <section className="landing-hero page-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">AI Content Verification</p>
          <h1>Stop guessing. Start verifying content with clarity.</h1>
          <p>
            VeriLens gives teams and educators a clean place to review image and
            text submissions, record results, and build trust in every decision.
          </p>
          <div className="button-row">
            <Link className="button" to="/register">Get Started</Link>
            <Link className="button button-secondary" to="/login">Sign In</Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-card">
            <p className="eyebrow">Verified content snapshot</p>
            <h2>AI generated content detection</h2>
            <p>Upload images or paste text and get a verified authenticity signal.</p>
            <div className="hero-stats">
              <span>98% accuracy</span>
              <span>Audit-ready history</span>
              <span>Simple workflow</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
