"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/TitleSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUpVariants,
  testimonialCardVariants,
  viewportSettings,
} from "@/lib/motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EnterpriseTestimonials() {
  const t = useTranslations("enterprise");
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: t("testimonial1Text"),
      author: t("testimonial1Author"),
      role: t("testimonial1Role"),
    },
    {
      id: 2,
      text: t("testimonial2Text"),
      author: t("testimonial2Author"),
      role: t("testimonial2Role"),
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const current = testimonials[currentIndex];

  return (
    <div className="px-4 py-16 lg:py-[120px] bg-[#f7f6f7]" id="testimonials">
      <Container className="flex flex-col items-center gap-12 lg:gap-[60px]">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center gap-4 lg:gap-[16px]"
        >
          <TitleSection title={t("testimonialsBadge")} />
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[52px] text-[#1b0c25] font-medium">
            {t("testimonialsTitle")}
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          variants={testimonialCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 w-full max-w-[700px]"
        >
          {/* Left Arrow */}
          <div className="hidden sm:block">
            <Button
              onClick={handlePrev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 text-black" />
            </Button>
          </div>

          {/* Card */}
          <div className="relative w-full sm:w-[560px] border border-white rounded-2xl shadow-[0_4px_8px_0_rgba(0,0,0,0.05)] bg-white overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 p-6 lg:p-10"
              >
                <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[30px] font-medium text-[#1b0c25] min-h-[100px]">
                  {current.text}
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-[15px] leading-[26px] text-[#1b0c25] font-medium">
                    {current.author}
                  </p>
                  <p className="text-[14px] leading-[20px] text-[#1b0c25] opacity-60">
                    {current.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <div className="hidden sm:block">
            <Button
              onClick={handleNext}
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 shadow-sm"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </Button>
          </div>

          {/* Mobile Arrows */}
          <div className="flex sm:hidden justify-center gap-4 w-full">
            <Button
              onClick={handlePrev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 text-black" />
            </Button>
            <Button
              onClick={handleNext}
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 shadow-sm"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
