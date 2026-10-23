import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { Home, ArrowLeft, ArrowRight, MapPin, Languages, Phone, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { isRtl, language } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'الصفحة غير موجودة (404)',
    titleEn: 'Page Not Found (404)',
    descAr: 'الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها. يمكنك العودة إلى الصفحة الرئيسية لأكاديمية Your Academy.',
    descEn: 'The page you are looking for does not exist or has been moved. Return to Your Academy home.',
  });

  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-amber-500/20 text-amber-500 border border-amber-500/40 flex items-center justify-center mx-auto shadow-xl">
          <span className="text-4xl font-black font-sora">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
            {isAr ? 'عذراً، الصفحة غير موجودة' : 'Sorry, Page Not Found'}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {isAr
              ? 'يبدو أن الرابط الذي اتبعته غير صحيح أو تم نقل الصفحة إلى قسم آخر من الموقع.'
              : 'The link you followed seems to be invalid or the page has been reorganized.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </Link>
          <Link
            to="/languages"
            className="px-5 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-sm transition-all"
          >
            <Languages className="w-4 h-4 inline mr-1.5" />
            <span>{isAr ? 'برامج اللغات' : 'Languages'}</span>
          </Link>
          <Link
            to="/locations"
            className="px-5 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-sm transition-all"
          >
            <MapPin className="w-4 h-4 inline mr-1.5" />
            <span>{isAr ? 'فروعنا' : 'Locations'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
