"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeIn } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <header className="relative min-h-screen hero-gradient overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative h-full flex flex-col">


        {/* Main Title — Centered Above Portrait */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="text-center relative z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-dark leading-[0.95] tracking-tight">
            {t("greeting")}
          </h1>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-dark/80 leading-[1] mt-2">
            {t("role1")}
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-dark/80 leading-[1]">
            {t("role2")}
          </p>
        </motion.div>

        {/* Portrait — Centered, Overlapping Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="relative z-20 flex justify-center -mt-8 md:-mt-16"
        >
          <div className="relative w-[320px] h-[420px] sm:w-[380px] sm:h-[500px] md:w-[440px] md:h-[580px]">
            {/* <Image
              src="/portrait.png"
              alt="Dr. Mulkie Al-Hashmi — Spatial Identity Consultant"
              fill
              className="object-cover object-top grayscale contrast-110"
              priority
              style={{ maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)" }}
            /> */}
          </div>
        </motion.div>

        {/* Side Elements — Positioned Over Portrait Area */}
        <div className="absolute bottom-24 md:bottom-32 left-6 lg:left-8 right-6 lg:right-8 flex justify-between items-end z-30 max-w-7xl mx-auto w-full px-0">
          {/* Left: Availability Badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.7}
          >
            <div className="bg-white rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-dark">
                {t("availability")}
              </span>
            </div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="hidden md:block max-w-[360px] text-sm text-dark/60 leading-relaxed text-right rtl:text-left"
          >
            <p>
              {t("description1")}
              <strong className="text-dark font-semibold">{t("descriptionBold1")}</strong>
              {t("description1End")}
            </p>
            <p className="mt-2">
              {t("description2")}
              <strong className="text-dark font-semibold">{t("descriptionBold2")}</strong>
              {t("description2End")}
            </p>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="absolute bottom-8 md:bottom-12 left-6 lg:left-8 right-6 lg:right-8 flex justify-between items-end z-30 max-w-7xl mx-auto w-full px-0">
          {/* Left: Trusted By */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.9}
            className="hidden md:flex items-center gap-3"
          >
            <div className="flex -space-x-2 rtl:space-x-reverse rtl:-space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-dark/20 border-2 border-white"
                />
              ))}
            </div>
            <p className="text-xs text-dark/50 max-w-[160px] leading-snug">
              {t("trustedBy")} <strong className="text-dark">{t("clients")}</strong>{" "}
              {t("across")}
            </p>
          </motion.div>

          {/* Right: Get in Touch Button */}
          <motion.a
            href="#consultation"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
            className="bg-dark text-white px-7 py-3.5 rounded-full font-headline font-medium text-sm flex items-center gap-2 hover:bg-dark-soft transition-colors shadow-lg"
          >
            <span className="material-symbols-outlined text-lg rtl:rotate-180">
              arrow_forward
            </span>
            {t("cta")}
          </motion.a>
        </div>
      </div>
    </header>
  );
}
