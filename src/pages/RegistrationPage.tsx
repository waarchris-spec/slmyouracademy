import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { SpecialOfferBanner } from '../components/SpecialOfferBanner';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { academyCampaign, ACADEMY_INFO } from '../data/academyData';
import { RegistrationFormData } from '../types';
import {
  Sparkles,
  CheckCircle2,
  Phone,
  Send,
  Calendar,
  Tag,
  ShieldCheck,
  AlertCircle,
  Clock,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface RegistrationPageProps {
  onOpenRegister: (program?: string) => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language, t } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'التسجيل والعروض الخاصة — احجز مقعدك لموسم 2026 / 2027',
    titleEn: 'Registration & Special Offers — Enroll for 2026 / 2027 Season',
    descAr: 'استمارة التسجيل الإلكتروني المسبق في أكاديمية Your Academy وعرض المستوى الكامل 9000 دج. انطلاق الموسم 18 سبتمبر 2026 في عين الدفلى، البليدة، خميس مليانة، والعطاف.',
    descEn: 'Online pre-enrollment form for Your Academy and 9000 DZD full level promo. Season launch September 18, 2026 across Aïn Defla, Blida, Khemis Miliana, and El Attaf.',
  });

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    phone: '',
    email: '',
    branch: isRtl ? 'فرع عين الدفلى — الرئيسي (حي الإخوة شوال)' : 'Aïn Defla Branch — Main Location (Hay El Ikhwa Chaoual)',
    programType: isRtl ? 'اللغة الإنجليزية (عرض 9000 دج)' : 'English Language (9000 DZD Offer)',
    studyLevel: t.modal.levelOptions.beginner,
    preferredTiming: t.modal.timingOptions.evening,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [registrationCode, setRegistrationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
    <div className="space-y-12 sm:space-y-16">
      {/* Page Header */}
      <PageHeader
        badge={`${academyCampaign.academicYear} • ${academyCampaign.registrationStatus}`}
        badgeIcon={<Tag className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'التسجيل والعروض' : 'Registration & Offers' }]}
        title={isAr ? 'التسجيل الإلكتروني و' : 'Online Registration &'}
        titleHighlight={isAr ? 'العروض الخاصة الحصرية' : 'Exclusive Offers'}
        description={
          isAr
            ? `احجز مقعدك الآن في الموسم الأكاديمي ${academyCampaign.academicYear}. استفد من عرض المستوى الكامل (${academyCampaign.offer}) وحدد الفرع والتوقيت الملائمين لك.`
            : `Enroll now for the ${academyCampaign.academicYear} academic season. Benefit from the verified promotion (${academyCampaign.offer}) and choose your preferred branch and cohort.`
        }
      />

      {/* Verified Campaign Status Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-start">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
            <span className="text-xs text-amber-800 dark:text-amber-400 font-bold block">{isAr ? 'الموسم الأكاديمي' : 'Academic Year'}</span>
            <span className="text-base sm:text-lg font-black text-zinc-950 dark:text-white font-sora block">{academyCampaign.academicYear}</span>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
            <span className="text-xs text-amber-800 dark:text-amber-400 font-bold block">{isAr ? 'حالة التسجيل' : 'Status'}</span>
            <span className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 block">{academyCampaign.registrationStatus}</span>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
            <span className="text-xs text-amber-800 dark:text-amber-400 font-bold block">{isAr ? 'العرض المعتمد' : 'Verified Offer'}</span>
            <span className="text-base sm:text-lg font-black text-zinc-950 dark:text-white block">{academyCampaign.offer}</span>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
            <span className="text-xs text-amber-800 dark:text-amber-400 font-bold block">{isAr ? 'تاريخ الانطلاق المعلن' : 'Launch Date'}</span>
            <span className="text-base sm:text-lg font-black text-zinc-950 dark:text-white block">{academyCampaign.startDate}</span>
          </div>
        </div>
      </section>

      {/* Embedded Special Offer Banner */}
      <SpecialOfferBanner onOpenRegister={onOpenRegister} />

      {/* Dedicated Interactive Registration Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="register-form-section">
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-amber-500/40 shadow-2xl text-start space-y-6">
          <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.modal.formBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              {isAr ? 'استمارة التسجيل المسبق وحجز المقعد' : 'Pre-Enrollment & Seat Reservation Form'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              {isAr
                ? 'املأ البيانات التالية لحجز مقعدك، وسيتواصل معك مستشار التوجيه بالفرع المختار لتأكيد الفوج والموعد.'
                : 'Fill in your details below to reserve your seat; an academy advisor at your selected branch will contact you to confirm.'}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="regFullName">
                  {t.modal.fullNameLabel} <span className="text-amber-600 dark:text-amber-400">*</span>
                </label>
                <input
                  id="regFullName"
                  type="text"
                  required
                  placeholder={t.modal.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 text-zinc-900 dark:text-white text-sm outline-none transition-colors"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="regPhone">
                    {t.modal.phoneLabel} <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    id="regPhone"
                    type="tel"
                    required
                    placeholder={t.modal.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 text-zinc-900 dark:text-white text-sm outline-none transition-colors"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="regEmail">
                    {t.modal.emailLabel} <span className="text-zinc-500 font-normal">({t.modal.optional})</span>
                  </label>
                  <input
                    id="regEmail"
                    type="email"
                    placeholder={t.modal.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 text-zinc-900 dark:text-white text-sm outline-none transition-colors"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Branch Selection (All 4 branches verified) */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="regBranchSelect">
                  {isRtl ? 'فرع الأكاديمية المطلوب' : 'Preferred Academy Branch'} <span className="text-amber-600 dark:text-amber-400">*</span>
                </label>
                <select
                  id="regBranchSelect"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 text-zinc-900 dark:text-white text-sm outline-none transition-colors"
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
              </div>

              {/* Program Choice */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="regProgramType">
                  {t.modal.programLabel} <span className="text-amber-600 dark:text-amber-400">*</span>
                </label>
                <select
                  id="regProgramType"
                  value={formData.programType}
                  onChange={(e) => setFormData({ ...formData, programType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 text-zinc-900 dark:text-white text-sm outline-none transition-colors"
                >
                  {isRtl ? (
                    <>
                      <optgroup label="برامج اللغات (عرض 9000 دج للمستوى)">
                        <option value="اللغة الإنجليزية (عرض 9000 دج)">اللغة الإنجليزية (English) — 9000 دج للمستوى</option>
                        <option value="اللغة الفرنسية (Français)">اللغة الفرنسية (Français) — 9000 دج للمستوى</option>
                        <option value="اللغة الإسبانية (Español)">اللغة الإسبانية (Español) — 9000 دج للمستوى</option>
                        <option value="اللغة الألمانية (Deutsch)">اللغة الألمانية (Deutsch) — 9000 دج للمستوى</option>
                      </optgroup>
                      <optgroup label="الدعم المدرسي والأقسام النهائية">
                        <option value="دعم الأقسام النهائية — شهادة البكالوريا BAC">دعم الأقسام النهائية — شهادة البكالوريا (BAC)</option>
                        <option value="دعم شهادة التعليم المتوسط BEM">دعم شهادة التعليم المتوسط (BEM)</option>
                        <option value="تحسين المستوى والدعم المدرسي العام">تحسين المستوى والدعم المدرسي العام</option>
                      </optgroup>
                    </>
                  ) : (
                    <>
                      <optgroup label="Language Programs (9000 DZD Offer / Level)">
                        <option value="English Language (9000 DZD Offer)">English Language — 9000 DZD / Level</option>
                        <option value="French Language (Français)">French Language — 9000 DZD / Level</option>
                        <option value="Spanish Language (Español)">Spanish Language — 9000 DZD / Level</option>
                        <option value="German Language (Deutsch)">German Language — 9000 DZD / Level</option>
                      </optgroup>
                      <optgroup label="Academic Tutoring & National Exams">
                        <option value="BAC National Exam Support">BAC National Exam Support</option>
                        <option value="BEM National Exam Support">BEM National Exam Support</option>
                        <option value="General Academic Level Boost">General Academic Level Boost</option>
                      </optgroup>
                    </>
                  )}
                </select>
              </div>

              {/* Timing & Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="regStudyLevel">
                    {t.modal.levelLabel}
                  </label>
                  <select
                    id="regStudyLevel"
                    value={formData.studyLevel}
                    onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm outline-none transition-colors"
                  >
                    <option value={t.modal.levelOptions.beginner}>{t.modal.levelOptions.beginner}</option>
                    <option value={t.modal.levelOptions.intermediate}>{t.modal.levelOptions.intermediate}</option>
                    <option value={t.modal.levelOptions.advanced}>{t.modal.levelOptions.advanced}</option>
                    <option value={t.modal.levelOptions.bac}>{t.modal.levelOptions.bac}</option>
                    <option value={t.modal.levelOptions.bem}>{t.modal.levelOptions.bem}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="regPreferredTiming">
                    {t.modal.timingLabel}
                  </label>
                  <select
                    id="regPreferredTiming"
                    value={formData.preferredTiming}
                    onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm outline-none transition-colors"
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
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5" htmlFor="regNotes">
                  {t.modal.notesLabel} <span className="text-zinc-500 font-normal">({t.modal.optional})</span>
                </label>
                <textarea
                  id="regNotes"
                  rows={2}
                  placeholder={t.modal.notesPlaceholder}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.modal.submitBtn}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-zinc-950 dark:text-white">
                  {t.modal.successTitle}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
                  {t.modal.successMessage}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-amber-500/30 max-w-xs mx-auto">
                <span className="text-xs text-zinc-500 block mb-1">{t.modal.reservationCodeLabel}</span>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-widest">{registrationCode}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-colors"
                >
                  {isAr ? 'تسجيل طلب آخر' : 'Submit Another Request'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Campaign Details & FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-start space-y-3">
          <div className="flex items-center gap-2 text-zinc-950 dark:text-white font-bold text-sm">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>{isAr ? 'معلومات وضوابط التسجيل' : 'Registration Guidelines'}</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {isAr
              ? 'تؤكد استمارة التسجيل المسبق رغبتكم في حجز المقعد، وسيقوم فريق الاستقبال بالتواصل معكم لتحديد موعد اختبار تحديد المستوى المجاني، واستكمال الملف في أقرب فرع.'
              : 'The pre-registration form secures your cohort placement; our front-desk team will contact you to schedule a free diagnostic level evaluation.'}
          </p>
        </div>
      </section>
    </div>
  );
};
