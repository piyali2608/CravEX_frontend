import { X, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      right: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      zIndex: 2000,
    }}>
      {toasts.map((t) => {
        const isError = t.type === "error";
        const accentColor = isError ? "#ef4444" : "#10b981";

        return (
          <div 
            key={t.id} 
            style={{
              position: "relative",
              background: "#ffffff",
              borderRadius: "14px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              display: "flex",
              alignItems: "center",
              padding: "14px 20px 14px 20px",
              gap: "12px",
              minWidth: "260px",
              maxWidth: "360px",
              overflow: "hidden",
              animation: "toastSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
            }}
          >
            {/* THICK ACCENT STRIP: Replicating the colored bar from image_75fd08.png */}
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "5px",
              background: accentColor
            }} />

            {/* Status Vector Icon */}
            <div style={{ display: "flex", alignItems: "center", color: accentColor }}>
              {isError ? (
                <AlertCircle size={18} strokeWidth={2.5} />
              ) : (
                <CheckCircle2 size={18} strokeWidth={2.5} />
              )}
            </div>

            {/* Message Label String */}
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#1c120c",
              flex: 1,
              letterSpacing: "-0.01em"
            }}>
              {t.msg}
            </span>

            {/* Manual Dismiss Handle */}
            <button
              onClick={() => onDismiss?.(t.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "#a3806a",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "2px",
                borderRadius: "4px",
                transition: "color 0.15s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#1c120c"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#a3806a"}
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        );
      })}
      
      <style>{`
        @keyframes toastSlideUp {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}