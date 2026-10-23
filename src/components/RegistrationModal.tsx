import React, { useState, useEffect } from 'react';
import { ACADEMY_INFO } from '../data/academyData';
import { RegistrationFormData } from '../types';
import { BlurUpImage } from './BlurUpImage';
import {
  X,
  CheckCircle2,
  Phone,
  Send,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgram?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preselectedProgram,
}) => {
  const { t, isRtl } = useLanguage();

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    phone: '',
    email: '',
    branch: isRtl ? 'فرع عين الدفلى — الرئيسي (حي الإخوة شوال)' : 'Aïn Defla Branch — Main Location (Hay El Ikhwa Chaoual)',
    programType: preselectedProgram || (isRtl ? 'اللغة الإنجليزية (عرض 9000 دج)' : 'English Language (9000 DZD Offer)'),
    studyLevel: t.modal.levelOptions.beginner,
    preferredTiming: t.modal.timingOptions.evening,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [registrationCode, setRegistrationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedProgram) {
      setFormData((prev) => ({
        ...prev,
        programType: preselectedProgram.includes('9000') || preselectedProgram.includes('عرض') || preselectedProgram.includes('Offer')
          ? (isRtl ? 'عرض خاص: مستوى كامل 9000 دج' : 'Special Offer: Full Level 9000 DZD')
          : preselectedProgram,
      }));
    }
  }, [preselectedProgram, isRtl]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg(t.modal.validationError);
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setErrorMsg(t.modal.validationError);
      return;
    }

    setErrorMsg('');
    const code = `YA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegistrationCode(code);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      branch: isRtl ? 'فرع عين الدفلى — الرئيسي (حي الإخوة شوال)' : 'Aïn Defla Branch — Main Location (Hay El Ikhwa Chaoual)',
      programType: isRtl ? 'اللغة الإنجليزية (عرض 9000 دج)' : 'English Language (9000 DZD Offer)',
      studyLevel: t.modal.levelOptions.beginner,
      preferredTiming: t.modal.timingOptions.evening,
      notes: '',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))] bg-black/80 backdrop-blur-sm overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl my-auto rounded-3xl bg-white dark:bg-[#0F141F] border-2 border-amber-500/50 dark:border-amber-400/40 p-6 sm:p-8 shadow-2xl text-start transition-colors max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-95`}
          aria-label={t.modal.closeBtn}
          id="close-registration-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center border border-amber-400/40 shadow-lg shrink-0 overflow-hidden">
                <BlurUpImage
                  src="/assets/your-academy-logo.png"
                  alt="Your Academy"
                  className="w-full h-full object-contain"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-[11px] font-black">
                  <Sparkles className="w-3 h-3" />
                  <span>{t.modal.formBadge}</span>
                </div>
                <h3 className="text-2xl font-black text-zinc-950 dark:text-white">
                  {t.modal.titlePrefix} <span className="text-amber-600 dark:text-amber-400">YOUR ACADEMY</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  {t.modal.subtitle}
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="fullName">
                  {t.modal.fullNameLabel} <span className="text-amber-600 dark:text-amber-400">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder={t.modal.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-base sm:text-sm outline-none transition-colors"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="phone">
                    {t.modal.phoneLabel} <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder={t.modal.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-base sm:text-sm outline-none transition-colors"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="email">
                    {t.modal.emailLabel} <span className="text-zinc-500 font-normal">({t.modal.optional})</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t.modal.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-base sm:text-sm outline-none transition-colors"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Branch Selection */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="branchSelect">
                  {isRtl ? 'فرع الأكاديمية المطلوب' : 'Preferred Academy Branch'} <span className="text-amber-600 dark:text-amber-400">*</span>
                </label>
                <select
                  id="branchSelect"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-base sm:text-sm outline-none transition-colors"
                >
                  {isRtl ? (
                    <>
                      <option value="فرع عين الدفلى — الرئيسي (حي الإخوة شوال)">
                        ⭐ فرع عين الدفلى — الرئيسي (حي الإخوة شوال، طريق مسجد مالك ابن أنس)
                      </option>
                      <option value="فرع خميس مليانة (تحت محل وزير القلايل مقابل زواق المصور)">
                        فرع خميس مليانة (تحت محل وزير القلايل مقابل زواق المصور - 44000)
                      </option>
                      <option value="فرع العطاف (العطاف، الجزائر 44000)">
                        فرع العطاف (العطاف، الجزائر 44000 - 0670 40 66 59)
                      </option>
                      <option value="فرع البليدة (البليدة - 09000)">
                        فرع البليدة (البليدة - 09000)
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="Aïn Defla Branch — Main Location (Hay El Ikhwa Chaoual)">
                        ⭐ Aïn Defla Branch — Main Location (Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas - 44000)
                      </option>
                      <option value="Khemis Miliana Branch (Under Wazir El Qlayel store, opp. Zouak)">
                        Khemis Miliana Branch (Under Wazir El Qlayel store, opp. Zouak - 44000)
                      </option>
                      <option value="El Attaf Branch (El Attaf, Algeria, 44000)">
                        El Attaf Branch (El Attaf, Algeria, 44000 - 0670 40 66 59)
                      </option>
                      <option value="Blida Branch (Blida - 09000)">
                        Blida Branch (Blida - 09000)
                      </option>
                    </>
                  )}
                </select>
                {formData.branch?.includes('البليدة') || formData.branch?.toLowerCase().includes('blida') ? (
                  <p className="mt-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/15 p-2 rounded-lg border border-amber-500/30">
                    📍 {isRtl ? 'تسعيرة فرع البليدة المعتمدة: 4000 دج (الكبار: 4 حصص شهرياً • الأطفال: 8 حصص شهرياً)' : 'Blida Branch tuition: 4,000 DZD (Adults: 4 sessions/mo • Kids: 8 sessions/mo)'}
                  </p>
                ) : null}
              </div>

              {/* Program Choice */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="programType">
                  {t.modal.programLabel} <span className="text-amber-600 dark:text-amber-400">*</span>
                </label>
                <select
                  id="programType"
                  value={formData.programType}
                  onChange={(e) => setFormData({ ...formData, programType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-base sm:text-sm outline-none transition-colors"
                >
                  {isRtl ? (
                    <>
                      <optgroup label="برامج اللغات (اشتراك 3000 دج شهرياً • مستوى كامل 9000 دج)">
                        <option value="اللغة الإنجليزية (English)">اللغة الإنجليزية (English) — 3000 دج/شهر أو 9000 دج للمستوى</option>
                        <option value="اللغة الفرنسية (Français)">اللغة الفرنسية (Français) — 3000 دج/شهر أو 9000 دج للمستوى</option>
                        <option value="اللغة الإسبانية (Español)">اللغة الإسبانية (Español) — 3000 دج/شهر أو 9000 دج للمستوى</option>
                        <option value="اللغة الألمانية (Deutsch)">اللغة الألمانية (Deutsch) — 3000 دج/شهر أو 9000 دج للمستوى</option>
                      </optgroup>
                      <optgroup label="الدعم المدرسي والأقسام النهائية">
                        <option value="دعم الأقسام النهائية — شهادة البكالوريا BAC">دعم الأقسام النهائية — شهادة البكالوريا (BAC)</option>
                        <option value="دعم شهادة التعليم المتوسط BEM">دعم شهادة التعليم المتوسط (BEM)</option>
                        <option value="تحسين المستوى والدعم المدرسي العام">تحسين المستوى والدعم المدرسي العام</option>
                      </optgroup>
                    </>
                  ) : (
                    <>
                      <optgroup label="Language Programs (3,000 DZD/mo • 9,000 DZD Full Level)">
                        <option value="English Language (English)">English Language — 3,000 DZD/mo or 9,000 DZD/level</option>
                        <option value="French Language (Français)">French Language — 3,000 DZD/mo or 9,000 DZD/level</option>
                        <option value="Spanish Language (Español)">Spanish Language — 3,000 DZD/mo or 9,000 DZD/level</option>
                        <option value="German Language (Deutsch)">German Language — 3,000 DZD/mo or 9,000 DZD/level</option>
                      </optgroup>
                      <optgroup label="Academic Support & Final Exam Classes">
                        <option value="Baccalaureate Support (BAC Prep)">Baccalaureate Support (BAC Prep)</option>
                        <option value="Middle School Support (BEM Prep)">Middle School Support (BEM Prep)</option>
                        <option value="General Academic Support & Tutoring">General Academic Support & Tutoring</option>
                      </optgroup>
                    </>
                  )}
                </select>
              </div>

              {/* Level & Preferred Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="studyLevel">
                    {t.modal.levelLabel}
                  </label>
                  <select
                    id="studyLevel"
                    value={formData.studyLevel}
                    onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-base sm:text-sm outline-none transition-colors"
                  >
                    <option value={t.modal.levelOptions.beginner}>{t.modal.levelOptions.beginner}</option>
                    <option value={t.modal.levelOptions.intermediate}>{t.modal.levelOptions.intermediate}</option>
                    <option value={t.modal.levelOptions.advanced}>{t.modal.levelOptions.advanced}</option>
                    <option value={t.modal.levelOptions.bac}>{t.modal.levelOptions.bac}</option>
                    <option value={t.modal.levelOptions.bem}>{t.modal.levelOptions.bem}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="preferredTiming">
                    {t.modal.timingLabel}
                  </label>
                  <select
                    id="preferredTiming"
                    value={formData.preferredTiming}
                    onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-base sm:text-sm outline-none transition-colors"
                  >
                    <option value={t.modal.timingOptions.evening}>{t.modal.timingOptions.evening}</option>
                    <option value={t.modal.timingOptions.weekend}>{t.modal.timingOptions.weekend}</option>
                    <option value={t.modal.timingOptions.morning}>{t.modal.timingOptions.morning}</option>
                    <option value={t.modal.timingOptions.flexible}>{t.modal.timingOptions.flexible}</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="notes">
                  {t.modal.notesLabel} <span className="text-zinc-500 font-normal">({t.modal.optional})</span>
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  placeholder={t.modal.notesPlaceholder}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-base sm:text-sm outline-none transition-colors resize-none"
                />
              </div>

              {/* Campaign notice inside form */}
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-300 flex items-center justify-between">
                <span>{t.modal.infoFooterDate}</span>
                <span className="font-bold">{isRtl ? 'عين الدفلى • البليدة • خميس مليانة' : 'Aïn Defla • Blida • Khemis Miliana'}</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-black text-base shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                id="submit-registration-btn"
              >
                <span>{t.modal.submitBtn}</span>
                <Send className="w-4 h-4" />
              </button>

            </form>
          </div>
        ) : (
          /* Confirmation Success Screen with Lottie-Style Animated Feedback */
          <div className="space-y-6 py-4 text-center">
            
            <div className="relative flex items-center justify-center py-4">
              {/* Pulsing celebratory background rings */}
              <div className="absolute w-28 h-28 rounded-full bg-amber-400/20 animate-ping" />
              <div className="absolute w-24 h-24 rounded-full bg-amber-400/30 animate-pulse" />
              
              {/* Lottie-style Animated SVG Check Badge */}
              <div className="relative z-10 w-20 h-20 rounded-3xl bg-amber-400 text-black flex items-center justify-center shadow-xl shadow-amber-400/30">
                <svg
                  className="w-12 h-12 text-black"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.5" strokeDasharray="140" strokeDashoffset="0" className="opacity-40" />
                  <path
                    d="M14 24.5L21 31.5L34 17.5"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-400 text-black text-xs font-black tracking-wide">
                {t.modal.successBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                {t.modal.successTitle}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
                {t.modal.successMessage}
              </p>
            </div>

            {/* Registration Code Card */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 max-w-md mx-auto text-start">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{t.modal.reservationCodeLabel}</span>
                <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-sora" dir="ltr">
                  {registrationCode}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">{t.modal.programReviewLabel}</span>
                  <span className="font-bold text-zinc-950 dark:text-white">{formData.programType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">{t.modal.phoneReviewLabel}</span>
                  <span className="font-bold text-zinc-950 dark:text-white" dir="ltr">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">{isRtl ? 'الفرع المحدد:' : 'Branch:'}</span>
                  <span className="font-bold text-amber-700 dark:text-amber-300">{formData.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">{t.modal.locationReviewLabel}</span>
                  <span className="font-bold text-zinc-950 dark:text-white">{t.common.locationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">{t.modal.startReviewLabel}</span>
                  <span className="font-bold text-zinc-950 dark:text-white">{t.common.startDate}</span>
                </div>
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`tel:${ACADEMY_INFO.phones[0]}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{t.contact.callAction}: <span dir="ltr">{ACADEMY_INFO.phones[0]}</span></span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 text-xs font-bold transition-colors"
              >
                {t.modal.registerAnotherBtn}
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-xs font-bold transition-colors"
              >
                {t.modal.closeBtn}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

