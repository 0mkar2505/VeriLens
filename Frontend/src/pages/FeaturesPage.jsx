import { Link } from "react-router-dom";
import { Archive, ArrowRight, BrainCircuit, CheckCircle2, FileImage, FileText, Gauge, LockKeyhole, ScanLine, ShieldCheck, Sparkles } from "lucide-react";

const featureCards = [
  {
    title: "Image detection",
    description: "Upload visuals and review authenticity signals in a focused, readable result card.",
    icon: FileImage,
    tone: "cyan",
    span: "default"
  },
  {
    title: "Text analysis",
    description: "Paste written content and inspect whether it carries patterns associated with AI generation.",
    icon: FileText,
    tone: "amber",
    span: "wide"
  },
  {
    title: "Saved audit trail",
    description: "Keep analysis history close so decisions can be revisited, compared, and explained later.",
    icon: Archive,
    tone: "emerald",
    span: "tall"
  },
  {
    title: "Secure workspace",
    description: "Return to a private review area with authentication and clean separation from public pages.",
    icon: LockKeyhole,
    tone: "violet",
    span: "default"
  }
];

const workflowSteps = [
  "Upload an image or paste text",
  "Review confidence and classification",
  "Save the result into history",
  "Share decisions with clearer context"
];

const proofItems = [
  { label: "Dual-mode review", value: "Image + text" },
  { label: "Decision trail", value: "Saved history" },
  { label: "Workspace flow", value: "Dashboard first" }
];

export default function FeaturesPage() {
  return (
    <section className="page-section page-features features-refresh">
      <div className="container">
        <div className="features-hero">
          <div className="features-hero-copy">
            <p className="eyebrow">Features</p>
            <h1>Verification tools that feel calm, clear, and built for real review work.</h1>
            <div className="button-row">
              <Link className="button button-icon" to="/register">
                Start free <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button-secondary" to="/pricing">View pricing</Link>
            </div>
          </div>

          <div className="features-console" aria-label="Feature workflow preview">
            <div className="features-console-header">
              <span><ScanLine size={16} aria-hidden="true" /> Live review</span>
              <strong>91%</strong>
            </div>

            <div className="features-visual-frame">
              <div className="features-visual-panel">
                <div className="features-visual-toolbar">
                  <span className="features-dot" />
                  <span className="features-dot" />
                  <span className="features-dot" />
                </div>
                <div className="features-visual-card">
                  <div className="features-visual-art" aria-hidden="true">
                    <svg viewBox="0 0 320 180" role="img">
                      <rect x="24" y="30" width="272" height="120" rx="22" fill="url(#panelGradient)" />
                      <rect x="48" y="52" width="96" height="70" rx="16" fill="rgba(255,255,255,0.9)" />
                      <path d="M60 112c18-28 32-42 54-54" stroke="#0891b2" strokeWidth="8" strokeLinecap="round" />
                      <path d="M163 90h92" stroke="rgba(15,23,42,0.16)" strokeWidth="10" strokeLinecap="round" />
                      <path d="M163 116h62" stroke="rgba(15,23,42,0.16)" strokeWidth="10" strokeLinecap="round" />
                      <circle cx="244" cy="84" r="28" fill="#f59e0b" fillOpacity="0.92" />
                      <defs>
                        <linearGradient id="panelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f8fafc" />
                          <stop offset="100%" stopColor="#dbeafe" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="features-visual-caption">
                    <span><Sparkles size={16} aria-hidden="true" /> Authenticity signal</span>
                    <strong>Human-likely visual pattern</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-console-grid">
              {proofItems.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="features-card-grid">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className={`feature-card feature-card-polished feature-bento-card feature-bento-card--${feature.span} feature-tone-${feature.tone}`} key={feature.title}>
                <span className="feature-icon"><Icon size={22} aria-hidden="true" /></span>
                <strong>{feature.title}</strong>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>

        <section className="features-workflow-band">
          <div className="features-workflow-copy">
            <p className="eyebrow">Detection workflow</p>
            <h2>Designed for scanning, comparing, and deciding fast.</h2>
            <p>
              The interface keeps signal, context, and history in view so reviewers
              can move from suspicion to a documented next step without jumping tools.
            </p>
          </div>
          <div className="features-workflow-steps">
            {workflowSteps.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                <CheckCircle2 size={18} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="features-proof-grid">
          <article>
            <Gauge size={24} aria-hidden="true" />
            <h2>Readable confidence cues</h2>
            <p>Results are framed for review, not mystery: classification, confidence, and saved context stay easy to scan.</p>
          </article>
          <article>
            <ShieldCheck size={24} aria-hidden="true" />
            <h2>Human-in-the-loop by design</h2>
            <p>VeriLens supports judgment instead of replacing it, keeping final decisions with the people responsible.</p>
          </article>
        </section>
      </div>
    </section>
  );
}
