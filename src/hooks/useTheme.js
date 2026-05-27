import { useState, useEffect } from "react";
import { LIGHT_VARS, DARK_VARS, GLOBAL_CSS } from "../utils/theme";

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // 1. Inject the crisp theme styling variables dynamically
    const vars = theme === "dark" ? DARK_VARS : LIGHT_VARS;
    const style = document.createElement("style");
    style.id = "vm-theme";
    style.textContent = `${GLOBAL_CSS} :root { ${vars} }`;
    
    const existing = document.getElementById("vm-theme");
    if (existing) existing.remove();
    document.head.appendChild(style);
    
    // NOTE: All favicon hijacking code has been completely removed from here.
    // This allows your real file path in index.html to load perfectly!

    return () => style.remove();
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  
  return { theme, toggle };
}