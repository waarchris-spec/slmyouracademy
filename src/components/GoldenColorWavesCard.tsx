import React from 'react';
import { Sparkles, Award } from 'lucide-react';
import { CAMPAIGN_MOTTO } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';

export const AcademyMottoBanner: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <div
      id="academy-motto-banner"
      style={{ backgroundColor: '#FFB900' }}
      className="relative rounded-3xl p-6 sm:p-10 lg:p-12 px-4 sm:px-8 shadow-xl text-center select-none overflow-hidden transition-all duration-300"
    >
      <div className="relative z-10 max-w-5xl mx-auto space-y-4">
        {/* Motto Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-[#FFB900] text-xs font-black tracking-widest uppercase font-sora shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB900] shrink-0" />
          <span>{t.pillars.boxMottoBadge}</span>
          <Award className="w-3.5 h-3.5 text-[#FFB900] shrink-0" />
        </div>

        {/* Primary English Motto (Single line across screen sizes) */}
        <div className="w-full overflow-hidden flex justify-center py-1">
          <h3
            dir="ltr"
            className="text-[clamp(0.85rem,2.9vw,2.25rem)] font-black text-black font-sora tracking-tight leading-normal whitespace-nowrap text-center select-text"
          >
            {CAMPAIGN_MOTTO.tagline1} · {CAMPAIGN_MOTTO.tagline2}
          </h3>
        </div>

        {/* Arabic Motivational Slogan */}
        <p className="text-lg sm:text-xl md:text-2xl font-black text-black leading-snug">
          {t.common.slogan}
        </p>

        {/* Supporting Educational Footnote */}
        <p className="text-xs sm:text-sm font-bold text-zinc-900/90 pt-1 max-w-xl mx-auto leading-relaxed">
          {t.pillars.boxFootnote}
        </p>
      </div>
    </div>
  );
};

// Backward-compatible alias
export const GoldenColorWavesCard = AcademyMottoBanner;
