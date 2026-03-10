"use client";
import React from "react";
import { ButtonDemo } from "../ButtonDemo";
import { Separator } from "../ui/separator";
import { Container } from "../ui/container";
import Image from "next/image";
import TitleSection from "../TitleSection";
import { motion } from "framer-motion";
import {
  footerContainerVariants,
  footerCTAVariants,
  footerLogoVariants,
  footerLinksVariants,
  footerSocialVariants,
  footerBottomVariants,
  footerLinkItemVariants,
  footerLinksContainerVariants,
  viewportSettings,
} from "@/lib/motion";

const ICON_LINKS = [
  {
    id: 1,
    icon_src: "/assets/logos/facebook.png",
    label: "Facebook",
  },
  {
    id: 2,
    icon_src: "/assets/logos/X.png",
    label: "X",
  },
  {
    id: 3,
    icon_src: "/assets/logos/Insta.png",
    label: "Instagram",
  },
  {
    id: 4,
    icon_src: "/assets/logos/LinkdIn.png",
    label: "LinkedIn",
  },
];

const LIST_ITEMS = [
  {
    id: 1,
    title: "User link",
    links: [
      { name: "Features", href: "/#bento" },
      { name: "About", href: "/#about" },
      { name: "Testimonials", href: "/#testimonials" },
      { name: "Pricing", href: "/#pricing" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
      { name: "News", href: "/news" },
    ],
  },
];

const Footer = () => {
  return (
    <div className="pb-[16px] px-[16px]">
      <div className="relative bg-[#1B0C25] rounded-[16px] px-4 lg:px-0 overflow-hidden">
        {/* Gradients - cachés sur mobile/tablette */}
        <div className="absolute z-[-1px] left-[-246px] top-[-186px] rounded-[603px] w-[658px] h-[548px] bg-[linear-gradient(148deg,#80a9fc_0%,#d37bff_31.09%,#fcab83_70.46%,#ff49d4_100%)] blur-[80px] opacity-[0.4] max-lg:hidden" />
        <div className="absolute z-[-1px] right-[-86px] top-[590px] rounded-[603px] w-[658px] h-[548px] bg-[linear-gradient(145deg,#efe8f6_0%,#d588fb_60.83%,#ff49d4_100%)] blur-[80px] opacity-[0.4] max-lg:hidden" />

        {/* Contenu principal */}
        <Container className="z-10 py-12 lg:py-[100px] flex flex-col items-center justify-center">
          <motion.div
            variants={footerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="w-full"
          >
            {/* Section CTA */}
            <motion.div
              variants={footerCTAVariants}
              className="flex flex-col gap-[32px] max-lg:gap-6 max-lg:text-center"
            >
              <div className="flex flex-col items-start gap-[12px] justify-start max-lg:items-center">
                <TitleSection title="Start Your ATPL Journey" />
                <h1 className="text-[72px] font-medium leading-[76px] text-white max-lg:text-4xl max-lg:leading-tight">
                  Ready to pass your ATPL on the first try?
                </h1>
              </div>
              <ButtonDemo />
            </motion.div>

            <Separator className="mt-[100px] mb-[100px] max-lg:my-12" />

            {/* Section milieu - devient colonne sur mobile */}
            <div className="flex items-start w-full justify-between text-white max-lg:flex-col max-lg:gap-8">
              {/* Partie gauche */}
              <motion.div
                variants={footerLogoVariants}
                className="flex flex-col gap-[32px] max-w-[220px] max-lg:max-w-full max-lg:items-center"
              >
                {/* Logo + nom */}
                <div className="flex flex-col gap-[16px] max-lg:items-center">
                  <div className="flex gap-[12px] max-lg:justify-center">
                    <div className="bg-white h-[40px] w-[40px] rounded-md" />
                    <p className="font-medium text-[30px] leading-[40px] max-lg:text-2xl">
                      MyATPS
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] leading-[25px] font-normal max-lg:text-center">
                      The complete ATPL training platform
                    </p>
                  </div>
                </div>

                {/* Social icons */}
                <motion.div
                  variants={footerLinksContainerVariants}
                  className="flex gap-[16px] max-lg:justify-center"
                >
                  {ICON_LINKS.map((icon) => (
                    <motion.div
                      key={icon.id}
                      variants={footerSocialVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={icon.icon_src}
                        alt={icon.label}
                        width={40}
                        height={40}
                        className="max-lg:w-8 max-lg:h-8 cursor-pointer"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Partie droite - devient colonne sur mobile */}
              <motion.div
                variants={footerLinksVariants}
                className="flex gap-[60px] h-[266px] max-w-[397px] max-lg:flex-col max-lg:gap-8 max-lg:h-auto max-lg:max-w-full"
              >
                {/* User Links */}
                <motion.div
                  variants={footerLinksContainerVariants}
                  className="flex flex-col gap-[16px] items-start lg:items-center"
                >
                  <div>
                    <p className="text-[15px] leading-[26px] font-medium">
                      User Link
                    </p>
                  </div>
                  <div>
                    {LIST_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-[8px] items-start lg:items-center"
                      >
                        {item.links.map((link) => (
                          <motion.a
                            key={link.name}
                            variants={footerLinkItemVariants}
                            href={link.href}
                            className="text-[15px] font-medium leading-[26px] opacity-[0.6] hover:opacity-100 transition-opacity max-lg:text-center"
                          >
                            {link.name}
                          </motion.a>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Company Address */}
                <motion.div
                  variants={footerLinksContainerVariants}
                  className="flex flex-col gap-[16px] items-start lg:items-center"
                >
                  <div>
                    <p className="text-[15px] leading-[26px] font-medium">
                      Company
                    </p>
                  </div>
                  <div>
                    <motion.div
                      variants={footerLinkItemVariants}
                      className="flex flex-col gap-[8px]"
                    >
                      <p className="text-[15px] font-medium w-[184px] leading-[26px] opacity-[0.6] max-lg:text-center max-lg:w-full">
                        329 rue Papineau, Québec (Québec) G1L 4E2, Canada
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Footer bottom */}
            <motion.div
              variants={footerBottomVariants}
              className="border-t border-white w-full mt-[100px] max-lg:mt-12"
            >
              <div className="flex items-center justify-between w-full mt-[24px] text-white max-lg:flex-col max-lg:gap-4 max-lg:text-center">
                <p className="text-[15px] leading-[26px] max-lg:text-sm">
                  © 2026 MyATPS — DIOFEVRE TECHNOLOGIE
                </p>
                <p className="text-[15px] leading-[26px] opacity-[0.6] max-lg:text-sm">
                  Privacy Policy
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
