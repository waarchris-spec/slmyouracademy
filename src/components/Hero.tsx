import React from 'react';
import { CAMPAIGN_MOTTO, academyCampaign } from '../data/academyData';
import { motion, useReducedMotion } from 'motion/react';
import heroStudentPhoto from '../assets/images/regenerated_image_1790866978055.png';
import { Link } from 'react-router-dom';
import { BlurUpImage } from './BlurUpImage';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
  BookOpen,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onOpenRegister: (program?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  const { t, isRtl, language } = useLanguage();
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative pt-32 pb-12 sm:pt-36 md:pt-40 lg:pt-44 lg:pb-24 overflow-hidden">
      {/* Background Subtle Geometric Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-5 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-5 sm:left-10 w-64 sm:w-80 h-64 sm:h-80 bg-yellow-500/5 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Main Copy (Right Side in RTL, Left in LTR) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-start">
            
            {/* Promotional Badges Row (Mobile wrap-safe) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-500 text-black font-black text-[11px] sm:text-xs tracking-wide shadow-md uppercase font-sora">
                <Sparkles className="w-3.5 h-3.5 fill-black shrink-0" />
                <span>{CAMPAIGN_MOTTO.backToSchool}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-amber-400/40 text-amber-800 dark:text-amber-300 font-black text-[11px] sm:text-xs shadow-sm font-sora">
                <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{CAMPAIGN_MOTTO.year}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-[11px] sm:text-xs font-semibold shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{language === 'ar' ? 'عين الدفلى • البليدة • خميس مليانة • العطاف' : 'Aïn Defla • Blida • Khemis Miliana • El Attaf'}</span>
              </span>
            </div>

            {/* Brand Slogan */}
            <div className={`inline-block ${isRtl ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-amber-500 py-0.5`}>
              <p className="text-amber-700 dark:text-amber-400 text-xs sm:text-sm md:text-base font-bold tracking-wide">
                {t.common.slogan}
              </p>
            </div>

            {/* Big Bold Headline (Mobile optimized: ~32-40px on mobile, responsive to 60px desktop) */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white leading-[1.2] sm:leading-tight tracking-tight">
                {isRtl ? 'أكاديمية ' : ''}<span className="text-amber-600 dark:text-amber-400">YOUR ACADEMY</span>
                <span className="block text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-zinc-800 dark:text-zinc-100 mt-1 sm:mt-2">
                  {t.hero.mainTitleSuffix}
                </span>
              </h1>
            </div>

            {/* Authentic Subtitle & Promise */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal">
              {t.hero.subtitle}
            </p>

            {/* Special Highlight Badge: 9000 DZD (Mobile touch friendly) */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-gradient-to-r dark:from-amber-500/20 dark:via-amber-400/10 dark:to-transparent border border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
              <div className="space-y-1 text-start">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black text-[10px] sm:text-xs font-black">
                    {language === 'ar' ? 'عرض الموسم' : 'Season Offer'}
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-amber-900 dark:text-amber-300">
                    {t.hero.offerBannerTitle}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {t.hero.offerBannerSubtitle}
                </p>
              </div>
              <button
                onClick={() => onOpenRegister(t.hero.offerBannerTitle)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black text-xs sm:text-sm font-black shadow transition-all shrink-0 self-stretch sm:self-center flex items-center justify-center whitespace-nowrap"
                id="hero-special-offer-btn"
              >
                {t.hero.offerBookBtn}
              </button>
            </div>

            {/* Action Buttons (Mobile-first stacked & minimum 48px tap targets) */}
            <div className="pt-1 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5">
              <button
                onClick={() => onOpenRegister()}
                className="min-h-[48px] px-6 sm:px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black text-sm sm:text-base font-black shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                id="hero-register-btn"
              >
                <span>{t.common.registerNow}</span>
                {isRtl ? (
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex items-center gap-2 sm:gap-3">
                <Link
                  to="/languages"
                  className="min-h-[48px] px-4 sm:px-6 py-3 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 hover:border-amber-400/50 text-xs sm:text-sm font-bold flex items-center justify-center transition-all shadow-sm active:scale-[0.98]"
                  id="hero-explore-btn"
                >
                  {t.common.explorePrograms}
                </Link>

                <Link
                  to="/branches-contact"
                  className="min-h-[48px] px-4 sm:px-5 py-3 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 hover:border-amber-400/50 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] group text-center"
                  id="hero-branches-btn"
                >
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{t.common.findNearestBranch}</span>
                </Link>
              </div>
            </div>

            {/* Key Assurance Badges (Mobile responsive grid) */}
            <div className="pt-2 grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 text-xs text-zinc-800 dark:text-zinc-300">
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800/70 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium text-[11px] sm:text-xs">{t.common.individualFollowUp}</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800/70 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium text-[11px] sm:text-xs">{t.common.modernMethods}</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800/70 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium text-[11px] sm:text-xs">{t.common.skilledTeachers}</span>
              </div>
            </div>

          </div>

          {/* Branded Visual Showcase (Authentic Student Photo + Badges) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Poster Box */}
              <div className="relative rounded-3xl bg-white dark:bg-gradient-to-b dark:from-zinc-900 dark:to-[#0F141F] p-4 sm:p-6 border-2 border-amber-400/40 dark:border-amber-400/30 shadow-2xl overflow-hidden text-start">
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
                
                {/* Top Poster Header */}
                <div className="flex items-center justify-between pb-3 sm:pb-5 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={isDark ? '/assets/your-academy-symbol-dark.png' : '/assets/your-academy-symbol-light.png'}
                      alt="Your Academy"
                      className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 select-none"
                      width="36"
                      height="36"
                    />
                    <div>
                      <h3 className="font-extrabold text-xs sm:text-sm text-zinc-950 dark:text-white font-sora">YOUR ACADEMY</h3>
                      <p className="text-[10px] sm:text-[11px] text-amber-700 dark:text-amber-400 font-bold">
                        {language === 'ar' ? 'عين الدفلى • البليدة • خميس مليانة • العطاف' : 'Aïn Defla • Blida • Khemis Miliana • El Attaf'}
                      </p>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] sm:text-[11px] font-bold border border-amber-400/30 font-sora">
                    {academyCampaign.academicYear}
                  </div>
                </div>

                {/* Uploaded Authentic Your Academy Photograph (Prominent, natural proportions, no distortion) */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="my-3 sm:my-5 relative rounded-2xl overflow-hidden border-2 border-amber-400/80 dark:border-amber-400/60 shadow-xl shadow-amber-500/10"
                >
                  <BlurUpImage
                    src={heroStudentPhoto}
                    fallbackSrc="/assets/your-academy-results-photo.jpg"
                    alt={isRtl ? "طلاب Your Academy يحملون شهاداتهم الرسمية" : "Your Academy students holding their certificates"}
                    className="w-full h-48 xs:h-56 sm:h-64 md:h-72 object-cover rounded-2xl"
                    priority={true}
                  />
                  {/* Subtle student photo caption overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 text-start pointer-events-none z-10">
                    <span className="text-[11px] text-amber-300 font-bold block">
                      ⭐ {isRtl ? 'دفعة المتفوقين والمتحصلين على الشهادات' : 'Honored students & certificate recipients'}
                    </span>
                  </div>
                </motion.div>

                {/* Offer Feature Highlights */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-zinc-900 dark:text-zinc-200 font-bold">{language === 'ar' ? 'العرض الترويجي:' : 'Promo Offer:'}</span>
                    </div>
                    <span className="text-amber-700 dark:text-amber-400 font-black text-xs sm:text-sm">{language === 'ar' ? academyCampaign.offer : '9,000 DZD / level'}</span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-zinc-900 dark:text-zinc-200 font-bold">{language === 'ar' ? 'اللغات:' : 'Languages:'}</span>
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium text-[11px] sm:text-xs">
                      {language === 'ar' ? 'إنجليزية • فرنسية • إسبانية • ألمانية' : 'EN • FR • ES • DE'}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-zinc-900 dark:text-zinc-200 font-bold">{language === 'ar' ? 'الدعم المدرسي:' : 'Academic:'}</span>
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium text-[11px] sm:text-xs">
                      {language === 'ar' ? 'أقسام الامتحانات (BAC / BEM)' : 'Final Classes (BAC & BEM)'}
                    </span>
                  </div>
                </div>

                {/* Campaign Start Countdown Note */}
                <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-zinc-200 dark:border-zinc-800/90 text-center">
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-300">
                    <span className="text-amber-600 dark:text-amber-400 font-black">{language === 'ar' ? 'موعد الانطلاق:' : 'Program Launch:'}</span> {t.common.startDate}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5">
                    {t.hero.limitedSeatsNote}
                  </p>
                </div>
              </div>



              {/* Floating Badge 2: Certificate */}
              <div className={`hidden sm:flex absolute -top-4 ${isRtl ? '-left-4 sm:-left-6' : '-right-4 sm:-right-6'} bg-white/95 dark:bg-zinc-900/95 border border-amber-400/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-xl backdrop-blur-md items-center gap-2`}>
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100">
                  {t.common.britishCert}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


