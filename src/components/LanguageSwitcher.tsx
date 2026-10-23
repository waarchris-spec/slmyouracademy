import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'mobile' | 'footer';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { language, setLanguage, toggleLanguage, isRtl } = useLanguage();

  if (variant === 'mobile') {
    return (
      <div
        className={`p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 space-y-2 text-right ${className}`}
        role="region"
        aria-label="اختيار لغة الموقع / Website Language"
        id="mobile-language-switcher"
      >
        <div className="flex items-center justify-between px-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>{isRtl ? 'لغة الواجهة' : 'Interface Language'}</span>
          </div>
          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-sora font-semibold uppercase">
            {language === 'ar' ? 'العربية' : 'English'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setLanguage('ar')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              language === 'ar'
                ? 'bg-amber-400 text-black shadow-sm font-black'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
            aria-pressed={language === 'ar'}
            id="mobile-lang-ar"
          >
            {language === 'ar' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            <span>العربية (AR)</span>
          </button>

          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 font-sora ${
              language === 'en'
                ? 'bg-amber-400 text-black shadow-sm font-black'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
            aria-pressed={language === 'en'}
            id="mobile-lang-en"
          >
            {language === 'en' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            <span>English (EN)</span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div
        className={`inline-flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs shadow-sm ${className}`}
        role="group"
        aria-label="تبديل اللغة / Switch language"
        id="footer-language-switcher"
      >
        <div className="px-2 text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
        </div>
        <button
          type="button"
          onClick={() => setLanguage('ar')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
            language === 'ar'
              ? 'bg-amber-400 text-black font-black'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
          }`}
          aria-pressed={language === 'ar'}
        >
          العربية
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors font-sora ${
            language === 'en'
              ? 'bg-amber-400 text-black font-black'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
          }`}
          aria-pressed={language === 'en'}
        >
          English
        </button>
      </div>
    );
  }

  // Desktop Navbar Segmented Switcher
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 shadow-xs transition-all hover:border-amber-400/40 shrink-0 ${className}`}
      role="group"
      aria-label="تبديل لغة الموقع / Toggle language"
      id="navbar-language-switcher"
    >
      <div className="h-8 px-2 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`h-8 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center whitespace-nowrap ${
          language === 'ar'
            ? 'bg-amber-400 text-black font-black shadow-xs'
            : 'text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
        }`}
        aria-pressed={language === 'ar'}
        title="العربية"
        id="navbar-lang-ar"
      >
        عربي
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`h-8 px-2.5 rounded-lg text-xs font-bold transition-all font-sora flex items-center justify-center whitespace-nowrap ${
          language === 'en'
            ? 'bg-amber-400 text-black font-black shadow-xs'
            : 'text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
        }`}
        aria-pressed={language === 'en'}
        title="English"
        id="navbar-lang-en"
      >
        EN
      </button>
    </div>
  );
};
