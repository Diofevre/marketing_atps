"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import TitleSection from "@/components/TitleSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUpVariants,
  fadeInUpDelayedVariants,
  viewportSettings,
} from "@/lib/motion";
import {
  Camera,
  CameraOff,
  Eye,
  EyeOff,
  MonitorPlay,
  Shield,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type DemoState = "idle" | "permission" | "active" | "results";

interface DetectionEvent {
  id: string;
  kind: string;
  label: string;
  severity: "info" | "medium" | "high" | "critical";
  timestampMs: number;
  icon: React.ReactNode;
}

const SEVERITY_COLORS: Record<string, string> = {
  info: "text-emerald-500 bg-emerald-50 border-emerald-200",
  medium: "text-amber-500 bg-amber-50 border-amber-200",
  high: "text-orange-500 bg-orange-50 border-orange-200",
  critical: "text-red-500 bg-red-50 border-red-200",
};

export default function DemoPlaceholder() {
  const t = useTranslations("enterpriseDemo");
  const [state, setState] = useState<DemoState>("idle");
  const [events, setEvents] = useState<DetectionEvent[]>([]);
  const [elapsedMs, setElapsedMs] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const simRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    if (simRef.current) clearInterval(simRef.current);
  }, []);

  const requestCamera = async () => {
    setState("permission");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, frameRate: 15 },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      startSession();
    } catch {
      setState("idle");
    }
  };

  const startSession = () => {
    setState("active");
    setEvents([]);
    startTimeRef.current = Date.now();
    setElapsedMs(0);

    // Timer
    timerRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current);
    }, 100);

    // Simulate detections — these would come from the Procteo WS in production
    simRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const roll = Math.random();

      // Probabilistic event simulation
      if (roll < 0.08) {
        addEvent({
          kind: "face.gaze.off_screen",
          label: "Gaze off screen",
          severity: "medium",
          icon: <EyeOff className="w-4 h-4" />,
          timestampMs: elapsed,
        });
      } else if (roll < 0.12) {
        addEvent({
          kind: "face.head_pose.yaw",
          label: "Head turned away",
          severity: "medium",
          icon: <AlertTriangle className="w-4 h-4" />,
          timestampMs: elapsed,
        });
      } else if (roll < 0.14) {
        addEvent({
          kind: "face.absent",
          label: "Face not visible",
          severity: "high",
          icon: <CameraOff className="w-4 h-4" />,
          timestampMs: elapsed,
        });
      } else if (roll < 0.15) {
        addEvent({
          kind: "object.phone",
          label: "Phone detected",
          severity: "critical",
          icon: <ShieldAlert className="w-4 h-4" />,
          timestampMs: elapsed,
        });
      }
    }, 2000);
  };

  const addEvent = (partial: Omit<DetectionEvent, "id">) => {
    setEvents((prev) => [
      ...prev,
      { ...partial, id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` },
    ]);
  };

  const endSession = () => {
    stopStream();
    setState("results");
  };

  const restart = () => {
    setEvents([]);
    setElapsedMs(0);
    setState("idle");
  };

  useEffect(() => {
    return () => stopStream();
  }, [stopStream]);

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <div className="w-full px-4 pt-[100px] lg:pt-[140px] pb-16 lg:pb-[120px]">
      <Container className="flex flex-col items-center gap-12 lg:gap-[80px]">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center gap-4 lg:gap-6 max-w-[700px]"
        >
          <TitleSection title={t("badge")} />
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[52px] text-[#1b0c25] font-medium">
            {t("title")}
          </h1>
          <motion.p
            variants={fadeInUpDelayedVariants}
            className="text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#1b0c25]/60"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Demo Area */}
        <div className="w-full max-w-[900px]">
          <AnimatePresence mode="wait">
            {/* ── IDLE ─────────────────────────────────── */}
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-[20px] border-2 border-dashed border-[#d37bff]/30 bg-gradient-to-br from-[#d37bff]/5 to-[#80a9fc]/5 p-8 lg:p-16 flex flex-col items-center justify-center gap-8 min-h-[400px]"
              >
                <div className="flex items-center gap-6">
                  {[Camera, MonitorPlay, Shield].map((Icon, i) => (
                    <motion.div
                      key={i}
                      className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#1b0c25]/5 flex items-center justify-center"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    >
                      <Icon className="w-7 h-7 text-[#d37bff]" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-[15px] text-[#1b0c25]/50 text-center max-w-[400px]">
                  {t("description")}
                </p>
                <Button
                  onClick={requestCamera}
                  className="h-12 px-8 bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[15px] font-medium text-white"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {t("startButton")}
                </Button>
              </motion.div>
            )}

            {/* ── PERMISSION (loading) ─────────────────── */}
            {state === "permission" && (
              <motion.div
                key="permission"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-[20px] border border-[#d37bff]/20 bg-white p-8 lg:p-16 flex flex-col items-center justify-center gap-6 min-h-[400px]"
              >
                <Loader2 className="w-12 h-12 text-[#d37bff] animate-spin" />
                <p className="text-[16px] font-medium text-[#1b0c25]">
                  {t("permissionTitle")}
                </p>
                <p className="text-[14px] text-[#1b0c25]/50 text-center max-w-[350px]">
                  {t("permissionDescription")}
                </p>
              </motion.div>
            )}

            {/* ── ACTIVE ───────────────────────────────── */}
            {state === "active" && (
              <motion.div
                key="active"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="rounded-[20px] border border-[#1b0c25]/10 bg-white shadow-lg overflow-hidden"
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#1b0c25] text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-[13px] font-medium">{t("activeTitle")}</span>
                  </div>
                  <span className="text-[13px] font-mono tabular-nums">
                    {formatTime(elapsedMs)}
                  </span>
                </div>

                <div className="flex flex-col lg:flex-row">
                  {/* Video */}
                  <div className="relative lg:w-[60%] aspect-video bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay: detection indicators */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-medium backdrop-blur-sm">
                        <Eye className="w-3 h-3" />
                        <span>Procteo Active</span>
                      </div>
                    </div>
                    {/* Flash on new event */}
                    <AnimatePresence>
                      {events.length > 0 && (
                        <motion.div
                          key={events[events.length - 1]?.id}
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0 border-2 border-amber-400 rounded-none pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Event log */}
                  <div className="lg:w-[40%] border-t lg:border-t-0 lg:border-l border-[#1b0c25]/10 flex flex-col">
                    <div className="px-4 py-3 border-b border-[#1b0c25]/5">
                      <p className="text-[12px] font-medium text-[#1b0c25]/40 uppercase tracking-wider">
                        Detection Log ({events.length})
                      </p>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[250px] lg:max-h-[300px]">
                      {events.length === 0 ? (
                        <div className="flex items-center justify-center h-full p-6">
                          <p className="text-[13px] text-[#1b0c25]/30 text-center">
                            {t("activeDescription")}
                          </p>
                        </div>
                      ) : (
                        <div className="divide-y divide-[#1b0c25]/5">
                          {[...events].reverse().map((evt) => (
                            <div
                              key={evt.id}
                              className="flex items-start gap-3 px-4 py-2.5"
                            >
                              <div className={`mt-0.5 p-1 rounded-md border ${SEVERITY_COLORS[evt.severity]}`}>
                                {evt.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium text-[#1b0c25] truncate">
                                  {evt.label}
                                </p>
                                <p className="text-[11px] text-[#1b0c25]/40 font-mono">
                                  {formatTime(evt.timestampMs)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-3 border-t border-[#1b0c25]/5">
                      <Button
                        onClick={endSession}
                        variant="outline"
                        className="w-full h-9 text-[13px] rounded-[6px] border-red-200 text-red-600 hover:bg-red-50"
                      >
                        {t("endButton")}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RESULTS ──────────────────────────────── */}
            {state === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-[20px] border border-[#1b0c25]/10 bg-white shadow-lg p-6 lg:p-10"
              >
                {/* Verdict */}
                <div className="flex flex-col items-center text-center gap-4 mb-8">
                  {events.length === 0 ? (
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    </div>
                  ) : events.filter((e) => e.severity === "critical").length > 0 ? (
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
                      <AlertTriangle className="w-8 h-8 text-amber-500" />
                    </div>
                  )}
                  <h2 className="text-xl lg:text-[24px] font-medium text-[#1b0c25]">
                    {t("resultsTitle")}
                  </h2>
                  <p className="text-[14px] text-[#1b0c25]/50 max-w-[450px]">
                    {events.length === 0
                      ? t("noEvents")
                      : t("resultsDescription")}
                  </p>
                </div>

                {/* Stats */}
                {events.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {(["info", "medium", "high", "critical"] as const).map((sev) => {
                      const count = events.filter((e) => e.severity === sev).length;
                      return (
                        <div
                          key={sev}
                          className={`rounded-xl border p-4 text-center ${SEVERITY_COLORS[sev]}`}
                        >
                          <p className="text-2xl font-bold">{count}</p>
                          <p className="text-[11px] uppercase tracking-wider mt-1">{sev}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Event list */}
                {events.length > 0 && (
                  <div className="border rounded-xl divide-y divide-[#1b0c25]/5 mb-8 max-h-[200px] overflow-y-auto">
                    {events.map((evt) => (
                      <div key={evt.id} className="flex items-center gap-3 px-4 py-2.5">
                        <div className={`p-1 rounded-md border ${SEVERITY_COLORS[evt.severity]}`}>
                          {evt.icon}
                        </div>
                        <span className="text-[13px] text-[#1b0c25] flex-1">{evt.label}</span>
                        <span className="text-[11px] text-[#1b0c25]/40 font-mono">
                          {formatTime(evt.timestampMs)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Duration */}
                <div className="text-center text-[13px] text-[#1b0c25]/40 mb-6">
                  Session duration: {formatTime(elapsedMs)}
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-3">
                  <Button
                    onClick={restart}
                    variant="outline"
                    className="h-11 px-6 rounded-[8px] text-[14px]"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t("restartButton")}
                  </Button>
                  <Link href="/contact">
                    <Button className="h-11 px-6 bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[14px] text-white">
                      {t("contactButton")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 max-w-[500px]"
        >
          <h2 className="text-xl lg:text-[24px] font-medium text-[#1b0c25]">
            {t("contactTitle")}
          </h2>
          <p className="text-[15px] leading-[24px] text-[#1b0c25]/60">
            {t("contactDescription")}
          </p>
          <Link href="/contact">
            <Button className="group h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[8px] text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]">
              <span className="flex flex-col items-center h-[26px] overflow-hidden">
                <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  {t("contactButton")}
                </span>
                <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  {t("contactButton")}
                </span>
              </span>
            </Button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
