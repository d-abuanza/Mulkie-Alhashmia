"use client";

import { useState } from "react";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePageNavigation, type PageId } from "./PageManager";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activePage, navigateTo } = usePageNavigation();
  const t = useTranslations("Navigation");

  const navLinks: { label: string; page: PageId }[] = [
    { label: t("about"), page: "about" },
    { label: t("services"), page: "services" },
    { label: t("methodology"), page: "methodology" },
    { label: t("consultation"), page: "consultation" },
  ];

  const handleNav = (page: PageId) => {
    navigateTo(page);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-[#0c1a2e]/40 backdrop-blur-xl border-b border-white/5"
    >
      <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto relative">
        {/* Logo — clicking it goes back to Hero */}
        <button
          onClick={() => handleNav("hero")}
          className="relative h-8 md:h-10 w-32 md:w-40 hover:opacity-70 transition-opacity"
        >
          <Image
            src="/توقيع مُلكي أبيض.png"
            alt="Dr. Mulkie Al-Hashmi"
            fill
            className="object-contain"
            priority
          />
        </button>

        {/* ===== DESKTOP NAV LINKS (hidden on mobile) ===== */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNav(link.page)}
              className={`px-4 py-2 text-sm font-body font-medium rounded-full transition-all duration-200 ${activePage === link.page
                ? "text-white bg-white/10 font-semibold"
                : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
            >
              {link.label}
            </button>
          ))}
          <motion.button
            onClick={() => handleNav("consultation")}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="ms-2 px-5 py-2 text-sm font-bold text-[#0c1a2e] bg-[#8fd108] hover:bg-[#a0e010] rounded-full font-headline transition-all duration-300 shadow-[0_0_12px_rgba(143,209,8,0.2)] hover:shadow-[0_4px_20px_rgba(143,209,8,0.35)] cursor-pointer"
          >
            {t("getInTouch")}
          </motion.button>
          {/* <div className="ms-2">
            <LanguageSwitcher />
          </div> */}
        </div>

        {/* ===== MOBILE: Hamburger + Language Switcher (hidden on desktop) ===== */}
        <div className="relative flex md:hidden items-center gap-3">
          <LanguageSwitcher />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/5 transition-all duration-300 active:scale-95 shadow-sm"
            aria-label="Toggle navigation"
          >
            <span
              className={`material-symbols-outlined text-white text-xl transition-transform duration-300 ${mobileOpen ? "rotate-90" : ""
                }`}
            >
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>

          {/* Floating Dropdown Menu — mobile only */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute end-0 top-full mt-4 w-56 bg-[#0c1a2e]/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden z-50 ltr:origin-top-right rtl:origin-top-left"
              >
                <div className="p-3 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.page}
                      onClick={() => handleNav(link.page)}
                      className={`px-4 py-3 text-sm font-body font-medium rounded-xl transition-all duration-200 text-left w-full block ${activePage === link.page
                        ? "text-white bg-white/10 font-semibold"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="h-[1px] bg-white/5 my-1" />
                  <motion.button
                    onClick={() => handleNav("consultation")}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 text-sm font-bold text-[#0c1a2e] bg-[#8fd108] hover:bg-[#a0e010] rounded-xl text-center font-headline transition-all duration-300 w-full shadow-md cursor-pointer"
                  >
                    {t("getInTouch")}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
