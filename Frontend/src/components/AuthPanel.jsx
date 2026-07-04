import { useEffect, useState } from "react";

export default function AuthPanel({ title, subtitle, children, ctaLink, imageUrl, imageUrlLight, imageUrlDark, position = "right" }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const getTheme = () => {
      if (typeof document === "undefined") return "light";
      const root = document.documentElement;
      if (root.dataset.theme) return root.dataset.theme;
      return root.classList.contains("theme-dark") ? "dark" : "light";
    };

    setTheme(getTheme());
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

    const revealTimeout = setTimeout(() => document.documentElement.classList.add("auth-revealed"), 60);
    return () => {
      observer.disconnect();
      clearTimeout(revealTimeout);
    };
  }, []);

  const isImageFirst = position === "left";
  const gridClass = isImageFirst
    ? "auth-grid auth-panel-scale auth-grid--reverse auth-grid--register"
    : "auth-grid auth-panel-scale auth-grid--login";
  const imageSource = theme === "dark"
    ? imageUrlDark || imageUrlLight || imageUrl
    : imageUrlLight || imageUrlDark || imageUrl;

  return (
    <div className={gridClass}>
      {isImageFirst && <AuthVisual imageSource={imageSource} />}

      <section className="auth-card auth-panel fade-in reveal-delay-1" style={{ zIndex: 3 }}>
        <h1>{title}</h1>
        {subtitle && <p className="auth-copy">{subtitle}</p>}
        {children}
        {ctaLink}
      </section>

      {!isImageFirst && <AuthVisual imageSource={imageSource} />}
    </div>
  );
}

function AuthVisual({ imageSource }) {
  return (
    <div className="auth-visual" aria-hidden="true">
      <div
        className="auth-visual-bg"
        style={{ backgroundImage: imageSource ? `url('${imageSource}')` : undefined }}
      />
    </div>
  );
}