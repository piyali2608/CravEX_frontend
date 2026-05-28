import { useState, useEffect } from "react";
import { ShoppingBag, IndianRupee, Clock, CalendarDays, Zap } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const sketchPattern = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23f97316' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round' opacity='0.02'%3E%3Cpath d='M10 20h20v15H10zM15 15h10v5H15zM45 25c5 0 8 4 8 8s-3 8-8 8-8-4-8-8 3-8 8-8zM80 20l15 15M95 20L80 35M15 70c0-6 4-10 10-10s10 4 10 10v15H15V70zM50 75h20v10H50zM90 70h15v15H90z'/%3E%3C/g%3E%3C/svg%3E`;

export default function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [liveDateTime, setLiveDateTime] = useState(new Date());
  const [activeNode, setActiveNode] = useState(4); // Friday highlighted by default

  useEffect(() => {
    const systemsTicker = setInterval(() => setLiveDateTime(new Date()), 1000);
    return () => clearInterval(systemsTicker);
  }, []);

  const stats = [
    { label: "Revenue", value: "₹8,450", trend: "+14%", icon: <IndianRupee size={12} color="var(--accent)" />, glowColor: "var(--accent-glow)" },
    { label: "Orders", value: "42 Bills", trend: "Steady", icon: <ShoppingBag size={12} color="var(--accent)" />, glowColor: "var(--accent-glow)" },
    { label: "Cooking", value: "5 Live", trend: "Active", icon: <Clock size={12} color="#10b981" />, glowColor: "rgba(16,185,129,0.2)" }
  ];

  const points = [
    { day: "Mon", count: "28", x: 30, y: 125 },
    { day: "Tue", count: "21", x: 100, y: 135 },
    { day: "Wed", count: "44", x: 170, y: 85 },
    { day: "Thu", count: "31", x: 240, y: 105 },
    { day: "Fri", count: "58", x: 310, y: 35 },  // Peak traffic vector
    { day: "Sat", count: "38", x: 380, y: 75 },
    { day: "Sun", count: "64", x: 450, y: 20 }   
  ];

  const pathString = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100%", boxSizing: "border-box" }}>
      
      {/* Environmental Deep Luminescence Emitters */}
      <div className="animated-sketch-layer" style={{ position: "absolute", top: -100, left: -100, right: -100, bottom: -100, backgroundImage: `url("${sketchPattern}")`, backgroundRepeat: "repeat", pointerEvents: "none", zIndex: 0 }} />
      <div className="animated-glow-orb-1" style={{ position: "absolute", top: "-15%", left: "45%", width: isMobile ? "220px" : "500px", height: isMobile ? "220px" : "500px", background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0, filter: "blur(60px)" }} />
      
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
        
        {/* Header Ribbon Section */}
        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          justifyContent: "space-between", 
          alignItems: isMobile ? "stretch" : "center", 
          gap: 12,
          paddingBottom: "0.25rem"
        }}>
          <div>
            <h1 style={{ 
              fontFamily: "'Syne', sans-serif", 
              fontSize: isMobile ? "1.2rem" : "1.5rem", 
              fontWeight: 800, 
              color: "var(--text)", 
              letterSpacing: "-0.03em",
              textShadow: "0 0 20px rgba(16,185,129,0.1)"
            }}>
              WELCOME <span style={{ color: "var(--accent)" }}>VENDOR</span>
            </h1>
          </div>
          
          {/* Integrated Timer Box */}
          <div className="floating-glass" style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 10, 
            background: "var(--surface)", 
            padding: "6px 12px", 
            borderRadius: "10px",
            alignSelf: isMobile ? "flex-start" : "auto"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, borderRight: "1.5px solid var(--border)", paddingRight: 10 }}>
              <CalendarDays size={13} color="var(--accent)" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text2)", whiteSpace: "nowrap" }}>
                {liveDateTime.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={13} color="var(--accent)" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text)", fontFamily: "monospace", letterSpacing: "0.5px" }}>
                {liveDateTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
              </span>
            </div>
          </div>
        </div>

        {/* Minimal High-Density Metric Grid Tiles */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10, width: "100%" }}>
          {stats.map((stat, i) => (
            <div key={i} className="floating-glass" style={{ 
              flex: 1, background: "var(--surface)", borderRadius: "12px", padding: "12px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
                <div style={{ 
                  width: 28, height: 28, borderRadius: "8px", 
                  background: "var(--surface2)", border: "1.5px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 12px ${stat.glowColor}`, flexShrink: 0
                }}>
                  {stat.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                  <span style={{ color: "var(--text3)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{stat.label}</span>
                  <span style={{ fontSize: "1.15rem", fontWeight: 800, fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap" }}>{stat.value}</span>
                </div>
              </div>
              <span style={{ 
                fontSize: "0.68rem", fontWeight: 800, padding: "3px 8px", borderRadius: "6px",
                background: stat.trend.startsWith("+") ? "rgba(16,185,129,0.12)" : "var(--surface2)",
                color: stat.trend.startsWith("+") ? "var(--success)" : "var(--text3)",
                border: stat.trend.startsWith("+") ? "1px solid rgba(16,185,129,0.2)" : "1px solid var(--border)",
                whiteSpace: "nowrap", flexShrink: 0
              }}>{stat.trend}</span>
            </div>
          ))}
        </div>

        {/* Holographic Line Graph Container */}
        <div className="floating-glass" style={{ 
          background: "var(--surface)", 
          borderRadius: "18px", 
          padding: "20px 20px 12px 20px", 
          position: "relative",
          width: "100%",
          boxSizing: "border-box"
        }}>
          {/* Header Indicators */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "-0.01em" }}>
                Weekly Traffic Index
              </h3>
            </div>
            
            <div style={{ 
              display: "flex", alignItems: "center", gap: 5, background: "rgba(16,185,129,0.06)", 
              padding: "4px 10px", borderRadius: "8px", border: "1px solid rgba(16,185,129,0.2)"
            }}>
              <Zap size={11} color="#10b981" fill="#10b981" stroke="none" />
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#10b981", textTransform: "uppercase" }}>Live Stream</span>
            </div>
          </div>

          {/* Core SVG Workspace Stage */}
          <div style={{ position: "relative", width: "100%", height: "auto" }}>
            <svg 
              viewBox="0 0 480 165" 
              width="100%" 
              height="100%" 
              style={{ overflow: "visible", display: "block" }}
            >
              <defs>
                <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" /> 
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <linearGradient id="cyber-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.22)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0.0)" />
                </linearGradient>

                <marker id="cyber-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
              </defs>

              {/* Horizontal Blueprint Guide Grid Lines */}
              {[32, 64, 96, 128].map((gridY, i) => (
                <line key={i} x1="15" y1={gridY} x2="465" y2={gridY} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
              ))}

              {/* Vertical Guide Pins & Day Labels Mapping */}
              {points.map((p, i) => {
                const isActive = activeNode === i;
                return (
                  <g key={i} cursor="pointer" onClick={() => setActiveNode(i)}>
                    <line 
                      x1={p.x} 
                      y1="140" 
                      x2={p.x} 
                      y2={p.y} 
                      stroke={isActive ? "#10b981" : "var(--border)"} 
                      strokeWidth={isActive ? "1.5" : "1"} 
                      opacity={isActive ? "0.7" : "0.3"}
                      style={{ transition: "all 0.2s ease" }}
                    />
                    
                    {/* FIXED: Scalable internal day tags matching the ratio of the view bounds */}
                    <text
                      x={p.x}
                      y="156"
                      textAnchor="middle"
                      fill={isActive ? "#10b981" : "var(--text3)"}
                      fontSize="9.5"
                      fontWeight={isActive ? "800" : "600"}
                      style={{ 
                        transition: "all 0.15s ease", 
                        fontFamily: "'DM Sans', sans-serif",
                        textShadow: isActive ? "0 0 6px rgba(16,185,129,0.3)" : "none"
                      }}
                    >
                      {p.day}
                    </text>
                  </g>
                );
              })}

              {/* Dynamic Shading Gradient Fill Area */}
              <path 
                d={`${pathString} L ${points[points.length - 1].x} 140 L ${points[0].x} 140 Z`} 
                fill="url(#cyber-fill)" 
              />

              {/* Glowing Laser Green Path */}
              <path 
                d={pathString} 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="2.5" 
                filter="url(#laser-glow)"
                markerEnd="url(#cyber-arrow)"
                style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
              />

              {/* Target Data Anchor Vertices */}
              {points.map((p, i) => {
                const isActive = activeNode === i;
                return (
                  <g key={i} cursor="pointer" onClick={() => setActiveNode(i)}>
                    <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
                    <circle 
                      cx={p.x} 
                      cy={p.y} 
                      r={isActive ? "6" : "4"} 
                      fill="#10b981" 
                      opacity={isActive ? "1" : "0.6"}
                      style={{ transition: "all 0.15s ease" }}
                      filter={isActive ? "url(#laser-glow)" : "none"}
                    />
                    <circle cx={p.x} cy={p.y} r="2" fill="#ffffff" opacity={isActive ? "1" : "0.5"} />

                    {/* FIXED: Tooltip popup drawn natively into SVG vectors to completely isolate space metrics */}
                    {isActive && (
                      <g transform={`translate(${p.x}, ${p.y - 12})`}>
                        <rect
                          x="-26"
                          y="-16"
                          width="52"
                          height="16"
                          rx="4"
                          fill="var(--bg2)"
                          stroke="#10b981"
                          strokeWidth="1.2"
                        />
                        <text
                          x="0"
                          y="-5"
                          textAnchor="middle"
                          fill="#10b981"
                          fontSize="8.5"
                          fontWeight="800"
                          fontFamily="monospace"
                        >
                          {p.count} B
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}