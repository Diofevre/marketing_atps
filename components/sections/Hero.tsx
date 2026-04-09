"use client";

import { useState, useEffect } from "react";
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

const CHAT_MESSAGES = [
  {
    id: 1,
    type: "user",
    message: "I'm struggling with ILS approach questions — can you help me understand the key concepts?",
    delay: 0.5,
  },
  {
    id: 2,
    type: "ai",
    message: "Absolutely! Our research-backed explanations break it down clearly: the localizer provides lateral guidance, while the glide slope handles vertical guidance — both using radio beams to guide you to the runway threshold.",
    delay: 2,
  },
  {
    id: 3,
    type: "user",
    message: "Great, let me start a quiz on Radio Navigation!",
    delay: 4,
  },
];

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

export default function Hero() {
  // Split title into words for animation
  const titleWords = ["Pass", "Your", "ATPL", "on", "the", "First", "Try"];

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
                    className="text-[30px] lg:text-[40px] leading-[30px] lg:leading-[40px] text-[#1b0c25] font-medium"
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
                    20,000+ questions with research-based explanations, an
                    aviation dictionary with audio &amp; 3D models, live quizzes,
                    and a complete study ecosystem — the only ATPL platform
                    that gives you everything in one place.
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
              {/* Decorative Elements - Hidden on mobile/tablet */}
              <motion.div
                className="hidden lg:block absolute w-[209px] h-[210px] bg-[url('/images/scare1.png')] top-[37.98px] right-[79px]"
                animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="hidden lg:block absolute w-[159px] h-[138px] bg-[url('/images/scare2.png')] top-[311.98px] left-[135px]"
                animate={{ y: [0, 6, 0], x: [0, -4, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />

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
                  <div className="w-full sm:w-[540px] lg:w-[640px] px-3 sm:px-4 lg:px-[14px] pt-3 sm:pt-4 lg:pt-[14px] pb-6 sm:pb-8 lg:pb-10 flex flex-col gap-3 sm:gap-4 lg:gap-[14px] border border-[#1b0c25]/10 border-b-0 rounded-t-xl lg:rounded-t-[13px] rounded-b-none backdrop-blur-[25px] bg-white/90 shadow-[0_0_40px_rgba(195,79,150,0.15)]">
                    {/* Button Group */}
                    <div className="flex flex-wrap gap-2 sm:gap-[8px]">
                      <Button className="text-[11px] sm:text-[12px] font-medium leading-[14px] rounded-[19px] px-3 sm:px-4 py-2 h-auto sm:h-[34px] bg-white backdrop-blur-[6px] border border-[#f2e8fa] text-[#1b0c25] hover:bg-transparent">
                        <Image
                          src="/assets/icons/gptIcon.png"
                          alt="AI Assistant"
                          height={16}
                          width={16}
                          className="mr-1"
                        />
                        Assistant
                        <ChevronDown className="ml-1 text-[#1b0c25] h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>

                      <Button className="text-[11px] sm:text-[12px] font-medium leading-[14px] rounded-[19px] px-3 sm:px-4 py-2 h-auto sm:h-[34px] bg-white backdrop-blur-[6px] border border-[#f2e8fa] text-[#1b0c25] hover:bg-transparent">
                        <Globe className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Search
                      </Button>
                    </div>

                    {/* Form */}
                    <form className="w-full max-w-[612px] flex flex-col gap-3 sm:gap-4">
                      <Input
                        placeholder="Search questions, topics, or ask your assistant..."
                        className="w-full border-none bg-transparent shadow-none text-sm sm:text-base lg:text-[16px] placeholder:text-sm sm:placeholder:text-base lg:placeholder:text-[16px] placeholder:text-[#1b0c25]/70"
                      />

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-4">
                        <div className="flex flex-wrap gap-2 sm:gap-[8px] items-center">
                          <Button className="group text-[#1b0c25] text-[11px] sm:text-[12px] leading-[14px] font-medium px-3 sm:px-4 py-1.5 sm:py-2 h-auto sm:h-[30px] rounded-[83px] bg-white hover:bg-white shadow-sm border border-[#f3e9fa] whitespace-nowrap">
                            <span className="flex flex-col items-center h-[14px] overflow-hidden">
                              <span className="block h-[14px] leading-[14px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                                Start Quiz
                              </span>
                              <span className="block h-[14px] leading-[14px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                                Start Quiz
                              </span>
                            </span>
                          </Button>
                          <Button className="group text-[#1b0c25] text-[11px] sm:text-[12px] leading-[14px] font-medium px-3 sm:px-4 py-1.5 sm:py-2 h-auto sm:h-[30px] rounded-[83px] bg-white hover:bg-white shadow-sm border border-[#f3e9fa] whitespace-nowrap">
                            <span className="flex flex-col items-center h-[14px] overflow-hidden">
                              <span className="block h-[14px] leading-[14px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                                Dictionary
                              </span>
                              <span className="block h-[14px] leading-[14px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                                Dictionary
                              </span>
                            </span>
                          </Button>
                          <Button className="group text-[#1b0c25] text-[11px] sm:text-[12px] leading-[14px] font-medium px-3 sm:px-4 py-1.5 sm:py-2 h-auto sm:h-[30px] rounded-[83px] bg-white hover:bg-white shadow-sm border border-[#f3e9fa] whitespace-nowrap">
                            <span className="flex flex-col items-center h-[14px] overflow-hidden">
                              <span className="block h-[14px] leading-[14px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                                Practice Exam
                              </span>
                              <span className="block h-[14px] leading-[14px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                                Practice Exam
                              </span>
                            </span>
                          </Button>
                        </div>

                        {/* Submit Button */}
                        <div className="self-end sm:self-auto">
                          <Button className="bg-transparent hover:bg-transparent p-0">
                            <Image
                              src="/images/buttonS.png"
                              alt="Button S"
                              width={28}
                              height={28}
                              className="sm:w-8 sm:h-8"
                            />
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </div>
      </div>
    </div>
  );
}
