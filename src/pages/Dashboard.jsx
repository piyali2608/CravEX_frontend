import { useState, useEffect } from "react";
import { CalendarDays, ShoppingBag, IndianRupee, Clock } from "lucide-react";

// WhatsApp-style repeating food & cafe doodle pattern - LIGHTER VARIANT
const doodlePattern = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23f97316' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' opacity='0.15'%3E%3Cg transform='translate(20, 20) rotate(15)'%3E%3Cpath d='M4 6h12v6a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V6zm12 2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2'/%3E%3Cpath d='M8 2v2M12 2v2'/%3E%3C/g%3E%3Cg transform='translate(100, 30) rotate(-10) scale(0.8)'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/g%3E%3Cg transform='translate(40, 90) rotate(-20) scale(0.9)'%3E%3Cpath d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7'/%3E%3C/g%3E%3Cg transform='translate(110, 100) rotate(10) scale(0.8)'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M8 14s1.5 2 4 2 4-2 4-2'/%3E%3Ccircle cx='9' cy='9' r='1' fill='%23f97316'/%3E%3Ccircle cx='15' cy='9' r='1' fill='%23f97316'/%3E%3C/g%3E%3Cg transform='translate(80, 60) rotate(45) scale(0.8)'%3E%3Cpath d='M2 10l10 12 10-12A14 14 0 0 0 2 10z'/%3E%3Cpath d='M12 10v.01M9 14v.01M15 14v.01'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update the date & time every second for real-time accuracy
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });


  // hard coded for now 
  const stats = [
    { 
      label: "Today's Orders", 
      value: "42", 
      icon: <ShoppingBag size={24} strokeWidth={2.5} color="var(--accent)" />,
      bgGlow: "var(--accent-glow)"
    },
    { 
      label: "Revenue", 
      value: "₹8,450", 
      icon: <IndianRupee size={24} strokeWidth={2.5} color="var(--success)" />,
      bgGlow: "rgba(34, 197, 94, 0.15)"
    },
    { 
      label: "Pending Orders", 
      value: "5", 
      icon: <Clock size={24} strokeWidth={2.5} color="#3b82f6" />,
      bgGlow: "rgba(59, 130, 246, 0.15)"
    }
  ];

  return (
    <div style={{ position: "relative", minHeight: "100%", paddingBottom: "2rem" }}>
      
      {/* Absolute WhatsApp Doodle Background Layer */}
      <div style={{
        position: "absolute",
        top: -40, left: -32, right: -32, bottom: -40, 
        backgroundImage: `url("${doodlePattern}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "160px",
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: "none" 
      }} />

      {/* Main Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: "2.5rem", display: "flex", flexDirection: "column", gap: 16 }}>
          <h1 style={{ 
            fontFamily: "'Syne',sans-serif", 
            fontSize: "2.6rem", 
            fontWeight: 800, 
            color: "var(--text)",
            lineHeight: 1.1
          }}>
            Welcome back, <br />
            <span style={{ color: "var(--accent)" }}>Vendor</span>
          </h1>
          
          {/* Badges Container */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            
            {/* Real-time Date Badge */}
            <div style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 10,
              background: "color-mix(in srgb, var(--surface) 85%, transparent)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid var(--border)",
              padding: "8px 16px", 
              borderRadius: 12,
              boxShadow: "var(--shadow2)",
              width: "fit-content"
            }}>
              <CalendarDays size={18} strokeWidth={2.5} color="var(--accent)" />
              <span style={{ 
                fontSize: "0.95rem", 
                fontWeight: 700, 
                color: "var(--text2)",
                letterSpacing: "0.3px",
                fontFamily: "'DM Sans', sans-serif"
              }}>
                {formattedDate}
              </span>
            </div>

            {/* Real-time Clock Badge */}
            <div style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 10,
              background: "color-mix(in srgb, var(--surface) 85%, transparent)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid var(--border)",
              padding: "8px 16px", 
              borderRadius: 12,
              boxShadow: "var(--shadow2)",
              width: "fit-content"
            }}>
              <Clock size={18} strokeWidth={2.5} color="var(--accent)" />
              <span style={{ 
                fontSize: "0.95rem", 
                fontWeight: 700, 
                color: "var(--text2)",
                letterSpacing: "0.3px",
                fontFamily: "'DM Sans', sans-serif",
                fontVariantNumeric: "tabular-nums"
              }}>
                {formattedTime}
              </span>
            </div>

          </div>
        </div>

        {/* Analytics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {stats.map((stat, i) => (
            <div 
              key={i} 
              style={{
                background: "color-mix(in srgb, var(--surface) 85%, transparent)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1.5px solid color-mix(in srgb, var(--border) 60%, transparent)",
                borderRadius: 20, 
                padding: "24px", 
                display: "flex", 
                flexDirection: "column", 
                gap: 20,
                boxShadow: "var(--shadow)",
                transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow)";
              }}
            >
              {/* Top Row: Label & Icon */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ 
                  color: "var(--text3)", 
                  fontSize: "0.95rem", 
                  fontWeight: 700, 
                  textTransform: "uppercase", 
                  letterSpacing: "0.5px",
                  marginTop: 4
                }}>
                  {stat.label}
                </div>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: stat.bgGlow,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {stat.icon}
                </div>
              </div>

              {/* Bottom Row: Value */}
              <div>
                <div style={{ 
                  fontSize: "2.8rem", 
                  fontWeight: 800, 
                  fontFamily: "'Syne',sans-serif", 
                  color: "var(--text)", 
                  lineHeight: 1,
                }}>
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}