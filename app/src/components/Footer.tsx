"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full py-16 px-6 lg:px-8 bg-surface-accent/40 border-t border-accent/10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto"
      >
        {/* Brand */}
        <div className="text-lg font-serif italic text-dark/70">
          Dr. Mulkie Al-Hashmi
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-label text-xs tracking-wide leading-relaxed text-center">
          {[t("links.branding"), t("links.entrepreneurship"), t("links.privacy"), t("links.contact")].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-dark/40 hover:text-accent-dark transition-colors duration-200"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* Copyright */}
        <div className="text-dark/30 font-label text-xs tracking-wide">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </motion.div>
    </footer>
  );
}
