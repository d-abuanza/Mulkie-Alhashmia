"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const TOTAL_STEPS = 4;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function ConsultationForm() {
  const t = useTranslations("Form");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Multi-select state for marketing channels
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const toggleChannel = (ch: string) => {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 focus:border-white/30 text-white p-4 rounded-xl focus:ring-0 focus:outline-none transition-colors placeholder:text-white/20 font-body";

  const textareaClass = `${inputClass} resize-none`;

  const stepTitles = [
    t("sections.info"),
    t("sections.project"),
    t("sections.current"),
    t("sections.goals"),
  ];

  // ─── Success Screen ───
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md"
        >
          <div className="text-5xl mb-6">✨</div>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-white mb-4">
            {t("success.title")}
          </h2>
          <p className="text-white/70 leading-relaxed text-lg">
            {t("success.body")}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1a2e] flex flex-col">
      {/* ─── Top Bar ─── */}
      <div className="px-6 lg:px-8 py-6 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-lg font-serif italic text-white mb-1">
            {t("pageTitle")}
          </h1>
          <p className="text-sm text-white/40 font-body">
            {t("pageSubtitle")}
          </p>
        </div>
      </div>

      {/* ─── Progress Bar ─── */}
      <div className="px-6 lg:px-8 pt-8 pb-2">
        <div className="max-w-3xl mx-auto">
          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-3">
            {stepTitles.map((title, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                    i + 1 <= step ? "bg-accent" : "bg-dark/8"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Current step label */}
          <div className="flex justify-between items-baseline">
            <p className="text-sm font-headline font-semibold text-white">
              {stepTitles[step - 1]}
            </p>
            <p className="text-xs text-white/30 font-body">
              {step} / {TOTAL_STEPS}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Form Content ─── */}
      <div className="flex-1 px-6 lg:px-8 py-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait" custom={direction}>
              {/* ══ Step 1: Your Information ══ */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-6"
                >
                  {/* Q1: Full name + role */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q1.label")} <span className="text-red-400">*</span>
                    </label>
                    <input type="text" placeholder={t("q1.placeholder")} className={inputClass} required />
                  </div>

                  {/* Q2: WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q2.label")} <span className="text-red-400">*</span>
                    </label>
                    <input type="tel" placeholder={t("q2.placeholder")} className={inputClass} dir="ltr" required />
                  </div>

                  {/* Q3: Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q3.label")} <span className="text-red-400">*</span>
                    </label>
                    <input type="email" placeholder={t("q3.placeholder")} className={inputClass} dir="ltr" required />
                  </div>

                  {/* Q4: Social media (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q4.label")}
                    </label>
                    <input type="text" placeholder={t("q4.placeholder")} className={inputClass} />
                  </div>
                </motion.div>
              )}

              {/* ══ Step 2: Your Project ══ */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-6"
                >
                  {/* Q5: Project name + activity */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q5.label")} <span className="text-red-400">*</span>
                    </label>
                    <textarea rows={3} placeholder={t("q5.placeholder")} className={textareaClass} required />
                  </div>

                  {/* Q6: Stage dropdown + launch date */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q6.label")} <span className="text-red-400">*</span>
                    </label>
                    <select className={inputClass} required defaultValue="">
                      <option value="" disabled>{t("q6.selectPlaceholder")}</option>
                      <option value="idea">{t("q6.options.idea")}</option>
                      <option value="foundation">{t("q6.options.foundation")}</option>
                      <option value="existing">{t("q6.options.existing")}</option>
                      <option value="mature">{t("q6.options.mature")}</option>
                    </select>
                    <input type="text" placeholder={t("q6.datePlaceholder")} className={`${inputClass} mt-3`} />
                  </div>

                  {/* Q7: Ideal customer */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q7.label")} <span className="text-red-400">*</span>
                    </label>
                    <textarea rows={3} placeholder={t("q7.placeholder")} className={textareaClass} required />
                  </div>
                </motion.div>
              )}

              {/* ══ Step 3: Current Situation ══ */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-6"
                >
                  {/* Q8: Marketing channels (multi-select) */}
                  <div className="space-y-3">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q8.label")} <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["instagram", "whatsapp", "paidAds", "referrals", "linkedin", "other"].map(
                        (ch) => (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => toggleChannel(ch)}
                            className={`px-4 py-3 rounded-xl border text-sm font-body text-left transition-all duration-200 ${
                              selectedChannels.includes(ch)
                                ? "bg-white/15 border-white text-white font-medium"
                                : "bg-white/5 border-white/10 text-white/60 hover:border-white/25"
                            }`}
                          >
                            {t(`q8.options.${ch}`)}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Q9: Differentiation (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q9.label")}
                    </label>
                    <textarea rows={3} placeholder={t("q9.placeholder")} className={textareaClass} />
                  </div>
                </motion.div>
              )}

              {/* ══ Step 4: Challenges & Goals ══ */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-6"
                >
                  {/* Q10: Biggest challenge */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q10.label")} <span className="text-red-400">*</span>
                    </label>
                    <textarea rows={3} placeholder={t("q10.placeholder")} className={textareaClass} required />
                  </div>

                  {/* Q11: Consultation goal */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q11.label")} <span className="text-red-400">*</span>
                    </label>
                    <textarea rows={3} placeholder={t("q11.placeholder")} className={textareaClass} required />
                  </div>

                  {/* Q12: Additional info (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q12.label")}
                    </label>
                    <textarea rows={3} placeholder={t("q12.placeholder")} className={textareaClass} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Navigation Buttons ─── */}
            <div className="pt-10 mt-10 flex justify-between items-center border-t border-dark/5">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-headline cursor-pointer"
                >
                  <span className="material-symbols-outlined rtl:rotate-180">arrow_back</span>
                  {t("buttons.prev")}
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={step === TOTAL_STEPS ? handleSubmit : goNext}
                className="group flex items-center gap-3 bg-white text-dark font-headline font-bold px-8 py-3.5 rounded-full hover:bg-offwhite transition-all duration-300 cursor-pointer"
              >
                {step === TOTAL_STEPS ? t("buttons.submit") : t("buttons.next")}
                <span className="material-symbols-outlined text-xl rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  {step === TOTAL_STEPS ? "send" : "arrow_forward"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
