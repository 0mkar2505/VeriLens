import { Link } from "react-router-dom";
import { ArrowRight, BookOpenCheck, Eye, History, LockKeyhole, MessageSquareText, ShieldCheck, Sparkles, Users } from "lucide-react";

import { FaqPro } from "../components/ui/faq-pro";

const aboutFaqItems = [
  {
    id: "what-verilens-checks",
    question: "What can VeriLens verify?",
    answer:
      "VeriLens can review uploaded images and pasted text from the same workspace. Image checks help flag signals that may point to synthetic or manipulated visuals, while text analysis gives reviewers another layer of context when written submissions feel suspicious or inconsistent."
  },
  {
    id: "how-history-works",
    question: "How does verification history help teams?",
    answer:
      "Every completed analysis is saved as part of a review trail, so teams can revisit earlier decisions, compare similar submissions, and understand why a result was trusted at the time. That makes handoffs easier for classrooms, moderation groups, and organizations that need accountability."
  },
  {
    id: "privacy-focus",
    question: "How is privacy handled?",
    answer:
      "VeriLens is shaped around focused verification instead of broad data collection. The workflow keeps submitted content tied to the review task, avoids unnecessary personal data, and makes saved results easier to inspect, manage, and explain later."
  }
];

const principles = [
  {
    title: "Evidence before instinct",
    description: "Reviewers get a structured signal instead of relying on vibes, screenshots, or scattered notes.",
    icon: Eye
  },
  {
    title: "Accountable history",
    description: "Past checks stay available so teams can revisit the context behind a decision.",
    icon: History
  },
  {
    title: "Privacy-aware workflow",
    description: "The product is centered on the content being reviewed, not unnecessary data collection.",
    icon: LockKeyhole
  }
];

const audiences = [
  "Educators reviewing submissions",
  "Teams moderating visual content",
  "Organizations documenting AI-use decisions"
];

export default function AboutPage() {
  return (
    <section className="page-section page-about about-refresh">
      <div className="container">
        <div className="about-hero">
          <div className="about-hero-copy">
            <p className="eyebrow">About VeriLens</p>
            <h1>AI content verification built for careful human decisions.</h1>
            <div className="button-row">
              <Link className="button button-icon" to="/features">
                Explore features <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button-secondary" to="/register">Try VeriLens</Link>
            </div>
          </div>

          <div className="about-mission-card">
            <span><Sparkles size={18} aria-hidden="true" /> Mission</span>
            <h2>Make authenticity review easier to explain.</h2>
            <p>
              Detection is most useful when people can understand the result, revisit
              it later, and discuss the evidence with confidence.
            </p>
          </div>
        </div>

        <div className="about-principles-grid">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <article className="feature-card about-principle-card" key={principle.title}>
                <span className="feature-icon"><Icon size={22} aria-hidden="true" /></span>
                <strong>{principle.title}</strong>
                <p>{principle.description}</p>
              </article>
            );
          })}
        </div>

        <section className="about-story-band">
          <div>
            <p className="eyebrow">Why it exists</p>
            <h2>Modern review work needs clarity, not another black box.</h2>
            <p>
              Verification work often happens under pressure: a submission looks too
              polished, an image seems synthetic, or a team needs a fast second look.
              VeriLens keeps image checks, text analysis, and dashboard history close
              together so reviewers can move from concern to decision without losing context.
            </p>
          </div>
          <div className="about-audience-panel">
            <h3>Built for</h3>
            <ul>
              {audiences.map((audience) => (
                <li key={audience}><Users size={17} aria-hidden="true" /> {audience}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about-trust-grid">
          <article>
            <BookOpenCheck size={24} aria-hidden="true" />
            <strong>Readable review trails</strong>
            <p>Saved history keeps what was checked, when it was reviewed, and what the system found easy to inspect.</p>
          </article>
          <article>
            <ShieldCheck size={24} aria-hidden="true" />
            <strong>Decision support</strong>
            <p>VeriLens is designed to support human judgment, not replace policy, expertise, or responsible review.</p>
          </article>
          <article>
            <MessageSquareText size={24} aria-hidden="true" />
            <strong>Explainable handoffs</strong>
            <p>Teams can discuss results with shared context instead of passing around disconnected screenshots.</p>
          </article>
        </section>

        <div className="faq-section about-faq" id="faq">
          <div className="section-intro">
            <p className="eyebrow">FAQ</p>
            <h2>Common verification questions, answered with context.</h2>
            <p>
              A few practical notes about what VeriLens checks, how history helps,
              and why review context matters.
            </p>
          </div>
          <FaqPro defaultOpenFirst items={aboutFaqItems} />
        </div>
      </div>
    </section>
  );
}
