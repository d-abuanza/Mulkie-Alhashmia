"use client";

import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "@/lib/animations";

const focusTags = [
  { label: "Strategic Planning", position: "top-4 left-4 lg:top-8 lg:left-12", delay: 0.3 },
  { label: "Executive Coaching", position: "top-4 right-4 lg:top-8 lg:right-12", delay: 0.4 },
  { label: "Organizational Design", position: "top-1/4 left-0 lg:left-4", delay: 0.5 },
  { label: "Change Management", position: "top-1/4 right-0 lg:right-4", delay: 0.6 },
  { label: "Culture Building", position: "bottom-1/4 left-0 lg:left-8", delay: 0.7 },
  { label: "Leadership Advisory", position: "bottom-1/4 right-0 lg:right-8", delay: 0.8 },
];

export default function StrategicFocus() {
  return (
    <section id="about" className="relative py-28 lg:py-40 bg-fog overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="relative flex flex-col items-center">
          {/* Floating skill badges — like reference design's scattered tags */}
          {focusTags.map((tag) => (
            <motion.div
              key={tag.label}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={tag.delay}
              className={`absolute ${tag.position} hidden lg:flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)]`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-navy" />
              <span className="text-[0.75rem] font-medium text-indigo/70 whitespace-nowrap">
                {tag.label}
              </span>
            </motion.div>
          ))}

          {/* Label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0.1}
            className="font-serif italic text-[1.1rem] text-navy mb-6"
          >
            Hello!
          </motion.p>

          {/* Main statement text — matching reference's large centered text */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0.2}
            className="text-center text-[clamp(1.5rem,3.2vw,2.4rem)] font-medium leading-[1.45] tracking-[-0.02em] text-indigo max-w-[780px]"
          >
            My focus is on blending clear strategy, thoughtful leadership, and
            organizational empathy to{" "}
            <span className="text-navy font-semibold font-serif italic">
              craft transformations that solve real problems
            </span>
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
