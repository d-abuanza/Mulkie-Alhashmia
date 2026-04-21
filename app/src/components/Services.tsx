"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("Services");

  const services = [
    {
      icon: "rocket_launch",
      title: t("cards.growth.title"),
      description: t("cards.growth.description"),
    },
    {
      icon: "map",
      title: t("cards.roadmap.title"),
      description: t("cards.roadmap.description"),
    },
    {
      icon: "search",
      title: t("cards.diagnosis.title"),
      description: t("cards.diagnosis.description"),
    },
  ];

  return (
    <section id="services" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={0}
          className="text-3xl md:text-4xl font-headline font-bold text-dark mb-12 text-center md:text-right rtl:md:text-right ltr:md:text-left"
        >
          {t("title")}
        </motion.h2>

        {/* Service Cards Grid — 3 columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              custom={index * 0.1}
              className="bg-surface-accent/50 p-8 md:p-10 rounded-2xl border border-accent/10 hover:border-accent/40 transition-all duration-500 group hover:shadow-[0_8px_40px_rgba(0, 35, 73, 0.08)]"
            >
              <div className="flex items-start gap-3 mb-5">
                <span className="material-symbols-outlined text-2xl text-accent-dark shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </span>
                <h3 className="text-xl font-headline font-bold text-dark leading-snug">
                  {service.title}
                </h3>
              </div>
              <p className="text-medium text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
