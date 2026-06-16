export default function FeaturesPage() {
  return (
    <section className="page-section page-features">
      <div className="section-intro">
        <p className="eyebrow">Features</p>
        <h1>Verify content with confidence.</h1>
        <p>
          Everything you need to check images and text, review history, and keep
          your work organized in one secure workspace.
        </p>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <strong>Image detection</strong>
          <p>Upload any image and get a clear AI/human authenticity result.</p>
        </article>

        <article className="feature-card">
          <strong>Text analysis</strong>
          <p>Paste content and receive a judgment on whether it appears AI-generated.</p>
        </article>

        <article className="feature-card">
          <strong>History & audit</strong>
          <p>Track analysis results over time so you can review and export evidence.</p>
        </article>

        <article className="feature-card">
          <strong>Secure sign-up</strong>
          <p>Create accounts and return to your workspace with safe authentication.</p>
        </article>
      </div>

      <section className="visual-feature-band">
        <div>
          <p className="eyebrow">Detection workflow</p>
          <h2>Designed for scanning, comparing, and deciding fast.</h2>
          <p>
            Image and text signals stay organized so reviewers can move from
            upload to decision without losing context.
          </p>
        </div>
        <div className="visual-feature-gallery">
          <img
            alt="Content moderation workspace on a laptop"
            loading="lazy"
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
          />
          <img
            alt="Analytics dashboard displayed on a monitor"
            loading="lazy"
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
          />
          <img
            alt="Person reviewing data on a desktop screen"
            loading="lazy"
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80"
          />
        </div>
      </section>
    </section>
  );
}
