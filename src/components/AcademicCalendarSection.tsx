import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Sparkles,
  Clock,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CalendarCheck,
  Tag,
  Star,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { academyCampaign, ACADEMIC_CALENDAR_2026_2027, CalendarMilestone } from '../data/academyData';

interface AcademicCalendarSectionProps {
  onOpenRegister: (program?: string) => void;
}

export const AcademicCalendarSection: React.FC<AcademicCalendarSectionProps> = ({ onOpenRegister }) => {
  const { isRtl, language } = useLanguage();
  const [selectedTerm, setSelectedTerm] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMilestones = ACADEMIC_CALENDAR_2026_2027.filter((item) => {
    const matchesTerm = selectedTerm === 'all' || item.term === selectedTerm;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesTerm && matchesCategory;
  });

  const getCategoryIcon = (category: CalendarMilestone['category']) => {
    switch (category) {
      case 'launch':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'registration':
        return <CalendarCheck className="w-4 h-4 text-emerald-500" />;
      case 'eval':
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case 'camps':
        return <Compass className="w-4 h-4 text-purple-500" />;
      case 'exams':
        return <BookOpen className="w-4 h-4 text-rose-500" />;
      case 'graduation':
        return <Award className="w-4 h-4 text-amber-500" />;
      default:
        return <CalendarIcon className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <section id="calendar" className="py-20 bg-zinc-50 dark:bg-[#080b11] relative transition-colors border-t border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold font-sora">
            <CalendarIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>
              {isRtl
                ? `الرزنامة البيداغوجية لموسم ${academyCampaign.academicYear}`
                : `${academyCampaign.academicYear} Academic Calendar`}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            {isRtl ? 'المواعيد والمحطات الرئيسية لعام' : 'Key Milestones & Dates for'} <span className="text-amber-600 dark:text-amber-400 font-sora">{academyCampaign.academicYear}</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {isRtl
              ? `تابع التواريخ الرسمية لانطلاق الأفواج، الدورات المكثفة، حصص الدعم المدرسي، ومواعيد تسليم الشهادات في Your Academy بخميس مليانة.`
              : `Explore key milestones for official cohort kickoffs, intensive camps, academic support sessions, and accredited graduation ceremonies at Your Academy.`}
          </p>
        </div>

        {/* Campaign Highlights Banner */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                {isRtl ? 'الموسم الأكاديمي' : 'Academic Year'}
              </div>
              <div className="text-lg font-black text-zinc-950 dark:text-white font-sora">
                {academyCampaign.academicYear}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-400/50 dark:border-amber-500/40 shadow-sm flex items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-amber-500" />
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                {isRtl ? 'تاريخ بداية البرنامج' : 'Program Start Date'}
              </div>
              <div className="text-lg font-black text-zinc-950 dark:text-white">
                {isRtl ? academyCampaign.startDate : 'September 18, 2026'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                {isRtl ? 'حالة التسجيلات' : 'Registration Status'}
              </div>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {isRtl ? academyCampaign.registrationStatus : 'Registrations Open'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                {isRtl ? 'العرض النشط' : 'Active Offer'}
              </div>
              <div className="text-base sm:text-lg font-black text-purple-700 dark:text-purple-300">
                {isRtl ? academyCampaign.offer : '9,000 DZD / Level'}
              </div>
            </div>
          </div>
        </div>

        {/* Term & Category Filter Controls */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {/* Term Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <button
              onClick={() => setSelectedTerm('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                selectedTerm === 'all'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {isRtl ? 'كامل الموسم 2026/2027' : 'All Season 2026/2027'}
            </button>
            <button
              onClick={() => setSelectedTerm(1)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                selectedTerm === 1
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {isRtl ? 'الفصل الأول (خريف 2026)' : 'Term 1 (Autumn 2026)'}
            </button>
            <button
              onClick={() => setSelectedTerm(2)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                selectedTerm === 2
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {isRtl ? 'الفصل الثاني (شتاء 2027)' : 'Term 2 (Winter 2027)'}
            </button>
            <button
              onClick={() => setSelectedTerm(3)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                selectedTerm === 3
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {isRtl ? 'الفصل الثالث والامتحانات (ربيع 2027)' : 'Term 3 & Exams (Spring 2027)'}
            </button>
          </div>

          {/* Quick Counter */}
          <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            {isRtl ? `${filteredMilestones.length} محطة مجدولة` : `${filteredMilestones.length} Scheduled Milestones`}
          </div>
        </div>

        {/* Visual Timeline / Milestone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMilestones.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl text-start relative overflow-hidden ${
                item.isKeyHighlight
                  ? 'bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 dark:from-amber-500/15 dark:via-zinc-900 dark:to-zinc-900 border-2 border-amber-500/60 dark:border-amber-400/50 shadow-amber-500/10'
                  : 'bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/50'
              }`}
            >
              {item.isKeyHighlight && (
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
              )}

              <div className="space-y-4">
                {/* Header: Date Badge & Category */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center font-sora">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 leading-none">
                        {isRtl ? item.monthBadgeAr.split(' ')[0] : item.monthBadgeEn.split(' ')[0]}
                      </span>
                      <span className="text-base font-black text-amber-600 dark:text-amber-400 leading-tight">
                        {item.dayBadge}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-black text-zinc-950 dark:text-white">
                        {isRtl ? item.dateAr : item.dateEn}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-bold">
                        {isRtl ? `الفصل ${item.term}` : `Term ${item.term}`}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      item.isKeyHighlight
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    {isRtl ? item.statusBadgeAr : item.statusBadgeEn}
                  </span>
                </div>

                {/* Category Pill with Icon */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold">
                  {getCategoryIcon(item.category)}
                  <span>{isRtl ? item.categoryLabelAr : item.categoryLabelEn}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-zinc-950 dark:text-white leading-snug">
                  {isRtl ? item.titleAr : item.titleEn}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {isRtl ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => onOpenRegister(item.titleAr)}
                  className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center gap-1 group"
                >
                  <span>{isRtl ? 'حجز مسبق لهذا الموعد' : 'Reserve For This Date'}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  )}
                </button>

                {item.isKeyHighlight && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{isRtl ? 'حدث رئيسي' : 'Featured'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Campaign Callout Box */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-zinc-950 shadow-xl shadow-amber-500/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-start">
            <div className="inline-block px-3 py-1 rounded-full bg-black/10 text-zinc-950 font-black text-xs font-sora">
              {isRtl ? `موسم ${academyCampaign.academicYear}` : `${academyCampaign.academicYear} Academic Season`}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isRtl ? academyCampaign.startDateArFull : `Academic Program Starts on ${academyCampaign.startDate}`}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-zinc-900 max-w-2xl">
              {isRtl
                ? `الأماكن محدودة لضمان المتابعة الفردية لكل تلميذ داخل الفوج. استفد الآن من عرض (${academyCampaign.offer}) وسجل قبل اكتمال الأفواج.`
                : `Seats are strictly capped to ensure personalized follow-up for every learner. Reserve your place now and take advantage of the ${academyCampaign.offer} promotion.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => onOpenRegister('الرزنامة الدراسية 2026/2027')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-950 text-white font-black text-sm hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isRtl ? 'احجز مقعدك للموسم 2026 / 2027' : 'Enroll for 2026 / 2027'}
            </button>
            <a
              href="tel:0551404059"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/40 hover:bg-white/60 text-zinc-950 font-black text-sm transition-all text-center"
            >
              {isRtl ? 'اتصل بنا للاستفسار' : 'Call For Inquiry'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
