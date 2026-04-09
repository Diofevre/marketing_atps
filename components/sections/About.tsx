"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import TitleSection from "../TitleSection";
import { Container } from "../ui/container";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export default function About() {
  const t = useTranslations("about");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const words = t("paragraph").split(" ");

  return (
    <div id="about" className="px-4">
      <div ref={container} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1b0c25] rounded-2xl px-4 sm:px-6">
          <div className="absolute inset-0 z-0">
            <div className="hidden lg:block absolute left-[-246px] top-[-186px] rounded-[603px] w-[658px] h-[548px] bg-[linear-gradient(148deg,#80a9fc_0%,#d37bff_31.09%,#fcab83_70.46%,#ff49d4_100%)] blur-[80px] opacity-[0.4]" />
            <div className="hidden lg:block absolute right-[-86px] top-[590px] rounded-[603px] w-[658px] h-[548px] bg-[linear-gradient(145deg,#efe8f6_0%,#d588fb_60.83%,#ff49d4_100%)] blur-[80px] opacity-[0.4]" />
            <div className="lg:hidden absolute inset-0 bg-[linear-gradient(148deg,#80a9fc_-20%,#d37bff_30%,#fcab83_80%,#ff49d4_120%)] opacity-20" />
          </div>

          <Container className="relative z-10">
            <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-5 lg:gap-[40px]">
              <TitleSection title={t("badge")} />

              <h2 className="flex flex-wrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[57px] text-center lg:text-left leading-snug sm:leading-snug md:leading-tight lg:leading-tight xl:leading-[66px] font-medium text-white">
                {words.map((word, i) => {
                  const start = i / words.length;
                  const end = start + 1 / words.length;
                  return (
                    <Word
                      key={i}
                      range={[start, end]}
                      progress={scrollYProgress}
                    >
                      {word}
                    </Word>
                );
              })}
            </h2>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word = ({ children, range, progress }: WordProps) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-[12px] lg:mr-[16px] mt-[6px]">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};
