"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import TitleSection from "@/components/TitleSection";
import { motion } from "framer-motion";
import {
  heroTitleWordVariants,
  heroDescriptionVariants,
  heroButtonVariants,
} from "@/lib/motion";
import { Shield } from "lucide-react";

export default function ProcteoHero() {
  const t = useTranslations("enterpriseProcteo");
  const titleWords = t("heroTitle").split(" ");

  return (
    <div className="w-full pb-0 px-4 pt-[100px] lg:pt-[140px]">
      <div className="min-h-[550px] lg:min-h-[650px] bg-gradient-to-br from-[#0f0618] via-[#1b0c25] to-[#2d1640] rounded-2xl overflow-hidden relative">
        {/* Gradient orbs */}
        <div className="absolute top-[-80px] left-[20%] w-[350px] h-[350px] rounded-full bg-[linear-gradient(148deg,#ff49d4_0%,#d37bff_50%,#80a9fc_100%)] blur-[120px] opacity-15" />
        <div className="absolute bottom-[-80px] right-[20%] w-[300px] h-[300px] rounded-full bg-[linear-gradient(148deg,#80a9fc_0%,#d37bff_100%)] blur-[120px] opacity-15" />

        {/* Shield icon */}
        <motion.div
          className="hidden lg:flex absolute top-[15%] right-[12%] w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 items-center justify-center"
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-8 h-8 text-[#d37bff]/60" />
        </motion.div>

        <Container className="relative z-10 py-16 lg:py-[100px] flex flex-col items-center text-center gap-8 lg:gap-12">
          <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-[750px]">
            <TitleSection
              title={t("heroBadge")}
              className="border-[#d37bff]/50 bg-[#d37bff]/10 text-white"
            />

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-[52px] leading-tight lg:leading-[58px] text-white font-medium"
            >
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={heroTitleWordVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.08,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={heroDescriptionVariants}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[28px] text-white/60 max-w-[600px]"
            >
              {t("heroDescription")}
            </motion.p>

            <motion.div
              variants={heroButtonVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link href="/enterprise/demo">
                <Button className="group h-12 sm:h-[48px] px-8 bg-[#d37bff] hover:bg-[#d37bff]/90 text-white rounded-[8px] text-[15px] font-medium">
                  <span className="flex flex-col items-center h-[26px] overflow-hidden">
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {t("heroCtaPrimary")}
                    </span>
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {t("heroCtaPrimary")}
                    </span>
                  </span>
                </Button>
              </Link>
              <Link href="#capabilities">
                <Button
                  variant="outline"
                  className="group h-12 sm:h-[48px] px-8 border-white/30 text-white hover:bg-white/10 rounded-[8px] text-[15px] font-medium backdrop-blur-sm"
                >
                  <span className="flex flex-col items-center h-[26px] overflow-hidden">
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {t("heroCtaSecondary")}
                    </span>
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {t("heroCtaSecondary")}
                    </span>
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </div>
    </div>
  );
}
