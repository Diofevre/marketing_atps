"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Video, Mic, Monitor, Eye, Lock, ArrowRight, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DemoConsentProps {
  onAccept: () => void;
}

export default function DemoConsent({ onAccept }: DemoConsentProps) {
  const t = useTranslations("enterpriseDemo");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedRules, setAcceptedRules] = useState(false);

  const canProceed = acceptedPrivacy && acceptedRules;

  return (
    <motion.div
      key="consent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-[20px] border border-[#1b0c25]/10 bg-white shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#1b0c25] to-[#2d1640] text-white">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <h3 className="text-[16px] font-medium">{t("consentTitle") ?? "Privacy & Consent"}</h3>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        {/* Data Collection */}
        <div className="mb-6">
          <h4 className="text-[14px] font-medium text-[#1b0c25] mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#d37bff]" />
            {t("consentDataTitle") ?? "What we collect during this demo"}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: <Video className="w-3.5 h-3.5" />, key: "consentDataVideo", fallback: "Video — your face and upper body" },
              { icon: <Mic className="w-3.5 h-3.5" />, key: "consentDataAudio", fallback: "Audio — room sounds" },
              { icon: <Monitor className="w-3.5 h-3.5" />, key: "consentDataScreen", fallback: "Screen — your desktop" },
              { icon: <Eye className="w-3.5 h-3.5" />, key: "consentDataBehavior", fallback: "Behavioral — gaze, head position" },
            ].map((item) => (
              <div key={item.key} className="flex items-start gap-2 px-3 py-2 rounded-lg bg-[#f7f6f7]">
                <div className="mt-0.5 text-[#d37bff]">{item.icon}</div>
                <span className="text-[12px] text-[#1b0c25]/60 leading-[16px]">{t(item.key) ?? item.fallback}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Retention & Security */}
        <div className="mb-6 flex items-start gap-3 px-4 py-3 rounded-[12px] bg-emerald-50 border border-emerald-200/60">
          <Lock className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[12px] text-emerald-700 font-medium mb-1">
              {t("consentRetentionTitle") ?? "Data retention & security"}
            </p>
            <ul className="text-[11px] text-emerald-600 leading-[16px] space-y-0.5">
              <li>{t("consentRetention1") ?? "Demo data is automatically deleted after 24 hours"}</li>
              <li>{t("consentRetention2") ?? "Encrypted at rest on EU-based servers"}</li>
              <li>{t("consentRetention3") ?? "Analyzed by AI only — no human proctor reviews demo sessions"}</li>
              <li>{t("consentRetention4") ?? "You can request deletion at any time"}</li>
            </ul>
          </div>
        </div>

        {/* Academic Integrity Rules */}
        <div className="mb-6">
          <h4 className="text-[14px] font-medium text-[#1b0c25] mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            {t("consentRulesTitle") ?? "Demo exam rules"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {[
              { key: "consentRule1", fallback: "No external apps or search engines" },
              { key: "consentRule2", fallback: "No communication with others" },
              { key: "consentRule3", fallback: "No phone, tablet, or external devices" },
              { key: "consentRule4", fallback: "No visible notes or reference materials" },
              { key: "consentRule5", fallback: "Stay visible in the camera at all times" },
              { key: "consentRule6", fallback: "Do not cover or block the camera" },
            ].map((rule) => (
              <div key={rule.key} className="flex items-center gap-2 text-[12px] text-[#1b0c25]/60">
                <span className="text-red-400">✕</span>
                <span>{t(rule.key) ?? rule.fallback}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Consent checkboxes */}
        <div className="space-y-3 mb-6 p-4 rounded-[12px] border border-[#1b0c25]/10">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={(e) => setAcceptedPrivacy(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[#1b0c25]/20 text-[#d37bff] focus:ring-[#d37bff]/30"
            />
            <span className="text-[13px] text-[#1b0c25]/70 leading-[20px]">
              {t("consentCheckPrivacy") ?? "I understand the privacy terms and consent to data collection during this demo session."}
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedRules}
              onChange={(e) => setAcceptedRules(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[#1b0c25]/20 text-[#d37bff] focus:ring-[#d37bff]/30"
            />
            <span className="text-[13px] text-[#1b0c25]/70 leading-[20px]">
              {t("consentCheckRules") ?? "I understand the exam rules and will follow the academic integrity guidelines."}
            </span>
          </label>
        </div>

        {/* Start button */}
        <div className="flex justify-center">
          <Button
            onClick={onAccept}
            disabled={!canProceed}
            className="h-12 px-8 bg-[#d37bff] hover:bg-[#c060ee] rounded-[8px] text-[15px] font-medium text-white disabled:opacity-30"
          >
            {t("consentStart") ?? "I agree — Start the exam"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
