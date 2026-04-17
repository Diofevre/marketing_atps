"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Check, Star, Sparkles, Infinity as InfinityIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  pricingContainerVariants,
  pricingCardVariants,
  viewportSettings,
} from "@/lib/motion";

import { APP_URL } from "@/lib/constants";

// Single source of truth for the monthly Premium price. Everything else
// (JSON-LD, hero copy, SEO pages) should reference the same number via
// i18n keys so we never ship inconsistent prices.
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
    <div id="pricing" className="py-12 lg:py-[100px]">
      <Container className="flex flex-col gap-10">
        {/* Header Section */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-[#1b0c25] bg-[#1b0c25]/5 rounded-full border border-[#1b0c25]/10">
            <Sparkles className="w-3.5 h-3.5" />
            {t("marketBadge")}
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#1b0c25]">
            {t("title")}
          </h2>
          <p className="text-[#1b0c25]/60 text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={pricingContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full"
        >
          {/* Free Plan */}
          <motion.div
            variants={pricingCardVariants}
            role="article"
            aria-label={t("freeName")}
            className="flex flex-col p-8 bg-white rounded-2xl border border-gray-200"
          >
            <h3 className="text-2xl font-semibold text-[#1b0c25] mb-1">
              {t("freeName")}
            </h3>
            <p className="text-sm text-[#1b0c25]/60 mb-6">
              {t("freeDescription")}
            </p>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-semibold text-[#1b0c25]">0€</span>
              <span className="text-[#1b0c25]/50 ml-1">{t("freePriceSuffix")}</span>
            </div>
            <p className="text-sm text-[#1b0c25]/50 mb-6">
              {t("freePriceNote")}
            </p>

            <Link href={`${APP_URL}/auth/signup`} className="w-full mb-8">
              <Button
                variant="outline"
                className="group w-full h-12 text-[#1b0c25] border-[#1b0c25] hover:bg-[#1b0c25] hover:text-white overflow-hidden"
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

            <div className="flex flex-col gap-3">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#1b0c25]" />
                  <span className="text-sm text-[#1b0c25]">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            variants={pricingCardVariants}
            role="article"
            aria-label={t("premiumName")}
            className="flex flex-col p-8 bg-white rounded-2xl border-2 border-black relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="flex items-center gap-1 px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                <Star className="w-3 h-3" fill="white" />
                {t("premiumBadge")}
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-[#1b0c25] mb-1 mt-2">
              {t("premiumName")}
            </h3>
            <p className="text-sm text-[#1b0c25]/60 mb-6">
              {t("premiumDescription")}
            </p>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-semibold text-[#1b0c25]">
                {PREMIUM_PRICE_EUR}€
              </span>
              <span className="text-[#1b0c25]/50 ml-1">{t("premiumPriceSuffix")}</span>
            </div>
            <p className="text-sm text-[#1b0c25]/50 mb-6 flex items-center gap-1.5">
              <InfinityIcon className="w-4 h-4" />
              {t("premiumPriceNote")}
            </p>

            <Link
              href={`${APP_URL}/pricing?plan=PREMIUM`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-8"
            >
              <Button className="group w-full h-12 bg-black hover:bg-black/90 text-white overflow-hidden">
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

            <div className="flex flex-col gap-3">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-sm text-[#1b0c25]">{feature}</span>
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
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-sm text-[#1b0c25]/60">
            {t("comparisonNote")}
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
