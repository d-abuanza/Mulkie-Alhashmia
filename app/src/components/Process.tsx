"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("Process");

  const steps = [
    {
      number: t("steps.register.number"),
      title: t("steps.register.title"),
      description: t("steps.register.description"),
      rotation: "-2deg",
      yOffset: "0px",
    },
    {
      number: t("steps.confirm.number"),
      title: t("steps.confirm.title"),
      description: t("steps.confirm.description"),
      rotation: "1deg",
      yOffset: "-20px",
    },
    {
      number: t("steps.session.number"),
      title: t("steps.session.title"),
      description: t("steps.session.description"),
      rotation: "-1deg",
      yOffset: "10px",
    },
    {
      number: t("steps.actionable.number"),
      title: t("steps.actionable.title"),
      description: t("steps.actionable.description"),
      rotation: "1.5deg",
      yOffset: "-10px",
    },
  ];

  return (
    <section
      id="methodology"
      className="bg-white py-32 px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-accent/25 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-4xl md:text-5xl font-headline font-bold text-dark mb-24"
        >
          {t("title")}
        </motion.h2>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 items-start">
          {/* Cards */}
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index * 0.15}
              style={{
                rotate: step.rotation,
                translateY: step.yOffset,
              }}
              className="relative bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-dark/5 flex flex-col items-start text-left rtl:text-right hover:shadow-[0_20px_50px_rgba(184,240,0,0.1)] transition-all duration-500 group"
            >
              <span className="text-4xl font-headline font-medium text-dark/20 mb-8 block group-hover:text-dark/40 transition-colors">
                {step.number}
              </span>
              <h3 className="text-xl font-headline font-bold text-dark mb-4">
                {step.title}
              </h3>
              <p className="text-medium text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
