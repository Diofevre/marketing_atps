"use client";

import { useState } from "react";
import Link from "next/link";
import TitleSection from "../TitleSection";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Star, Check, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUpVariants,
  pricingContainerVariants,
  pricingCardVariants,
  viewportSettings,
} from "@/lib/motion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const DURATIONS = [
  { months: 1, label: "1 month" },
  { months: 2, label: "2 months" },
  { months: 3, label: "3 months" },
  { months: 6, label: "6 months" },
  { months: 9, label: "9 months" },
  { months: 12, label: "12 months" },
];

const PLANS = {
  FREE: {
    id: "FREE",
    name: "Free",
    badge: "Starter",
    description: "Discover the platform with no commitment",
    price: 0,
    priceLabel: "forever",
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false,
    features: [
      { text: "Limited question bank access", included: true },
      { text: "Quiz mode STUDY (limited)", included: true },
      { text: "Aeronautical dictionary", included: true },
      { text: "Community forum (read only)", included: true },
      { text: "Video courses", included: false },
      { text: "ATC Simulator", included: false },
    ],
  },
  STANDARD: {
    id: "STANDARD",
    name: "Standard",
    description: "L'essentiel pour réussir votre ATPL",
    prices: {
      1: { total: 29, perMonth: 29, savings: 0 },
      2: { total: 49, perMonth: 24.5, savings: 16 },
      3: { total: 69, perMonth: 23, savings: 21 },
      6: { total: 109, perMonth: 18.17, savings: 37 },
      9: { total: 139, perMonth: 15.44, savings: 47 },
      12: { total: 159, perMonth: 13.25, savings: 54 },
    },
    buttonText: "Subscribe",
    buttonVariant: "outline" as const,
    popular: false,
    features: [
      { text: "Question Bank complète", included: true },
      { text: "Quiz mode STUDY illimité", included: true },
      { text: "Quiz mode TEST (5/jour)", included: true },
      { text: "Cours théoriques (TEXT)", included: true },
      { text: "Vidéos (10h/mois)", included: true },
      { text: "Progression & Stats basiques", included: true },
      { text: "Dictionnaire aviation", included: true },
      { text: "Bookmarks (50 max)", included: true },
    ],
  },
  PREMIUM: {
    id: "PREMIUM",
    name: "Premium",
    description: "Everything you need to excel and succeed from the first try",
    prices: {
      1: { total: 39, perMonth: 39, savings: 0 },
      2: { total: 69, perMonth: 34.5, savings: 12 },
      3: { total: 89, perMonth: 29.67, savings: 24 },
      6: { total: 139, perMonth: 23.17, savings: 41 },
      9: { total: 169, perMonth: 18.78, savings: 52 },
      12: { total: 189, perMonth: 15.75, savings: 60 },
    },
    buttonText: "Subscribe",
    buttonVariant: "primary" as const,
    popular: true,
    trial: "48h of free trial included",
    features: [
      { text: "Complete Question Bank", included: true },
      { text: "Quiz mode STUDY Unlimited", included: true },
      { text: "Quiz mode TEST Unlimited", included: true },
      { text: "Quiz mode EXAM Unlimited", included: true },
      { text: "Theoretical Courses (All formats)", included: true },
      { text: "Videos Unlimited", included: true },
      { text: "Advanced Progression & Stats", included: true },
      { text: "ATC Simulator Unlimited", included: true },
    ],
  },
};

export default function Pricing() {
  const [selectedDuration, setSelectedDuration] = useState(1);

  const getPrice = (plan: typeof PLANS.STANDARD | typeof PLANS.PREMIUM) => {
    const priceData = plan.prices[selectedDuration as keyof typeof plan.prices];
    return priceData;
  };

  const maxSavings = PLANS.PREMIUM.prices[12].savings;

  return (
    <div id="pricing" className="py-12 lg:py-[100px]">
      <Container className="flex flex-col gap-8">
        {/* Header Section */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl lg:text-5xl font-semibold text-[#1b0c25]">
              Choose your plan
            </h1>
            <p className="text-[#1b0c25]/60">
              Access to all tools to successfully pass your ATPL on the first
              try
            </p>
          </div>

          {/* Duration Selector */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-gray-100 rounded-lg">
            {DURATIONS.map((duration) => (
              <button
                key={duration.months}
                onClick={() => setSelectedDuration(duration.months)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedDuration === duration.months
                    ? "bg-white text-[#1b0c25] shadow-sm"
                    : "text-[#1b0c25]/60 hover:text-[#1b0c25]"
                }`}
              >
                {duration.label}
              </button>
            ))}
          </div>
        </motion.div>

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
              Perfect for getting started
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
                    className={`text-sm ${feature.included ? "text-[#1b0c25]" : "text-[#1b0c25]/40"}`}
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
                /{selectedDuration} month{selectedDuration > 1 ? "s" : ""}
              </span>
            </div>
            <p className="text-sm text-black mb-6">
              {getPrice(PLANS.STANDARD).perMonth.toFixed(2)}€/month • Save{" "}
              {getPrice(PLANS.STANDARD).savings}%
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
                Recommended
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
                /{selectedDuration} month{selectedDuration > 1 ? "s" : ""}
              </span>
            </div>
            <p className="text-sm text-black mb-6">
              {getPrice(PLANS.PREMIUM).perMonth.toFixed(2)}€/month • Save{" "}
              {getPrice(PLANS.PREMIUM).savings}%
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
  );
}
