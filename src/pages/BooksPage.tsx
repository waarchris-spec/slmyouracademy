import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { AcademyBooksSection } from '../components/AcademyBooksSection';
import { BookOpen, Sparkles, CheckCircle2, ShieldCheck, Download, Award, Clock } from 'lucide-react';
import { academyCampaign } from '../data/academyData';

interface BooksPageProps {
  onOpenRegister: (program?: string) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'مناهج وكتب الأكاديمية — إصدارات بيداغوجية حصرية 2026/2027',
    titleEn: 'Academy Books & Curriculum — Exclusive Pedagogical Editions',
    descAr: 'استكشف الحقائب البيداغوجية والكتب الرسمية لأكاديمية Your Academy في اللغات الحية (الإنجليزية، الفرنسية، الإسبانية، الألمانية) والدعم المدرسي للأقسام النهائية.',
    descEn: 'Explore official textbooks and pedagogical syllabi from Your Academy for world languages and national exam tutoring.',
  });

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Page Header */}
      <PageHeader
        badge={isAr ? 'المناهج الرسمية والكتب الحصرية' : 'Official Coursebooks & Syllabi'}
        badgeIcon={<BookOpen className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'المناهج والكتب' : 'Coursebooks' }]}
        title={isAr ? 'مناهج وكتب' : 'Academy Coursebooks &'}
        titleHighlight={isAr ? 'الأكاديمية المعتمدة' : 'Official Curriculum'}
        description={
          isAr
            ? 'سلسلة الكتب البيداغوجية الرسمية المعتمدة في كافة فروع Your Academy (عين الدفلى، البليدة، خميس مليانة، والعطاف). حقائب دراسية متكاملة تركز على النطق السليم، الطلاقة الحية، وتحقيق أعلى النتائج في شهادات BAC وBEM.'
            : 'Our official textbook collection across Aïn Defla, Blida, Khemis Miliana, and El Attaf branches, structured for spoken fluency and national exam distinction.'
        }
      />

      {/* Main 6 Books Section */}
      <AcademyBooksSection onOpenRegister={onOpenRegister} />

      {/* Curriculum Quality & Accreditation Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-black">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAr ? 'معايير الجودة والتأليف البيداغوجي' : 'Pedagogical Quality Standards'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                {isAr
                  ? 'لماذا تتميز مناهج Your Academy عن الكتب التجارية؟'
                  : 'Why Your Academy Coursebooks Outperform Standard Manuals?'}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {isAr
                  ? 'تم تأليف هذه المناهج وإعدادها دورياً من طرف نخبة أساتذة الأكاديمية المتمرسين لتناسب التلميذ الجزائري بدقة: معالجة الصعوبات الشائعة في النطق وتركيب الجمل، والتركيز على منهجية الإجابة النموذجية المعتمدة رسمياً في امتحانات البكالوريا والشهادات الدولية.'
                  : 'Authored and annually revised by Your Academy senior faculty to resolve common phonetics and composition hurdles, directly aligning with official Algerian exam standards and CEFR international benchmarks.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">{isAr ? 'نسخ أصلية عالية الجودة' : 'High-Quality Printed Editions'}</span>
                    <span className="text-zinc-500">{isAr ? 'طباعة ملونة فاخرة مع تمارين تطبيقية' : 'Full color with graded exercise sheets'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">{isAr ? 'مرفقة بملفات صوتية' : 'Audio Accompaniment'}</span>
                    <span className="text-zinc-500">{isAr ? 'تسجيلات استماع بلهجات أصلية' : 'Authentic listening files for listening drills'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">{isAr ? 'مجانياً لكل تلميذ مسجل' : 'Included in Tuition'}</span>
                    <span className="text-zinc-500">{isAr ? 'الحقيبة مشمولة ضمن عرض 9000 دج' : 'Included at zero extra surcharge'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">{isAr ? 'شهادة معتمدة دولياً' : 'Accredited Certification'}</span>
                    <span className="text-zinc-500">{isAr ? 'بالتعاون مع المنظمة البريطانية' : 'In partnership with British organization'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-3xl bg-amber-500 text-black space-y-4 shadow-xl">
              <span className="text-xs font-black uppercase tracking-wider font-sora block">
                {academyCampaign.academicYear}
              </span>
              <h4 className="text-xl sm:text-2xl font-black">
                {isAr ? 'احجز كتابك ومقعدك في الفوج القادم' : 'Reserve Your Book & Cohort Seat'}
              </h4>
              <p className="text-xs sm:text-sm font-semibold opacity-95">
                {isAr
                  ? 'الأفواج محدودة لـ 12 إلى 15 تلميذاً كحد أقصى لضمان تلقي كل متعلم الاهتمام البيداغوجي الكافي وحقيبته المطبوعة في اليوم الأول.'
                  : 'Cohorts are limited to 12-15 students to guarantee individual attention and hand you your coursebook on Day 1.'}
              </p>
              <button
                type="button"
                onClick={() => onOpenRegister('مناهج وكتب الأكاديمية')}
                className="w-full py-3.5 px-6 rounded-2xl bg-black hover:bg-zinc-900 text-white font-black text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {isAr ? 'سجل الآن عبر الموقع' : 'Register Now Online'}
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
