import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PillarsSection } from '../components/PillarsSection';
import { HappyStudentsCounter } from '../components/HappyStudentsCounter';
import { Testimonials } from '../components/Testimonials';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { Award, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WhyUsPageProps {
  onOpenRegister: (program?: string) => void;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language, t } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'لماذا Your Academy؟ — ركائز التميز البيداغوجي والشهادات المعتمدة',
    titleEn: 'Why Choose Your Academy — Pillars of Pedagogical Excellence',
    descAr: 'اكتشف ركائز التميز في أكاديمية Your Academy: متابعة فردية، أساتذة شباب متمكنين، طرق حديثة في الشرح، وشهادة معتمدة بالتعاون مع منظمة بريطانية.',
    descEn: 'Discover why students choose Your Academy: personalized follow-up, energetic skilled teachers, modern pedagogy, and British organization accredited certificates.',
  });

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Page Header */}
      <PageHeader
        badge={isAr ? 'ركائز التميز والتفوق' : 'Pillars of Excellence'}
        badgeIcon={<Award className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'لماذا Your Academy؟' : 'Why Your Academy' }]}
        title={isAr ? 'لماذا يختار الطلاب والأولياء' : 'Why Students & Parents Choose'}
        titleHighlight="YOUR ACADEMY"
        description={
          isAr
            ? 'نجمع بين الشغف بالتعليم، وأحدث الوسائل التفاعلية، والكفاءات البيداغوجية الشابة لصناعة تجربة تعلم فريدة تضمن التطور الحقيقي لكل طالب.'
            : 'Combining educational passion, modern interactive tools, and skilled young mentors to create an exceptional learning journey ensuring tangible progress.'
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isAr ? 'انضم إلى عائلة Your Academy' : 'Join Your Academy Family'}</span>
            </button>
            <Link
              to="/locations"
              className="px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 transition-colors"
            >
              {isAr ? 'زيارة أقرب فرع' : 'Visit Nearest Branch'}
            </Link>
          </div>
        }
      />

      {/* Core Pedagogical Pillars Component */}
      <PillarsSection />

      {/* British Accreditation Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 text-white border-2 border-amber-500/40 relative overflow-hidden shadow-2xl text-start">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-black">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'شهادة معتمدة دولياً' : 'Internationally Accredited'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                {isAr ? 'شهادة نهاية المستوى بالتعاون مع منظمة بريطانية' : 'End-of-Level Certificate with British Partner Organization'}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {isAr
                  ? 'يتوج جهد المتدرب بعد إتمام متطلبات المستوى بنجاح بالحصول على شهادة رسمية صادرة بالتعاون مع منظمة بريطانية، تعزز ملفك الشخصي والأكاديمي وتفتح آفاقاً مهنية ودراسية واعدة.'
                  : 'Upon successful completion of the course requirements, scholars receive an official certificate issued in collaboration with a British partner organization, enhancing their academic and professional portfolio.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{isAr ? 'معترف بها وموثقة' : 'Recognized & Verified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{isAr ? 'متوافقة مع الإطار الأوروبي CEFR' : 'Aligned with CEFR Framework'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-44 h-44 rounded-full border-4 border-amber-400/50 bg-amber-500/10 flex flex-col items-center justify-center p-4 text-center shadow-inner">
                <Award className="w-14 h-14 text-amber-400 mb-1" />
                <span className="text-xs font-black text-amber-300 font-sora">BRITISH ACCREDITATION</span>
                <span className="text-[10px] text-zinc-400">PARTNER CERTIFICATION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Students Statistics Counter */}
      <HappyStudentsCounter onOpenRegister={onOpenRegister} />

      {/* Student Testimonials */}
      <Testimonials onOpenRegister={onOpenRegister} />

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-amber-500 text-black flex flex-col sm:flex-row items-center justify-between gap-6 text-start">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'اختبر تجربة التعليم المتميز مع Your Academy' : 'Experience Excellence with Your Academy'}
            </h3>
            <p className="text-sm font-medium opacity-90">
              {isAr
                ? 'فريقنا مستعد للإجابة عن كافة استفساراتكم ومرافقتكم نحو التفوق.'
                : 'Our pedagogical team is ready to assist you on your journey to mastery.'}
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
