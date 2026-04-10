"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
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
  ScanFace,
  BrainCircuit,
  HardDrive,
  Bell,
} from "lucide-react";

const FEATURE_ICONS = [ScanFace, BrainCircuit, HardDrive, Bell];

export default function ProcteoShowcase() {
  const t = useTranslations("enterprise");

  const features = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    Icon: FEATURE_ICONS[i],
    title: t(`procteoFeature${i + 1}Title`),
    description: t(`procteoFeature${i + 1}Description`),
  }));

  return (
    <div className="px-4 py-16 lg:py-[120px]" id="procteo">
      <Container className="flex flex-col items-center gap-12 lg:gap-[80px]">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 lg:gap-6 max-w-[700px]"
        >
          <TitleSection title={t("procteoSectionBadge")} />
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[52px] text-[#1b0c25] font-medium">
            {t("procteoSectionTitle")}
          </h2>
          <motion.p
            variants={fadeInUpDelayedVariants}
            className="text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#1b0c25]/60"
          >
            {t("procteoSectionDescription")}
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={bentoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full max-w-[900px]"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={bentoCardVariants}
              className="relative p-6 lg:p-8 rounded-[16px] border border-[#1b0c25]/8 bg-[#f7f6f7] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1b0c25] flex items-center justify-center">
                  <feature.Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[18px] font-medium text-[#1b0c25]">
                  {feature.title}
                </h3>
                <p className="text-[15px] leading-[24px] text-[#1b0c25]/60">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA to demo */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 max-w-[500px]"
        >
          <h3 className="text-xl lg:text-[24px] font-medium text-[#1b0c25]">
            {t("procteoCtaTitle")}
          </h3>
          <p className="text-[15px] leading-[24px] text-[#1b0c25]/60">
            {t("procteoCtaDescription")}
          </p>
          <Link href="/enterprise/demo">
            <Button className="group h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[8px] text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]">
              <span className="flex flex-col items-center h-[26px] overflow-hidden">
                <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  {t("procteoCtaButton")}
                </span>
                <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  {t("procteoCtaButton")}
                </span>
              </span>
            </Button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
