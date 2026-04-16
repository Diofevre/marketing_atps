"use client";

export default function DictionaryIllustration() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg, #8B7DBF 0%, #9688C8 25%, #A89AD4 50%, #B8ABD8 75%, #C5BADE 100%)" }}>
      {/* Soft light glow */}
      <div className="absolute w-[300px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", right: "-50px", top: "-50px" }} />
      <div className="absolute w-[250px] h-[250px] rounded-full" style={{ background: "radial-gradient(circle, rgba(230,200,255,0.15) 0%, transparent 70%)", left: "10%", bottom: "-30px" }} />

      {/* Background offset card */}
      <div className="absolute" style={{
        top: "18%", left: "14%", width: "68%", height: "70%",
        background: "rgba(255,255,255,0.12)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 4px 20px rgba(80,60,140,0.1)",
      }} />

      {/* Main frosted card */}
      <div className="absolute flex flex-col" style={{
        top: "12%", left: "8%", width: "72%", height: "76%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 100%)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 10px 40px rgba(80,60,140,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
        padding: "14px",
      }}>
        {/* 3D viewer area */}
        <div className="flex-1 rounded-xl mb-2 flex items-center justify-center relative" style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}>
          {/* Abstract 3D shape */}
          <div className="relative">
            <div className="w-[40px] h-[40px] rounded-xl" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%)",
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow: "0 8px 24px rgba(80,60,140,0.15), 0 2px 6px rgba(80,60,140,0.1)",
              transform: "rotate(15deg)",
            }} />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[30px] h-[4px] rounded-full" style={{ background: "rgba(0,0,0,0.08)", filter: "blur(2px)" }} />
          </div>
          {/* 3D badge */}
          <div className="absolute top-[6px] left-[6px] px-[6px] py-[2px] rounded-md" style={{
            background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.2)",
          }}>
            <div className="flex items-center gap-[3px]">
              <div className="w-[5px] h-[5px] rounded-sm" style={{ background: "rgba(255,255,255,0.35)" }} />
              <div className="w-[16px] h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-[4px] mb-2">
          {[
            { bg: "rgba(255,255,255,0.2)", borderC: "rgba(255,255,255,0.3)" },
            { bg: "rgba(238,206,132,0.15)", borderC: "rgba(255,255,255,0.2)" },
            { bg: "rgba(124,157,240,0.15)", borderC: "rgba(255,255,255,0.2)" },
          ].map((t, i) => (
            <div key={i} className="w-[24px] h-[18px] rounded" style={{
              background: t.bg, border: i === 0 ? `1.5px solid ${t.borderC}` : `1px solid ${t.borderC}`,
            }} />
          ))}
        </div>

        {/* Term lines */}
        <div className="flex flex-col gap-[4px]">
          <div className="h-[5px] w-[40%] rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} />
          <div className="h-[3px] w-[90%] rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
          <div className="h-[3px] w-[70%] rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Category pills */}
        <div className="flex gap-[4px] mt-2">
          {["#7C9DF0", "#7ECBA1", "#C084FC"].map((c, i) => (
            <div key={i} className="flex items-center gap-[3px] px-[6px] py-[2px] rounded-full" style={{
              background: `${c}20`, border: `1px solid ${c}30`,
            }}>
              <div className="w-[4px] h-[4px] rounded-full" style={{ background: c }} />
              <div className="w-[14px] h-[3px] rounded-full" style={{ background: `${c}20` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
