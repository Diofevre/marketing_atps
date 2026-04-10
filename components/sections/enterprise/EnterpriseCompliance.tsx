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
  ShieldCheck,
  Plane,
  Lock,
  Scale,
  Globe,
  FileCheck,
} from "lucide-react";

const COMPLIANCE_ICONS = [ShieldCheck, Plane, Lock, Scale, Globe, FileCheck];

export default function EnterpriseCompliance() {
  const t = useTranslations("enterprise");

  const items = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    Icon: COMPLIANCE_ICONS[i],
    title: t(`compliance${i + 1}Title`),
    description: t(`compliance${i + 1}Description`),
  }));

  return (
    <div className="px-4 py-16 lg:py-[120px]" id="compliance">
      <Container className="flex flex-col items-center gap-12 lg:gap-[80px]">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 lg:gap-6 max-w-[750px]"
        >
          <TitleSection title={t("complianceBadge")} />
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[52px] text-[#1b0c25] font-medium">
            {t("complianceTitle")}
          </h2>
          <motion.p
            variants={fadeInUpDelayedVariants}
            className="text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#1b0c25]/60"
          >
            {t("complianceDescription")}
          </motion.p>
        </motion.div>

        {/* Compliance Grid */}
        <motion.div
          variants={bentoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={bentoCardVariants}
              className="p-6 lg:p-8 rounded-[16px] bg-white border border-[#1b0c25]/5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                  <item.Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-[17px] font-medium text-[#1b0c25]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[22px] text-[#1b0c25]/60">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
