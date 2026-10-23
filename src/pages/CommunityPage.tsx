import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { HappyStudentsCounter } from '../components/HappyStudentsCounter';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { ACADEMY_INFO, academyCampaign } from '../data/academyData';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  Sparkles,
  HeartHandshake,
  GraduationCap,
  ShieldCheck,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Building2,
  Trophy,
} from 'lucide-react';

interface CommunityPageProps {
  onOpenRegister: (program?: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language } = useLanguage();
  const isAr = language === 'ar';
  const NextArrow = isRtl ? ChevronLeft : ChevronRight;

  usePageMeta({
    titleAr: 'مجتمع الناجحين — آلاف التلاميذ والطلبة في Your Academy',
    titleEn: 'Success Community — Thousands of Learners at Your Academy',
    descAr: 'تعرف على مجتمع الناجحين في أكاديمية Your Academy: إحصائيات موثقة، نسب نجاح البكالوريا وBEM، والشهادات الممنوحة عبر فروعنا بعين الدفلى، البليدة، وخميس مليانة.',
    descEn: 'Discover the Y Academy Success Community: documented metrics, BAC & BEM pass rates, and accredited certifications across Aïn Defla, Blida, Khemis Miliana, and El Attaf.',
  });

  const communityPillars = [
    {
      titleAr: 'متابعة فردية لكل تلميذ',
      titleEn: 'Personalized Mentorship',
      descAr: 'نحرص على مرافقة كل متعلم وتحديد نقاط القوة لديه مع معالجة الصعوبات خطوة بخطوة لضمان التطور الحقيقي.',
      descEn: 'Individual guidance identifying each learner’s strengths and steadily addressing academic gaps.',
      icon: Users,
    },
    {
      titleAr: 'طرق حديثة في الشرح والتدريب',
      titleEn: 'Modern Interactive Methods',
      descAr: 'استخدام الوسائل التفاعلية والتقنيات العصرية لتبسيط المفاهيم وجعل التعلم ممتعاً وتطبيقياً بعيداً عن التلقين.',
      descEn: 'Interactive tools and active learning environments making education engaging and hands-on.',
      icon: Sparkles,
    },
    {
      titleAr: 'شهادات معتمدة مع منظمة بريطانية',
      titleEn: 'Accredited British Certification',
      descAr: 'شهادات كفاءة لغوية معترف بها تسلم بعد إتمام مستويات التكوين بنجاح وفق الإطار الأوروبي المشترك CEFR.',
      descEn: 'Recognized language competency certificates delivered upon course completion aligned with CEFR standards.',
      icon: Award,
    },
    {
      titleAr: 'أساتذة شباب قريبون من اهتمامات التلاميذ',
      titleEn: 'Passionate Skilled Faculty',
      descAr: 'طاقة إيجابية وأسلوب تواصل مرن يكسر حاجز الخوف والتردد ويحفز المتعلم على المشاركة الدائمة.',
      descEn: 'Dynamic teaching style that breaks barriers and encourages active participation and confidence.',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Page Header */}
      <PageHeader
        badge={isAr ? 'مجتمع تعليمي طموح يجمع آلاف الناجحين' : 'An Ambitious Community of Thousands'}
        badgeIcon={<Trophy className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'مجتمع الناجحين' : 'Y Academy Community' }]}
        title={isAr ? 'مجتمع الناجحين وأثرنا التعليمي في' : 'The Success Community of'}
        titleHighlight="YOUR ACADEMY"
        description={
          isAr
            ? 'نفتخر بمرافقة آلاف التلاميذ والطلبة سنوياً نحو التميز الأكاديمي والطلاقة اللغوية عبر فروعنا الرسمية. تصفح الإحصائيات الحقيقية، نسب التفوق، وأبرز محطات النجاح.'
            : 'We take pride in guiding thousands of students yearly toward academic excellence and linguistic fluency across all campuses. Explore real metrics, pass rates, and milestones.'
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isAr ? 'انضم إلى مجتمع الناجحين' : 'Join Our Community'}</span>
            </button>
            <Link
              to="/testimonials"
              className="px-5 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 transition-colors flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{isAr ? 'قصص النجاح وتجارب طلابنا' : 'Student Success Stories'}</span>
            </Link>
          </div>
        }
      />

      {/* 2. Main Interactive Relocated HappyStudentsCounter Component */}
      <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <HappyStudentsCounter onOpenRegister={onOpenRegister} />
      </div>

      {/* 3. Core Community Values & Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-start space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'ركائز التفوق في Your Academy' : 'Our Foundations of Excellence'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
            {isAr ? 'لماذا يختار التلاميذ مجتمعنا التعليمي؟' : 'Why Learners Choose Our Community'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {isAr
              ? 'نبني بيئة تعليمية تجمع بين الجدية والتحفيز لضمان تحقيق كل طالب لأهدافه التعليمية بأفضل النتائج.'
              : 'We foster an educational environment combining academic rigor with inspiration so every student achieves their fullest potential.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {communityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.titleAr}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 text-start shadow-sm hover:border-amber-400 transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-black text-zinc-950 dark:text-white">
                  {isAr ? pillar.titleAr : pillar.titleEn}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {isAr ? pillar.descAr : pillar.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Branches & Campuses Connection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-start">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black shadow-xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isAr ? '4 فروع معتمدة' : '4 Official Campuses'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
              {isAr ? 'أبواب الأكاديمية مفتوحة لكم في كافة الفروع' : 'Our Campuses Welcome You Across All Regions'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {isAr
                ? 'عين الدفلى (المقر الرئيسي)، البليدة، خميس مليانة، والعطاف. اختر الفرع الأقرب وسجل اليوم!'
                : 'Aïn Defla (Main HQ), Blida, Khemis Miliana, and El Attaf. Choose your nearest branch and enroll today!'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/branches-contact"
              className="flex-1 md:flex-none px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs sm:text-sm text-center shadow-md transition-all"
            >
              {isAr ? 'الفروع والتواصل' : 'Branches & Contact'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
