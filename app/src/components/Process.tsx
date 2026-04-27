"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { fadeUp } from "@/lib/animations";
import { useTranslations, useLocale } from "next-intl";
import { usePageNavigation } from "./PageManager";

const STEP_KEYS = ["register", "confirm", "session", "actionable"] as const;
const STEP_ICONS = ["edit_note", "verified", "video_camera_front", "task_alt"] as const;
const STEP_COLORS = [
  "from-[#8fd108]/20 to-[#8fd108]/5",
  "from-[#6EE0E5]/20 to-[#6EE0E5]/5",
  "from-[#c084fc]/20 to-[#c084fc]/5",
  "from-[#fb923c]/20 to-[#fb923c]/5",
] as const;
const DOT_COLORS = ["bg-[#8fd108]", "bg-[#6EE0E5]", "bg-[#c084fc]", "bg-[#fb923c]"] as const;

const STEP_DURATION = 3500; // ms per step

export default function Process() {
  const t = useTranslations("Process");
  const locale = useLocale();
  const { navigateTo } = usePageNavigation();

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [active, setActive] = useState(-1); // -1 = not started yet
  const [finished, setFinished] = useState(false);

  // Start the auto-play sequence when section comes into view
  useEffect(() => {
    if (!isInView) return;

    // Small delay before first step appears
    const initialDelay = setTimeout(() => {
      setActive(0);
    }, 400);

    return () => clearTimeout(initialDelay);
  }, [isInView]);

  // Auto-advance through steps
  useEffect(() => {
    if (active < 0) return; // not started
    if (active >= STEP_KEYS.length - 1) {
      // On last step, wait then show CTA
      const ctaTimer = setTimeout(() => setFinished(true), STEP_DURATION);
      return () => clearTimeout(ctaTimer);
    }

    const timer = setTimeout(() => {
      setActive((prev) => prev + 1);
    }, STEP_DURATION);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background glow keyed to active step */}
      <AnimatePresence mode="wait">
        {active >= 0 && (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className={`absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] bg-gradient-radial ${STEP_COLORS[Math.max(0, active)]} opacity-40`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ═══ Header ═══ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center mb-20 md:mb-28"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image src="/2.svg" alt="" width={20} height={20} className="shrink-0" />
            <span className="text-sm font-headline font-semibold text-white/40 tracking-wide">
              {t("title")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-bold text-white leading-[1.1] tracking-tight max-w-4xl mx-auto">
            {t("headline1")}{" "}
            <span className="text-[#6EE0E5]">{t("headlineHighlight")}</span>{" "}
            {t("headline2")}
          </h2>
        </motion.div>

        {/* ═══ Step Navigator (progress bar) ═══ */}
        <div className="relative flex items-center justify-between max-w-2xl mx-auto mb-16 md:mb-20 px-4">
          {/* Connecting line */}
          <div className="absolute top-1/2 start-8 end-8 h-px bg-white/[0.08] -translate-y-1/2" />
          {/* Progress line */}
          {active >= 0 && (
            <motion.div
              className={`absolute top-1/2 start-8 h-px -translate-y-1/2 ${DOT_COLORS[Math.max(0, active)]}`}
              initial={{ width: "0%" }}
              animate={{
                width: `${(Math.max(0, active) / (STEP_KEYS.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: "calc(100% - 4rem)", opacity: 0.5 }}
            />
          )}

          {STEP_KEYS.map((_key, i) => (
            <div
              key={_key}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              {/* Node */}
              <motion.div
                animate={{
                  scale: active === i ? 1 : active > i ? 0.85 : 0.7,
                  borderColor:
                    active === i
                      ? "rgba(255,255,255,0.3)"
                      : active > i
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.05)",
                  opacity: active >= i ? 1 : 0.3,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 bg-[#0c1a2e] flex items-center justify-center relative overflow-hidden"
              >
                {/* Active glow */}
                {active === i && (
                  <motion.div
                    layoutId="stepPing"
                    className={`absolute inset-0 ${DOT_COLORS[i]} opacity-20 blur-md`}
                    transition={{ duration: 0.4 }}
                  />
                )}
                {/* Completed check or icon */}
                <motion.span
                  animate={{ opacity: active >= i ? 1 : 0.2 }}
                  className="relative z-10 material-symbols-outlined text-lg md:text-xl text-white"
                >
                  {active > i ? "check_circle" : STEP_ICONS[i]}
                </motion.span>
              </motion.div>

              {/* Step number */}
              <motion.span
                animate={{
                  opacity: active >= i ? 1 : 0.2,
                  color: active === i ? "#ffffff" : active > i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                }}
                className="text-xs font-headline font-bold tabular-nums tracking-wider"
              >
                {t(`steps.${_key}.number`)}
              </motion.span>
            </div>
          ))}
        </div>

        {/* ═══ Active Step Content ═══ */}
        <div className="relative min-h-[320px] md:min-h-[280px]">
          <AnimatePresence mode="wait">
            {active >= 0 && !finished && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16 items-center"
              >
                {/* Left: Large number */}
                <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-end">
                  <span className="text-[120px] md:text-[160px] font-headline font-black leading-none text-white/[0.04] select-none">
                    {t(`steps.${STEP_KEYS[active]}.number`)}
                  </span>
                </div>

                {/* Right: Title + Description */}
                <div className="flex flex-col gap-4 text-center md:text-start">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-headline font-bold text-white">
                    {t(`steps.${STEP_KEYS[active]}.title`)}
                  </h3>
                  <p className="text-white/50 text-base md:text-lg leading-[1.9] font-body max-w-lg mx-auto md:mx-0">
                    {t(`steps.${STEP_KEYS[active]}.description`)}
                  </p>

                  {/* Timer bar for current step */}
                  <div className="w-full max-w-xs mx-auto md:mx-0 h-[2px] bg-white/[0.06] rounded-full overflow-hidden mt-4">
                    <motion.div
                      key={`timer-${active}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                      className={`h-full rounded-full ${DOT_COLORS[active]}`}
                      style={{ opacity: 0.6 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══ Final CTA — appears after last step ═══ */}
            {finished && (
              <motion.div
                key="cta-final"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-6"
              >
                <span className="text-5xl">✨</span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-headline font-bold text-white">
                  {locale === "ar" ? "جاهز للبدء؟" : "Ready to start?"}
                </h3>
                <p className="text-white/50 text-base md:text-lg font-body max-w-md">
                  {locale === "ar"
                    ? "أربع خطوات بسيطة تفصلك عن تحويل رؤيتك إلى واقع."
                    : "Four simple steps stand between you and turning your vision into reality."}
                </p>
                <motion.button
                  onClick={() => navigateTo("form")}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 bg-[#8fd108] text-[#0c1a2e] px-10 py-4 rounded-full font-headline font-bold text-base md:text-lg cursor-pointer shadow-[0_0_30px_rgba(143,209,8,0.15)] hover:shadow-[0_10px_50px_rgba(143,209,8,0.35)] transition-all duration-300"
                >
                  {locale === "ar" ? "احجز استشارتك الآن" : "Book your consultation now"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ═══ Mobile: Steps Overview (reveals as they complete) ═══ */}
        <div className="flex md:hidden flex-col gap-4 mt-12">
          {STEP_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: active >= i ? 1 : 0.15,
                y: active >= i ? 0 : 10,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center gap-4 p-4 rounded-xl border text-start transition-all duration-300 ${
                active === i
                  ? "border-white/15 bg-white/[0.05]"
                  : active > i
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-white/[0.04] bg-transparent"
              }`}
            >
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                  active === i ? "bg-white/10" : active > i ? "bg-white/[0.06]" : "bg-white/[0.03]"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-lg transition-opacity ${
                    active >= i ? "opacity-100" : "opacity-25"
                  }`}
                >
                  {active > i ? "check_circle" : STEP_ICONS[i]}
                </span>
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-body text-white/20 tabular-nums">
                  {t(`steps.${key}.number`)}
                </span>
                <span
                  className={`text-sm font-headline font-semibold transition-colors ${
                    active === i ? "text-white" : active > i ? "text-white/60" : "text-white/30"
                  }`}
                >
                  {t(`steps.${key}.title`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
