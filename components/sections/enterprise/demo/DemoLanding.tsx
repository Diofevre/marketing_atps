"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Camera, Shield, Clock, BookOpen, Loader2, Info } from "lucide-react";

interface DemoLandingProps {
  email: string;
  error: string | null;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onStart: () => void;
}

export default function DemoLanding({ email, error, loading, onEmailChange, onStart }: DemoLandingProps) {
  const t = useTranslations("enterpriseDemo");

  const FEATURES = [
    { icon: Clock, label: "5 min" },
    { icon: BookOpen, label: "10 questions" },
    { icon: Camera, label: "AI monitoring" },
    { icon: Shield, label: t("featureSecurity") },
  ];

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl border border-[#1b0c25]/8 shadow-[0_4px_40px_rgba(0,0,0,0.06)] overflow-hidden"
    >
      {/* Left — Info panel */}
      <div className="flex flex-col justify-between gap-8 p-8 lg:p-12 bg-[#1b0c25]">
        {/* Top */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-[13px] font-medium text-white/60 uppercase tracking-widest">
              Procteo™ Demo
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl lg:text-[30px] font-medium leading-tight text-white">
              {t("title")}
            </h2>
            <p className="text-[14px] leading-[22px] text-white/50">
              {t("description")}
            </p>
          </div>

          {/* Feature list */}
          <div className="flex flex-col gap-3 mt-2">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-white/8 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#d37bff]" />
                </div>
                <span className="text-[13px] text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — lite notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/8">
          <Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
          <p className="text-[12px] leading-[18px] text-white/40">
            {t("liteNotice")}
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col justify-center gap-8 p-8 lg:p-12">
        <div className="flex flex-col gap-1">
          <h3 className="text-[20px] font-medium text-[#1b0c25]">
            {t("formTitle")}
          </h3>
          <p className="text-[14px] text-[#1b0c25]/50">
            {t("formSubtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[12px] font-medium text-[#1b0c25]/60 uppercase tracking-wider">
            {t("emailLabel")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="your@email.com"
            className="w-full h-12 px-4 rounded-xl border border-[#1b0c25]/10 bg-[#f8f8fa] text-[15px] text-[#1b0c25] placeholder:text-[#1b0c25]/25 focus:outline-none focus:ring-2 focus:ring-[#d37bff]/30 focus:border-[#d37bff] transition-all"
            onKeyDown={(e) => e.key === "Enter" && !loading && onStart()}
            disabled={loading}
          />
          <p className="text-[11px] text-[#1b0c25]/35 leading-[16px]">
            {t("emailNotice")}
          </p>
        </div>

        <Button
          onClick={onStart}
          disabled={!email || loading}
          className="h-12 w-full bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-xl text-[14px] font-medium text-white disabled:opacity-30 transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              {t("startButton")}
            </>
          )}
        </Button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[13px] text-red-500 text-center -mt-4"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
