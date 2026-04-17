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
  heroCardVariants,
} from "@/lib/motion";

export default function EnterpriseHero() {
  const t = useTranslations("enterprise");
  const titleWords = t("heroTitle").split(" ");

  return (
    <div className="w-full pb-0 px-4">
      <div className="min-h-[700px] lg:min-h-[820px] bg-linear-to-br from-[#1b0c25] via-[#2d1640] to-[#1b0c25] rounded-2xl overflow-hidden relative">
        {/* Gradient orbs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-[linear-gradient(148deg,#80a9fc_0%,#d37bff_50%,#ff49d4_100%)] blur-[120px] opacity-20" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[linear-gradient(148deg,#fcab83_0%,#d37bff_50%,#80a9fc_100%)] blur-[120px] opacity-20" />

        <div className="relative z-10 flex flex-col gap-8 lg:gap-[60px] px-4 sm:px-6 lg:px-0 pt-28 lg:pt-[160px] h-full">
          <Container className="flex flex-col gap-6 lg:gap-[40px]">
            <div className="flex flex-col gap-4 lg:gap-[24px]">
              <div className="flex flex-col items-start gap-4 lg:gap-[24px]">

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TitleSection title={t("heroBadge")} variant="light" />
                </motion.div>

                <div className="flex flex-col items-start w-full lg:w-[860px] gap-3 lg:gap-[12px]">
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl lg:text-[60px] leading-tight lg:leading-[62px] text-white font-medium"
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
                  <p className="text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[28px] font-normal text-white/70">
                    {t("heroDescription")}
                  </p>
                </motion.div>
              </div>

              {/* CTAs */}
              <motion.div
                variants={heroButtonVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link href="/enterprise/demo">
                  <Button className="group h-12 px-8 bg-white hover:bg-white/90 text-[#1b0c25] rounded-[8px] text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]">
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
                    className="group h-12 px-8 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-[8px] text-[15px] font-medium backdrop-blur-sm"
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

          {/* Bottom card — glassmorphism, same style as landing */}
          <Container className="flex-1 flex flex-col">
            <motion.div
              variants={heroCardVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 flex items-end justify-center w-full border border-white/10 border-b-0 relative rounded-tl-[20px] sm:rounded-tl-[30px] lg:rounded-tl-[40px] rounded-tr-[20px] sm:rounded-tr-[30px] lg:rounded-tr-[40px] rounded-b-none backdrop-blur-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.08)_100%)] overflow-hidden min-h-[180px] lg:min-h-[220px]"
            >
              {/* Stats row */}
              <motion.div
                variants={heroButtonVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full flex flex-wrap justify-center gap-8 lg:gap-16 py-10 lg:py-14"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-2xl lg:text-[36px] font-semibold text-white">
                      {t(`heroStat${i}Value`)}
                    </span>
                    <span className="text-[12px] text-white/50 uppercase tracking-widest">
                      {t(`heroStat${i}Label`)}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </div>
    </div>
  );
}
