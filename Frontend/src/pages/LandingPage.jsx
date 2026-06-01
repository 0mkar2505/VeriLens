import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="landing">
      <div className="landing-copy">
        <p className="eyebrow">AI Content Verification Platform</p>
        <h1>VeriLens</h1>
        <p>
          Verify text and image submissions with a focused workspace for analysis,
          history, and usage visibility.
        </p>
        <div className="button-row">
          <Link className="button" to="/register">Get Started</Link>
          <Link className="button button-secondary" to="/login">Sign In</Link>
        </div>
      </div>
      <div className="landing-panel" aria-hidden="true">
        <div className="scan-line" />
        <div className="signal-card signal-card-top">Image: AI Generated</div>
        <div className="signal-card signal-card-bottom">Text: Human Written</div>
      </div>
    </section>
  );
}
