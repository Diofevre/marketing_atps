"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Monitor, CheckCircle2, XCircle,
  ArrowRight, SkipForward, ScanFace,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface DemoPermissionsProps {
  hasCamera: boolean;
  hasMicrophone: boolean;
  hasScreen: boolean;
  cameraStream: MediaStream | null;
  onRequestCamera: () => Promise<boolean>;
  onConfirmCameraReady: () => void;
  onRequestScreen: () => Promise<boolean>;
  onSkipScreen: () => void;
  onGoToIdentity: () => void;
  onComplete: () => void;
}

type PermStep = "camera" | "camera-preview" | "screen" | "ready";

export default function DemoPermissions({
  hasCamera, hasMicrophone, hasScreen, cameraStream,
  onRequestCamera, onConfirmCameraReady, onRequestScreen, onSkipScreen,
  onGoToIdentity, onComplete,
}: DemoPermissionsProps) {
  const t = useTranslations("enterpriseDemo");
  const [currentStep, setCurrentStep] = useState<PermStep>("camera");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const handleCamera = async () => {
    setLoading(true);
    const ok = await onRequestCamera();
    setLoading(false);
    if (ok) setCurrentStep("camera-preview");
  };

  const handleConfirmPreview = () => {
    onConfirmCameraReady();
    setCurrentStep("screen");
  };

  const handleScreen = async () => {
    setLoading(true);
    await onRequestScreen();
    setLoading(false);
    setCurrentStep("ready");
  };

  return (
    <motion.div
      key="permissions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-[20px] border border-[#1b0c25]/10 bg-white shadow-lg overflow-hidden"
    >
      {/* Step indicator */}
      <div className="flex border-b border-[#1b0c25]/5">
        {[
          { id: "camera", label: t("permCamera") ?? "Camera & Mic", done: hasCamera },
          { id: "screen", label: t("permScreen") ?? "Screen", done: hasScreen },
        ].map((step) => (
          <div
            key={step.id}
            className={`flex-1 flex items-center gap-2 px-4 py-3 text-[13px] font-medium transition-colors ${
              currentStep.startsWith(step.id)
                ? "bg-[#d37bff]/5 text-[#d37bff]"
                : step.done ? "text-emerald-500" : "text-[#1b0c25]/30"
            }`}
          >
            {step.done ? <CheckCircle2 className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            <span>{step.label}</span>
          </div>
        ))}
      </div>

      <div className="p-6 lg:p-10">
        <AnimatePresence mode="wait">
          {/* CAMERA REQUEST */}
          {currentStep === "camera" && (
            <motion.div key="cam-req" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center gap-6">
              <div className="w-full max-w-[400px] aspect-video rounded-xl bg-[#1b0c25] flex items-center justify-center">
                <Camera className="w-12 h-12 text-white/20" />
              </div>
              <div className="text-center max-w-[400px]">
                <h3 className="text-[18px] font-medium text-[#1b0c25] mb-2">{t("permCameraTitle") ?? "Camera & Microphone"}</h3>
                <p className="text-[14px] text-[#1b0c25]/50">{t("permCameraDesc") ?? "Procteo needs your camera and microphone to monitor the exam."}</p>
              </div>
              <Button onClick={handleCamera} disabled={loading} className="h-11 px-6 bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[14px] text-white">
                <Camera className="w-4 h-4 mr-2" />{t("permAllow") ?? "Allow Camera & Microphone"}
              </Button>
            </motion.div>
          )}

          {/* CAMERA PREVIEW — user must see themselves before continuing */}
          {currentStep === "camera-preview" && (
            <motion.div key="cam-preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center gap-6">
              <div className="w-full max-w-[400px] aspect-video rounded-xl bg-[#1b0c25] overflow-hidden relative">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </div>
              </div>
              <div className="text-center max-w-[400px]">
                <h3 className="text-[18px] font-medium text-[#1b0c25] mb-2">{t("permCameraCheck") ?? "Can you see yourself?"}</h3>
                <p className="text-[14px] text-[#1b0c25]/50">{t("permCameraCheckDesc") ?? "Make sure your face is clearly visible and well-lit."}</p>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-emerald-500">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Camera</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Microphone</span>
              </div>
              <Button onClick={handleConfirmPreview} className="h-11 px-6 bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[14px] text-white">
                {t("permCameraConfirm") ?? "Yes, I can see myself"}<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* SCREEN SHARE */}
          {currentStep === "screen" && (
            <motion.div key="screen" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center gap-6">
              <div className="w-full max-w-[400px] aspect-video rounded-xl bg-[#1b0c25] flex items-center justify-center">
                <Monitor className="w-16 h-16 text-white/20" />
              </div>
              <div className="text-center max-w-[400px]">
                <h3 className="text-[18px] font-medium text-[#1b0c25] mb-2">{t("permScreenTitle") ?? "Screen Sharing"}</h3>
                <p className="text-[14px] text-[#1b0c25]/50">{t("permScreenDesc") ?? "Share your screen to detect unauthorized applications."}</p>
                <p className="text-[12px] text-amber-500 mt-2 font-medium">{t("permScreenWarn") ?? "Select \"Entire Screen\" for proper monitoring."}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleScreen} disabled={loading} className="h-11 px-6 bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[14px] text-white">
                  <Monitor className="w-4 h-4 mr-2" />{t("permAllowScreen") ?? "Share Entire Screen"}
                </Button>
                <Button onClick={() => { onSkipScreen(); setCurrentStep("ready"); }} variant="outline" className="h-11 px-4 rounded-[8px] text-[13px] text-[#1b0c25]/50">
                  <SkipForward className="w-4 h-4 mr-1" />{t("permSkip") ?? "Skip"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* READY — with identity verification option */}
          {currentStep === "ready" && (
            <motion.div key="ready" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="text-center">
                <h3 className="text-[18px] font-medium text-[#1b0c25] mb-2">{t("permReady") ?? "Ready!"}</h3>
                <p className="text-[14px] text-[#1b0c25]/50">{t("permReadyDesc") ?? "10 aviation questions, 5-minute timer."}</p>
              </div>
              <div className="flex items-center gap-4 text-[12px]">
                <span className={hasCamera ? "text-emerald-500" : "text-red-400"}>
                  {hasCamera ? <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> : <XCircle className="w-3.5 h-3.5 inline mr-1" />}Camera
                </span>
                <span className={hasMicrophone ? "text-emerald-500" : "text-red-400"}>
                  {hasMicrophone ? <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> : <XCircle className="w-3.5 h-3.5 inline mr-1" />}Mic
                </span>
                <span className={hasScreen ? "text-emerald-500" : "text-[#1b0c25]/30"}>
                  {hasScreen ? <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> : <SkipForward className="w-3.5 h-3.5 inline mr-1" />}Screen
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button onClick={onGoToIdentity} variant="outline" className="h-11 px-5 rounded-[8px] text-[13px]" style={{ borderColor: "rgba(211,123,255,0.3)", color: "#d37bff" }}>
                  <ScanFace className="w-4 h-4 mr-2" />{t("permIdentity") ?? "Test Identity Verification"}
                </Button>
                <Button onClick={onComplete} className="h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[8px] text-[15px] font-medium text-white">
                  {t("permStart") ?? "Start Exam"}<ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
