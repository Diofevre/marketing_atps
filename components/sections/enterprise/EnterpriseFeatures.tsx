"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import TitleSection from "@/components/TitleSection";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  fadeInUpDelayedVariants,
  bentoCardVariants,
  bentoContainerVariants,
  viewportSettings,
} from "@/lib/motion";
import {
  Building2,
  ShieldCheck,
  BarChart3,
  GraduationCap,
  BookOpen,
  Zap,
} from "lucide-react";

const FEATURE_ICONS = [Building2, ShieldCheck, BarChart3, GraduationCap, BookOpen, Zap];

export default function EnterpriseFeatures() {
  const t = useTranslations("enterprise");

  const features = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    Icon: FEATURE_ICONS[i],
    title: t(`feature${i + 1}Title`),
    description: t(`feature${i + 1}Description`),
  }));

  return (
    <div className="px-4 py-16 lg:py-[120px] bg-[#f7f6f7]" id="features">
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
          <motion.p
            variants={fadeInUpDelayedVariants}
            className="text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#1b0c25]/60"
          >
            {t("featuresDescription")}
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={bentoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={bentoCardVariants}
              className="p-6 lg:p-8 rounded-[16px] bg-white border border-[#1b0c25]/5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#d37bff]/20 to-[#80a9fc]/20 flex items-center justify-center">
                  <feature.Icon className="w-5 h-5 text-[#1b0c25]" />
                </div>
                <h3 className="text-[17px] font-medium text-[#1b0c25]">
                  {feature.title}
                </h3>
                <p className="text-[14px] leading-[22px] text-[#1b0c25]/60">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
