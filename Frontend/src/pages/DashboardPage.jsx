import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileImage, FileText, History, Plus, ShieldCheck, Sparkles, TimerReset, TrendingUp } from "lucide-react";

import EmptyState from "../components/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import {
  fetchDashboardRecent,
  fetchDashboardStats
} from "../services/dashboardService.js";
import { formatDate } from "../utils/formatters.js";

const quickActions = [
  {
    title: "Image verification",
    description: "Inspect an uploaded image for AI-generated signals.",
    to: "/analyze/image",
    icon: FileImage
  },
  {
    title: "Text verification",
    description: "Review text for synthetic patterns and confidence cues.",
    to: "/analyze/text",
    icon: FileText
  },
  {
    title: "Audit history",
    description: "Return to previous results and remove stale records.",
    to: "/history",
    icon: History
  }
];

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

  const dashboardTotals = useMemo(() => {
    const total = stats?.total_analyses ?? 0;
    const image = stats?.image_analyses ?? 0;
    const text = stats?.text_analyses ?? 0;
    const reviewedToday = recent.filter((item) => {
      if (!item.created_at) return false;
      const createdAt = new Date(item.created_at);
      const today = new Date();
      return createdAt.toDateString() === today.toDateString();
    }).length;

    return { total, image, text, reviewedToday };
  }, [recent, stats]);

  return (
    <div className="dashboard-page">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        actions={(
          <Link className="button button-icon" to="/analyze/image">
            <Plus size={18} aria-hidden="true" />
            New Analysis
          </Link>
        )}
      >
        Monitor verification activity across image and text submissions.
      </PageHeader>

      <ErrorMessage message={error} />

      <section className="dashboard-hero-panel">
        <div>
          <p className="eyebrow">Verification command center</p>
          <h2>Review signals, launch checks, and keep evidence moving.</h2>
          <p>
            Your workspace now mirrors the public VeriLens atmosphere while keeping the tools compact and repeatable.
          </p>
        </div>
        <div className="dashboard-hero-metric" aria-label="Total analyses">
          <Sparkles size={24} aria-hidden="true" />
          <strong>{isLoading ? "..." : dashboardTotals.total}</strong>
          <span>Total checks</span>
        </div>
      </section>

      <section className="stat-grid dashboard-stat-grid">
        <StatCard
          icon={TrendingUp}
          label="Total analyses"
          meta="All verification runs"
          tone="cyan"
          value={isLoading ? "..." : dashboardTotals.total}
        />
        <StatCard
          icon={FileImage}
          label="Image analyses"
          meta="Visual evidence checks"
          tone="emerald"
          value={isLoading ? "..." : dashboardTotals.image}
        />
        <StatCard
          icon={FileText}
          label="Text analyses"
          meta="Language checks"
          tone="amber"
          value={isLoading ? "..." : dashboardTotals.text}
        />
        <StatCard
          icon={TimerReset}
          label="Recent today"
          meta="Loaded in recent activity"
          tone="violet"
          value={isLoading ? "..." : dashboardTotals.reviewedToday}
        />
      </section>

      <section className="dashboard-grid-main">
        <div className="panel dashboard-activity-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Live activity</p>
              <h2>Recent analyses</h2>
            </div>
            <Link to="/history">View history</Link>
          </div>

          {!isLoading && recent.length === 0 ? (
            <EmptyState title="No analyses yet">
              Run an image or text check to populate your dashboard.
            </EmptyState>
          ) : (
            <div className="dashboard-activity-list">
              {recent.map((item, index) => (
                <article className="dashboard-activity-row" key={`${item.created_at}-${index}`}>
                  <span className="activity-icon">
                    {item.analysis_type === "image" ? <FileImage size={17} aria-hidden="true" /> : <FileText size={17} aria-hidden="true" />}
                  </span>
                  <div>
                    <strong>{item.prediction}</strong>
                    <span>{item.analysis_type} analysis</span>
                  </div>
                  <time>{formatDate(item.created_at)}</time>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="dashboard-side-stack">
          <section className="panel quick-actions-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Start</p>
                <h2>Quick actions</h2>
              </div>
            </div>
            <div className="quick-action-list">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link className="quick-action-card" key={action.title} to={action.to}>
                    <span><Icon size={18} aria-hidden="true" /></span>
                    <div>
                      <strong>{action.title}</strong>
                      <p>{action.description}</p>
                    </div>
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="panel dashboard-health-panel">
            <ShieldCheck size={22} aria-hidden="true" />
            <div>
              <h2>Review posture</h2>
              <p>Verification signals are decision support. Keep human review in the loop for final calls.</p>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
