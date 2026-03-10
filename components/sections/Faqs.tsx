"use client";

import Image from "next/image";
import TitleSection from "../TitleSection";
import { Container } from "../ui/container";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUpVariants, faqContainerVariants, faqItemVariants, viewportSettings } from "@/lib/motion";

const QUESTION_FAQS = [
  {
    question: "What is MyATPS?",
    answer:
      "MyATPS (Aviation Training and Preparation System) is a complete online platform designed to help student pilots prepare for their ATPL (Airline Transport Pilot License) exams. It combines an advanced quiz interface, an AI tutor chatbot, an ATC simulator, video courses, and a comprehensive question bank — all in one place.",
  },
  {
    question: "What is the difference between Standard and Premium?",
    answer:
      "Standard gives you unlimited STUDY quizzes, 5 TEST quizzes per day, 10 hours of video per month, up to 50 bookmarks, and basic stats — ideal for getting started. Premium unlocks everything: unlimited TEST and EXAM quizzes, unlimited video, the ATC Simulator, the AI Tutor chatbot (100 messages/day), full forum access, advanced stats, and priority support.",
  },
  {
    question: "What is the ATC Simulator?",
    answer:
      "The ATC Simulator is a realistic air traffic control training tool that lets you practice radio communications in various scenarios — departure, en-route, approach, and more. An AI evaluates your responses and gives you instant, detailed feedback to help you improve your phraseology and procedures.",
  },
  {
    question: "What is the FlyComputer E6B?",
    answer:
      "The FlyComputer E6B is a fully interactive digital flight computer built directly into the quiz interface. You can use it to calculate true airspeed, wind corrections, fuel consumption, time/distance, and more — without leaving the quiz page.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! The Premium plan includes a 48-hour free trial so you can explore all features before committing. You can also start with the Free plan to get a feel for the platform before upgrading to Standard or Premium.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="py-12 sm:py-16 lg:py-20 xl:py-[100px]">
      <Container className="flex flex-col lg:flex-row items-start gap-6 lg:gap-[60px] p-4 sm:p-6 lg:p-8 xl:p-[40px] bg-white rounded-2xl">
        {/* Left Column - Static Content */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="w-full lg:w-[366px]"
        >
          <div className="flex flex-col items-start gap-6 sm:gap-8 lg:gap-[40px]">
            {/* Title Section */}
            <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-[10px] w-full">
              <TitleSection
                title="FAQS"
                className="shadow-[0_33px_13px_0_rgba(0,0,0,0.01),0_19px_11px_0_rgba(0,0,0,0.04),0_8px_8px_0_rgba(0,0,0,0.06),0_2px_5px_0_rgba(0,0,0,0.07)]"
              />
              <p className="text-2xl sm:text-3xl lg:text-[43px] text-[#1b0c25] leading-tight lg:leading-[52px] font-medium">
                Frequently Asked Questions
              </p>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col items-start justify-center gap-3 sm:gap-4 lg:gap-[16px] w-full">
              <p className="text-lg sm:text-xl lg:text-[22px] font-medium text-[#1b0c25] leading-snug lg:leading-[28px]">
                Still have a question?
              </p>
              <p className="text-sm sm:text-base lg:text-[16px] font-medium text-[#1b0c25] leading-relaxed lg:leading-[26px]">
                Contact us :{" "}
                <span className="font-normal">We'll be happy to help you.</span>
              </p>
              <div className="w-[120px] sm:w-[142px] h-auto">
                <Image
                  src="/images/faqs.png"
                  width={142}
                  height={60}
                  alt="Contact Us"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - FAQ Accordion */}
        <motion.div
          variants={faqContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="w-full lg:w-[733px]"
        >
          <div className="flex flex-col items-start gap-3 sm:gap-4 lg:gap-[12px] w-full">
            {QUESTION_FAQS.map((faq, index) => (
              <motion.div
                key={index}
                variants={faqItemVariants}
                className="w-full bg-[#F7F6F7] rounded-lg overflow-hidden transition-all duration-300"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full p-3 sm:p-4 lg:p-[20px] text-left hover:bg-[#f0eef0] transition-colors"
                >
                  <p className="text-base sm:text-lg lg:text-[22px] pr-2 text-[#1b0c25] leading-snug lg:leading-[28px] font-medium">
                    {faq.question}
                  </p>
                  <div className="shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-[#1b0c25]" />
                    ) : (
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-[#1b0c25]" />
                    )}
                  </div>
                </button>

                {/* Answer Panel */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 sm:p-4 lg:p-[20px] pt-0 text-sm sm:text-base lg:text-[16px] text-[#1b0c25]/80 leading-relaxed lg:leading-[26px] border-t border-gray-200">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
