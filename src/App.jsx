import { useState, useEffect } from "react"; 
import Sidebar from "./components/Sidebar"; 
import Dashboard from "./pages/Dashboard"; 
import MenuManagement from "./pages/MenuManagement"; 
import OrderManagement from "./pages/OrderManagement";  
import Analytics from "./pages/Analytics";            
import Reviews from "./pages/Reviews"; 
import ToastContainer from "./components/ToastContainer";
import { useTheme } from "./hooks/useTheme"; 
import { useMediaQuery } from "./hooks/useMediaQuery";  
import { useToast } from "./hooks/useToast";
import { 
  Sun, Moon, Menu, 
  LayoutDashboard, BarChart3, ReceiptText, Utensils, MessageSquare 
} from "lucide-react"; 

export default function App() {   
  const { theme, toggle: onToggleTheme } = useTheme();   
  const isMobile = useMediaQuery("(max-width: 768px)");   
  
  const [isCollapsed, setIsCollapsed] = useState(false);   
  const [isStoreOpen, setIsStoreOpen] = useState(true);   
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  const getTabFromHash = () => {     
    const cleanHash = window.location.hash.replace("#/", "");     
    const validTabs = ["dashboard", "menu", "orders", "analytics", "reviews"];     
    return validTabs.includes(cleanHash) ? cleanHash : "dashboard";   
  };   

  const [activeTab, setActiveTab] = useState(getTabFromHash);   

  useEffect(() => {     
    const handleHashChange = () => {       
      setActiveTab(getTabFromHash());     
    };     
    window.addEventListener("hashchange", handleHashChange);     
    if (!window.location.hash) {       
      window.location.hash = "#/dashboard";     
    }     
    return () => window.removeEventListener("hashchange", handleHashChange);   
  }, []);   

  const handleTabChange = (tabId) => {     
    window.location.hash = `#/${tabId}`;      
    setActiveTab(tabId);   
    if (isMobile) setIsCollapsed(true); 
  };   

  const renderContent = () => {     
    switch (activeTab) {       
      case "dashboard":         return <Dashboard />;       
      case "menu":         return <MenuManagement showToast={showToast} />;       
      case "orders":         return <OrderManagement showToast={showToast} />;       
      case "analytics":         return <Analytics />;       
      case "reviews":         return <Reviews />;       
      default:         return <Dashboard />;     
    }   
  };   

  const mobileNavItems = [
    { id: "dashboard", icon: <LayoutDashboard size={18} strokeWidth={2.2} />, label: "Home" },
    { id: "analytics", icon: <BarChart3 size={18} strokeWidth={2.2} />, label: "Reports" },
    { id: "orders", icon: <ReceiptText size={18} strokeWidth={2.2} />, label: "Orders" },
    { id: "menu", icon: <Utensils size={18} strokeWidth={2.2} />, label: "Menu" },
    { id: "reviews", icon: <MessageSquare size={18} strokeWidth={2.2} />, label: "Reviews" }
  ];

  return (     
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", width: "100%" }}>              
      
      {/* MOBILE TRIGGER HAMBURGER PANEL */}
      {isMobile && isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          style={{
            position: "fixed", top: "16px", left: "16px", display: "flex", alignItems: "center", justifyContent: "center",
            height: "36px", width: "36px", background: "var(--surface)", border: "1.5px solid var(--border)",
            borderRadius: "10px", cursor: "pointer", color: "var(--text)", boxShadow: "var(--shadow2)", zIndex: 105
          }}
        >
          <Menu size={18} strokeWidth={2.5} />
        </button>
      )}

      {/* Floating Theme Button */}       
      <button          
        onClick={onToggleTheme}          
        title={theme === "dark" ? "Switch to Light View" : "Switch to Dark View"}         
        style={{           
          position: "fixed", top: "16px", right: "20px", display: "flex", alignItems: "center", justifyContent: "center",           
          height: "34px", width: "34px", background: "color-mix(in srgb, var(--surface) 85%, transparent)",           
          backdropFilter: "blur(12px)", border: "1.5px solid var(--border)", borderRadius: "10px", cursor: "pointer",           
          color: "var(--accent)", boxShadow: "var(--shadow2)", zIndex: 100, transition: "all 0.15s ease"         
        }}         
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-1px)"; }}         
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}       
      >         
        {theme === "dark" ? <Sun size={15} strokeWidth={2.5} /> : <Moon size={15} strokeWidth={2.5} />}       
      </button>       

      {/* Navigation Controls Dock */}       
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isStoreOpen={isStoreOpen} setIsStoreOpen={setIsStoreOpen} />       

      {/* Primary Workspace Panel */}       
      <main style={{         
        flex: 1,         
        marginLeft: isMobile ? "0px" : (isCollapsed ? "80px" : "240px"),         
        padding: isMobile ? "16px" : "24px",         
        paddingTop: isMobile ? "72px" : "24px",         
        paddingRight: isMobile ? "16px" : "80px",          
        paddingBottom: isMobile ? "84px" : "24px", // Citation trace string removed cleanly here
        minWidth: 0,         
        transition: "margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1), padding-right 0.25s ease"       
      }}>         
        {renderContent()}       
      </main>     

      {/* PHONE APP BOTTOM NAV DOCK */}
      {isMobile && (
        <div 
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "color-mix(in srgb, var(--bg2) 94%, transparent)",
            backdropFilter: "blur(20px) saturate(160%)",
            borderTop: "1.5px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0 8px",
            boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)",
            zIndex: 1000
          }}
        >
          {mobileNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  gap: "3px",
                  flex: 1,
                  height: "100%",
                  padding: "4px 0",
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  color: isActive ? "var(--accent)" : "var(--text3)",
                  transform: isActive ? "translateY(-1px) scale(1.05)" : "translateY(0) scale(1)",
                  transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease"
                }}>
                  {item.icon}
                </div>
                
                <span style={{
                  fontSize: "0.64rem",
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: "'DM Sans', sans-serif",
                  color: isActive ? "var(--accent)" : "var(--text3)",
                  letterSpacing: "-0.01em",
                  transition: "color 0.15s ease"
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Live Active Notifications Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>   
  ); 
}