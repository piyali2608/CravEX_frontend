import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ToastContainer from "./components/ToastContainer";

import Dashboard from "./pages/Dashboard";
import MenuManagement from "./pages/MenuManagement";
import OrderManagement from "./pages/OrderManagement";

import { useTheme } from "./hooks/useTheme";
import { useToast } from "./hooks/useToast";

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { toasts, show: showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  
  // Controls whether the sidebar is completely slid in or out
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "menu": return <MenuManagement showToast={showToast} />;
      case "orders": return <OrderManagement showToast={showToast} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", color: "var(--text)", transition: "all 0.3s", overflowX: "hidden" }}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Navbar 
          theme={theme} 
          onToggleTheme={toggleTheme} 
          isStoreOpen={isStoreOpen}
          setIsStoreOpen={setIsStoreOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main style={{ padding: "2.5rem 2rem", flex: 1, overflowY: "auto" }}>
          {renderPage()}
        </main>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}