"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Star, Check, Gift } from "lucide-react";
import TitleSection from "../TitleSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUpVariants,
  pricingContainerVariants,
  pricingCardVariants,
  viewportSettings,
} from "@/lib/motion";

import { APP_URL } from "@/lib/constants";

// Numeric price table — locale-independent so we keep a single source of
// truth for every (plan, duration) combo. The user-visible text and labels
// are resolved via t() at render time.
const STANDARD_PRICES: Record<number, { total: number; perMonth: number; savings: number }> = {
  1: { total: 29, perMonth: 29, savings: 0 },
  2: { total: 49, perMonth: 24.5, savings: 16 },
  3: { total: 69, perMonth: 23, savings: 21 },
  6: { total: 109, perMonth: 18.17, savings: 37 },
  9: { total: 139, perMonth: 15.44, savings: 47 },
  12: { total: 159, perMonth: 13.25, savings: 54 },
};

const PREMIUM_PRICES: Record<number, { total: number; perMonth: number; savings: number }> = {
  1: { total: 39, perMonth: 39, savings: 0 },
  2: { total: 69, perMonth: 34.5, savings: 12 },
  3: { total: 89, perMonth: 29.67, savings: 24 },
  6: { total: 139, perMonth: 23.17, savings: 41 },
  9: { total: 169, perMonth: 18.78, savings: 52 },
  12: { total: 189, perMonth: 15.75, savings: 60 },
};

export default function Pricing() {
  const t = useTranslations("pricing");
  const [selectedDuration, setSelectedDuration] = useState(1);

  const DURATIONS = [
    { months: 1, label: t("duration1") },
    { months: 2, label: t("duration2") },
    { months: 3, label: t("duration3") },
    { months: 6, label: t("duration6") },
    { months: 9, label: t("duration9") },
    { months: 12, label: t("duration12") },
  ];

  const PLANS = {
    FREE: {
      id: "FREE",
      name: t("freeName"),
      badge: t("freeBadge"),
      description: t("freeDescription"),
      price: 0,
      priceLabel: t("freePriceLabel"),
      buttonText: t("freeButton"),
      buttonVariant: "outline" as const,
      popular: false,
      features: [
        { text: t("freeFeature1"), included: true },
        { text: t("freeFeature2"), included: true },
        { text: t("freeFeature3"), included: true },
        { text: t("freeFeature4"), included: true },
        { text: t("freeFeature5"), included: true },
        { text: t("freeFeature6"), included: false },
      ],
    },
    STANDARD: {
      id: "STANDARD",
      name: t("standardName"),
      description: t("standardDescription"),
      prices: STANDARD_PRICES,
      buttonText: t("standardButton"),
      buttonVariant: "outline" as const,
      popular: false,
      features: [
        { text: t("standardFeature1"), included: true },
        { text: t("standardFeature2"), included: true },
        { text: t("standardFeature3"), included: true },
        { text: t("standardFeature4"), included: true },
        { text: t("standardFeature5"), included: true },
        { text: t("standardFeature6"), included: true },
        { text: t("standardFeature7"), included: true },
        { text: t("standardFeature8"), included: true },
      ],
    },
    PREMIUM: {
      id: "PREMIUM",
      name: t("premiumName"),
      description: t("premiumDescription"),
      prices: PREMIUM_PRICES,
      buttonText: t("premiumButton"),
      buttonVariant: "primary" as const,
      popular: true,
      trial: t("premiumTrial"),
      features: [
        { text: t("premiumFeature1"), included: true },
        { text: t("premiumFeature2"), included: true },
        { text: t("premiumFeature3"), included: true },
        { text: t("premiumFeature4"), included: true },
        { text: t("premiumFeature5"), included: true },
        { text: t("premiumFeature6"), included: true },
        { text: t("premiumFeature7"), included: true },
        { text: t("premiumFeature8"), included: true },
      ],
    },
  };

  const getPrice = (plan: typeof PLANS.STANDARD | typeof PLANS.PREMIUM) => {
    const priceData = plan.prices[selectedDuration as keyof typeof plan.prices];
    return priceData;
  };

  return (
    <div id="pricing">
      {/* Header */}
      <div className="w-full py-12 sm:py-16 lg:py-[120px] px-4">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-[24px] text-center max-w-4xl mx-auto"
        >
          {/* Title with badge */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-[12px] w-full">
            <TitleSection
              title={t("badge")}
              className="shadow-[0_33px_13px_0_rgba(0,0,0,0.01),0_19px_11px_0_rgba(0,0,0,0.04),0_8px_8px_0_rgba(0,0,0,0.06),0_2px_5px_0_rgba(0,0,0,0.07)]"
            />
            <h2 className="text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[60px] text-center font-medium text-[#1b0c25]">
              {t("titleBold1")}{" "}
              <span className="text-[#1b0c25]/30">{t("titleMuted")}</span>{" "}
              {t("titleBold2")}
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-[17px] leading-relaxed lg:leading-[28px] text-center text-[#1b0c25] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* Duration Selector */}
          <div
            className="flex flex-wrap items-center justify-center gap-1 p-1 bg-gray-100 rounded-xl mt-2"
            role="group"
            aria-label={t("durationAriaLabel")}
          >
            {DURATIONS.map((duration) => (
              <button
                key={duration.months}
                onClick={() => setSelectedDuration(duration.months)}
                aria-pressed={selectedDuration === duration.months}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  selectedDuration === duration.months
                    ? "bg-white text-[#1b0c25] shadow-sm"
                    : "text-[#1b0c25]/50 hover:text-[#1b0c25]"
                }`}
              >
                {duration.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="py-12 lg:py-16 px-4">
        <Container className="flex flex-col gap-8">
          {/* Pricing Cards */}
          <motion.div
            variants={pricingContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Free Plan */}
            <motion.div
              variants={pricingCardVariants}
              className="flex flex-col p-6 bg-white rounded-2xl border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-semibold text-[#1b0c25]">
                  {PLANS.FREE.name}
                </h3>
                <span className="text-sm text-black font-medium">
                  {PLANS.FREE.badge}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {PLANS.FREE.description}
              </p>

              <div className="mb-2">
                <span className="text-5xl font-semibold text-[#1b0c25]">0€</span>
                <span className="text-[#1b0c25]/50 ml-1">
                  {PLANS.FREE.priceLabel}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                {t("freeSubtitle")}
              </p>

              <Link href={`${APP_URL}/auth/signup`} className="w-full mb-8">
                <Button
                  variant="outline"
                  className="group w-full h-12 text-[#1b0c25] border-[#1b0c25] hover:bg-[#1b0c25] hover:text-white overflow-hidden"
                >
                  <span className="flex flex-col items-center h-[26px] overflow-hidden">
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {PLANS.FREE.buttonText}
                    </span>
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {PLANS.FREE.buttonText}
                    </span>
                  </span>
                </Button>
              </Link>

              <div className="flex flex-col gap-3">
                {PLANS.FREE.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-[#1b0c25]" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#1b0c25]/20" />
                    )}
                    <span
                      className={`text-sm ${feature.included ? "text-[#1b0c25]" : "text-[#1b0c25]/60"}`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Standard Plan */}
            <motion.div
              variants={pricingCardVariants}
              className="flex flex-col p-6 bg-white rounded-2xl border border-gray-200"
            >
              <h3 className="text-2xl font-semibold text-[#1b0c25] mb-2">
                {PLANS.STANDARD.name}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {PLANS.STANDARD.description}
              </p>

              <div className="mb-2 flex items-baseline gap-1">
                <div className="h-[48px] overflow-hidden relative min-w-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={getPrice(PLANS.STANDARD).total}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-5xl font-semibold text-[#1b0c25] block"
                    >
                      {getPrice(PLANS.STANDARD).total}€
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[#1b0c25]/50">
                  {t(selectedDuration === 1 ? "perMonthOne" : "perMonthMany", {
                    count: selectedDuration,
                  })}
                </span>
              </div>
              <p className="text-sm text-black mb-6">
                {t("perMonthSavings", {
                  perMonth: getPrice(PLANS.STANDARD).perMonth.toFixed(2),
                  savings: getPrice(PLANS.STANDARD).savings,
                })}
              </p>

              <Link
                href={`${APP_URL}/pricing?plan=STANDARD&duration=${selectedDuration}`}
                target="_blank"
                className="w-full mb-8"
              >
                <Button
                  variant="outline"
                  className="group w-full h-12 text-[#1b0c25] border-[#1b0c25] hover:bg-[#1b0c25] hover:text-white overflow-hidden"
                >
                  <span className="flex flex-col items-center h-[26px] overflow-hidden">
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {PLANS.STANDARD.buttonText}
                    </span>
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {PLANS.STANDARD.buttonText}
                    </span>
                  </span>
                </Button>
              </Link>

              <div className="flex flex-col gap-3">
                {PLANS.STANDARD.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#1b0c25]" />
                    <span className="text-sm text-[#1b0c25]">{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              variants={pricingCardVariants}
              className="flex flex-col p-6 bg-white rounded-2xl border-2 border-black relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-1 px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                  <Star className="w-3 h-3" fill="white" />
                  {t("recommended")}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-[#1b0c25] mb-2 mt-2">
                {PLANS.PREMIUM.name}
              </h3>
              <p className="text-sm text-[#1b0c25]/60 mb-6">
                {PLANS.PREMIUM.description}
              </p>

              <div className="mb-2 flex items-baseline gap-1">
                <div className="h-[48px] overflow-hidden relative min-w-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={getPrice(PLANS.PREMIUM).total}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-5xl font-semibold text-[#1b0c25] block"
                    >
                      {getPrice(PLANS.PREMIUM).total}€
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[#1b0c25]/50">
                  {t(selectedDuration === 1 ? "perMonthOne" : "perMonthMany", {
                    count: selectedDuration,
                  })}
                </span>
              </div>
              <p className="text-sm text-black mb-6">
                {t("perMonthSavings", {
                  perMonth: getPrice(PLANS.PREMIUM).perMonth.toFixed(2),
                  savings: getPrice(PLANS.PREMIUM).savings,
                })}
              </p>

              <Link
                href={`${APP_URL}/pricing?plan=PREMIUM&duration=${selectedDuration}`}
                target="_blank"
                className="w-full mb-4"
              >
                <Button className="group w-full h-12 bg-black hover:bg-black/90 text-white overflow-hidden">
                  <span className="flex flex-col items-center h-[26px] overflow-hidden">
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {PLANS.PREMIUM.buttonText}
                    </span>
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {PLANS.PREMIUM.buttonText}
                    </span>
                  </span>
                </Button>
              </Link>

              <div className="flex items-center gap-2 mb-6 text-sm text-black">
                <Gift className="w-4 h-4" />
                <span>{PLANS.PREMIUM.trial}</span>
              </div>

              <div className="flex flex-col gap-3">
                {PLANS.PREMIUM.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-black" />
                    <span className="text-sm text-[#1b0c25]">{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
