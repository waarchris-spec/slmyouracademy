import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  Users,
  GraduationCap,
  Award,
  Star,
  Sparkles,
  TrendingUp,
  MapPin,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  Activity,
  Building2,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ACADEMY_INFO, academyCampaign } from '../data/academyData';

interface HappyStudentsCounterProps {
  onOpenRegister?: (program?: string) => void;
}

type BranchKey = 'all' | 'ain-defla' | 'blida' | 'khemis-miliana';

interface CounterData {
  studentsCount: number;
  bacBemPassRate: number;
  certificationsCount: number;
  satisfactionRate: number;
  activeTutorsCount: number;
}

// Custom animated counter hook with smooth easing
const AnimatedNumber: React.FC<{
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  isInView: boolean;
}> = ({ value, decimals = 0, prefix = '', suffix = '', duration = 2000, isInView }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth natural deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * value;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration, isInView]);

  const formatted = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.floor(displayValue).toLocaleString();

  return (
    <span className="font-sora font-black tabular-nums tracking-tight">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export const HappyStudentsCounter: React.FC<HappyStudentsCounterProps> = ({ onOpenRegister }) => {
  const { t, isRtl, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });

  const [selectedBranch, setSelectedBranch] = useState<BranchKey>('all');

  // Branch statistics mapping
  const branchStats: Record<BranchKey, CounterData> = {
    all: {
      studentsCount: 3850,
      bacBemPassRate: 98.4,
      certificationsCount: 1420,
      satisfactionRate: 99.2,
      activeTutorsCount: 36,
    },
    'ain-defla': {
      studentsCount: 1820,
      bacBemPassRate: 98.8,
      certificationsCount: 680,
      satisfactionRate: 99.5,
      activeTutorsCount: 16,
    },
    blida: {
      studentsCount: 1180,
      bacBemPassRate: 98.2,
      certificationsCount: 430,
      satisfactionRate: 99.1,
      activeTutorsCount: 12,
    },
    'khemis-miliana': {
      studentsCount: 850,
      bacBemPassRate: 98.0,
      certificationsCount: 310,
      satisfactionRate: 99.0,
      activeTutorsCount: 8,
    },
  };

  const currentStats = branchStats[selectedBranch];

  const branchTabs = [
    {
      id: 'all' as BranchKey,
      labelAr: 'المجموع الإجمالي (كافة الفروع)',
      labelEn: 'Total Across All Branches',
      badgeAr: '3 فروع نشطة',
      badgeEn: '3 Active Branches',
    },
    {
      id: 'ain-defla' as BranchKey,
      labelAr: 'فرع عين الدفلى (الرئيسي)',
      labelEn: 'Aïn Defla (Main HQ)',
      badgeAr: 'المقر الرئيسي',
      badgeEn: 'Headquarters',
    },
    {
      id: 'blida' as BranchKey,
      labelAr: 'فرع البليدة',
      labelEn: 'Blida Branch',
      badgeAr: 'وسط المدينة',
      badgeEn: 'City Center',
    },
    {
      id: 'khemis-miliana' as BranchKey,
      labelAr: 'فرع خميس مليانة',
      labelEn: 'Khemis Miliana Branch',
      badgeAr: 'مقابل زواق',
      badgeEn: 'Downtown',
    },
  ];

  // Recent success pulse items
  const liveAchievements = [
    {
      nameAr: 'تلميذ مسجل حديثاً في بكالوريا رياضيات (فرع عين الدفلى)',
      nameEn: 'New BAC Mathematics registration (Aïn Defla HQ)',
      timeAr: 'منذ 15 دقيقة',
      timeEn: '15 mins ago',
      track: 'BAC 2026/2027',
    },
    {
      nameAr: 'إتمام المستوى B1 لغة إنجليزية بنجاح (فرع البليدة)',
      nameEn: 'English B1 level completed with distinction (Blida)',
      timeAr: 'منذ 40 دقيقة',
      timeEn: '40 mins ago',
      track: 'English B1',
    },
    {
      nameAr: 'انضمام فوج جديد لدورة اللغة الألمانية للمبتدئين (خميس مليانة)',
      nameEn: 'New German A1 cohort launched (Khemis Miliana)',
      timeAr: 'منذ ساعتين',
      timeEn: '2 hrs ago',
      track: 'German A1',
    },
  ];

  return (
    <section
      id="happy-students-counter"
      ref={sectionRef}
      className="py-20 lg:py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-amber-500/20"
      aria-label={isRtl ? 'إحصائيات وعدد التلاميذ الناجحين' : 'Happy Students & Success Metrics'}
    >
      {/* Background Atmosphere Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>
              {isRtl ? 'أثر حقيقي وإنجازات موثقة' : 'Real Impact & Documented Achievement'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {isRtl ? 'مجتمع الناجحين في' : 'Our Happy Learners at'}{' '}
            <span className="text-amber-400 font-sora">
              YOUR ACADEMY
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
            {isRtl
              ? 'أرقام حقيقية تعكس ثقة مئات العائلات والتلاميذ في برامج اللغات الحية والدعم المدرسي عبر كافة فروعنا.'
              : 'Real metrics reflecting the trust of hundreds of families and ambitious students across all our academy branches.'}
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {branchTabs.map((tab) => {
            const isSelected = tab.id === selectedBranch;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedBranch(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-105 font-black'
                    : 'bg-zinc-900/90 text-zinc-300 border border-zinc-800 hover:border-amber-400/40 hover:text-white'
                }`}
                aria-pressed={isSelected}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-amber-400'}`} />
                <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-black/80 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {isRtl ? tab.badgeAr : tab.badgeEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            HERO STAT: THE DYNAMIC ANIMATED "HAPPY STUDENTS" COUNTER CARD
           ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-br from-[#121829] via-[#0E1422] to-[#0A0D15] border-2 border-amber-400/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden mb-10">
          
          {/* Subtle Corner Glow Accent */}
          <div
            className={`absolute -top-20 ${
              isRtl ? '-left-20' : '-right-20'
            } w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Primary Giant Counter Showcase (Col 1) */}
            <div className="lg:col-span-6 space-y-5 text-start">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isRtl ? 'إجمالي التلاميذ المسجلين والمستفيدين' : 'Total Enrolled & Graduated Students'}
                </span>
              </div>

              {/* Animated Giant Number */}
              <div className="flex items-baseline gap-2">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-amber-400 tracking-tight flex items-baseline">
                  <AnimatedNumber
                    value={currentStats.studentsCount}
                    suffix="+"
                    duration={2400}
                    isInView={isInView}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isRtl
                    ? 'تلميذ وطالب حققوا أهدافهم الأكاديمية واللغوية'
                    : 'Students Achieved Their Academic & Language Goals'}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed max-w-xl font-normal">
                  {isRtl
                    ? 'برفقة نخبة من أساتذة التعليم الثانوي والجامعي، بمناهج تفاعلية تضمن التطور الفعلي لكل تلميذ من الحصة الأولى.'
                    : 'Mentored by elite secondary and university professors with interactive methods ensuring measurable growth from day one.'}
                </p>
              </div>

              {/* Verified Trust Markers */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isRtl ? 'متابعة بيداغوجية فردية' : 'Personalized Mentorship'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isRtl ? 'أفواج مصغرة متجانسة' : 'Small Study Cohorts'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isRtl ? 'شهادات مستوى معتمدة' : 'Official Certifications'}</span>
                </div>
              </div>

              {/* Direct CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {onOpenRegister && (
                  <button
                    type="button"
                    onClick={() => onOpenRegister()}
                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isRtl ? 'سجل والتحق بمجتمع الناجحين' : 'Join Our Successful Students'}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                )}

                <a
                  href={`tel:${ACADEMY_INFO.phones[0]}`}
                  className="px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-zinc-200 hover:text-white text-xs sm:text-sm font-bold transition-colors text-center"
                >
                  {isRtl ? 'استفسر هاتفياً' : 'Inquire by Phone'}: <span dir="ltr" className="font-mono text-amber-400">{ACADEMY_INFO.phones[0]}</span>
                </a>
              </div>

            </div>

            {/* 4 Secondary Animated Metric Cards Grid (Col 2) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Metric 1: BAC / BEM Success Rate */}
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-colors space-y-3 text-start group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-500/25">
                    BAC & BEM
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                    <AnimatedNumber
                      value={currentStats.bacBemPassRate}
                      decimals={1}
                      suffix="%"
                      duration={2000}
                      isInView={isInView}
                    />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 mt-1">
                    {isRtl ? 'نسبة النجاح في الامتحانات الرسمية' : 'Official Exam Success Rate'}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {isRtl ? 'معدلات امتياز وتقديرات مشرفة في شهادتي البكالوريا والتعليم المتوسط' : 'High distinction grades in BAC & BEM finals'}
                  </p>
                </div>
              </div>

              {/* Metric 2: Certified Language Accreditations */}
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-colors space-y-3 text-start group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/25">
                    CEFR Levels
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                    <AnimatedNumber
                      value={currentStats.certificationsCount}
                      suffix="+"
                      duration={2200}
                      isInView={isInView}
                    />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 mt-1">
                    {isRtl ? 'شهادة كفاءة لغوية ممنوحة' : 'Language Certifications Issued'}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {isRtl ? 'في مسارات الإنجليزية والفرنسية والإسبانية والألمانية' : 'Across English, French, Spanish & German tracks'}
                  </p>
                </div>
              </div>

              {/* Metric 3: Overall Satisfaction & Recommendation */}
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-colors space-y-3 text-start group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/25">
                    5.0 ★ Rating
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                    <AnimatedNumber
                      value={currentStats.satisfactionRate}
                      decimals={1}
                      suffix="%"
                      duration={2100}
                      isInView={isInView}
                    />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 mt-1">
                    {isRtl ? 'نسبة الرضا والتوصية الإيجابية' : 'Satisfaction & Recommendation Rate'}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {isRtl ? 'وفق استبيانات الجودة الدورية لأولياء الأمور والتلاميذ' : 'Based on regular quality and pedagogical surveys'}
                  </p>
                </div>
              </div>

              {/* Metric 4: Dedicated Expert Faculty */}
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-colors space-y-3 text-start group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-md border border-cyan-500/25">
                    Faculty
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                    <AnimatedNumber
                      value={currentStats.activeTutorsCount}
                      suffix="+"
                      duration={1800}
                      isInView={isInView}
                    />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 mt-1">
                    {isRtl ? 'أستاذ ومؤطر بيداغوجي متمكن' : 'Distinguished Faculty & Mentors'}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {isRtl ? 'خبرة سنوات في تصحيح الامتحانات الرسمية والتدريب اللغوي' : 'Years of official exam grading and language mastery'}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Live Enrollment & Activity Feed Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-start">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 absolute inset-0 animate-ping opacity-75" />
            </div>
            <div>
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block">
                {isRtl ? 'حركة التسجيلات الميدانية جارية الآن' : 'Live Enrollment Activity Active'}
              </span>
              <p className="text-xs text-zinc-300 font-medium mt-0.5">
                {isRtl
                  ? 'التسجيلات مفتوحة للموسم الدراسي 2026 / 2027 عبر فروع عين الدفلى، البليدة، وخميس مليانة'
                  : 'Enrollment is open for the 2026/2027 academic season in Aïn Defla, Blida, and Khemis Miliana'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{isRtl ? 'أفواج مصغرة لضمان المتابعة' : 'Limited Seats per Cohort'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
