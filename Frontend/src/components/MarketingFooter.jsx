import { Link } from "react-router-dom";
import { Mail, ScanEye, Sparkles } from "lucide-react";

function LinkedInIcon({ size = 15, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M5 3.5A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 5 3.5ZM3 10h4v11H3V10Zm6.5 0h3.8v1.5h.1c.5-.9 1.8-1.8 3.7-1.8 4 0 4.9 2.6 4.9 6V21h-4v-4.8c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4V10Z"
      />
    </svg>
  );
}

function GitHubIcon({ size = 15, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.5 2.4 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 6.7 8.8c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1.1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

const footerSections = [
  {
    label: "Product",
    links: [
      { title: "Features", to: "/features" },
      { title: "Pricing", to: "/pricing" },
      { title: "Start free", to: "/register" },
      { title: "Sign in", to: "/login" }
    ]
  },
  {
    label: "Company",
    links: [
      { title: "About", to: "/about" },
      { title: "Verification FAQ", to: "/about#faq" },
      { title: "Plan FAQ", to: "/pricing#faq" }
    ]
  },
  {
    label: "Contact us",
    align: "right",
    links: [
      { title: "Mail Us", href: "mailto:ozad2505@gmail.com", icon: Mail },
      { title: "LinkedIn", href: "https://www.linkedin.com/in/omkar25/", icon: LinkedInIcon },
      { title: "GitHub", href: "https://github.com/0mkar2505", icon: GitHubIcon }
    ]
  }
];

function FooterLink({ link }) {
  const Icon = link.icon;
  const isExternal = link.href?.startsWith("http");
  const content = (
    <>
      {Icon && <Icon size={15} aria-hidden="true" />}
      <span>{link.title}</span>
    </>
  );

  if (link.href) {
    return (
      <a href={link.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return <Link to={link.to}>{content}</Link>;
}

export default function MarketingFooter() {
  return (
    <footer className="marketing-footer">
      <div className="marketing-footer-glow" aria-hidden="true" />
      <div className="marketing-footer-grid">
        <div className="marketing-footer-brand reveal-delay-1">
          <Link className="marketing-footer-logo" to="/" aria-label="VeriLens home">
            <span><ScanEye size={22} aria-hidden="true" /></span>
            VeriLens
          </Link>
          <p>
            Calm, visual AI-content verification for teams that need to inspect
            images, review text, and keep evidence readable after the decision.
          </p>
          <div className="marketing-footer-meta">
            <span><Sparkles size={14} aria-hidden="true" /> Built for trust-first review work</span>
          </div>
        </div>

        <div className="marketing-footer-links">
          {footerSections.map((section, index) => (
            <div
              className={`marketing-footer-column${section.align === "right" ? " marketing-footer-contact" : ""}`}
              key={section.label}
              style={{ "--footer-delay": `${index * 90}ms` }}
            >
              <h3>{section.label}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.title}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="marketing-footer-bottom">
        <span>Verification signals are decision support, not a replacement for human review.</span>
        <span>VeriLens TM (c) {new Date().getFullYear()}. All rights reserved.</span>
      </div>
    </footer>
  );
}

