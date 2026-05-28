import { useRef, useState } from "react"; 
import Autocomplete from "./Autocomplete"; 
import { Search, ArrowDownUp, ChevronDown } from "lucide-react"; 
import { useMediaQuery } from "../hooks/useMediaQuery"; // Imported responsive query monitor

export default function Toolbar({ menu, search, onSearch, sort, onSort }) {   
  const acRef = useRef(null);   
  const [isSelectHovered, setIsSelectHovered] = useState(false);   
  const isMobile = useMediaQuery("(max-width: 768px)"); // Tracks viewport dimensions dynamically

  return (     
    <div style={{ 
      display: "flex", 
      gap: 12, 
      width: "100%", 
      flexDirection: isMobile ? "column" : "row", // Dynamically stack nodes on mobile
      alignItems: "stretch" 
    }}>       
      {/* Search Bar Container */}       
      <div style={{ flex: 1, position: "relative" }} ref={acRef}>         
        <div style={{           
          position: "absolute", left: 16, top: "50%",           
          transform: "translateY(-50%)", color: "var(--text3)",           
          zIndex: 2, display: "flex", alignItems: "center", pointerEvents: "none"         
        }}>           
          <Search size={18} strokeWidth={2.5} />         
        </div>         
        <Autocomplete menu={menu} search={search} onSearch={onSearch} />       
      </div>       

      {/* Sort Selector Dropdown */}       
      <div          
        style={{ position: "relative", width: isMobile ? "100%" : "auto" }}         
        onMouseEnter={() => setIsSelectHovered(true)}         
        onMouseLeave={() => setIsSelectHovered(false)}       
      >         
        <div style={{           
          position: "absolute", left: 16, top: "50%",           
          transform: "translateY(-50%)",            
          color: isSelectHovered ? "var(--accent)" : "var(--text3)",           
          pointerEvents: "none", display: "flex", alignItems: "center",           
          transition: "color 0.2s ease"         
        }}>           
          <ArrowDownUp size={16} strokeWidth={2.5} />         
        </div>                  
        
        <select           
          value={sort}           
          onChange={(e) => onSort(e.target.value)}           
          style={{             
            appearance: "none",             
            background: "var(--surface)",              
            border: `1.5px solid ${isSelectHovered ? "var(--accent)" : "var(--border)"}`,             
            borderRadius: "12px",              
            padding: "12px 40px 12px 42px",             
            height: "48px",             
            width: "100%", // Inherit full width container sizes natively
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", fontWeight: 600,             
            color: "var(--text)", outline: "none", cursor: "pointer",             
            boxShadow: isSelectHovered ? "0 4px 16px var(--accent-glow)" : "var(--shadow2)",             
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"           
          }}         
        >           
          <option value="id">ID Reference</option>           
          <option value="name">Alphabetical</option>           
          <option value="price">Price Bracket</option>           
          <option value="quantity">Stock Units</option>         
        </select>                  
        
        <div style={{           
          position: "absolute", right: 14, top: "50%",           
          transform: "translateY(-50%)",            
          color: isSelectHovered ? "var(--accent)" : "var(--text3)",           
          pointerEvents: "none", display: "flex", alignItems: "center"         
        }}>           
          <ChevronDown size={16} strokeWidth={2.5} />         
        </div>       </div>     </div>   ); 
}