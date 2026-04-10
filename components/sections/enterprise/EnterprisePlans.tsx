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
import { Check } from "lucide-react";

export default function EnterprisePlans() {
  const t = useTranslations("enterprise");

  const plans = [
    {
      id: "school",
      title: t("planSchoolTitle"),
      description: t("planSchoolDescription"),
      features: Array.from({ length: 5 }, (_, i) =>
        t(`planSchoolFeature${i + 1}`),
      ),
      cta: t("planSchoolCta"),
      highlighted: false,
    },
    {
      id: "academy",
      title: t("planAcademyTitle"),
      description: t("planAcademyDescription"),
      badge: t("planAcademyBadge"),
      features: Array.from({ length: 6 }, (_, i) =>
        t(`planAcademyFeature${i + 1}`),
      ),
      cta: t("planAcademyCta"),
      highlighted: true,
    },
  ];

  return (
    <div className="px-4 py-16 lg:py-[120px]" id="plans">
      <Container className="flex flex-col items-center gap-12 lg:gap-[80px]">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 lg:gap-6 max-w-[700px]"
        >
          <TitleSection title={t("plansBadge")} />
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[52px] text-[#1b0c25] font-medium">
            {t("plansTitle")}
          </h2>
          <motion.p
            variants={fadeInUpDelayedVariants}
            className="text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#1b0c25]/60"
          >
            {t("plansDescription")}
          </motion.p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          variants={pricingContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-[800px]"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={pricingCardVariants}
              className={`relative flex flex-col p-6 lg:p-8 rounded-[20px] border transition-all duration-300 ${
                plan.highlighted
                  ? "border-[#d37bff] bg-white shadow-[0_4px_24px_rgba(211,123,255,0.12)]"
                  : "border-[#1b0c25]/8 bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-[12px] font-medium uppercase rounded-full bg-[#d37bff] text-white">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-6">
                {/* Plan header */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[22px] font-medium text-[#1b0c25]">
                    {plan.title}
                  </h3>
                  <p className="text-[14px] leading-[22px] text-[#1b0c25]/60">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#1b0c25]/5 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#1b0c25]" />
                      </div>
                      <p className="text-[14px] leading-[22px] text-[#1b0c25]/80">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link href="/contact" className="mt-auto">
                  <Button
                    className={`group w-full h-12 rounded-[8px] text-[15px] font-medium ${
                      plan.highlighted
                        ? "bg-[#1b0c25] hover:bg-[#1b0c25]/90 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]"
                        : "bg-white hover:bg-[#f7f6f7] text-[#1b0c25] border border-[#1b0c25]/15"
                    }`}
                  >
                    <span className="flex flex-col items-center h-[26px] overflow-hidden">
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {plan.cta}
                      </span>
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {plan.cta}
                      </span>
                    </span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
