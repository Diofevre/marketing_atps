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
    <div className="px-4 py-16 lg:py-[100px]" id="compliance">
      <Container>
        <div className="rounded-2xl overflow-hidden bg-white border border-[#1b0c25]/6 relative">

          <div className="flex flex-col lg:flex-row">

            {/* Left — header */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="lg:w-[360px] shrink-0 p-8 lg:p-12 flex flex-col gap-6 lg:border-r border-[#1b0c25]/8 bg-[#f7f6f7]"
            >
              <TitleSection title={t("complianceBadge")} />
              <h2 className="text-3xl lg:text-[40px] leading-tight lg:leading-[48px] text-[#1b0c25] font-medium">
                {t("complianceTitle")}
              </h2>
              <p className="text-[15px] leading-[26px] text-[#1b0c25]/55">
                {t("complianceDescription")}
              </p>

              {/* Visual accent */}
              <div className="flex items-center gap-2 mt-auto pt-4">
                <ShieldCheck className="w-5 h-5 text-[#1b0c25]/20" />
                <div className="h-px flex-1 bg-[#1b0c25]/10" />
                <Globe className="w-5 h-5 text-[#1b0c25]/20" />
                <div className="h-px flex-1 bg-[#1b0c25]/10" />
                <Scale className="w-5 h-5 text-[#1b0c25]/20" />
              </div>
            </motion.div>

            {/* Right — items list */}
            <motion.div
              variants={bentoContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="flex-1 grid grid-cols-1 sm:grid-cols-2 divide-y divide-[#1b0c25]/6 sm:divide-y-0"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={bentoCardVariants}
                  className={`flex items-start gap-4 p-6 lg:p-8 hover:bg-[#f7f6f7] transition-colors duration-200
                    ${i % 2 === 0 ? "sm:border-r border-[#1b0c25]/6" : ""}
                    ${i < 4 ? "sm:border-b border-[#1b0c25]/6" : ""}
                  `}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1b0c25]/5 border border-[#1b0c25]/8 flex items-center justify-center shrink-0 mt-0.5">
                    <item.Icon className="w-4 h-4 text-[#1b0c25]/70" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[15px] font-medium text-[#1b0c25]">
                      {item.title}
                    </h3>
                    <p className="text-[13px] leading-[22px] text-[#1b0c25]/50">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </Container>
    </div>
  );
}
