import { useState } from "react";
import { LayoutDashboard, BarChart3, ReceiptText, Utensils, MessageSquare, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, isStoreOpen, setIsStoreOpen }) {
  const [isHoveredToggle, setIsHoveredToggle] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fully registered premium nav tracking collection
  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard size={16} strokeWidth={2.2} />, label: "Dashboard" },
    { id: "analytics", icon: <BarChart3 size={16} strokeWidth={2.2} />, label: "Analytics" },
    { id: "orders", icon: <ReceiptText size={16} strokeWidth={2.2} />, label: "Orders" },
    { id: "menu", icon: <Utensils size={16} strokeWidth={2.2} />, label: "Menu" },
    { id: "reviews", icon: <MessageSquare size={16} strokeWidth={2.2} />, label: "Reviews" }
  ];

  return (
    <aside style={{
      width: isCollapsed ? 76 : (isMobile ? 220 : 240),
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      background: "var(--bg2)",
      borderRight: "1.5px solid var(--border)",
      display: "flex", 
      flexDirection: "column", 
      padding: isCollapsed ? "1.5rem 0.5rem" : "1.5rem 1rem",
      boxShadow: "var(--shadow)", 
      zIndex: 110, 
      transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), padding 0.25s ease"
    }}>
      
      {/* Premium Vertically Centered Expand/Collapse Trigger matching image_7579a0.png */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        onMouseEnter={() => setIsHoveredToggle(true)}
        onMouseLeave={() => setIsHoveredToggle(false)}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "-12px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: "var(--surface)",
          border: `1.5px solid ${isHoveredToggle ? "var(--accent)" : "var(--border)"}`,
          boxShadow: "var(--shadow2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: isHoveredToggle ? "var(--accent)" : "var(--text2)",
          zIndex: 120,
          transition: "all 0.2s ease"
        }}
      >
        {isCollapsed ? <ChevronRight size={12} strokeWidth={2.5} /> : <ChevronLeft size={12} strokeWidth={2.5} />}
      </button>

      {/* Brand Header Group */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        alignItems: isCollapsed ? "center" : "flex-start",
        marginBottom: "2rem",
        gap: 12,
        paddingLeft: isCollapsed ? 0 : "6px"
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", 
          fontWeight: 800, 
          fontSize: isCollapsed ? "1rem" : "1.3rem",
          color: "var(--text)", 
          whiteSpace: "nowrap",
          letterSpacing: "-0.03em"
        }}>
          C{isCollapsed ? <span style={{ color: "var(--accent)" }}>X</span> : <>rav<span style={{ color: "var(--accent)" }}>EX</span></>}
        </div>

        {!isCollapsed ? (
          <div 
            onClick={() => setIsStoreOpen(!isStoreOpen)}
            style={{
              position: "relative",
              width: "86px", 
              height: "34px", 
              background: isStoreOpen ? "#76c73c" : "color-mix(in srgb, var(--text3) 40%, transparent)", 
              borderRadius: "999px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "3px",
              userSelect: "none",
              boxShadow: !isStoreOpen ? "inset 0 1px 4px rgba(0,0,0,0.2), 0 0 10px rgba(255,255,255,0.05)" : "none",
              transition: "background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            <span style={{
              position: "absolute",
              left: isStoreOpen ? "10px" : "auto",
              right: isStoreOpen ? "auto" : "10px",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: "800",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
              pointerEvents: "none"
            }}>
              {isStoreOpen ? "Open" : "Close"}
            </span>

            <div style={{
              position: "absolute",
              top: "3px",
              left: isStoreOpen ? "calc(100% - 31px)" : "3px",
              width: "28px",
              height: "28px",
              background: "#ffffff",
              borderRadius: "50%",
              boxShadow: !isStoreOpen 
                ? "0 0 10px #ffffff, 0 0 20px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0,0,0,0.2)" 
                : "0 2px 5px rgba(0,0,0,0.15)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
            }} />
          </div>
        ) : (
          /* Red Beacon Light Node toggles instantly when state marks store as Closed */
          <div style={{ 
            width: 8, 
            height: 8, 
            borderRadius: "50%", 
            background: isStoreOpen ? "#76c73c" : "#ef4444", 
            boxShadow: !isStoreOpen ? "0 0 10px #ef4444, 0 0 18px rgba(239, 68, 68, 0.8)" : "none",
            marginTop: 4,
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
          }} />
        )}
      </div>

      {/* Navigation Links Grid */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : ""}
              style={{
                display: "flex", 
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                gap: isCollapsed ? 0 : 12,
                width: "100%",
                padding: "10px 12px",
                height: "40px",
                border: "none", 
                borderRadius: "8px",
                background: isActive ? "var(--accent-glow)" : "transparent",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", 
                fontSize: "0.82rem", 
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--accent)" : "var(--text2)",
                transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "var(--surface2)";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text2)";
                }
              }}
            >
              {isActive && !isCollapsed && (
                <div style={{
                  position: "absolute",
                  left: 0,
                  top: "25%",
                  bottom: "25%",
                  width: "3px",
                  background: "var(--accent)",
                  borderRadius: "0 4px 4px 0"
                }} />
              )}

              <span style={{ display: "flex", alignItems: "center", transform: isActive ? "scale(1.04)" : "scale(1)", transition: "transform 0.2s ease" }}>
                {item.icon}
              </span>
              
              {!isCollapsed && (
                <span style={{ whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Tools Area */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {!isCollapsed ? (
          <button 
            title="Sign Out"
            style={{
              display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", height: "40px",
              border: "none", borderRadius: "8px", background: "transparent", color: "var(--danger)",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
              transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <LogOut size={15} strokeWidth={2.2} />
            <span style={{ whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>Sign Out</span>
          </button>
        ) : (
          <button 
            title="Sign Out"
            style={{
              width: "36px", height: "36px", borderRadius: "8px", background: "transparent", border: "none",
              color: "var(--danger)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              transition: "all 0.15s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <LogOut size={15} strokeWidth={2.2} />
          </button>
        )}
      </div>
    </aside>
  );
}