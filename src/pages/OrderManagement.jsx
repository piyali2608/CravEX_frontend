import { useState } from "react";
import { BellRing, ChefHat, CheckSquare, History, Clock, Search, PackageSearch } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const initialOrders = [
  { id: "CX-26-05-1", customer: "Piyali Barman", items: "1x Paneer Butter Masala, 2x Garlic Naan", total: 190, status: "incoming", statusTimestamps: { incoming: new Date(Date.now() - 300000) } },
  { id: "CX-26-05-2", customer: "Aryan", items: "1x Veg Hakka Noodles", total: 150, status: "preparing", statusTimestamps: { incoming: new Date(Date.now() - 900000), preparing: new Date(Date.now() - 300000) } },
  { id: "CX-26-05-3", customer: "Deepak", items: "1x Chicken Biryani", total: 220, status: "ready", statusTimestamps: { incoming: new Date(Date.now() - 1500000), preparing: new Date(Date.now() - 900000), ready: new Date(Date.now() - 120000) } },
  { id: "CX-26-05-4", customer: "Shreeraj M", items: "1x Kadhai Paneer, 2x Butter Roti", total: 240, status: "incoming", statusTimestamps: { incoming: new Date(Date.now() - 60000) } }
];

export default function OrderManagement({ showToast }) {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeTab, setActiveTab] = useState("incoming");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const updateStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { 
      ...o, 
      status: newStatus,
      statusTimestamps: { ...o.statusTimestamps, [newStatus]: new Date() } 
    } : o));
    showToast?.(`Order ${id} advanced to ${newStatus}`, "success");
  };

  const columns = [
    { id: "incoming", title: "Incoming", icon: <BellRing size={13} />, color: "#3b82f6" },
    { id: "preparing", title: "Preparing", icon: <ChefHat size={13} />, color: "var(--accent)" },
    { id: "ready", title: "Ready", icon: <CheckSquare size={13} />, color: "var(--success)" },
    { id: "history", title: "History", icon: <History size={13} />, color: "var(--text3)" }
  ];

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || 
                          o.customer.toLowerCase().includes(search.toLowerCase());
    if (search.length > 0) return matchesSearch;
    return activeTab === "history" ? o.status === "completed" : o.status === activeTab;
  }).sort((a, b) => a.statusTimestamps.incoming - b.statusTimestamps.incoming);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "1rem" }}>
      
      {/* Title Header */}
      <div style={{ paddingLeft: "4px" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.3rem", fontWeight: 800, textShadow: "0 0 20px var(--accent-glow)" }}>
          ORDER <span style={{ color: "var(--accent)" }}>LIVE STREAM</span>
        </h1>
      </div>

      {/* Control Header Container */}
      <div className="floating-glass" style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "space-between",
        gap: 12,
        background: "var(--surface)",
        padding: "10px 12px",
        borderRadius: "14px",
        width: "100%",
        boxSizing: "border-box"
      }}>
        {/* Search Field */}
        <div style={{ position: "relative", flex: 1, minWidth: isMobile ? "100%" : "180px" }}>
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: isFocused ? "var(--accent)" : "var(--text3)", display: "flex", alignItems: "center" }}>
            <Search size={15} strokeWidth={2.5} />
          </div>
          <input 
            placeholder="Search active orders..." 
            value={search} onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="dish-input"
            style={{ paddingLeft: "38px", height: "36px" }}
          />
        </div>

        {/* Swipeable Tabs */}
        {search.length === 0 && (
          <div style={{ 
            display: "flex", gap: 2, padding: "2px",
            background: "var(--input-bg)", borderRadius: "10px", border: "1.5px solid var(--border)",
            overflowX: "auto", WebkitOverflowScrolling: "touch",
            width: isMobile ? "100%" : "auto"
          }} className="hide-scrollbar">
            {columns.map(col => {
              const isSelected = activeTab === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => setActiveTab(col.id)}
                  style={{
                    padding: isMobile ? "6px 12px" : "6px 14px", borderRadius: "7px", border: "none",
                    background: isSelected ? col.color : "transparent",
                    color: isSelected ? "#fff" : "var(--text3)",
                    fontWeight: 700, fontSize: "0.76rem", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                    boxShadow: isSelected ? `0 2px 8px ${col.color}40` : "none",
                    transition: "all 0.15s ease", whiteSpace: "nowrap",
                    flex: isMobile ? 1 : "auto", justifyContent: "center"
                  }}
                >
                  {col.icon} {col.title}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid Manifest Cards Display */}
      {filteredOrders.length > 0 ? (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", 
          gap: 12, 
          width: "100%" 
        }}>
          {filteredOrders.map(order => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onUpdate={updateStatus}
              isHistory={order.status === "completed"}
              isMobile={isMobile}
              statusColor={columns.find(c => c.id === (order.status === "completed" ? "history" : order.status))?.color || "var(--accent)"}
            />
          ))}
        </div>
      ) : (
        <div className="floating-glass" style={{ background: "var(--surface)", borderRadius: "14px", padding: "3rem 0", textAlign: "center", color: "var(--text3)" }}>
          <PackageSearch size={32} style={{ marginBottom: "0.5rem", opacity: 0.4 }} />
          <p style={{ fontSize: "0.82rem", fontWeight: 700 }}>No matching orders found</p>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function OrderCard({ order, onUpdate, isHistory, statusColor, isMobile }) {
  const arrivalTime = order.statusTimestamps.incoming.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  return (
    <div className="floating-glass" style={{ 
      background: "var(--surface)", 
      borderLeft: `5px solid ${statusColor} !important`,
      borderRadius: "12px", 
      padding: isMobile ? "14px" : "16px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: statusColor, fontSize: "0.78rem" }}>{order.id}</span>
        <div style={{ fontSize: "0.72rem", color: "var(--text3)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4, background: "var(--surface2)", padding: "3px 8px", borderRadius: 6 }}>
          <Clock size={11} /> {arrivalTime}
        </div>
      </div>
      
      <div style={{ fontWeight: 800, fontSize: isMobile ? "0.95rem" : "1rem", marginBottom: 2, color: "var(--text)" }}>{order.customer}</div>
      <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginBottom: 14, lineHeight: 1.4, fontWeight: 500 }}>{order.items}</div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1.5px solid var(--border)", paddingTop: 10, flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>₹{order.total}</span>
        {isHistory ? (
          <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--success)", background: "rgba(16, 185, 129, 0.1)", padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(16, 185, 129, 0.2)" }}>FULFILLED</span>
        ) : (
          <div style={{ display: "flex", gap: 6 }}>
            {order.status === "incoming" && <ActionButton onClick={() => onUpdate(order.id, "preparing")} text="Accept" color="var(--accent)" />}
            {order.status === "preparing" && <ActionButton onClick={() => onUpdate(order.id, "ready")} text="Ready" color="var(--accent)" />}
            {order.status === "ready" && <ActionButton onClick={() => onUpdate(order.id, "completed")} text="Handover" color="var(--success)" />}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ onClick, text, color }) {
  return (
    <button onClick={onClick} style={{ 
      background: color, color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px",
      fontSize: "0.74rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      transition: "transform 0.1s ease"
    }}
    onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.96)"}
    onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      {text}
    </button>
  );
}