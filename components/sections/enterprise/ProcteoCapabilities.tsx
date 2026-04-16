"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import TitleSection from "@/components/TitleSection";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  bentoCardVariants,
  bentoContainerVariants,
  viewportSettings,
} from "@/lib/motion";
import {
  ScanFace,
  Eye,
  Smartphone,
  AppWindow,
  AudioLines,
  BrainCircuit,
} from "lucide-react";

const CAPABILITY_ICONS = [ScanFace, Eye, Smartphone, AppWindow, AudioLines, BrainCircuit];

export default function ProcteoCapabilities() {
  const t = useTranslations("enterpriseProcteo");

  const capabilities = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    Icon: CAPABILITY_ICONS[i],
    title: t(`feature${i + 1}Title`),
    description: t(`feature${i + 1}Description`),
  }));

  return (
    <div className="px-4 py-16 lg:py-[120px] bg-[#f7f6f7]" id="capabilities">
      <Container className="flex flex-col items-center gap-12 lg:gap-[80px]">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 lg:gap-6 max-w-[700px]"
        >
          <TitleSection title={t("featuresBadge")} />
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[52px] text-[#1b0c25] font-medium">
            {t("featuresTitle")}
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={bentoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.id}
              variants={bentoCardVariants}
              className="p-6 rounded-[16px] bg-white border border-[#1b0c25]/5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#d37bff]/10 flex items-center justify-center">
                  <cap.Icon className="w-5 h-5 text-[#d37bff]" />
                </div>
                <h3 className="text-[16px] font-medium text-[#1b0c25]">
                  {cap.title}
                </h3>
                <p className="text-[14px] leading-[22px] text-[#1b0c25]/60">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
