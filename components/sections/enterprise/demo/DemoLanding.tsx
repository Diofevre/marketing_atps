"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeInUpVariants, fadeInUpDelayedVariants } from "@/lib/motion";
import { Camera, MonitorPlay, Shield, Loader2 } from "lucide-react";

interface DemoLandingProps {
  email: string;
  error: string | null;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onStart: () => void;
}

export default function DemoLanding({ email, error, loading, onEmailChange, onStart }: DemoLandingProps) {
  const t = useTranslations("enterpriseDemo");

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-[20px] border-2 border-dashed border-[#d37bff]/30 bg-gradient-to-br from-[#d37bff]/5 to-[#80a9fc]/5 p-8 lg:p-12 flex flex-col items-center justify-center gap-6"
    >
      {/* Animated icons */}
      <div className="flex items-center gap-5">
        {[Camera, MonitorPlay, Shield].map((Icon, i) => (
          <motion.div
            key={i}
            className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-[#1b0c25]/5 flex items-center justify-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          >
            <Icon className="w-6 h-6 text-[#d37bff]" />
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeInUpDelayedVariants} className="text-center max-w-[440px]">
        <h3 className="text-[18px] font-medium text-[#1b0c25] mb-2">{t("title")}</h3>
        <p className="text-[14px] leading-[22px] text-[#1b0c25]/50">{t("description")}</p>
      </motion.div>

      {/* Lite version notice */}
      <div className="w-full max-w-[440px] rounded-[12px] bg-amber-50 border border-amber-200/60 px-4 py-3">
        <p className="text-[12px] leading-[18px] text-amber-700">
          {t("liteNotice")}
        </p>
      </div>

      {/* Email + start */}
      <div className="w-full max-w-[380px] flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="your@email.com"
          className="w-full h-12 px-4 rounded-[8px] border border-[#1b0c25]/10 bg-white text-[15px] text-[#1b0c25] placeholder:text-[#1b0c25]/30 focus:outline-none focus:ring-2 focus:ring-[#d37bff]/30 focus:border-[#d37bff] transition-all"
          onKeyDown={(e) => e.key === "Enter" && !loading && onStart()}
          disabled={loading}
        />
        <p className="text-[11px] text-[#1b0c25]/40 leading-[16px] -mt-1">
          {t("emailNotice")}
        </p>
        <Button
          onClick={onStart}
          disabled={!email || loading}
          className="h-12 w-full bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[15px] font-medium text-white disabled:opacity-40"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Camera className="w-5 h-5 mr-2" />
              {t("startButton")}
            </>
          )}
        </Button>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[13px] text-red-500 text-center"
        >
          {error}
        </motion.p>
      )}

      {/* What to expect */}
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {["5 min", "10 questions", "AI monitoring"].map((label) => (
          <span
            key={label}
            className="px-3 py-1 rounded-full bg-[#1b0c25]/5 text-[11px] font-medium text-[#1b0c25]/50 uppercase tracking-wider"
          >
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
