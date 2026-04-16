"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Camera, Mic, Monitor, Wifi, Globe, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface CheckResult {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  status: "pending" | "pass" | "warn" | "fail";
  detail?: string;
}

interface DemoSystemCheckProps {
  onComplete: () => void;
}

export default function DemoSystemCheck({ onComplete }: DemoSystemCheckProps) {
  const t = useTranslations("enterpriseDemo");
  const [checks, setChecks] = useState<CheckResult[]>([
    { id: "browser", labelKey: "sysCheckBrowser", icon: <Globe className="w-5 h-5" />, status: "pending" },
    { id: "camera", labelKey: "sysCheckCamera", icon: <Camera className="w-5 h-5" />, status: "pending" },
    { id: "mic", labelKey: "sysCheckMic", icon: <Mic className="w-5 h-5" />, status: "pending" },
    { id: "screen", labelKey: "sysCheckScreen", icon: <Monitor className="w-5 h-5" />, status: "pending" },
    { id: "network", labelKey: "sysCheckNetwork", icon: <Wifi className="w-5 h-5" />, status: "pending" },
  ]);
  const [running, setRunning] = useState(true);

  const updateCheck = (id: string, status: CheckResult["status"], detail?: string) => {
    setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, status, detail } : c)));
  };

  const runChecks = useCallback(async () => {
    setRunning(true);

    // Browser check
    const isChrome = /Chrome\/\d+/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);
    const isFirefox = /Firefox\/\d+/.test(navigator.userAgent);
    const isSafari = /Safari\/\d+/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isEdge = /Edg\/\d+/.test(navigator.userAgent);
    if (isChrome || isFirefox || isEdge) {
      updateCheck("browser", "pass", isChrome ? "Chrome" : isFirefox ? "Firefox" : "Edge");
    } else if (isSafari) {
      updateCheck("browser", "warn", "Safari (limited support)");
    } else {
      updateCheck("browser", "warn", "Unknown browser");
    }

    // Camera check
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((d) => d.kind === "videoinput");
      updateCheck("camera", hasCamera ? "pass" : "fail", hasCamera ? undefined : "No camera found");
    } catch {
      updateCheck("camera", "fail", "Cannot detect devices");
    }

    // Microphone check
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasMic = devices.some((d) => d.kind === "audioinput");
      updateCheck("mic", hasMic ? "pass" : "fail", hasMic ? undefined : "No microphone found");
    } catch {
      updateCheck("mic", "fail", "Cannot detect devices");
    }

    // Screen share API check
    if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
      updateCheck("screen", "pass");
    } else {
      updateCheck("screen", "fail", "Not supported by browser");
    }

    // Network check (simple latency test)
    try {
      const start = performance.now();
      await fetch("https://procteo-api.myatps.com/health", { mode: "cors" });
      const latency = Math.round(performance.now() - start);
      if (latency < 500) {
        updateCheck("network", "pass", `${latency}ms`);
      } else if (latency < 2000) {
        updateCheck("network", "warn", `${latency}ms (slow)`);
      } else {
        updateCheck("network", "fail", `${latency}ms (too slow)`);
      }
    } catch {
      updateCheck("network", "warn", "Cannot reach server");
    }

    setRunning(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runChecks();
  }, [runChecks]);

  const allPassed = checks.every((c) => c.status === "pass" || c.status === "warn");
  const hasFail = checks.some((c) => c.status === "fail");

  const statusIcon = (s: CheckResult["status"]) => {
    switch (s) {
      case "pass": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "warn": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "fail": return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Loader2 className="w-5 h-5 text-[#1b0c25]/20 animate-spin" />;
    }
  };

  return (
    <motion.div
      key="systemcheck"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-[20px] border border-[#1b0c25]/10 bg-white shadow-lg p-6 lg:p-10"
    >
      <div className="text-center mb-8">
        <h3 className="text-[20px] font-medium text-[#1b0c25] mb-2">
          {t("sysCheckTitle") ?? "System Requirements"}
        </h3>
        <p className="text-[14px] text-[#1b0c25]/50">
          {t("sysCheckDesc") ?? "Checking your device is ready for the proctored exam."}
        </p>
      </div>

      <div className="max-w-[400px] mx-auto space-y-3 mb-8">
        {checks.map((check) => (
          <div
            key={check.id}
            className="flex items-center gap-3 px-4 py-3 rounded-[12px] border border-[#1b0c25]/5 bg-[#fafafa]"
          >
            <div className="text-[#1b0c25]/30">{check.icon}</div>
            <span className="text-[14px] text-[#1b0c25] flex-1">
              {t(check.labelKey) ?? check.id}
            </span>
            {statusIcon(check.status)}
            {check.detail && (
              <span className="text-[11px] text-[#1b0c25]/40">{check.detail}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        {running ? (
          <p className="text-[13px] text-[#1b0c25]/40 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("sysCheckRunning") ?? "Checking..."}
          </p>
        ) : (
          <Button
            onClick={onComplete}
            disabled={hasFail}
            className="h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[8px] text-[15px] font-medium text-white disabled:opacity-40"
          >
            {allPassed
              ? (t("sysCheckContinue") ?? "All checks passed — Continue")
              : (t("sysCheckWarning") ?? "Continue with warnings")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
