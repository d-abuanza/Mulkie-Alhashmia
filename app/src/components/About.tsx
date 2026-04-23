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
    <section className="min-h-[auto] md:min-h-screen flex items-center pt-32 pb-16 md:py-28 px-4 md:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">

          {/* Left Column — Title & Paragraph */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8"
            >
              <Image src="/2.svg" alt="" width={32} height={32} className="shrink-0 w-6 h-6 md:w-8 md:h-8" />
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-headline font-bold text-white leading-tight">
                {t("title")}
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={0.15}
              className="text-white/70 text-sm md:text-lg leading-relaxed"
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
              className="text-lg md:text-2xl font-headline font-bold text-white mb-5 md:mb-8"
            >
              {t("specializationTitle")}
            </motion.h3>

            <div className="flex flex-col gap-4 md:gap-5">
              {specializations.map((spec, index) => (
                <motion.div
                  key={spec.key}
                  variants={fadeIn}
                  custom={0.3 + index * 0.1}
                  className="flex items-center gap-4 md:gap-5 group"
                >
                  <Image 
                    src="/2.svg" 
                    alt="icon" 
                    width={22} 
                    height={22} 
                    className="shrink-0 w-4 h-4 md:w-[22px] md:h-[22px] group-hover:scale-125 transition-transform duration-300" 
                  />
                  <span className="text-white/90 text-base md:text-xl font-body leading-relaxed">
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
