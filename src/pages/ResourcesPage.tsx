import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { academyCampaign, ACADEMY_INFO } from '../data/academyData';
import { Link } from 'react-router-dom';
import {
  Languages,
  GraduationCap,
  Calendar,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  Award,
  ArrowRight,
  ArrowLeft,
  FileText,
  HelpCircle,
  Phone,
} from 'lucide-react';

interface ResourcesPageProps {
  onOpenRegister: (program?: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language } = useLanguage();
  const isAr = language === 'ar';
  const NextArrow = isRtl ? ChevronLeft : ChevronRight;

  usePageMeta({
    titleAr: 'الموارد الأكاديمية واللغوية — أكاديمية Your Academy',
    titleEn: 'Academic & Language Resources — Your Academy',
    descAr: 'دليل شامل لكافة الموارد والمسارات التعليمية في Your Academy: برامج اللغات الحية، الدعم المدرسي للأقسام النهائية (BAC & BEM)، والرزنامة السنوية.',
    descEn: 'Comprehensive guide to academic tracks and learning resources at Your Academy: world language programs, BAC & BEM national exam tutoring, and annual calendar.',
  });

  const languageTracks = [
    { name: 'English (الإنجليزية)', descAr: 'طلاقة نطق ومحادثة تطبيقية بمستويات CEFR الدولية', descEn: 'Fluency and conversational mastery with CEFR framework', flag: '🇬🇧' },
    { name: 'Français (الفرنسية)', descAr: 'دعم التواصل الشفوي والكتابي وإتقان قواعد اللغة', descEn: 'Oral and written communication support with grammar mastery', flag: '🇫🇷' },
    { name: 'Español (الإسبانية)', descAr: 'تعلم سريع من الصفر حتى المحادثة بأساليب عصرية', descEn: 'Fast-track Spanish from scratch to conversation', flag: '🇪🇸' },
    { name: 'Deutsch (الألمانية)', descAr: 'برامج للمبتدئين والمتوسطين مع التركيز على الدراسة والسفر', descEn: 'German for beginners and study/travel preparation', flag: '🇩🇪' },
  ];

  const academicTracks = [
    { nameAr: 'دعم البكالوريا (BAC)', nameEn: 'BAC Exam Prep', descAr: 'مرافقة نوعية لجميع الشعب (علوم، رياضيات، تقني، لغات، تسيير، آداب)', descEn: 'Tutoring for all streams with focus on official exam methodology' },
    { nameAr: 'دعم شهادة BEM', nameEn: 'BEM Exam Prep', descAr: 'تثبيت الأساسيات وحل نماذج الامتحانات الرسمية دون توتر', descEn: 'Core fundamentals and past exam paper drill sessions' },
    { nameAr: 'تحسين المستوى العام', nameEn: 'Level Boost', descAr: 'معالجة النقائص البيداغوجية في المواد الأساسية على مدار السنة', descEn: 'Addressing learning gaps in primary subjects year-round' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Page Header */}
      <PageHeader
        badge={isAr ? 'الدليل التعليمي الشامل' : 'Comprehensive Learning Guide'}
        badgeIcon={<Layers className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'الموارد الأكاديمية واللغوية' : 'Academic Resources' }]}
        title={isAr ? 'كل ما تحتاجه للارتقاء بمستواك' : 'Everything You Need to Elevate Your'}
        titleHighlight={isAr ? 'الأكاديمي واللغوي' : 'Academic & Language Potential'}
        description={
          isAr
            ? 'دليل البرامج والمناهج المتخصصة في Your Academy. تصفح تفاصيل مسارات اللغات الأجنبية الحية، برامج الدعم المدرسي للأقسام النهائية، والرزنامة الأكاديمية المعتمدة.'
            : 'Explore specialized programs, curricula, and learning resources at Your Academy across all branches. Discover modern world languages, exam prep tracks, and academic calendars.'
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isAr ? 'سجل في أحد البرامج الآن' : 'Enroll in a Program Now'}</span>
            </button>
            <Link
              to="/books"
              className="px-5 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>{isAr ? 'تصفح كتب ومناهج الأكاديمية' : 'View Academy Books'}</span>
            </Link>
          </div>
        }
      />

      {/* 2. Core Relocated 3 Program Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-start space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'المسارات الأكاديمية واللغوية الرئيسية' : 'Primary Educational Pathways'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
            {isAr ? 'ثلاثة مسارات متكاملة لبناء مستقبلك' : 'Three Integrated Pathways for Your Future'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {isAr
              ? 'صممت مناهج Your Academy لتمنح المتعلم تجربة تطبيقية تجمع بين طلاقة التعبير في اللغات الأجنبية، والتفوق المنهجي في امتحانات شهادتي البكالوريا والتعليم المتوسط.'
              : 'Our curriculum is designed to combine spoken foreign language fluency with systematic excellence in official national examinations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Foreign Language Programs */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border-2 border-amber-500/40 hover:border-amber-400 transition-all flex flex-col justify-between shadow-lg text-start group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                <Languages className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider font-sora block">
                  {isAr ? 'الإنجليزية • الفرنسية • الإسبانية • الألمانية' : 'English • French • Spanish • German'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight mt-1">
                  {isAr ? 'برامج اللغات الأجنبية' : 'Foreign Language Programs'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {isAr
                  ? 'برامج تطبيقية مكثفة تركز على المحادثة السليمة واكتساب الطلاقة، بشهادة معتمدة بالتعاون مع منظمة بريطانية، وبعرض خاص 9000 دج فقط للمستوى.'
                  : 'Practical language training focusing on real-world spoken fluency, with accredited certification and 9000 DZD seasonal pricing per level.'}
              </p>
              
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="font-bold text-zinc-900 dark:text-white flex items-center justify-between">
                  <span>{isAr ? 'عرض المستوى الكامل:' : 'Full Level Offer:'}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-black">{academyCampaign.offer}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['English', 'Français', 'Español', 'Deutsch'].map((lang) => (
                    <span key={lang} className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 font-sora">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/languages"
                className="w-full py-3.5 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
              >
                <span>{isAr ? 'استكشف برامج اللغات بالتفصيل' : 'Explore Language Programs'}</span>
                <NextArrow className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Academic Support Preview */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border-2 border-zinc-200 dark:border-zinc-800 hover:border-amber-400 transition-all flex flex-col justify-between shadow-lg text-start group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider font-sora block">
                  BAC • BEM • {isAr ? 'تحسين المستوى' : 'Level Boost'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight mt-1">
                  {isAr ? 'الدعم المدرسي للأقسام النهائية' : 'Academic Support & Exam Prep'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {isAr
                  ? 'مرافقة بيداغوجية ونفسية دقيقة لشهادات البكالوريا والتعليم المتوسط مع أساتذة شباب متمكنين، تركّز على منهجية الإجابة وحل المواضيع النموذجية.'
                  : 'Comprehensive pedagogical tutoring for BAC and BEM official exam candidates, focusing on exam methodologies and prior test paper mastery.'}
              </p>
              
              <div className="space-y-2 pt-1 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{isAr ? 'أفواج مصغرة ومتابعة فردية مستمرة' : 'Small cohorts with individualized care'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{isAr ? 'أساتذة شباب ذوو كفاءة عالية وخبرة تصحيح' : 'Energetic, skilled official graders'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{isAr ? 'حل مواضيع بكالوريات تجريبية وسلاسل نموذجية' : 'Full mock exams & model solutions'}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/academic-support"
                className="w-full py-3.5 px-5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-950 dark:text-white font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>{isAr ? 'استكشف برامج الدعم المدرسي' : 'Explore Academic Support'}</span>
                <NextArrow className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Programs & Calendar Preview */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border-2 border-zinc-200 dark:border-zinc-800 hover:border-amber-400 transition-all flex flex-col justify-between shadow-lg text-start group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                <Calendar className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider font-sora block">
                  {academyCampaign.academicYear} • {isAr ? 'الرزنامة والتوقيت' : 'Schedules & Timetable'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight mt-1">
                  {isAr ? 'برامجنا والرزنامة السنوية' : 'Programs & Academic Calendar'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {isAr
                  ? 'تعرف على محطات الموسم الدراسي 2026/2027، جداول الأفواج المسائية ونهاية الأسبوع، المخيمات الشتوية المكثفة، وحفل تسليم الشهادات.'
                  : 'Track the 2026/2027 season milestones, evening & weekend schedules, winter language intensives, and certification graduation ceremonies.'}
              </p>
              
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 font-bold space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{academyCampaign.startDateArFull}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-normal">
                  <span>{isAr ? 'أفواج مسائية، عطل نهاية الأسبوع ومكثفة' : 'Evening, weekend and intensive formats'}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/programs"
                className="w-full py-3.5 px-5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-950 dark:text-white font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>{isAr ? 'عرض الرزنامة والأفواج' : 'View Calendar & Cohorts'}</span>
                <NextArrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Language Levels & CEFR Framework Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 space-y-6 text-start">
          <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
              {isAr ? 'مستويات اللغات الأجنبية المعتمدة في الأكاديمية' : 'Certified CEFR Language Proficiency Levels'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {isAr
              ? 'تعتمد Your Academy المعايير الدولية للإطار الأوروبي المرجعي المشترك للغات (CEFR)، مما يضمن للمتعلم ارتقاءً منهجياً معترفاً به عالمياً.'
              : 'Our courses strictly align with the Common European Framework of Reference for Languages (CEFR), ensuring recognized progression from beginner to advanced fluency.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {languageTracks.map((item) => (
              <div key={item.name} className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.flag}</span>
                  <span className="font-extrabold text-sm text-zinc-950 dark:text-white font-sora">{item.name}</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Academy Books & Curricula Shortcut */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-amber-500 text-black p-8 sm:p-12 text-start flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-amber-400 text-xs font-black uppercase font-sora">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'كتب حصرية ومناهج معتمدة' : 'Exclusive Curricula & Textbooks'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isAr ? 'تصفح كتب الأكاديمية والمناهج الدراسية' : 'Browse Official Academy Books & Syllabi'}
            </h3>
            <p className="text-sm font-medium opacity-90 leading-relaxed">
              {isAr
                ? 'توفر الأكاديمية ستة كتب ومنهاج معتمدة تم إعدادها خصيصاً لمرافقة طلبتنا في كافة المستويات اللغوية والأكاديمية.'
                : 'Your Academy provides six comprehensive textbooks and syllabi tailored specifically for our language and tutoring students.'}
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              to="/books"
              className="w-full md:w-auto px-8 py-4 rounded-2xl bg-black hover:bg-zinc-900 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <span>{isAr ? 'عرض قسم الكتب المعتمدة' : 'View Academy Books'}</span>
              <NextArrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Direct Enrollment & Advice Contact Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-start">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">
              {isAr ? 'هل تحتاج إلى توجيه لاختيار المسار المناسب؟' : 'Need Guidance on Choosing the Right Track?'}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              {isAr
                ? 'فريق الاستقبال البيداغوجي رهن إشارتكم لتحديد مستواكم وتوجيهكم للمسار الملائم.'
                : 'Our academic reception team is ready to evaluate your level and advise you on the optimal path.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/branches-contact"
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs sm:text-sm text-center transition-all"
            >
              {isAr ? 'تواصل مع أقرب فرع' : 'Contact Nearest Branch'}
            </Link>
            <button
              onClick={() => onOpenRegister()}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs sm:text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 text-center transition-all cursor-pointer"
            >
              {isAr ? 'استمارة التسجيل' : 'Enrollment Form'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
