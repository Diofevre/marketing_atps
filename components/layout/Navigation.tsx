"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LocaleSwitcher from "./LocaleSwitcher";
import {
  navigationVariants,
  navigationLogoVariants,
  navigationLinkVariants,
  navigationButtonVariants,
  navigationContainerVariants,
  mobileMenuVariants,
  mobileMenuItemVariants,
} from "@/lib/motion";

import { APP_URL } from "@/lib/constants";

const Navigation = () => {
  const t = useTranslations("nav");
  const NAV_LIST = [
    { id: 1, name: t("pricing"), link: "/#pricing" },
    { id: 2, name: t("blog"), link: "/blog" },
    { id: 3, name: t("news"), link: "/news" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 200);
    };

    // Initial check
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculer les valeurs en fonction du scroll et de la taille d'écran
  // Design compact par défaut, encore plus compact au scroll
  const getContainerHeight = () => {
    if (isMobile) return isScrolled ? "56px" : "72px";
    if (isTablet) return isScrolled ? "60px" : "78px";
    return isScrolled ? "68px" : "88px";
  };

  const getContainerPadding = () => {
    if (isMobile) return isScrolled ? "4px" : "8px";
    if (isTablet) return isScrolled ? "6px" : "10px";
    return isScrolled ? "8px" : "12px";
  };

  const getNavWidth = () => {
    if (isMobile) return "100%";
    if (isTablet) return isScrolled ? "90%" : "100%";
    return isScrolled ? "700px" : "100%";
  };

  const getNavHeight = () => {
    if (isMobile) return isScrolled ? "48px" : "56px";
    if (isTablet) return isScrolled ? "48px" : "58px";
    return isScrolled ? "52px" : "64px";
  };

  const getNavPadding = () => {
    if (isMobile) return isScrolled ? "4px" : "8px";
    if (isTablet) return isScrolled ? "4px" : "8px";
    return isScrolled ? "6px" : "10px";
  };

  const getLogoSize = () => {
    if (isMobile)
      return {
        box: isScrolled ? "26px" : "30px",
        text: isScrolled ? "16px" : "18px",
        gap: isScrolled ? "6px" : "8px",
      };
    if (isTablet)
      return {
        box: isScrolled ? "26px" : "30px",
        text: isScrolled ? "16px" : "18px",
        gap: isScrolled ? "6px" : "8px",
      };
    return {
      box: isScrolled ? "28px" : "32px",
      text: isScrolled ? "18px" : "20px",
      gap: isScrolled ? "6px" : "10px",
    };
  };

  const logoSize = getLogoSize();

  return (
    <motion.div
      variants={navigationVariants}
      initial="hidden"
      animate="visible"
      className="fixed z-100 w-full transition-all duration-300"
      style={{
        height: getContainerHeight(),
        padding: getContainerPadding(),
      }}
    >
      <Container className="h-full flex items-center justify-center">
        <motion.div
          variants={navigationVariants}
          className="flex items-center justify-center transition-all duration-300 rounded-[14px] backdrop-blur-[3px]"
          style={{
            width: getNavWidth(),
            height: getNavHeight(),
            padding: getNavPadding(),
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
            border: "none",
          }}
        >
          <div
            className="flex items-center transition-all duration-300 w-full"
            style={{
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Link href='/'>
              <motion.div
                variants={navigationLogoVariants}
                className="flex items-center transition-all duration-300 shrink-0"
                style={{
                  gap: logoSize.gap,
                }}
              >
                <div
                  className="rounded-[6px] flex items-center justify-center transition-all duration-300 shrink-0 overflow-hidden"
                  style={{
                    height: logoSize.box,
                    width: logoSize.box,
                  }}
                >
                  <Image
                    src="/assets/logo-navy.png"
                    alt="MyATPS"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="font-medium text-[#1b0c25] transition-all duration-300 whitespace-nowrap"
                  style={{
                    fontSize: logoSize.text,
                    lineHeight: logoSize.text,
                  }}
                >
                  MyATPS
                </p>
              </motion.div>
            </Link>

            {/* Desktop Nav - Caché sur mobile/tablet */}
            {!isMobile && (
              <motion.div
                variants={navigationContainerVariants}
                initial="hidden"
                animate="visible"
                className={`${
                  isTablet ? "hidden lg:flex" : "flex"
                } items-center transition-all duration-300 shrink-0`}
                style={{
                  gap: isScrolled
                    ? isTablet
                      ? "12px"
                      : "18px"
                    : isTablet
                      ? "16px"
                      : "24px",
                }}
              >
                <motion.div
                  variants={navigationContainerVariants}
                  className="flex transition-all duration-300"
                  style={{
                    gap: isScrolled
                      ? isTablet
                        ? "6px"
                        : "10px"
                      : isTablet
                        ? "10px"
                        : "16px",
                  }}
                >
                  {NAV_LIST.map((item) => (
                    <motion.div key={item.id} variants={navigationLinkVariants}>
                      <Link
                        href={item.link}
                        className="font-medium text-[#1b0c25] opacity-[0.5] hover:opacity-80 transition-all duration-300 whitespace-nowrap"
                        style={{
                          fontSize: isScrolled
                            ? isTablet
                              ? "11px"
                              : "12px"
                            : isTablet
                              ? "12px"
                              : "14px",
                        }}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div variants={navigationButtonVariants} className="flex items-center gap-2">
                  <LocaleSwitcher variant="desktop" />
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="group font-medium rounded-[8px] p-[6px] backdrop-blur-[6px] border-[#1b0c25] text-[#1b0c25] hover:bg-[#1b0c25] hover:text-white transition-all duration-300"
                      style={{
                        fontSize: isScrolled
                          ? isTablet
                            ? "11px"
                            : "12px"
                          : isTablet
                            ? "12px"
                            : "14px",
                        width: isScrolled
                          ? isTablet
                            ? "70px"
                            : "85px"
                          : isTablet
                            ? "80px"
                            : "100px",
                        height: isScrolled
                          ? isTablet
                            ? "28px"
                            : "32px"
                          : isTablet
                            ? "30px"
                            : "36px",
                      }}
                    >
                      {t("contact")}
                    </Button>
                  </Link>
                  <Link href={`${APP_URL}/auth/login`} target="_blank">
                    <Button
                      className="group font-medium rounded-[8px] p-[6px] backdrop-blur-[6px] bg-[#1b0c25] hover:bg-[#1b0c25]/90 shadow-[0_1px_2px_0_rgba(0,0,0,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.4)] transition-all duration-300"
                      style={{
                        fontSize: isScrolled
                          ? isTablet
                            ? "11px"
                            : "12px"
                          : isTablet
                            ? "12px"
                            : "14px",
                        width: isScrolled
                          ? isTablet
                            ? "70px"
                            : "85px"
                          : isTablet
                            ? "80px"
                            : "100px",
                        height: isScrolled
                          ? isTablet
                            ? "28px"
                            : "32px"
                          : isTablet
                            ? "30px"
                            : "36px",
                      }}
                    >
                      {t("logIn")}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {/* Mobile/Tablet Hamburger - Visible uniquement sur mobile et tablette */}
            {(isMobile || isTablet) && (
              <button
                className="flex items-center justify-center w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] gap-[5px] focus:outline-none"
                onClick={() => setIsMenuOpen(true)}
                aria-label={t("openMenu")}
              >
                <div className="flex flex-col justify-center items-center gap-[5px]">
                  <span className="w-[20px] sm:w-[22px] h-[2px] bg-[#1b0c25] rounded-full block transition-all duration-300" />
                  <span className="w-[20px] sm:w-[22px] h-[2px] bg-[#1b0c25] rounded-full block transition-all duration-300" />
                  <span className="w-[20px] sm:w-[22px] h-[2px] bg-[#1b0c25] rounded-full block transition-all duration-300" />
                </div>
              </button>
            )}
          </div>
        </motion.div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-200"
            style={{
              background: "rgba(200,180,220,0.25)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`absolute ${
                isMobile
                  ? "top-[16px] left-[16px] right-[16px]"
                  : "top-[24px] left-[24px] right-[24px] max-w-[400px] ml-auto"
              } rounded-[20px] bg-white p-[24px] shadow-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-[28px]">
                <div className="flex items-center gap-[12px]">
                  <div className="h-[40px] w-[40px] rounded-[6px] flex items-center justify-center overflow-hidden">
                    <Image
                      src="/assets/logo-navy.png"
                      alt="MyATPS"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[20px] sm:text-[22px] font-medium text-[#1b0c25]">
                    MyATPS
                  </p>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#1b0c25] opacity-40 hover:opacity-70 text-[20px] leading-none w-[32px] h-[32px] flex items-center justify-center"
                  aria-label={t("closeMenu")}
                >
                  ✕
                </button>
              </div>

              {/* Nav Links */}
              <motion.div
                variants={navigationContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-[4px] mb-[28px]"
              >
                {NAV_LIST.map((item) => (
                  <motion.div key={item.id} variants={mobileMenuItemVariants}>
                    <Link
                      href={item.link}
                      className="text-[16px] sm:text-[17px] font-medium text-[#1b0c25] opacity-50 hover:opacity-80 py-[10px] transition-opacity block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Language switcher — full width above the action buttons
                  so the tap target is generous on mobile */}
              <motion.div
                variants={mobileMenuItemVariants}
                className="mb-[16px]"
              >
                <LocaleSwitcher variant="mobile" />
              </motion.div>

              {/* Buttons */}
              <motion.div variants={mobileMenuItemVariants} className="flex gap-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="text-[15px] sm:text-[16px] font-medium h-[42px] sm:h-[44px] rounded-[10px] border-[#1b0c25] text-[#1b0c25] px-6">
                    {t("contact")}
                  </Button>
                </Link>
                <Link href={`${APP_URL}/auth/login`} target="_blank">
                  <Button className="text-[15px] sm:text-[16px] font-medium h-[42px] sm:h-[44px] rounded-[10px] bg-[#1b0c25] hover:bg-[#1b0c25]/90 px-6">
                    {t("logIn")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navigation;
