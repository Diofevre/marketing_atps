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

export default function EnterpriseCTA() {
  const t = useTranslations("enterprise");

  return (
    <div className="px-4 py-16 lg:py-[120px]">
      <Container>
        <div className="relative rounded-[20px] bg-[#1b0c25] overflow-hidden px-6 lg:px-0 py-16 lg:py-[100px]">
          {/* Gradient orbs */}
          <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-[linear-gradient(148deg,#80a9fc_0%,#d37bff_50%,#ff49d4_100%)] blur-[100px] opacity-30" />
          <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-[linear-gradient(148deg,#fcab83_0%,#d37bff_50%,#80a9fc_100%)] blur-[100px] opacity-20" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6 lg:gap-8 max-w-[600px] mx-auto">
            <motion.h2
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="text-2xl sm:text-3xl lg:text-[40px] leading-tight lg:leading-[46px] text-white font-medium"
            >
              {t("ctaTitle")}
            </motion.h2>

            <motion.p
              variants={fadeInUpDelayedVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="text-base lg:text-[16px] leading-relaxed text-white/60"
            >
              {t("ctaDescription")}
            </motion.p>

            <motion.div
              variants={fadeInUpDelayedVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="flex flex-col items-center gap-4"
            >
              <Link href="/contact">
                <Button className="group h-12 sm:h-[48px] px-8 bg-white hover:bg-white/90 text-[#1b0c25] rounded-[8px] text-[15px] font-medium">
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
              <p className="text-[14px] text-white/40">
                {t("ctaContact")}{" "}
                <a
                  href="mailto:enterprise@myatps.com"
                  className="text-white/60 hover:text-white underline transition-colors"
                >
                  enterprise@myatps.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
