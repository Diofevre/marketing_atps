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
    <div className="px-4 py-16 lg:py-[100px]">
      <Container className="flex flex-col items-center gap-12 lg:gap-[60px]">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 lg:gap-6 max-w-[700px]"
        >
          <TitleSection title={t("howItWorksBadge")} />
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] leading-tight lg:leading-[48px] text-[#1b0c25] font-medium">
            {t("howItWorksTitle")}
          </h2>
          <motion.p
            variants={fadeInUpDelayedVariants}
            className="text-[15px] leading-[26px] text-[#1b0c25]/55"
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
          className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {/* Connecting line — desktop only */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="hidden lg:block absolute top-[68px] left-[16%] right-[16%] h-px origin-left bg-[linear-gradient(90deg,transparent_0%,#d37bff_15%,#80a9fc_50%,#d37bff_85%,transparent_100%)] opacity-40 pointer-events-none"
          />

          {layers.map((layer) => (
            <motion.div
              key={layer.id}
              variants={workStepVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="group relative p-6 lg:p-8 rounded-[24px] bg-white border border-[#1b0c25]/6 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_2px_8px_rgba(27,12,37,0.04)] hover:shadow-[0_12px_32px_rgba(27,12,37,0.08)] transition-shadow duration-300 overflow-hidden"
            >
              {/* Gradient wash on hover */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(148deg,rgba(211,123,255,0.04)_0%,rgba(128,169,252,0.04)_100%)] pointer-events-none"
              />

              {/* Giant gradient step number */}
              <span
                aria-hidden
                className="absolute top-4 right-5 lg:top-6 lg:right-7 text-[96px] lg:text-[120px] leading-none font-bold tracking-tight bg-[linear-gradient(148deg,#d37bff_0%,#80a9fc_100%)] bg-clip-text text-transparent opacity-[0.08] group-hover:opacity-[0.14] transition-opacity duration-500 pointer-events-none select-none"
              >
                {layer.id}
              </span>

              <div className="flex flex-col gap-5 relative z-10">
                {/* Icon with glow */}
                <div className="relative w-14 h-14">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-2xl bg-[linear-gradient(148deg,#d37bff_0%,#80a9fc_100%)] blur-[18px] opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  />
                  <div className="relative w-14 h-14 rounded-2xl bg-[linear-gradient(148deg,#d37bff_0%,#80a9fc_100%)] flex items-center justify-center shadow-[0_4px_12px_rgba(211,123,255,0.35)]">
                    <layer.Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                </div>

                <h3 className="text-[20px] lg:text-[22px] font-medium text-[#1b0c25] leading-tight">
                  {layer.title}
                </h3>
                <p className="text-[15px] leading-[24px] text-[#1b0c25]/55">
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
