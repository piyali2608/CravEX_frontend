import { useState } from "react";
import { Star, Heart, AlertCircle, ChevronDown } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function Reviews() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);

  const feedbackData = [
    { id: 1, reference: "CX-26-05-1", user: "Pritam Das", rating: 5, comment: "The Paneer Butter Masala was legendary! Super rich gravy and soft paneer. Delivered piping hot to the hostel gate.", dish: "Paneer Butter Masala", date: "Today" },
    { id: 2, reference: "CX-26-05-2", user: "Ananya Roy", rating: 4, comment: "Chicken Biryani taste is excellent, fragrant long-grain rice. Could use slightly more raita next time.", dish: "Chicken Biryani", date: "Yesterday" },
    { id: 3, reference: "CX-26-05-3", user: "Rohan Malhotra", rating: 5, comment: "Garlic Naan is perfect—crispy on the outside, incredibly buttery. My absolute go-to midnight snack combo.", dish: "Garlic Naan", date: "2 days ago" },
    { id: 4, reference: "CX-26-05-4", user: "Siddharth Sharma", rating: 3, comment: "Veg Hakka Noodles tasted okay, but it was lukewarm when it arrived. Packaging could be better sealed.", dish: "Veg Hakka Noodles", date: "3 days ago" },
    { id: 5, reference: "CX-26-05-5", user: "Kriti Verma", rating: 2, comment: "Ordered Masala Dosa but received regular Dosa without any masala filling. Disappointed with the mix-up.", dish: "Masala Dosa", date: "4 days ago" },
    { id: 6, reference: "CX-26-05-6", user: "Arjun Mehta", rating: 1, comment: "Extremely delayed delivery. The food was cold and completely unappetizing. Will not order this dish again.", dish: "Chicken Biryani", date: "1 week ago" }
  ];

  const filterOptions = [
    { id: "all", label: "All Ratings", hasStar: false },
    { id: "5", label: "5 Stars", hasStar: true },
    { id: "4", label: "4 Stars", hasStar: true },
    { id: "3", label: "3 Stars", hasStar: true },
    { id: "2", label: "2 Stars", hasStar: true },
    { id: "1", label: "1 Star", hasStar: true }
  ];

  const filteredReviews = feedbackData.filter(r => ratingFilter === "all" || r.rating === Number(ratingFilter));
  const currentSelectionLabel = filterOptions.find(o => o.id === ratingFilter)?.label || "All Ratings";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      
      {/* Title & Controller Ribbon */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.3rem", fontWeight: 800, textShadow: "0 0 20px var(--accent-glow)" }}>
            USER <span style={{ color: "var(--accent)" }}>FEEDBACK</span>
          </h1>
          <p style={{ color: "var(--text3)", fontSize: "0.75rem", marginTop: 2 }}>Analyze customer sentiments, ratings, and dish reviews.</p>
        </div>

        {/* Global Controls Dropdown Anchor Box Area */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", alignSelf: isMobile ? "flex-start" : "auto" }}>
          
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
              className="floating-glass"
              style={{
                border: "none",
                background: "var(--surface)",
                padding: "8px 16px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                transition: "all 0.2s ease",
                height: "37px"
              }}
            >
              <Star size={14} fill={ratingFilter !== "all" ? "var(--accent)" : "var(--text3)"} stroke="none" style={{ marginTop: "-1px" }} />
              <span style={{ 
                fontFamily: "'DM Sans', sans-serif", 
                fontWeight: 700, 
                fontSize: "0.85rem", 
                color: "var(--text)",
                letterSpacing: "-0.01em"
              }}>
                {currentSelectionLabel}
              </span>
              <ChevronDown size={14} style={{ color: "var(--text3)", marginLeft: 4, transform: isRatingDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
            </button>

            {/* Premium Glass Layer Dropdown Choices Matrix Menu */}
            {isRatingDropdownOpen && (
              <div className="floating-glass" style={{
                position: "absolute", top: "44px", right: 0, width: "160px",
                background: "var(--bg2)", borderRadius: "10px", padding: "4px",
                zIndex: 15, display: "flex", flexDirection: "column", gap: 2,
                boxShadow: "var(--shadow)"
              }}>
                {filterOptions.map((opt) => {
                  const isOptionActive = ratingFilter === opt.id;
                  return (
                    <button 
                      key={opt.id}
                      onClick={() => { setRatingFilter(opt.id); setIsRatingDropdownOpen(false); }}
                      style={{ 
                        border: "none", 
                        background: isOptionActive ? "var(--accent-glow)" : "transparent", 
                        color: isOptionActive ? "var(--accent)" : "var(--text2)", 
                        padding: "8px 12px", 
                        borderRadius: "6px", 
                        fontSize: "0.78rem", 
                        fontWeight: 700, 
                        textAlign: "left", 
                        cursor: "pointer", 
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.1s ease"
                      }}
                      onMouseEnter={(e) => { if(!isOptionActive) e.currentTarget.style.background = "var(--surface2)"; }}
                      onMouseLeave={(e) => { if(!isOptionActive) e.currentTarget.style.background = "transparent"; }}
                    >
                      <span>{opt.label}</span>
                      {opt.hasStar && <Star size={10} fill={isOptionActive ? "var(--accent)" : "var(--text3)"} stroke="none" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Analytics Aggregate Scoreboard Tiles - Clean Single layout configuration */}
      <div style={{ display: "flex", width: "100%" }}>
        <div className="floating-glass" style={{ width: isMobile ? "100%" : "280px", background: "var(--surface)", borderRadius: "12px", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "8px", background: "var(--surface2)", border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "#eab308", boxShadow: "0 0 10px rgba(234,179,8,0.15)" }}><Star size={13} fill="currentColor" /></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "var(--text3)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase" }}>Average Rating</span>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>4.2 / 5.0</span>
          </div>
        </div>
      </div>

      {/* Floating Review Stream Feed List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="floating-glass" style={{ background: "var(--surface)", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: 8 }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>{rev.user}</span>
                    <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text3)", background: "var(--surface2)", padding: "2px 6px", borderRadius: "4px", fontWeight: 700, border: "1px solid var(--border)" }}>
                      {rev.reference}
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: "0.72rem", 
                    color: rev.rating <= 2 ? "var(--danger)" : "var(--accent)", 
                    background: rev.rating <= 2 ? "rgba(239,68,68,0.08)" : "var(--accent-glow)", 
                    padding: "1px 6px", borderRadius: "4px", width: "fit-content", marginTop: 4, fontWeight: 600
                  }}>
                    Verified Order: {rev.dish}
                  </span>
                </div>
                
                {/* RIGHT SIDE META CONTAINER: Houses both Helpful Vote and Star Ratings directly side-by-side */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "nowrap" }}>
                  
                  {/* Helpful Student Vote Indicator Badge */}
                  <div style={{ display: "flex", gap: 4, alignItems: "center", color: "var(--text3)", fontSize: "0.7rem", fontWeight: 700, background: "var(--surface2)", padding: "4px 8px", borderRadius: "6px", border: "1px solid var(--border)" }}>
                    <Heart size={10} color="var(--danger)" fill={rev.rating >= 4 ? "var(--danger)" : "none"} />
                    <span style={{ whiteSpace: "nowrap" }}>Helpful Student Vote</span>
                  </div>

                  {/* Star Elements Grid */}
                  <div style={{ 
                    display: "flex", 
                    gap: 2, 
                    color: rev.rating <= 2 ? "var(--text3)" : "#eab308", 
                    filter: rev.rating > 2 ? "drop-shadow(0 0 4px rgba(234,179,8,0.3))" : "none" 
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < rev.rating ? (rev.rating <= 2 ? "var(--danger)" : "currentColor") : "none"} stroke={i < rev.rating ? (rev.rating <= 2 ? "var(--danger)" : "currentColor") : "currentColor"} />
                    ))}
                  </div>

                </div>
              </div>

              <p style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.5, padding: "4px 0", fontWeight: 500 }}>
                "{rev.comment}"
              </p>

              {/* Card Bottom Row: Only displays timestamp info cleanly now */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 8, marginTop: 2 }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text3)", fontWeight: 600 }}>{rev.date}</span>
              </div>

            </div>
          ))
        ) : (
          <div className="floating-glass" style={{ background: "var(--surface)", borderRadius: "14px", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "var(--text3)" }}>
            <AlertCircle size={28} style={{ opacity: 0.4 }} />
            <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>No reviews match this star tier yet</span>
          </div>
        )}
      </div>

    </div>
  );
}