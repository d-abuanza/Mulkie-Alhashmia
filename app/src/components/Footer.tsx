"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { fadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { usePageNavigation, type PageId } from "./PageManager";

export default function Footer() {
  const t = useTranslations("Footer");
  const { navigateTo } = usePageNavigation();

  const handleNav = (e: React.MouseEvent, page: PageId) => {
    e.preventDefault();
    navigateTo(page);
  };

  return (
    <footer className="w-full bg-[#0c1a2e]/95 border-t border-white/10 py-5 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Quick Links */}
          <div className="flex items-center gap-4 order-3 md:order-1">
            <button onClick={(e) => handleNav(e, "hero")} className="text-white/60 hover:text-white transition-colors text-[11px] md:text-xs font-medium">
              {t("links.home")}
            </button>
            <span className="text-white/15 text-[10px]">|</span>
            <button onClick={(e) => handleNav(e, "about")} className="text-white/60 hover:text-white transition-colors text-[11px] md:text-xs font-medium">
              {t("links.about")}
            </button>
            <span className="text-white/15 text-[10px]">|</span>
            <button onClick={(e) => handleNav(e, "services")} className="text-white/60 hover:text-white transition-colors text-[11px] md:text-xs font-medium">
              {t("links.services")}
            </button>
            <span className="text-white/15 text-[10px]">|</span>
            <button onClick={(e) => handleNav(e, "methodology")} className="text-white/60 hover:text-white transition-colors text-[11px] md:text-xs font-medium">
              {t("links.methodology")}
            </button>
            <span className="text-white/15 text-[10px]">|</span>
            <button onClick={(e) => handleNav(e, "consultation")} className="text-white/60 hover:text-white transition-colors text-[11px] md:text-xs font-medium">
              {t("links.consultation")}
            </button>
          </div>

          {/* Copyright */}
          <div className="text-white/40 font-label text-[10px] md:text-xs tracking-wide order-2">
            {t("copyright", { year: new Date().getFullYear() })}
          </div>

          {/* Brand + Socials */}
          <div className="flex items-center gap-3 order-1 md:order-3">
            <div className="relative h-6 md:h-8 w-24 md:w-32 opacity-80">
              <Image
                src="/توقيع مُلكي أبيض.png"
                alt="Dr. Mulkie Al-Hashmi"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <a
                href="https://www.linkedin.com/in/dr-mulkie-al-hashmi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                title="LinkedIn"
              >
                <svg className="w-3 h-3 fill-white/70" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a
                href="mailto:Mulkieadam@gmail.com"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                title="Email"
              >
                <span className="material-symbols-outlined text-white/70 text-[14px]">
                  mail
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
