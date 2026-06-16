import { FaqPro } from "../components/ui/faq-pro";

const aboutFaqItems = [
  {
    id: "what-verilens-checks",
    question: "What can VeriLens verify?",
    answer:
      "VeriLens supports image authenticity checks and text analysis in one workspace, with results saved for future review."
  },
  {
    id: "how-history-works",
    question: "How does verification history help teams?",
    answer:
      "Each completed analysis becomes part of an audit trail, making it easier to revisit decisions and compare past submissions."
  },
  {
    id: "privacy-focus",
    question: "How is privacy handled?",
    answer:
      "The product is designed around focused verification workflows and avoids collecting unnecessary user data."
  }
];

export default function AboutPage() {
  return (
    <section className="page-section page-about">
      <div className="section-intro">
        <p className="eyebrow">About VeriLens</p>
        <h1>Trusted AI content verification for teams and educators.</h1>
        <p>
          VeriLens makes it simple to verify the authenticity of images and text.
          Our platform is built to help you detect AI-generated submissions,
          preserve reporting history, and stay confident in every decision.
        </p>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <strong>Mission-driven accuracy</strong>
          <p>
            We combine image and text analysis in one platform, so you can verify
            content without switching tools.
          </p>
        </article>

        <article className="feature-card">
          <strong>Actionable history</strong>
          <p>
            Save results, review past reports, and export audit-ready verification
            details whenever you need them.
          </p>
        </article>

        <article className="feature-card">
          <strong>Clear workflows</strong>
          <p>
            A clean interface helps teams review results faster, reduce false
            positives, and run high-confidence checks at scale.
          </p>
        </article>
      </div>

      <div className="content-bucket two-column">
        <div>
          <h2>Designed for modern verification work</h2>
          <p>
            VeriLens supports both image and text review, with a focused dashboard
            for ongoing audits and a flexible analysis workflow.
          </p>
        </div>
        <div>
          <h2>Built for privacy and transparency</h2>
          <p>
            We never store unnecessary user data, and every analysis is tracked so
            your review process stays auditable and accountable.
          </p>
        </div>
      </div>

      <div className="faq-section">
        <div className="section-intro">
          <p className="eyebrow">FAQ</p>
          <h2>Common verification questions.</h2>
        </div>
        <FaqPro defaultOpenFirst items={aboutFaqItems} />
      </div>
    </section>
  );
}
