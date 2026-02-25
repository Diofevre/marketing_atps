"use client";

import InputField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
import TitleSection from "@/components/TitleSection";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { Mail, LifeBuoy } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  scaleInVariants,
  viewportSettings,
} from "@/lib/motion";

export default function Contact() {
  return (
    <div className="py-[120px] pb-20 max-lg:py-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute z-0 left-[-200px] top-[-100px] rounded-[600px] w-[500px] h-[400px] bg-[linear-gradient(148deg,#80a9fc_0%,#d37bff_31.09%,#fcab83_70.46%,#ff49d4_100%)] blur-[100px] opacity-[0.15] max-lg:hidden" />
      <div className="absolute z-0 right-[-100px] bottom-[100px] rounded-[600px] w-[500px] h-[400px] bg-[linear-gradient(145deg,#efe8f6_0%,#d588fb_60.83%,#ff49d4_100%)] blur-[100px] opacity-[0.15] max-lg:hidden" />

      <Container className="relative z-10 flex flex-col justify-center items-center gap-[60px] max-lg:gap-8">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col items-center text-center w-full max-w-[800px]"
        >
          <TitleSection title="Contact" />
          <h1 className="font-medium text-4xl sm:text-5xl lg:text-[60px] lg:leading-[60px] text-[#1B0C25]">
            Get in touch with our team
          </h1>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10 w-full bg-white rounded-[24px] p-4 sm:p-6 lg:p-10 border border-[#1B0C25]/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          {/* Left Column */}
          <div className="flex flex-col justify-between gap-8 lg:gap-12 lg:min-w-0 lg:flex-1 lg:max-w-[420px]">
            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              <p className="font-medium text-base lg:text-[17px] leading-[28px] text-[#1B0C25]/80">
                Feel free to reach out - we'd love to connect.
              </p>

              <div className="flex flex-wrap gap-6 lg:gap-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B0C25]/5 flex items-center justify-center shrink-0">
                    <Mail className="text-[#1B0C25]" size={20} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-medium text-[15px] leading-[26px] text-[#1B0C25]">
                      Email us
                    </p>
                    <p className="font-normal text-[15px] leading-[26px] text-[#1B0C25]/60">
                      hello@fluence.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B0C25]/5 flex items-center justify-center shrink-0">
                    <LifeBuoy className="text-[#1B0C25]" size={20} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-medium text-[15px] leading-[26px] text-[#1B0C25]">
                      Get support
                    </p>
                    <p className="font-normal text-[15px] leading-[26px] text-[#1B0C25]/60">
                      Chat with us
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="flex flex-col gap-6 p-6 bg-[#F9F9F9] rounded-2xl">
              <blockquote className="text-lg lg:text-[20px] font-medium leading-[28px] text-[#1B0C25]">
                "Fluence AI has revolutionized the way we process data. The
                seamless integration and advanced analytics tools have saved us
                countless hours."
              </blockquote>
              <div className="flex items-center gap-4">
                <Image
                  src="/images/imageCont.png"
                  alt="Amber Stone"
                  height={48}
                  width={48}
                  className="rounded-full shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="flex flex-col gap-0 min-w-0">
                  <p className="text-[14px] font-medium text-[#1B0C25] leading-tight">
                    Amber Stone
                  </p>
                  <p className="text-[13px] font-normal text-[#1B0C25]/60">
                    Manager, GrowthTech
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-w-full lg:flex-1 lg:min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="First Name" placeholder="First Name" />
              <InputField label="Last Name" placeholder="Last Name" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Email" placeholder="Email" />
              <InputField label="Phone Number" placeholder="Phone Number" />
            </div>

            <div className="flex flex-col gap-2">
              <TextareaField
                label="Message"
                placeholder="Message"
                className="w-full"
              />
            </div>

            <div className="flex flex-col items-center gap-4 mt-2">
              <Button className="group w-full h-12 text-[16px] font-medium text-white bg-[#1B0C25] hover:bg-[#1B0C25]/90 rounded-[10px] overflow-hidden">
                <span className="flex flex-col items-center h-[26px] overflow-hidden">
                  <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    Submit Message
                  </span>
                  <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    Submit Message
                  </span>
                </span>
              </Button>
              <p className="text-[13px] font-normal text-[#1B0C25]/50 leading-[20px] text-center max-w-[320px]">
                By submitting this form you agree to our friendly Privacy Policy
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
