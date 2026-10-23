import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { AcademyBooksSection } from '../components/AcademyBooksSection';
import { SocialMediaSection } from '../components/SocialMediaSection';
import { AcademyMottoBanner } from '../components/GoldenColorWavesCard';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { academyCampaign, ACADEMY_INFO, CAMPAIGN_MOTTO } from '../data/academyData';
import {
  Languages,
  GraduationCap,
  Calendar,
  Sparkles,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface HomePageProps {
  onOpenRegister: (program?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRegister }) => {
  const { isRtl, language, t } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'الرئيسية — طريقك نحو النجاح يبدأ من هنا',
    titleEn: 'Home — Your Pathway to Success Begins Here',
    descAr: 'الموقع الرسمي لأكاديمية Your Academy - تعليم اللغات الحية (الإنجليزية، الفرنسية، الإسبانية، الألمانية) والدعم المدرسي للأقسام النهائية في عين الدفلى، البليدة، خميس مليانة، والعطاف.',
    descEn: 'Official website of Your Academy - Foreign Languages and Academic Tutoring across Aïn Defla, Blida, Khemis Miliana, and El Attaf.',
  });

  const NextArrow = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Main Hero Section */}
      <Hero onOpenRegister={onOpenRegister} />

      {/* 2. Official Campaign Highlights & Academy Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent border border-amber-500/30 p-6 sm:p-10 shadow-lg relative overflow-hidden text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black shadow-sm font-sora">
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>{academyCampaign.registrationStatus} • {academyCampaign.academicYear}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
                {isAr ? 'أكاديمية تعليمية رائدة بمعايير دولية ومتابعة فردية' : 'A Leading Educational Academy with International Standards'}
              </h2>

              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
                {isAr
                  ? 'تسعى أكاديمية Your Academy إلى توفير بيئة تعليمية محفزة تركز على الطلاقة اللغوية، ودعم تلاميذ الأقسام النهائية (BAC & BEM) عبر نخبة من الأساتذة الشباب المتمكنين، مع شهادات معتمدة بالتعاون مع منظمة بريطانية.'
                  : 'Your Academy provides an inspiring learning environment focused on language fluency, BAC & BEM national exam tutoring with passionate instructors, and accredited certification in collaboration with a British organization.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-sora block">4</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-bold">{isAr ? 'فروع معتمدة' : 'Official Branches'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-sora block">4</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-bold">{isAr ? 'لغات حية' : 'World Languages'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-sora block">3000 / 9000</span>
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-bold block leading-tight">{isAr ? '3000 دج شهرياً • 9000 للمستوى' : '3000 /mo • 9000 Level'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-sora block">100%</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-bold">{isAr ? 'متابعة بيداغوجية' : 'Pedagogical Care'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Link
                to="/registration"
                className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm sm:text-base shadow-lg shadow-amber-500/20 text-center flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>{isAr ? 'استفد من عرض 9000 دج الآن' : 'Claim 9000 DZD Offer'}</span>
                <NextArrow className="w-4 h-4" />
              </Link>
              <Link
                to="/why-your-academy"
                className="w-full py-3.5 px-6 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 text-center flex items-center justify-center gap-2 transition-all"
              >
                <span>{isAr ? 'تعرف على ركائز وميزات الأكاديمية' : 'Explore Academy Pillars'}</span>
                <NextArrow className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>



      {/* 4. Academy Motto Banner (Solid #FFB900, No Waves, Exclusively on Homepage) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AcademyMottoBanner />
      </section>

      {/* 5. Dedicated Academy Books & Syllabi Section (Exact 3-col x 2-row layout) */}
      <AcademyBooksSection onOpenRegister={onOpenRegister} />

      {/* 5. Official Social Media Section (Facebook, Instagram, TikTok with confirmed branch links) */}
      <SocialMediaSection />

      {/* 8. Bottom Registration Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-amber-500 text-black p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-black text-amber-400 text-xs font-black uppercase font-sora">
              {CAMPAIGN_MOTTO.year}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isAr ? 'ابدأ رحلة نجاحك معنا اليوم!' : 'Begin Your Pathway to Success Today!'}
            </h2>
            <p className="text-sm sm:text-base font-medium opacity-90">
              {isAr
                ? 'التسجيلات مفتوحة في كافة الفروع (عين الدفلى، خميس مليانة، العطاف، والبليدة). الأماكن محدودة لضمان المتابعة الفردية.'
                : 'Registration is open across all branches. Places are intentionally limited to ensure personalized attention for every student.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/registration"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-black hover:bg-zinc-900 text-white font-black text-base shadow-xl active:scale-95 transition-transform"
            >
              {t.common.registerNow}
            </Link>
            <Link
              to="/branches-contact"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-zinc-100 text-black font-black text-base active:scale-95 transition-transform"
            >
              <span>{isAr ? 'الفروع والتواصل المباشر' : 'Branches & Direct Contact'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
