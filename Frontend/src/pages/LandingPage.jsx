import { Link } from "react-router-dom";
import LandingHero from "../components/LandingHero.jsx";

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <section className="page-section landing-overview">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Why VeriLens</p>
            <h2>Verify every image and text submission with confidence.</h2>
            <p>
              VeriLens blends fast detection, secure history, and clear reporting so
              your team can identify AI-generated content without friction.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <strong>Image and text checks</strong>
              <p>Quickly verify visuals and writing in the same workflow.</p>
            </article>
            <article className="feature-card">
              <strong>Audit-ready history</strong>
              <p>Save every result and keep your verification record accessible.</p>
            </article>
            <article className="feature-card">
              <strong>Secure access</strong>
              <p>Use account-based authentication to protect your workspace.</p>
            </article>
          </div>

          <section className="image-story-section">
            <div className="image-story-copy">
              <p className="eyebrow">Review workspace</p>
              <h2>Bring every verification decision into one clear view.</h2>
              <p>
                Add visual context to each review, compare submissions, and keep
                your team aligned around evidence instead of guesswork.
              </p>
            </div>
            <div className="image-story-grid">
              <img
                alt="Team reviewing content on laptops"
                loading="lazy"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80"
              />
              <img
                alt="Laptop showing digital analysis work"
                loading="lazy"
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
              />
            </div>
          </section>

          <div className="cta-bar">
            <p>Explore a cleaner verification experience designed for teams and educators.</p>
            <div className="button-row">
              <Link className="button" to="/register">Start free</Link>
              <Link className="button button-secondary" to="/features">View features</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
