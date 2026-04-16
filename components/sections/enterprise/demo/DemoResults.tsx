"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, AlertTriangle, RotateCcw, Trophy, Target, Clock, Eye } from "lucide-react";
import { DEMO_DURATION_SECONDS, DEMO_PASSING_SCORE } from "./demoQuestions";
import type { DetectionEvent } from "./useDemoSession";

const SEVERITY_COLORS: Record<string, string> = {
  info: "text-emerald-500 bg-emerald-50 border-emerald-200",
  medium: "text-amber-500 bg-amber-50 border-amber-200",
  high: "text-orange-500 bg-orange-50 border-orange-200",
  critical: "text-red-500 bg-red-50 border-red-200",
};

interface DemoResultsProps {
  score: number;
  totalQuestions: number;
  timeRemaining: number;
  events: DetectionEvent[];
  onRestart: () => void;
}

export default function DemoResults({ score, totalQuestions, timeRemaining, events, onRestart }: DemoResultsProps) {
  const t = useTranslations("enterpriseDemo");
  const tq = useTranslations();

  const passed = score >= DEMO_PASSING_SCORE;
  const elapsed = DEMO_DURATION_SECONDS - timeRemaining;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const criticalCount = events.filter((e) => e.severity === "critical").length;
  const highCount = events.filter((e) => e.severity === "high").length;
  const mediumCount = events.filter((e) => e.severity === "medium").length;

  const procteoVerdict = criticalCount > 0 ? "suspicious" : highCount > 2 ? "minor_issues" : "clear";

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-[20px] border border-[#1b0c25]/10 bg-white shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#1b0c25] to-[#2d1640] text-white text-center">
        <h2 className="text-[20px] font-medium">{t("resultsTitle")}</h2>
      </div>

      <div className="p-6 lg:p-8">
        {/* Two columns: Quiz Score + Procteo Report */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quiz Score */}
          <div className="rounded-[16px] border border-[#1b0c25]/8 p-6 text-center">
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? "bg-emerald-50" : "bg-red-50"}`}>
              <Trophy className={`w-10 h-10 ${passed ? "text-emerald-500" : "text-red-400"}`} />
            </div>
            <div className="text-[36px] font-bold text-[#1b0c25]">
              {score}<span className="text-[20px] text-[#1b0c25]/30">/{totalQuestions}</span>
            </div>
            <p className={`text-[14px] font-medium mt-1 ${passed ? "text-emerald-500" : "text-red-400"}`}>
              {passed ? (t("resultsPassed") ?? "Passed") : (t("resultsFailed") ?? "Failed")}
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-[12px] text-[#1b0c25]/40">
              <Clock className="w-3.5 h-3.5" />
              {minutes}:{String(seconds).padStart(2, "0")}
            </div>
          </div>

          {/* Procteo Report */}
          <div className="rounded-[16px] border border-[#1b0c25]/8 p-6 text-center">
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
              procteoVerdict === "clear" ? "bg-emerald-50" : procteoVerdict === "minor_issues" ? "bg-amber-50" : "bg-red-50"
            }`}>
              {procteoVerdict === "clear" ? (
                <ShieldCheck className="w-10 h-10 text-emerald-500" />
              ) : procteoVerdict === "minor_issues" ? (
                <AlertTriangle className="w-10 h-10 text-amber-500" />
              ) : (
                <ShieldAlert className="w-10 h-10 text-red-500" />
              )}
            </div>
            <p className="text-[14px] font-medium text-[#1b0c25] mb-1">
              {t("resultsProcteo") ?? "Procteo Verdict"}
            </p>
            <p className={`text-[16px] font-bold capitalize ${
              procteoVerdict === "clear" ? "text-emerald-500" : procteoVerdict === "minor_issues" ? "text-amber-500" : "text-red-500"
            }`}>
              {procteoVerdict === "clear"
                ? (t("verdictClear") ?? "Clear")
                : procteoVerdict === "minor_issues"
                  ? (t("verdictMinor") ?? "Minor Issues")
                  : (t("verdictSuspicious") ?? "Suspicious")}
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-[12px] text-[#1b0c25]/40">
              <Eye className="w-3.5 h-3.5" />
              {events.length} {t("resultsEvents") ?? "events detected"}
            </div>
          </div>
        </div>

        {/* Severity breakdown */}
        {events.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Medium", count: mediumCount, color: SEVERITY_COLORS.medium },
              { label: "High", count: highCount, color: SEVERITY_COLORS.high },
              { label: "Critical", count: criticalCount, color: SEVERITY_COLORS.critical },
            ].map(({ label, count, color }) => (
              <div key={label} className={`rounded-xl border p-3 text-center ${color}`}>
                <p className="text-[20px] font-bold">{count}</p>
                <p className="text-[10px] uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Event list (collapsed by default on many events) */}
        {events.length > 0 && (
          <div className="rounded-xl border border-[#1b0c25]/8 divide-y divide-[#1b0c25]/5 max-h-[160px] overflow-y-auto mb-6">
            {events.map((evt) => (
              <div key={evt.id} className="flex items-center gap-2 px-3 py-2">
                <div className={`p-0.5 rounded border ${SEVERITY_COLORS[evt.severity]}`}>
                  <Target className="w-3 h-3" />
                </div>
                <span className="text-[12px] text-[#1b0c25]/60 flex-1 truncate">{tq(evt.labelKey)}</span>
                <span className="text-[10px] text-[#1b0c25]/30 uppercase">{evt.severity}</span>
              </div>
            ))}
          </div>
        )}

        {events.length === 0 && (
          <div className="text-center py-4 mb-6">
            <p className="text-[14px] text-emerald-500 font-medium">{t("noEvents")}</p>
          </div>
        )}

        {/* Offline analysis notice */}
        <div className="rounded-[12px] bg-gradient-to-r from-[#d37bff]/5 to-[#80a9fc]/5 border border-[#d37bff]/15 p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d37bff]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock className="w-4 h-4 text-[#d37bff]" />
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1b0c25] mb-1">
                {t("offlineTitle") ?? "Offline Analysis"}
              </h4>
              <p className="text-[12px] leading-[18px] text-[#1b0c25]/50">
                {t("offlineNotice")}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button onClick={onRestart} variant="outline" className="h-11 px-6 rounded-[8px] text-[14px]">
            <RotateCcw className="w-4 h-4 mr-2" />
            {t("restartButton")}
          </Button>
          <Link href="/contact">
            <Button className="h-11 px-6 bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[14px] text-white w-full sm:w-auto">
              {t("contactButton")}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
