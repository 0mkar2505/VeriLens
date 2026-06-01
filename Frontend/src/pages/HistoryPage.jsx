import { useEffect, useState } from "react";

import EmptyState from "../components/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import PageHeader from "../components/PageHeader.jsx";
import {
  deleteHistoryItem,
  fetchHistory
} from "../services/historyService.js";
import { formatDate } from "../utils/formatters.js";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (err) {
        setError(err.response?.data?.detail || "Unable to load history.");
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();
  }, []);

  async function handleDelete(analysisId) {
    setError("");
    setDeletingId(analysisId);

    try {
      await deleteHistoryItem(analysisId);
      setHistory((items) => items.filter((item) => item.id !== analysisId));
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to delete analysis.");
    } finally {
      setDeletingId("");
    }
  }

  return (
    <>
      <PageHeader eyebrow="Audit trail" title="History">
        Review and manage saved verification results.
      </PageHeader>

      <ErrorMessage message={error} />

      <section className="panel">
        {isLoading ? (
          <EmptyState title="Loading history" />
        ) : history.length === 0 ? (
          <EmptyState title="No saved analyses">
            Completed analysis records will appear here.
          </EmptyState>
        ) : (
          <div className="table-list">
            {history.map((item) => (
              <article className="table-row table-row-actions" key={item.id}>
                <span>{item.analysis_type}</span>
                <strong>{item.prediction}</strong>
                <time>{formatDate(item.created_at)}</time>
                <button
                  className="button button-danger button-compact"
                  disabled={deletingId === item.id}
                  type="button"
                  onClick={() => handleDelete(item.id)}
                >
                  {deletingId === item.id ? "Deleting" : "Delete"}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
