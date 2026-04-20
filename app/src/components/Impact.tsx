"use client";

import { motion } from "framer-motion";
import { fadeUp, cardHover, staggerContainer } from "@/lib/animations";

const projects = [
  {
    tag: "Leadership",
    title: "Executive Transformation Program",
    description:
      "Led a comprehensive leadership overhaul for a Fortune 500 organization, resulting in 40% improvement in executive decision-making speed.",
    stats: ["Leadership", "Executive Design"],
    color: "from-navy/20 to-indigo/30",
  },
  {
    tag: "Strategy",
    title: "Organizational Restructuring",
    description:
      "Redesigned operational frameworks for a government entity, streamlining processes and boosting efficiency across departments.",
    stats: ["Restructure", "Process Design"],
    color: "from-indigo/15 to-navy/25",
  },
  {
    tag: "Growth",
    title: "Market Expansion Advisory",
    description:
      "Guided a regional enterprise through strategic market entry across three new territories within 18 months.",
    stats: ["Growth", "Market Strategy"],
    color: "from-navy/15 to-indigo/20",
  },
  {
    tag: "Culture",
    title: "Culture & Talent Strategy",
    description:
      "Built a talent pipeline and culture framework that reduced executive turnover by 55% in two years.",
    stats: ["Culture", "Talent Design"],
    color: "from-indigo/20 to-navy/15",
  },
];

export default function Impact() {
  return (
    <section id="impact" className="relative py-28 lg:py-40 bg-fog overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* Header — matching reference's "/ Best Projects" + "Selected Works" */}
        <div className="text-center mb-20">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            className="font-serif italic text-[0.95rem] text-navy mb-3"
          >
            / Best Projects
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0.1}
            className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-[-0.03em] text-indigo"
          >
            Selected Works
          </motion.h2>
        </div>

        {/* Project Cards Grid — 2x2 like reference */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              custom={index * 0.1}
              initial="rest"
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHover}
                className="relative rounded-2xl overflow-hidden border border-gray-100 bg-white hover:border-navy/15 transition-colors duration-300"
              >
                {/* Card image area — gradient block like reference project screenshots */}
                <div
                  className={`h-[220px] lg:h-[260px] bg-gradient-to-br ${project.color} relative overflow-hidden`}
                >
                  {/* Abstract UI elements to simulate project screens */}
                  <div className="absolute inset-4 flex flex-col gap-3 opacity-40">
                    <div className="flex gap-2">
                      <div className="w-16 h-3 rounded-full bg-white/30" />
                      <div className="w-10 h-3 rounded-full bg-white/20" />
                    </div>
                    <div className="flex-1 rounded-xl bg-white/10 p-4">
                      <div className="w-3/4 h-2 rounded-full bg-white/20 mb-2" />
                      <div className="w-1/2 h-2 rounded-full bg-white/15" />
                      <div className="mt-4 flex gap-2">
                        <div className="w-20 h-12 rounded-lg bg-white/10" />
                        <div className="w-20 h-12 rounded-lg bg-white/10" />
                        <div className="w-20 h-12 rounded-lg bg-white/10" />
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-indigo/0 group-hover:bg-indigo/10 transition-colors duration-300" />
                </div>

                {/* Card footer */}
                <div className="p-6">
                  <h3 className="text-[1.1rem] font-bold text-indigo mb-1 tracking-[-0.01em]">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.stats.map((stat) => (
                      <span
                        key={stat}
                        className="text-[0.72rem] font-medium text-indigo/40 bg-indigo/4 px-3 py-1 rounded-full"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
