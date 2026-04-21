"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroFadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { usePageNavigation } from "./PageManager";

export default function Hero() {
  const t = useTranslations("Hero");
  const ta = useTranslations("About");
  const { navigateTo } = usePageNavigation();

  const specializations = [
    { key: "identity" },
    { key: "strategy" },
    { key: "innovation" },
    { key: "leadership" },
  ];

  return (
    <header className="relative min-h-screen hero-gradient pt-24 pb-8 md:pb-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative h-full flex flex-col">


        {/* Main Title — Centered Above Portrait */}
        <motion.div 
          className="text-center relative z-10"
          animate={{
            filter: ["blur(0px)", "blur(8px)", "blur(0px)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        >
          <motion.h1
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-white leading-[0.95] tracking-tight"
          >
            {t("greeting")}
          </motion.h1>
          <motion.p
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-white/80 leading-[1] mt-2"
          >
            {t("role1")}
          </motion.p>
          <motion.p
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={0.9}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-white/80 leading-[1]"
          >
            {t("role2")}
          </motion.p>
        </motion.div>

        {/* Portrait — Centered, Overlapping Title */}
        <motion.div
          variants={heroFadeUp}
          initial="hidden"
          animate="visible"
          custom={1.2}
          className="relative z-20 flex justify-center -mt-8 md:-mt-16"
        >
          <div className="relative w-[280px] h-[360px] sm:w-[380px] sm:h-[500px] md:w-[440px] md:h-[580px]">
            <Image
              src="/Mulkie.png"
              alt="Dr. Mulkie Al-Hashmi — Spatial Identity Consultant"
              fill
              className="object-cover object-top"
              priority
              style={{ maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)" }}
            />
          </div>
        </motion.div>

        {/* Bottom Elements — Responsive Wrapper */}
        <div className="relative md:absolute mt-auto md:mt-0 bottom-auto md:bottom-45 left-0 md:left-8 right-0 md:right-8 z-30 max-w-7xl mx-auto w-full px-0 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-0 pt-8 md:pt-0">

          {/* Left: Specializations List */}
          <motion.div
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={1.5}
            className="hidden md:flex w-full md:w-auto flex-col items-center md:items-start bg-white/5 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-5 md:p-0 rounded-3xl md:rounded-none border border-white/10 md:border-transparent shadow-[0_8px_30px_rgba(0,0,0,0.1)] md:shadow-none gap-4 md:gap-3"
          >
            <h4 className="text-xs md:text-sm font-headline font-bold text-white/60 md:text-white/40 uppercase tracking-widest">
              {ta("specializationTitle")}
            </h4>
            <div className="grid grid-cols-2 md:flex md:flex-col gap-x-2 gap-y-4 md:gap-y-2 w-full md:w-auto">
              {specializations.map((spec, i) => (
                <div key={spec.key} className="flex flex-col md:flex-row items-center gap-1.5 md:gap-3 text-center md:text-start">
                  <Image src="/2.svg" alt="icon" width={14} height={14} className="shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base font-bold md:font-medium text-white/90 md:text-white/80 leading-snug md:whitespace-nowrap">
                    {ta(`specializations.${spec.key}`)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Description & CTA Button */}
          <div className="flex flex-col items-center md:items-end gap-5 md:gap-8 w-full md:w-auto">
            {/* Description (Mobile Only) */}
            <motion.div
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              custom={1.8}
              className="md:hidden max-w-sm text-base text-white/80 leading-relaxed text-center px-4"
            >
              <p>
                {t("description1")}
                <strong className="text-white font-semibold">{t("descriptionBold1")}</strong>
                {t("description1End")}
              </p>
              <p className="mt-2">
                {t("description2")}
                <strong className="text-white font-semibold">{t("descriptionBold2")}</strong>
                {t("description2End")}
              </p>
            </motion.div>

            {/* Description (Desktop Only) */}
            <motion.div
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              custom={1.8}
              className="hidden md:block max-w-[420px] text-base text-white/70 leading-relaxed text-right rtl:text-left"
            >
              <p>
                {t("description1")}
                <strong className="text-white font-semibold">{t("descriptionBold1")}</strong>
                {t("description1End")}
              </p>
              <p className="mt-2">
                {t("description2")}
                <strong className="text-white font-semibold">{t("descriptionBold2")}</strong>
                {t("description2End")}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={() => navigateTo("consultation")}
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              custom={2.1}
              className="w-full md:w-auto justify-center bg-white text-dark px-8 py-4 rounded-full font-headline font-bold text-base flex items-center gap-2 hover:bg-surface transition-colors shadow-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl rtl:rotate-180">
                arrow_forward
              </span>
              {t("cta")}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
