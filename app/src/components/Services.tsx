"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
    <section id="services" className="pt-40 pb-24 px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={0}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <Image src="/2.svg" alt="" width={28} height={28} className="shrink-0" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">
            {t("title")}
          </h2>
        </motion.div>

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
              className="bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 group hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-start gap-3 mb-5">
                <span className="material-symbols-outlined text-2xl text-white/80 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </span>
                <h3 className="text-xl font-headline font-bold text-white leading-snug">
                  {service.title}
                </h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
