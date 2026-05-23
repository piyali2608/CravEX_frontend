import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import Toolbar         from "../components/Toolbar";
import MenuTable       from "../components/MenuTable";
import DishModal       from "../components/DishModal";
import DeleteModal     from "../components/DeleteModal";

import { useMenu }     from "../hooks/useMenu";

export default function MenuManagement({ showToast }) {
  const { menu, load, add, update, remove } = useMenu(showToast);

  const [search, setSearch] = useState("");
  const [sort,   setSort]   = useState("id");

  // Modals
  const [dishModal,   setDishModal]   = useState(false);
  const [editDish,    setEditDish]    = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => { load(); }, [load]);

  const filtered = menu
    .filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      String(d.id).includes(search)
    )
    .sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : a[sort] - b[sort]
    );

  const openAdd  = () => { setEditDish(null); setDishModal(true); };
  const openEdit = (dish) => { setEditDish(dish); setDishModal(true); };
  const closedish = () => { setDishModal(false); setEditDish(null); };

  const openDelete  = (dish) => { setDeleteTarget(dish); setDeleteModal(true); };
  const closeDelete = () => { setDeleteModal(false); setDeleteTarget(null); };

  const handleSubmit = async (dish) => {
    try {
      editDish ? await update(dish) : await add(dish);
      closedish();
    } catch {
      showToast("Operation failed", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await remove(deleteTarget.id);
    } catch {
      showToast("Delete failed", "error");
    }
    closeDelete();
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: "2rem", flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontSize: "2.1rem",
            fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.1, color: "var(--text)",
          }}>
            Menu Management <span style={{ color: "var(--accent)" }}>Dashboard</span>
          </h1>
          <p style={{ color: "var(--text3)", fontSize: "0.93rem", marginTop: 4, fontWeight: 300 }}>
            Manage your dishes — add, update, and remove items
          </p>
        </div>

        <button
          onClick={openAdd}
          style={{
            background: "var(--accent)", color: "#fff",
            border: "none", borderRadius: 10,
            padding: "11px 20px",
            fontFamily: "'Syne',sans-serif", fontSize: "0.97rem",
            fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 18px var(--accent-glow)",
            transition: "background 0.18s, transform 0.12s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent2)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)";  e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <Plus size={20} strokeWidth={2.5} /> Add Dish
        </button>
      </div>

      <Toolbar
        menu={menu}
        search={search} onSearch={setSearch}
        sort={sort}     onSort={setSort}
      />

      <MenuTable
        dishes={filtered}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      <DishModal
        open={dishModal}
        onClose={closedish}
        onSubmit={handleSubmit}
        editDish={editDish}
      />

      <DeleteModal
        open={deleteModal}
        onClose={closeDelete}
        onConfirm={handleDelete}
        dishName={deleteTarget?.name}
      />
    </div>
  );
}