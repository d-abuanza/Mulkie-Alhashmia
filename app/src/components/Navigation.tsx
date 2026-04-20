"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("Navigation");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("services"), href: "#services" },
    { label: t("methodology"), href: "#methodology" },
    { label: t("consultation"), href: "#consultation" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto relative">
        {/* Logo */}
        <a
          href="#"
          className="text-lg font-serif italic text-dark tracking-tight"
        >
          Dr. Mulkie Al-Hashmi
        </a>

        {/* Menu Toggle & Language Switcher */}
        <div className="relative flex items-center gap-3">
          <LanguageSwitcher />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 rounded-full border border-dark/15 flex items-center justify-center hover:bg-dark/5 transition-all duration-300 active:scale-95 shadow-sm"
            aria-label="Toggle navigation"
          >
            <span
              className={`material-symbols-outlined text-dark text-xl transition-transform duration-300 ${
                mobileOpen ? "rotate-90" : ""
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
                className="absolute end-0 top-full mt-4 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-dark/5 overflow-hidden z-50 ltr:origin-top-right rtl:origin-top-left"
              >
                <div className="p-3 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm font-body font-medium text-dark/70 hover:text-dark hover:bg-surface-green/50 rounded-xl transition-all duration-200 text-left"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="h-[1px] bg-dark/5 my-1" />
                  <a
                    href="#consultation"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-bold text-dark bg-accent/20 hover:bg-accent/40 rounded-xl text-center font-headline transition-all duration-300"
                  >
                    {t("getInTouch")}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
