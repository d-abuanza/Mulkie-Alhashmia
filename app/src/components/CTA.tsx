"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function CTA() {
  const [formOpen, setFormOpen] = useState(false);
  const [step, setStep] = useState(1);
  const t = useTranslations("CTA");

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const inputClass =
    "w-full bg-white border border-dark/10 focus:border-accent-dark text-dark p-4 rounded-xl focus:ring-0 focus:outline-none transition-colors placeholder:text-dark/30";

  const radioClass =
    "w-5 h-5 bg-white border-dark/20 checked:bg-accent checked:border-accent focus:ring-0 focus:ring-offset-0 transition-all appearance-none rounded-full border-2 checked:border-4";

  return (
    <section
      id="consultation"
      className="py-24 px-6 lg:px-8 bg-surface relative overflow-hidden"
    >
      {/* Subtle green tint at top */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-surface-green/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-dark mb-6"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
          className="text-medium mb-10 max-w-2xl mx-auto leading-relaxed text-lg"
        >
          {t("description")}
        </motion.p>

        {/* CTA Button — shows when form is closed */}
        <AnimatePresence>
          {!formOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center gap-3 bg-dark text-white font-headline font-bold px-10 py-4 rounded-full hover:bg-accent hover:text-dark transition-all duration-300 text-lg shadow-lg hover:shadow-[0_8px_30px_rgba(184,240,0,0.2)]"
              >
                {t("ctaButton")}
                <span className="material-symbols-outlined text-xl rtl:rotate-180">
                  arrow_forward
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form — reveals on button click */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-8"
            >
              {/* Stepper Header */}
              <div className="flex items-center justify-center gap-4 mb-12 font-headline text-sm tracking-tight">
                <span className={step === 1 ? "text-accent-dark font-bold" : "text-dark/30"}>{t("steps.identity")}</span>
                <div className="w-12 h-[1px] bg-dark/10" />
                <span className={step === 2 ? "text-accent-dark font-bold" : "text-dark/30"}>{t("steps.phase")}</span>
                <div className="w-12 h-[1px] bg-dark/10" />
                <span className={step === 3 ? "text-accent-dark font-bold" : "text-dark/30"}>{t("steps.scope")}</span>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-3xl border border-dark/5 text-left rtl:text-right shadow-[0_8px_60px_rgba(0,0,0,0.04)]">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                      >
                        {[
                          { label: t("form.projectName"), type: "text" },
                          { label: t("form.responsibleName"), type: "text" },
                          { label: t("form.jobTitle"), type: "text" },
                          { label: t("form.contactNumber"), type: "tel" },
                          { label: t("form.socialMedia"), type: "text" },
                        ].map((field) => (
                          <div key={field.label} className="space-y-3">
                            <label className="text-sm font-headline font-medium text-dark/70 block">
                              {field.label}
                            </label>
                            <input type={field.type} placeholder={t("form.placeholder")} className={inputClass} />
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                      >
                        <div className="space-y-3">
                          <label className="text-sm font-headline font-medium text-dark/70 block">
                            {t("form.natureOfProject")}
                          </label>
                          <textarea rows={3} placeholder={t("form.placeholder")} className={`${inputClass} resize-none`} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-headline font-medium text-dark/70 block">
                            {t("form.currentStage")}
                          </label>
                          <div className="space-y-3">
                            {[t("options.stages.idea"), t("options.stages.foundation"), t("options.stages.existing"), t("options.stages.mature")].map(
                              (option, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                  <input type="radio" name="stage" className={radioClass} />
                                  <span className="text-dark/60 group-hover:text-dark transition-colors">{option}</span>
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                      >
                        <div className="space-y-3">
                          <label className="text-sm font-headline font-medium text-dark/70 block">
                            {t("form.biggestChallenge")}
                          </label>
                          <textarea rows={3} placeholder={t("form.placeholder")} className={`${inputClass} resize-none`} />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-headline font-medium text-dark/70 block">
                            {t("form.expectation")}
                          </label>
                          <textarea rows={3} placeholder={t("form.placeholder")} className={`${inputClass} resize-none`} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-headline font-medium text-dark/70 block">
                            {t("form.source")}
                          </label>
                          <div className="space-y-3">
                            {[t("options.sources.linkedin"), t("options.sources.recommendation"), t("options.sources.instagram"), t("options.sources.search"), t("options.sources.event"), t("options.sources.other")].map(
                              (option, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                  <input type="radio" name="source" className={radioClass} />
                                  <span className="text-dark/60 group-hover:text-dark transition-colors">{option}</span>
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-12 flex justify-between items-center border-t border-dark/5">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-2 text-dark/40 hover:text-dark transition-colors font-headline"
                      >
                        <span className="material-symbols-outlined rtl:rotate-180">arrow_back</span>
                        {t("buttons.prev")}
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={step === 3 ? undefined : nextStep}
                      className="group flex items-center gap-3 bg-dark text-white font-headline font-bold px-8 py-3 rounded-full hover:bg-accent hover:text-dark transition-all duration-300"
                    >
                      {step === 3 ? t("buttons.submit") : t("buttons.next")}
                      <span className="material-symbols-outlined text-xl rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                        {step === 3 ? "send" : "arrow_forward"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
