"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const FEATURE_LIST_CONTAINER = [
  {
    id: 1,
    title: "Advanced Quiz Interface with AI Tutor",
    description:
      "Train with three quiz modes — STUDY, TEST, and EXAM — backed by an integrated AI tutor that explains every question in context, with a built-in FlyComputer E6B for in-quiz calculations.",
    image: "/images/data.png",
    feature_list: [
      {
        id: 1,
        title: "3 Quiz Modes: STUDY, TEST & EXAM",
        icon_feature: "/assets/icons/db.png",
      },
      {
        id: 2,
        title: "AI Tutor Chatbot (RAG-powered)",
        icon_feature: "/assets/icons/topo.png",
      },
      {
        id: 3,
        title: "FlyComputer E6B Integrated",
        icon_feature: "/assets/icons/swith.png",
      },
    ],
  },
  {
    id: 2,
    title: "Realistic ATC Simulator with AI Evaluation",
    description:
      "Practice real air traffic control radio communications across multiple scenarios — departure, en-route, approach — and get instant AI feedback on your phraseology and procedures.",
    image: "/images/dash.png",
    feature_list: [
      {
        id: 1,
        title: "Realistic Scenario Library",
        icon_feature: "/assets/icons/trad.png",
      },
      {
        id: 2,
        title: "AI Evaluation & Instant Feedback",
        icon_feature: "/assets/icons/chart.png",
      },
      {
        id: 3,
        title: "Radio Phraseology Training",
        icon_feature: "/assets/icons/tvpro.png",
      },
    ],
  },
  {
    id: 3,
    title: "Complete Question Bank & Course Library",
    description:
      "Access thousands of official ATPL questions organized by subject and chapter, alongside video courses, PDF manuals, an aeronautical dictionary, and detailed progress tracking.",
    image: "/images/feature3.png",
    feature_list: [
      {
        id: 1,
        title: "50,000+ Official ATPL Questions",
        icon_feature: "/assets/icons/union.png",
      },
      {
        id: 2,
        title: "Video & Text Courses",
        icon_feature: "/assets/icons/check.png",
      },
      {
        id: 3,
        title: "Advanced Progress Tracking",
        icon_feature: "/assets/icons/hands.png",
      },
    ],
  },
];

export default function ProductCard() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative w-full">
      {FEATURE_LIST_CONTAINER.map((item, index) => {
        const targetScale = 1 - (FEATURE_LIST_CONTAINER.length - index) * 0.05;
        const start = index / FEATURE_LIST_CONTAINER.length;
        return (
          <Card
            key={item.id}
            item={item}
            index={index}
            range={[start, 1]}
            targetScale={targetScale}
            progress={scrollYProgress}
          />
        );
      })}
    </div>
  );
}

function Card({
  item,
  index,
  range,
  targetScale,
  progress,
}: {
  item: any;
  index: number;
  range: [number, number];
  targetScale: number;
  progress: any;
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Déterminer si l'ordre doit être inversé (pour la card 2)
  const isReversed = item.id === 2;

  return (
    <div
      ref={container}
      className="h-[80vh] flex items-center justify-center sticky top-0 w-full"
      style={{ zIndex: index }}
    >
      <motion.div
        style={{
          scale,
          top: `calc(5% + ${index * 8}px)`,
        }}
        className={`relative flex flex-col ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center justify-between p-4 sm:p-6 lg:p-[16px] bg-white rounded-2xl sm:rounded-3xl shadow-[0px_4px_30px_rgba(0,0,0,0.06)] gap-4 sm:gap-6 lg:gap-12 w-full max-w-[1240px] min-h-[500px] sm:min-h-[526px] h-auto border border-gray-100`}
      >
        {/* Content Section */}
        <div
          className={`flex flex-col gap-3 sm:gap-4 lg:gap-[32px] py-4 sm:py-6 lg:py-8 w-full lg:w-1/2 px-4 sm:px-6 lg:px-0 ${
            isReversed ? "lg:pl-0 lg:pr-[44px]" : "lg:pl-[44px]"
          }`}
        >
          {/* Title & Description */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-[27px] w-full">
            <h2 className="text-xl sm:text-2xl lg:text-[44px] font-medium leading-tight lg:leading-[52px] text-[#1b0c25]">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm lg:text-[16px] leading-relaxed lg:leading-[26px] text-gray-600 max-w-lg">
              {item.description}
            </p>
          </div>

          {/* Feature List */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-[16px]">
            {item.feature_list.map((feature: any) => (
              <div
                key={feature.id}
                className="flex gap-2 sm:gap-3 lg:gap-[16px] items-start sm:items-center"
              >
                {/* Icon Container */}
                <div className="shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 rounded-[6px] sm:rounded-[8px] border border-gray-100 shadow-sm bg-white">
                  <Image
                    src={feature.icon_feature}
                    alt={feature.title}
                    width={16}
                    height={16}
                    className="sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5"
                  />
                </div>

                {/* Feature Title */}
                <div>
                  <p className="text-xs sm:text-sm lg:text-[17px] leading-relaxed lg:leading-[28px] font-medium text-[#1b0c25]">
                    {feature.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-auto flex justify-center items-center px-0">
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[528px] aspect-[528/494]">
            <Image
              src={item.image}
              alt={item.title}
              width={528}
              height={494}
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
