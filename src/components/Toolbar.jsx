import { useRef, useState } from "react";
import Autocomplete from "./Autocomplete";
import { Search, ArrowDownUp, ChevronDown } from "lucide-react";

export default function Toolbar({ menu, search, onSearch, sort, onSort }) {
  const acRef = useRef(null);
  const [isSelectHovered, setIsSelectHovered] = useState(false);

  return (
    <div style={{
      display: "flex", gap: 16, marginBottom: "2.5rem",
      flexWrap: "wrap", alignItems: "center",
    }}>
      {/* Search Input Container */}
      <div style={{ flex: 1, minWidth: 280, position: "relative" }} ref={acRef}>
        <div style={{
          position: "absolute", left: 16, top: "50%",
          transform: "translateY(-50%)", color: "var(--text3)",
          zIndex: 2, display: "flex", alignItems: "center", pointerEvents: "none"
        }}>
          <Search size={20} strokeWidth={2.5} />
        </div>
        <Autocomplete menu={menu} search={search} onSearch={onSearch} />
      </div>

      {/* Sort Dropdown Container */}
      <div 
        style={{ position: "relative" }}
        onMouseEnter={() => setIsSelectHovered(true)}
        onMouseLeave={() => setIsSelectHovered(false)}
      >
        <div style={{
          position: "absolute", left: 16, top: "50%",
          transform: "translateY(-50%)", 
          color: isSelectHovered ? "var(--accent)" : "var(--text3)",
          pointerEvents: "none", display: "flex", alignItems: "center",
          transition: "color 0.2s ease"
        }}>
          <ArrowDownUp size={18} strokeWidth={2.5} />
        </div>
        
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          style={{
            appearance: "none",
            background: "var(--surface)", 
            border: `1.5px solid ${isSelectHovered ? "var(--accent)" : "var(--border)"}`,
            borderRadius: 12, padding: "12px 48px 12px 44px",
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", fontWeight: 600,
            color: "var(--text)", outline: "none", cursor: "pointer",
            boxShadow: isSelectHovered ? "0 4px 16px var(--accent-glow)" : "var(--shadow2)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
          onFocus={(e) => { 
            e.currentTarget.style.borderColor = "var(--accent)"; 
            e.currentTarget.style.boxShadow = "0 0 0 4px var(--accent-glow)"; 
          }}
          onBlur={(e) => { 
            e.currentTarget.style.borderColor = "var(--border)"; 
            e.currentTarget.style.boxShadow = "var(--shadow2)"; 
          }}
        >
          <option value="id">Sort by Dish ID</option>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="quantity">Sort by Quantity</option>
        </select>
        
        {/* Custom Chevron Icon */}
        <div style={{
          position: "absolute", right: 16, top: "50%",
          transform: "translateY(-50%)", 
          color: isSelectHovered ? "var(--accent)" : "var(--text3)",
          pointerEvents: "none", display: "flex", alignItems: "center",
          transition: "color 0.2s ease"
        }}>
          <ChevronDown size={18} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}