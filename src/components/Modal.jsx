import { useEffect } from "react";

export default function Modal({ open, onClose, maxWidth = 440, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
        zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          border: "1.5px solid var(--border)",
          borderRadius: 22,
          padding: "2.2rem 2rem",
          width: "100%",
          maxWidth,
          boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
          animation: "modalIn 0.22s cubic-bezier(.4,0,.2,1)",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}
