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
      color: "from-green-400/20 to-green-500/10",
      iconColor: "text-green-600",
    },
    {
      id: "moderate",
      Icon: Shield,
      title: t("configModerateTitle"),
      description: t("configModerateDescription"),
      color: "from-amber-400/20 to-amber-500/10",
      iconColor: "text-amber-600",
    },
    {
      id: "strict",
      Icon: ShieldCheck,
      title: t("configStrictTitle"),
      description: t("configStrictDescription"),
      color: "from-[#d37bff]/20 to-[#d37bff]/5",
      iconColor: "text-[#d37bff]",
    },
  ];

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
          <TitleSection title={t("configBadge")} />
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[52px] text-[#1b0c25] font-medium">
            {t("configTitle")}
          </h2>
          <motion.p
            variants={fadeInUpDelayedVariants}
            className="text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#1b0c25]/60"
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-[900px]"
        >
          {levels.map((level) => (
            <motion.div
              key={level.id}
              variants={pricingCardVariants}
              className="p-6 lg:p-8 rounded-[20px] border border-[#1b0c25]/8 bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center`}>
                  <level.Icon className={`w-5 h-5 ${level.iconColor}`} />
                </div>
                <h3 className="text-[20px] font-medium text-[#1b0c25]">
                  {level.title}
                </h3>
                <p className="text-[14px] leading-[22px] text-[#1b0c25]/60">
                  {level.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 max-w-[500px]"
        >
          <h3 className="text-xl lg:text-[24px] font-medium text-[#1b0c25]">
            {t("ctaTitle")}
          </h3>
          <p className="text-[15px] leading-[24px] text-[#1b0c25]/60">
            {t("ctaDescription")}
          </p>
          <Link href="/enterprise/demo">
            <Button className="group h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[8px] text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]">
              <span className="flex flex-col items-center h-[26px] overflow-hidden">
                <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  {t("ctaButton")}
                </span>
                <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  {t("ctaButton")}
                </span>
              </span>
            </Button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
