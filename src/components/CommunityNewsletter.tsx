import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BlurUpImage } from './BlurUpImage';
import honorsFeaturedPhoto from '../assets/images/regenerated_image_1790868823344.png';
import honorsThumbPhoto from '../assets/images/regenerated_image_1790867966564.png';
import honorsLightboxPhoto from '../assets/images/regenerated_image_1790868211184.png';
import workshopsFeaturedPhoto from '../assets/images/regenerated_image_1790868531984.png';
import excellencePhoto from '../assets/images/regenerated_image_1790868597743.png';
import {
  Mail,
  Send,
  CheckCircle2,
  Bell,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Award,
  Calendar,
  Phone,
  ArrowRight,
  ArrowLeft,
  Users,
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ACADEMY_INFO } from '../data/academyData';

interface CommunityNewsletterProps {
  onOpenRegister?: (program?: string) => void;
}

export const CommunityNewsletter: React.FC<CommunityNewsletterProps> = ({ onOpenRegister }) => {
  const { t, isRtl } = useLanguage();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [interest, setInterest] = useState<'all' | 'languages' | 'academic'>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedEmail, setConfirmedEmail] = useState('');

  // Image section & gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const galleryImages = [
    {
      id: 'honors',
      src: honorsFeaturedPhoto,
      thumbSrc: honorsThumbPhoto,
      lightboxSrc: honorsLightboxPhoto,
      titleAr: 'حفل تكريم متفوقي البكالوريا وشهادة التعليم المتوسط',
      titleEn: 'Annual Honors Ceremony for BAC & BEM High Achievers',
      descAr: 'تكريم المتفوقين في فروع الأكاديمية بحضور الأساتذة وأولياء الأمور',
      descEn: 'Honoring top academy achievers alongside distinguished faculty and parents',
      categoryAr: 'تكريم ونتائج',
      categoryEn: 'Honors & Results',
      badgeAr: 'توثيق رسمي معتمد',
      badgeEn: 'Official Archive',
    },
    {
      id: 'workshops',
      src: workshopsFeaturedPhoto,
      thumbSrc: workshopsFeaturedPhoto,
      titleAr: 'ورشات اللغات الحية والمحادثة والتواصل',
      titleEn: 'Interactive Language Labs & Immersion Workshops',
      descAr: 'مناهج تطبيقية معتمدة لتطوير الطلاقة في الإنجليزية والفرنسية والألمانية',
      descEn: 'Certified applied curricula for English, French, and German fluency',
      categoryAr: 'ورشات اللغات',
      categoryEn: 'Language Labs',
      badgeAr: 'تدريب تفاعلي',
      badgeEn: 'Active Learning',
    },
    {
      id: 'excellence',
      src: excellencePhoto,
      thumbSrc: excellencePhoto,
      titleAr: 'متابعة بيداغوجية مستمرة وإرشاد أكاديمي لكل تلميذ',
      titleEn: 'Continuous Pedagogical Mentorship & Academic Guidance',
      descAr: 'برامج دعم مخصصة تواكب التلاميذ طيلة الموسم الدراسي لتحقيق أعلى المعدلات',
      descEn: 'Personalized academic tracking throughout the entire year for peak performance',
      categoryAr: 'التفوق والمتابعة',
      categoryEn: 'Excellence & Mentorship',
      badgeAr: 'نسب نجاح استثنائية',
      badgeEn: 'Proven Results',
    },
  ];

  const currentImg = galleryImages[activeImageIndex];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') {
        isRtl ? handleNextImage() : handlePrevImage();
      }
      if (e.key === 'ArrowRight') {
        isRtl ? handlePrevImage() : handleNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, isRtl]);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setErrorMessage(
        isRtl
          ? 'يرجى إدخال عنوان بريد إلكتروني صالح للمتابعة.'
          : 'Please enter a valid email address to continue.'
      );
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate reliable subscription registration
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedEmail(email.trim());
      setIsSubmitted(true);
      try {
        localStorage.setItem('ya_community_subscribed', 'true');
        localStorage.setItem('ya_community_email', email.trim());
      } catch {
        // Safe fallback if local storage is restricted
      }
    }, 600);
  };

  const handleReset = () => {
    setEmail('');
    setFullName('');
    setIsSubmitted(false);
    setErrorMessage('');
  };

  const perks = [
    {
      icon: Bell,
      text: t.newsletter.perk1,
    },
    {
      icon: BookOpen,
      text: t.newsletter.perk2,
    },
    {
      icon: Calendar,
      text: t.newsletter.perk3,
    },
    {
      icon: Award,
      text: t.newsletter.perk4,
    },
  ];

  return (
    <section
      id="academic-community"
      className="relative py-20 lg:py-28 overflow-hidden bg-white dark:bg-[#070A10] border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors"
    >
      {/* Subtle Background Ambiance & Watermark Logo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle radial glow */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-amber-600/5 dark:bg-amber-400/10 rounded-full blur-3xl" />

        {/* Large subtle watermark of the official logo on the side */}
        <div
          className={`absolute -bottom-16 ${
            isRtl ? '-left-20' : '-right-20'
          } w-80 h-80 opacity-[0.03] dark:opacity-[0.06] select-none pointer-events-none transform rotate-12`}
        >
          <img
            src="/assets/your-academy-logo.png"
            alt="Your Academy Watermark"
            className="w-full h-full object-contain filter grayscale"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card Container */}
        <div className="relative rounded-3xl bg-zinc-50 dark:bg-gradient-to-br dark:from-[#0E1422] dark:to-[#0A0D14] border-2 border-amber-500/30 dark:border-amber-400/30 shadow-2xl p-6 sm:p-10 lg:p-14 overflow-hidden">
          
          {/* Subtle decorative geometric corner accent */}
          <div
            className={`absolute top-0 ${
              isRtl ? 'left-0' : 'right-0'
            } w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-3xl pointer-events-none`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Column 1: Context, Badges, Perks */}
            <div className="lg:col-span-7 space-y-6 text-start">
              
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 text-black text-xs font-black tracking-wide shadow-sm">
                  <Users className="w-3.5 h-3.5" />
                  <span>{t.newsletter.sectionBadge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{t.common.cityState}</span>
                </span>
              </div>

              {/* Title & Brand Recognition */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white leading-tight tracking-tight">
                  {t.newsletter.title}{' '}
                  <span className="text-amber-600 dark:text-amber-400">
                    {t.newsletter.titleHighlight}
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal">
                  {t.newsletter.subtitle}
                </p>
              </div>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {perks.map((perk, idx) => {
                  const Icon = perk.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 shadow-xs"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                        {perk.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Direct administrative assistance note */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold">{t.newsletter.directCallPrompt}</span>
                <a
                  href={`tel:${ACADEMY_INFO.phones[0]}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30 transition-colors"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{ACADEMY_INFO.phones[0]}</span>
                </a>
              </div>

              {/* Image Section: Authentic Academy Life, Facilities & Student Celebrations */}
              <div
                className="pt-4 space-y-3"
                role="region"
                aria-label={isRtl ? 'معرض صور وفعاليات الأكاديمية' : 'Academy Visual Life & Gallery'}
              >
                {/* Image Section Header */}
                <div className="flex items-center justify-between pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      <Camera className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
                        <span>{isRtl ? 'معرض الحياة الأكاديمية والأنشطة' : 'Academy Life & Campus Gallery'}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {isRtl
                          ? 'توثيق حي للفعاليات، القاعات الذكية، وحفلات تكريم المتفوقين'
                          : 'Documented events, smart classrooms, and student honors'}
                      </p>
                    </div>
                  </div>

                  {/* Photo counter badge */}
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 font-mono">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>

                {/* Main Featured Photo Box (Targeted selected div enhanced to interactive image showcase) */}
                <div className="rounded-2xl overflow-hidden border-2 border-amber-500/40 dark:border-amber-400/30 shadow-xl relative group bg-black/5 dark:bg-black/40">
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                    title={isRtl ? 'انقر لتكبير الصورة في وضع ملء الشاشة' : 'Click to expand image full screen'}
                  >
                    <BlurUpImage
                      key={currentImg.id}
                      src={currentImg.src}
                      alt={isRtl ? currentImg.titleAr : currentImg.titleEn}
                      className="w-full h-52 sm:h-64 md:h-72 object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      aspectRatioClass="aspect-[16/10]"
                      priority={activeImageIndex === 0}
                    />

                    {/* Top Scrim Overlay: Badges & Fullscreen Trigger */}
                    <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between pointer-events-none z-10 bg-gradient-to-b from-black/65 via-black/25 to-transparent">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[11px] font-bold shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{isRtl ? currentImg.badgeAr : currentImg.badgeEn}</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        className="pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 hover:bg-amber-500 hover:text-black transition-colors backdrop-blur-md text-white border border-white/20 text-xs font-semibold shadow-sm active:scale-95"
                        aria-label={isRtl ? 'تكبير الصورة' : 'Expand photo'}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">{isRtl ? 'تكبير' : 'Full View'}</span>
                      </button>
                    </div>

                    {/* Left / Right Carousel Controls */}
                    <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          isRtl ? handleNextImage() : handlePrevImage();
                        }}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-amber-500 hover:text-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg active:scale-95"
                        aria-label={isRtl ? 'الصورة التالية' : 'Previous photo'}
                      >
                        <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          isRtl ? handlePrevImage() : handleNextImage();
                        }}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-amber-500 hover:text-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg active:scale-95"
                        aria-label={isRtl ? 'الصورة السابقة' : 'Next photo'}
                      >
                        <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                      </button>
                    </div>

                    {/* Bottom Scrim: Category Tag, Title & Description */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-3.5 sm:p-4 pointer-events-none z-10 flex flex-col justify-end text-start">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider">
                          {isRtl ? currentImg.categoryAr : currentImg.categoryEn}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-sm">
                        {isRtl ? currentImg.titleAr : currentImg.titleEn}
                      </h4>
                      <p className="text-[11px] text-zinc-300 font-normal leading-normal mt-0.5 line-clamp-1 drop-shadow-sm">
                        {isRtl ? currentImg.descAr : currentImg.descEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Navigation Selector Strip */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {galleryImages.map((img, idx) => {
                    const isActive = idx === activeImageIndex;
                    return (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative rounded-xl overflow-hidden aspect-[16/10] border-2 transition-all duration-200 text-start group/thumb ${
                          isActive
                            ? 'border-amber-500 ring-2 ring-amber-400/40 shadow-md scale-[1.02]'
                            : 'border-zinc-200 dark:border-zinc-800 opacity-70 hover:opacity-100 hover:border-amber-400/60'
                        }`}
                        aria-label={`View photo ${idx + 1}: ${isRtl ? img.titleAr : img.titleEn}`}
                      >
                        <img
                          src={img.thumbSrc || img.src}
                          alt=""
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 transition-colors ${
                            isActive
                              ? 'bg-amber-500/10'
                              : 'bg-black/30 group-hover/thumb:bg-transparent'
                          }`}
                        />
                        <div className="absolute bottom-1 inset-x-1 pointer-events-none">
                          <span
                            className={`block truncate text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded ${
                              isActive
                                ? 'bg-amber-500 text-black font-extrabold'
                                : 'bg-black/75 text-zinc-200 backdrop-blur-xs'
                            }`}
                          >
                            {isRtl ? img.categoryAr : img.categoryEn}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Column 2: Interactive Subscription Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white dark:bg-[#0B0F17] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl relative">
                
                {/* Official Logo Header on Card */}
                <div className="flex items-center gap-3 pb-5 border-b border-zinc-200 dark:border-zinc-800/80 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center border border-amber-400/40 shadow-sm shrink-0 overflow-hidden">
                    <BlurUpImage
                      src="/assets/your-academy-logo.png"
                      alt="Your Academy Official Logo"
                      className="w-full h-full object-contain"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="text-start">
                    <span className="font-extrabold text-base text-zinc-950 dark:text-white font-sora block leading-tight">
                      YOUR ACADEMY
                    </span>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                      {t.common.academySubtitle}
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="signup-form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      onSubmit={handleSubmit}
                      className="space-y-4 text-start"
                      id="academic-community-form"
                    >
                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold">
                          {errorMessage}
                        </div>
                      )}

                      {/* Full Name (Optional) */}
                      <div>
                        <label
                          htmlFor="newsletter-name"
                          className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1"
                        >
                          {isRtl ? 'الاسم الكامل' : 'Full Name'}{' '}
                          <span className="text-zinc-400 font-normal">
                            ({t.modal.optional})
                          </span>
                        </label>
                        <input
                          id="newsletter-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={t.newsletter.namePlaceholder}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-sm outline-none transition-colors"
                        />
                      </div>

                      {/* Email Address (Required) */}
                      <div>
                        <label
                          htmlFor="newsletter-email"
                          className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1"
                        >
                          {isRtl ? 'البريد الإلكتروني' : 'Email Address'}{' '}
                          <span className="text-amber-600 dark:text-amber-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="newsletter-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errorMessage) setErrorMessage('');
                            }}
                            placeholder={t.newsletter.emailPlaceholder}
                            dir="ltr"
                            className={`w-full ${
                              isRtl ? 'pr-4 pl-10' : 'pl-4 pr-10'
                            } py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-white text-sm outline-none transition-colors`}
                          />
                          <Mail
                            className={`w-4 h-4 text-zinc-400 absolute top-3.5 ${
                              isRtl ? 'left-3' : 'right-3'
                            } pointer-events-none`}
                          />
                        </div>
                      </div>

                      {/* Interest Choice Segment */}
                      <div>
                        <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-2">
                          {t.newsletter.interestLabel}
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          <label
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              interest === 'all'
                                ? 'bg-amber-500/15 border-amber-500/60 text-zinc-950 dark:text-white font-bold'
                                : 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name="interest"
                              value="all"
                              checked={interest === 'all'}
                              onChange={() => setInterest('all')}
                              className="accent-amber-500 w-4 h-4"
                            />
                            <span>{t.newsletter.interestAll}</span>
                          </label>

                          <label
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              interest === 'languages'
                                ? 'bg-amber-500/15 border-amber-500/60 text-zinc-950 dark:text-white font-bold'
                                : 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name="interest"
                              value="languages"
                              checked={interest === 'languages'}
                              onChange={() => setInterest('languages')}
                              className="accent-amber-500 w-4 h-4"
                            />
                            <span>{t.newsletter.interestLanguages}</span>
                          </label>

                          <label
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              interest === 'academic'
                                ? 'bg-amber-500/15 border-amber-500/60 text-zinc-950 dark:text-white font-bold'
                                : 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name="interest"
                              value="academic"
                              checked={interest === 'academic'}
                              onChange={() => setInterest('academic')}
                              className="accent-amber-500 w-4 h-4"
                            />
                            <span>{t.newsletter.interestAcademic}</span>
                          </label>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        id="newsletter-submit-btn"
                        className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/60 text-black font-extrabold text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>{t.newsletter.submittingBtn}</span>
                          </>
                        ) : (
                          <>
                            <span>{t.newsletter.submitBtn}</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {/* Privacy & Anti-Spam Guarantee */}
                      <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 text-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{t.newsletter.privacyNote}</span>
                      </div>
                    </motion.form>
                  ) : (
                    /* Success Confirmation State */
                    <motion.div
                      key="success-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-4 text-center space-y-5"
                    >
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 text-amber-500 dark:text-amber-400 flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                      </div>

                      <div className="space-y-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black border border-emerald-500/30 inline-block">
                          {isRtl ? 'تم تأكيد انضمامك' : 'Confirmed Member'}
                        </span>
                        <h3 className="text-xl font-black text-zinc-950 dark:text-white">
                          {t.newsletter.successTitle}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {t.newsletter.successMessage}
                        </p>
                      </div>

                      {/* Summary Box */}
                      <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1.5 text-start">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                            {isRtl ? 'البريد المسجل:' : 'Registered Email:'}
                          </span>
                          <span className="font-bold text-zinc-950 dark:text-white" dir="ltr">
                            {confirmedEmail}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                            {isRtl ? 'الاهتمام المختار:' : 'Selected Track:'}
                          </span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">
                            {interest === 'languages'
                              ? t.newsletter.interestLanguages
                              : interest === 'academic'
                              ? t.newsletter.interestAcademic
                              : t.newsletter.interestAll}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 flex flex-col gap-2.5">
                        {onOpenRegister && (
                          <button
                            type="button"
                            onClick={() => onOpenRegister()}
                            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                          >
                            <span>{t.common.registerNow}</span>
                            {isRtl ? (
                              <ArrowLeft className="w-4 h-4" />
                            ) : (
                              <ArrowRight className="w-4 h-4" />
                            )}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={handleReset}
                          className="w-full py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-colors"
                        >
                          {t.newsletter.resetBtn}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="p-4 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black text-xs font-black">
                    {isRtl ? currentImg.categoryAr : currentImg.categoryEn}
                  </span>
                  <span className="text-zinc-400 text-xs font-mono">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close image preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image Container */}
              <div className="relative aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={currentImg.lightboxSrc || currentImg.src}
                  alt={isRtl ? currentImg.titleAr : currentImg.titleEn}
                  className="w-full h-full object-contain"
                />

                {/* Left/Right Buttons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    isRtl ? handleNextImage() : handlePrevImage();
                  }}
                  className="absolute left-3 w-11 h-11 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all shadow-xl active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    isRtl ? handlePrevImage() : handleNextImage();
                  }}
                  className="absolute right-3 w-11 h-11 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all shadow-xl active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 rtl:rotate-180" />
                </button>
              </div>

              {/* Lightbox Footer Caption */}
              <div className="p-4 sm:p-5 bg-zinc-900/90 border-t border-zinc-800 text-start">
                <h4 className="text-base font-bold text-white">
                  {isRtl ? currentImg.titleAr : currentImg.titleEn}
                </h4>
                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                  {isRtl ? currentImg.descAr : currentImg.descEn}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
