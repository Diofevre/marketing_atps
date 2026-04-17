"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import TitleSection from "../TitleSection";
import { Container } from "../ui/container";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUpVariants, faqContainerVariants, faqItemVariants, viewportSettings } from "@/lib/motion";

export default function Faqs() {
  const t = useTranslations("faqSection");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const QUESTION_FAQS = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
    { question: t("q6"), answer: t("a6") },
    { question: t("q7"), answer: t("a7") },
    { question: t("q8"), answer: t("a8") },
    { question: t("q9"), answer: t("a9") },
    { question: t("q10"), answer: t("a10") },
    { question: t("q11"), answer: t("a11") },
  ];

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
                title={t("badge")}
                className="shadow-[0_33px_13px_0_rgba(0,0,0,0.01),0_19px_11px_0_rgba(0,0,0,0.04),0_8px_8px_0_rgba(0,0,0,0.06),0_2px_5px_0_rgba(0,0,0,0.07)]"
              />
              <p className="text-2xl sm:text-3xl lg:text-[43px] text-[#1b0c25] leading-tight lg:leading-[52px] font-medium">
                {t("heading")}
              </p>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col items-start justify-center gap-3 sm:gap-4 lg:gap-[16px] w-full">
              <p className="text-lg sm:text-xl lg:text-[22px] font-medium text-[#1b0c25] leading-snug lg:leading-[28px]">
                {t("stillHaveQuestion")}
              </p>
              <p className="text-sm sm:text-base lg:text-[16px] font-medium text-[#1b0c25] leading-relaxed lg:leading-[26px]">
                {t("contactUs")}{" "}
                <span className="font-normal">{t("contactUsSub")}</span>
              </p>
              <div className="w-[120px] sm:w-[142px] h-auto">
                <Image
                  src="/images/faqs.png"
                  width={142}
                  height={60}
                  alt={t("contactImageAlt")}
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
