import Modal from "./Modal";
import { CancelBtn, SubmitBtn } from "./DishModal";

export default function DeleteModal({ open, onClose, onConfirm, dishName }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={380}>
      <div style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: 12 }}>🗑️</div>

      <div style={{
        fontFamily: "'Syne',sans-serif", fontSize: "1.2rem",
        fontWeight: 800, color: "var(--text)", textAlign: "center", marginBottom: 10,
      }}>
        Delete <span style={{ color: "var(--accent)" }}>Dish</span>
      </div>

      <p style={{
        textAlign: "center", color: "var(--text2)",
        fontSize: "0.97rem", lineHeight: 1.6, marginBottom: "0.5rem",
      }}>
        Are you sure you want to remove{" "}
        <span style={{ color: "var(--accent)", fontWeight: 600 }}>{dishName}</span>{" "}
        from the menu?
      </p>

      <p style={{ textAlign: "center", fontSize: "0.83rem", color: "var(--text3)" }}>
        This action cannot be undone.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: "1.8rem" }}>
        <CancelBtn onClick={onClose} />
        <SubmitBtn onClick={onConfirm} label="Delete" danger />
      </div>
    </Modal>
  );
}
