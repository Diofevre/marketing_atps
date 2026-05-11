"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Check, Star, Infinity as InfinityIcon } from "lucide-react";
import TitleSection from "../TitleSection";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  pricingContainerVariants,
  pricingCardVariants,
  viewportSettings,
} from "@/lib/motion";

import { APP_URL } from "@/lib/constants";

const PREMIUM_PRICE_EUR = 10;

export default function Pricing() {
  const t = useTranslations("pricing");

  const freeFeatures = [
    t("freeFeature1"),
    t("freeFeature2"),
    t("freeFeature3"),
    t("freeFeature4"),
    t("freeFeature5"),
  ];

  const premiumFeatures = [
    t("premiumFeature1"),
    t("premiumFeature2"),
    t("premiumFeature3"),
    t("premiumFeature4"),
    t("premiumFeature5"),
    t("premiumFeature6"),
    t("premiumFeature7"),
    t("premiumFeature8"),
  ];

  return (
    <div
      id="pricing"
      className="relative px-4 py-12 lg:py-[100px]"
    >
      <Container className="flex flex-col gap-12 lg:gap-16">
        {/* Header — items-start, oversized title, badge with live dot */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-start gap-6 lg:gap-7 max-w-4xl"
        >
          {/* Badge — same square + uppercase pattern as the hero */}
          <TitleSection title={t("marketBadge")} variant="dark" />

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#1b0c25] tracking-tight leading-tight lg:leading-[46px]">
            {t("title")}
          </h2>

          {/* Subtitle */}
          <p className="text-[#1b0c25]/65 text-base lg:text-lg leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={pricingContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full items-stretch"
        >
          {/* ==================== Free Plan ==================== */}
          <motion.div
            variants={pricingCardVariants}
            role="article"
            aria-label={t("freeName")}
            className="relative flex flex-col p-8 lg:p-10 bg-white rounded-3xl border border-[#1b0c25]/10 shadow-[0_1px_2px_rgba(27,12,37,0.04)] hover:shadow-[0_8px_30px_rgba(27,12,37,0.06)] transition-shadow duration-300"
          >
            <div className="flex flex-col gap-1.5 mb-6">
              <h3 className="text-2xl font-semibold text-[#1b0c25]">
                {t("freeName")}
              </h3>
              <p className="text-sm text-[#1b0c25]/60 leading-relaxed">
                {t("freeDescription")}
              </p>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl lg:text-6xl font-semibold text-[#1b0c25] tracking-tight">
                0€
              </span>
              <span className="text-[#1b0c25]/50 ml-1.5 text-sm">
                {t("freePriceSuffix")}
              </span>
            </div>
            <p className="text-sm text-[#1b0c25]/50 mb-7">
              {t("freePriceNote")}
            </p>

            <Link href={`${APP_URL}/auth/signup`} className="w-full mb-8">
              <Button
                variant="outline"
                className="group w-full h-12 text-[#1b0c25] border-[#1b0c25]/15 hover:bg-[#1b0c25] hover:text-white hover:border-[#1b0c25] overflow-hidden rounded-xl"
              >
                <span className="flex flex-col items-center h-[26px] overflow-hidden">
                  <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    {t("freeButton")}
                  </span>
                  <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    {t("freeButton")}
                  </span>
                </span>
              </Button>
            </Link>

            {/* Feature list — pushed to fill remaining vertical space so cards
                stay equal-height even though Free has fewer items. */}
            <div className="flex flex-col gap-3.5 mt-auto pt-6 border-t border-[#1b0c25]/8">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1b0c25]/5">
                    <Check className="w-3 h-3 text-[#1b0c25]" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-[#1b0c25]/85 leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ==================== Premium Plan ==================== */}
          <motion.div
            variants={pricingCardVariants}
            role="article"
            aria-label={t("premiumName")}
            className="relative flex flex-col p-8 lg:p-10 bg-[#1b0c25] rounded-3xl text-white shadow-[0_20px_50px_-12px_rgba(195,79,150,0.35)]"
          >
            {/* Soft pink corner glow inside the dark card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#c34f96]/30 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-[#80a9fc]/15 blur-3xl" />
            </div>

            {/* Recommended badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#c34f96] to-[#ff49d4] text-white text-xs font-semibold rounded-full shadow-lg shadow-[#c34f96]/30">
                <Star className="w-3 h-3" fill="white" />
                {t("premiumBadge")}
              </span>
            </div>

            <div className="relative flex flex-col gap-1.5 mb-6 mt-2">
              <h3 className="text-2xl font-semibold">{t("premiumName")}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {t("premiumDescription")}
              </p>
            </div>

            <div className="relative flex items-baseline gap-1 mb-1">
              <span className="text-5xl lg:text-6xl font-semibold tracking-tight">
                {PREMIUM_PRICE_EUR}€
              </span>
              <span className="text-white/55 ml-1.5 text-sm">
                {t("premiumPriceSuffix")}
              </span>
            </div>
            <p className="relative text-sm text-white/55 mb-7 flex items-center gap-1.5">
              <InfinityIcon className="w-4 h-4" />
              {t("premiumPriceNote")}
            </p>

            <Link
              href={`${APP_URL}/pricing?plan=PREMIUM`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full mb-8"
            >
              <Button className="group w-full h-12 bg-white hover:bg-white/95 text-[#1b0c25] overflow-hidden rounded-xl font-medium">
                <span className="flex flex-col items-center h-[26px] overflow-hidden">
                  <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    {t("premiumButton")}
                  </span>
                  <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    {t("premiumButton")}
                  </span>
                </span>
              </Button>
            </Link>

            <div className="relative flex flex-col gap-3.5 mt-auto pt-6 border-t border-white/10">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c34f96] to-[#ff49d4]">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-white/90 leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Market comparison footer */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="max-w-2xl"
        >
          <p className="text-sm text-[#1b0c25]/55 leading-relaxed">
            {t("comparisonNote")}
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
