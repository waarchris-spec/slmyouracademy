import React from 'react';
import { ACADEMY_INFO } from '../data/academyData';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Target
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AcademicSupportProps {
  onOpenRegister: (program?: string) => void;
}

export const AcademicSupport: React.FC<AcademicSupportProps> = ({ onOpenRegister }) => {
  const { t, isRtl } = useLanguage();

  return (
    <section id="academic" className="py-20 bg-white dark:bg-[#0c0f17] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>{t.academic.sectionBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            {t.academic.title} <span className="text-amber-600 dark:text-amber-400">{t.academic.titleHighlight}</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {t.academic.subtitle}
          </p>
        </div>

        {/* 3 Main Academic Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.academic.programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl text-start"
            >
              <div className="space-y-4">
                {/* Badge & Icon */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-800 dark:text-amber-400 font-bold text-xs">
                    {prog.badge}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-800 text-amber-500 dark:text-amber-400 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl font-black text-zinc-950 dark:text-white">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-bold mt-1">
                    {prog.targetAudience}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {prog.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
                  <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-2">
                    {t.academic.featuresLabel}:
                  </span>
                  {prog.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-800 dark:text-zinc-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800/80 space-y-3">
                <button
                  onClick={() => onOpenRegister(prog.title)}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  id={`academic-btn-${prog.id}`}
                >
                  <span>{t.academic.bookSupportBtn}</span>
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Excellence Commitment Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-amber-50/50 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 border border-amber-300/60 dark:border-zinc-800 shadow-md text-start">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold">
                <Target className="w-4 h-4" />
                <span>{t.academic.boxBadge}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
                {t.academic.boxTitle}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t.academic.boxDescription}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <button
                onClick={() => onOpenRegister(t.academic.boxTitle)}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm text-center shadow-md flex items-center justify-center gap-2"
              >
                <span>{t.academic.boxRegisterBtn}</span>
                {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              <a
                href={`tel:${ACADEMY_INFO.phones[1]}`}
                className="w-full py-3 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{t.academic.boxInquireBtn}: <span dir="ltr">{ACADEMY_INFO.phones[1]}</span></span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

