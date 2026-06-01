import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmptyState from "../components/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import {
  fetchDashboardRecent,
  fetchDashboardStats
} from "../services/dashboardService.js";
import { formatDate } from "../utils/formatters.js";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, recentData] = await Promise.all([
          fetchDashboardStats(),
          fetchDashboardRecent()
        ]);

        setStats(statsData);
        setRecent(recentData);
      } catch (err) {
        setError(err.response?.data?.detail || "Unable to load dashboard.");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        actions={<Link className="button" to="/analyze/image">New Analysis</Link>}
      >
        Monitor verification activity across image and text submissions.
      </PageHeader>

      <ErrorMessage message={error} />

      <section className="stat-grid">
        <StatCard label="Total analyses" value={isLoading ? "..." : stats?.total_analyses ?? 0} />
        <StatCard label="Image analyses" value={isLoading ? "..." : stats?.image_analyses ?? 0} />
        <StatCard label="Text analyses" value={isLoading ? "..." : stats?.text_analyses ?? 0} />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Recent analyses</h2>
          <Link to="/history">View history</Link>
        </div>

        {!isLoading && recent.length === 0 ? (
          <EmptyState title="No analyses yet">
            Run an image or text check to populate your dashboard.
          </EmptyState>
        ) : (
          <div className="table-list">
            {recent.map((item, index) => (
              <article className="table-row" key={`${item.created_at}-${index}`}>
                <span>{item.analysis_type}</span>
                <strong>{item.prediction}</strong>
                <time>{formatDate(item.created_at)}</time>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
