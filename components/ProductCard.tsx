"use client";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface Feature {
  id: number;
  title: string;
  icon_feature: string;
}

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  image: string;
  feature_list: Feature[];
}

export default function ProductCard() {
  const t = useTranslations("productOverview");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const FEATURE_LIST_CONTAINER: FeatureItem[] = [
    {
      id: 1,
      title: t("card1Title"),
      description: t("card1Description"),
      image: "/images/quizz-interface.png",
      feature_list: [
        { id: 1, title: t("card1Feature1"), icon_feature: "/assets/icons/db.png" },
        { id: 2, title: t("card1Feature2"), icon_feature: "/assets/icons/topo.png" },
        { id: 3, title: t("card1Feature3"), icon_feature: "/assets/icons/swith.png" },
      ],
    },
    {
      id: 2,
      title: t("card2Title"),
      description: t("card2Description"),
      image: "/images/atps-dico.png",
      feature_list: [
        { id: 1, title: t("card2Feature1"), icon_feature: "/assets/icons/trad.png" },
        { id: 2, title: t("card2Feature2"), icon_feature: "/assets/icons/chart.png" },
        { id: 3, title: t("card2Feature3"), icon_feature: "/assets/icons/tvpro.png" },
      ],
    },
    {
      id: 3,
      title: t("card3Title"),
      description: t("card3Description"),
      image: "/images/quizz-interface-share.png",
      feature_list: [
        { id: 1, title: t("card3Feature1"), icon_feature: "/assets/icons/union.png" },
        { id: 2, title: t("card3Feature2"), icon_feature: "/assets/icons/check.png" },
        { id: 3, title: t("card3Feature3"), icon_feature: "/assets/icons/hands.png" },
      ],
    },
  ];

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
  item: FeatureItem;
  index: number;
  range: [number, number];
  targetScale: number;
  progress: MotionValue<number>;
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Reverse layout for card 2
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
            {item.feature_list.map((feature: Feature) => (
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
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[528px] aspect-[528/340] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-black/5">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-top"
              priority={index === 0}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
