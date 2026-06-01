import { formatPercent } from "../utils/formatters.js";

export default function ResultCard({ result }) {
  if (!result) {
    return null;
  }

  const probabilities = result.probabilities || {
    "AI Generated": result.ai_probability,
    "Human Written": result.human_probability
  };

  const confidence = result.confidence
    ?? Math.max(...Object.values(probabilities).filter((value) => value !== undefined));

  return (
    <section className="result-card" aria-live="polite">
      <div className="result-heading">
        <div>
          <span>Prediction</span>
          <strong>{result.prediction}</strong>
        </div>
        <div className="confidence-badge">{formatPercent(confidence)}</div>
      </div>

      <div className="meter-list">
        {Object.entries(probabilities).map(([label, value]) => (
          <div className="meter-row" key={label}>
            <span>{label}</span>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{ width: `${Number(value) || 0}%` }}
              />
            </div>
            <strong>{formatPercent(value)}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
