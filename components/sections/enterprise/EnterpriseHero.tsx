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
import {
  Shield,
  Users,
  BarChart3,
  GraduationCap,
} from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Shield, delay: 0, x: "10%", y: "20%" },
  { Icon: Users, delay: 0.5, x: "85%", y: "15%" },
  { Icon: BarChart3, delay: 1, x: "75%", y: "75%" },
  { Icon: GraduationCap, delay: 1.5, x: "15%", y: "70%" },
];

export default function EnterpriseHero() {
  const t = useTranslations("enterprise");
  const titleWords = t("heroTitle").split(" ");

  return (
    <div className="w-full pb-0 px-4 pt-[100px] lg:pt-[140px]">
      <div className="min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-[#1b0c25] via-[#2d1640] to-[#1b0c25] rounded-2xl overflow-hidden relative">
        {/* Gradient orbs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-[linear-gradient(148deg,#80a9fc_0%,#d37bff_50%,#ff49d4_100%)] blur-[120px] opacity-20" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[linear-gradient(148deg,#fcab83_0%,#d37bff_50%,#80a9fc_100%)] blur-[120px] opacity-20" />

        {/* Floating icons - desktop only */}
        {FLOATING_ICONS.map(({ Icon, delay, x, y }, i) => (
          <motion.div
            key={i}
            className="hidden lg:flex absolute w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 items-center justify-center"
            style={{ left: x, top: y }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon className="w-5 h-5 text-white/40" />
          </motion.div>
        ))}

        <Container className="relative z-10 py-16 lg:py-[100px] flex flex-col items-center text-center gap-8 lg:gap-12">
          <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-[800px]">
            <TitleSection
              title={t("heroBadge")}
              className="border-white/30 bg-white/10 text-white"
            />

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[62px] text-white font-medium"
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
              className="text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[28px] text-white/70 max-w-[650px]"
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
                <Button className="group h-12 sm:h-[48px] px-8 bg-white hover:bg-white/90 text-[#1b0c25] rounded-[8px] text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]">
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
              <Link href="/contact">
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
