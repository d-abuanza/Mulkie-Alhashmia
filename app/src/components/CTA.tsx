"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { usePageNavigation } from "./PageManager";

export default function CTA() {
  const t = useTranslations("CTA");
  const { navigateTo } = usePageNavigation();

  return (
    <section
      id="consultation"
      className="py-24 px-6 lg:px-8 bg-transparent relative overflow-hidden"
    >
      {/* Subtle accent tint at top */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <Image src="/2.svg" alt="" width={32} height={32} className="shrink-0" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-white">
            {t("title")}
          </h2>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed text-lg"
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
            className="inline-flex items-center gap-3 bg-white text-dark font-headline font-bold px-10 py-4 rounded-full hover:bg-offwhite transition-all duration-300 text-lg shadow-lg cursor-pointer"
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
