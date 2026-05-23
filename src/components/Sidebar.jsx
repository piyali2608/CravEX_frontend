import { LayoutDashboard, ReceiptText, Utensils, LogOut, X } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard size={22} strokeWidth={2.5} />, label: "Dashboard" },
    { id: "orders", icon: <ReceiptText size={22} strokeWidth={2.5} />, label: "Orders" },
    { id: "menu", icon: <Utensils size={22} strokeWidth={2.5} />, label: "Menu" }
  ];

  return (
    <aside style={{
      width: 260,
      marginLeft: isOpen ? 0 : -260,
      background: "var(--surface)", borderRight: "1.5px solid var(--border)",
      display: "flex", flexDirection: "column", 
      padding: "1.5rem 1rem",
      boxShadow: "var(--shadow)", zIndex: 110, 
      transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    }}>
      {/* Header & Close Button */}
      <div style={{ 
        display: "flex", alignItems: "center", 
        justifyContent: "space-between",
        marginBottom: "3rem", padding: "0 10px"
      }}>
        <div style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.6rem",
          color: "var(--text)", whiteSpace: "nowrap"
        }}>
          Crav<span style={{ color: "var(--accent)" }}>EX</span>
        </div>
        
        <button 
          onClick={() => setIsOpen(false)}
          title="Close Sidebar"
          style={{
            background: "var(--surface2)", border: "1.5px solid var(--border)",
            borderRadius: 8, padding: "6px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text2)", transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--surface2)"}
        >
          <X size={18} strokeWidth={3} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: 12, 
              padding: "12px 16px",
              border: "none", borderRadius: 12, cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 600,
              background: activeTab === item.id ? "var(--accent-glow)" : "transparent",
              color: activeTab === item.id ? "var(--accent)" : "var(--text2)",
              transition: "all 0.2s"
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
            <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button 
        style={{
          display: "flex", alignItems: "center", gap: 12, 
          padding: "12px 16px",
          border: "none", borderRadius: 12, cursor: "pointer", background: "transparent",
          color: "var(--danger)", fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
          transition: "background 0.2s"
        }} 
        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(220,38,38,0.1)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
      >
        <LogOut size={22} strokeWidth={2.5} />
        <span style={{ whiteSpace: "nowrap" }}>Logout</span>
      </button>
    </aside>
  );
}