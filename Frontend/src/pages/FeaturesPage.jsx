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
    </section>
  );
}
