import { useState } from "react";
import { 
  BellRing, ChefHat, CheckSquare, History, 
  Clock, Search 
} from "lucide-react";

// Mock orders for now FIFO pipeine
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

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem" }}>
          Order Management <span style={{ color: "var(--accent)" }}>Dashboard</span>
        </h1>
        <p style={{ color: "var(--text3)", fontSize: "1rem", fontWeight: 500 }}>
          Manage your orders - Mark for prepare and handover.
        </p>
      </div>

      <div style={{ marginBottom: "2rem", position: "relative", maxWidth: 450 }}>
        <Search style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} size={20} />
        <input 
          placeholder="Search by Order ID or Customer Name..." 
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "14px 16px 14px 48px", borderRadius: 14, border: "1.5px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontSize: "0.95rem", outline: "none", boxShadow: "var(--shadow)" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignItems: "start" }}>
        {columns.map(col => (
          <div key={col.id} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontWeight: 800, color: col.color, borderBottom: `2px solid ${col.color}` }}>
              {col.icon} {col.title}
            </div>
            {orders
              .filter(o => 
                 (col.id === "history" ? o.status === "completed" : o.status === col.id) &&
                 (o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
              )
              // STRICT FIFO SORT: Orders arrived earliest are always top
              .sort((a, b) => a.statusTimestamps.incoming - b.statusTimestamps.incoming)
              .map(order => (
                <OrderCard key={order.id} order={order} onUpdate={updateStatus} isHistory={col.id === "history"} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order, onUpdate, isHistory }) {
  // Always display the 'Incoming' time so the queue feels consistent
  const arrivalTime = order.statusTimestamps.incoming.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <div style={{ 
      background: "color-mix(in srgb, var(--surface) 80%, transparent)", 
      backdropFilter: "blur(10px)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "20px", 
      boxShadow: "var(--shadow)", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default" 
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "var(--accent)", fontSize: "0.9rem" }}>{order.id}</span>
        <span style={{ fontSize: "0.75rem", color: "var(--text3)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          <Clock size={12} /> {arrivalTime}
        </span>
      </div>
      
      <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>{order.customer}</div>
      <div style={{ fontSize: "0.85rem", color: "var(--text2)", marginBottom: 16, lineHeight: 1.5 }}>{order.items}</div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 16 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem" }}>₹{order.total}</span>
        {isHistory ? (
          <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--success)", background: "rgba(34, 197, 94, 0.1)", padding: "4px 10px", borderRadius: 8 }}>COMPLETED</span>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
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
      background: color, color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, 
      fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "filter 0.2s" 
    }} onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(1.1)"} onMouseLeave={(e) => e.currentTarget.style.filter = "brightness(1)"}>
      {text}
    </button>
  );
}