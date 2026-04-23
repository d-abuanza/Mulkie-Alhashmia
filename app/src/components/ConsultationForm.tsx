"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePageNavigation } from "./PageManager";

const TOTAL_STEPS = 4;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function ConsultationForm() {
  const t = useTranslations("Form");
  const { navigateTo } = usePageNavigation();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    socialMedia: "",
    projectInfo: "",
    projectStage: "",
    launchDate: "",
    idealCustomer: "",
    differentiation: "",
    biggestChallenge: "",
    consultationGoal: "",
    additionalInfo: "",
  });

  // Multi-select state for marketing channels
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  // Track which fields have been touched/blurred
  const [touchedFields, setTouchedFields] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;

    // Numbers only for WhatsApp
    if (name === "whatsapp") {
      value = value.replace(/[^0-9]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name: string) => {
    if (!touchedFields.includes(name)) {
      setTouchedFields((prev) => [...prev, name]);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{8,15}$/; // Strict digits only as requested

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.fullName.trim() !== "" &&
          phoneRegex.test(formData.whatsapp) &&
          emailRegex.test(formData.email)
        );
      case 2:
        return (
          formData.projectInfo.trim() !== "" &&
          formData.projectStage !== "" &&
          formData.idealCustomer.trim() !== ""
        );
      case 3:
        return selectedChannels.length > 0;
      case 4:
        return (
          formData.biggestChallenge.trim() !== "" &&
          formData.consultationGoal.trim() !== ""
        );
      default:
        return false;
    }
  };

  const validateAndProceed = () => {
    const fieldsByStep: Record<number, string[]> = {
      1: ["fullName", "whatsapp", "email"],
      2: ["projectInfo", "projectStage", "idealCustomer"],
      3: ["marketingChannels"],
      4: ["biggestChallenge", "consultationGoal"],
    };

    const fields = fieldsByStep[step];
    // Mark all fields in current step as touched to show errors
    setTouchedFields((prev) => Array.from(new Set([...prev, ...fields])));

    if (isStepValid()) {
      if (step === TOTAL_STEPS) {
        handleSubmit();
      } else {
        goNext();
      }
    }
  };

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
    "w-full bg-white/5 border border-white/10 focus:border-white/30 text-white p-4 rounded-xl focus:ring-0 focus:outline-none transition-colors placeholder:text-white/20 font-body rtl:text-right";

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
          <p className="text-white/70 leading-relaxed text-lg mb-8">
            {t("success.body")}
          </p>
          <button
            type="button"
            onClick={() => navigateTo("hero")}
            className="inline-flex items-center gap-2 bg-white text-dark font-headline font-bold px-8 py-3.5 rounded-full hover:bg-offwhite transition-all duration-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl rtl:rotate-180">home</span>
            {t("backToHome")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1a2e] flex flex-col">
      {/* ─── Top Bar ─── */}
      <div className="px-6 lg:px-8 py-6 border-b border-white/5">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg font-serif italic text-white mb-1">
              {t("pageTitle")}
            </h1>
            <p className="text-sm text-white/40 font-body">
              {t("pageSubtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo("hero")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-body cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg rtl:rotate-180">arrow_back</span>
            {t("backToHome")}
          </button>
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
                  className={`h-1.5 w-full rounded-full transition-all duration-500 ${i + 1 <= step ? "bg-[#F7F7F7]" : "bg-white/10"
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
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg mb-8 w-fit">
            <span className="text-red-400 font-bold text-lg">*</span>
            <p className="text-sm text-white/80 font-body">
              {t("requiredNote")}
            </p>
          </div>
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
                    {touchedFields.includes("fullName") && formData.fullName.trim() === "" && (
                      <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                        {t("validation.required")}
                      </p>
                    )}
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("fullName")}
                      placeholder={t("q1.placeholder")}
                      className={`${inputClass} ${touchedFields.includes("fullName") && formData.fullName.trim() === ""
                          ? "border-red-400/50 bg-red-400/5"
                          : ""
                        }`}
                      required
                    />
                  </div>

                  {/* Q2: WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q2.label")} <span className="text-red-400">*</span>
                    </label>
                    {touchedFields.includes("whatsapp") && (
                      <>
                        {formData.whatsapp === "" ? (
                          <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                            {t("validation.required")}
                          </p>
                        ) : !phoneRegex.test(formData.whatsapp) ? (
                          <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                            {t("validation.invalidPhone")}
                          </p>
                        ) : null}
                      </>
                    )}
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("whatsapp")}
                      placeholder={t("q2.placeholder")}
                      className={`${inputClass} ${touchedFields.includes("whatsapp") &&
                          (formData.whatsapp === "" || !phoneRegex.test(formData.whatsapp))
                          ? "border-red-400/50 bg-red-400/5"
                          : ""
                        }`}
                      dir="ltr"
                      required
                    />
                  </div>

                  {/* Q3: Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q3.label")} <span className="text-red-400">*</span>
                    </label>
                    {touchedFields.includes("email") && (
                      <>
                        {formData.email === "" ? (
                          <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                            {t("validation.required")}
                          </p>
                        ) : !emailRegex.test(formData.email) ? (
                          <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                            {t("validation.invalidEmail")}
                          </p>
                        ) : null}
                      </>
                    )}
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("email")}
                      placeholder={t("q3.placeholder")}
                      className={`${inputClass} ${touchedFields.includes("email") &&
                          (formData.email === "" || !emailRegex.test(formData.email))
                          ? "border-red-400/50 bg-red-400/5"
                          : ""
                        }`}
                      dir="ltr"
                      required
                    />
                  </div>

                  {/* Q4: Social media (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q4.label")}
                    </label>
                    <input
                      type="text"
                      name="socialMedia"
                      value={formData.socialMedia}
                      onChange={handleInputChange}
                      placeholder={t("q4.placeholder")}
                      className={inputClass}
                    />
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
                    {touchedFields.includes("projectInfo") && formData.projectInfo.trim() === "" && (
                      <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                        {t("validation.required")}
                      </p>
                    )}
                    <textarea
                      rows={3}
                      name="projectInfo"
                      value={formData.projectInfo}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("projectInfo")}
                      placeholder={t("q5.placeholder")}
                      className={`${textareaClass} ${touchedFields.includes("projectInfo") && formData.projectInfo.trim() === ""
                          ? "border-red-400/50 bg-red-400/5"
                          : ""
                        }`}
                      required
                    />
                  </div>

                  {/* Q6: Stage dropdown + launch date */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q6.label")} <span className="text-red-400">*</span>
                    </label>
                    {touchedFields.includes("projectStage") && formData.projectStage === "" && (
                      <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                        {t("validation.required")}
                      </p>
                    )}
                    <select
                      name="projectStage"
                      value={formData.projectStage}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("projectStage")}
                      className={`${inputClass} ${touchedFields.includes("projectStage") && formData.projectStage === ""
                          ? "border-red-400/50 bg-red-400/5"
                          : ""
                        }`}
                      required
                    >
                      <option value="" disabled className="bg-[#0c1a2e] text-white">
                        {t("q6.selectPlaceholder")}
                      </option>
                      <option value="idea" className="bg-[#0c1a2e] text-white">
                        {t("q6.options.idea")}
                      </option>
                      <option value="foundation" className="bg-[#0c1a2e] text-white">
                        {t("q6.options.foundation")}
                      </option>
                      <option value="existing" className="bg-[#0c1a2e] text-white">
                        {t("q6.options.existing")}
                      </option>
                      <option value="mature" className="bg-[#0c1a2e] text-white">
                        {t("q6.options.mature")}
                      </option>
                    </select>
                    <input
                      type="text"
                      name="launchDate"
                      value={formData.launchDate}
                      onChange={handleInputChange}
                      placeholder={t("q6.datePlaceholder")}
                      className={`${inputClass} mt-3`}
                    />
                  </div>

                  {/* Q7: Ideal customer */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q7.label")} <span className="text-red-400">*</span>
                    </label>
                    {touchedFields.includes("idealCustomer") && formData.idealCustomer.trim() === "" && (
                      <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                        {t("validation.required")}
                      </p>
                    )}
                    <textarea
                      rows={3}
                      name="idealCustomer"
                      value={formData.idealCustomer}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("idealCustomer")}
                      placeholder={t("q7.placeholder")}
                      className={`${textareaClass} ${touchedFields.includes("idealCustomer") && formData.idealCustomer.trim() === ""
                          ? "border-red-400/50 bg-red-400/5"
                          : ""
                        }`}
                      required
                    />
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
                    {touchedFields.includes("marketingChannels") && selectedChannels.length === 0 && (
                      <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                        {t("validation.required")}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {["instagram", "whatsapp", "paidAds", "referrals", "linkedin", "other"].map(
                        (ch) => (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => {
                              toggleChannel(ch);
                              if (!touchedFields.includes("marketingChannels")) {
                                setTouchedFields(prev => [...prev, "marketingChannels"]);
                              }
                            }}
                            className={`px-4 py-3 rounded-xl border text-sm font-body text-left transition-all duration-200 ${selectedChannels.includes(ch)
                                ? "bg-white/15 border-white text-white font-medium"
                                : touchedFields.includes("marketingChannels") && selectedChannels.length === 0
                                  ? "bg-red-400/5 border-red-400/20 text-white/60 hover:border-red-400/40"
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
                    <textarea
                      rows={3}
                      name="differentiation"
                      value={formData.differentiation}
                      onChange={handleInputChange}
                      placeholder={t("q9.placeholder")}
                      className={textareaClass}
                    />
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
                    {touchedFields.includes("biggestChallenge") && formData.biggestChallenge.trim() === "" && (
                      <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                        {t("validation.required")}
                      </p>
                    )}
                    <textarea
                      rows={3}
                      name="biggestChallenge"
                      value={formData.biggestChallenge}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("biggestChallenge")}
                      placeholder={t("q10.placeholder")}
                      className={`${textareaClass} ${touchedFields.includes("biggestChallenge") && formData.biggestChallenge.trim() === ""
                          ? "border-red-400/50 bg-red-400/5"
                          : ""
                        }`}
                      required
                    />
                  </div>

                  {/* Q11: Consultation goal */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q11.label")} <span className="text-red-400">*</span>
                    </label>
                    {touchedFields.includes("consultationGoal") && formData.consultationGoal.trim() === "" && (
                      <p className="text-red-400 text-xs font-body animate-in fade-in slide-in-from-top-1 duration-200">
                        {t("validation.required")}
                      </p>
                    )}
                    <textarea
                      rows={3}
                      name="consultationGoal"
                      value={formData.consultationGoal}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("consultationGoal")}
                      placeholder={t("q11.placeholder")}
                      className={`${textareaClass} ${touchedFields.includes("consultationGoal") && formData.consultationGoal.trim() === ""
                          ? "border-red-400/50 bg-red-400/5"
                          : ""
                        }`}
                      required
                    />
                  </div>

                  {/* Q12: Additional info (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-headline font-medium text-white/70 block">
                      {t("q12.label")}
                    </label>
                    <textarea
                      rows={3}
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder={t("q12.placeholder")}
                      className={textareaClass}
                    />
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
                onClick={validateAndProceed}
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
