"use client";

import Image from "next/image";

import { Container } from "../ui/container";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  bentoContainerVariants,
  bentoCardVariants,
  viewportSettings,
} from "@/lib/motion";

export default function Bento() {
  return (
    <div id="bento">
      <div className="w-full min-h-[1664px] py-12 lg:py-[80px] flex items-center justify-center">
        <Container>
          <motion.div
            variants={bentoContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="flex flex-col items-center gap-8 lg:gap-[60px]"
          >
            {/* Header Section */}
            <motion.div
              variants={fadeInUpVariants}
              className="flex items-center flex-col gap-4 lg:gap-[24px] w-full lg:w-[800px]"
            >
              <div className="flex items-center flex-col gap-3 lg:gap-[12px] w-full">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#1b0c25] rounded-sm shrink-0" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#1b0c25]">
                    Features & Modules
                  </span>
                </div>
                <div className="w-full px-4 lg:px-0">
                  <h1 className="text-[30px] lg:text-[40px] font-medium leading-[30px] lg:leading-[40px] text-center text-[#1b0c25]">
                    The complete ATPL preparation platform
                  </h1>
                </div>
              </div>
              <div className="w-full lg:w-[700px] px-4 lg:px-0">
                <p className="text-sm sm:text-base lg:text-[17px] font-normal text-center text-[#1b0c25] leading-relaxed lg:leading-[28px]">
                  No other platform combines a quiz engine, aviation dictionary,
                  live sharing, resource library, and built-in study tools
                  in a single environment — MyATPS does.
                </p>
              </div>
            </motion.div>

            {/* Bento Grid */}
            <motion.div
              variants={bentoContainerVariants}
              className="flex flex-col gap-4 lg:gap-[24px] w-full"
            >
              {/* First Row */}
              <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-[24px] justify-center w-full">
                {/* Card 1 - Advanced Quiz Interface */}
                <motion.div
                  variants={bentoCardVariants}
                  className="flex flex-col items-center gap-4 lg:gap-[30px] p-2 sm:p-4 lg:p-[8px] w-full lg:w-[496.81px] bg-white/60 backdrop-blur-sm rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-white/80"
                >
                  <div className="w-full aspect-480/354 rounded-xl overflow-hidden">
                    <Image
                      src="/images/imageAd.png"
                      alt="Advanced Quiz Interface"
                      width={480}
                      height={354}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 lg:gap-[19px] px-4 sm:px-6 lg:px-[22px] pb-4 sm:pb-6 lg:pb-[22px]">
                    <h1 className="text-lg sm:text-xl lg:text-[22px] leading-snug lg:leading-[28px] font-medium text-[#1b0c25]">
                      Advanced Quiz Interface
                    </h1>
                    <p className="text-sm sm:text-base lg:text-[15px] leading-relaxed lg:leading-[26px] font-normal text-[#1b0c25]">
                      An all-in-one study environment with built-in plugins —
                      annotator, calculator, integrated assistant, library access,
                      comments, and annexes — all without leaving your session
                    </p>
                  </div>
                </motion.div>

                {/* Card 2 - Aviation Dictionary */}
                <motion.div
                  variants={bentoCardVariants}
                  className="flex flex-col items-center gap-4 lg:gap-[30px] p-2 sm:p-4 lg:p-[8px] w-full lg:w-[719px] bg-white/60 backdrop-blur-sm rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-white/80"
                >
                  <div className="w-full aspect-703/353 rounded-xl overflow-hidden">
                    <Image
                      src="/images/imageSm.png"
                      alt="Aviation Dictionary"
                      width={703}
                      height={353}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 lg:gap-[19px] px-4 sm:px-6 lg:px-[22px] pb-4 sm:pb-6 lg:pb-[22px]">
                    <h1 className="text-lg sm:text-xl lg:text-[22px] leading-snug lg:leading-[28px] font-medium text-[#1b0c25]">
                      Aviation Dictionary
                    </h1>
                    <p className="text-sm sm:text-base lg:text-[15px] leading-relaxed lg:leading-[26px] font-normal text-[#1b0c25]">
                      A comprehensive aviation glossary with audio pronunciations,
                      3D interactive models, real images, and cross-referenced
                      terms — from VORs to flight instruments
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Second Row */}
              <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-[24px] justify-center w-full">
                {/* Card 3 - Sharing & Live Quizzes */}
                <motion.div
                  variants={bentoCardVariants}
                  className="flex flex-col items-center gap-4 lg:gap-[30px] p-2 sm:p-4 lg:p-[8px] w-full lg:w-[806px] bg-white/60 backdrop-blur-sm rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-white/80"
                >
                  <div className="w-full aspect-790/353 rounded-xl overflow-hidden">
                    <Image
                      src="/images/imageData.png"
                      alt="Sharing & Live Quizzes"
                      width={790}
                      height={353}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 lg:gap-[19px] px-4 sm:px-6 lg:px-[22px] pb-4 sm:pb-6 lg:pb-[22px]">
                    <h1 className="text-lg sm:text-xl lg:text-[22px] leading-snug lg:leading-[28px] font-medium text-[#1b0c25]">
                      Sharing & Live Quizzes
                    </h1>
                    <p className="text-sm sm:text-base lg:text-[15px] leading-relaxed lg:leading-[26px] font-normal text-[#1b0c25]">
                      Share your study sessions with classmates, invite
                      collaborators, or launch live Kahoot-style quizzes with
                      real-time leaderboards — no account required for participants
                    </p>
                  </div>
                </motion.div>

                {/* Card 4 - Library & Resources */}
                <motion.div
                  variants={bentoCardVariants}
                  className="flex flex-col items-center gap-4 lg:gap-[30px] p-2 sm:p-4 lg:p-[8px] w-full lg:w-[410px] bg-white/60 backdrop-blur-sm rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-white/80"
                >
                  <div className="w-full aspect-394/355 rounded-xl overflow-hidden">
                    <Image
                      src="/images/imagePred.png"
                      alt="Library & Resources"
                      width={394}
                      height={355}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 lg:gap-[19px] px-4 sm:px-6 lg:px-[22px] pb-4 sm:pb-6 lg:pb-[22px]">
                    <h1 className="text-lg sm:text-xl lg:text-[22px] leading-snug lg:leading-[28px] font-medium text-[#1b0c25]">
                      Library & Resources
                    </h1>
                    <p className="text-sm sm:text-base lg:text-[15px] leading-relaxed lg:leading-[26px] font-normal text-[#1b0c25]">
                      Access e-books, PDFs, aviation annexes, and procedures
                      — a complete resource library to support your study
                      sessions and deepen your understanding
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
