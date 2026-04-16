"use client";

export default function SharingIllustration() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl" style={{ background: "linear-gradient(160deg, #7B6DAA 0%, #8A7CBB 30%, #9E90CC 60%, #B0A3D5 80%, #BEB2DC 100%)" }}>
      {/* Soft light glows */}
      <div className="absolute w-[300px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", left: "-60px", bottom: "-60px" }} />
      <div className="absolute w-[200px] h-[200px] rounded-full" style={{ background: "radial-gradient(circle, rgba(230,210,255,0.12) 0%, transparent 70%)", right: "10%", top: "-30px" }} />

      {/* Background offset card */}
      <div className="absolute" style={{
        top: "16%", left: "10%", width: "75%", height: "72%",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "16px", border: "1px solid rgba(255,255,255,0.18)",
      }} />
      {/* Second offset card */}
      <div className="absolute" style={{
        top: "20%", right: "6%", width: "30%", height: "55%",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)",
      }} />

      {/* Main frosted card */}
      <div className="absolute flex flex-col" style={{
        top: "10%", left: "5%", width: "62%", height: "80%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 100%)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 10px 40px rgba(80,60,140,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
        padding: "14px",
      }}>
        {/* Window dots */}
        <div className="flex gap-[4px] mb-3">
          <div className="w-[6px] h-[6px] rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
          <div className="w-[6px] h-[6px] rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
          <div className="w-[6px] h-[6px] rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
        </div>

        {/* Room code */}
        <div className="flex justify-center gap-[4px] mb-3">
          {["A", "X", "7", "K", "2", "P"].map((c, i) => (
            <div key={i} className="w-[20px] h-[24px] rounded-md flex items-center justify-center" style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 2px 6px rgba(80,60,140,0.08)",
            }}>
              <span className="text-[9px] font-bold" style={{ color: "rgba(255,255,255,0.7)" }}>{c}</span>
            </div>
          ))}
        </div>

        {/* Participant avatars */}
        <div className="flex justify-center gap-[6px] mb-3">
          {["#7C9DF0", "#E87CA0", "#7ECBA1", "#C084FC", "#E8A87C", "#5BC0C0"].map((c, i) => (
            <div key={i} className="w-[18px] h-[18px] rounded-full" style={{
              background: c, boxShadow: `0 3px 8px ${c}30`,
            }} />
          ))}
        </div>

        {/* Podium hint */}
        <div className="flex items-end justify-center gap-[8px] mt-auto">
          <div className="flex flex-col items-center">
            <div className="w-[14px] h-[14px] rounded-full mb-[3px]" style={{ background: "#E87CA0", boxShadow: "0 2px 6px rgba(232,124,160,0.4)" }} />
            <div className="w-[24px] h-[14px] rounded-t-sm" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
          <div className="flex flex-col items-center -mt-2">
            <div className="w-[18px] h-[18px] rounded-full mb-[3px]" style={{
              background: "#7C9DF0", border: "2px solid #EECE84",
              boxShadow: "0 3px 10px rgba(238,206,132,0.35)",
            }} />
            <div className="w-[28px] h-[20px] rounded-t-sm" style={{ background: "rgba(238,206,132,0.12)" }} />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[14px] h-[14px] rounded-full mb-[3px]" style={{ background: "#7ECBA1", boxShadow: "0 2px 6px rgba(126,203,161,0.4)" }} />
            <div className="w-[24px] h-[10px] rounded-t-sm" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
        </div>
      </div>

      {/* Live indicator floating */}
      <div className="absolute top-[12%] right-[8%] flex items-center gap-[4px] px-[8px] py-[4px] rounded-full" style={{
        background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 2px 8px rgba(80,60,140,0.1)",
      }}>
        <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#F97316", boxShadow: "0 0 6px rgba(249,115,22,0.4)" }} />
        <div className="w-[16px] h-[3px] rounded-full" style={{ background: "rgba(249,115,22,0.2)" }} />
      </div>
    </div>
  );
}
