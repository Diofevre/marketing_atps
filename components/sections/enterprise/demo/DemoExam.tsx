"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Clock,
  Eye,
  Camera,
  CameraOff,
  EyeOff,
  AlertTriangle,
  ShieldAlert,
  Mic,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { DemoQuestion } from "./demoQuestions";
import type { DetectionEvent } from "./useDemoSession";

const SEVERITY_COLORS: Record<string, string> = {
  info: "text-emerald-500 bg-emerald-50 border-emerald-200",
  medium: "text-amber-500 bg-amber-50 border-amber-200",
  high: "text-orange-500 bg-orange-50 border-orange-200",
  critical: "text-red-500 bg-red-50 border-red-200",
};

const EVENT_ICONS: Record<string, React.ReactNode> = {
  "face.gaze.off_screen": <EyeOff className="w-3.5 h-3.5" />,
  "face.head_pose.yaw": <AlertTriangle className="w-3.5 h-3.5" />,
  "face.absent": <CameraOff className="w-3.5 h-3.5" />,
  "object.phone": <ShieldAlert className="w-3.5 h-3.5" />,
};

interface DemoExamProps {
  questions: DemoQuestion[];
  currentQuestion: number;
  answers: Record<string, number | null>;
  timeRemaining: number;
  answeredCount: number;
  events: DetectionEvent[];
  cameraStream: MediaStream | null;
  onSelectAnswer: (questionId: string, optionIndex: number) => void;
  onGoToQuestion: (index: number) => void;
  onSubmit: () => void;
}

export default function DemoExam({
  questions,
  currentQuestion,
  answers,
  timeRemaining,
  answeredCount,
  events,
  cameraStream,
  onSelectAnswer,
  onGoToQuestion,
  onSubmit,
}: DemoExamProps) {
  const t = useTranslations("enterpriseDemo");
  const tq = useTranslations();
  const videoRef = useRef<HTMLVideoElement>(null);
  const q = questions[currentQuestion];
  const selectedAnswer = q ? answers[q.id] : null;

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isLowTime = timeRemaining < 60;

  if (!q) return null;

  return (
    <motion.div
      key="exam"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="rounded-[20px] border border-[#1b0c25]/10 bg-white shadow-lg overflow-hidden"
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 bg-[#1b0c25] text-white">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[13px] font-medium">
            {t("examTitle") ?? "Procteo Demo Exam"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[12px] text-white/60">
            {answeredCount}/{questions.length}
          </span>
          <div className={`flex items-center gap-1.5 font-mono text-[14px] tabular-nums ${isLowTime ? "text-red-400 animate-pulse" : ""}`}>
            <Clock className="w-3.5 h-3.5" />
            {minutes}:{String(seconds).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-[450px]">
        {/* Question area */}
        <div className="flex-1 p-5 lg:p-8 flex flex-col">
          {/* Question number */}
          <div className="text-[12px] font-medium text-[#d37bff] uppercase tracking-wider mb-3">
            Question {currentQuestion + 1} / {questions.length}
          </div>

          {/* Question text */}
          <h3 className="text-[17px] lg:text-[19px] font-medium text-[#1b0c25] leading-relaxed mb-6">
            {tq(q.questionKey)}
          </h3>

          {/* Options */}
          <div className="flex flex-col gap-2.5 flex-1">
            {q.optionKeys.map((optKey, idx) => {
              const isSelected = selectedAnswer === idx;
              const letter = String.fromCharCode(65 + idx); // A, B, C, D

              return (
                <button
                  key={optKey}
                  onClick={() => onSelectAnswer(q.id, idx)}
                  className="w-full text-left px-4 py-3 rounded-[10px] border-2 transition-all duration-200 flex items-start gap-3"
                  style={isSelected
                    ? { borderColor: "#EECE84", backgroundColor: "rgba(238,206,132,0.2)" }
                    : { borderColor: "rgba(27,12,37,0.08)" }
                  }
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold"
                    style={isSelected
                      ? { backgroundColor: "#EECE84", color: "#1b0c25" }
                      : { backgroundColor: "rgba(27,12,37,0.05)", color: "rgba(27,12,37,0.4)" }
                    }
                  >
                    {letter}
                  </span>
                  <span className={`text-[14px] leading-[22px] pt-0.5 ${isSelected ? "text-[#1b0c25] font-medium" : "text-[#1b0c25]/70"}`}>
                    {tq(optKey)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#1b0c25]/5">
            <Button
              onClick={() => onGoToQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              variant="outline"
              className="h-9 px-3 rounded-[6px] text-[13px]"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t("examPrev") ?? "Previous"}
            </Button>

            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={onSubmit}
                className="h-9 px-4 bg-[#d37bff] hover:bg-[#c060ee] rounded-[6px] text-[13px] text-white"
              >
                <Send className="w-4 h-4 mr-1" />
                {t("examSubmit") ?? "Submit"}
              </Button>
            ) : (
              <Button
                onClick={() => onGoToQuestion(currentQuestion + 1)}
                variant="outline"
                className="h-9 px-3 rounded-[6px] text-[13px]"
              >
                {t("examNext") ?? "Next"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* ── Monitor sidebar ──────────────────────── */}
        <div className="lg:w-[280px] border-t lg:border-t-0 lg:border-l border-[#1b0c25]/10 flex flex-col bg-[#fafafa]">
          {/* Camera preview */}
          <div className="p-3">
            <div className="aspect-video rounded-lg bg-black overflow-hidden relative">
              {cameraStream ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white/20" />
                </div>
              )}
              <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-[9px] font-medium">
                <Eye className="w-2.5 h-2.5" />
                Active
              </div>
            </div>
          </div>

          {/* Nav grid */}
          <div className="px-3 pb-3">
            <div className="grid grid-cols-5 gap-1">
              {questions.map((qq, idx) => {
                const isAnswered = answers[qq.id] !== null && answers[qq.id] !== undefined;
                const isCurrent = idx === currentQuestion;

                return (
                  <button
                    key={qq.id}
                    onClick={() => onGoToQuestion(idx)}
                    className="aspect-square rounded-md text-[11px] font-bold transition-all"
                    style={
                      isCurrent
                        ? { backgroundColor: "#d37bff", color: "white" }
                        : isAnswered
                          ? { backgroundColor: "rgba(238,206,132,0.3)", color: "rgba(27,12,37,0.7)", border: "1px solid #EECE84" }
                          : { backgroundColor: "white", color: "rgba(27,12,37,0.3)", border: "1px solid rgba(27,12,37,0.08)" }
                    }
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events log */}
          <div className="flex-1 border-t border-[#1b0c25]/5">
            <div className="px-3 py-2 text-[10px] font-medium text-[#1b0c25]/30 uppercase tracking-wider">
              Events ({events.length})
            </div>
            <div className="overflow-y-auto max-h-[150px]">
              {events.length === 0 ? (
                <p className="px-3 py-4 text-[11px] text-[#1b0c25]/20 text-center">
                  {t("examNoEvents") ?? "Monitoring..."}
                </p>
              ) : (
                <div className="divide-y divide-[#1b0c25]/5">
                  {[...events].reverse().slice(0, 8).map((evt) => (
                    <div key={evt.id} className="flex items-center gap-2 px-3 py-1.5">
                      <div className={`p-0.5 rounded border ${SEVERITY_COLORS[evt.severity]}`}>
                        {EVENT_ICONS[evt.kind] || <AlertTriangle className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-[11px] text-[#1b0c25]/60 truncate flex-1">
                        {tq(evt.labelKey)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
