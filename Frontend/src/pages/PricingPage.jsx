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
          <p>$29 / month</p>
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
    </section>
  );
}
