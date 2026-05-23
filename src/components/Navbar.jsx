import { Menu, Store, Sun, Moon } from "lucide-react";

export default function Navbar({ theme, onToggleTheme, isStoreOpen, setIsStoreOpen, toggleSidebar }) {
  return (
    <nav style={{
      background: "var(--nav-bg)", borderBottom: "1.5px solid var(--border)",
      padding: "0 2.5rem", height: 70, display: "flex", alignItems: "center",
      justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(10px)", 
    }}>
      
      {/* Left side: Hamburger Toggle + Shop Name */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button 
          onClick={toggleSidebar}
          style={{
            background: "var(--surface2)", border: "1.5px solid var(--border)",
            borderRadius: 8, padding: "8px", cursor: "pointer",
            color: "var(--text)", display: "flex", 
            alignItems: "center", justifyContent: "center", transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--surface2)"}
        >
          <Menu size={20} strokeWidth={2.5} />
        </button>

        <div style={{ 
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", 
          color: "var(--text)", letterSpacing: "-0.5px"
        }}>
          <Store size={26} color="var(--accent)" strokeWidth={2.5} />
          Vendor<span style={{ color: "var(--accent)" }}>Portal</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* Open/Close Toggle */}
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <span style={{ 
            fontWeight: 600, fontSize: "0.9rem", 
            color: isStoreOpen ? "var(--success)" : "var(--text3)", 
            transition: "color 0.3s" 
          }}>
            {isStoreOpen ? "Accepting Orders" : "Store Closed"}
          </span>
          <div style={{
            position: "relative", width: 50, height: 26, borderRadius: 30,
            background: isStoreOpen ? "var(--success)" : "var(--border)",
            transition: "background 0.3s"
          }}>
            <div style={{
              position: "absolute", top: 3, left: isStoreOpen ? 27 : 3,
              width: 20, height: 20, borderRadius: "50%", background: "#fff",
              transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }} />
          </div>
          <input 
            type="checkbox" 
            checked={isStoreOpen} 
            onChange={() => setIsStoreOpen(!isStoreOpen)} 
            style={{ display: "none" }} 
          />
        </label>

        <div style={{ width: 1, height: 24, background: "var(--border)" }} />

        {/* Theme Toggle - Premium Update */}
        <button onClick={onToggleTheme} style={{
          background: "var(--surface2)", border: "1.5px solid var(--border)",
          borderRadius: 99, padding: "8px 16px", cursor: "pointer",
          fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", 
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'DM Sans',sans-serif", 
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "var(--shadow2)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--surface)";
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--surface2)";
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        >
          {theme === "dark" ? (
            <>
              <Sun size={18} strokeWidth={2.5} color="var(--accent)" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} strokeWidth={2.5} color="var(--accent)" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}