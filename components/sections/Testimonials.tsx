"use client";

import { useState } from "react";
import Image from "next/image";
import TitleSection from "../TitleSection";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import {
  fadeInUpVariants,
  testimonialCardVariants,
  counterVariants,
  viewportSettings,
} from "@/lib/motion";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const numericPart = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const count = useMotionValue(0);
  const displayValue = useTransform(
    count,
    (latest) => Math.round(latest) + suffix,
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericPart, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, numericPart, count]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

const COUNTER_TEST = [
  {
    id: 1,
    counter: "2000+",
    title: "Student Pilots Worldwide",
  },
  {
    id: 2,
    counter: "20000+",
    title: "EASA ATPL Questions",
  },
  {
    id: 3,
    counter: "14",
    title: "Subjects Fully Covered",
  },
];

const TESTIMONIALS_DATA = [
  {
    id: 1,
    text: '"MyATPS completely transformed my ATPL preparation. The explanations are incredibly detailed and well-researched — concepts I had struggled with for months finally clicked. The quiz interface is unlike anything else out there."',
    author: "Thomas L.",
    role: "Commercial Pilot Student — France",
    image: "/images/avatar_thomas.png",
  },
  {
    id: 2,
    text: '"The live quiz feature is amazing for group study. My instructor uses it to run sessions with the whole class, and the dictionary with 3D models and audio helped me understand instruments I could only read about before."',
    author: "Lucas M.",
    role: "ATPL Candidate — Belgium",
    image: "/images/avatar_lucas.png",
  },
  {
    id: 3,
    text: '"I passed all 14 ATPL written exams on the first attempt. The question bank is massive, the explanations are clear and research-backed, and the built-in tools meant I never had to switch between apps."',
    author: "Camille R.",
    role: "Airline Transport Pilot — Switzerland",
    image: "/images/avatar_camille.png",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1,
    );
  };

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <div className="px-4" id="testimonials">
      <div className="rounded-[16px] min-h-[800px] lg:h-[932px] bg-[url('/images/testBg.png')] bg-cover bg-center">
        <Container className="py-12 sm:py-16 lg:py-20 xl:py-[140px] flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-[60px]">
          {/* Header Section */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-[60px] flex-col w-full">
            {/* Title Section */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="flex items-center justify-center flex-col gap-3 sm:gap-4 lg:gap-[16px] w-full lg:w-[800px] px-4 lg:px-0"
            >
              <TitleSection
                title="Wall of Love"
                className="shadow-[0_33px_13px_0_rgba(0,0,0,0.01),0_19px_11px_0_rgba(0,0,0,0.04),0_8px_8px_0_rgba(0,0,0,0.06),0_2px_5px_0_rgba(0,0,0,0.07)]"
              />
              <div className="w-full">
                <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-[58px] leading-tight lg:leading-[60px] text-center text-[#1b0c25] font-medium">
                  What they're Saying
                </p>
              </div>
            </motion.div>

            {/* Main Content Container */}
            <div className="w-full max-w-[790px] mx-auto">
              <div className="flex w-full h-auto flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-[32px]">
                {/* Testimonial Carousel */}
                <div className="w-full px-4 sm:px-0">
                  <motion.div
                    variants={testimonialCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
                  >
                    {/* Left Arrow - Hidden on mobile, visible on tablet/desktop */}
                    <div className="hidden sm:block">
                      <Button
                        onClick={handlePrev}
                        aria-label="Previous testimonial"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-gray-100 shadow-sm"
                      >
                        <ChevronLeft className="w-4 h-4 text-black" />
                      </Button>
                    </div>

                    {/* Testimonial Card Container */}
                    <div className="relative flex justify-center w-full sm:w-[650px]">
                      {/* Decorative Layers - Hidden on mobile */}
                      <div className="hidden sm:block absolute top-[38px] z-10 w-[664px] h-[221px] rounded-[14px] border-2 border-white bg-white/50 backdrop-blur" />
                      <div className="hidden sm:block absolute top-[52px] z-0 w-[690px] h-[190px] rounded-[14px] border-2 border-white bg-white/50 backdrop-blur" />

                      {/* Main Testimonial Card */}
                      <div className="relative z-20 w-full sm:w-[634px] border border-white rounded-2xl shadow-[0_4px_8px_0_rgba(0,0,0,0.05)] bg-[#f7f6f7] overflow-hidden min-h-[250px]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentTestimonial.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-4 sm:gap-[30px] p-4 sm:p-6 lg:p-[40px]"
                          >
                            {/* Testimonial Text */}
                            <div>
                              <p className="text-base sm:text-lg lg:text-[23px] leading-relaxed lg:leading-[28px] font-medium min-h-[110px]">
                                {currentTestimonial.text}
                              </p>
                            </div>

                            {/* Author Info */}
                            <div className="flex gap-3 sm:gap-[16px] items-center">
                              <div className="shrink-0 w-10 h-10 sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden">
                                <Image
                                  src={currentTestimonial.image}
                                  width={60}
                                  height={60}
                                  alt={currentTestimonial.author}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-sm sm:text-[15px] leading-relaxed sm:leading-[26px] text-[#1b0c25] font-medium">
                                  {currentTestimonial.author}
                                </p>
                                <p className="text-xs sm:text-[15px] leading-relaxed sm:leading-[20px] text-[#1b0c25] opacity-60">
                                  {currentTestimonial.role}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Right Arrow - Hidden on mobile, visible on tablet/desktop */}
                    <div className="hidden sm:block">
                      <Button
                        onClick={handleNext}
                        aria-label="Next testimonial"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-gray-100 shadow-sm"
                      >
                        <ChevronRight className="w-4 h-4 text-black" />
                      </Button>
                    </div>

                    {/* Mobile Navigation Arrows */}
                    <div className="flex sm:hidden justify-center gap-4 w-full">
                      <Button
                        onClick={handlePrev}
                        aria-label="Previous testimonial"
                        className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 shadow-sm"
                      >
                        <ChevronLeft className="w-4 h-4 text-black" />
                      </Button>
                      <Button
                        onClick={handleNext}
                        aria-label="Next testimonial"
                        className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 shadow-sm"
                      >
                        <ChevronRight className="w-4 h-4 text-black" />
                      </Button>
                    </div>
                  </motion.div>
                </div>

                {/* Counter Section */}
                <motion.div
                  variants={fadeInUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="flex flex-col gap-4 sm:gap-6 lg:gap-[32px] w-full"
                >
                  {/* Counter Stats */}
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-[16px] px-4 sm:px-0">
                    {COUNTER_TEST.map((counter) => (
                      <motion.div
                        key={counter.id}
                        variants={counterVariants}
                        className="flex-1 min-w-[120px] sm:min-w-[150px] lg:w-[189.33px] flex flex-col gap-1 items-center"
                      >
                        <h3 className="text-2xl sm:text-3xl lg:text-[41px] font-medium text-[#1b0c25]">
                          <AnimatedCounter value={counter.counter} />
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-[15px] leading-relaxed lg:leading-[26px] text-center text-[rgba(28,12,38,0.7)]">
                          {counter.title}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Brand Logos */}
                  <div className="w-full px-4 sm:px-0">
                    <div className="relative w-full aspect-1140/41 max-w-[1140px] mx-auto">
                      <Image
                        src="/images/logo_test.png"
                        fill
                        className="object-contain"
                        alt="Brand Logos"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1140px"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
