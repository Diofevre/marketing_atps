"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ButtonDemoBlur } from "../ButtonDemo";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import Image from "next/image";
import { ChevronDown, Globe, Sparkles } from "lucide-react";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  heroTitleWordVariants,
  heroDescriptionVariants,
  heroButtonVariants,
  heroCardVariants,
} from "@/lib/motion";
import { HotAirBalloon } from "../illustrations/HeroAircrafts";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <motion.div
        className="w-2 h-2 bg-[#1b0c25]/40 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-[#1b0c25]/40 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-[#1b0c25]/40 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
}

function ChatMessage({ message, type, delay }: { message: string; type: string; delay: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay * 1000);

    const showTimer = setTimeout(() => {
      setIsTyping(false);
      setIsVisible(true);
    }, (delay + 1) * 1000);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(showTimer);
    };
  }, [delay]);

  useEffect(() => {
    if (isVisible && type === "ai") {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= message.length) {
          setDisplayedText(message.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    } else if (isVisible) {
      setDisplayedText(message);
    }
  }, [isVisible, message, type]);

  if (type === "user") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 justify-end"
          >
            <div className="bg-white rounded-xl px-4 py-2 max-w-[280px] shadow-sm">
              <p className="text-[13px] text-[#1b0c25] leading-relaxed">{displayedText}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-medium">U</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isTyping && !isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-start gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1b0c25] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="bg-white/80 rounded-xl px-3 py-2 shadow-sm">
            <TypingIndicator />
          </div>
        </motion.div>
      )}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1b0c25] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="bg-white/80 rounded-xl px-4 py-2 max-w-[320px] shadow-sm">
            <p className="text-[13px] text-[#1b0c25] leading-relaxed">{displayedText}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.myatps.com";

export default function Hero() {
  const t = useTranslations("hero");
  const [query, setQuery] = useState("");

  const goToApp = useCallback((path: string, q?: string) => {
    const url = new URL(path, APP_URL);
    if (q) url.searchParams.set("q", q);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    goToApp("/", query.trim());
  }, [goToApp, query]);

  // Split the full localized title into words so each animates in separately.
  // Using the full localized string (instead of a hardcoded English array)
  // means the animation works identically in French.
  const titleWords = t("titleFull").split(" ");

  const TYPING_SPEED_MS = 20; // ms per character
  const chatAi1Text = t("chatAi1");
  // Message 2 (AI) becomes visible at delay+1s, then types at TYPING_SPEED_MS/char
  const ai1VisibleAt = 2 + 1; // delay=2 → visible at 3s
  const ai1TypeDuration = (chatAi1Text.length * TYPING_SPEED_MS) / 1000;
  // Message 3 starts only after message 2 finishes typing + small buffer
  const msg3Delay = ai1VisibleAt + ai1TypeDuration + 0.4;

  const CHAT_MESSAGES = [
    { id: 1, type: "user", message: t("chatUser1"), delay: 0.5 },
    { id: 2, type: "ai", message: chatAi1Text, delay: 2 },
    { id: 3, type: "user", message: t("chatUser2"), delay: msg3Delay },
  ];

  return (
    <div className="w-full pb-0 px-4">
      <div className="min-h-[800px] lg:h-[1236px] bg-[url('/images/bgHero.png')] bg-cover bg-center rounded-2xl overflow-hidden relative">
        
        <div className="relative z-10 flex flex-col gap-8 lg:gap-[60px] px-4 sm:px-6 lg:px-0 pt-28 lg:pt-[160px] h-full">
          <Container className="flex flex-col gap-6 lg:gap-[40px]">
            <div className="flex flex-col gap-4 lg:gap-[24px]">
              <div className="flex flex-col items-start gap-4 lg:gap-[24px]">
                <div className="flex flex-col items-start w-full lg:w-[940px] gap-3 lg:gap-[12px]">
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl lg:text-[60px] leading-tight lg:leading-[60px] text-[#1b0c25] font-medium"
                  >
                    {titleWords.map((word, index) => (
                      <motion.span
                        key={index}
                        variants={heroTitleWordVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + index * 0.1,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="inline-block mr-[0.3em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.div
                  variants={heroDescriptionVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full lg:w-[700px]"
                >
                  <p className="text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[28px] font-normal text-[#1b0c25]">
                    {t("description")}
                  </p>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                variants={heroButtonVariants}
                initial="hidden"
                animate="visible"
              >
                <ButtonDemoBlur />
              </motion.div>
            </div>
          </Container>

          <Container className="flex-1 flex flex-col">
            <motion.div
              variants={heroCardVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 flex items-end justify-center w-full border border-[#1b0c25]/10 border-b-0 relative rounded-tl-[20px] sm:rounded-tl-[30px] lg:rounded-tl-[40px] rounded-tr-[20px] sm:rounded-tr-[30px] lg:rounded-tr-[40px] rounded-b-none backdrop-blur-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.6)_100%)] overflow-hidden"
            >
              {/* Hot air balloon — large, pink, top-right (slow float + gentle sway) */}
              <motion.div
                className="hidden lg:block absolute top-[30px] right-[70px]"
                style={{ originX: "50%", originY: "20%" }}
                animate={{
                  y: [0, -18, -6, 0],
                  x: [0, 6, 2, 0],
                  rotate: [-2, 2, 0, -2],
                }}
                transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
              >
                <HotAirBalloon
                  variant="pink"
                  aria-label={t("aircraftBalloonAlt")}
                  className="w-[175px] h-auto"
                />
              </motion.div>

              {/* Hot air balloon — medium, violet, bottom-left (deeper float, different phase) */}
              <motion.div
                className="hidden lg:block absolute bottom-[160px] left-[90px]"
                style={{ originX: "50%", originY: "20%" }}
                animate={{
                  y: [0, -14, -4, 0],
                  x: [0, -5, -2, 0],
                  rotate: [1.5, -1.5, 0, 1.5],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
              >
                <HotAirBalloon
                  variant="violet"
                  aria-label={t("aircraftBalloonAlt")}
                  className="w-[145px] h-auto"
                />
              </motion.div>

              {/* Hot air balloon — small, peach, top-left (quicker drift, subtle) */}
              <motion.div
                className="hidden lg:block absolute top-[60px] left-[240px]"
                style={{ originX: "50%", originY: "20%" }}
                animate={{
                  y: [0, -10, -3, 0],
                  x: [0, 8, 3, 0],
                  rotate: [-1, 1.2, 0, -1],
                }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              >
                <HotAirBalloon
                  variant="peach"
                  aria-label={t("aircraftBalloonAlt")}
                  className="w-[105px] h-auto"
                />
              </motion.div>

              {/* Content Container */}
              <div className="relative z-10 w-full lg:w-[1140px] h-full px-4 sm:px-6 lg:px-[50px] flex items-end justify-center">
                {/* Background Pattern - Adjusted for mobile */}
                <motion.div
                  className="absolute inset-0 w-full h-full bg-[url('/images/bgCha.png')] bottom-0 bg-cover bg-center opacity-50 lg:opacity-100"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 lg:gap-[30px] px-4 sm:px-8 lg:px-[300px] w-full pb-0">
                  {/* Chat Card */}
                  <div className="w-full sm:w-[540px] lg:w-[640px] min-h-[200px] sm:min-h-[250px] lg:min-h-[310px] rounded-2xl p-4 sm:p-5 lg:p-6 backdrop-blur-[10px] bg-white/50 border border-[#1b0c25]/10 flex flex-col gap-4 justify-end">
                    {CHAT_MESSAGES.map((msg) => (
                      <ChatMessage
                        key={msg.id}
                        message={msg.message}
                        type={msg.type}
                        delay={msg.delay}
                      />
                    ))}
                  </div>

                  {/* Bottom Form Card */}
                  <form
                    onSubmit={handleSubmit}
                    className="w-full sm:w-[540px] lg:w-[640px] border border-[#1b0c25]/10 border-b-0 rounded-t-xl lg:rounded-t-[13px] rounded-b-none backdrop-blur-[25px] bg-white/90 shadow-[0_0_40px_rgba(195,79,150,0.15)] overflow-hidden"
                  >
                    {/* Input Row */}
                    <div className="flex items-center gap-3 px-4 lg:px-5 pt-4 lg:pt-5 pb-3">
                      <Sparkles className="shrink-0 w-4 h-4 text-[#c34f96]/60" />
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t("searchPlaceholder")}
                        className="flex-1 border-none bg-transparent shadow-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm lg:text-[15px] placeholder:text-[#1b0c25]/50 p-0 h-auto"
                      />
                    </div>

                    {/* Divider */}
                    <div className="mx-4 lg:mx-5 h-px bg-[#1b0c25]/6" />

                    {/* Bottom Bar */}
                    <div className="flex items-center justify-between px-4 lg:px-5 py-3">
                      {/* Left pills */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8f0fc] border border-[#f0e0f8] text-[#1b0c25] text-[11px] font-medium">
                          <Image
                            src="/assets/icons/gptIcon.png"
                            alt={t("aiAssistantAlt")}
                            height={12}
                            width={12}
                          />
                          {t("btnAssistant")}
                          <ChevronDown className="w-3 h-3 text-[#1b0c25]/50" />
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8f0fc] border border-[#f0e0f8] text-[#1b0c25] text-[11px] font-medium">
                          <Globe className="w-3 h-3 text-[#1b0c25]/60" />
                          {t("btnSearch")}
                        </div>
                      </div>

                      {/* Submit */}
                      <Button type="submit" className="bg-transparent hover:bg-transparent p-0 h-auto">
                        <Image
                          src="/images/buttonS.png"
                          alt="Submit"
                          width={32}
                          height={32}
                        />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </Container>
        </div>
      </div>
    </div>
  );
}
