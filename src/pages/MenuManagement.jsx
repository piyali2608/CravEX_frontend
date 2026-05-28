import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import Toolbar         from "../components/Toolbar";
import MenuTable       from "../components/MenuTable";
import DishModal       from "../components/DishModal";
import DeleteModal     from "../components/DeleteModal";

import { useMenu }     from "../hooks/useMenu";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function MenuManagement({ showToast }) {
  const { menu, load, add, update, remove } = useMenu(showToast);
  const [search, setSearch] = useState("");
  const [sort,   setSort]   = useState("id");

  const [dishModal,   setDishModal]   = useState(false);
  const [editDish,    setEditDish]    = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // EXPLICIT DATABASE FETCH CATCH TRACKER
  useEffect(() => {
    const initializeMenu = async () => {
      try {
        await load();
      } catch (error) {
        showToast("Failed to load menu. Fetch error.", "error");
      }
    };
    initializeMenu();
  }, [load]);

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

  // EXPLICIT SAVE & UPDATE POP-UP HANDLERS
  const handleSubmit = async (dish) => {
    try {
      if (editDish) {
        await update(dish);
        showToast("Dish details updated successfully!", "success");
      } else {
        await add(dish);
        showToast("New dish added to Menu!", "success");
      }
      closedish();
    } catch (error) {
      // Triggers pop-up instantly if API server fails or rejects the add
      showToast(editDish ? "Failed to update dish." : "Dish not added.", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await remove(deleteTarget.id);
      showToast(`Dish "${deleteTarget?.name}" deleted successfully.`, "success");
    } catch (error) {
      showToast("Delete operation failed.", "error");
    }
    closeDelete();
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "1rem" }}>
      
      <div style={{ paddingLeft: "4px" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.3rem", fontWeight: 800, textShadow: "0 0 20px var(--accent-glow)" }}>
          MENU <span style={{ color: "var(--accent)" }}>MANAGEMENT</span>
        </h1>
      </div>

      <div className="floating-glass" style={{ 
        display: "flex", flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center", justifyContent: "space-between",
        gap: 12, background: "var(--surface)", padding: "10px 12px", borderRadius: "14px", width: "100%"
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Toolbar menu={menu} search={search} onSearch={setSearch} sort={sort} onSort={setSort} />
        </div>
        
        <button
          onClick={openAdd}
          style={{
            background: "var(--accent)", color: "#fff", border: "none", borderRadius: "8px",
            padding: "0 16px", height: "36px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
            fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyJoin: "center", gap: 6,
            boxShadow: "0 2px 8px var(--accent-glow)", transition: "all 0.15s ease", whiteSpace: "nowrap"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent2)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; }}
        >
          <Plus size={14} strokeWidth={2.5} /> Add Dish
        </button>
      </div>

      <MenuTable dishes={filtered} onEdit={openEdit} onDelete={openDelete} />

      <DishModal open={dishModal} onClose={closedish} onSubmit={handleSubmit} editDish={editDish} />
      <DeleteModal open={deleteModal} onClose={closeDelete} onConfirm={handleDelete} dishName={deleteTarget?.name} />
    </div>
  );
}