import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ACADEMY_INFO, academyCampaign } from '../data/academyData';
import {
  Languages,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
  Phone,
  Sparkles,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
  X,
  RotateCcw,
  BookOpen,
  Globe2,
  BookMarked,
  MessageCircle,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CircularProgressBar } from './CircularProgressBar';

interface LanguageProgramsProps {
  onOpenRegister: (program?: string) => void;
}

type LevelFilter = 'all' | 'A1' | 'A2' | 'B1' | 'B2' | 'bac';
type ScheduleFilter = 'all' | 'weekend' | 'evening' | 'morning' | 'intensive';
type BranchFilter = 'all' | 'ain-defla' | 'blida' | 'khemis-miliana';

// Visual icon and badge configuration for high clarity
const languageVisuals: Record<
  string,
  {
    flag: string;
    code: string;
    Icon: React.ElementType;
    badgeTheme: string;
    iconBg: string;
    iconColor: string;
    borderHighlight: string;
    curriculumTagAr: string;
    curriculumTagEn: string;
  }
> = {
  'lang-en': {
    flag: '🇬🇧',
    code: 'ENG',
    Icon: Globe2,
    badgeTheme: 'bg-amber-400 text-black',
    iconBg: 'bg-amber-500/15 dark:bg-amber-400/15',
    iconColor: 'text-amber-600 dark:text-amber-400',
    borderHighlight: 'hover:border-amber-400',
    curriculumTagAr: 'معتمد • Cambridge & BAC',
    curriculumTagEn: 'Cambridge & BAC Aligned',
  },
  'lang-fr': {
    flag: '🇫🇷',
    code: 'FRA',
    Icon: BookMarked,
    badgeTheme: 'bg-blue-600 text-white',
    iconBg: 'bg-blue-500/15 dark:bg-blue-400/15',
    iconColor: 'text-blue-600 dark:text-blue-400',
    borderHighlight: 'hover:border-blue-400',
    curriculumTagAr: 'منهج البكالوريا • DELF & TCF',
    curriculumTagEn: 'BAC, DELF & TCF Prep',
  },
  'lang-es': {
    flag: '🇪🇸',
    code: 'ESP',
    Icon: MessageCircle,
    badgeTheme: 'bg-rose-500 text-white',
    iconBg: 'bg-rose-500/15 dark:bg-rose-400/15',
    iconColor: 'text-rose-600 dark:text-rose-400',
    borderHighlight: 'hover:border-rose-400',
    curriculumTagAr: 'محادثة وتطبيق • DELE & SIELE',
    curriculumTagEn: 'Conversation & DELE Prep',
  },
  'lang-de': {
    flag: '🇩🇪',
    code: 'DEU',
    Icon: ShieldCheck,
    badgeTheme: 'bg-amber-600 text-white',
    iconBg: 'bg-amber-600/15 dark:bg-amber-500/15',
    iconColor: 'text-amber-700 dark:text-amber-400',
    borderHighlight: 'hover:border-amber-600',
    curriculumTagAr: 'تأهيل للدراسة • Goethe-Zertifikat',
    curriculumTagEn: 'Study in Germany • Goethe',
  },
};

export const LanguagePrograms: React.FC<LanguageProgramsProps> = ({ onOpenRegister }) => {
  const { t, isRtl, language } = useLanguage();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>('all');
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleFilter>('all');
  const [selectedBranch, setSelectedBranch] = useState<BranchFilter>('all');
  const [selectedLangId, setSelectedLangId] = useState<string>('lang-en');

  // Extended schedule and metadata per language program
  const programMetadata: Record<
    string,
    {
      levels: string[];
      schedulesAr: string[];
      schedulesEn: string[];
      scheduleKeys: ('weekend' | 'evening' | 'morning' | 'intensive')[];
      branches: ('ain-defla' | 'blida' | 'khemis-miliana')[];
      durationWeeks: string;
      cohortSizeAr: string;
      cohortSizeEn: string;
      timingNoteAr: string;
      timingNoteEn: string;
    }
  > = {
    'lang-en': {
      levels: ['A1', 'A2', 'B1', 'B2', 'bac'],
      schedulesAr: ['الجمعة والسبت (صباحاً/مساءً)', 'أفواج مسائية بعد الظهر', 'دورات العطل المكثفة'],
      schedulesEn: ['Friday & Saturday (AM/PM)', 'Evening Weekday Cohorts', 'Vacation Intensive Bootcamps'],
      scheduleKeys: ['weekend', 'evening', 'intensive'],
      branches: ['ain-defla', 'blida', 'khemis-miliana'],
      durationWeeks: '8 - 12 أسابيع',
      cohortSizeAr: '8 - 12 تلميذ',
      cohortSizeEn: '8 - 12 Students',
      timingNoteAr: 'مرونة تامة في اختيار التوقيت المناسب',
      timingNoteEn: 'Flexible timing options available',
    },
    'lang-fr': {
      levels: ['A1', 'A2', 'B1', 'B2', 'bac'],
      schedulesAr: ['الجمعة والسبت (مكثف)', 'أفواج مسائية', 'صباحي للأحرار'],
      schedulesEn: ['Friday & Saturday (Intensive)', 'Evening Cohorts', 'Morning Sessions for Free Candidates'],
      scheduleKeys: ['weekend', 'evening', 'morning'],
      branches: ['ain-defla', 'blida', 'khemis-miliana'],
      durationWeeks: '8 - 10 أسابيع',
      cohortSizeAr: '8 - 12 تلميذ',
      cohortSizeEn: '8 - 12 Students',
      timingNoteAr: 'تركيز معمق على التعبير الشفهي والكتابي للبكالوريا',
      timingNoteEn: 'Heavy focus on BAC written & oral expression',
    },
    'lang-es': {
      levels: ['A1', 'A2', 'B1', 'B2'],
      schedulesAr: ['أفواج نهاية الأسبوع (السبت)', 'أفواج مسائية ميسرة'],
      schedulesEn: ['Weekend Cohorts (Saturdays)', 'Flexible Evening Sessions'],
      scheduleKeys: ['weekend', 'evening'],
      branches: ['ain-defla', 'blida', 'khemis-miliana'],
      durationWeeks: '8 - 10 أسابيع',
      cohortSizeAr: '8 - 10 تلاميذ',
      cohortSizeEn: '8 - 10 Students',
      timingNoteAr: 'تطبيق مباشر للمحادثة وقواعد التواصل الإسباني',
      timingNoteEn: 'Direct conversation and Spanish communication drills',
    },
    'lang-de': {
      levels: ['A1', 'A2', 'B1', 'B2'],
      schedulesAr: ['الجمعة والسبت', 'أفواج مسائية تحضيرية للدراسة بالخارج'],
      schedulesEn: ['Friday & Saturday', 'Evening Study-Abroad Preparatory Cohorts'],
      scheduleKeys: ['weekend', 'evening'],
      branches: ['ain-defla', 'blida', 'khemis-miliana'],
      durationWeeks: '10 - 12 أسبوعاً',
      cohortSizeAr: '6 - 10 تلاميذ',
      cohortSizeEn: '6 - 10 Students',
      timingNoteAr: 'تأهيل كامل لاختبارات Goethe-Zertifikat الرسمية',
      timingNoteEn: 'Complete prep for official Goethe-Zertifikat tests',
    },
  };

  // Filtered Programs Logic
  const filteredPrograms = useMemo(() => {
    return t.languages.programs.filter((prog) => {
      const meta = programMetadata[prog.id];

      // 1. Text Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = prog.title.toLowerCase().includes(q);
        const matchesSubTitle = prog.subTitleEn.toLowerCase().includes(q);
        const matchesDesc = prog.description.toLowerCase().includes(q);
        const matchesAudience = prog.targetAudience.toLowerCase().includes(q);
        const matchesCert = prog.certification?.toLowerCase().includes(q) || false;
        const matchesHighlights = prog.highlights.some((h) => h.toLowerCase().includes(q));

        if (!matchesTitle && !matchesSubTitle && !matchesDesc && !matchesAudience && !matchesCert && !matchesHighlights) {
          return false;
        }
      }

      // 2. Level Filter
      if (selectedLevel !== 'all' && meta) {
        if (!meta.levels.includes(selectedLevel)) {
          return false;
        }
      }

      // 3. Schedule Filter
      if (selectedSchedule !== 'all' && meta) {
        if (!meta.scheduleKeys.includes(selectedSchedule as any)) {
          return false;
        }
      }

      // 4. Branch Filter
      if (selectedBranch !== 'all' && meta) {
        if (!meta.branches.includes(selectedBranch as any)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedLevel, selectedSchedule, selectedBranch, t.languages.programs]);

  // Ensure active selected language stays within filtered list if possible
  const activeLang =
    filteredPrograms.find((p) => p.id === selectedLangId) ||
    filteredPrograms[0] ||
    t.languages.programs[0];

  const activeMeta = programMetadata[activeLang.id];
  const activeVisual = languageVisuals[activeLang.id] || languageVisuals['lang-en'];
  const ActiveIcon = activeVisual.Icon;

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedLevel !== 'all' ||
    selectedSchedule !== 'all' ||
    selectedBranch !== 'all';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLevel('all');
    setSelectedSchedule('all');
    setSelectedBranch('all');
  };

  return (
    <section
      id="languages"
      className="py-20 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold">
            <Languages className="w-3.5 h-3.5" />
            <span>{t.languages.sectionBadge}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            {t.languages.title} <span className="text-amber-600 dark:text-amber-400">{t.languages.titleHighlight}</span>
          </h2>
          
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {t.languages.subtitle}
          </p>
        </div>

        {/* =========================================================================
            SEARCHABLE FILTER BAR
           ========================================================================= */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E1422] border-2 border-amber-400/30 shadow-xl space-y-5">
          
          {/* Top Row: Search Input + Clear Button */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            
            {/* Search Input Box */}
            <div className="relative flex-grow">
              <Search
                className={`w-4 h-4 text-zinc-400 absolute top-3.5 ${
                  isRtl ? 'right-3.5' : 'left-3.5'
                } pointer-events-none`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isRtl
                    ? 'ابحث باسم اللغة، الكلمات المفتاحية، أو نوع الامتحان (مثال: إنجليزية، B2، بكالوريا، IELTS)...'
                    : 'Search by language, keywords, or exam level (e.g. English, B2, Baccalaureate, IELTS)...'
                }
                className={`w-full ${
                  isRtl ? 'pr-10 pl-10' : 'pl-10 pr-10'
                } py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs sm:text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-zinc-400`}
                aria-label={isRtl ? 'البحث في دورات اللغات' : 'Search language courses'}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-3 ${
                    isRtl ? 'left-3' : 'right-3'
                  } p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200`}
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Count & Clear Controls */}
            <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-xs font-bold">
                <Filter className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {isRtl
                    ? `${filteredPrograms.length} لغات متاحة`
                    : `${filteredPrograms.length} Programs`}
                </span>
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'إعادة ضبط' : 'Reset'}</span>
                </button>
              )}
            </div>

          </div>

          {/* Bottom Row: 3 Modular Dropdown Selectors (Level, Schedule, Branch) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
            
            {/* 1. Proficiency Level Selector */}
            <div className="space-y-1 text-start">
              <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>{isRtl ? 'المستوى المستهدف (CEFR)' : 'Proficiency Level'}</span>
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as LevelFilter)}
                className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="all">{isRtl ? 'جميع المستويات (All Levels)' : 'All Levels (A1 - B2)'}</option>
                <option value="A1">{isRtl ? 'المستوى A1 (مبتدئ • Beginner)' : 'Level A1 (Beginner)'}</option>
                <option value="A2">{isRtl ? 'المستوى A2 (تمهيدي • Elementary)' : 'Level A2 (Elementary)'}</option>
                <option value="B1">{isRtl ? 'المستوى B1 (متوسط • Intermediate)' : 'Level B1 (Intermediate)'}</option>
                <option value="B2">{isRtl ? 'المستوى B2 (متقدم • Upper-Int)' : 'Level B2 (Upper-Intermediate)'}</option>
                <option value="bac">{isRtl ? 'مستوى البكالوريا (BAC Exam)' : 'BAC Curriculum Alignment'}</option>
              </select>
            </div>

            {/* 2. Schedule Availability Selector */}
            <div className="space-y-1 text-start">
              <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{isRtl ? 'توقيت وتوزيع الحصص' : 'Schedule Availability'}</span>
              </label>
              <select
                value={selectedSchedule}
                onChange={(e) => setSelectedSchedule(e.target.value as ScheduleFilter)}
                className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="all">{isRtl ? 'كافة التوقيتات (All Schedules)' : 'All Schedules'}</option>
                <option value="weekend">{isRtl ? 'نهاية الأسبوع (الجمعة / السبت)' : 'Weekend (Fri & Sat)'}</option>
                <option value="evening">{isRtl ? 'أفواج مسائية (بعد الظهر)' : 'Evening Classes (16:30+)'}</option>
                <option value="morning">{isRtl ? 'أفواج صباحية (09:00 - 12:00)' : 'Morning Classes'}</option>
                <option value="intensive">{isRtl ? 'دورات مكثفة خلال العطل' : 'Vacation Bootcamps'}</option>
              </select>
            </div>

            {/* 3. Branch / Location Selector */}
            <div className="space-y-1 text-start">
              <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{isRtl ? 'الفرع والمقر' : 'Branch Location'}</span>
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value as BranchFilter)}
                className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="all">{isRtl ? 'كافة الفروع (عين الدفلى • البليدة • خميس مليانة)' : 'All Branches (3 Locations)'}</option>
                <option value="ain-defla">{isRtl ? 'فرع عين الدفلى (الرئيسي)' : 'Aïn Defla HQ (Main)'}</option>
                <option value="blida">{isRtl ? 'فرع البليدة' : 'Blida Branch'}</option>
                <option value="khemis-miliana">{isRtl ? 'فرع خميس مليانة' : 'Khemis Miliana Branch'}</option>
              </select>
            </div>

          </div>

          {/* Quick Filter Tag Buttons with Icons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 me-1">
              {isRtl ? 'روابط سريعة:' : 'Quick Filters:'}
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('الإنجليزية');
                setSelectedLevel('all');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-amber-400 hover:text-black dark:bg-zinc-900 dark:hover:bg-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-colors cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>🇬🇧 {isRtl ? 'الإنجليزية' : 'English'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('الفرنسية');
                setSelectedLevel('all');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-amber-400 hover:text-black dark:bg-zinc-900 dark:hover:bg-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-colors cursor-pointer"
            >
              <BookMarked className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>🇫🇷 {isRtl ? 'الفرنسية' : 'French'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('الألمانية');
                setSelectedLevel('all');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-amber-400 hover:text-black dark:bg-zinc-900 dark:hover:bg-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>🇩🇪 {isRtl ? 'الألمانية' : 'German'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('الإسبانية');
                setSelectedLevel('all');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-amber-400 hover:text-black dark:bg-zinc-900 dark:hover:bg-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>🇪🇸 {isRtl ? 'الإسبانية' : 'Spanish'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedSchedule('weekend');
              }}
              className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-amber-400 hover:text-black dark:bg-zinc-900 dark:hover:bg-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-colors cursor-pointer"
            >
              ⚡ {isRtl ? 'نهاية الأسبوع' : 'Weekend'}
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedLevel('B2');
              }}
              className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-amber-400 hover:text-black dark:bg-zinc-900 dark:hover:bg-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-colors cursor-pointer"
            >
              🎯 {isRtl ? 'مستوى B2' : 'B2 Upper-Int'}
            </button>
          </div>

        </div>

        {/* =========================================================================
            FILTERED LANGUAGE PROGRAM RESULTS OR EMPTY STATE
           ========================================================================= */}
        {filteredPrograms.length > 0 ? (
          <>
            {/* Language Tabs / Selector with Visual Badges & Lucide Icons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
              {filteredPrograms.map((prog) => {
                const isSelected = prog.id === activeLang.id;
                const visual = languageVisuals[prog.id] || languageVisuals['lang-en'];
                const TabIcon = visual.Icon;

                return (
                  <motion.button
                    key={prog.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedLangId(prog.id)}
                    className={`px-4 sm:px-5 py-3 rounded-2xl font-extrabold text-sm transition-all flex items-center gap-2.5 cursor-pointer shadow-xs ${
                      isSelected
                        ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-105'
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/40 hover:text-black dark:hover:text-white shadow-sm'
                    }`}
                    id={`tab-${prog.id}`}
                  >
                    {/* Visual Flag and Lucide Icon Container */}
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                        isSelected
                          ? 'bg-black/15 text-black'
                          : `${visual.iconBg} ${visual.iconColor}`
                      }`}
                    >
                      <TabIcon className="w-3.5 h-3.5" />
                    </div>

                    <span>{visual.flag}</span>
                    <span>{prog.title}</span>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold font-sora ${
                        isSelected
                          ? 'bg-black text-amber-300'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {prog.subTitleEn}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Active Language Detailed Showcase Card */}
            <div className="bg-white dark:bg-[#0e121b] border-2 border-amber-400/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Main Content Area */}
                <div className="lg:col-span-7 space-y-6 text-start">
                  
                  {/* Badges Bar with Visual Flag and Program Tags */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-black font-black text-xs shadow-xs">
                      <ActiveIcon className="w-3.5 h-3.5" />
                      <span>{activeVisual.flag} {activeLang.badge}</span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs border border-zinc-200 dark:border-zinc-700">
                      {t.languages.targetAudienceLabel}: {activeLang.targetAudience}
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold text-[11px] border border-amber-500/20 font-sora">
                      {isRtl ? activeVisual.curriculumTagAr : activeVisual.curriculumTagEn}
                    </span>
                  </div>

                  {/* Title & Description with Visual Icon */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${activeVisual.iconBg} ${activeVisual.iconColor}`}
                      >
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                          {activeLang.title}{' '}
                          <span className="text-amber-600 dark:text-amber-400 font-sora text-xl">
                            ({activeLang.subTitleEn})
                          </span>
                        </h3>
                      </div>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-300 text-base mt-2 leading-relaxed">
                      {activeLang.description}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      {t.languages.highlightsTitle}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-800 dark:text-zinc-200">
                      {activeLang.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-zinc-50 dark:bg-zinc-900/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400 mt-0.5 shrink-0" />
                          <span className="font-medium text-xs sm:text-sm">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Program Schedule & Branch Availability Snapshot */}
                  {activeMeta && (
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span>{isRtl ? 'الأفواج والتوقيتات المتاحة لهذا المسار:' : 'Available Schedules & Timings:'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        {(isRtl ? activeMeta.schedulesAr : activeMeta.schedulesEn).map((sched, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-medium">
                            • {sched}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certification note */}
                  {activeLang.certification && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-bold">
                      <Award className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />
                      <span>{activeLang.certification}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button
                      onClick={() => onOpenRegister(activeLang.title)}
                      className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      id={`register-btn-${activeLang.id}`}
                    >
                      <span>{t.languages.registerInProgram} {activeLang.title}</span>
                      {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    <a
                      href={`tel:${ACADEMY_INFO.phones[0]}`}
                      className="px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 text-sm font-bold text-center flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Phone className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                      <span>{t.languages.inquirePhone}</span>
                    </a>
                  </div>
                </div>

                {/* Right Card / Offer Snapshot */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 shadow-sm text-start">
                    
                    {/* Pricing Breakdown Card */}
                    <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                          {t.languages.currentCostLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase">
                          {language === 'ar' ? 'الأسعار الرسمية المعتمدة' : 'Official Tuition'}
                        </span>
                      </div>

                      {/* Pricing Comparison Grid (Monthly vs Full Level) */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Monthly Option */}
                        <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/40 text-center">
                          <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-bold block mb-0.5">
                            {t.languages.monthlyCostLabel}
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 block font-sora">
                            {language === 'ar' ? '3000 دج' : '3,000 DZD'}
                          </span>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                            {language === 'ar' ? 'شهرياً' : 'per month'}
                          </span>
                        </div>

                        {/* Full Level Option */}
                        <div className="p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                          <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-bold block mb-0.5">
                            {t.languages.fullLevelCostLabel}
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white block font-sora">
                            {language === 'ar' ? '9000 دج' : '9,000 DZD'}
                          </span>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                            {language === 'ar' ? 'للمستوى كاملاً' : 'for complete level'}
                          </span>
                        </div>
                      </div>

                      {/* Branch-Specific Notice: Blida Branch */}
                      <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between text-xs">
                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                          📍 {language === 'ar' ? 'تسعيرة فرع البليدة:' : 'Blida Branch Tuition:'}
                        </span>
                        <span className="font-black text-amber-600 dark:text-amber-400 font-sora">
                          {language === 'ar' ? '4000 دج' : '4,000 DZD'}
                        </span>
                      </div>

                      {/* Class Frequency Information (Adults 4 / Kids 8) */}
                      <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-zinc-950 border border-amber-500/20 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-800 dark:text-zinc-200 text-[11px]">
                            📅 {t.languages.classSessionsLabel}:
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center pt-1">
                          <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">{language === 'ar' ? 'الكبار (البالغين)' : 'Adults'}</span>
                            <span className="text-xs font-black text-amber-700 dark:text-amber-400">{language === 'ar' ? '4 حصص شهرياً' : '4 sessions / mo'}</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">{language === 'ar' ? 'الأطفال' : 'Kids'}</span>
                            <span className="text-xs font-black text-amber-700 dark:text-amber-400">{language === 'ar' ? '8 حصص شهرياً' : '8 sessions / mo'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
                      <div className="flex items-center justify-between py-1.5 border-b border-zinc-200 dark:border-zinc-800/60">
                        <span className="text-zinc-500 dark:text-zinc-400">{t.languages.programLaunch}:</span>
                        <span className="font-bold text-zinc-900 dark:text-white">{t.common.startDate}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-zinc-200 dark:border-zinc-800/60">
                        <span className="text-zinc-500 dark:text-zinc-400">{t.languages.studySeason}:</span>
                        <span className="font-bold text-zinc-900 dark:text-white font-sora">{academyCampaign.academicYear}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-zinc-200 dark:border-zinc-800/60">
                        <span className="text-zinc-500 dark:text-zinc-400">{t.languages.followUpType}:</span>
                        <span className="font-bold text-amber-700 dark:text-amber-300">{t.common.individualFollowUp}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-zinc-200 dark:border-zinc-800/60">
                        <span className="text-zinc-500 dark:text-zinc-400">{t.languages.teachingMethod}:</span>
                        <span className="font-bold text-zinc-900 dark:text-white">{t.common.modernMethods}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-zinc-500 dark:text-zinc-400">{t.languages.academyLocation}:</span>
                        <span className="font-bold text-zinc-900 dark:text-white">{t.common.locationName}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        {t.common.slogan} • {t.hero.limitedSeatsNote}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Skill Levels Covered by Curriculum */}
              <div className="mt-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-base sm:text-lg font-black text-zinc-950 dark:text-white">
                        {t.languages.skillLevelsTitle}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-900 dark:text-amber-300 font-sora font-black text-xs">
                        {activeLang.cefrLevels}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {t.languages.skillLevelsSubtitle}
                    </p>
                  </div>

                  {/* Overall coverage badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs font-bold text-amber-900 dark:text-amber-300 shrink-0 self-start sm:self-auto">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{t.languages.overallCurriculumCoverage}:</span>
                    <span className="font-sora font-black text-amber-600 dark:text-amber-400 text-sm">
                      {activeLang.overallCoveragePercent}%
                    </span>
                  </div>
                </div>

                {/* 4 Animated Circular Progress Bars Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {activeLang.skillCompetencies.map((skill, idx) => (
                    <CircularProgressBar
                      key={skill.id}
                      percent={skill.percent}
                      levelBadge={skill.levelBadge}
                      label={skill.name}
                      description={skill.description}
                      animateKey={activeLang.id}
                      delay={idx * 0.1}
                      size={92}
                      strokeWidth={7.5}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Cards Grid with Lucide Icons and Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {filteredPrograms.map((prog) => {
                const isSelected = prog.id === activeLang.id;
                const visual = languageVisuals[prog.id] || languageVisuals['lang-en'];
                const CardIcon = visual.Icon;

                return (
                  <motion.div
                    key={prog.id}
                    onClick={() => setSelectedLangId(prog.id)}
                    whileHover={{
                      y: -5,
                      scale: 1.025,
                      boxShadow: '0 20px 25px -5px rgba(242, 174, 11, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`p-5 rounded-2xl cursor-pointer border text-start flex flex-col justify-between transition-colors duration-200 ${
                      isSelected
                        ? 'bg-amber-50/70 dark:bg-zinc-900 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-amber-400/50 shadow-sm'
                    }`}
                    id={`quick-card-${prog.id}`}
                  >
                    <div>
                      {/* Top Bar with Icon & Code Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${visual.iconBg} ${visual.iconColor}`}
                          >
                            <CardIcon className="w-4 h-4" />
                          </div>
                          <span className="text-sm" role="img" aria-label={prog.subTitleEn}>
                            {visual.flag}
                          </span>
                          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-md font-sora">
                            {visual.code}
                          </span>
                        </div>

                        <span className="text-xs font-black text-zinc-800 dark:text-zinc-200">
                          {language === 'ar' ? '3000 دج/شهر • 9000 دج' : '3,000/mo • 9,000 DZD'}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-zinc-950 dark:text-white">
                        {prog.title}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                        {prog.description}
                      </p>

                      {/* Animated Circular Progress Bar in quick card */}
                      <div className="my-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                        <CircularProgressBar
                          percent={prog.overallCoveragePercent}
                          levelBadge={prog.cefrLevels}
                          label={isRtl ? 'تغطية المنهاج' : 'Curriculum Depth'}
                          description={isRtl ? `مستويات ${prog.cefrLevels}` : `${prog.cefrLevels} Levels`}
                          compact={true}
                          size={52}
                          strokeWidth={5}
                          animateKey={prog.id}
                          delay={0.15}
                        />
                      </div>
                    </div>

                    <div className="pt-3 mt-1 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                      <span>{t.languages.viewDetails}</span>
                      {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty Search State */
          <div className="p-10 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-zinc-950 dark:text-white">
                {isRtl ? 'لم يتم العثور على دورات مطابقة' : 'No matching courses found'}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                {isRtl
                  ? 'جرب البحث بكلمات أخرى أو قم بإعادة ضبط معايير الفلترة لاستعراض كافة برامج اللغات المتاحة.'
                  : 'Try searching with different keywords or reset your filters to explore all available language tracks.'}
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-colors cursor-pointer"
              >
                {isRtl ? 'إلغاء الفلاتر وعرض كافة البرامج' : 'Reset Filters & View All'}
              </button>
              <a
                href={`tel:${ACADEMY_INFO.phones[0]}`}
                className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors"
              >
                {isRtl ? 'استفسر عن دورة خاصة هاتفياً' : 'Inquire by Phone'}
              </a>
            </div>
          </div>
        )}

        {/* Interactive Advancement Roadmap Link Banner */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-sora font-black text-xs shrink-0 shadow-xs">
              CEFR
            </div>
            <div>
              <h4 className="text-sm font-black text-zinc-950 dark:text-white">
                {isRtl ? 'مسار تطور المستويات وتدرج التلميذ (A1 • A2 • B1 • B2)' : 'Student Level Advancement Pathway (A1 • A2 • B1 • B2)'}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {isRtl ? 'شاهد شريط التقدم التفاعلي والمخرجات التعليمية لكل مستوى أدناه' : 'Explore the animated visual progress bar and key learning outcomes below'}
              </p>
            </div>
          </div>

          <a
            href="#student-advancement"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <span>{isRtl ? 'عرض شريط التقدم' : 'View Progress Bar'}</span>
            {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </a>
        </div>

      </div>
    </section>
  );
};

