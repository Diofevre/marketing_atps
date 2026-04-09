"use client";
import ProductCard from "../ProductCard";

import { Container } from "../ui/container";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  fadeInUpDelayedVariants,
  viewportSettings,
} from "@/lib/motion";

export default function ProductOverview() {
  return (
    <div className="py-12 lg:py-[80px]">
      <Container className="flex flex-col items-center">
          {/* Header Section */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-[24px] w-full"
          >
            {/* Title with badge */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-[12px] w-full lg:w-[800px] px-4 lg:px-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#1b0c25] rounded-sm shrink-0" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#1b0c25]">
                  Product Overview
                </span>
              </div>
              <p className="text-[30px] lg:text-[40px] px-4 sm:px-6 lg:px-[40px] font-medium text-center leading-[30px] lg:leading-[40px] text-[#1b0c25]">
                Explore the Power of MyATPS
              </p>
            </div>

            {/* Description */}
            <motion.div
              variants={fadeInUpDelayedVariants}
              className="px-4 sm:px-6 lg:px-[50px] w-full lg:w-[700px]"
            >
              <p className="text-sm sm:text-base lg:text-[17px] text-center leading-relaxed lg:leading-[28px] text-[#4c4c4c]">
                While other platforms offer just a question bank, MyATPS
                integrates quizzes, dictionary, library, collaboration,
                and AI assistance into one seamless workflow.
              </p>
            </motion.div>
          </motion.div>

        <ProductCard />
      </Container>
    </div>
  );
}
