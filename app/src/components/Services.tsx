"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useTranslations } from "next-intl";

const SERVICE_ICONS = ["rocket_launch", "map", "search"] as const;
const SERVICE_KEYS = ["growth", "roadmap", "diagnosis"] as const;

export default function Services() {
  const t = useTranslations("Services");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 start-0 w-[500px] h-[500px] rounded-full bg-[#003b7a]/[0.05] blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative">

        {/* Vertical scroll-line */}
        <div className="absolute start-0 md:start-8 top-0 bottom-0 w-px hidden md:block">
          <motion.div
            style={{ height: lineHeight, opacity: lineOpacity }}
            className="w-full bg-gradient-to-b from-[#6EE0E5]/30 via-white/10 to-transparent"
          />
        </div>

        {/* ═══ Header ═══ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="md:ps-20 mb-20 md:mb-28"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-3 mb-8"
          >
            <Image src="/2.svg" alt="" width={18} height={18} className="shrink-0" />
            <span className="text-sm font-headline font-semibold text-white/40 tracking-wide">
              {t("title")}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-bold text-white leading-[1.1] tracking-tight max-w-4xl"
          >
            {t("headline")}{" "}
            <span className="text-[#6EE0E5]">{t("headlineHighlight")}</span>
          </motion.h2>
        </motion.div>

        {/* ═══ Service Items ═══ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="md:ps-20 flex flex-col"
        >
          {SERVICE_KEYS.map((key, i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              custom={i * 0.12}
              className="group grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 py-10 md:py-14 border-b border-white/[0.06] last:border-b-0 transition-colors hover:border-white/15"
            >
              {/* Number + Icon */}
              <div className="flex items-start gap-4 md:w-48 shrink-0">
                <span className="text-3xl md:text-4xl font-headline font-bold text-white/[0.08] group-hover:text-white/20 transition-colors duration-500 tabular-nums leading-none">
                  0{i + 1}
                </span>
                <span className="material-symbols-outlined text-xl text-[#8fd108]/60 group-hover:text-[#8fd108] transition-colors duration-300 mt-1">
                  {SERVICE_ICONS[i]}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-white/80 group-hover:text-white transition-colors duration-300">
                  {t(`cards.${key}.title`)}
                </h3>
                <p className="text-white/40 text-sm md:text-base leading-[1.9] font-body max-w-xl group-hover:text-white/60 transition-colors duration-300">
                  {t(`cards.${key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
