"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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

import { APP_URL } from "@/lib/constants";

const Footer = () => {
  const t = useTranslations("footer");
  const tHero = useTranslations("hero");
  const LIST_ITEMS = [
    {
      id: 1,
      title: t("sectionPlatform"),
      links: [
        { name: t("linkFeatures"), href: "/#bento" },
        { name: t("linkPricing"), href: "/#pricing" },
        { name: t("linkEnterprise"), href: "/enterprise" },
        { name: t("linkLogIn"), href: `${APP_URL}/auth/login` },
        { name: t("linkSignUp"), href: `${APP_URL}/auth/signup` },
      ],
    },
    {
      id: 2,
      title: t("sectionResources"),
      links: [
        { name: t("linkBlog"), href: "/blog" },
        { name: t("linkNews"), href: "/news" },
        { name: t("linkContact"), href: "/contact" },
        { name: "FAQ", href: "/#faq" },
        { name: t("linkPrivacy"), href: "/privacy" },
      ],
    },
  ];
  return (
    <div className="pb-[16px] px-[16px]">
      <div className="relative bg-[#1b0c25] rounded-[16px] px-4 lg:px-0 overflow-hidden">
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
                <TitleSection title={t("tagline")} />
                {/*
                  h2 (not h1): the Footer is rendered on every page, so using
                  h1 here would duplicate the page's main heading and hurt SEO.
                */}
                <h2 className="text-[72px] font-medium leading-[76px] text-white max-lg:text-4xl max-lg:leading-tight">
                  {tHero("title1")} {tHero("titleHighlight")}?
                </h2>
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
                  <div className="flex gap-[12px] max-lg:justify-center items-center">
                    <div className="h-[40px] w-[40px] rounded-md flex items-center justify-center overflow-hidden">
                      <Image
                        src="/assets/logo-yellow.png"
                        alt="MyATPS"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-[30px] leading-[40px] max-lg:text-2xl">
                      MyATPS
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] leading-[25px] font-normal max-lg:text-center">
                      {t("description")}
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

              {/* Partie droite - colonnes de liens */}
              <motion.div
                variants={footerLinksVariants}
                className="flex gap-[60px] max-lg:flex-col max-lg:gap-8"
              >
                {LIST_ITEMS.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={footerLinksContainerVariants}
                    className="flex flex-col gap-[16px] items-start lg:items-center"
                  >
                    <p className="text-[15px] leading-[26px] font-medium">
                      {item.title}
                    </p>
                    <div className="flex flex-col gap-[8px] items-start lg:items-center">
                      {item.links.map((link) => {
                        // External URLs (absolute http/https, e.g. the
                        // APP_URL auth links) use a plain anchor so they
                        // open cleanly without going through next-intl.
                        // Internal URLs (including hash fragments like
                        // `/#pricing`) go through the locale-aware Link
                        // so `/fr/#pricing` is preserved when the user
                        // is browsing in French.
                        const isExternal = /^https?:\/\//.test(link.href);
                        if (isExternal) {
                          return (
                            <motion.a
                              key={link.name}
                              variants={footerLinkItemVariants}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[15px] font-medium leading-[26px] opacity-[0.6] hover:opacity-100 transition-opacity max-lg:text-center"
                            >
                              {link.name}
                            </motion.a>
                          );
                        }
                        return (
                          <motion.div
                            key={link.name}
                            variants={footerLinkItemVariants}
                          >
                            <Link
                              href={link.href}
                              className="text-[15px] font-medium leading-[26px] opacity-[0.6] hover:opacity-100 transition-opacity max-lg:text-center"
                            >
                              {link.name}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Footer bottom */}
            <motion.div
              variants={footerBottomVariants}
              className="border-t border-white w-full mt-[100px] max-lg:mt-12"
            >
              <div className="flex items-center justify-between w-full mt-[24px] text-white max-lg:flex-col max-lg:gap-4 max-lg:text-center">
                <p className="text-[15px] leading-[26px] max-lg:text-sm">
                  © 2026 MyATPS. {t("rightsReserved")}
                </p>
                <Link
                  href="/privacy"
                  className="text-[15px] leading-[26px] opacity-[0.6] hover:opacity-100 transition-opacity max-lg:text-sm"
                >
                  {t("linkPrivacy")}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
