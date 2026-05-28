import { useState } from "react";
import { IndianRupee, Utensils, Activity } from "lucide-react"; 
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function Analytics() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [timeframe, setTimeframe] = useState("week");

  const weeklyMetrics = {
    revenue: "₹1,25,800",
    plates: "1,420 Plates",
    trend: [
      { day: "Mon", value: "15,000", x: 50, y: 160 },
      { day: "Wed", value: "32,000", x: 250, y: 110 }, 
      { day: "Fri", value: "24,500", x: 450, y: 130 }, 
      { day: "Sun", value: "54,000", x: 650, y: 40 }   
    ]
  };

  const monthlyMetrics = {
    revenue: "₹5,12,400",
    plates: "5,840 Plates",
    trend: [
      { day: "Week 1", value: "1,15,000", x: 50, y: 150 },
      { day: "Week 2", value: "1,32,000", x: 250, y: 80 },  
      { day: "Week 3", value: "1,24,500", x: 450, y: 110 }, 
      { day: "Week 4", value: "1,40,900", x: 650, y: 50 }   
    ]
  };

  const activeData = timeframe === "week" ? weeklyMetrics : monthlyMetrics;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
      
      {/* Upper Title and Timeframe Filter Header Bar */}
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row", 
        justifyContent: "space-between", 
        alignItems: isMobile ? "stretch" : "center", 
        gap: 16 
      }}>
        <div style={{ paddingLeft: "4px" }}>
          <h1 style={{ 
            fontFamily: "'Syne', sans-serif", 
            fontSize: isMobile ? "1.1rem" : "1.3rem", // Scaled down for mobile viewports
            fontWeight: 800, 
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            textShadow: "0 0 20px var(--accent-glow)"
          }}>
            Sales & <span style={{ color: "var(--accent)" }}>Reports</span>
          </h1>
          <p style={{ color: "var(--text3)", fontSize: "0.75rem", marginTop: 4 }}>
            Easy-to-understand calculations of your store's performance.
          </p>
        </div>

        {/* Premium Segmented Controls Dock Profile */}
        <div className="floating-glass" style={{ 
          display: "flex", 
          background: "var(--surface)", 
          padding: "4px", 
          borderRadius: "12px", 
          gap: 4,
          alignSelf: isMobile ? "flex-start" : "auto",
          height: "38px",
          alignItems: "center"
        }}>
          <button
            onClick={() => setTimeframe("week")}
            style={{
              border: "none",
              background: timeframe === "week" ? "var(--accent-glow)" : "transparent",
              color: timeframe === "week" ? "var(--accent)" : "var(--text3)",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe("month")}
            style={{
              border: "none",
              background: timeframe === "month" ? "var(--accent-glow)" : "transparent",
              color: timeframe === "month" ? "var(--accent)" : "var(--text3)",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Aggregate Scorecard Dashboard Row */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "1rem", width: "100%" }}>
        
        {/* Revenue Metric Block */}
        <div className="floating-glass" style={{ 
          flex: 1, background: "var(--surface)", borderRadius: "16px", padding: isMobile ? "14px 16px" : "20px", display: "flex", alignItems: "center", gap: 16 
        }}>
          <div style={{ 
            width: 42, height: 42, borderRadius: "12px", 
            background: "var(--surface2)", border: "1.5px solid var(--border)", 
            display: "flex", alignItems: "center", justifyContent: "center", 
            color: "var(--accent)", boxShadow: "0 4px 12px var(--accent-glow)",
            flexShrink: 0
          }}>
            <IndianRupee size={18} strokeWidth={2.5} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span style={{ color: "var(--text3)", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Money Earned
            </span>
            <span style={{ 
              fontSize: isMobile ? "1.25rem" : "1.5rem", // Dynamically resized to avoid horizontal overflow text clipping
              fontWeight: 800, 
              fontFamily: "'Syne', sans-serif", 
              color: "var(--text)", 
              marginTop: 2,
              whiteSpace: "nowrap"
            }}>
              {activeData.revenue}
            </span>
          </div>
        </div>

        {/* Volume Metric Block */}
        <div className="floating-glass" style={{ 
          flex: 1, background: "var(--surface)", borderRadius: "16px", padding: isMobile ? "14px 16px" : "20px", display: "flex", alignItems: "center", gap: 16 
        }}>
          <div style={{ 
            width: 42, height: 42, borderRadius: "12px", 
            background: "var(--surface2)", border: "1.5px solid var(--border)", 
            display: "flex", alignItems: "center", justifyContent: "center", 
            color: "var(--accent)", flexShrink: 0
          }}>
            <Utensils size={18} strokeWidth={2.2} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span style={{ color: "var(--text3)", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Total Dishes Prepared
            </span>
            <span style={{ 
              fontSize: isMobile ? "1.25rem" : "1.5rem", // Dynamically resized to avoid horizontal overflow text clipping
              fontWeight: 800, 
              fontFamily: "'Syne', sans-serif", 
              color: "var(--text)", 
              marginTop: 2,
              whiteSpace: "nowrap"
            }}>
              {activeData.plates}
            </span>
          </div>
        </div>

      </div>

      {/* Primary Analytics Chart Element Area */}
      <div className="floating-glass" style={{ 
        background: "var(--surface)", borderRadius: "20px", padding: isMobile ? "16px" : "24px", width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem"
      }}>
        {/* Fixed Header Layout: Switches direction on mobile viewports to prevent overlapping badges */}
        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          justifyContent: "space-between", 
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 12 : 0
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", boxShadow: "0 0 10px var(--success)" }} />
            <span style={{ 
              fontFamily: "'Syne', sans-serif", 
              fontWeight: 800, 
              fontSize: isMobile ? "0.85rem" : "0.95rem", 
              textTransform: "uppercase" 
            }}>
              Income Vector Trend
            </span>
          </div>
          <div style={{ 
            display: "flex", alignItems: "center", gap: 6, background: "var(--surface2)", padding: "4px 10px", borderRadius: "6px", color: "var(--text2)", fontSize: "0.7rem", fontWeight: 700, border: "1px solid var(--border)"
          }}>
            <Activity size={12} />
            <span>Conditional Deltas Active</span>
          </div>
        </div>

        {/* Vector SVG Graphical Grid Matrix Chart Engine */}
        <div style={{ width: "100%", overflowX: "auto", position: "relative" }}>
          <svg 
            viewBox="0 0 700 220" 
            style={{ width: "100%", minWidth: "600px", height: "auto", overflow: "visible" }}
          >
            {/* Horizontal Gridlines */}
            <line x1="40" y1="50" x2="660" y2="50" stroke="var(--border)" strokeDasharray="4 4" strokeWidth={1} style={{ opacity: 0.4 }} />
            <line x1="40" y1="110" x2="660" y2="110" stroke="var(--border)" strokeDasharray="4 4" strokeWidth={1} style={{ opacity: 0.4 }} />
            <line x1="40" y1="160" x2="660" y2="160" stroke="var(--border)" strokeDasharray="4 4" strokeWidth={1} style={{ opacity: 0.4 }} />

            {/* SEGMENT LOOP GENERATOR */}
            {activeData.trend.slice(0, -1).map((point, index) => {
              const nextPoint = activeData.trend[index + 1];
              const isDown = nextPoint.y > point.y; 
              
              const strokeColor = isDown ? "var(--danger)" : "var(--success)";
              const areaGradientId = `segmentGlow-${index}-${timeframe}`;
              
              return (
                <g key={index}>
                  <defs>
                    <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity="0.18" />
                      <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d={`M ${point.x} 200 L ${point.x} ${point.y} L ${nextPoint.x} ${nextPoint.y} L ${nextPoint.x} 200 Z`}
                    fill={`url(#${areaGradientId})`}
                    style={{ transition: "all 0.3s ease" }}
                  />

                  <line
                    x1={point.x}
                    y1={point.y}
                    x2={nextPoint.x}
                    y2={nextPoint.y}
                    stroke={strokeColor}
                    strokeWidth={3.5}
                    strokeLinecap="round"
                    style={{ transition: "all 0.3s ease" }}
                    filter={`drop-shadow(0 2px 6px ${isDown ? "rgba(239,68,68,0.25)" : "rgba(16,185,129,0.25)"})`}
                  />
                </g>
              );
            })}

            {/* Static Node Center Anchors, Label Cards, and Day Tags Overlay */}
            {activeData.trend.map((point, index) => {
              const prevPoint = index > 0 ? activeData.trend[index - 1] : null;
              const nodeIsDown = prevPoint ? point.y > prevPoint.y : false;
              const markerColor = nodeIsDown ? "var(--danger)" : "var(--success)";

              return (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={4.5}
                    fill="var(--bg2)"
                    stroke={markerColor}
                    strokeWidth={2.5}
                    style={{ transition: "all 0.3s ease" }}
                  />

                  <g transform={`translate(${point.x - 28}, ${point.y - 22})`}>
                    <rect
                      width={56}
                      height={16}
                      rx={4}
                      fill="var(--bg2)"
                      stroke="var(--border)"
                      strokeWidth={1}
                      style={{ boxShadow: "var(--shadow)" }}
                    />
                    <text
                      x={28}
                      y={11}
                      textAnchor="middle"
                      fill="var(--text)"
                      fontSize="0.65rem"
                      fontWeight={800}
                      fontFamily="monospace"
                    >
                      ₹{point.value}
                    </text>
                  </g>

                  <text
                    x={point.x}
                    y={210}
                    textAnchor="middle"
                    fill="var(--text3)"
                    fontSize="0.75rem"
                    fontWeight={700}
                  >
                    {point.day}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

    </div>
  );
}