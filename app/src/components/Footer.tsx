"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full py-16 px-6 lg:px-8 bg-[#091422]/60 border-t border-white/5">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto"
      >
        {/* Brand */}
        <div className="text-lg font-serif italic text-white/60">
          Dr. Mulkie Al-Hashmi
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:Mulkieadam@gmail.com"
            className="group w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
            title="Email"
          >
            <span className="material-symbols-outlined text-white/40 group-hover:text-white text-[20px] leading-none">
              mail
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/dr-mulkie-al-hashmi"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
            title="LinkedIn"
          >
            <svg
              className="w-5 h-5 fill-white/40 group-hover:fill-white transition-colors duration-300"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-white/20 font-label text-xs tracking-wide">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </motion.div>
    </footer>
  );
}
