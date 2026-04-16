"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import TitleSection from "@/components/TitleSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUpVariants,
  faqContainerVariants,
  faqItemVariants,
  viewportSettings,
} from "@/lib/motion";
import { Plus, Minus } from "lucide-react";
import {
  Users,
  FileQuestion,
  ShieldCheck,
  DollarSign,
  Plane,
  CalendarDays,
  BookOpen,
  KeyRound,
  BarChart3,
  Zap,
  LayoutDashboard,
  MessagesSquare,
} from "lucide-react";

const MODULE_ICONS = [
  Users,
  FileQuestion,
  ShieldCheck,
  DollarSign,
  Plane,
  CalendarDays,
  BookOpen,
  KeyRound,
  BarChart3,
  Zap,
  LayoutDashboard,
  MessagesSquare,
];

export default function EnterpriseFeatures() {
  const t = useTranslations("enterprise");
  const [openIndex, setOpenIndex] = useState<number>(0);

  const modules = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    Icon: MODULE_ICONS[i],
    title: t(`module${i + 1}Title`),
    description: t(`module${i + 1}Description`),
  }));

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="px-4 py-12 sm:py-16 lg:py-20 xl:py-[100px]" id="modules">
      <Container className="flex flex-col lg:flex-row items-start gap-6 lg:gap-[60px]">

        {/* Left column — static */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="w-full lg:w-[366px] shrink-0"
        >
          <div className="flex flex-col items-start gap-6 lg:gap-[40px] lg:sticky lg:top-[100px]">
            <div className="flex flex-col items-start gap-2 lg:gap-[10px]">
              <TitleSection title={t("modulesBadge")} />
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] text-[#1b0c25] leading-tight lg:leading-[50px] font-medium">
                {t("modulesTitle")}
              </h2>
            </div>
            <p className="text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#1b0c25]/60">
              {t("modulesDescription")}
            </p>
          </div>
        </motion.div>

        {/* Right column — accordion */}
        <motion.div
          variants={faqContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="w-full flex-1"
        >
          <div className="flex flex-col gap-[10px]">
            {modules.map((mod, index) => (
              <motion.div
                key={mod.id}
                variants={faqItemVariants}
                className="w-full bg-[#F7F6F7] rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex items-center justify-between w-full p-4 lg:p-[20px] text-left hover:bg-[#f0eef0] transition-colors"
                >
                  <div className="flex items-center gap-3 pr-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1b0c25]/6 flex items-center justify-center shrink-0">
                      <mod.Icon className="w-4 h-4 text-[#1b0c25]" />
                    </div>
                    <p className="text-base lg:text-[17px] text-[#1b0c25] leading-snug font-medium">
                      {mod.title}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-[#1b0c25]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#1b0c25]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 lg:px-[20px] pb-4 lg:pb-[20px] text-sm lg:text-[15px] text-[#1b0c25]/70 leading-relaxed lg:leading-[26px] border-t border-gray-200 pt-3">
                        {mod.description}
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
