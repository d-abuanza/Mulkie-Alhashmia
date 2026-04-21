"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { usePageNavigation } from "./PageManager";

export default function CTA() {
  const t = useTranslations("CTA");
  const { navigateTo } = usePageNavigation();

  return (
    <section
      id="consultation"
      className="py-24 px-6 lg:px-8 bg-surface relative overflow-hidden"
    >
      {/* Subtle accent tint at top */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-surface-accent/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-dark mb-6"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-medium mb-10 max-w-2xl mx-auto leading-relaxed text-lg"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <button
            onClick={() => navigateTo("form")}
            className="inline-flex items-center gap-3 bg-dark text-white font-headline font-bold px-10 py-4 rounded-full hover:bg-accent hover:text-dark transition-all duration-300 text-lg shadow-lg cursor-pointer"
          >
            {t("ctaButton")}
            <span className="material-symbols-outlined text-xl rtl:rotate-180">
              arrow_forward
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
