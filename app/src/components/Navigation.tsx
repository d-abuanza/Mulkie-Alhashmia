"use client";

import { useState } from "react";
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
          className="text-lg font-serif italic text-white tracking-tight hover:opacity-70 transition-opacity"
        >
          Dr. Mulkie Al-Hashmi
        </button>

        {/* Menu Toggle & Language Switcher */}
        <div className="relative flex items-center gap-3">
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

          {/* Floating Dropdown Menu */}
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
                      className={`px-4 py-3 text-sm font-body font-medium rounded-xl transition-all duration-200 text-left w-full ${link.page === "about" ? "md:hidden block" : "block"} ${activePage === link.page
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
                    className="px-4 py-3 text-sm font-bold text-dark bg-white hover:bg-offwhite rounded-xl text-center font-headline transition-all duration-300 w-full shadow-md cursor-pointer"
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
