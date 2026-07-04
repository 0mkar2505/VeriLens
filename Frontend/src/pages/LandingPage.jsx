import { createElement } from "react";
import { Link } from "react-router-dom";
import { Activity, Archive, Image, LockKeyhole, ScanSearch, TextSearch } from "lucide-react";
import LandingHero from "../components/LandingHero.jsx";
import { GridCard } from "../components/ui/grid-card";

const featureCards = [
  {
    icon: Image,
    title: "Image forensics",
    body: "Drop in a visual and get a readable authenticity signal with confidence bands.",
  },
  {
    icon: TextSearch,
    title: "Text review",
    body: "Paste suspicious writing and check it in the same workflow as image submissions.",
  },
  {
    icon: Archive,
    title: "Evidence history",
    body: "Keep previous checks close so audits, student reviews, and team handoffs stay calm.",
  },
];

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <section className="page-section landing-overview">
        <div className="container">
          <div className="section-intro landing-section-intro">
            <p className="eyebrow">Why VeriLens</p>
            <h2>Detection that feels like a workspace, not a black box.</h2>
            <p>
              VeriLens blends fast content checks, secure history, and clear
              reporting so teams can move from suspicion to decision with less
              friction and better evidence.
            </p>
          </div>

          <div className="feature-grid feature-grid-lively">
            {featureCards.map(({ icon: Icon, title, body }) => (
              <GridCard className="feature-card feature-card-live" key={title}>
                <div className="feature-card-content">
                  <span className="feature-icon">{createElement(Icon, { size: 20, "aria-hidden": true })}</span>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              </GridCard>
            ))}
          </div>

          <section className="image-story-section signal-story-section">
            <div className="image-story-copy">
              <p className="eyebrow">Review workspace</p>
              <h2>Every check leaves a trail your team can actually read.</h2>
              <p>
                Compare visual clues, model confidence, and saved evidence in one
                place, then hand off results without screenshots, guesswork, or
                scattered notes.
              </p>
            </div>
            <div className="signal-lab" aria-label="Verification workflow preview">
              <div className="signal-lab-main">
                <div className="signal-lab-header">
                  <span><ScanSearch size={16} aria-hidden="true" /> Active scan</span>
                  <strong>91%</strong>
                </div>
                <div className="signal-bars">
                  <span style={{ "--bar": "82%" }} />
                  <span style={{ "--bar": "64%" }} />
                  <span style={{ "--bar": "48%" }} />
                  <span style={{ "--bar": "76%" }} />
                </div>
              </div>
              <div className="signal-lab-card">
                <Activity size={18} aria-hidden="true" />
                <span>Pattern drift flagged</span>
              </div>
              <div className="signal-lab-card muted-card">
                <LockKeyhole size={18} aria-hidden="true" />
                <span>Result stored privately</span>
              </div>
            </div>
          </section>

          <div className="cta-bar landing-cta-bar">
            <p>Open a cleaner verification flow for images, text, and saved evidence.</p>
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


