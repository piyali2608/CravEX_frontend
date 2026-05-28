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
import { Sun, Moon, Menu } from "lucide-react"; // Imported Menu icon for mobile toggle

export default function App() {   
  const { theme, toggle: onToggleTheme } = useTheme();   
  const isMobile = useMediaQuery("(max-width: 768px)");   
  
  // Automatically start collapsed (hidden) if the user is on a mobile device
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
    if (isMobile) setIsCollapsed(true); // Auto-close drawer on link click if on phone
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

  return (     
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", width: "100%" }}>              
      
      {/* MOBILE TRIGGER HAMBURGER PANEL: Only mounts when viewed on phones */}
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

      {/* MOBILE RESPONSIVE WORKSPACE WRAPPER */}       
      <main style={{         
        flex: 1,         
        // Set left margin to 0px on mobile viewports so content expands correctly
        marginLeft: isMobile ? "0px" : (isCollapsed ? "80px" : "240px"),         
        padding: isMobile ? "16px" : "24px",         
        paddingTop: isMobile ? "72px" : "24px", // Extra upper clearance room on phones for menu buttons
        paddingRight: isMobile ? "16px" : "80px",          
        minWidth: 0,         
        transition: "margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1), padding 0.25s ease"       
      }}>         
        {renderContent()}       
      </main>     

      {/* Live Active Notifications Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>   
  ); 
}