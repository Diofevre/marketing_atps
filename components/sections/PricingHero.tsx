"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import TitleSection from "@/components/TitleSection";
import { motion } from "framer-motion";
import { CreditCard, Zap, ShieldCheck } from "lucide-react";
import {
  heroTitleWordVariants,
  heroDescriptionVariants,
  heroButtonVariants,
} from "@/lib/motion";
import { APP_URL } from "@/lib/constants";

export default function PricingHero() {
  const t = useTranslations("pricingPage");
  const tPricing = useTranslations("pricing");
  const titleWords = t("heroTitle").split(" ");

  return (
    <div className="w-full pb-0 px-4">
      <div className="min-h-[500px] relative flex items-center">
        <div className="relative z-10 w-full pt-24 lg:pt-28 pb-12 lg:pb-16">
          <Container className="flex flex-col gap-8 lg:gap-10">
            <div className="flex flex-col gap-6 lg:gap-7">
              <div className="flex flex-col items-start gap-5 lg:gap-6">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TitleSection title={t("heroEyebrow")} variant="dark" />
                </motion.div>

                <div className="flex flex-col items-start w-full lg:w-[860px] gap-3 lg:gap-[12px]">
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl lg:text-[60px] leading-tight lg:leading-[62px] text-[#1b0c25] font-medium"
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
                </div>

                {/* Description */}
                <motion.div
                  variants={heroDescriptionVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full lg:w-[620px]"
                >
                  <p className="text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[28px] font-normal text-[#1b0c25]/70">
                    {t("heroSubtitle")}
                  </p>
                </motion.div>
              </div>

              {/* CTAs — primary = Premium subscribe, secondary = Free account */}
              <motion.div
                variants={heroButtonVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link
                  href={`${APP_URL}/pricing?plan=PREMIUM`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="group h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 text-white rounded-[8px] text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.1)]">
                    <span className="flex flex-col items-center h-[26px] overflow-hidden">
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {tPricing("premiumButton")}
                      </span>
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {tPricing("premiumButton")}
                      </span>
                    </span>
                  </Button>
                </Link>
                <Link href={`${APP_URL}/auth/signup`}>
                  <Button
                    variant="outline"
                    className="group h-12 px-8 bg-white border border-[#1b0c25]/15 text-[#1b0c25] hover:bg-[#1b0c25]/5 rounded-[8px] text-[15px] font-medium"
                  >
                    <span className="flex flex-col items-center h-[26px] overflow-hidden">
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {tPricing("freeButton")}
                      </span>
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {tPricing("freeButton")}
                      </span>
                    </span>
                  </Button>
                </Link>
              </motion.div>

              {/* Trust strip — micro-badges reusing existing pricing.* keys */}
              <motion.div
                variants={heroButtonVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#1b0c25]/55 mt-2 lg:mt-3"
              >
                <span className="inline-flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#1b0c25]/50" />
                  {tPricing("freePriceNote")}
                </span>
                <span className="hidden sm:inline-block w-px h-3 bg-[#1b0c25]/15" />
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#1b0c25]/50" />
                  {tPricing("premiumPriceNote")}
                </span>
                <span className="hidden sm:inline-block w-px h-3 bg-[#1b0c25]/15" />
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1b0c25]/50" />
                  {tPricing("marketBadge")}
                </span>
              </motion.div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
