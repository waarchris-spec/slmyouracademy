import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Sparkles,
  Share2,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { BlurUpImage } from './BlurUpImage';
import { useLanguage } from '../context/LanguageContext';

interface MobileDrawerNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: (program?: string) => void;
  onOpenIOSGuide: () => void;
}

export const MobileDrawerNav: React.FC<MobileDrawerNavProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
  onOpenIOSGuide,
}) => {
  const { t, isRtl, language } = useLanguage();
  const isAr = language === 'ar';
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const navLinks = [
    { name: isRtl ? 'الرئيسية' : t.nav.home, path: '/' },
    {
      name: isRtl ? 'الفروع والتواصل' : 'Branches & Contact',
      path: '/branches-contact',
      isFeatured: true,
    },
    { name: isRtl ? 'برامج اللغات' : (isAr ? 'اللغات' : 'Language Programs'), path: '/languages' },
    { name: isRtl ? 'المناهج والكتب' : (language === 'ar' ? 'المناهج' : 'Books & Curriculum'), path: '/books' },
    { name: isRtl ? 'الدعم المدرسي' : t.nav.academic, path: '/academic-support' },
    {
      name: isRtl ? 'الموارد الأكاديمية' : 'Academic Resources',
      path: '/resources',
    },
    {
      name: isRtl ? 'مجتمع الناجحين' : 'Success Community',
      path: '/community',
    },
    {
      name: isRtl ? 'قصص النجاح وتجارب طلابنا' : 'Student Success Stories',
      path: '/testimonials',
    },
    {
      name: isRtl ? 'برامجنا والرزنامة' : (language === 'ar' ? 'الرزنامة' : 'Programs & Calendar'),
      path: '/programs',
    },
    { name: isRtl ? 'لماذا Your Academy؟' : 'Why Your Academy?', path: '/why-your-academy' },
    { name: isRtl ? 'التسجيل والعروض' : 'Registration & Offers', path: '/registration' },
    { name: isRtl ? 'الأسئلة الشائعة' : t.nav.faq, path: '/faq' },
  ];

  const branchShortcuts = [
    {
      name: isRtl ? 'عين الدفلى — الرئيسي' : 'Aïn Defla — Main Branch',
      tag: isRtl ? 'الرئيسي' : 'MAIN',
      address: isRtl ? 'حي الإخوة شوال، طريق مسجد مالك ابن أنس' : 'Hay El Ikhwa Chaoual, Aïn Defla',
      exactAddress: isRtl
        ? 'حي الإخوة شوال، طريق مسجد مالك ابن أنس، عين الدفلى، الجزائر 44000'
        : 'Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas, Aïn Defla, Algeria, 44000',
      phone: '0552 40 40 59',
      isMain: true,
    },
    {
      name: isRtl ? 'فرع خميس مليانة' : 'Khemis Miliana Branch',
      tag: '44000',
      address: isRtl ? 'تحت محل وزير القلايل مقابل زواق المصور' : 'Under Wazir El Qlayel, Khemis Miliana',
      exactAddress: isRtl
        ? 'تحت محل وزير القلايل مقابل زواق المصور، خميس مليانة، الجزائر 44000'
        : 'Under Wazir El Qlayel store, opposite Zouak Photographer, Khemis Miliana, Algeria, 44000',
      phone: '0551 40 40 59',
      isMain: false,
    },
    {
      name: isRtl ? 'فرع العطاف' : 'El Attaf Branch',
      tag: '44000',
      address: isRtl ? 'العطاف، الجزائر 44000' : 'El Attaf, Algeria, 44000',
      exactAddress: 'El Attaf, Algeria, 44000',
      phone: '0670 40 66 59',
      isMain: false,
    },
    {
      name: isRtl ? 'فرع البليدة' : 'Blida Branch',
      tag: '09000',
      address: isRtl ? 'البليدة، الجزائر 09000' : 'Blida, Algeria 09000',
      exactAddress: isRtl ? 'البليدة، الجزائر 09000' : 'Blida, Algeria, 09000',
      phone: '0560 40 40 00',
      isMain: false,
    },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'أكاديمية Your Academy',
          text: 'أكاديمية Your Academy — تعليم اللغات والدعم المدرسي بعين الدفلى، البليدة، وخميس مليانة',
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      onOpenIOSGuide();
    }
  };

  // Focus trapping & Escape key listener
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus close button initially
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab' && drawerRef.current) {
          const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        previouslyFocusedElementRef.current?.focus();
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-slide-over-drawer"
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto visible'
          : 'opacity-0 pointer-events-none invisible delay-300'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Dimmed Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Over Drawer Container (RTL: right-to-left, LTR: left-to-right) */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={isRtl ? 'قائمة التصفح الرئيسية' : 'Mobile Navigation Menu'}
        className={`fixed inset-y-0 ${
          isRtl ? 'right-0' : 'left-0'
        } w-full max-w-[340px] sm:max-w-sm bg-white dark:bg-[#0B0F17] shadow-2xl border-l border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full overflow-hidden transform transition-transform duration-300 ease-out ${
          isOpen
            ? 'translate-x-0'
            : isRtl
            ? 'translate-x-full'
            : '-translate-x-full'
        }`}
      >
        {/* Top Header with Brand, Theme Toggle & Close Button */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0 bg-white dark:bg-[#0B0F17] pt-[max(1rem,env(safe-area-inset-top,0px))]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-xs border border-amber-400/40 overflow-hidden">
              <BlurUpImage
                src="/assets/your-academy-logo.png"
                alt="Your Academy"
                className="w-full h-full object-contain"
                containerClassName="w-full h-full"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-black text-sm text-zinc-950 dark:text-white font-sora truncate leading-tight">
                YOUR ACADEMY
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold truncate leading-none mt-0.5">
                {t.common.academySubtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle variant="icon" />
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="h-10 w-10 min-h-[40px] min-w-[40px] rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              aria-label={isRtl ? 'إغلاق القائمة' : 'Close navigation menu'}
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Independently Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3.5 space-y-4 text-start pb-6">
          {/* Quick Language Segmented Control */}
          <LanguageSwitcher variant="mobile" />

          {/* Navigation Links (Consistent 46px height, subtle active state, aligned Arabic text) */}
          <nav aria-label={isRtl ? 'روابط التصفح' : 'Navigation links'} className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group min-h-[46px] h-[46px] px-3.5 rounded-xl flex items-center justify-between text-sm transition-all active:scale-[0.98] ${
                    isActive
                      ? 'bg-amber-500/15 dark:bg-amber-500/20 text-amber-950 dark:text-amber-300 font-extrabold border border-amber-500/30 dark:border-amber-400/30 shadow-xs'
                      : (link as any).isFeatured
                      ? 'bg-amber-400/10 dark:bg-amber-500/10 text-amber-900 dark:text-amber-300 font-bold border border-amber-500/25'
                      : 'text-zinc-800 dark:text-zinc-200 font-semibold hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 active:bg-zinc-200/80 dark:active:bg-zinc-800 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Distinct active leading indicator or featured dot */}
                      {isActive ? (
                        <span className="w-1.5 h-4.5 rounded-full bg-amber-500 shrink-0" />
                      ) : (link as any).isFeatured ? (
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75 motion-reduce:hidden" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600 dark:bg-amber-400" />
                        </span>
                      ) : null}

                      {(link as any).isFeatured && (
                        <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      )}
                      <span className="truncate">{link.name}</span>
                    </div>

                    {isRtl ? (
                      <ChevronLeft
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-zinc-400 group-hover:-translate-x-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                        }`}
                      />
                    ) : (
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-zinc-400 group-hover:translate-x-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                        }`}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Dedicated Branch Shortcuts Box */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-amber-500/25 space-y-2.5">
            <div className="flex items-center justify-between">
              <NavLink
                to="/branches-contact"
                onClick={onClose}
                className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 hover:underline"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{isAr ? 'فروعنا المعتمدة والتواصل' : 'Branches & Contact'}</span>
              </NavLink>
              <span className="text-[10px] text-zinc-500 font-bold">4 {isRtl ? 'فروع' : 'Branches'}</span>
            </div>

            <div className="space-y-2">
              {branchShortcuts.map((b) => (
                <div
                  key={b.name}
                  className="p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2 shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-zinc-950 dark:text-white truncate">
                        {b.name}
                      </span>
                      {b.isMain && (
                        <span className="text-[9px] bg-amber-500 text-black px-1.5 py-0.2 rounded font-black shrink-0">
                          {b.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      {b.address}
                    </p>
                  </div>

                  {/* Dual Action: Map & Call (Min 40x40px touch targets) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.exactAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] min-w-[40px] h-10 w-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-amber-600 dark:text-amber-400 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-colors active:scale-95"
                      title={isRtl ? 'عرض على الخريطة' : 'View on Google Maps'}
                      aria-label={`${b.name} - Google Maps`}
                    >
                      <MapPin className="w-4 h-4 stroke-[2.2]" />
                    </a>

                    <a
                      href={`tel:${b.phone.replace(/\s/g, '')}`}
                      className="min-h-[40px] min-w-[40px] h-10 w-10 rounded-lg bg-amber-400/20 hover:bg-amber-400 text-amber-800 dark:text-amber-300 hover:text-black border border-amber-400/30 flex items-center justify-center transition-colors active:scale-95"
                      title={b.phone}
                      aria-label={`${isRtl ? 'اتصال بـ' : 'Call'} ${b.name}`}
                    >
                      <Phone className="w-4 h-4 stroke-[2.2]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* iOS Web App Installation & Native Share (Min 44px touch target) */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                onClose();
                onOpenIOSGuide();
              }}
              className="min-h-[44px] h-11 py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/30 font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              id="mobile-drawer-ios-install"
              aria-label={isRtl ? 'تثبيت الأكاديمية كـ تطبيق' : 'Add to Home Screen'}
            >
              <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">{isRtl ? 'تثبيت كـ تطبيق' : 'Install App'}</span>
            </button>

            <button
              onClick={handleShare}
              className="min-h-[44px] h-11 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              id="mobile-drawer-share"
              aria-label={isRtl ? 'مشاركة الأكاديمية' : 'Share Academy'}
            >
              <Share2 className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="truncate">{isRtl ? 'مشاركة' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Action Bar: Fixed Footer in Drawer with Safe-Area, never obscures content */}
        <div className="p-3.5 sm:p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 shrink-0 bg-white dark:bg-[#0B0F17] pb-[max(0.85rem,env(safe-area-inset-bottom,0px))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
          {/* Main Register CTA: Full width, prominent yellow/orange, centered text & icon, never overlaps */}
          <button
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="w-full h-11 min-h-[44px] px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:brightness-105 active:scale-[0.98] text-zinc-950 font-black text-sm flex items-center justify-center gap-2 border border-amber-300/60 dark:border-amber-300/40 shadow-md shadow-amber-500/25 transition-all cursor-pointer"
            id="mobile-drawer-register"
          >
            <Sparkles className="w-4 h-4 fill-zinc-950 shrink-0" />
            <span>{t.common.registerNow}</span>
            {isRtl ? (
              <ChevronLeft className="w-4 h-4 shrink-0 opacity-80" />
            ) : (
              <ChevronRight className="w-4 h-4 shrink-0 opacity-80" />
            )}
          </button>

          {/* 4 Branch Call Buttons: 2-column x 2-row grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Row 1, Col 1: Aïn Defla — عين الدفلى */}
            <a
              href="tel:0552404059"
              className="h-10 min-h-[40px] px-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-200 dark:border-zinc-700/80 active:scale-95 transition-all shadow-xs"
              aria-label={isRtl ? 'اتصال بفرع عين الدفلى: 0552 40 40 59' : 'Call Aïn Defla branch: 0552 40 40 59'}
              title="0552 40 40 59"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{isRtl ? 'عين الدفلى' : 'Aïn Defla'}</span>
            </a>

            {/* Row 1, Col 2: Blida — البليدة */}
            <a
              href="tel:0560404000"
              className="h-10 min-h-[40px] px-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-200 dark:border-zinc-700/80 active:scale-95 transition-all shadow-xs"
              aria-label={isRtl ? 'اتصال بفرع البليدة: 0560 40 40 00' : 'Call Blida branch: 0560 40 40 00'}
              title="0560 40 40 00"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{isRtl ? 'البليدة' : 'Blida'}</span>
            </a>

            {/* Row 2, Col 1: Khemis Miliana — خميس مليانة */}
            <a
              href="tel:0551404059"
              className="h-10 min-h-[40px] px-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-200 dark:border-zinc-700/80 active:scale-95 transition-all shadow-xs"
              aria-label={isRtl ? 'اتصال بفرع خميس مليانة: 0551 40 40 59' : 'Call Khemis Miliana branch: 0551 40 40 59'}
              title="0551 40 40 59"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{isRtl ? 'خميس مليانة' : 'Khemis Miliana'}</span>
            </a>

            {/* Row 2, Col 2: El Attaf — العطاف */}
            <a
              href="tel:0670406659"
              className="h-10 min-h-[40px] px-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-200 dark:border-zinc-700/80 active:scale-95 transition-all shadow-xs"
              aria-label={isRtl ? 'اتصال بفرع العطاف: 0670 40 66 59' : 'Call El Attaf branch: 0670 40 66 59'}
              title="0670 40 66 59"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{isRtl ? 'العطاف' : 'El Attaf'}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
