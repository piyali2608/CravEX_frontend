import { qtyColor } from "../utils/helpers.jsx";
import { Utensils, Pencil, Trash2 } from "lucide-react";

export default function MenuTable({ dishes, onEdit, onDelete }) {
  if (!dishes.length) {
    return (
      <div style={{
        background: "var(--surface)", border: "1.5px solid var(--border)",
        borderRadius: 18, boxShadow: "var(--shadow)",
        textAlign: "center", padding: "56px 20px", color: "var(--text3)",
      }}>
        <div style={{ marginBottom: 14, opacity: 0.5, display: "flex", justifyContent: "center" }}>
          <Utensils size={48} strokeWidth={1.5} />
        </div>
        <p style={{ fontSize: "1rem", fontWeight: 500 }}>No dishes found</p>
      </div>
    );
  }

  return (
    <div style={{
      background: "var(--surface)", border: "1.5px solid var(--border)",
      borderRadius: 18, overflow: "hidden", boxShadow: "var(--shadow)",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--surface2)", borderBottom: "1.5px solid var(--border)" }}>
            {["Dish ID", "Dish Name", "Price", "Quantity", "Actions"].map((h) => (
              <th key={h} style={{
                fontFamily: "'Syne',sans-serif", fontSize: "0.78rem", fontWeight: 700,
                letterSpacing: "0.7px", textTransform: "uppercase",
                color: "var(--text3)", padding: "14px 20px", textAlign: "left",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dishes.map((d, idx) => (
            <DishRow
              key={d.id}
              dish={d}
              idx={idx}
              onEdit={() => onEdit(d)}
              onDelete={() => onDelete(d)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DishRow({ dish: d, idx, onEdit, onDelete }) {
  return (
    <tr
      className="dish-row"
      style={{
        borderBottom: "1px solid var(--border)",
        animationDelay: `${idx * 0.04}s`,
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg3)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
    >
      {/* ID */}
      <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
        <span style={{
          background: "var(--badge-bg)", color: "var(--tag-text)",
          borderRadius: 7, padding: "4px 10px", fontSize: "0.82rem",
          fontWeight: 700, fontFamily: "'Syne',sans-serif",
        }}>#{d.id}</span>
      </td>

      {/* Name (Clean text only, no emojis) */}
      <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
        <span style={{ fontWeight: 600, color: "var(--text)", fontSize: "1rem" }}>
          {d.name}
        </span>
      </td>

      {/* Price */}
      <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
        <span style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          color: "var(--accent)", fontSize: "1.05rem",
        }}>₹{d.price}</span>
      </td>

      {/* Quantity */}
      <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: qtyColor(d.quantity), display: "inline-block",
          }} />
          {d.quantity}
        </span>
      </td>

      {/* Actions */}
      <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <ActionBtn
            label={<><Pencil size={14} strokeWidth={2.5} /> Edit</>}
            onClick={onEdit}
            hoverBorder="var(--accent)"
            hoverColor="var(--accent2)"
            defaultColor="var(--tag-text)"
            bg="var(--badge-bg)"
          />
          <ActionBtn
            label={<Trash2 size={16} strokeWidth={2.5} />}
            onClick={onDelete}
            hoverBorder="var(--danger)"
            hoverBg="rgba(220,38,38,0.07)"
            defaultColor="var(--danger)"
            bg="transparent"
          />
        </div>
      </td>
    </tr>
  );
}

function ActionBtn({ label, onClick, hoverBorder, hoverColor, hoverBg, defaultColor, bg }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: bg, border: "1.5px solid var(--border)",
        borderRadius: 8, padding: "7px 12px", fontSize: "0.85rem",
        fontWeight: 700, color: defaultColor, cursor: "pointer",
        fontFamily: "'DM Sans',sans-serif",
        display: "flex", alignItems: "center", gap: 6,
        transition: "all 0.17s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hoverBorder;
        if (hoverColor) e.currentTarget.style.color = hoverColor;
        if (hoverBg) e.currentTarget.style.background = hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = defaultColor;
        e.currentTarget.style.background = bg;
      }}
    >
      {label}
    </button>
  );
}