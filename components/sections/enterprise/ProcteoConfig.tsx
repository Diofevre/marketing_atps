"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import TitleSection from "@/components/TitleSection";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  fadeInUpDelayedVariants,
  pricingCardVariants,
  pricingContainerVariants,
  viewportSettings,
} from "@/lib/motion";
import { ShieldOff, Shield, ShieldCheck } from "lucide-react";

export default function ProcteoConfig() {
  const t = useTranslations("enterpriseProcteo");

  const levels = [
    {
      id: "light",
      Icon: ShieldOff,
      title: t("configLightTitle"),
      description: t("configLightDescription"),
      intensity: 1,
      accent: "#86efac",
    },
    {
      id: "moderate",
      Icon: Shield,
      title: t("configModerateTitle"),
      description: t("configModerateDescription"),
      intensity: 2,
      accent: "#fbbf24",
    },
    {
      id: "strict",
      Icon: ShieldCheck,
      title: t("configStrictTitle"),
      description: t("configStrictDescription"),
      intensity: 3,
      accent: "#d37bff",
    },
  ];

  return (
    <div className="px-4 py-16 lg:py-[100px] bg-[#f7f6f7]" id="config">
      <Container className="flex flex-col items-center gap-12 lg:gap-[60px]">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 lg:gap-6 max-w-[700px]"
        >
          <TitleSection title={t("configBadge")} />
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] leading-tight lg:leading-[48px] text-[#1b0c25] font-medium">
            {t("configTitle")}
          </h2>
          <motion.p
            variants={fadeInUpDelayedVariants}
            className="text-[15px] leading-[26px] text-[#1b0c25]/55"
          >
            {t("configDescription")}
          </motion.p>
        </motion.div>

        {/* Config Levels */}
        <motion.div
          variants={pricingContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {levels.map((level) => (
            <motion.div
              key={level.id}
              variants={pricingCardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="group relative overflow-hidden p-6 lg:p-8 rounded-2xl bg-white border border-[#1b0c25]/6 hover:shadow-[0_8px_24px_rgba(27,12,37,0.06)] transition-shadow duration-300"
            >
              <div className="relative z-10 flex flex-col gap-4">
                {/* Icon + intensity dots */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#1b0c25]/5 border border-[#1b0c25]/8">
                    <level.Icon className="w-[18px] h-[18px] text-[#1b0c25]/70" />
                  </div>
                  <div className="flex gap-1" aria-hidden>
                    {[1, 2, 3].map((dot) => (
                      <span
                        key={dot}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          dot <= level.intensity ? "w-4" : "w-1.5"
                        }`}
                        style={{
                          backgroundColor:
                            dot <= level.intensity
                              ? level.accent
                              : "rgba(27,12,37,0.1)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-[18px] font-medium text-[#1b0c25]">
                  {level.title}
                </h3>
                <p className="text-[14px] leading-[22px] text-[#1b0c25]/55">
                  {level.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
