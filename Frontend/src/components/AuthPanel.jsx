import { useEffect } from "react";

export default function AuthPanel({ title, subtitle, children, ctaLink, imageUrl, position = "right" }) {
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.classList.add("auth-revealed"), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`auth-grid auth-panel-scale ${position === "left" ? "auth-grid--reverse" : ""}`}>
      {position === "left" && (
        <div className="auth-visual" aria-hidden="true">
          <div
            className="auth-visual-bg"
            style={{ backgroundImage: `linear-gradient(rgba(2,10,16,0.55), rgba(2,10,16,0.55)), url('${imageUrl || "https://picsum.photos/seed/verilens/1600/1200"}')` }}
          />

          <div className="auth-testimonials" aria-hidden="true">
            <div className="auth-testimonial">
              <strong>Sarah Chen</strong>
              <small>@sarahdigital</small>
              <p>Amazing platform! The user experience is seamless and the features are exactly what I needed.</p>
            </div>
            <div className="auth-testimonial">
              <strong>Marcus Johnson</strong>
              <small>@marcustech</small>
              <p>Clean design, powerful features, and excellent support.</p>
            </div>
          </div>
        </div>
      )}

      <section className="auth-card auth-panel fade-in reveal-delay-1">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
        {ctaLink}
      </section>
      {position !== "left" && (
        <div className="auth-visual" aria-hidden="true">
          <div
            className="auth-visual-bg"
            style={{ backgroundImage: `linear-gradient(rgba(2,10,16,0.55), rgba(2,10,16,0.55)), url('${imageUrl || "https://picsum.photos/seed/verilens/1600/1200"}')` }}
          />

          <div className="auth-testimonials" aria-hidden="true">
            <div className="auth-testimonial">
              <strong>Sarah Chen</strong>
              <small>@sarahdigital</small>
              <p>Amazing platform! The user experience is seamless and the features are exactly what I needed.</p>
            </div>
            <div className="auth-testimonial">
              <strong>Marcus Johnson</strong>
              <small>@marcustech</small>
              <p>Clean design, powerful features, and excellent support.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
