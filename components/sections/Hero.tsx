"use client";

import { useTranslations } from "next-intl";
import { ButtonDemoBlur } from "../ButtonDemo";
import { Container } from "../ui/container";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  heroTitleWordVariants,
  heroDescriptionVariants,
  heroButtonVariants,
  heroCardVariants,
} from "@/lib/motion";

export default function Hero() {
  const t = useTranslations("hero");
  const tStat = useTranslations("testimonials");

  // Split the localized title into words so each animates in independently.
  const titleWords = t("titleFull").split(" ");

  return (
    <div className="w-full pb-0 px-4">
      <div className="relative min-h-[850px] lg:min-h-[950px] rounded-2xl overflow-hidden">
        {/* ============================================================
            Background photo — A320 / commercial jet at sunset on tarmac.
            Wrapped in motion.div for a slow Ken Burns zoom (cinematic).
            ============================================================ */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{
            duration: 24,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src="/images/heroPlane.jpg"
            alt={t("aircraftAirplaneAlt")}
            fill
            sizes="100vw"
            priority
            className="object-cover object-[center_45%]"
          />
        </motion.div>

        {/* Vertical dark gradient — top clear, smooth fade to dark at the bottom for cards legibility */}
        <div
          className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_0%,transparent_50%,rgba(10,6,18,0.30)_70%,rgba(10,6,18,0.70)_88%,rgba(10,6,18,0.92)_100%)]"
          aria-hidden="true"
        />
        {/* Horizontal dark gradient — softer left side for text contrast */}
        <div
          className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(10,6,18,0.55)_0%,rgba(10,6,18,0.15)_55%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Atmospheric pulse — subtle "alive" sky breathing */}
        <motion.div
          className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,6,18,0.55)_100%)] pointer-events-none"
          animate={{ opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        />

        {/* ============================================================
            Content layer — left-aligned text + bottom-right info cards
            ============================================================ */}
        <div className="relative z-10 flex flex-col h-full px-4 sm:px-6 lg:px-0 pt-40 lg:pt-[240px] pb-8 lg:pb-[56px]">
          <Container className="flex-1 flex flex-col justify-between gap-10 lg:gap-12">
            {/* ===== Top block: Title + Subtitle + CTAs + Trust — left-aligned ===== */}
            <div className="flex flex-col gap-5 lg:gap-[26px] max-w-full lg:max-w-[820px]">
              {/* Title H1 — white, large, animated word-by-word */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] lg:leading-[1.06] text-white font-semibold tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
              >
                {titleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={heroTitleWordVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + index * 0.07,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                variants={heroDescriptionVariants}
                initial="hidden"
                animate="visible"
                className="max-w-[640px]"
              >
                <p className="text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[28px] font-normal text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
                  {t("subtitle")}
                </p>
              </motion.div>

              {/* CTAs — original ButtonDemoBlur (Get Started + Demo) */}
              <motion.div
                variants={heroButtonVariants}
                initial="hidden"
                animate="visible"
              >
                <ButtonDemoBlur />
              </motion.div>

              {/* Trust line + 3 inline counters */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3 sm:gap-x-5 sm:gap-y-2 pt-1"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-white/85 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] sm:text-[14px] text-white/85 font-medium">
                    {t("trustLine")}
                  </span>
                </div>
                <div
                  className="hidden sm:block w-px h-4 bg-white/25"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-x-4 gap-y-1 flex-wrap text-[13px] sm:text-[14px]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-semibold text-white">
                      {tStat("counter1Value")}
                    </span>
                    <span className="text-white/70">
                      {tStat("counter1Title")}
                    </span>
                  </div>
                  <span className="text-white/30" aria-hidden="true">
                    ·
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-semibold text-white">
                      {tStat("counter2Value")}
                    </span>
                    <span className="text-white/70">
                      {tStat("counter2Title")}
                    </span>
                  </div>
                  <span className="text-white/30" aria-hidden="true">
                    ·
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-semibold text-white">
                      {tStat("counter3Value")}
                    </span>
                    <span className="text-white/70">
                      {tStat("counter3Title")}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ===== Bottom-right info blocks — Astralynx style: thin top line + text only, no card bg ===== */}
            <motion.div
              variants={heroCardVariants}
              initial="hidden"
              animate="visible"
              className="self-end max-w-full lg:max-w-[600px] grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 pt-20"
            >
              <div className="border-t border-white/30 pt-3">
                <h3 className="text-white text-[14px] lg:text-[15px] font-semibold mb-1.5 tracking-tight">
                  {t("card1Title")}
                </h3>
                <p className="text-[12px] lg:text-[13px] leading-relaxed text-white/70">
                  {t("card1Desc")}
                </p>
              </div>
              <div className="border-t border-white/30 pt-3">
                <h3 className="text-white text-[14px] lg:text-[15px] font-semibold mb-1.5 tracking-tight">
                  {t("card2Title")}
                </h3>
                <p className="text-[12px] lg:text-[13px] leading-relaxed text-white/70">
                  {t("card2Desc")}
                </p>
              </div>
            </motion.div>
          </Container>
        </div>
      </div>
    </div>
  );
}
