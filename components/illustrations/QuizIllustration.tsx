"use client";

export default function QuizIllustration() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl" style={{ background: "linear-gradient(145deg, #DA90EE 0%, #D580E8 30%, #E4A0F2 55%, #DDA0F0 80%, #D890EC 100%)" }}>
      {/* Soft white glows to match original */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse at 68% 18%, rgba(255,255,255,0.55) 0%, transparent 50%),
          radial-gradient(ellipse at 25% 75%, rgba(255,240,255,0.45) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)
        `,
      }} />

      {/* Main frosted card */}
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="relative w-[82%] max-w-[400px]" style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.7) 100%)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 40px rgba(180,120,200,0.12), 0 1px 2px rgba(180,120,200,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
          border: "1px solid rgba(255,255,255,0.6)",
          borderRadius: "16px",
          padding: "16px",
        }}>
          {/* Plugin row */}
          <div className="flex items-center gap-[6px] mb-3">
            {[
              { color: "#7C9DF0", shadow: "rgba(124,157,240,0.4)" },
              { color: "#EECE84", shadow: "rgba(238,206,132,0.4)" },
              { color: "#7ECBA1", shadow: "rgba(126,203,161,0.4)" },
              { color: "#E8A87C", shadow: "rgba(232,168,124,0.4)" },
              { color: "#C084FC", shadow: "rgba(192,132,252,0.4)" },
            ].map((p, i) => (
              <div key={i} className="w-[28px] h-[28px] rounded-full flex items-center justify-center" style={{
                background: `linear-gradient(135deg, ${p.color}18 0%, ${p.color}08 100%)`,
                border: `1px solid ${p.color}25`,
                boxShadow: `0 3px 10px ${p.shadow}`,
              }}>
                <div className="w-[10px] h-[10px] rounded-full" style={{ background: p.color, boxShadow: `0 2px 6px ${p.shadow}` }} />
              </div>
            ))}
          </div>

          {/* Answer options */}
          <div className="flex flex-col gap-[6px]">
            {[
              { active: false },
              { active: true },
              { active: false },
            ].map((opt, i) => (
              <div key={i} className="flex items-center gap-[8px] px-3 py-[8px] rounded-xl" style={{
                background: opt.active
                  ? "linear-gradient(135deg, rgba(238,206,132,0.1) 0%, rgba(238,206,132,0.04) 100%)"
                  : "rgba(255,255,255,0.5)",
                border: opt.active ? "1px solid rgba(238,206,132,0.25)" : "1px solid rgba(200,180,230,0.15)",
                boxShadow: "0 1px 4px rgba(150,120,180,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}>
                <div className="w-[14px] h-[14px] rounded-full shrink-0" style={{
                  background: opt.active ? "#EECE84" : "transparent",
                  border: opt.active ? "none" : "1.5px solid rgba(180,150,210,0.2)",
                  boxShadow: opt.active ? "0 2px 8px rgba(238,206,132,0.35)" : "none",
                }}>
                  {opt.active && (
                    <svg className="w-full h-full p-[2px]" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                <div className="h-[4px] rounded-full" style={{ width: `${65 + i * 10}%`, background: "rgba(150,120,190,0.1)" }} />
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-[4px]">
              {["#EF7B7B", "#EECE84", "#7ECBA1"].map((c, i) => (
                <div key={i} className="w-[6px] h-[6px] rounded-full" style={{ background: c, boxShadow: `0 1px 4px ${c}50` }} />
              ))}
            </div>
            <div className="flex gap-[6px]">
              {["<", ">"].map((arr, i) => (
                <div key={i} className="w-[26px] h-[18px] rounded-md flex items-center justify-center" style={{
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(200,180,230,0.2)",
                  boxShadow: "0 1px 4px rgba(150,120,180,0.04)",
                }}>
                  <span className="text-[8px] text-[#9070b0]/40 font-medium">{arr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
