"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  fadeInUpDelayedVariants,
  viewportSettings,
} from "@/lib/motion";

export default function ProcteoCTA() {
  const t = useTranslations("enterpriseProcteo");

  return (
    <div className="relative px-4 py-16 lg:py-[120px] overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35] [background-image:linear-gradient(to_right,rgba(27,12,37,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(27,12,37,0.06)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />
      <Container className="relative">
        <div className="flex flex-col items-center text-center gap-6 lg:gap-8 max-w-[560px] mx-auto py-8 lg:py-[60px]">
          <motion.h2
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="text-2xl sm:text-3xl lg:text-[40px] leading-tight lg:leading-[46px] text-[#1b0c25] font-medium"
          >
            {t("ctaTitle")}
          </motion.h2>

          <motion.p
            variants={fadeInUpDelayedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="text-base lg:text-[16px] leading-relaxed text-[#1b0c25]/55"
          >
            {t("ctaDescription")}
          </motion.p>

          <motion.div
            variants={fadeInUpDelayedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="flex flex-col items-center gap-3"
          >
            <Link href="/enterprise/demo">
              <Button className="group h-12 sm:h-[48px] px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 text-white rounded-[8px] text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.15)]">
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
            <p className="text-[13px] text-[#1b0c25]/40">
              {t("ctaContact")}{" "}
              <a
                href="mailto:enterprise@myatps.com"
                className="text-[#1b0c25]/60 hover:text-[#1b0c25] underline underline-offset-2 transition-colors"
              >
                enterprise@myatps.com
              </a>
            </p>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
