import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Users,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MessageSquare,
  Ear,
  FileText,
  PenTool,
  Check,
  TrendingUp,
  Compass,
  Milestone,
  Flame
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ACADEMY_INFO } from '../data/academyData';

interface StudentAdvancementLevelsProps {
  onOpenRegister: (program?: string) => void;
}

type LevelId = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
type LanguageTrack = 'en' | 'fr' | 'es' | 'de';
type TimeframeTab = '3m' | '6m' | '1y';

interface LevelInfo {
  id: LevelId;
  percent: number;
  stageNumber: string;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
  cefrTitleAr: string;
  cefrTitleEn: string;
  summaryAr: string;
  summaryEn: string;
  vocabularyScale: string;
  examBenchmark: string;
  hoursNoteAr: string;
  hoursNoteEn: string;
  bacRelevanceAr: string;
  bacRelevanceEn: string;
  competencies: {
    icon: 'speaking' | 'listening' | 'reading' | 'writing';
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
  }[];
  keyMilestonesAr: string[];
  keyMilestonesEn: string[];
  recommendedDurationAr: string;
  recommendedDurationEn: string;
}

export const StudentAdvancementLevels: React.FC<StudentAdvancementLevelsProps> = ({
  onOpenRegister,
}) => {
  const { t, isRtl, language } = useLanguage();
  const componentId = useId();

  const [selectedLanguageTrack, setSelectedLanguageTrack] = useState<LanguageTrack>('en');
  const [activeLevel, setActiveLevel] = useState<LevelId>('A1');
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeTab>('6m');

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{
    speaking: number;
    comprehension: number;
    goal: number;
  }>({
    speaking: 1,
    comprehension: 1,
    goal: 1,
  });
  const [quizResultLevel, setQuizResultLevel] = useState<LevelId | null>(null);

  const languageTracks = [
    {
      id: 'en' as LanguageTrack,
      nameAr: 'اللغة الإنجليزية',
      nameEn: 'English Language',
      code: 'ENG',
      flag: '🇬🇧',
      examSuite: 'Cambridge / IELTS / BAC',
      accentColor: 'from-amber-500 to-yellow-400',
    },
    {
      id: 'fr' as LanguageTrack,
      nameAr: 'اللغة الفرنسية',
      nameEn: 'French Language',
      code: 'FRA',
      examSuite: 'DELF / DALF / TCF / BAC',
      accentColor: 'from-blue-500 to-cyan-400',
    },
    {
      id: 'es' as LanguageTrack,
      nameAr: 'اللغة الإسبانية',
      nameEn: 'Spanish Language',
      code: 'ESP',
      examSuite: 'DELE / SIELE / BAC',
      accentColor: 'from-rose-500 to-amber-400',
    },
    {
      id: 'de' as LanguageTrack,
      nameAr: 'اللغة الألمانية',
      nameEn: 'German Language',
      code: 'DEU',
      examSuite: 'Goethe-Zertifikat / TestDaF',
      accentColor: 'from-amber-600 to-red-500',
    },
  ];

  const levelsData: Record<LevelId, LevelInfo> = {
    A1: {
      id: 'A1',
      stageNumber: '01',
      percent: 20,
      titleAr: 'المستوى A1: التأسيس والانطلاق الأولي',
      titleEn: 'Level A1: Beginner Foundations',
      badgeAr: 'مبتدئ • Breakthrough',
      badgeEn: 'Beginner • Breakthrough',
      cefrTitleAr: 'المرحلة التأسيسية الأولى (A1)',
      cefrTitleEn: 'CEFR Foundation Stage (A1)',
      vocabularyScale: '600+ كلمة وتركيب',
      examBenchmark: 'A1 Starter / Cambridge Pre-A1',
      summaryAr:
        'بناء القاعدة اللغوية السليمة، اكتساب الأبجدية والنطق الصحيح، والقدرة على تقديم النفس والتعبير عن الاحتياجات الأساسية.',
      summaryEn:
        'Building core linguistic foundations, correct pronunciation, personal introductions, and basic daily phrases.',
      hoursNoteAr: '40 - 45 ساعة تدريبية تطبيقية',
      hoursNoteEn: '40 - 45 Applied Training Hours',
      bacRelevanceAr: 'تثبيت قواعد الإعراب والتركيب للجمل البسيطة والتخلص من عقدة النطق',
      bacRelevanceEn: 'Consolidates basic grammar, sentence building & oral confidence',
      recommendedDurationAr: 'شهر ونصف إلى شهرين',
      recommendedDurationEn: '6 to 8 weeks',
      competencies: [
        {
          icon: 'speaking',
          titleAr: 'المحادثة والتحدث',
          titleEn: 'Speaking & Pronunciation',
          descAr: 'التعريف بالنفس والأسرة، إلقاء التحية، وطلب معلومات يومية مبسطة.',
          descEn: 'Introduce oneself, exchange greetings, and ask basic daily questions.',
        },
        {
          icon: 'listening',
          titleAr: 'الاستماع والفهم',
          titleEn: 'Listening Comprehension',
          descAr: 'فهم العبارات والكلمات المألوفة عندما يتحدث الآخرون ببطء ووضوح.',
          descEn: 'Understand familiar words and basic phrases spoken slowly and clearly.',
        },
        {
          icon: 'reading',
          titleAr: 'القراءة والاستيعاب',
          titleEn: 'Reading & Vocabulary',
          descAr: 'قراءة اللافتات والملصقات البسيطة والأسماء في القوائم والوثائق القصيرة.',
          descEn: 'Read simple notices, posters, signs, and short informational texts.',
        },
        {
          icon: 'writing',
          titleAr: 'الكتابة والصياغة',
          titleEn: 'Writing & Construction',
          descAr: 'ملء الاستمارات القصيرة، وكتابة بطاقات بريدية وجمل وصفية بسيطة.',
          descEn: 'Fill out basic forms and write short, simple personal notes.',
        },
      ],
      keyMilestonesAr: [
        'إتقان نطق الأصوات ومخارج الحروف بدقة',
        'مخزون لغوي يتجاوز 600 كلمة من المفردات الحياتية',
        'القدرة على تكوين جمل سليمة في الحاضر والماضي البسيط',
        'تخطي حاجز الخوف والتردد في النطق أمام الفوج',
      ],
      keyMilestonesEn: [
        'Master standard pronunciation and phonetic basics',
        'Active vocabulary exceeding 600 everyday words',
        'Construct correct simple sentences in present and past',
        'Overcome speaking anxiety through conversational drills',
      ],
    },
    A2: {
      id: 'A2',
      stageNumber: '02',
      percent: 40,
      titleAr: 'المستوى A2: التواصل الأولي والتعامل اليومي',
      titleEn: 'Level A2: Elementary Communication',
      badgeAr: 'تمهيدي • Waystage',
      badgeEn: 'Elementary • Waystage',
      cefrTitleAr: 'المرحلة التمهيدية المستقلة (A2)',
      cefrTitleEn: 'CEFR Elementary Stage (A2)',
      vocabularyScale: '1,500+ كلمة وعبارة',
      examBenchmark: 'Cambridge A2 Key (KET) / DELF A2',
      summaryAr:
        'التفاعل في المواقف الحياتية المعتادة كالتسوق، السفر، والدراسة، مع القدرة على وصف التجارب والأحداث الماضية بسلاسة.',
      summaryEn:
        'Handling routine interactions like shopping, traveling, and studies, with the ability to describe past events easily.',
      hoursNoteAr: '50 - 60 ساعة تدريبية تطبيقية',
      hoursNoteEn: '50 - 60 Applied Training Hours',
      bacRelevanceAr: 'فهم أسئلة النصوص والفقرات الوصفية في امتحانات BEM والطور الثانوي',
      bacRelevanceEn: 'Direct text comprehension for BEM & secondary school exams',
      recommendedDurationAr: 'شهرين إلى شهرين ونصف',
      recommendedDurationEn: '8 to 10 weeks',
      competencies: [
        {
          icon: 'speaking',
          titleAr: 'المحادثة والتفاعل',
          titleEn: 'Speaking & Interaction',
          descAr: 'إجراء محادثات روتينية في الأماكن العامة، السفر، ووصف الروتين اليومي.',
          descEn: 'Hold routine conversations in public settings, travel, and daily routines.',
        },
        {
          icon: 'listening',
          titleAr: 'الاستماع والفهم',
          titleEn: 'Listening Comprehension',
          descAr: 'استيعاب النقاط الرئيسية في الرسائل الصوتية والإعلانات اليومية.',
          descEn: 'Grasp the main points in short, clear voice messages and announcements.',
        },
        {
          icon: 'reading',
          titleAr: 'القراءة وتحليل النصوص',
          titleEn: 'Reading & Text Analysis',
          descAr: 'قراءة النصوص القصيرة كالقوائم والرسائل والقصص الموجهة للمتعلمين.',
          descEn: 'Read short texts, menus, advertisements, and graded readers.',
        },
        {
          icon: 'writing',
          titleAr: 'الكتابة والتعبير',
          titleEn: 'Writing & Expression',
          descAr: 'كتابة فقرات مترابطة لوصف عطلة أو تجربة أو رسالة شكر وإخبار.',
          descEn: 'Write connected paragraphs describing personal experiences or events.',
        },
      ],
      keyMilestonesAr: [
        'مخزون لغوي يتجاوز 1,500 كلمة وعبارة اصطلاحية',
        'استخدام الأزمنة المركبة وروابط الجمل الوصفية',
        'إتقان التواصل في المطاعم، الفنادق والمحلات التجارية',
        'استيعاب الحوارات الشفهية بسرعة نطق متوسطة',
      ],
      keyMilestonesEn: [
        'Vocabulary exceeding 1,500 words and idioms',
        'Utilize compound tenses and descriptive linkers',
        'Fluent interaction in restaurants, travel, and stores',
        'Follow spoken conversations at moderate speed',
      ],
    },
    B1: {
      id: 'B1',
      stageNumber: '03',
      percent: 60,
      titleAr: 'المستوى B1: الاستقلالية والتحضير المعمق للبكالوريا',
      titleEn: 'Level B1: Intermediate & BAC Independence',
      badgeAr: 'متوسط • Threshold',
      badgeEn: 'Intermediate • Threshold',
      cefrTitleAr: 'المرحلة المتوسطة المستقلة (B1)',
      cefrTitleEn: 'CEFR Intermediate Stage (B1)',
      vocabularyScale: '3,000+ كلمة وتعبير أكاديمي',
      examBenchmark: 'Cambridge B1 Preliminary (PET) / DELF B1 / IELTS 5.0',
      summaryAr:
        'الاستقلالية في التعبير والنقاش، صياغة الآراء المبررة، فهم البرامج والنصوص المتنوعة، والتفوق في مواضيع اللغات الأجنبية للبكالوريا.',
      summaryEn:
        'Autonomous expression and debate, justifying opinions, understanding complex media, and excelling in BAC foreign language exams.',
      hoursNoteAr: '65 - 75 ساعة تدريبية مكثفة',
      hoursNoteEn: '65 - 75 Intensive Training Hours',
      bacRelevanceAr: 'المستوى المثالي للحصول على العلامات الكاملة في البكالوريا (18-20/20)',
      bacRelevanceEn: 'Optimal level for top scores (18-20/20) in Baccalaureate exams',
      recommendedDurationAr: 'شهرين ونصف إلى 3 أشهر',
      recommendedDurationEn: '10 to 12 weeks',
      competencies: [
        {
          icon: 'speaking',
          titleAr: 'المحادثة والنقاش',
          titleEn: 'Speaking & Debate',
          descAr: 'المشاركة العفوية في نقاشات حول مواضيع عامة والتعبير عن الأحلام والآراء.',
          descEn: 'Spontaneously enter conversations on familiar topics and explain viewpoints.',
        },
        {
          icon: 'listening',
          titleAr: 'الاستماع والإعلام',
          titleEn: 'Listening & Media',
          descAr: 'فهم النقاط الأساسية في نشرات الأخبار والمحادثات الممتدة ومقاطع الفيديو.',
          descEn: 'Understand main points of standard broadcasts, podcasts, and video talks.',
        },
        {
          icon: 'reading',
          titleAr: 'القراءة والتحليل',
          titleEn: 'Reading & Analysis',
          descAr: 'قراءة المقالات الصحفية، نصوص البكالوريا، والتحليلات البيداغوجية.',
          descEn: 'Read journalistic articles, exam passages, and explanatory essays.',
        },
        {
          icon: 'writing',
          titleAr: 'الكتابة والتعبير الكتابي',
          titleEn: 'Writing & Production',
          descAr: 'كتابة مقالات إنشائية منظمة (Compte-rendu / Essay) مع الحجج والأمثلة.',
          descEn: 'Write structured essays, reports, and coherent argumentative texts.',
        },
      ],
      keyMilestonesAr: [
        'مخزون لغوي يتجاوز 3,000 كلمة وتراكيب أكاديمية',
        'التحكم الكامل في منهجية التعبير الكتابي للبكالوريا',
        'القدرة على التحدث المستمر لمدة 10 دقائق دون انقطاع',
        'تحليل ونقد الأفكار وصياغة الحجج المقنعة',
      ],
      keyMilestonesEn: [
        'Vocabulary exceeding 3,000 academic words and collocations',
        'Full mastery of structured essay writing methodologies',
        'Sustain a 10-minute speech or discussion with ease',
        'Analyze perspectives and construct persuasive arguments',
      ],
    },
    B2: {
      id: 'B2',
      stageNumber: '04',
      percent: 80,
      titleAr: 'المستوى B2: الطلاقة المتقدمة والجاهزية المهنية',
      titleEn: 'Level B2: Upper-Intermediate Fluency',
      badgeAr: 'متقدم • Vantage',
      badgeEn: 'Upper-Intermediate • Vantage',
      cefrTitleAr: 'المرحلة المتقدمة الاحترافية (B2)',
      cefrTitleEn: 'CEFR Upper-Intermediate (B2)',
      vocabularyScale: '5,000+ مصطلح تخصصي',
      examBenchmark: 'Cambridge B2 First (FCE) / DELF B2 / IELTS 6.5',
      summaryAr:
        'الطلاقة اللغوية الشاملة، خوض الحوارات المعقدة مع متحدثين أصليين، كتابة أوراق بحثية ومهنية، والجاهزية لاجتياز امتحانات IELTS, TOEFL, DELF B2, Goethe B2.',
      summaryEn:
        'Comprehensive fluency, debating complex topics with native speakers, academic writing, and full readiness for IELTS, TOEFL, DELF, or Goethe exams.',
      hoursNoteAr: '80 - 90 ساعة تدريبية متقدمة',
      hoursNoteEn: '80 - 90 Advanced Training Hours',
      bacRelevanceAr: 'امتياز استثنائي وجاهزية تامة للدراسة الجامعية والمهنية المتقدمة',
      bacRelevanceEn: 'Distinction level, ready for international university studies',
      recommendedDurationAr: '3 إلى 4 أشهر',
      recommendedDurationEn: '12 to 16 weeks',
      competencies: [
        {
          icon: 'speaking',
          titleAr: 'المحادثة والطلاقة',
          titleEn: 'Spontaneous Fluency',
          descAr: 'التحدث بطلاقة وتلقائية تمكن من التواصل الطبيعي مع متحدثي اللغة الأصليين.',
          descEn: 'Communicate with a degree of fluency and spontaneity with native speakers.',
        },
        {
          icon: 'listening',
          titleAr: 'الاستماع والتحليل',
          titleEn: 'Listening & Nuance',
          descAr: 'متابعة المحاضرات الأكاديمية والمناظرات والنشرات السريعة واستيعاب الدلالات الضمنية.',
          descEn: 'Follow extended lectures, debates, and complex arguments with ease.',
        },
        {
          icon: 'reading',
          titleAr: 'القراءة النقدية',
          titleEn: 'Critical Reading',
          descAr: 'قراءة التقارير التخصصية والمقالات المعقدة والأعمال الأدبية المعاصرة.',
          descEn: 'Read specialized articles, complex technical reports, and contemporary prose.',
        },
        {
          icon: 'writing',
          titleAr: 'الكتابة الأكاديمية والمهنية',
          titleEn: 'Academic & Professional Writing',
          descAr: 'كتابة تقارير مفصلة، رسائل دافع رسمية، ومقالات رأي نقدية معقدة.',
          descEn: 'Write clear, detailed reports, official motivation letters, and academic critiques.',
        },
      ],
      keyMilestonesAr: [
        'مخزون لغوي يتجاوز 5,000 كلمة ومصطلحات تخصصية',
        'الجاهزية التامة لاجتياز اختبارات الشهادات الدولية المعتمدة',
        'القدرة على إدارة اجتماعات ومناظرات أكاديمية ومهنية',
        'استيعاب اللهجات المختلفة والتعبيرات العامية الذكية',
      ],
      keyMilestonesEn: [
        'Active vocabulary exceeding 5,000 terms and idioms',
        'Complete preparation for internationally certified exams',
        'Lead academic presentations and professional meetings',
        'Understand nuanced accents and idiomatic expressions',
      ],
    },
    C1: {
      id: 'C1',
      stageNumber: '05',
      percent: 100,
      titleAr: 'المستوى C1: الإتقان الاحترافي والطلاقة الطبيعية (Proficiency)',
      titleEn: 'Level C1 / Proficiency: Advanced Mastery',
      badgeAr: 'إتقان • Effective Operational Proficiency',
      badgeEn: 'Mastery • Operational Proficiency',
      cefrTitleAr: 'المرحلة الاحترافية العليا (C1 / Proficiency)',
      cefrTitleEn: 'CEFR C1 Advanced & Mastery',
      vocabularyScale: '8,500+ كلمة وتراكيب أصلية',
      examBenchmark: 'Cambridge C1 Advanced (CAE) / DALF C1 / IELTS 7.5-8.5 / Goethe C1',
      summaryAr:
        'التمكن التام والطلاقة الشبيهة بالمتحدث الأصلي، صياغة الأبحاث والخطابات الرسمية، فهم البلاغة والتلميحات الثقافية، والجاهزية للمناصب الدولية والمنح الجامعية العالمية.',
      summaryEn:
        'Complete native-like mastery, professional discourse, sophisticated cultural nuance, international scholarships, and executive communication readiness.',
      hoursNoteAr: '90 - 110 ساعات تدريبية متخصصة',
      hoursNoteEn: '90 - 110 Specialized Masterclass Hours',
      bacRelevanceAr: 'مستوى يفوق متطلبات البكالوريا، مخصص للمنح الدولية والوظائف القيادية',
      bacRelevanceEn: 'Exceeds BAC needs, built for global scholarships and elite careers',
      recommendedDurationAr: '4 إلى 5 أشهر',
      recommendedDurationEn: '16 to 20 weeks',
      competencies: [
        {
          icon: 'speaking',
          titleAr: 'الخطابة والإقناع',
          titleEn: 'Executive Public Speaking',
          descAr: 'التعبير بمرونة تامة، إلقاء العروض التقديمية المعقدة، والتفاوض المحترف.',
          descEn: 'Express ideas fluently and spontaneously with precision on complex subjects.',
        },
        {
          icon: 'listening',
          titleAr: 'الاستماع التخصصي',
          titleEn: 'Native Nuance & Idioms',
          descAr: 'استيعاب أي لغة منطوقة سواء حية أو مسجلة، حتى عند التحدث بسرعة أصلية.',
          descEn: 'Understand a wide range of demanding, longer texts and recognize implicit meaning.',
        },
        {
          icon: 'reading',
          titleAr: 'التحليل الأكاديمي',
          titleEn: 'Scholarly & Literary Analysis',
          descAr: 'فهم النصوص الطويلة والمعقدة والأساليب البلاغية والرمزية في الأدب والأبحاث.',
          descEn: 'Grasp nuanced literary styles, academic research papers, and technical treatises.',
        },
        {
          icon: 'writing',
          titleAr: 'الصياغة الاحترافية',
          titleEn: 'Scholarly & Executive Writing',
          descAr: 'إنتاج نصوص واضحة ومتقنة الصياغة حول مواضيع معقدة مع التحكم الكامل في الأسلوب.',
          descEn: 'Produce clear, well-structured, detailed text on complex subjects showing controlled use of organizational patterns.',
        },
      ],
      keyMilestonesAr: [
        'مخزون لغوي يتجاوز 8,500 كلمة ومصطلحات تخصصية عليا',
        'اجتياز اختبارات IELTS بمعدل 7.5+ أو DALF C1 / Goethe C1',
        'القدرة على التدريس والترجمة والقيادة باللغة الهدف',
        'تطوير أسلوب بلاغي شخصي متميز',
      ],
      keyMilestonesEn: [
        'Active vocabulary exceeding 8,500 words and idiomatic expressions',
        'Achieve IELTS 7.5+ or DALF C1 / Goethe C1 accreditation',
        'Teach, translate, and lead high-stakes negotiations',
        'Develop a refined, distinct personal rhetorical voice',
      ],
    },
  };

  const currentLevelInfo = levelsData[activeLevel];
  const selectedTrackInfo = languageTracks.find((t) => t.id === selectedLanguageTrack)!;

  const levelsList: LevelId[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  // Auto-play advancement cycle
  useEffect(() => {
    if (!isPlayingAuto) return;
    const interval = setInterval(() => {
      setActiveLevel((prev) => {
        const idx = levelsList.indexOf(prev);
        return levelsList[(idx + 1) % levelsList.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlayingAuto]);

  const handlePrevLevel = () => {
    const idx = levelsList.indexOf(activeLevel);
    setActiveLevel(levelsList[idx === 0 ? levelsList.length - 1 : idx - 1]);
  };

  const handleNextLevel = () => {
    const idx = levelsList.indexOf(activeLevel);
    setActiveLevel(levelsList[(idx + 1) % levelsList.length]);
  };

  const handleQuizSubmit = () => {
    const totalScore = quizAnswers.speaking + quizAnswers.comprehension + quizAnswers.goal;
    let recommended: LevelId = 'A1';
    if (totalScore <= 3) recommended = 'A1';
    else if (totalScore <= 5) recommended = 'A2';
    else if (totalScore <= 7) recommended = 'B1';
    else if (totalScore <= 9) recommended = 'B2';
    else recommended = 'C1';

    setQuizResultLevel(recommended);
    setActiveLevel(recommended);
  };

  const getCompetencyIcon = (icon: 'speaking' | 'listening' | 'reading' | 'writing') => {
    switch (icon) {
      case 'speaking':
        return MessageSquare;
      case 'listening':
        return Ear;
      case 'reading':
        return FileText;
      case 'writing':
        return PenTool;
    }
  };

  return (
    <section
      id="student-advancement"
      className="py-20 lg:py-28 bg-white dark:bg-[#070A10] border-t border-zinc-200/80 dark:border-zinc-800/80 relative overflow-hidden transition-colors"
      aria-label={isRtl ? 'خارطة طريق ومسار تطور المستويات للغات' : 'Student Language Learning Roadmap'}
    >
      {/* Background Lighting Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-yellow-500/5 dark:bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-black shadow-xs">
            <Milestone className="w-3.5 h-3.5" />
            <span>
              {isRtl
                ? 'خارطة طريق التعلم خطوة بخطوة (A1 • A2 • B1 • B2 • C1)'
                : 'Step-by-Step Learning Roadmap (A1 to Proficiency)'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
            {isRtl ? 'مسار تطور التلميذ' : 'Student Advancement Roadmap'}{' '}
            <span className="text-amber-600 dark:text-amber-400">
              {isRtl ? 'من التأسيس إلى الاحتراف' : 'From A1 to Proficiency'}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {isRtl
              ? 'خارطة طريق بيداغوجية تفاعلية توضح مراحل نمو الطالب اللغوي، المهارات المكتسبة، المعايير الدولية، والأثر المباشر على التميز في البكالوريا والدراسة بالخارج.'
              : 'An interactive pedagogical roadmap mapping out your communicative milestones, certified exams alignment, and transformation from beginner to fluency.'}
          </p>
        </div>

        {/* Language Track Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {languageTracks.map((track) => {
            const isSelected = track.id === selectedLanguageTrack;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedLanguageTrack(track.id)}
                className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25 scale-105'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/50 hover:text-black dark:hover:text-white'
                }`}
                aria-pressed={isSelected}
              >
                <span className="text-base" role="img" aria-label={track.nameEn}>
                  {track.flag}
                </span>
                <span>{isRtl ? track.nameAr : track.nameEn}</span>
                <span
                  className={`text-[10px] font-sora font-bold px-1.5 py-0.5 rounded-md ${
                    isSelected
                      ? 'bg-black text-amber-300'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {track.code}
                </span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            THE VISUAL STEP-BY-STEP LEARNING ROADMAP COMPONENT
           ========================================================================= */}
        <div className="rounded-3xl bg-zinc-50 dark:bg-gradient-to-b dark:from-[#0E1422] dark:to-[#0A0E17] border-2 border-amber-400/30 p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
          
          {/* Top Row: Active Level Stage + Autoplay & Level Finder */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
            <div className="space-y-1 text-start">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black uppercase tracking-wider font-sora shadow-xs">
                  STAGE {currentLevelInfo.stageNumber} • {currentLevelInfo.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
                  {isRtl ? currentLevelInfo.titleAr : currentLevelInfo.titleEn}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                <span>{isRtl ? currentLevelInfo.summaryAr : currentLevelInfo.summaryEn}</span>
                <span aria-hidden="true" className="text-amber-500 font-bold">•</span>
                <span className="font-bold text-amber-700 dark:text-amber-300">
                  {currentLevelInfo.vocabularyScale}
                </span>
              </div>
            </div>

            {/* Quick Actions (Autoplay + Level Checker Quiz Button) */}
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  isPlayingAuto
                    ? 'bg-amber-500 text-black border-amber-400 font-black'
                    : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-amber-400'
                }`}
                title={isRtl ? 'تشغيل المسار التفاعلي تلقائياً' : 'Toggle auto progression'}
                aria-label={isPlayingAuto ? 'Pause animation' : 'Play animation'}
              >
                {isPlayingAuto ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'إيقاف مؤقت' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{isRtl ? 'عرض تفاعلي متحرك' : 'Roadmap Tour'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsQuizOpen(!isQuizOpen)}
                className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>{isRtl ? 'مقياس تحديد مستواك' : 'Level Finder'}</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              THE STEP-BY-STEP PROGRESSION ROADWAY (A1 -> A2 -> B1 -> B2 -> C1)
             ========================================================================= */}
          <div className="space-y-4 pt-2">
            
            {/* Progress Track Header */}
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>
                  {isRtl
                    ? `المسار الأكاديمي المعتمد: ${selectedTrackInfo.nameAr}`
                    : `Accredited Curriculum Pathway: ${selectedTrackInfo.nameEn}`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-sora font-black text-amber-600 dark:text-amber-400 text-sm sm:text-base">
                <span className="tabular-nums">{currentLevelInfo.percent}%</span>
                <span className="text-xs text-zinc-500 font-normal">
                  ({isRtl ? `مرحلة ${currentLevelInfo.id}` : `Stage ${currentLevelInfo.id}`})
                </span>
              </div>
            </div>

            {/* Main Animated Progress Bar Track */}
            <div className="relative pt-6 pb-6">
              
              {/* Background Outer Bar Track */}
              <div className="relative h-4 sm:h-5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-300/80 dark:border-zinc-800 shadow-inner">
                {/* 5 Equal Step Divide Markers */}
                <div className="absolute inset-0 grid grid-cols-5 pointer-events-none divide-x rtl:divide-x-reverse divide-white/20 dark:divide-white/10" />

                {/* Animated Gradient Fill Bar */}
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 relative"
                  initial={false}
                  animate={{
                    width: `${currentLevelInfo.percent}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-pulse" />
                </motion.div>
              </div>

              {/* 5 Step-by-Step Interactive Milestone Nodes (A1, A2, B1, B2, C1) */}
              <div className="relative -mt-6 sm:-mt-6.5 flex justify-between items-center w-full px-1 sm:px-2 pointer-events-none">
                {levelsList.map((lvl) => {
                  const nodeData = levelsData[lvl];
                  const isActive = lvl === activeLevel;
                  const isPassed = nodeData.percent <= currentLevelInfo.percent;

                  return (
                    <div
                      key={lvl}
                      className="flex flex-col items-center pointer-events-auto group"
                    >
                      {/* Node Trigger Button */}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsPlayingAuto(false);
                          setActiveLevel(lvl);
                        }}
                        className={`relative w-9 h-9 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-sora font-black text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer border-2 ${
                          isActive
                            ? 'bg-amber-400 text-black border-black dark:border-white ring-4 ring-amber-400/40 shadow-amber-500/30 scale-110 z-20'
                            : isPassed
                            ? 'bg-amber-500 text-black border-amber-300 shadow-amber-500/20'
                            : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:border-amber-400 hover:text-black dark:hover:text-white'
                        }`}
                        aria-label={`Select stage ${lvl}`}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        {isPassed && !isActive ? (
                          <div className="flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                          </div>
                        ) : (
                          <span>{lvl}</span>
                        )}

                        {/* Pulsing indicator when active */}
                        {isActive && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-black animate-ping" />
                        )}
                      </motion.button>

                      {/* Node Label Below */}
                      <div className="text-center mt-2 select-none">
                        <span
                          className={`block font-sora font-extrabold text-[11px] sm:text-xs ${
                            isActive
                              ? 'text-amber-600 dark:text-amber-400 scale-105 font-black'
                              : 'text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          {lvl}
                        </span>
                        <span className="hidden md:block text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                          {isRtl ? nodeData.badgeAr.split('•')[0] : nodeData.badgeEn.split('•')[0]}
                        </span>
                        <span className="block text-[9px] text-zinc-400 dark:text-zinc-500 font-mono">
                          {nodeData.percent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={isRtl ? handleNextLevel : handlePrevLevel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors shadow-2xs cursor-pointer"
              >
                {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                <span>{isRtl ? 'المستوى السابق' : 'Previous Level'}</span>
              </button>

              {/* Exam benchmark alignment badge */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>{isRtl ? 'الشهادة الدولية المطابقة:' : 'Aligned Test:'}</span>
                <span className="font-sora">{currentLevelInfo.examBenchmark}</span>
              </div>

              <button
                type="button"
                onClick={isRtl ? handlePrevLevel : handleNextLevel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors shadow-2xs cursor-pointer"
              >
                <span>{isRtl ? 'المستوى التالي' : 'Next Level'}</span>
                {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* =========================================================================
              PROGRESSION TIMEFRAME SIMULATOR (How far will you go?)
             ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 space-y-3 text-start">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs sm:text-sm font-black text-zinc-950 dark:text-white">
                  {isRtl ? 'محاكي التطور الزمني بالأكاديمية:' : 'Student Growth Timeline Simulator:'}
                </h4>
              </div>

              {/* Timeframe Selector Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTimeframe('3m');
                    setActiveLevel('A2');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedTimeframe === '3m'
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {isRtl ? '3 أشهر' : '3 Months'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTimeframe('6m');
                    setActiveLevel('B1');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedTimeframe === '6m'
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {isRtl ? '6 أشهر' : '6 Months'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTimeframe('1y');
                    setActiveLevel('B2');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedTimeframe === '1y'
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {isRtl ? 'سنة دراسية كاملة' : '1 Full Year'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">
                  {isRtl ? 'نقطة الانطلاق (مبتدئ):' : 'Starting Baseline:'}
                </span>
                <span className="font-bold text-zinc-900 dark:text-white">A1 Foundations</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">
                  {isRtl ? 'المستوى المحقق المتوقع:' : 'Target Achieved Level:'}
                </span>
                <span className="font-black text-amber-600 dark:text-amber-400 font-sora">
                  {selectedTimeframe === '3m'
                    ? 'A2 Waystage (تواصل حياتي سلس)'
                    : selectedTimeframe === '6m'
                    ? 'B1 Threshold (استقلالية وبكالوريا)'
                    : 'B2 / C1 (طلاقة أكاديمية ومهنية)'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">
                  {isRtl ? 'المكاسب المحققة:' : 'Key Competency Gains:'}
                </span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {selectedTimeframe === '3m'
                    ? '+1,500 مفردة + تجاوز عقدة النطق'
                    : selectedTimeframe === '6m'
                    ? '+3,000 مفردة + مقالات البكالوريا 18/20'
                    : 'طلاقة كاملة + الجاهزية لاختبارات IELTS / DELF'}
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              Optional Diagnostic Quiz Drawer (Collapsible)
             ========================================================================= */}
          <AnimatePresence>
            {isQuizOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 dark:bg-zinc-900/90 border-2 border-amber-400/40 shadow-inner space-y-4 text-start">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-400/30">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <div>
                        <h4 className="text-sm font-black text-zinc-950 dark:text-white">
                          {isRtl
                            ? `مقياس التقييم السريع: ${selectedTrackInfo.nameAr}`
                            : `Quick Level Diagnostic: ${selectedTrackInfo.nameEn}`}
                        </h4>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                          {isRtl
                            ? 'أجب عن 3 أسئلة لتحديد نقطة انطلاقك المناسبة بالأكاديمية'
                            : 'Answer 3 quick questions to determine your starting level'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsQuizOpen(false)}
                      className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-bold px-2 py-1 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    >
                      {isRtl ? 'إغلاق' : 'Close'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Q1: Speaking ability */}
                    <div className="space-y-1.5">
                      <label className="block font-bold text-zinc-900 dark:text-zinc-200">
                        1. {isRtl ? 'كيف تصف قدرتك الحالية على التحدث؟' : 'Your current speaking ability?'}
                      </label>
                      <select
                        value={quizAnswers.speaking}
                        onChange={(e) =>
                          setQuizAnswers({ ...quizAnswers, speaking: Number(e.target.value) })
                        }
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs outline-none focus:border-amber-500"
                      >
                        <option value={1}>
                          {isRtl ? 'مبتدئ تماماً (كلمات وعبارات بسيطة فقط)' : 'Complete beginner (basic words only)'}
                        </option>
                        <option value={2}>
                          {isRtl ? 'أستطيع التحدث في مواقف الحياة اليومية المعتادة' : 'Handle routine daily conversations'}
                        </option>
                        <option value={3}>
                          {isRtl ? 'أتحدث بطلاقة معتدلة وأعبر عن آرائي بسهولة' : 'Speak with moderate fluency and share opinions'}
                        </option>
                        <option value={4}>
                          {isRtl ? 'أتحدث بطلاقة عالية وأشارك في مناظرات معقدة' : 'High fluency, able to debate complex topics'}
                        </option>
                      </select>
                    </div>

                    {/* Q2: Listening / Comprehension */}
                    <div className="space-y-1.5">
                      <label className="block font-bold text-zinc-900 dark:text-zinc-200">
                        2. {isRtl ? 'فهمك للأفلام والمحادثات الأصلية؟' : 'Understanding native audio & media?'}
                      </label>
                      <select
                        value={quizAnswers.comprehension}
                        onChange={(e) =>
                          setQuizAnswers({
                            ...quizAnswers,
                            comprehension: Number(e.target.value),
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs outline-none focus:border-amber-500"
                      >
                        <option value={1}>
                          {isRtl ? 'أفهم فقط إذا كان الكلام بطيئاً جداً ومصحوباً بترجمة' : 'Only when spoken very slowly with subtitles'}
                        </option>
                        <option value={2}>
                          {isRtl ? 'أفهم الفكرة العامة للمواضيع البسيطة والمألوفة' : 'Understand main ideas in familiar topics'}
                        </option>
                        <option value={3}>
                          {isRtl ? 'أفهم معظم النشرات والبرامج التلفزيونية والمقاطع' : 'Understand most broadcasts and podcasts'}
                        </option>
                        <option value={4}>
                          {isRtl ? 'أفهم النطق السريع واللهجات المختلفة بدون عناء' : 'Understand rapid native speech effortlessly'}
                        </option>
                      </select>
                    </div>

                    {/* Q3: Primary Goal */}
                    <div className="space-y-1.5">
                      <label className="block font-bold text-zinc-900 dark:text-zinc-200">
                        3. {isRtl ? 'ما هو هدفك الأساسي من الدراسة؟' : 'Your primary learning goal?'}
                      </label>
                      <select
                        value={quizAnswers.goal}
                        onChange={(e) =>
                          setQuizAnswers({ ...quizAnswers, goal: Number(e.target.value) })
                        }
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs outline-none focus:border-amber-500"
                      >
                        <option value={1}>
                          {isRtl ? 'تأسيس اللغة والتخلص من عقدة النطق' : 'Build strong basics and speaking confidence'}
                        </option>
                        <option value={2}>
                          {isRtl ? 'السفر، المحادثة، والتواصل مع الأجانب' : 'Travel, conversation, and practical communication'}
                        </option>
                        <option value={3}>
                          {isRtl ? 'التفوق في البكالوريا (BAC) والدراسة الأكاديمية' : 'BAC excellence and academic distinction'}
                        </option>
                        <option value={4}>
                          {isRtl ? 'اجتياز اختبارات دولية (IELTS / DELF / Goethe)' : 'Pass international certified exams'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleQuizSubmit}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'احسب المستوى الموصى به' : 'Calculate My Level'}</span>
                    </button>

                    {quizResultLevel && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>
                          {isRtl
                            ? `المستوى الأنسب لك للانطلاق: ${quizResultLevel}`
                            : `Recommended Starting Level: ${quizResultLevel}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =========================================================================
              ACTIVE LEVEL DEEP DIVE DETAILS CARD (Cross-fading with Motion)
             ========================================================================= */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedLanguageTrack}-${activeLevel}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-2"
            >
              {/* Left Column: 4 Core Competencies Grid */}
              <div className="lg:col-span-7 space-y-4 text-start">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-zinc-950 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span>
                      {isRtl
                        ? `الكفاءات المستهدفة في مستوى ${activeLevel}`
                        : `Target Competencies in Level ${activeLevel}`}
                    </span>
                  </h4>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-bold font-sora">
                    {selectedTrackInfo.nameAr}
                  </span>
                </div>

                {/* 4 Skill Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLevelInfo.competencies.map((comp, idx) => {
                    const IconComponent = getCompetencyIcon(comp.icon);
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between space-y-2 hover:border-amber-400/50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <h5 className="text-xs font-bold text-zinc-900 dark:text-white">
                            {isRtl ? comp.titleAr : comp.titleEn}
                          </h5>
                        </div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {isRtl ? comp.descAr : comp.descEn}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Key Milestones List */}
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                  <h5 className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    {isRtl ? 'المخرجات التعليمية الأساسية عند إتمام هذا المستوى:' : 'Key Learning Outcomes:'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {(isRtl
                      ? currentLevelInfo.keyMilestonesAr
                      : currentLevelInfo.keyMilestonesEn
                    ).map((milestone, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="leading-snug text-[11px] font-medium">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Level Snapshot, Baccalaureate Relevance & Enrollment */}
              <div className="lg:col-span-5 space-y-4 text-start">
                <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        {isRtl ? 'الشهادة والاعتماد الدولي' : 'Accredited Certification'}
                      </span>
                      <p className="text-sm font-black text-zinc-900 dark:text-white">
                        {isRtl
                          ? `شهادة إتمام المستوى ${activeLevel}`
                          : `Certificate of Completion Level ${activeLevel}`}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Program Metadata List */}
                  <div className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <div className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                      <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isRtl ? 'الحجم الساعي التقديري:' : 'Estimated Hours:'}</span>
                      </span>
                      <span className="font-bold text-zinc-900 dark:text-white font-sora">
                        {isRtl ? currentLevelInfo.hoursNoteAr : currentLevelInfo.hoursNoteEn}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                      <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isRtl ? 'طبيعة الفوج:' : 'Class Size:'}</span>
                      </span>
                      <span className="font-bold text-zinc-900 dark:text-white">
                        {isRtl ? 'أفواج مصغرة (8 - 12 تلميذ)' : 'Small Cohorts (8-12 students)'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                      <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isRtl ? 'المدة التقديرية:' : 'Duration:'}</span>
                      </span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {isRtl
                          ? currentLevelInfo.recommendedDurationAr
                          : currentLevelInfo.recommendedDurationEn}
                      </span>
                    </div>
                  </div>

                  {/* BAC & School Support Note */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                    <span className="text-[10px] font-black text-amber-800 dark:text-amber-400 uppercase tracking-wide block">
                      {isRtl ? 'الأثر المباشر على الامتحانات الرسمية (BAC / BEM):' : 'Official Exams Impact:'}
                    </span>
                    <p className="text-[11px] text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">
                      {isRtl ? currentLevelInfo.bacRelevanceAr : currentLevelInfo.bacRelevanceEn}
                    </p>
                  </div>

                  {/* Enrollment CTA */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenRegister(
                          `${selectedTrackInfo.nameAr} - المستوى ${activeLevel}`
                        )
                      }
                      className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>
                        {isRtl
                          ? `التسجيل في مسار ${selectedTrackInfo.nameAr} (${activeLevel})`
                          : `Enroll in ${selectedTrackInfo.nameEn} (${activeLevel})`}
                      </span>
                      {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>

                    <div className="text-center">
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {isRtl
                          ? 'يتضمن البرنامج اختبار تشخيص مجاني قبل انطلاق الدورة'
                          : 'Includes free diagnostic placement before course launch'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
