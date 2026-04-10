"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import TitleSection from "@/components/TitleSection";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  fadeInUpDelayedVariants,
  workStepVariants,
  workContainerVariants,
  viewportSettings,
} from "@/lib/motion";
import { Video, Wifi, Search } from "lucide-react";

const LAYER_ICONS = [Video, Wifi, Search];

export default function ProcteoLayers() {
  const t = useTranslations("enterpriseProcteo");

  const layers = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    Icon: LAYER_ICONS[i],
    title: t(`layer${i + 1}Title`),
    description: t(`layer${i + 1}Description`),
  }));

  return (
    <div className="px-4 py-16 lg:py-[120px]">
      <Container className="flex flex-col items-center gap-12 lg:gap-[80px]">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 lg:gap-6 max-w-[700px]"
        >
          <TitleSection title={t("howItWorksBadge")} />
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[52px] text-[#1b0c25] font-medium">
            {t("howItWorksTitle")}
          </h2>
          <motion.p
            variants={fadeInUpDelayedVariants}
            className="text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#1b0c25]/60"
          >
            {t("howItWorksDescription")}
          </motion.p>
        </motion.div>

        {/* Layers */}
        <motion.div
          variants={workContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {layers.map((layer) => (
            <motion.div
              key={layer.id}
              variants={workStepVariants}
              className="relative p-6 lg:p-8 rounded-[20px] border border-[#1b0c25]/8 bg-white"
            >
              {/* Step number */}
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8 text-[60px] leading-none font-bold text-[#1b0c25]/5">
                {layer.id}
              </div>

              <div className="flex flex-col gap-5 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d37bff] to-[#80a9fc] flex items-center justify-center">
                  <layer.Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[20px] font-medium text-[#1b0c25]">
                  {layer.title}
                </h3>
                <p className="text-[15px] leading-[24px] text-[#1b0c25]/60">
                  {layer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
