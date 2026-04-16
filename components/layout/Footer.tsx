"use client";
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
    href: "https://www.facebook.com/myatps",
    bg: "#1877F2",
  },
  {
    id: 2,
    icon_src: "/assets/logos/X.png",
    label: "X",
    href: "https://x.com/myatps",
    bg: "#000000",
  },
  {
    id: 3,
    icon_src: "/assets/logos/Insta.png",
    label: "Instagram",
    href: "https://www.instagram.com/myatps",
    bg: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
  },
  {
    id: 4,
    icon_src: "/assets/logos/LinkdIn.png",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/myatps",
    bg: "#0A66C2",
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
        { name: t("linkPricing"), href: "/pricing" },
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
        <Container className="z-10 py-10 lg:py-[60px] flex flex-col items-center justify-center">
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
                <TitleSection title={t("tagline")} variant="light" />
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

            <Separator className="mt-[48px] mb-[48px] max-lg:my-8" />

            {/* Section milieu - devient colonne sur mobile */}
            <div className="flex items-start w-full justify-between text-white max-lg:flex-col max-lg:gap-10">
              {/* Partie gauche */}
              <motion.div
                variants={footerLogoVariants}
                className="flex flex-col gap-[28px] max-w-[240px] max-lg:max-w-full max-lg:items-center"
              >
                {/* Logo + nom */}
                <div className="flex items-center gap-[12px] max-lg:justify-center">
                  <div className="rounded-[6px] bg-[#1b0c25] h-[36px] w-[36px] flex items-center justify-center overflow-hidden shrink-0">
                    <Image
                      src="/assets/logo-myatps.png"
                      alt="MyATPS"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-[20px] leading-none">
                    MyATPS
                  </p>
                </div>

                <p className="text-[14px] leading-[22px] font-normal opacity-60 max-lg:text-center">
                  {t("description")}
                </p>

                {/* Social icons */}
                <motion.div
                  variants={footerLinksContainerVariants}
                  className="flex gap-[14px] max-lg:justify-center"
                >
                  {ICON_LINKS.map((icon) => (
                    <motion.a
                      key={icon.id}
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={icon.label}
                      variants={footerSocialVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-9 h-9 rounded-[10px] shrink-0 transition-opacity opacity-90 hover:opacity-100"
                      style={{ background: icon.bg }}
                    >
                      <Image
                        src={icon.icon_src}
                        alt={icon.label}
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Partie droite - colonnes de liens */}
              <motion.div
                variants={footerLinksVariants}
                className="flex gap-[48px] lg:gap-[72px] max-lg:flex-col max-lg:gap-8"
              >
                {LIST_ITEMS.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={footerLinksContainerVariants}
                    className="flex flex-col gap-[14px]"
                  >
                    <p className="text-[13px] leading-none font-semibold uppercase tracking-widest opacity-40">
                      {item.title}
                    </p>
                    <div className="flex flex-col gap-[10px]">
                      {item.links.map((link) => {
                        const isExternal = /^https?:\/\//.test(link.href);
                        if (isExternal) {
                          return (
                            <motion.a
                              key={link.name}
                              variants={footerLinkItemVariants}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[14px] font-medium leading-[22px] opacity-60 hover:opacity-100 transition-opacity"
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
                              className="text-[14px] font-medium leading-[22px] opacity-60 hover:opacity-100 transition-opacity"
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
              className="border-t border-white w-full mt-[48px] max-lg:mt-8"
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
