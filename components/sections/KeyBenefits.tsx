"use client";

import React from "react";

import BenefitCard from "../BenefitCard";
import { Container } from "../ui/container";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  benefitContainerVariants,
  viewportSettings,
} from "@/lib/motion";

export default function KeyBenefits() {
  return (
    <motion.div
      variants={benefitContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="py-12 lg:py-[80px]"
    >
      <Container className="flex items-center flex-col gap-6 sm:gap-8 lg:gap-[60px]">
          {/* Header Section */}
          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-[24px] px-4 sm:px-6 lg:px-[220px]"
          >
            {/* Title with badge */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-[12px] w-full">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#1b0c25] rounded-sm shrink-0" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#1b0c25]">
                  Key Benefits
                </span>
              </div>
              <p className="text-[30px] lg:text-[40px] leading-[30px] lg:leading-[40px] text-center font-medium text-[#1b0c25]">
                Why Choose MyATPS
              </p>
            </div>

            {/* Description */}
            <div className="w-full">
              <p className="text-sm sm:text-base lg:text-[17px] leading-relaxed lg:leading-[28px] text-center text-[#1b0c25] max-w-2xl mx-auto">
                Other platforms give you questions. MyATPS gives you an
                entire study ecosystem — from research-backed explanations
                and 3D models to live group quizzes and built-in flight tools.
              </p>
            </div>
          </motion.div>

        <div className="w-full">
          <BenefitCard />
        </div>
      </Container>
    </motion.div>
  );
}
