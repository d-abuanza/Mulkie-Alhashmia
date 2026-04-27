"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";

/* ─── Animated Counter ─── */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── Tilt Card ─── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 250, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 250, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 8);
    rotateY.set(x * 8);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Cities ─── */
const CITIES = [
  { ar: "مسقط", en: "Muscat" },
  { ar: "الرياض", en: "Riyadh" },
  { ar: "دبي", en: "Dubai" },
  { ar: "برلين", en: "Berlin" },
];

/* ─── Specializations ─── */
const SPECS = [
  { key: "identity", icon: "hub", color: "#8fd108" },
  { key: "strategy", icon: "trending_up", color: "#8fd108" },
  { key: "innovation", icon: "lightbulb", color: "#8fd108" },
  { key: "leadership", icon: "groups", color: "#8fd108" },
] as const;

export default function About() {
  const t = useTranslations("About");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 end-1/4 w-[500px] h-[500px] rounded-full bg-[#002349]/[0.07] blur-[160px]" />
        <div className="absolute bottom-1/4 start-0 w-[400px] h-[400px] rounded-full bg-[#6EE0E5]/[0.03] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ═══ Top: Headline + Stats Row ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <Image src="/2.svg" alt="" width={20} height={20} className="shrink-0" />
            <span className="text-sm font-headline font-semibold text-white/40 tracking-wide">
              {t("title")}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-bold text-white leading-[1.15] tracking-tight max-w-4xl mb-14">
            {t("headline1")}{" "}
            <span className="text-[#6EE0E5]">{t("headlineHighlight")}</span>{" "}
            {t("headline2")}
          </h2>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-8 md:gap-16">
            {[
              { value: 50, suffix: "+", label: "عميل" },
              { value: 4, suffix: "", label: "مدن" },
              { value: 10, suffix: "+", label: "سنوات خبرة" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="flex flex-col gap-1"
              >
                <span className="text-3xl md:text-4xl font-headline font-bold text-white tabular-nums">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs font-body text-white/30 tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ Main Grid: Portrait + Narrative ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-[0.4fr_1fr] gap-10 md:gap-16 mb-20 md:mb-28 items-start">

          {/* Portrait column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden md:block"
          >
            <TiltCard className="relative">
              <motion.div
                style={{ y: portraitY }}
                className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.08]"
              >
                <Image
                  src="/Mulkie.png"
                  alt="Dr. Mulkie Al-Hashmi"
                  fill
                  className="object-cover object-top"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e] via-transparent to-transparent" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -end-3 px-3 py-2 rounded-lg border border-white/10 bg-[#0c1a2e]/90 backdrop-blur-xl"
              >
                <span className="text-[10px] font-body text-white/60">
                  PhD · ريادة الأعمال المجتمعية
                </span>
              </motion.div>

              {/* Corner brackets */}
              <div className="absolute -top-2 -start-2 w-8 h-8 border-t-2 border-s-2 border-white/10 rounded-tl-lg pointer-events-none" />
              <div className="absolute -bottom-2 -end-2 w-8 h-8 border-b-2 border-e-2 border-white/10 rounded-br-lg pointer-events-none" />
            </TiltCard>
          </motion.div>

          {/* Narrative column */}
          <div className="flex flex-col gap-10">
            {/* Description blocks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="relative p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <p className="text-white/60 text-base md:text-lg leading-[2] font-body">
                {t("desc1")}
                <span className="text-white font-semibold">{t("desc1Bold")}</span>
                {t("desc1End")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <p className="text-white/60 text-base md:text-lg leading-[2] font-body">
                {t("desc2")}
                <span className="text-white font-semibold">{t("desc2Bold")}</span>
                {t("desc2End")}
              </p>
            </motion.div>

            {/* Specializations — horizontal scrollable tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-1 rounded-full bg-[#8fd108]" />
                <span className="text-xs font-headline font-semibold text-white/30 tracking-widest uppercase">
                  {t("specializationTitle")}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPECS.map((spec, i) => (
                  <motion.div
                    key={spec.key}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                    whileHover={{ scale: 1.02, x: -4 }}
                    className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-default transition-colors hover:border-white/15 hover:bg-white/[0.04]"
                  >
                    <span
                      className="material-symbols-outlined text-lg transition-colors duration-300"
                      style={{ color: `${spec.color}40` }}
                    >
                      {spec.icon}
                    </span>
                    <span className="text-sm font-body text-white/50 group-hover:text-white/80 transition-colors duration-300">
                      {t(`specializations.${spec.key}`)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══ Cities Marquee ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative overflow-hidden py-6 border-t border-b border-white/[0.05]"
        >
          {/* Fade edges */}
          <div className="absolute inset-y-0 start-0 w-20 bg-gradient-to-e from-[#0c1a2e] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 end-0 w-20 bg-gradient-to-s from-[#0c1a2e] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 whitespace-nowrap w-max"
          >
            {/* Duplicate cities for seamless loop */}
            {[...CITIES, ...CITIES, ...CITIES, ...CITIES].map((city, i) => (
              <span
                key={`${city.en}-${i}`}
                className="flex items-center gap-3 text-white/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                <span className="text-sm md:text-base font-headline font-medium tracking-wider">
                  {city.ar}
                </span>
                <span className="text-[10px] font-body text-white/10 uppercase tracking-widest">
                  {city.en}
                </span>
              </span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
