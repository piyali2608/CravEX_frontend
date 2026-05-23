import { useState, useEffect } from "react";
import { LIGHT_VARS, DARK_VARS, GLOBAL_CSS } from "../utils/theme";

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const vars = theme === "dark" ? DARK_VARS : LIGHT_VARS;
    const style = document.createElement("style");
    style.id = "vm-theme";
    style.textContent = `${GLOBAL_CSS} :root { ${vars} }`;
    const existing = document.getElementById("vm-theme");
    if (existing) existing.remove();
    document.head.appendChild(style);
    return () => style.remove();
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggle };
}
