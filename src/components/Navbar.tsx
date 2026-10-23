import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ACADEMY_INFO } from '../data/academyData';
import {
  MapPin,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Calendar,
  Award,
  HelpCircle,
  ClipboardList,
  Phone,
  BookOpen,
  Users,
  MessageSquareQuote,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { TopLanguageTicker } from './TopLanguageTicker';
import { MobileDrawerNav } from './MobileDrawerNav';
import { IOSPWAExperience } from './IOSPWAExperience';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenRegister: (program?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const { t, isRtl, language } = useLanguage();
  const isAr = language === 'ar';
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  // Primary desktop navigation links (displayed prominently in the main navigation row)
  const primaryNavLinks = [
    { name: isRtl ? 'الرئيسية' : t.nav.home, path: '/' },
    { name: isRtl ? 'اللغات' : t.nav.languages, path: '/languages' },
    {
      name: isRtl ? 'المناهج والكتب' : (language === 'ar' ? 'المناهج' : 'Curricula & Books'),
      path: '/books',
    },
    { name: isRtl ? 'الدعم المدرسي' : t.nav.academic, path: '/academic-support' },
  ];

  // Secondary institutional & student links (housed in the accessible "المزيد / More" menu)
  const secondaryNavLinks = [
    {
      name: isRtl ? 'الموارد الأكاديمية واللغوية' : 'Academic & Language Resources',
      path: '/resources',
      desc: isRtl ? 'دليل اللغات والدعم المدرسي وأطر CEFR' : 'Curricula, BAC/BEM prep, & CEFR guide',
      icon: BookOpen,
    },
    {
      name: isRtl ? 'مجتمع الناجحين' : 'Success Community',
      path: '/community',
      desc: isRtl ? 'إحصائيات الطلاب وشبكة الفروع الحية' : 'Live campus stats & student network',
      icon: Users,
    },
    {
      name: isRtl ? 'قصص النجاح وتجارب طلابنا' : 'Student Success Stories',
      path: '/testimonials',
      desc: isRtl ? 'تجارب حقيقية موثقة ومشاركة قصتك' : 'Verified reviews & alumni experiences',
      icon: MessageSquareQuote,
    },
    {
      name: isRtl ? 'برامجنا والرزنامة' : (language === 'ar' ? 'الرزنامة والبرامج' : 'Programs & Calendar'),
      path: '/programs',
      desc: isRtl ? 'الجدول السنوي ومواعيد الدورات' : 'Academic calendar and course dates',
      icon: Calendar,
    },
    {
      name: isRtl ? 'لماذا Your Academy؟' : 'Why Your Academy?',
      path: '/why-your-academy',
      desc: isRtl ? 'اعتماداتنا وتفوق تلاميذنا' : 'Accreditations and student achievements',
      icon: Award,
    },
    {
      name: isRtl ? 'الأسئلة الشائعة' : t.nav.faq,
      path: '/faq',
      desc: isRtl ? 'إجابات شاملة عن الدراسة والتسجيل' : 'Frequently asked admission questions',
      icon: HelpCircle,
    },
    {
      name: isRtl ? 'استمارة التسجيل' : 'Registration Guide',
      path: '/registration',
      desc: isRtl ? 'شروط الالتحاق والاستمارة الكاملة' : 'Admission requirements & full form',
      icon: ClipboardList,
    },
  ];

  const isDropdownActive = secondaryNavLinks.some((item) => location.pathname === item.path);
  const isBranchesContactActive =
    location.pathname === '/branches-contact' ||
    location.pathname === '/locations' ||
    location.pathname === '/contact';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm pt-[env(safe-area-inset-top,0px)] bg-[#F7C62F]">
      {/* Top Moving Language Bar Ticker */}
      <TopLanguageTicker />

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 text-zinc-900 border-zinc-200 shadow-lg dark:bg-[#0B0F17]/95 dark:text-white dark:border-amber-500/20 py-2 sm:py-2.5 backdrop-blur-md'
            : 'bg-white/90 text-zinc-900 border-zinc-200/80 dark:bg-[#0B0F17]/85 dark:text-white dark:border-white/10 py-2.5 sm:py-3.5 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-4">
          
          {/* Logo & Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group text-start min-h-[44px] shrink-0"
            id="nav-logo"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs border border-amber-400/40 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src="/assets/your-academy-logo.png"
                alt="Your Academy"
                className="w-full h-full object-contain"
                width="40"
                height="40"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 xl:gap-2">
                <span className="font-extrabold text-sm sm:text-base lg:text-lg xl:text-xl text-zinc-950 dark:text-white tracking-tight font-sora leading-tight whitespace-nowrap">
                  YOUR ACADEMY
                </span>
                
                {/* 2xl Screen: Full branches list */}
                <span className="hidden 2xl:inline-flex items-center gap-1 bg-amber-500/15 text-amber-800 dark:text-amber-400 text-[10px] px-2 py-0.5 rounded-md font-bold border border-amber-500/30 shrink-0 whitespace-nowrap">
                  <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{language === 'ar' ? 'عين الدفلى • البليدة • خميس مليانة • العطاف' : 'Aïn Defla • Blida • Khemis Miliana • El Attaf'}</span>
                </span>

                {/* xl Screen (1280px-1535px): Sleek compact branches badge */}
                <span className="hidden xl:inline-flex 2xl:hidden items-center gap-1 bg-amber-500/15 text-amber-800 dark:text-amber-400 text-[10px] px-1.5 py-0.5 rounded-md font-bold border border-amber-500/30 shrink-0 whitespace-nowrap">
                  <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{language === 'ar' ? '٤ فروع' : '4 Branches'}</span>
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-amber-700 dark:text-amber-400 font-bold leading-none truncate whitespace-nowrap">
                {language === 'ar' ? ACADEMY_INFO.academyNameAr : t.common.academySubtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            {primaryNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `h-9 px-2.5 xl:px-3 rounded-lg text-xs xl:text-sm font-bold whitespace-nowrap transition-all duration-150 flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-950 dark:text-amber-300 font-extrabold border border-amber-500/35 shadow-2xs'
                      : 'text-zinc-700 hover:text-amber-700 dark:text-zinc-300 dark:hover:text-amber-300 hover:bg-zinc-100 dark:hover:bg-white/5'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* DISTINCTIVE HIGHLIGHTED NAVIGATION ITEM FOR UNIFIED BRANCHES & CONTACT */}
            <NavLink
              to="/branches-contact"
              className={`h-9 px-3 xl:px-3.5 rounded-xl text-xs xl:text-sm font-black whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 relative group ${
                isBranchesContactActive
                  ? 'bg-amber-500 text-black border border-amber-600 shadow-md shadow-amber-500/30 ring-2 ring-amber-500/40'
                  : 'bg-amber-400/25 hover:bg-amber-400 text-zinc-950 dark:text-amber-300 dark:hover:text-black hover:text-black border border-amber-500/40 hover:border-amber-500 shadow-xs hover:shadow-md hover:shadow-amber-500/20'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500`}
              id="header-nav-branches-contact"
              title={
                isAr
                  ? 'فروع الأكاديمية الأربعة وقنوات التواصل المباشرة'
                  : 'Our 4 Official Campuses & Direct Contact'
              }
            >
              {/* Gentle Restrained Pulsating Beacon */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75 motion-reduce:hidden" />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 transition-colors ${
                    isBranchesContactActive
                      ? 'bg-black'
                      : 'bg-amber-600 dark:bg-amber-400 group-hover:bg-black'
                  }`}
                />
              </span>

              <MapPin
                className={`w-3.5 h-3.5 shrink-0 transition-colors stroke-[2.5] ${
                  isBranchesContactActive
                    ? 'text-black'
                    : 'text-amber-700 dark:text-amber-400 group-hover:text-black'
                }`}
              />
              <span>{isAr ? 'الفروع والتواصل' : 'Branches & Contact'}</span>
            </NavLink>

            {/* "المزيد / More" Dropdown for Secondary Navigation */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`h-9 px-2.5 xl:px-3 rounded-lg text-xs xl:text-sm font-bold whitespace-nowrap transition-all duration-150 flex items-center justify-center gap-1.5 shrink-0 ${
                  isDropdownActive || dropdownOpen
                    ? 'bg-amber-500/20 text-amber-950 dark:text-amber-300 font-extrabold border border-amber-500/35 shadow-2xs'
                    : 'text-zinc-700 hover:text-amber-700 dark:text-zinc-300 dark:hover:text-amber-300 hover:bg-zinc-100 dark:hover:bg-white/5'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                id="desktop-nav-more-toggle"
              >
                <span>{isRtl ? 'المزيد' : 'More'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    dropdownOpen ? 'rotate-180 text-amber-600 dark:text-amber-400' : 'text-zinc-400'
                  }`}
                />
              </button>

              {/* Dropdown Menu Card */}
              {dropdownOpen && (
                <div
                  className={`absolute top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-[#121722]/95 p-2 shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isRtl ? 'start-0' : 'end-0'
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  tabIndex={-1}
                  id="desktop-nav-more-menu"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800/80 mb-1 flex items-center justify-between">
                    <span>{isRtl ? 'أقسام وخدمات إضافية' : 'More Academy Pages'}</span>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                  </div>

                  <div className="space-y-0.5">
                    {secondaryNavLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-start gap-2.5 p-2 rounded-xl transition-all ${
                            isActive
                              ? 'bg-amber-500/15 text-amber-950 dark:text-amber-300 border border-amber-500/30'
                              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-800 dark:text-zinc-200'
                          }`}
                          role="menuitem"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isActive
                                ? 'bg-amber-500 text-black shadow-xs font-bold'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                          </div>
                          <div className="flex flex-col min-w-0 text-start">
                            <span className="text-xs font-bold leading-tight flex items-center gap-1.5">
                              {item.name}
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block shrink-0" />
                              )}
                            </span>
                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight truncate mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Quick Registration Button inside Dropdown */}
                  <div className="pt-2 mt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenRegister();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-black shrink-0" />
                      <span>{t.common.registerNow}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Controls & CTA (strictly matching lg breakpoint) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher variant="navbar" className="h-10" />

            {/* Theme Toggle Button */}
            <ThemeToggle variant="icon" className="h-10 w-10 shrink-0" />

            {/* Register CTA Button */}
            <Link
              to="/registration"
              className="h-10 px-4 xl:px-5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black font-extrabold text-xs xl:text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 group"
              id="header-register-btn"
            >
              <span>{t.common.registerNow}</span>
              {isRtl ? (
                <ChevronLeft className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
              ) : (
                <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              )}
            </Link>
          </div>

          {/* Mobile / Tablet Header Controls (strictly hidden at lg: 1024px+) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Tablet-only language & theme toggles (640px to 1023px) */}
            <div className="hidden sm:flex items-center">
              <LanguageSwitcher variant="navbar" className="h-10" />
            </div>

            <div className="hidden sm:flex items-center">
              <ThemeToggle variant="icon" className="h-10 w-10 shrink-0" />
            </div>

            {/* Mobile Primary Register CTA (Min 40px/44px touch target) */}
            <button
              onClick={() => onOpenRegister()}
              className="h-10 px-3.5 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black font-black text-xs sm:text-sm shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap touch-manipulation shrink-0"
              id="mobile-register-quick"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black shrink-0 hidden xs:inline" />
              <span>{t.common.registerNow}</span>
            </button>

            {/* Mobile Hamburger / Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 w-10 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center active:scale-95 transition-all touch-manipulation shrink-0"
              aria-label={isRtl ? "القائمة الرئيسية" : "Main Menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-slide-over-drawer"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Over Drawer Navigation (RTL-aware, focus-trapped, touch-friendly) */}
      <MobileDrawerNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenRegister={onOpenRegister}
        onOpenIOSGuide={() => setShowIOSGuide(true)}
      />

      {/* iOS Safari PWA / Add to Home Screen Guided Modal */}
      <IOSPWAExperience
        showGuide={showIOSGuide}
        onCloseGuide={() => setShowIOSGuide(false)}
      />
    </header>
  );
};


