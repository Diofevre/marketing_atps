"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ScanFace, Upload, CheckCircle2, XCircle, ArrowRight, Loader2, Camera } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";

interface DemoIdentityProps {
  cameraStream: MediaStream | null;
  identityPhoto: string | null;
  identityMatched: boolean | null;
  onSetPhoto: (photo: string | null) => void;
  onVerify: () => void;
  onComplete: () => void;
}

export default function DemoIdentity({
  cameraStream, identityPhoto, identityMatched,
  onSetPhoto, onVerify, onComplete,
}: DemoIdentityProps) {
  const t = useTranslations("enterpriseDemo");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<"upload" | "capture" | "verifying" | "result">("upload");

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // Handle file upload for ID photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onSetPhoto(result);
    };
    reader.readAsDataURL(file);
  };

  // Capture from webcam instead
  const captureFromWebcam = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    onSetPhoto(dataUrl);
  }, [onSetPhoto]);

  // Start verification
  const handleVerify = () => {
    setStep("verifying");
    onVerify();
  };

  // Watch for verification result
  useEffect(() => {
    if (identityMatched !== null && step === "verifying") {
      setStep("result");
    }
  }, [identityMatched, step]);

  return (
    <motion.div
      key="identity"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-[20px] border border-[#1b0c25]/10 bg-white shadow-lg overflow-hidden"
    >
      <div className="px-5 py-3 bg-gradient-to-r from-[#d37bff]/10 to-[#80a9fc]/10 border-b border-[#1b0c25]/5">
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#d37bff]">
          <ScanFace className="w-4 h-4" />
          {t("identityTitle") ?? "Identity Verification"}
        </div>
      </div>

      <div className="p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: ID Photo */}
          <div className="flex-1 flex flex-col items-center gap-4">
            <h4 className="text-[15px] font-medium text-[#1b0c25]">
              {t("identityUpload") ?? "1. Reference Photo"}
            </h4>

            {identityPhoto ? (
              <div className="w-full max-w-[250px] aspect-[3/4] rounded-xl overflow-hidden border-2 border-emerald-300 relative">
                <img src={identityPhoto} alt="ID" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-[250px] aspect-[3/4] rounded-xl border-2 border-dashed border-[#d37bff]/30 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#d37bff]/5 transition-colors"
              >
                <Upload className="w-8 h-8 text-[#d37bff]/40" />
                <p className="text-[12px] text-[#1b0c25]/40 text-center px-4">
                  {t("identityDrop") ?? "Click to upload a photo or ID"}
                </p>
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

            {!identityPhoto && (
              <div className="flex items-center gap-2">
                <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="h-9 px-4 text-[12px] rounded-[6px]">
                  <Upload className="w-3.5 h-3.5 mr-1.5" />{t("identityUploadBtn") ?? "Upload Photo"}
                </Button>
                <Button onClick={captureFromWebcam} variant="outline" className="h-9 px-4 text-[12px] rounded-[6px]">
                  <Camera className="w-3.5 h-3.5 mr-1.5" />Selfie
                </Button>
              </div>
            )}
          </div>

          {/* Right: Live webcam + face capture */}
          <div className="flex-1 flex flex-col items-center gap-4">
            <h4 className="text-[15px] font-medium text-[#1b0c25]">
              {t("identityFace") ?? "2. Face Verification"}
            </h4>

            <div className="w-full max-w-[300px] aspect-video rounded-xl bg-[#1b0c25] overflow-hidden relative">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live
              </div>
            </div>

            {/* Verification result */}
            {step === "verifying" && (
              <div className="flex items-center gap-2 text-[13px] text-[#d37bff]">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("identityVerifying") ?? "Analyzing face..."}
              </div>
            )}

            {step === "result" && identityMatched && (
              <div className="flex items-center gap-2 text-[13px] text-emerald-500 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                {t("identityMatch") ?? "Identity verified successfully"}
              </div>
            )}

            {step === "result" && identityMatched === false && (
              <div className="flex items-center gap-2 text-[13px] text-red-500 font-medium">
                <XCircle className="w-4 h-4" />
                {t("identityNoMatch") ?? "Face does not match"}
              </div>
            )}

            {identityPhoto && step !== "verifying" && step !== "result" && (
              <Button onClick={handleVerify} className="h-9 px-4 bg-[#d37bff] hover:bg-[#c060ee] rounded-[6px] text-[12px] text-white">
                <ScanFace className="w-3.5 h-3.5 mr-1.5" />{t("identityVerifyBtn") ?? "Verify Identity"}
              </Button>
            )}
          </div>
        </div>

        {/* Continue button */}
        <div className="flex justify-center mt-8 pt-6 border-t border-[#1b0c25]/5">
          <Button onClick={onComplete} className="h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[8px] text-[15px] font-medium text-white">
            {t("permStart") ?? "Start Exam"}<ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
