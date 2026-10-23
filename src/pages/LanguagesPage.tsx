import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { LanguagePrograms } from '../components/LanguagePrograms';
import { StudentAdvancementLevels } from '../components/StudentAdvancementLevels';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { Languages, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LanguagesPageProps {
  onOpenRegister: (program?: string) => void;
}

export const LanguagesPage: React.FC<LanguagesPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language, t } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'برامج اللغات الأجنبية — الإنجليزية، الفرنسية، الإسبانية، والألمانية',
    titleEn: 'Foreign Language Programs — English, French, Spanish & German',
    descAr: 'دورات متخصصة في اللغات الحية مع التركيز على المحادثة والطلاقة واكتساب الثقة، بشهادة معتمدة بالتعاون مع منظمة بريطانية وعرض خاص 9000 دج للمستوى.',
    descEn: 'Specialized language courses focusing on conversation, fluency and confidence, with British organization accredited certificates and 9000 DZD per level.',
  });

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Page Header */}
      <PageHeader
        badge={isAr ? 'تعليم اللغات الحية' : 'Living Languages Education'}
        badgeIcon={<Languages className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'برامج اللغات' : 'Languages' }]}
        title={isAr ? 'دورات متخصصة في' : 'Specialized Courses in'}
        titleHighlight={isAr ? 'اللغات الأجنبية الحية' : 'World Foreign Languages'}
        description={
          isAr
            ? 'نقدم لكم برامج تدريبية متكاملة في أربع لغات عالمية رئيسية (الإنجليزية، الفرنسية، الإسبانية، الألمانية) تعتمد على المحادثة المستمرة، والتطبيق العملي، مع منح شهادة إتمام المستوى بالتعاون مع منظمة بريطانية.'
            : 'Comprehensive language training programs across 4 major world languages (English, French, Spanish, German) based on active speaking, practical drills, and accredited certification in collaboration with a British organization.'
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister('اللغة الإنجليزية (عرض 9000 دج)')}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isAr ? 'سجل في برنامج لغات (عرض 9000 دج)' : 'Enroll in Language Program (9000 DZD)'}</span>
            </button>
            <Link
              to="/programs"
              className="px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 transition-colors"
            >
              {isAr ? 'جدول المواعيد والرزنامة' : 'Schedule & Timetable'}
            </Link>
          </div>
        }
      />

      {/* Main Language Programs Component */}
      <LanguagePrograms onOpenRegister={onOpenRegister} />

      {/* Student Advancement & CEFR Levels Component */}
      <StudentAdvancementLevels onOpenRegister={onOpenRegister} />

      {/* Bottom Conversion Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-start">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>{isAr ? 'شهادة دولية معتمدة' : 'Accredited Certification'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
              {isAr ? 'جاهز للانطلاق واكتساب الطلاقة في لغتك المفضلة؟' : 'Ready to Achieve Fluency in Your Chosen Language?'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              {isAr
                ? 'استفد من عرض المستوى الكامل (9000 دج فقط) واختر الفرع الأقرب إليك للتسجيل.'
                : 'Take advantage of the full level offer (only 9000 DZD) and select your nearest branch to enroll.'}
            </p>
          </div>

          <button
            onClick={() => onOpenRegister()}
            className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm sm:text-base shrink-0 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            {t.common.registerNow}
          </button>
        </div>
      </section>
    </div>
  );
};
