"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import TitleSection from "@/components/TitleSection";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { fadeInUpVariants, viewportSettings } from "@/lib/motion";
import { ScanFace, BrainCircuit, HardDrive, Bell } from "lucide-react";

const FEATURE_ICONS = [ScanFace, BrainCircuit, HardDrive, Bell];

function ProgressItem({
  title,
  index,
  total,
  progress,
}: {
  title: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const buffer = 0.06;
  const dotOpacity = useTransform(
    progress,
    [start, start + buffer, end - buffer, end],
    [0.3, 1, 1, 0.3]
  );
  const lineWidth = useTransform(progress, [start, end], ["0%", "100%"]);

  return (
    <div className="flex items-center gap-3">
      <motion.div
        style={{ opacity: dotOpacity }}
        className="w-2 h-2 rounded-full bg-[#1b0c25] shrink-0"
      />
      <div className="relative flex-1 h-[1px] bg-[#1b0c25]/10 overflow-hidden rounded-full">
        <motion.div
          style={{ width: lineWidth }}
          className="absolute left-0 top-0 h-full bg-[#1b0c25]"
        />
      </div>
      <motion.span
        style={{ opacity: dotOpacity }}
        className="text-[12px] font-medium text-[#1b0c25] whitespace-nowrap"
      >
        {title}
      </motion.span>
    </div>
  );
}

function FeatureCard({
  feature,
  progress,
  index,
  total,
}: {
  feature: { id: number; Icon: React.ElementType; title: string; description: string };
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const buffer = 0.06;

  const scale = useTransform(
    progress,
    [start, start + buffer, end - buffer, end],
    [0.97, 1, 1, 0.97]
  );

  return (
    <motion.div
      style={{ scale }}
      className="flex items-start gap-5 p-5 lg:p-6 rounded-[18px] border border-[#1b0c25]/8 bg-white transition-shadow duration-300"
    >
      <div className="w-11 h-11 rounded-xl bg-[#1b0c25] flex items-center justify-center shrink-0 mt-0.5">
        <feature.Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[17px] font-medium text-[#1b0c25]">{feature.title}</h3>
        <p className="text-[14px] leading-[24px] text-[#1b0c25]/55">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function ProcteoShowcase() {
  const t = useTranslations("enterprise");
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Spring smoothing — makes scroll tracking feel physically damped
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReduced ? 1000 : 120,
    damping: prefersReduced ? 100 : 28,
    restDelta: 0.001,
  });

  const features = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    Icon: FEATURE_ICONS[i],
    title: t(`procteoFeature${i + 1}Title`),
    description: t(`procteoFeature${i + 1}Description`),
  }));


  return (
    <div id="procteo">
      {/* Sticky scroll zone */}
      <div ref={ref} className="relative" style={{ height: `${4 * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden px-4">
          <Container>
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-[80px]">

              {/* Left — sticky header + progress */}
              <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <TitleSection title={t("procteoSectionBadge")} />
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] leading-tight lg:leading-[50px] text-[#1b0c25] font-medium">
                    {t("procteoSectionTitle")}
                  </h2>
                  <p className="text-[15px] leading-[26px] text-[#1b0c25]/60">
                    {t("procteoSectionDescription")}
                  </p>
                </div>

                {/* Progress indicators */}
                <div className="flex flex-col gap-3">
                  {features.map((feature, i) => (
                    <ProgressItem
                      key={feature.id}
                      title={feature.title}
                      index={i}
                      total={4}
                      progress={smoothProgress}
                    />
                  ))}
                </div>

                <Link href="/enterprise/demo" className="hidden lg:block">
                  <Button className="group h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[8px] text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]">
                    <span className="flex flex-col items-center h-[26px] overflow-hidden">
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {t("procteoCtaButton")}
                      </span>
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {t("procteoCtaButton")}
                      </span>
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Right — animated feature cards */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                {features.map((feature, i) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    progress={smoothProgress}
                    index={i}
                    total={4}
                  />
                ))}
              </div>

            </div>
          </Container>
        </div>
      </div>

      {/* CTA bottom — mobile + desktop */}
      <div className="px-4 pb-16 lg:pb-[100px]">
        <Container>
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="flex flex-col items-center text-center gap-4 max-w-[500px] mx-auto lg:hidden"
          >
            <h3 className="text-xl font-medium text-[#1b0c25]">{t("procteoCtaTitle")}</h3>
            <p className="text-[15px] leading-[24px] text-[#1b0c25]/60">{t("procteoCtaDescription")}</p>
            <Link href="/enterprise/demo">
              <Button className="group h-12 px-8 bg-[#1b0c25] hover:bg-[#1b0c25]/90 rounded-[8px] text-[15px] font-medium">
                <span className="flex flex-col items-center h-[26px] overflow-hidden">
                  <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    {t("procteoCtaButton")}
                  </span>
                  <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    {t("procteoCtaButton")}
                  </span>
                </span>
              </Button>
            </Link>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
