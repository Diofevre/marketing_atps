"use client";

import { ButtonDemoVarient } from "../ButtonDemo";
import TitleSection from "../TitleSection";
import { Container } from "../ui/container";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  workContainerVariants,
  workStepVariants,
  viewportSettings,
} from "@/lib/motion";

const LIST_WORK = [
  {
    id: 1,
    image: "/images/imageCon.png",
    title: "Create Your Account",
    description:
      "Sign up in seconds — start with the Free plan or unlock everything with a 48-hour Premium trial. No credit card required.",
  },
  {
    id: 2,
    image: "/images/imageAn.png",
    title: "Study & Practice",
    description:
      "Train across three quiz modes, look up terms in the 3D dictionary, access the resource library, and invite classmates to live sessions.",
  },
  {
    id: 3,
    image: "/images/imageLet.png",
    title: "Pass Your ATPL",
    description:
      "Track your progress across all 14 subjects, spot your weak areas with color-coded analytics, and sit your exam with confidence.",
  },
];

export default function Work() {
  return (
    <div className="py-12 lg:py-[200px]">
      <Container>
        <motion.div
          variants={workContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col gap-[24px] items-start w-full"
        >
          <div className="flex flex-row items-stretch gap-6 w-full max-lg:flex-col">
            <motion.div
              variants={fadeInUpVariants}
              className="flex-[1.6] max-lg:w-full"
            >
              <div className="flex flex-col p-10 gap-6 h-full rounded-[16px] bg-white shadow-sm max-lg:p-6">
                <div className="flex flex-col items-start gap-3">
                  <TitleSection
                    title="How it works"
                    className="shadow-[0_33px_13px_0_rgba(0,0,0,0.01),0_19px_11px_0_rgba(0,0,0,0.04),0_8px_8px_0_rgba(0,0,0,0.06),0_2px_5px_0_rgba(0,0,0,0.07)]"
                  />
                  <h2 className="font-medium text-5xl lg:text-[59px] leading-tight lg:leading-[60px] text-[#1b0c25]">
                    A Simple 3-Step Process
                  </h2>
                </div>

                <p className="font-normal text-base lg:text-[17px] text-[#1b0c25] leading-7">
                  From sign-up to your first quiz in under two minutes.
                  No complex setup, no separate apps to install — just
                  open MyATPS and start studying.
                </p>
                <ButtonDemoVarient />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="flex-1 flex flex-col items-center p-2 bg-white shadow-sm rounded-[16px] max-lg:w-full"
            >
              <Image
                src="/images/imageAI.png"
                alt="Work illustration"
                width={448}
                height={516}
                className="w-full h-auto object-cover rounded-lg"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-lg:grid-cols-2 max-md:grid-cols-1">
            {LIST_WORK.map((item) => (
              <motion.div
                key={item.id}
                variants={workStepVariants}
                className="flex flex-col items-center gap-8 p-2 rounded-[16px] bg-white shadow-sm"
              >
                <div className="w-full rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={381}
                    height={278}
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex flex-col gap-4 px-5 pb-5 w-full">
                  <h3 className="text-xl lg:text-[23px] font-medium leading-7 text-[#1b0c25]">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-[15px] leading-6 font-normal text-[#1b0c25]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
