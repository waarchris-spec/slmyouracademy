import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, Translations, translations } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRtl: boolean;
  t: Translations;
}

const STORAGE_KEY = 'your_academy_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'ar';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'ar' || stored === 'en') {
        return stored;
      }
      return 'ar'; // Default interface language is Arabic
    } catch {
      return 'ar';
    }
  });

  const applyLanguageSettings = (lang: Language) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const isRtl = lang === 'ar';

    root.setAttribute('lang', lang);
    root.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    // Update document title dynamically
    if (lang === 'ar') {
      document.title = 'أكاديمية Your Academy — خميس مليانة، عين الدفلى | تحسين المستوى في اللغات والدعم المدرسي';
    } else {
      document.title = 'Your Academy — Languages & Academic Support | Khemis Miliana, Ain Defla';
    }
  };

  useEffect(() => {
    applyLanguageSettings(language);
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const isRtl = language === 'ar';
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRtl,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
