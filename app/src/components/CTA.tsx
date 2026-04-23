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
          className="flex items-center justify-center gap-3 md:gap-4 mb-6"
        >
          <Image src="/2.svg" alt="" width={56} height={56} className="shrink-0 w-8 h-8 md:w-14 md:h-14" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-headline font-bold text-white">
            {t("title")}
          </h2>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed text-sm md:text-lg px-2"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.button
            onClick={() => navigateTo("form")}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="group mx-auto w-[90vw] md:w-auto bg-white text-dark px-6 md:px-10 py-4 md:py-5 rounded-full font-headline font-bold text-base md:text-xl flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.4)] cursor-pointer"
          >
            {t("ctaButton")}
            <span className="material-symbols-outlined text-xl md:text-3xl rtl:rotate-180 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              arrow_forward
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
