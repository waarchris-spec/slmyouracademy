import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AcademicCalendarSection } from '../components/AcademicCalendarSection';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { academyCampaign } from '../data/academyData';
import { Calendar, Clock, Sparkles, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProgramsPageProps {
  onOpenRegister: (program?: string) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language, t } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'برامجنا والرزنامة الأكاديمية — الموسم الدراسي 2026 / 2027',
    titleEn: 'Programs & Academic Calendar — 2026 / 2027 Season',
    descAr: 'الرزنامة الأكاديمية الرسمية لموسم 2026/2027 في أكاديمية Your Academy: انطلاق البرامج، جداول الأفواج المسائية وعطل نهاية الأسبوع، والدورات المكثفة.',
    descEn: 'Official 2026/2027 academic calendar for Your Academy: program launch, evening & weekend batches, and intensive exam sessions.',
  });

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Page Header */}
      <PageHeader
        badge={`${academyCampaign.academicYear} • ${academyCampaign.registrationStatus}`}
        badgeIcon={<Calendar className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'برامجنا والرزنامة' : 'Programs & Calendar' }]}
        title={isAr ? 'البرامج الدراسية و' : 'Study Programs &'}
        titleHighlight={isAr ? 'الرزنامة الأكاديمية الرسمية' : 'Official Academic Calendar'}
        description={
          isAr
            ? `استكشف الجدول الزمني الكامل لموسم ${academyCampaign.academicYear}، ومواعيد انطلاق أفواج اللغات والدعم المدرسي، بالإضافة إلى الدورات المكثفة في العطل الفصلية.`
            : `Explore the complete timeline for the ${academyCampaign.academicYear} season, launch dates for language and academic support cohorts, and seasonal holiday intensives.`
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isAr ? 'حجز مقعد في الفوج المناسب' : 'Reserve Cohort Seat'}</span>
            </button>
            <Link
              to="/locations"
              className="px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 transition-colors"
            >
              {isAr ? 'فروع الأكاديمية الأربعة' : 'All 4 Branch Locations'}
            </Link>
          </div>
        }
      />

      {/* Verified Campaign Status Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 text-start">
          <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-black text-amber-900 dark:text-amber-300 block">
              {isAr ? '📌 التواريخ الرسمية المعتمدة للموسم الدراسي:' : '📌 Confirmed Official Season Schedule:'}
            </span>
            <p className="text-zinc-700 dark:text-zinc-300">
              {isAr
                ? `الموسم الدراسي: ${academyCampaign.academicYear} • حالة التسجيل: ${academyCampaign.registrationStatus} • ${academyCampaign.startDateArFull} • الاشتراك الشهري: 3000 دج • المستوى الكامل: 9000 دج (فرع البليدة: 4000 دج) • الكبار: 4 حصص شهرياً • الأطفال: 8 حصص شهرياً.`
                : `Academic Year: ${academyCampaign.academicYear} • Status: Open • Launch Date: September 18, 2026 • Monthly: 3,000 DZD • Full Level: 9,000 DZD (Blida: 4,000 DZD) • Adults: 4 sessions/mo • Kids: 8 sessions/mo.`}
            </p>
          </div>
        </div>
      </section>

      {/* Main Academic Calendar Milestones Component */}
      <AcademicCalendarSection onOpenRegister={onOpenRegister} />

      {/* Timetable Formats & Flexible Batches Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-start space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-sora block">
              {isAr ? 'صيغ وتوقيتات الدراسة' : 'Flexible Timetables & Formats'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              {isAr ? 'توقيتات مرنة تناسب التلاميذ والطلبة والموظفين' : 'Flexible Timing for Students & Professionals'}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr
                ? 'توفر الأكاديمية جداول زمنية متعددة تتيح لكل تلميذ أو متدرب اختيار التوقيت الأنسب لالتزاماته اليومية والدراسية.'
                : 'The academy offers multiple timetables allowing every learner to select times compatible with their academic or professional commitments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                {isAr ? 'الفترة الصباحية وما بعد الظهيرة' : 'Morning & Afternoon Batches'}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isAr
                  ? 'مخصصة للتلاميذ والطلاب في الأوقات الشاغرة من الدوام المدرسي الرسمي.'
                  : 'Tailored for students during gaps in their regular school or university schedules.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                {isAr ? 'الأفواج المسائية (16:30 إلى 18:30)' : 'Evening Batches (16:30 to 18:30)'}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isAr
                  ? 'مثالية لتلاميذ الطور الثانوي والموظفين الراغبين في ترقية مستواهم بعد أوقات العمل.'
                  : 'Ideal for secondary students and working adults looking to boost fluency after work.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                {isAr ? 'حصص نهاية الأسبوع (الجمعة والسبت)' : 'Weekend Intensives (Fri & Sat)'}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isAr
                  ? 'حصص مركزة ومكثفة بنهاية الأسبوع لتجنب أي تعارض مع الدروس النظامية.'
                  : 'Concentrated weekend sessions designed to avoid any overlap with weekday studies.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-amber-500 text-black flex flex-col sm:flex-row items-center justify-between gap-6 text-start">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'حدد توقيتك المفضل وسجل مقعدك مسبقاً' : 'Select Your Preferred Timing & Secure Your Seat'}
            </h3>
            <p className="text-sm font-medium opacity-90">
              {isAr
                ? 'يمكنك تحديد التوقيت المفضل (صباحي / مسائي / نهاية الأسبوع) في استمارة التسجيل.'
                : 'You can choose your preferred slot (morning / evening / weekend) in the registration form.'}
            </p>
          </div>

          <button
            onClick={() => onOpenRegister()}
            className="px-8 py-4 rounded-2xl bg-black hover:bg-zinc-900 text-white font-black text-sm sm:text-base shrink-0 active:scale-95 transition-all shadow-xl"
          >
            {t.common.registerNow}
          </button>
        </div>
      </section>
    </div>
  );
};
