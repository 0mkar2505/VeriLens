import { useState } from "react";
import { Check, FileScan, History, Image, LockKeyhole, Rocket, ShieldCheck, TextSearch, Users, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { FaqPro } from "../components/ui/faq-pro";
import { GridCard } from "../components/ui/grid-card";

const pricingFaqItems = [
  {
    id: "free-basic",
    question: "What is included in Free Basic?",
    answer:
      "Free Basic is intentionally limited to scanning only. It is for people who want to test the core image verification flow before paying for text analysis, saved history, team tools, or exports."
  },
  {
    id: "go-vs-plus",
    question: "Should I choose Go or Plus?",
    answer:
      "Choose Go if you are a solo reviewer who needs affordable image and text checks with a short saved history. Choose Plus when you need higher limits, exports, shared review context, and priority capacity for regular verification work."
  },
  {
    id: "enterprise",
    question: "What does Enterprise include?",
    answer:
      "Enterprise is for institutions and organizations that need custom limits, onboarding support, access controls, reporting workflows, and audit-ready review processes across multiple users or departments."
  }
];

const plans = [
  {
    name: "Free Basic",
    description: "A no-cost way to try the core scan flow before bringing VeriLens into regular review work.",
    monthly: "Free",
    yearly: "Free",
    users: "Single reviewer, scan-only access",
    note: "Scanning only, no saved workspace",
    cta: "Start scanning",
    icon: Image,
    features: [
      { label: "10 image scans per month", included: true },
      { label: "Basic authenticity signal", included: true },
      { label: "Text analysis", included: false },
      { label: "Saved verification history", included: false },
      { label: "Report exports", included: false },
      { label: "Team workspace", included: false }
    ],
    metrics: ["10 scans", "Image only", "No history"]
  },
  {
    name: "Go",
    description: "A cheap starter plan for solo reviewers who need more checks without team features.",
    monthly: "Rs 499",
    yearly: "Rs 4,790",
    users: "One reviewer with a personal dashboard",
    note: "Best for solo reviewers and students",
    cta: "Choose Go",
    icon: Rocket,
    features: [
      { label: "150 image scans per month", included: true },
      { label: "Text analysis included", included: true },
      { label: "30-day verification history", included: true },
      { label: "Personal dashboard", included: true },
      { label: "PDF/report exports", included: false },
      { label: "Team workspace", included: false }
    ],
    metrics: ["150 scans", "Text checks", "30-day history"]
  },
  {
    name: "Plus",
    description: "The normal plan for active reviewers, classrooms, and small teams that need reliable capacity.",
    monthly: "Rs 1,499",
    yearly: "Rs 14,390",
    users: "Up to 5 reviewers with shared records",
    note: "Recommended for regular verification work",
    cta: "Choose Plus",
    popular: true,
    icon: Users,
    features: [
      { label: "Unlimited image scans", included: true },
      { label: "Unlimited text analysis", included: true },
      { label: "Shared verification history", included: true },
      { label: "PDF/report exports", included: true },
      { label: "Priority analysis queue", included: true },
      { label: "Custom retention policies", included: false }
    ],
    metrics: ["Unlimited", "Shared records", "Exports"]
  },
  {
    name: "Enterprise",
    description: "Custom verification infrastructure for organizations with formal review and compliance needs.",
    monthly: "Custom",
    yearly: "Custom",
    users: "Unlimited users, roles, and departments",
    note: "For institutions and large teams",
    cta: "Talk to us",
    icon: ShieldCheck,
    features: [
      { label: "Custom scan limits and retention", included: true },
      { label: "Admin roles and access controls", included: true },
      { label: "Dedicated onboarding support", included: true },
      { label: "Advanced audit reports", included: true },
      { label: "Custom workflow configuration", included: true },
      { label: "Organization-level SLA", included: true }
    ],
    metrics: ["Custom SLA", "Admin roles", "Org reports"]
  }
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const isYearly = billingPeriod === "yearly";

  return (
    <section className="page-section page-pricing pricing-refresh">
      <div className="container">
        <div className="pricing-hero-row pricing-module-hero">
        <article className="pricing-copy-block">
          <p className="eyebrow">Pricing</p>
          <h1>Simple, locked-in plans for real verification work.</h1>
          <p>
            Start with scan-only access, upgrade when you need text review and
            history, then scale into shared workflows when verification becomes
            part of your everyday process.
          </p>
        </article>

        <div className="pricing-switch-card pricing-module-switch" aria-label="Billing period selector">
          <span>Billing</span>
          <div className="pricing-switch" role="group" aria-label="Choose billing period">
            <button
              className={billingPeriod === "monthly" ? "active" : ""}
              type="button"
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={billingPeriod === "yearly" ? "active" : ""}
              type="button"
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly <small>Save 20%</small>
            </button>
          </div>
        </div>
        </div>

        <div className="pricing-grid pricing-grid-pro pricing-module-grid">
        {plans.map((plan, index) => {
          const Icon = plan.icon;

          return (
            <GridCard
              className={`pricing-card pricing-card-pro pricing-module-card ${plan.popular ? "pricing-card-popular" : ""}`}
              key={plan.name}
              style={{ "--reveal-delay": `${index * 90}ms` }}
            >
              <div className="pricing-card-inner pricing-module-card-inner">
                <div className="pricing-module-header">
                  <span className="pricing-plan-icon pricing-module-icon"><Icon size={28} aria-hidden="true" /></span>
                  <strong>{plan.name}</strong>
                  <p className="pricing-description">{plan.description}</p>
                </div>

                <div className="pricing-price-row pricing-module-price">
                  <span>{isYearly ? plan.yearly : plan.monthly}</span>
                  {plan.monthly !== "Free" && plan.monthly !== "Custom" && (
                    <small>/{isYearly ? "year" : "month"}</small>
                  )}
                </div>

                <Button className="button pricing-action" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>

                {/* Overview removed per request — keep price, CTA, metrics, and footer */}

                {/* Per request, metrics (scan counts / image only / history) removed */}

                <div className="pricing-feature-list pricing-module-features">
                  <ul>
                    {plan.features.map((feature) => (
                      <li className={!feature.included ? "is-locked" : ""} key={feature.label}>
                        <span>{feature.included ? <Check size={15} aria-hidden="true" /> : <X size={15} aria-hidden="true" />}</span>
                        {feature.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-footer">
                  <span>{plan.note}</span>
                </div>
              </div>
            </GridCard>
          );
        })}
        </div>
      </div>

      <section className="pricing-visual-section pricing-proof-section">
        <div>
          <p className="eyebrow">Scale when ready</p>
          <h2>Plans follow the same review loop your team already uses.</h2>
          <p>
            Every tier is locked to a clear use case: scan-only testing, solo
            review, regular team verification, or organization-wide governance.
          </p>
        </div>
        <div className="pricing-proof-grid" aria-label="Verification workflow included in each plan">
          <div><FileScan size={18} aria-hidden="true" /><span>Scan suspicious files</span></div>
          <div><TextSearch size={18} aria-hidden="true" /><span>Review text signals</span></div>
          <div><History size={18} aria-hidden="true" /><span>Save audit history</span></div>
          <div><LockKeyhole size={18} aria-hidden="true" /><span>Protect workspace access</span></div>
        </div>
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


