export default function StatCard({ label, value, icon: Icon, tone = "default", meta }) {
  return (
    <article className={`stat-card stat-card-${tone}`}>
      <div className="stat-card-head">
        <span>{label}</span>
        {Icon ? <Icon size={19} aria-hidden="true" /> : null}
      </div>
      <strong>{value}</strong>
      {meta ? <small>{meta}</small> : null}
    </article>
  );
}
