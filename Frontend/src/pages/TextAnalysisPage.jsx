import { useState } from "react";

import ErrorMessage from "../components/ErrorMessage.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ResultCard from "../components/ResultCard.jsx";
import { analyzeText } from "../services/analysisService.js";

export default function TextAnalysisPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) {
      setError("Paste text before running analysis.");
      return;
    }

    setError("");
    setResult(null);
    setIsSubmitting(true);

    try {
      const data = await analyzeText(text.trim());
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Text analysis failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow="Verification" title="Text Analysis">
        Paste writing to estimate whether it is AI generated or human written.
      </PageHeader>

      <form className="panel form-stack" onSubmit={handleSubmit}>
        <label>
          Text sample
          <textarea
            placeholder="Paste essay, report, article, assignment, or answer text here"
            rows={14}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setResult(null);
              setError("");
            }}
          />
        </label>

        <div className="button-row">
          <button className="button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Analyzing" : "Analyze Text"}
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              setText("");
              setResult(null);
              setError("");
            }}
          >
            Clear
          </button>
        </div>
      </form>

      <ErrorMessage message={error} />
      <ResultCard result={result} />
    </>
  );
}
