// src/components/Layout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar"; // Your existing sidebar
import { Menu, X } from "lucide-react";

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar: Hides on small screens, shows as overlay */}
      <div style={{ 
        width: 260, flexShrink: 0,
        position: window.innerWidth < 1024 ? "fixed" : "static",
        left: isSidebarOpen ? 0 : -260,
        zIndex: 1000, height: "100vh", background: "white", 
        borderRight: "1px solid var(--border)", transition: "0.3s"
      }}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", width: "100%", overflowX: "hidden" }}>
        {/* Hamburger Button for Mobile */}
        {window.innerWidth < 1024 && (
          <button style={{ marginBottom: "20px", border: "none", background: "none" }} onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
        {children}
      </div>
    </div>
  );
}