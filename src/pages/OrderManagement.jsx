import { useState } from "react";
import { 
  BellRing, ChefHat, CheckSquare, History, 
  Clock, Search, PackageSearch 
} from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const initialOrders = [
  { id: "CX-23-05-26-1", customer: "Piyali", items: "1x Paneer Butter Masala, 2x Garlic Naan", total: 190, status: "incoming", statusTimestamps: { incoming: new Date(Date.now() - 300000) } },
  { id: "CX-23-05-26-2", customer: "Aryan", items: "1x Veg Hakka Noodles", total: 150, status: "preparing", statusTimestamps: { incoming: new Date(Date.now() - 900000), preparing: new Date(Date.now() - 300000) } },
  { id: "CX-23-05-26-3", customer: "Deepak", items: "1x Chicken Biryani", total: 220, status: "ready", statusTimestamps: { incoming: new Date(Date.now() - 1500000), preparing: new Date(Date.now() - 900000), ready: new Date(Date.now() - 120000) } },
  { id: "CX-23-05-26-6", customer: "Arvind", items: "1x Veg Biryani", total: 180, status: "incoming", statusTimestamps: { incoming: new Date(Date.now() - 60000) } },
  { id: "CX-23-05-26-7", customer: "Shreeraj M.", items: "2x Butter Chicken, 2x Naan", total: 250, status: "preparing", statusTimestamps: { incoming: new Date(Date.now() - 1800000), preparing: new Date(Date.now() - 60000) } }
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
    showToast?.(`Order ${id} is now ${newStatus}`, "success");
  };

  const columns = [
    { id: "incoming", title: "Incoming", icon: <BellRing size={18} />, color: "#3b82f6" },
    { id: "preparing", title: "Preparing", icon: <ChefHat size={18} />, color: "#f59e0b" },
    { id: "ready", title: "Ready", icon: <CheckSquare size={18} />, color: "var(--success)" },
    { id: "history", title: "History", icon: <History size={18} />, color: "var(--text3)" }
  ];

  // GLOBAL SEARCH LOGIC
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || 
                          o.customer.toLowerCase().includes(search.toLowerCase());
    
    // If user is searching, show all matches regardless of tab
    if (search.length > 0) return matchesSearch;

    // If no search, filter by tab
    const isCompleted = o.status === "completed";
    if (activeTab === "history") return isCompleted;
    return o.status === activeTab;
  }).sort((a, b) => a.statusTimestamps.incoming - b.statusTimestamps.incoming);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem" }}>
          Order Management <span style={{ color: "var(--accent)" }}>Dashboard</span>
        </h1>
        <p style={{ color: "var(--text3)", fontSize: "1rem", fontWeight: 500 }}>
          {search ? `Found ${filteredOrders.length} results` : "Manage your kitchen workflow."}
        </p>
      </div>

      {/* Glowing Search */}
      <div style={{ marginBottom: "2.5rem", position: "relative", maxWidth: 500 }}>
        <div style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: isFocused ? "var(--accent)" : "var(--text3)", transition: "0.3s" }}>
          <Search size={20} strokeWidth={2.5} />
        </div>
        <input 
          placeholder="Search by ID or Customer..." 
          value={search} onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ 
            width: "100%", padding: "16px 20px 16px 52px", borderRadius: 16, 
            border: `1.5px solid ${isFocused ? "var(--accent)" : "transparent"}`, 
            background: "var(--surface)", color: "var(--text)", fontSize: "0.95rem", 
            outline: "none", boxShadow: isFocused ? "0 0 0 4px var(--accent-glow), var(--shadow)" : "var(--shadow)", 
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" 
          }}
        />
      </div>

      {/* Tabs - Hidden when searching for cleaner UI */}
      {search.length === 0 && (
        <div style={{ 
          display: "flex", gap: 8, marginBottom: "2rem", padding: "6px",
          background: "color-mix(in srgb, var(--surface) 90%, transparent)", 
          borderRadius: 18, border: "1px solid var(--border)",
          overflowX: "auto", width: "fit-content", maxWidth: "100%"
        }}>
          {columns.map(col => (
            <button
              key={col.id}
              onClick={() => setActiveTab(col.id)}
              style={{
                padding: isMobile ? "10px 16px" : "12px 24px", 
                borderRadius: 14, border: "none",
                background: activeTab === col.id ? col.color : "transparent",
                color: activeTab === col.id ? "#fff" : "var(--text3)",
                fontWeight: 800, fontSize: "0.9rem", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: activeTab === col.id ? `0 4px 12px ${col.color}40` : "none",
                transition: "all 0.3s ease", whiteSpace: "nowrap"
              }}
            >
              {col.icon} {col.title}
            </button>
          ))}
        </div>
      )}

      {/* Results Grid */}
      {filteredOrders.length > 0 ? (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(350px, 1fr))", 
          gap: 20 
        }}>
          {filteredOrders.map(order => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onUpdate={updateStatus} 
              isHistory={order.status === "completed"} 
              statusColor={columns.find(c => c.id === (order.status === "completed" ? "history" : order.status))?.color || "var(--accent)"} 
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text3)" }}>
          <PackageSearch size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <p>No orders found matching "{search}"</p>
        </div>
      )}
    </div>
  );
}

function OrderCard({ order, onUpdate, isHistory, statusColor }) {
  const arrivalTime = order.statusTimestamps.incoming.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <div style={{ 
      background: "var(--surface)", 
      border: `1.5px solid var(--border)`, 
      borderLeft: `6px solid ${statusColor}`,
      borderRadius: 20, padding: "24px", 
      boxShadow: "var(--shadow)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" 
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = statusColor; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: statusColor, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>{order.id}</span>
        <div style={{ fontSize: "0.75rem", color: "var(--text3)", fontWeight: 700, display: "flex", alignItems: "center", gap: 6, background: "var(--surface2)", padding: "4px 10px", borderRadius: 8 }}>
          <Clock size={12} /> {arrivalTime}
        </div>
      </div>
      
      <div style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 4 }}>{order.customer}</div>
      <div style={{ fontSize: "0.9rem", color: "var(--text2)", marginBottom: 20, lineHeight: 1.6 }}>{order.items}</div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 20 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.3rem" }}>₹{order.total}</span>
        {isHistory ? (
          <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--success)", background: "rgba(34, 197, 94, 0.1)", padding: "6px 14px", borderRadius: 10 }}>COMPLETED</span>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            {order.status === "incoming" && <ActionButton onClick={() => onUpdate(order.id, "preparing")} text="Prepare" color="var(--accent)" />}
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
      background: color, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 12, 
      fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" 
    }} onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "scale(1.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "scale(1)"; }}>
      {text}
    </button>
  );
}