import { useState, useEffect } from "react";
import { Plus, RefreshCw, Search, ArrowUpDown, ChevronDown } from "lucide-react";

import MenuTable       from "../components/MenuTable";
import DishModal       from "../components/DishModal";
import DeleteModal     from "../components/DeleteModal";

import { useMenu }     from "../hooks/useMenu";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function MenuManagement({ showToast }) {
  const { menu, load, add, update, remove } = useMenu(showToast);
  const [search, setSearch] = useState("");
  const [sort,   setSort]   = useState("id");
  const [isFocused, setIsFocused] = useState(false);

  const [dishModal,   setDishModal]   = useState(false);
  const [editDish,    setEditDish]    = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isSaving, setIsSaving] = useState(false);

  // EXPLICIT DATABASE FETCH CATCH TRACKER
  useEffect(() => {
    const initializeMenu = async () => {
      try {
        await load();
      } catch (error) {
        showToast("Failed to load menu from database. Fetch error.", "error");
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

  const handleSubmit = async (dish) => {
    setIsSaving(true);
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
      showToast(editDish ? "Failed to update dish." : "Dish not added.", "error");
    } finally {
      setIsSaving(false);
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
      
      {/* HEADER SECTION */}
      <div style={{ paddingLeft: "4px", display: "flex", alignItems: "center", gap: "14px" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: isMobile ? "1.1rem" : "1.3rem", fontWeight: 800, textShadow: "0 0 20px var(--accent-glow)" }}>
          MENU <span style={{ color: "var(--accent)" }}>MANAGEMENT</span>
        </h1>

        {isSaving && (
          <div style={{ 
            display: "flex", alignItems: "center", gap: "6px", color: "var(--success)", fontSize: "0.8rem", fontWeight: 600, animation: "fadeIn 0.2s ease"
          }}>
            <RefreshCw size={11} style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ color: "var(--text3)", fontWeight: 500 }}>Synchronizing...</span>
          </div>
        )}
      </div>

      {/* UNIFIED SINGLE-ROW CONTROL BAR CONTAINER */}
      <div className="floating-glass" style={{ 
        display: "flex", 
        flexDirection: "row", // Locked into a single horizontal row across all screen sizes
        alignItems: "center", 
        justifyContent: "space-between",
        gap: isMobile ? 6 : 12, // Tighter spacing layout on mobile ports
        background: "var(--surface)", 
        padding: isMobile ? "8px" : "12px", 
        borderRadius: "14px", 
        width: "100%",
        boxSizing: "border-box"
      }}>
        
        {/* 1. FLEXIBLE SEARCH INPUT */}
        <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
          <div style={{ 
            position: "absolute", left: isMobile ? 10 : 14, top: "50%", transform: "translateY(-50%)", 
            color: isFocused ? "var(--accent)" : "var(--text3)", display: "flex", alignItems: "center", pointerEvents: "none" 
          }}>
            <Search size={14} strokeWidth={2.2} />
          </div>
          <input 
            type="text"
            placeholder={isMobile ? "Search..." : "Search dishes by name or ID..."} 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{ 
              paddingLeft: isMobile ? "32px" : "40px", 
              paddingRight: "8px",
              height: "38px", 
              width: "100%",
              boxSizing: "border-box",
              border: isFocused ? "1.5px solid var(--accent)" : "1.5px solid var(--border)",
              outline: "none",
              borderRadius: "10px",
              background: "var(--input-bg)",
              color: "var(--text)",
              fontSize: "0.82rem",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s ease",
              textOverflow: "ellipsis"
            }}
          />
        </div>
        
        {/* 2. COMPACT ID REFERENCE DROPDOWN */}
        <div style={{ position: "relative", width: isMobile ? "115px" : "180px", flexShrink: 0 }}>
          <div style={{ position: "absolute", left: isMobile ? 8 : 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", display: "flex", alignItems: "center", pointerEvents: "none" }}>
            <ArrowUpDown size={13} strokeWidth={2.2} />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              width: "100%",
              height: "38px",
              paddingLeft: isMobile ? "26px" : "34px",
              paddingRight: isMobile ? "22px" : "32px",
              borderRadius: "10px",
              border: "1.5px solid var(--border)",
              background: "var(--input-bg)",
              color: "var(--text)",
              fontSize: "0.8rem",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              outline: "none",
              appearance: "none",
              WebkitAppearance: "none",
              boxSizing: "border-box",
              textOverflow: "ellipsis"
            }}
          >
            <option value="id">{isMobile ? "ID Ref" : "ID Reference"}</option>
            <option value="name">{isMobile ? "Name" : "Name Alphabetical"}</option>
          </select>
          <div style={{ position: "absolute", right: isMobile ? 8 : 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", display: "flex", alignItems: "center", pointerEvents: "none" }}>
            <ChevronDown size={13} strokeWidth={2.5} />
          </div>
        </div>

        {/* 3. RESPONSIVE ADD DISH ACTION BUTTON */}
        <button
          onClick={openAdd}
          title="Add New Dish"
          style={{
            background: "var(--accent)", color: "#fff", border: "none", borderRadius: "10px",
            padding: isMobile ? "0" : "0 18px", 
            width: isMobile ? "38px" : "auto", // Becomes a clean square button on mobile viewports
            height: "38px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
            fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            boxShadow: "0 2px 8px var(--accent-glow)", transition: "all 0.15s ease", whiteSpace: "nowrap",
            flexShrink: 0
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent2)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; }}
        >
          <Plus size={15} strokeWidth={2.5} /> 
          {!isMobile && "Add Dish"} {/* Drops text on mobile to conserve row space */}
        </button>
      </div>

      {/* CORE CATALOG DATA MANIFEST GRID TABLE */}
      <MenuTable dishes={filtered} onEdit={openEdit} onDelete={openDelete} />

      {/* MODAL WINDOW HOOK OVERLAYS */}
      <DishModal open={dishModal} onClose={closedish} onSubmit={handleSubmit} editDish={editDish} />
      <DeleteModal open={deleteModal} onClose={closeDelete} onConfirm={handleDelete} dishName={deleteTarget?.name} />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}