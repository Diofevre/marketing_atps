"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqContainerVariants, faqItemVariants, viewportSettings } from "@/lib/motion";
import { FEATURES } from "@/lib/data/entreprise";

export default function EnterpriseFeatures() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      variants={faqContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="flex flex-col gap-3"
    >
      {FEATURES.map((feature, index) => (
        <motion.div
          key={feature.name}
          variants={faqItemVariants}
          className="w-full bg-white rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex items-center justify-between w-full p-5 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-[#1b0c25]/5 flex items-center justify-center shrink-0">
                <feature.icon size={16} className="text-[#1b0c25]" />
              </div>
              <p className="text-[15px] font-semibold text-[#1b0c25]">
                {feature.name}
              </p>
            </div>
            <div className="shrink-0 ml-4">
              {openIndex === index ? (
                <Minus className="w-4 h-4 text-[#1b0c25]" />
              ) : (
                <Plus className="w-4 h-4 text-[#1b0c25]" />
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
                <p className="px-5 pb-5 pt-0 text-[15px] leading-[26px] text-[#1b0c25]/50 pl-[72px]">
                  {feature.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}
