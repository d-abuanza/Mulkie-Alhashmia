"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer } from "@/lib/animations";
import { useTranslations } from "next-intl";

const specializations = [
  { key: "identity", icon: "diamond" },
  { key: "strategy", icon: "diamond" },
  { key: "innovation", icon: "diamond" },
  { key: "leadership", icon: "diamond" },
];

export default function About() {
  const t = useTranslations("About");

  return (
    <section className="min-h-screen flex items-center py-28 px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">

          {/* Left Column — Title & Paragraph */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-4 mb-8"
            >
              <Image src="/2.svg" alt="" width={32} height={32} className="shrink-0" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-white leading-tight">
                {t("title")}
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={0.15}
              className="text-white/70 text-base md:text-lg leading-relaxed"
            >
              {t("paragraph")}
            </motion.p>
          </motion.div>

          {/* Right Column — Specializations */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h3
              variants={fadeUp}
              custom={0.2}
              className="text-xl md:text-2xl font-headline font-bold text-white mb-8"
            >
              {t("specializationTitle")}
            </motion.h3>

            <div className="flex flex-col gap-4">
              {specializations.map((spec, index) => (
                <motion.div
                  key={spec.key}
                  variants={fadeIn}
                  custom={0.3 + index * 0.1}
                  className="flex items-center gap-4 group"
                >
                  <Image 
                    src="/2.svg" 
                    alt="icon" 
                    width={18} 
                    height={18} 
                    className="shrink-0 group-hover:scale-125 transition-transform duration-300" 
                  />
                  <span className="text-white/90 text-base md:text-lg font-body leading-relaxed">
                    {t(`specializations.${spec.key}`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
