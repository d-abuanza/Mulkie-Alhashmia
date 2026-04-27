"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { fadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { usePageNavigation } from "./PageManager";

/* ─── Spotlight Card — cursor-following glow ─── */
function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const spotY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(143,209,8,0.06), transparent 60%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative group ${className}`}
    >
      {/* Spotlight glow layer */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}

export default function CTA() {
  const t = useTranslations("CTA");
  const { navigateTo } = usePageNavigation();

  return (
    <section className="relative py-32 md:py-44 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Multi-layered ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8fd108]/[0.04] blur-[160px] rounded-full" />
        <div className="absolute bottom-0 start-1/4 w-[400px] h-[400px] bg-[#002349]/[0.08] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 end-1/4 w-[300px] h-[300px] bg-[#6EE0E5]/[0.04] blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <SpotlightCard>
            <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm p-8 md:p-14 lg:p-20 overflow-hidden">

              {/* Animated border shimmer */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute -top-[200%] -start-[200%] w-[500%] h-[500%]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, rgba(143,209,8,0.1) 10%, transparent 20%)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Inner content container */}
              <div className="relative z-10 flex flex-col items-center text-center">

                {/* Label pill */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8fd108]/20 bg-[#8fd108]/[0.06] mb-10"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8fd108] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#8fd108]" />
                  </span>
                  <span className="text-xs font-headline font-semibold text-[#8fd108]/80 tracking-wider uppercase">
                    {t("label")}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-white leading-[1.15] tracking-tight max-w-3xl mb-6"
                >
                  {t("title")}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/50 text-base md:text-lg leading-[1.9] font-body max-w-2xl mb-10"
                >
                  {t("description")}
                </motion.p>



                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.button
                    onClick={() => navigateTo("form")}
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative bg-[#8fd108] text-[#0c1a2e] px-8 md:px-12 py-4 md:py-5 rounded-full font-headline font-bold text-base md:text-lg flex items-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(143,209,8,0.15)] hover:shadow-[0_10px_50px_rgba(143,209,8,0.35)] cursor-pointer"
                  >
                    {t("ctaButton")}
                    <span className="material-symbols-outlined text-xl rtl:rotate-180 transition-transform duration-300 ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">
                      arrow_forward
                    </span>
                  </motion.button>
                </motion.div>


              </div>

              {/* Corner decorative elements */}
              <div className="absolute top-4 start-4 w-6 h-6 border-t border-s border-white/[0.08] rounded-tl-lg pointer-events-none" />
              <div className="absolute bottom-4 end-4 w-6 h-6 border-b border-e border-white/[0.08] rounded-br-lg pointer-events-none" />

              {/* Floating decorative icon */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 end-6 md:top-10 md:end-10"
              >
                <Image src="/2.svg" alt="" width={40} height={40} className="opacity-10" />
              </motion.div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
