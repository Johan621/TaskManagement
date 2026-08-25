function Analytics({ data }) {
  const cards = [
    { label: "Total Tasks", value: data.totalTasks ?? 0, className: "analytics-total" },
    { label: "Completed", value: data.completedTasks ?? 0, className: "analytics-done" },
    { label: "Pending", value: data.pendingTasks ?? 0, className: "analytics-pending" },
    { label: "Completion", value: `${data.completionRate ?? 0}%`, className: "analytics-rate" },
  ];

  return (
    <section className="analytics-grid" aria-label="Task analytics">
      {cards.map((card) => (
        <div className={`analytics-card ${card.className}`} key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </div>
      ))}
    </section>
  );
}

export default Analytics;
