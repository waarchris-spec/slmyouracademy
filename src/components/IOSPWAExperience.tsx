import React, { useState, useEffect } from 'react';
import { Share2, PlusSquare, X, Smartphone, ArrowDown, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface IOSPWAExperienceProps {
  showGuide: boolean;
  onCloseGuide: () => void;
}

export const IOSPWAExperience: React.FC<IOSPWAExperienceProps> = ({ showGuide, onCloseGuide }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(isIOSDevice);

    // Detect standalone mode (already added to home screen)
    const standalone =
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);
  }, []);

  if (!showGuide) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? 'تثبيت الأكاديمية على الآيفون' : 'Install on iPhone'}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#0F141F] rounded-t-3xl sm:rounded-3xl border-t sm:border border-amber-500/30 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl text-start space-y-5 animate-in slide-in-from-bottom duration-250"
      >
        {/* Close Button */}
        <button
          onClick={onCloseGuide}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors active:scale-95"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 pr-8 rtl:pr-0 rtl:pl-8">
          <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center border border-amber-400/50 shadow-md shrink-0 overflow-hidden">
            <img
              src="/assets/your-academy-logo.png"
              alt="Your Academy"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-[10px] font-black">
              <Sparkles className="w-3 h-3" />
              <span>{isAr ? 'تطبيق الويب على iOS' : 'iOS Web App'}</span>
            </div>
            <h3 className="text-lg font-black text-zinc-950 dark:text-white tracking-tight mt-0.5">
              {isAr ? 'تثبيت الأكاديمية على الآيفون' : 'Add to iPhone Home Screen'}
            </h3>
          </div>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {isAr
            ? 'احصل على تجربة تطبيق سريعة وكاملة الشاشة على جهاز الآيفون الخاص بك دون الحاجة لتنزيل أي شيء من App Store.'
            : 'Enjoy a fast, full-screen app experience on your iPhone with direct access to registrations and branch updates.'}
        </p>

        {/* 3 Step Guide */}
        <div className="space-y-3 pt-1">
          {/* Step 1 */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-black text-sm">
              1
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold text-zinc-950 dark:text-white block">
                {isAr ? 'اضغط على زر المشاركة' : 'Tap the Share Button'}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px] block mt-0.5">
                {isAr
                  ? 'في الشريط السفلي لمتصفح Safari اضغط على أيقونة المشاركة [ ⎋ ]'
                  : 'In the bottom toolbar of Safari, tap the Share icon [ ⎋ ]'}
              </span>
            </div>
            <Share2 className="w-5 h-5 text-blue-500 shrink-0" />
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 font-black text-sm">
              2
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold text-zinc-950 dark:text-white block">
                {isAr ? 'اختر "إضافة إلى الصفحة الرئيسية"' : 'Select "Add to Home Screen"'}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px] block mt-0.5">
                {isAr
                  ? 'مرر للأسفل واضغط على خيار "إضافة إلى الشاشة الرئيسية" [ ➕ ]'
                  : 'Scroll down and tap "Add to Home Screen" [ ➕ ]'}
              </span>
            </div>
            <PlusSquare className="w-5 h-5 text-amber-500 shrink-0" />
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-black text-sm">
              3
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold text-zinc-950 dark:text-white block">
                {isAr ? 'اضغط على "إضافة" في الأعلى' : 'Tap "Add" in Top Corner'}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px] block mt-0.5">
                {isAr
                  ? 'ستظهر أيقونة الأكاديمية الرسمية على شاشة هاتفك الرئيسية كأي تطبيق أصلي'
                  : 'Your Academy icon will appear on your iPhone home screen'}
              </span>
            </div>
            <Smartphone className="w-5 h-5 text-emerald-500 shrink-0" />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onCloseGuide}
            className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-black text-sm shadow-md transition-all active:scale-[0.98]"
          >
            {isAr ? 'فهمت، شكراً' : 'Got it, thank you'}
          </button>
        </div>

      </div>
    </div>
  );
};
