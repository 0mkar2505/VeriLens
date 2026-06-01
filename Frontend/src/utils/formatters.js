export function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function formatPercent(value) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return "N/A";
  }

  return `${Math.round(Number(value))}%`;
}
