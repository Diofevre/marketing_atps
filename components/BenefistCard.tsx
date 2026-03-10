"use client";
import Image from "next/image";
import ButtonDemo from "./ButtonDemo";
import { motion } from "framer-motion";
import {
  benefitCardVariants,
  fadeInUpVariants,
  scaleInVariants,
  viewportSettings,
} from "@/lib/motion";

const LEFT_KEYS = [
  {
    id: 1,
    title: "AI-Powered Quiz",
    description: "Adaptive quiz modes with instant feedback and detailed explanations for every question",
  },
  {
    id: 2,
    title: "ATC Simulator",
    description: "Practice realistic air traffic control scenarios with AI evaluation",
  },
  {
    id: 3,
    title: "FlyComputer E6B",
    description: "Integrated flight computer for speed, wind, fuel and navigation calculations",
  },
];

const RIGHT_KEYS = [
  {
    id: 1,
    title: "AI Tutor Chatbot",
    description: "Get contextual explanations from an aviation AI tutor during your study sessions",
  },
  {
    id: 2,
    title: "Complete Question Bank",
    description: "Thousands of official ATPL questions organized by subject, chapter and country",
  },
  {
    id: 3,
    title: "Progress Tracking",
    description: "Monitor your performance with detailed statistics and identify weak areas",
  },
];

export default function BenefistCard() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[40px] w-full">
      
      {/* Main Card */}
      <motion.div
        variants={scaleInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden"
      >
        
        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-[40px] p-4 sm:p-6 lg:p-[40px]">
          
          {/* Left Column - Benefits */}
          <motion.div
            variants={fadeInUpVariants}
            className="w-full lg:w-[280px] order-2 lg:order-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-[40px]">
              {LEFT_KEYS.map((key) => (
                <motion.div
                  key={key.id}
                  variants={benefitCardVariants}
                  className="flex flex-col gap-2 sm:gap-3 lg:gap-[12px]"
                >
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 lg:h-[32px] lg:w-[32px] rounded-[4px] shadow-[inset_0_-1px_2px_0_rgba(156,32,218,0.15),inset_0_1px_1px_0_#fff,0_1px_8px_0_rgba(82,44,102,0.1)] bg-[linear-gradient(180deg,#fff_0%,#efe9f5_100%)]">
                    <Image
                      src="/assets/icons/checks.png"
                      width={14}
                      height={14}
                      className="sm:w-[15px] sm:h-[15px] lg:w-4 lg:h-4"
                      alt="Benefit Icon"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col gap-1 sm:gap-2 lg:gap-[15px]">
                    <p className="font-medium text-sm sm:text-base lg:text-[17px] leading-relaxed lg:leading-[28px] text-[#1b0c25]">
                      {key.title}
                    </p>
                    <p className="font-normal text-xs sm:text-sm lg:text-[15px] leading-relaxed lg:leading-[26px] text-[#1b0c25] opacity-80">
                      {key.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Center Column - Image */}
          <motion.div
            variants={scaleInVariants}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-[520px] order-1 lg:order-2"
          >
            <div className="relative w-full aspect-520/486 rounded-lg overflow-hidden">
              <Image
                src="/images/keyben.png"
                fill
                className="object-cover"
                alt="Key Benefits Illustration"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
              />
            </div>
          </motion.div>
          
          {/* Right Column - Benefits */}
          <motion.div
            variants={fadeInUpVariants}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-[280px] order-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-[40px]">
              {RIGHT_KEYS.map((key) => (
                <motion.div
                  key={key.id}
                  variants={benefitCardVariants}
                  className="flex flex-col gap-2 sm:gap-3 lg:gap-[12px]"
                >
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 lg:h-[32px] lg:w-[32px] rounded-[4px] shadow-[inset_0_-1px_2px_0_rgba(156,32,218,0.15),inset_0_1px_1px_0_#fff,0_1px_8px_0_rgba(82,44,102,0.1)] bg-[linear-gradient(180deg,#fff_0%,#efe9f5_100%)]">
                    <Image
                      src="/assets/icons/checks.png"
                      width={14}
                      height={14}
                      className="sm:w-[15px] sm:h-[15px] lg:w-4 lg:h-4"
                      alt="Benefit Icon"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col gap-1 sm:gap-2 lg:gap-[15px]">
                    <p className="font-medium text-sm sm:text-base lg:text-[17px] leading-relaxed lg:leading-[28px] text-[#1b0c25]">
                      {key.title}
                    </p>
                    <p className="font-normal text-xs sm:text-sm lg:text-[15px] leading-relaxed lg:leading-[26px] text-[#1b0c25] opacity-80">
                      {key.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* CTA Button */}
      <motion.div
        variants={fadeInUpVariants}
        transition={{ delay: 0.3 }}
        className="w-full flex justify-center"
      >
        <ButtonDemo />
      </motion.div>
    </div>
  );
}