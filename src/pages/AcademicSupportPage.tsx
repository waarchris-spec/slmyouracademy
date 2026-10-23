import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AcademicSupport } from '../components/AcademicSupport';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { GraduationCap, BookOpen, CheckCircle2, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AcademicSupportPageProps {
  onOpenRegister: (program?: string) => void;
}

export const AcademicSupportPage: React.FC<AcademicSupportPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language, t } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'الدعم المدرسي — شهادة البكالوريا (BAC) وشهادة التعليم المتوسط (BEM)',
    titleEn: 'Academic Tutoring — BAC & BEM National Exam Support',
    descAr: 'حصص دعم مدرسي متخصصة للأقسام النهائية وجميع الأطوار مع أساتذة شباب متمكنين ومتابعة فردية لكل تلميذ في عين الدفلى، البليدة، خميس مليانة، والعطاف.',
    descEn: 'Specialized academic tutoring for exam classes (BAC & BEM) with skilled young instructors and personalized student follow-up.',
  });

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Page Header */}
      <PageHeader
        badge={isAr ? 'الدعم المدرسي للأقسام النهائية' : 'Academic Support for Exam Classes'}
        badgeIcon={<GraduationCap className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'الدعم المدرسي' : 'Academic Support' }]}
        title={isAr ? 'برامج المرافقة البيداغوجية و' : 'Pedagogical Tutoring &'}
        titleHighlight={isAr ? 'الدعم المدرسي المتخصص' : 'Specialized Exam Prep'}
        description={
          isAr
            ? 'نقدم مرافقة نوعية لتلاميذ الأطوار المتوسطة والثانوية، مع تركيز مكثف على مرشحي شهادتي البكالوريا (BAC) والتعليم المتوسط (BEM) لضبط المنهجية وحل مواضيع الامتحانات وتثبيت الأساسيات.'
            : 'Quality pedagogical coaching for middle and secondary school students, with intensive preparation for BAC and BEM candidates focusing on exam methodology and topic mastery.'
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister('دعم الأقسام النهائية — شهادة البكالوريا BAC')}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isAr ? 'سجل في حصص الدعم المدرسي' : 'Enroll in Academic Support'}</span>
            </button>
            <Link
              to="/programs"
              className="px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 transition-colors"
            >
              {isAr ? 'الرزنامة ومواعيد الانطلاق' : 'Calendar & Milestones'}
            </Link>
          </div>
        }
      />

      {/* Main Academic Support Component */}
      <AcademicSupport onOpenRegister={onOpenRegister} />

      {/* Additional Pedagogical Methodology Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-start space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-sora block">
              {isAr ? 'منهجية العمل البيداغوجي' : 'Pedagogical Methodology'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              {isAr ? 'كيف نضمن التفوق والتحصيل الحقيقي لكل تلميذ؟' : 'How We Ensure Genuine Mastery for Every Student'}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr
                ? 'لا نعتمد على التلقين السطحي، بل نركز على معالجة الثغرات التراكمية، ومتابعة دفتر التلميذ بانتظام، مع تقديم تقارير دورية لأولياء الأمور.'
                : 'We move beyond rote memorization to target learning gaps, track student notebooks regularly, and provide progress feedback to parents.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                1
              </div>
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                {isAr ? 'تشخيص أولي لمستوى التلميذ' : 'Initial Diagnostic'}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isAr
                  ? 'تحديد نقاط القوة والصعوبات في المواد الأساسية وتوجيهه للفوج الأنسب.'
                  : 'Identifying strengths and bottlenecks in key subjects and placing in the optimal cohort.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                2
              </div>
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                {isAr ? 'حل مكثف لسلاسل ونماذج رسمية' : 'Intensive Model Exams'}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isAr
                  ? 'التدريب المستمر على مواضيع البكالوريات والبيام السابقة تحت إشراف الأساتذة.'
                  : 'Regular timed drills on past national BAC and BEM exams with model answer keys.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                3
              </div>
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                {isAr ? 'مرافقة نفسية ومنهجية قبل الامتحان' : 'Pre-Exam Psychological Support'}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isAr
                  ? 'بناء ثقة التلميذ بنفسه، والتخلص من التوتر وضبط إدارة الوقت في قاعة الامتحان.'
                  : 'Boosting candidate confidence, banishing exam stress, and mastering time management.'}
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
              {isAr ? 'سجل ابنك أو ابنتك الآن في الفوج الملائم' : 'Enroll Your Student in the Ideal Cohort Today'}
            </h3>
            <p className="text-sm font-medium opacity-90">
              {isAr
                ? 'الأفواج محدودة لضمان أقصى درجات التركيز والتفاعل المستمر مع الأستاذ.'
                : 'Cohorts are strictly limited in size to ensure maximum focus and interaction.'}
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
