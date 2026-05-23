import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function DishModal({ open, onClose, onSubmit, editDish }) {
  const [id, setId]       = useState("");
  const [name, setName]   = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty]     = useState("");

  useEffect(() => {
    if (editDish) {
      setId(editDish.id);
      setName(editDish.name);
      setPrice(editDish.price);
      setQty(editDish.quantity);
    } else {
      setId(""); setName(""); setPrice(""); setQty("");
    }
  }, [editDish, open]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (!editDish && !id) return;
    onSubmit({
      id: parseInt(id),
      name: name.trim(),
      price: parseInt(price),
      quantity: parseInt(qty),
    });
  };

  const isEdit = !!editDish;

  return (
    <Modal open={open} onClose={onClose}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.6rem" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "var(--text)" }}>
          {isEdit ? "Edit" : "Add"} <span style={{ color: "var(--accent)" }}>Dish</span>
        </div>
        <CloseBtn onClick={onClose} />
      </div>

      {/* Fields */}
      <FormField label="Dish ID">
        <input className="dish-input" type="number" value={id}
          onChange={(e) => setId(e.target.value)} placeholder="e.g. 101" min="1" disabled={isEdit} />
      </FormField>
      <FormField label="Dish Name">
        <input className="dish-input" type="text" value={name}
          onChange={(e) => setName(e.target.value)} placeholder="e.g. Paneer Butter Masala" />
      </FormField>

      <div style={{ display: "flex", gap: 12 }}>
        <FormField label="Price (₹)" style={{ flex: 1 }}>
          <input className="dish-input" type="number" value={price}
            onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 180" min="0" />
        </FormField>
        <FormField label="Quantity" style={{ flex: 1 }}>
          <input className="dish-input" type="number" value={qty}
            onChange={(e) => setQty(e.target.value)} placeholder="e.g. 20" min="0" />
        </FormField>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", gap: 10, marginTop: "1.8rem" }}>
        <CancelBtn onClick={onClose} />
        <SubmitBtn onClick={handleSubmit} label="Save Dish" />
      </div>
    </Modal>
  );
}

export function FormField({ label, children, style }) {
  return (
    <div style={{ marginBottom: "1.1rem", ...style }}>
      <label style={{
        display: "block", fontSize: "0.8rem", fontWeight: 600,
        fontFamily: "'Syne',sans-serif", color: "var(--text2)",
        textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6,
      }}>{label}</label>
      {children}
    </div>
  );
}

export function CloseBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "var(--surface2)", border: "1.5px solid var(--border)",
      borderRadius: 8, padding: "4px 10px", fontSize: "1.1rem",
      color: "var(--text3)", cursor: "pointer", transition: "all 0.15s",
    }}>✕</button>
  );
}

export function CancelBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, background: "var(--surface2)", border: "1.5px solid var(--border)",
      borderRadius: 10, padding: 11, fontFamily: "'Syne',sans-serif",
      fontSize: "0.93rem", fontWeight: 700, color: "var(--text2)", cursor: "pointer",
    }}>Cancel</button>
  );
}

export function SubmitBtn({ onClick, label, danger }) {
  return (
    <button onClick={onClick} style={{
      flex: 2, background: danger ? "var(--danger)" : "var(--accent)",
      border: "none", borderRadius: 10, padding: 11,
      fontFamily: "'Syne',sans-serif", fontSize: "0.97rem",
      fontWeight: 700, color: "#fff", cursor: "pointer",
      boxShadow: danger ? "none" : "0 4px 18px var(--accent-glow)",
      transition: "background 0.18s, transform 0.12s",
    }}>{label}</button>
  );
}
