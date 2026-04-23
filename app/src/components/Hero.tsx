"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroFadeUp } from "@/lib/animations";
import { useTranslations, useLocale } from "next-intl";
import { usePageNavigation } from "./PageManager";

export default function Hero() {
  const t = useTranslations("Hero");
  const ta = useTranslations("About");
  const locale = useLocale();
  const isEn = locale === "en";
  const { navigateTo } = usePageNavigation();

  const specializations = [
    { key: "identity" },
    { key: "strategy" },
    { key: "innovation" },
    { key: "leadership" },
  ];

  return (
    <header className="relative min-h-screen hero-gradient pt-20 md:pt-24 pb-6 md:pb-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative h-full flex flex-col">

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="flex flex-col items-center md:hidden flex-1">

          {/* Title */}
          <motion.div
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="w-full flex flex-col items-center text-center mt-2"
            whileInView={{
              filter: ["blur(0px)", "blur(4px)", "blur(0px)"],
            }}
            transition={{
              filter: {
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
              }
            }}
          >
            <div className="relative inline-block mb-1">
              <div className={`absolute -top-3 w-7 h-7 ${isEn ? "-right-6" : "-left-6"}`}>
                <Image src="/2.svg" alt="Sparkle Icon" fill className="object-contain" />
              </div>
              <h1 className="text-3xl font-headline font-bold text-white leading-tight">
                {t("greeting")}
              </h1>
            </div>
            <p className="text-xl font-serif italic text-white/80 leading-tight">
              {t("role1")} {t("role2")}
            </p>
          </motion.div>

          {/* Compact Portrait */}
          <motion.div
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="relative w-[220px] h-[290px] mt-4 mb-4 shrink-0"
          >
            <Image
              src="/Mulkie.png"
              alt="Dr. Mulkie Al-Hashmi"
              fill
              className="object-cover object-top"
              priority
              style={{ maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)" }}
            />
          </motion.div>

          {/* Two Buttons */}
          <motion.div
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={0.9}
            className="flex flex-col items-center gap-3 w-full max-w-xs"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={() => navigateTo("consultation")}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group w-full bg-white text-dark px-6 py-3.5 rounded-full font-headline font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer hover:shadow-[0_10px_25px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              <span className="material-symbols-outlined text-lg rtl:rotate-180 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                arrow_forward
              </span>
              {t("cta")}
            </motion.button>

            {/* Secondary — Who is Dr. Mulkie? */}
            <button
              onClick={() => navigateTo("about")}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-headline font-medium text-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-white/15 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">
                person
              </span>
              {t("aboutButton")}
            </button>
          </motion.div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}

        {/* Main Title — Centered Above Portrait */}
        <motion.div
          className="text-center relative z-10 hidden md:block"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-white leading-[0.95] tracking-tight inline-flex items-start justify-center relative"
          >
            {t("greeting")}
            <div className={`absolute -top-4 md:-top-8 w-10 h-10 md:w-16 md:h-16 ${isEn ? "-right-8 md:-right-12" : "-left-8 md:-left-12"}`}>
              <Image src="/2.svg" alt="Sparkle Icon" fill className="object-contain" />
            </div>
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

        {/* Portrait — Desktop Only */}
        <motion.div
          variants={heroFadeUp}
          initial="hidden"
          animate="visible"
          custom={1.2}
          className="relative z-20 hidden md:flex justify-center -mt-8 md:-mt-16"
        >
          <div className="relative w-[380px] h-[500px] md:w-[440px] md:h-[580px]">
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

        {/* Bottom Elements — Desktop Only */}
        <div className="relative md:absolute mt-auto md:mt-0 bottom-auto md:bottom-45 left-0 md:left-8 right-0 md:right-8 z-30 max-w-7xl mx-auto w-full px-0 hidden md:flex flex-row justify-between items-end">

          {/* Left: Specializations List */}
          <motion.div
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={1.5}
            className="flex flex-col items-start gap-3"
          >
            <h4 className="text-base font-headline font-bold text-white/50 uppercase tracking-widest mb-2">
              {ta("specializationTitle")}
            </h4>
            <div className="flex flex-col gap-4">
              {specializations.map((spec) => (
                <div key={spec.key} className="flex items-center gap-4 group">
                  <Image 
                    src="/2.svg" 
                    alt="icon" 
                    width={18} 
                    height={18} 
                    className="shrink-0 group-hover:scale-125 transition-transform duration-300" 
                  />
                  <span className="text-xl font-medium text-white/90 whitespace-nowrap">
                    {ta(`specializations.${spec.key}`)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Description & CTA Button */}
          <div className="flex flex-col items-end gap-8">
            <motion.div
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              custom={1.8}
              className="max-w-[420px] text-base text-white/70 leading-relaxed text-right rtl:text-left"
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

            <motion.button
              onClick={() => navigateTo("consultation")}
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              custom={2.1}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-dark px-8 py-4 rounded-full font-headline font-bold text-base flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.4)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl rtl:rotate-180 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
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
