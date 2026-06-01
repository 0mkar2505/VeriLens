import { useEffect, useMemo, useState } from "react";

import ErrorMessage from "../components/ErrorMessage.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ResultCard from "../components/ResultCard.jsx";
import { analyzeImage } from "../services/analysisService.js";

export default function ImageAnalysisPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const previewUrl = useMemo(() => (
    file ? URL.createObjectURL(file) : ""
  ), [file]);

  useEffect(() => () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setError("Choose an image before running analysis.");
      return;
    }

    setError("");
    setResult(null);
    setIsSubmitting(true);

    try {
      const data = await analyzeImage(file);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Image analysis failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow="Verification" title="Image Analysis">
        Upload an image and classify it with the VeriLens image detector.
      </PageHeader>

      <form className="analysis-grid" onSubmit={handleSubmit}>
        <label className="upload-zone">
          <input
            accept="image/*"
            type="file"
            onChange={(event) => {
              setFile(event.target.files?.[0] || null);
              setResult(null);
              setError("");
            }}
          />
          <strong>{file ? file.name : "Choose image"}</strong>
          <span>PNG, JPG, JPEG, or WEBP</span>
        </label>

        <div className="preview-panel">
          {previewUrl ? (
            <img alt="Selected upload preview" src={previewUrl} />
          ) : (
            <span>Preview</span>
          )}
        </div>

        <div className="analysis-actions">
          <button className="button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Analyzing" : "Analyze Image"}
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              setFile(null);
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
