export default function ToastContainer({ toasts }) {
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28,
      display: "flex", flexDirection: "column", gap: 10,
      zIndex: 500, pointerEvents: "none",
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: "var(--surface)",
          border: "1.5px solid var(--border)",
          borderLeft: `4px solid ${
            t.type === "success" ? "var(--success)"
            : t.type === "error" ? "var(--danger)"
            : "var(--accent)"
          }`,
          borderRadius: 12, padding: "13px 22px",
          fontSize: "0.9rem", color: "var(--text)",
          boxShadow: "var(--shadow)", maxWidth: 320,
          display: "flex", alignItems: "center", gap: 10,
          animation: "toastIn 0.25s ease",
        }}>
          {t.type === "success" ? "✅" : t.type === "error" ? "❌" : "ℹ️"} {t.msg}
        </div>
      ))}
    </div>
  );
}
