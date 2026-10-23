import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.sectionBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            {t.faq.title} <span className="text-amber-600 dark:text-amber-400">{t.faq.titleHighlight}</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {t.faq.items.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-zinc-900 border-amber-500/60 dark:border-amber-400/50 shadow-md'
                    : 'bg-white/80 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                >
                  <span className="font-extrabold text-base sm:text-lg text-zinc-950 dark:text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-amber-400 text-black rotate-180'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-start text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-4 whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

