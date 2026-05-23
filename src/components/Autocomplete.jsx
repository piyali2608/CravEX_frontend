import { useState, useEffect } from "react";
import { highlight } from "../utils/helpers.jsx";
import { Utensils, SearchX } from "lucide-react";

export default function Autocomplete({ menu, search, onSearch }) {
  const [visible, setVisible] = useState(false);
  const [acIndex, setAcIndex] = useState(-1);
  const [inputVal, setInputVal] = useState(search);
  const [isFocused, setIsFocused] = useState(false);

  // Sync external search value into local input
  useEffect(() => { setInputVal(search); }, [search]);

  const matches = inputVal
    ? menu.filter(
        (d) =>
          d.name.toLowerCase().includes(inputVal.toLowerCase()) ||
          String(d.id).includes(inputVal)
      ).slice(0, 6)
    : menu.slice(0, 6);

  const select = (name) => {
    setInputVal(name);
    onSearch(name);
    setVisible(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!visible || !matches.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setAcIndex((i) => Math.min(i + 1, matches.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setAcIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && acIndex >= 0) {
        select(matches[acIndex].name);
      } else if (e.key === "Escape") {
        setVisible(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible, acIndex, matches]);

  return (
    <>
      <input
        type="text"
        value={inputVal}
        placeholder="Search dishes by name or ID..."
        onChange={(e) => {
          setInputVal(e.target.value);
          onSearch(e.target.value);
          setAcIndex(-1);
          setVisible(true);
        }}
        onFocus={() => { setVisible(true); setIsFocused(true); }}
        onBlur={() => { setTimeout(() => setVisible(false), 180); setIsFocused(false); }}
        style={{
          width: "100%", background: "var(--surface)",
          border: `1.5px solid ${isFocused ? "var(--accent)" : "var(--border)"}`, 
          borderRadius: 12,
          padding: "12px 16px 12px 48px",
          fontFamily: "'DM Sans',sans-serif", fontSize: "0.98rem", fontWeight: 500,
          color: "var(--text)", outline: "none",
          boxShadow: isFocused ? "0 0 0 4px var(--accent-glow)" : "var(--shadow2)",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      />

      {visible && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
          background: "var(--surface)", border: "1.5px solid var(--border)",
          borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.12)", zIndex: 150,
          overflow: "hidden", animation: "dropIn 0.15s cubic-bezier(.4,0,.2,1)",
        }}>
          <div style={{
            padding: "14px 18px 8px", fontSize: "0.75rem", fontWeight: 700,
            color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.8px",
          }}>
            {inputVal ? "Suggestions" : "Recent Dishes"}
          </div>

          {!matches.length ? (
            <div style={{ padding: "30px 16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <SearchX size={36} color="var(--text3)" opacity={0.6} strokeWidth={2} />
              <span style={{ fontSize: "0.95rem", color: "var(--text2)", fontWeight: 500 }}>
                No dishes match "<strong style={{ color: "var(--text)" }}>{inputVal}</strong>"
              </span>
            </div>
          ) : matches.map((d, i) => (
            <div
              key={d.id}
              onClick={() => select(d.name)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "12px 18px", cursor: "pointer",
                background: i === acIndex ? "var(--surface2)" : "transparent",
                borderLeft: i === acIndex ? "3px solid var(--accent)" : "3px solid transparent",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--surface2)";
                e.currentTarget.style.borderLeftColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = i === acIndex ? "var(--surface2)" : "transparent";
                e.currentTarget.style.borderLeftColor = i === acIndex ? "var(--accent)" : "transparent";
              }}
            >
              <div style={{
                width: 38, height: 38, background: "var(--bg)", 
                border: "1.5px solid var(--border)", borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                color: "var(--accent)"
              }}>
                <Utensils size={18} strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: "0.95rem", fontWeight: 600, color: "var(--text)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {highlight(d.name, inputVal)}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: 2, fontWeight: 500 }}>
                  ID #{d.id} <span style={{ opacity: 0.5, margin: "0 4px" }}>•</span> Qty: {d.quantity}
                </div>
              </div>
              <span style={{
                fontSize: "1rem", fontWeight: 800,
                color: "var(--accent)", fontFamily: "'Syne',sans-serif", flexShrink: 0,
              }}>
                ₹{d.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}