import { FaqPro } from "../components/ui/faq-pro";

const pricingFaqItems = [
  {
    id: "free-plan",
    question: "Can I start with the free plan?",
    answer:
      "Yes. The Starter plan is meant for individual reviewers who want to try image checks, text analysis, and history before scaling."
  },
  {
    id: "team-plan",
    question: "When should I choose Team?",
    answer:
      "Choose Team when a classroom, review group, or small organization needs higher capacity and shared verification history."
  },
  {
    id: "enterprise",
    question: "What does Enterprise include?",
    answer:
      "Enterprise is intended for larger organizations that need onboarding support, advanced reporting, and audit-focused workflows."
  }
];

export default function PricingPage() {
  return (
    <section className="page-section page-pricing">
      <div className="section-intro">
        <p className="eyebrow">Pricing</p>
        <h1>Simple plans for teams and individual reviewers.</h1>
        <p>
          Start with a free trial and scale up when you need more analysis capacity
          and team management tools.
        </p>
      </div>

      <div className="pricing-grid">
        <article className="pricing-card">
          <strong>Starter</strong>
          <p>Free</p>
          <ul>
            <li>Basic image checks</li>
            <li>Text analysis</li>
            <li>Audit history</li>
          </ul>
          <div className="pricing-footer">
            <span>Good for individual reviewers</span>
          </div>
        </article>

        <article className="pricing-card">
          <strong>Team</strong>
          <p>₹2,499 / month</p>
          <ul>
            <li>Unlimited image/text checks</li>
            <li>Shared verification history</li>
            <li>Priority support</li>
          </ul>
          <div className="pricing-footer">
            <span>Ideal for classrooms and small teams</span>
          </div>
        </article>

        <article className="pricing-card">
          <strong>Enterprise</strong>
          <p>Custom</p>
          <ul>
            <li>Dedicated onboarding</li>
            <li>Advanced reporting</li>
            <li>Audit-ready compliance</li>
          </ul>
          <div className="pricing-footer">
            <span>Scale verification across organizations</span>
          </div>
        </article>
      </div>

      <section className="pricing-visual-section">
        <div>
          <p className="eyebrow">Scale when ready</p>
          <h2>Start lean, then expand your verification workflow.</h2>
          <p>
            Plans are shaped for Indian teams, classrooms, and review groups
            that need predictable monthly verification capacity.
          </p>
        </div>
        <img
          alt="Team planning digital review workflows"
          loading="lazy"
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=80"
        />
      </section>

      <div className="faq-section">
        <div className="section-intro">
          <p className="eyebrow">FAQ</p>
          <h2>Plan questions, answered clearly.</h2>
        </div>
        <FaqPro defaultOpenFirst items={pricingFaqItems} />
      </div>
    </section>
  );
}
