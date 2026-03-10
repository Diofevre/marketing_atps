"use client";

// KeyBenfist.tsx
import React from "react";
import TitleSection from "../TitleSection";
import BenefistCard from "../BenefistCard";
import { Container } from "../ui/container";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  benefitContainerVariants,
  viewportSettings,
} from "@/lib/motion";

export default function KeyBenfist() {
  return (
    <motion.div
      variants={benefitContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="py-12 sm:py-16 lg:py-[200px]"
    >
      <Container className="flex items-center flex-col gap-6 sm:gap-8 lg:gap-[60px]">
          {/* Header Section */}
          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-[24px] px-4 sm:px-6 lg:px-[220px]"
          >
            {/* Title with badge */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-[12px] w-full">
              <TitleSection
                title="Key Benefits"
                className="shadow-[0_33px_13px_0_rgba(0,0,0,0.01),0_19px_11px_0_rgba(0,0,0,0.04),0_8px_8px_0_rgba(0,0,0,0.06),0_2px_5px_0_rgba(0,0,0,0.07)]"
              />
              <p className="text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[60px] text-center font-medium text-[#1b0c25]">
                Why Choose MyATPS
              </p>
            </div>

            {/* Description */}
            <div className="w-full">
              <p className="text-sm sm:text-base lg:text-[17px] leading-relaxed lg:leading-[28px] text-center text-[#1b0c25] max-w-2xl mx-auto">
                MyATPS gives student pilots every advantage to pass their ATPL
                exams on the first try — with smarter tools, real exam conditions,
                and an AI tutor always by their side.
              </p>
            </div>
          </motion.div>

        <div className="w-full">
          <BenefistCard />
        </div>
      </Container>
    </motion.div>
  );
}
