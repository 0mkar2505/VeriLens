import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  FileScan,
  Fingerprint,
  ImageUp,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import logoUrl from "../assets/images/VeriLens-Logo.svg";

export default function LandingHero() {
  return (
    <section className="landing-hero page-section">
      <div className="hero-ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker">
            <Sparkles size={16} aria-hidden="true" />
            AI Content Verification
          </div>
          <h1>See what is real before it spreads.</h1>
          <p>
            VeriLens gives teams and educators a sharper command center for
            checking suspicious images and text, saving the signal, and moving
            fast without turning every review into detective work.
          </p>
          <div className="button-row">
            <Button asChild size="lg" className="button button-icon">
              <Link to="/register">
                Start scanning
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="button button-secondary">
              <Link to="/login">Open workspace</Link>
            </Button>
          </div>
          <div className="hero-proof-strip" aria-label="Platform highlights">
            <span><ShieldCheck size={16} aria-hidden="true" /> Secure workspace</span>
            <span><BadgeCheck size={16} aria-hidden="true" /> Audit trail</span>
            <span><Fingerprint size={16} aria-hidden="true" /> Text + image checks</span>
          </div>
        </div>

        <div className="hero-panel" aria-label="VeriLens live verification preview">
          <div className="verification-console">
            <div className="console-topbar">
              <div>
                <img className="console-logo" src={logoUrl} alt="" />
                Live verification
              </div>
              <span>00:08</span>
            </div>
            <div className="scan-stage">
              <div className="scan-grid" aria-hidden="true" />
              <div className="scan-window">
                <div className="scan-beam" aria-hidden="true" />
                <ImageUp size={46} aria-hidden="true" />
                <span>submission_0427.png</span>
              </div>
              <div className="floating-signal signal-authentic">
                <BadgeCheck size={18} aria-hidden="true" />
                <div>
                  <strong>73%</strong>
                  <span>human-like signal</span>
                </div>
              </div>
              <div className="floating-signal signal-risk">
                <ScanLine size={18} aria-hidden="true" />
                <div>
                  <strong>27%</strong>
                  <span>synthetic markers</span>
                </div>
              </div>
            </div>
            <div className="console-footer">
              <div>
                <FileScan size={18} aria-hidden="true" />
                Evidence saved
              </div>
              <div className="confidence-ring" aria-label="Confidence 91 percent">
                <span>91%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
