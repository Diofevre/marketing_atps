"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import TitleSection from "@/components/TitleSection";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  pricingCardVariants,
  pricingContainerVariants,
  viewportSettings,
} from "@/lib/motion";
import { Check, Star } from "lucide-react";

export default function EnterprisePlans() {
  const t = useTranslations("enterprise");

  const plans = [
    {
      id: "school",
      title: t("planSchoolTitle"),
      description: t("planSchoolDescription"),
      features: Array.from({ length: 6 }, (_, i) => t(`planSchoolFeature${i + 1}`)),
      cta: t("planSchoolCta"),
      highlighted: false,
    },
    {
      id: "academy",
      title: t("planAcademyTitle"),
      description: t("planAcademyDescription"),
      badge: t("planAcademyBadge"),
      features: Array.from({ length: 8 }, (_, i) => t(`planAcademyFeature${i + 1}`)),
      cta: t("planAcademyCta"),
      highlighted: true,
    },
  ];

  return (
    <div className="px-4 py-16 lg:py-[100px]" id="plans">
      <Container>
        <div className="rounded-2xl overflow-hidden bg-white border border-[#1b0c25]/6">
          <div className="flex flex-col lg:flex-row">

            {/* Left — header */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="lg:w-[320px] shrink-0 p-8 lg:p-10 flex flex-col gap-5 lg:border-r border-[#1b0c25]/8 bg-[#f7f6f7]"
            >
              <TitleSection title={t("plansBadge")} />
              <h2 className="text-2xl lg:text-[36px] leading-tight lg:leading-[44px] text-[#1b0c25] font-medium">
                {t("plansTitle")}
              </h2>
              <p className="text-[14px] leading-[24px] text-[#1b0c25]/55">
                {t("plansDescription")}
              </p>
            </motion.div>

            {/* Right — plan cards */}
            <motion.div
              variants={pricingContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="flex-1 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#1b0c25]/6"
            >
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  variants={pricingCardVariants}
                  className={`relative flex-1 flex flex-col gap-6 p-6 lg:p-8 ${
                    plan.highlighted ? "bg-white" : "bg-white"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#1b0c25] text-white text-[11px] font-medium uppercase tracking-wide">
                      <Star className="w-3 h-3" fill="white" />
                      {plan.badge}
                    </span>
                  )}

                  {/* Plan header */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[20px] font-medium text-[#1b0c25]">
                      {plan.title}
                    </h3>
                    <p className="text-[13px] leading-[22px] text-[#1b0c25]/55">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-2.5 flex-1">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlighted ? "bg-[#1b0c25]" : "bg-[#1b0c25]/8"
                        }`}>
                          <Check className={`w-2.5 h-2.5 ${plan.highlighted ? "text-white" : "text-[#1b0c25]"}`} />
                        </div>
                        <p className="text-[13px] leading-[22px] text-[#1b0c25]/75">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/contact" className="mt-2">
                    <Button
                      className={`group w-full h-11 rounded-[8px] text-[14px] font-medium ${
                        plan.highlighted
                          ? "bg-[#1b0c25] hover:bg-[#1b0c25]/90 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.15)]"
                          : "bg-white hover:bg-[#f7f6f7] text-[#1b0c25] border border-[#1b0c25]/15"
                      }`}
                    >
                      <span className="flex flex-col items-center h-[24px] overflow-hidden">
                        <span className="block h-[24px] leading-[24px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                          {plan.cta}
                        </span>
                        <span className="block h-[24px] leading-[24px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                          {plan.cta}
                        </span>
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </Container>
    </div>
  );
}
