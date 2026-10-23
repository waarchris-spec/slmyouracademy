import React from 'react';
import {
  UserCheck,
  Sparkles,
  GraduationCap,
  BookOpen,
  Languages,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  UserCheck: <UserCheck className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
  BookOpen: <BookOpen className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
  Languages: <Languages className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
  Award: <Award className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
};

export const PillarsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-20 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.pillars.sectionBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            {t.pillars.title} <span className="text-amber-600 dark:text-amber-400">{t.pillars.titleHighlight}</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {t.pillars.subtitle}
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.pillars.items.map((pillar) => (
            <div
              key={pillar.id}
              className="p-7 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/60 transition-all duration-300 text-start space-y-4 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900 shadow-sm hover:shadow-md"
            >
              <div className="w-13 h-13 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-500/25 transition-all">
                {iconMap[pillar.iconName] || <Sparkles className="w-6 h-6 text-amber-500" />}
              </div>

              <h3 className="text-xl font-black text-zinc-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                {pillar.title}
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

