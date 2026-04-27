"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerReveal, heroStaggerContainer } from "@/lib/animations";
import { useTranslations, useLocale } from "next-intl";
import { usePageNavigation } from "./PageManager";

/* ─── Network Grid Background ─── */
function NetworkGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);

  const initNodes = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 25000);
    nodesRef.current = Array.from({ length: Math.min(count, 60) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      initNodes(canvas.offsetWidth, canvas.offsetHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
      }

      // Draw connections
      const maxDist = 160;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(0, 59, 122, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.fillStyle = "rgba(0, 59, 122, 0.25)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ─── Blur-Cycling Title ─── */
function BlurTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{
        filter: ["blur(0px)", "blur(8px)", "blur(0px)"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scroll-Tracking Green Dot ─── */
function GreenDot() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.15], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 0]);

  return (
    <motion.div
      style={{ y, scale, opacity }}
      className="absolute -start-4 top-2 w-5 h-5 rounded-full bg-[#8fd108] blur-[6px] z-0 pointer-events-none"
    />
  );
}

/* ─── Hero Section ─── */
export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const { navigateTo } = usePageNavigation();

  return (
    <header className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 hero-gradient" />
      <NetworkGrid />

      {/* Radial glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 start-1/4 w-[500px] h-[500px] rounded-full bg-[#003b7a]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 end-1/4 w-[400px] h-[400px] rounded-full bg-[#002349]/15 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 h-full min-h-screen flex items-center">

        {/* ═══ MOBILE LAYOUT ═══ */}
        <motion.div
          variants={heroStaggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center md:hidden w-full pt-28 pb-12"
        >
          {/* Glass badge */}
          <motion.div
            variants={staggerReveal}
            custom={0}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8fd108] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8fd108]" />
            </span>
            <span className="text-xs font-body text-white/60 tracking-wide">
              {t("tag")}
            </span>
          </motion.div>

          {/* Title with blur cycle */}
          <motion.div variants={staggerReveal} custom={0.18}>
            <BlurTitle className="text-center">
              <h1 className="text-4xl font-headline font-bold text-white leading-tight">
                {t("greeting")}
              </h1>
            </BlurTitle>
          </motion.div>

          {/* Role subtitle */}
          <motion.p
            variants={staggerReveal}
            custom={0.36}
            className="text-lg font-body text-white/50 mt-4 text-center"
          >
            {t("role1")} {t("role2")}
          </motion.p>

          {/* Portrait in glass frame */}
          <motion.div
            variants={staggerReveal}
            custom={0.54}
            className="relative mt-10 mb-10"
          >
            <div className="relative w-[280px] h-[370px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              <Image
                src="/Mulkie.png"
                alt="Dr. Mulkie Al-Hashmi"
                fill
                className="object-cover object-top"
                priority
                style={{
                  maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                }}
              />
            </div>
            {/* Decorative corner accents */}
            <div className="absolute -top-2 -start-2 w-8 h-8 border-t border-s border-white/15 rounded-tl-lg" />
            <div className="absolute -bottom-2 -end-2 w-8 h-8 border-b border-e border-white/15 rounded-br-lg" />
          </motion.div>

          {/* CTA glass button */}
          <motion.div variants={staggerReveal} custom={0.72} className="w-full max-w-xs">
            <motion.button
              onClick={() => navigateTo("about")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-white px-6 py-4 rounded-xl font-headline font-medium text-base flex items-center justify-center gap-2 cursor-pointer hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300"
            >
              {t("aboutButton")}
              <span className="material-symbols-outlined text-lg">
                {locale === "ar" ? "arrow_back" : "arrow_forward"}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ═══ DESKTOP LAYOUT — Golden Ratio Grid ═══ */}
        <motion.div
          variants={heroStaggerContainer}
          initial="hidden"
          animate="visible"
          className="hidden md:grid w-full pt-24"
          style={{
            gridTemplateColumns: "1fr 0.618fr",
            gap: "clamp(3rem, 5vw, 6rem)",
            alignItems: "center",
          }}
        >
          {/* Column — Content */}
          <div className="flex flex-col items-start" style={{ gap: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
            {/* Glass badge */}
            <motion.div
              variants={staggerReveal}
              custom={0}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md"
            >
              <Image src="/2.svg" alt="" width={18} height={18} className="shrink-0" />
              <span className="text-sm font-body text-white/50 tracking-wide">
                {t("tag")}
              </span>
            </motion.div>

            {/* Main Title with green dot & blur */}
            <motion.div variants={staggerReveal} custom={0.18} className="relative">
              <GreenDot />
              <BlurTitle>
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-headline font-bold text-white leading-[0.95] tracking-tight relative z-10">
                  {t("greeting")}
                </h1>
              </BlurTitle>
            </motion.div>

            {/* Subtitle in glass chip */}
            <motion.div
              variants={staggerReveal}
              custom={0.36}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-[1px] bg-gradient-to-e from-white/30 to-transparent" />
              <p className="text-xl lg:text-2xl font-body text-white/50 leading-relaxed">
                {t("role1")} {t("role2")}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerReveal}
              custom={0.54}
              className="flex items-center gap-4 mt-2"
            >
              <motion.button
                onClick={() => navigateTo("consultation")}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-xl bg-[#8fd108] text-[#0c1a2e] font-headline font-bold text-base cursor-pointer shadow-[0_0_20px_rgba(143,209,8,0.15)] hover:shadow-[0_8px_30px_rgba(143,209,8,0.3)] transition-all duration-300"
              >
                {t("cta")}
              </motion.button>
              <motion.button
                onClick={() => navigateTo("about")}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/15 bg-white/[0.04] backdrop-blur-md text-white px-8 py-4 rounded-xl font-headline font-medium text-base cursor-pointer hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300"
              >
                {t("aboutButton")}
              </motion.button>
            </motion.div>

            {/* Trust metric — glass card */}
            <motion.div
              variants={staggerReveal}
              custom={0.72}
              className="flex items-center gap-4 px-5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm mt-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8fd108] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8fd108]" />
              </span>
              <span className="text-sm font-body text-white/40">
                {t("trustedBy")} <span className="text-white/70 font-semibold">{t("clients")}</span>
              </span>
            </motion.div>
          </div>

          {/* Column — Portrait with architectural framing */}
          <motion.div
            variants={staggerReveal}
            custom={0.3}
            className="relative flex justify-end"
          >
            {/* Glass backdrop */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] backdrop-blur-sm" />

            {/* Portrait */}
            <div className="relative w-[380px] h-[520px] lg:w-[440px] lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/Mulkie.png"
                alt="Dr. Mulkie Al-Hashmi — Spatial Identity Consultant"
                fill
                className="object-cover object-top"
                priority
                style={{
                  maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                }}
              />
            </div>

            {/* Architectural corner brackets */}
            <div className="absolute -top-2 -start-2 w-12 h-12 border-t-2 border-s-2 border-white/10 rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-2 -end-2 w-12 h-12 border-b-2 border-e-2 border-white/10 rounded-br-xl pointer-events-none" />

            {/* Specialty glass chip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-8 -start-6 lg:-start-10 px-4 py-2.5 rounded-lg border border-white/10 bg-[#0c1a2e]/80 backdrop-blur-xl"
            >
              <span className="text-xs font-body text-white/70">{t("specialtyBox")}</span>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c1a2e] to-transparent pointer-events-none" />
    </header>
  );
}
