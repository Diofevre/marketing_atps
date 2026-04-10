"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Mic, Monitor, CheckCircle2, XCircle, ArrowRight, SkipForward } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface DemoPermissionsProps {
  hasCamera: boolean;
  hasMicrophone: boolean;
  hasScreen: boolean;
  cameraStream: MediaStream | null;
  onRequestCamera: () => Promise<boolean>;
  onRequestScreen: () => Promise<boolean>;
  onSkipScreen: () => void;
  onComplete: () => void;
}

type PermStep = "camera" | "screen" | "ready";

export default function DemoPermissions({
  hasCamera,
  hasMicrophone,
  hasScreen,
  cameraStream,
  onRequestCamera,
  onRequestScreen,
  onSkipScreen,
  onComplete,
}: DemoPermissionsProps) {
  const t = useTranslations("enterpriseDemo");
  const [currentStep, setCurrentStep] = useState<PermStep>("camera");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream, currentStep]);

  const handleCamera = async () => {
    setLoading(true);
    const ok = await onRequestCamera();
    setLoading(false);
    if (ok) setCurrentStep("screen");
  };

  const handleScreen = async () => {
    setLoading(true);
    const ok = await onRequestScreen();
    setLoading(false);
    setCurrentStep("ready");
  };

  const handleSkipScreen = () => {
    onSkipScreen();
    setCurrentStep("ready");
  };

  const steps = [
    { id: "camera", icon: Camera, label: t("permCamera") ?? "Camera & Mic", done: hasCamera && hasMicrophone },
    { id: "screen", icon: Monitor, label: t("permScreen") ?? "Screen Share", done: hasScreen },
  ];

  return (
    <motion.div
      key="permissions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-[20px] border border-[#1b0c25]/10 bg-white shadow-lg overflow-hidden"
    >
      {/* Progress bar */}
      <div className="flex items-center gap-0 border-b border-[#1b0c25]/5">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`flex-1 flex items-center gap-2 px-4 py-3 text-[13px] font-medium transition-colors ${
              currentStep === step.id
                ? "bg-[#d37bff]/5 text-[#d37bff]"
                : step.done
                  ? "text-emerald-500"
                  : "text-[#1b0c25]/30"
            }`}
          >
            {step.done ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <step.icon className="w-4 h-4" />
            )}
            <span>{step.label}</span>
          </div>
        ))}
      </div>

      <div className="p-6 lg:p-10">
        <AnimatePresence mode="wait">
          {/* CAMERA STEP */}
          {currentStep === "camera" && (
            <motion.div
              key="cam"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-full max-w-[400px] aspect-video rounded-xl bg-[#1b0c25] overflow-hidden relative">
                {cameraStream ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <Camera className="w-12 h-12 text-white/20" />
                    <p className="text-[13px] text-white/30">{t("permCameraPreview") ?? "Camera preview"}</p>
                  </div>
                )}
              </div>

              <div className="text-center max-w-[400px]">
                <h3 className="text-[18px] font-medium text-[#1b0c25] mb-2">
                  {t("permCameraTitle") ?? "Camera & Microphone Access"}
                </h3>
                <p className="text-[14px] text-[#1b0c25]/50">
                  {t("permCameraDesc") ?? "Procteo needs your camera and microphone to monitor the exam session."}
                </p>
              </div>

              <Button
                onClick={handleCamera}
                disabled={loading || hasCamera}
                className="h-11 px-6 bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[14px] text-white"
              >
                {hasCamera ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {t("permGranted") ?? "Granted"}
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    {t("permAllow") ?? "Allow Camera & Microphone"}
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* SCREEN STEP */}
          {currentStep === "screen" && (
            <motion.div
              key="screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-full max-w-[400px] aspect-video rounded-xl bg-[#1b0c25] flex items-center justify-center">
                <Monitor className="w-16 h-16 text-white/20" />
              </div>

              <div className="text-center max-w-[400px]">
                <h3 className="text-[18px] font-medium text-[#1b0c25] mb-2">
                  {t("permScreenTitle") ?? "Screen Sharing"}
                </h3>
                <p className="text-[14px] text-[#1b0c25]/50">
                  {t("permScreenDesc") ?? "Share your screen so Procteo can detect unauthorized applications."}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleScreen}
                  disabled={loading}
                  className="h-11 px-6 bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[14px] text-white"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  {t("permAllowScreen") ?? "Share Screen"}
                </Button>
                <Button
                  onClick={handleSkipScreen}
                  variant="outline"
                  className="h-11 px-4 rounded-[8px] text-[13px] text-[#1b0c25]/50"
                >
                  <SkipForward className="w-4 h-4 mr-1" />
                  {t("permSkip") ?? "Skip"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* READY */}
          {currentStep === "ready" && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>

              <div className="text-center">
                <h3 className="text-[18px] font-medium text-[#1b0c25] mb-2">
                  {t("permReady") ?? "Ready to start"}
                </h3>
                <p className="text-[14px] text-[#1b0c25]/50 mb-1">
                  {t("permReadyDesc") ?? "All permissions granted. The exam will start with 10 aviation questions and a 5-minute timer."}
                </p>
              </div>

              {/* Permission summary */}
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-1.5 text-[12px] ${hasCamera ? "text-emerald-500" : "text-red-400"}`}>
                  {hasCamera ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  Camera
                </div>
                <div className={`flex items-center gap-1.5 text-[12px] ${hasMicrophone ? "text-emerald-500" : "text-red-400"}`}>
                  {hasMicrophone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  Mic
                </div>
                <div className={`flex items-center gap-1.5 text-[12px] ${hasScreen ? "text-emerald-500" : "text-[#1b0c25]/30"}`}>
                  {hasScreen ? <CheckCircle2 className="w-3.5 h-3.5" /> : <SkipForward className="w-3.5 h-3.5" />}
                  Screen
                </div>
              </div>

              <Button
                onClick={onComplete}
                className="h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[8px] text-[15px] font-medium text-white"
              >
                {t("permStart") ?? "Start Exam"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
