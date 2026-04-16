"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users, Clock } from "lucide-react";

interface DemoQueueProps {
  position: number;
  waitSeconds: number;
}

export default function DemoQueue({ position, waitSeconds }: DemoQueueProps) {
  const t = useTranslations("enterpriseDemo");

  return (
    <motion.div
      key="queued"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-[20px] border border-[#d37bff]/20 bg-white p-8 lg:p-16 flex flex-col items-center justify-center gap-6 min-h-[350px]"
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-[#d37bff]/10 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Users className="w-10 h-10 text-[#d37bff]" />
      </motion.div>

      <div className="text-center">
        <p className="text-[24px] font-medium text-[#1b0c25] mb-1">
          Position #{position}
        </p>
        <p className="text-[14px] text-[#1b0c25]/50">
          {t("queueMessage") ?? "All demo slots are currently in use"}
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
        <Clock className="w-4 h-4 text-amber-500" />
        <span className="text-[13px] font-medium text-amber-700">
          ~{Math.ceil(waitSeconds / 60)} min
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#d37bff] animate-pulse" />
        <p className="text-[12px] text-[#1b0c25]/40">
          {t("queuePolling") ?? "Checking for available slots..."}
        </p>
      </div>
    </motion.div>
  );
}
