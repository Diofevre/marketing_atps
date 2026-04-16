"use client";

export default function LibraryIllustration() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl" style={{ background: "linear-gradient(150deg, #8878B5 0%, #9485BF 30%, #A898C8 60%, #BCA8CC 80%, #C8A8C0 100%)" }}>
      {/* Warm glow hints */}
      <div className="absolute w-[250px] h-[250px] rounded-full" style={{ background: "radial-gradient(circle, rgba(232,180,160,0.12) 0%, transparent 70%)", right: "-40px", bottom: "-40px" }} />
      <div className="absolute w-[200px] h-[200px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", left: "-20px", top: "-20px" }} />

      {/* Background offset card */}
      <div className="absolute" style={{
        top: "15%", left: "12%", width: "70%", height: "72%",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "16px", border: "1px solid rgba(255,255,255,0.18)",
      }} />

      {/* Main frosted card */}
      <div className="absolute flex flex-col" style={{
        top: "8%", left: "6%", width: "75%", height: "82%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 100%)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 10px 40px rgba(80,60,140,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
        padding: "14px",
      }}>
        {/* Search bar */}
        <div className="flex items-center gap-[6px] px-[10px] py-[6px] rounded-xl mb-3" style={{
          background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 1px 4px rgba(80,60,140,0.06)",
        }}>
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><circle cx="5" cy="5" r="3.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/><path d="M7.5 7.5L10 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <div className="h-[3px] w-[60%] rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Book grid */}
        <div className="grid grid-cols-3 gap-[6px] flex-1">
          {[
            { bg: "linear-gradient(135deg, #fce8e8 0%, #f8d8d8 100%)", border: "#f0c0c0", badge: "#E87C7C" },
            { bg: "linear-gradient(135deg, #faf0e0 0%, #f5e8d0 100%)", border: "#eed8b8", badge: "#EECE84", spine: true },
            { bg: "linear-gradient(135deg, #e8f0fc 0%, #d8e4f8 100%)", border: "#c8d8f0", badge: "#7C9DF0" },
            { bg: "linear-gradient(135deg, #f0e8fc 0%, #e4d8f8 100%)", border: "#d8c8f0", badge: "#C084FC" },
            { bg: "linear-gradient(135deg, #fce8e8 0%, #f8d8d8 100%)", border: "#f0c0c0", badge: "#E87C7C" },
            { bg: "linear-gradient(135deg, #faf0e0 0%, #f5e8d0 100%)", border: "#eed8b8", badge: "#EECE84", spine: true },
          ].map((book, i) => (
            <div key={i} className="rounded-lg relative overflow-hidden" style={{
              background: book.bg, border: `1px solid ${book.border}40`,
              aspectRatio: "3/4",
              boxShadow: "0 2px 8px rgba(120,100,150,0.04)",
            }}>
              {book.spine && <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: book.badge, opacity: 0.5 }} />}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                <div className="w-[14px] h-[14px] rounded-md mb-1" style={{ background: `${book.badge}25`, border: `1px solid ${book.badge}35` }} />
                <div className="h-[3px] w-[70%] rounded-full" style={{ background: `rgba(255,255,255,0.12)` }} />
              </div>
              <div className="absolute bottom-[3px] right-[3px] w-[6px] h-[6px] rounded-sm" style={{ background: book.badge, boxShadow: `0 1px 4px ${book.badge}30` }} />
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div className="flex gap-[4px] mt-2">
          <div className="px-[6px] py-[2px] rounded-full text-[6px] font-medium" style={{
            background: "rgba(255,255,255,0.35)", color: "white",
          }}>All</div>
          {["#E87C7C", "#EECE84", "#7C9DF0"].map((c, i) => (
            <div key={i} className="w-[14px] h-[14px] rounded-full" style={{
              background: `${c}20`, border: `1px solid ${c}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div className="w-[4px] h-[4px] rounded-full" style={{ background: c }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
