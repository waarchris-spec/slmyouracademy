import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { ACADEMY_INFO, academyCampaign } from '../data/academyData';
import { Link } from 'react-router-dom';
import {
  Quote,
  Star,
  CheckCircle2,
  Sparkles,
  Plus,
  X,
  Send,
  Languages,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquareQuote,
  Award,
  ShieldCheck,
  Video,
  ExternalLink,
  Building2,
  Info,
} from 'lucide-react';

interface SuccessStoriesPageProps {
  onOpenRegister: (program?: string) => void;
}

interface TestimonialItem {
  id: string;
  studentName: string;
  program: string;
  category: 'languages' | 'academic';
  quote: string;
  outcome: string;
  period: string;
  rating: number;
  initials: string;
  isCustom?: boolean;
}

const STORAGE_KEY = 'your_academy_user_testimonials';

export const SuccessStoriesPage: React.FC<SuccessStoriesPageProps> = ({ onOpenRegister }) => {
  const { t, isRtl, language } = useLanguage();
  const isAr = language === 'ar';
  const NextArrow = isRtl ? ChevronLeft : ChevronRight;

  usePageMeta({
    titleAr: 'قصص النجاح وتجارب طلابنا — تجارب حقيقية في Your Academy',
    titleEn: 'Success Stories & Student Experiences — Your Academy',
    descAr: 'تجارب حقيقية وشهادات موثقة لطلاب أكاديمية Your Academy في مسارات اللغات الأجنبية وتحضير شهادتي البكالوريا وBEM في عين الدفلى، البليدة، وخميس مليانة.',
    descEn: 'Authentic student experiences and documented reviews from Your Academy learners across foreign language courses and BAC/BEM exam preparation.',
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'languages' | 'academic'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userStories, setUserStories] = useState<TestimonialItem[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    program: '',
    category: 'languages' as 'languages' | 'academic',
    quote: '',
    outcome: '',
    rating: 5,
  });
  const [formError, setFormError] = useState('');

  // Load custom stories from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUserStories(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Combined stories: default genuine translated items + user-created stories
  const allStories: TestimonialItem[] = [
    ...t.testimonials.items,
    ...userStories,
  ];

  const filteredStories = allStories.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const handleOpenModal = () => {
    setFormData({
      name: '',
      program: isAr ? 'اللغة الإنجليزية (English)' : 'English Language (English)',
      category: 'languages',
      quote: '',
      outcome: '',
      rating: 5,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) {
      setFormError(t.testimonials.validationError);
      return;
    }

    const initials = formData.name
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase() || '')
      .join('');

    const newStory: TestimonialItem = {
      id: `custom-${Date.now()}`,
      studentName: formData.name.trim(),
      program: formData.program || (isAr ? 'برنامج Your Academy' : 'Your Academy Program'),
      category: formData.category,
      quote: formData.quote.trim(),
      outcome: formData.outcome.trim() || (isAr ? 'تحسن وتطور مستمر' : 'Continuous progress & growth'),
      period: isAr ? `موسم ${academyCampaign.academicYear}` : `${academyCampaign.academicYear} Season`,
      rating: formData.rating,
      initials: initials || 'YA',
      isCustom: true,
    };

    const updated = [newStory, ...userStories];
    setUserStories(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }

    setIsModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Page Header */}
      <PageHeader
        badge={isAr ? 'تجارب حقيقية تعكس جودة التعليم' : 'Real Experiences, Genuine Success'}
        badgeIcon={<MessageSquareQuote className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'قصص النجاح وتجارب طلابنا' : 'Success Stories' }]}
        title={isAr ? 'قصص النجاح وتجارب طلابنا في' : 'Real Success Stories of Learners at'}
        titleHighlight="YOUR ACADEMY"
        description={
          isAr
            ? 'نعتز بثقة طلابنا وأولياء أمورهم. اطلع على تجارب حقيقية وشهادات موثقة توضح كيف ساعد أسلوبنا التطبيقي والمتابعة الفردية على كسر حاجز اللغات والتفوق في الامتحانات الرسمية.'
            : 'Explore genuine student reviews, feedback, and milestones showcasing the tangible outcomes of our hands-on pedagogy and dedicated individualized academic support.'
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenModal}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'شارك تجربتك في الأكاديمية' : 'Share Your Experience'}</span>
            </button>
            <button
              onClick={() => onOpenRegister()}
              className="px-5 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{isAr ? 'احجز مقعدك وابدأ قصة نجاحك' : 'Begin Your Success Story'}</span>
            </button>
          </div>
        }
      />

      {/* Success Notification Toast */}
      {showSuccessToast && (
        <div className="max-w-md mx-auto px-4">
          <div className="p-4 rounded-2xl bg-emerald-500 text-white shadow-xl flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{t.testimonials.successMessage}</span>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Authenticity & Editorial Transparency Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-start">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-black text-zinc-950 dark:text-white">
                {isAr ? 'التزام الشفافية والمصداقية' : 'Authenticity & Trust Commitment'}
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {isAr
                  ? 'كافة الآراء والتجارب المعروضة تمثل انطباعات حقيقية لتلاميذ انتسبوا لبرامج Your Academy الميدانية في فروعنا الرسمية.'
                  : 'All reviews and testimonials published represent authentic feedback from students enrolled in our official branch programs.'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-white dark:bg-zinc-900 border border-amber-500/30 px-3 py-1 rounded-full text-amber-800 dark:text-amber-400 shrink-0">
            {allStories.length} {isAr ? 'شهادة مسجلة' : 'Documented Reviews'}
          </span>
        </div>
      </section>

      {/* 3. Filter Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-amber-400 text-black shadow-md font-black scale-105'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <span>{t.testimonials.filterAll}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-mono">
              {allStories.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('languages')}
            className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeFilter === 'languages'
                ? 'bg-amber-400 text-black shadow-md font-black scale-105'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{t.testimonials.filterLanguages}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-mono">
              {allStories.filter((s) => s.category === 'languages').length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('academic')}
            className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeFilter === 'academic'
                ? 'bg-amber-400 text-black shadow-md font-black scale-105'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.testimonials.filterAcademic}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-mono">
              {allStories.filter((s) => s.category === 'academic').length}
            </span>
          </button>
        </div>
      </section>

      {/* 4. Testimonials Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredStories.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl hover:border-amber-400 transition-all text-start flex flex-col justify-between space-y-5 relative group"
            >
              <div className="space-y-4">
                {/* Header: Student Info & Rating */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-800 dark:text-amber-300 font-black font-sora flex items-center justify-center text-sm shadow-inner shrink-0">
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-zinc-950 dark:text-white leading-tight">
                        {item.studentName}
                      </h4>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium block">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Program Tag & Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-sora">
                    {item.program}
                  </span>
                  {item.isCustom ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
                      {isAr ? 'تجربة مضافة حديثاً' : 'Newly Added'}
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                      {t.testimonials.verifiedBadge}
                    </span>
                  )}
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-amber-500/20 absolute -top-2 -start-2 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal pt-1 relative z-10">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Concrete Outcome Highlight Footer */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  {isAr ? 'النتيجة والأثر الملموس:' : 'Key Progress Outcome:'}
                </span>
                <p className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span>{item.outcome}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Video / Media Testimonials Placeholder Zone (Grounded & Authentic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6 text-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white">
                {isAr ? 'فيديوهات وانطباعات طلابنا من قاعات التدريس' : 'Student Video Interviews & Classroom Moments'}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {isAr ? 'مقاطع مسجلة رسمياً بموافقة التلاميذ وأولياء الأمور' : 'Authorized clips from our campus lecture halls'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="aspect-video rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center p-4 text-center">
                <Video className="w-8 h-8 text-amber-500/60 mb-2" />
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  {isAr ? 'مقابلة تلميذ بكالوريا متفوق (عين الدفلى)' : 'BAC High Achiever Interview (Aïn Defla)'}
                </span>
                <span className="text-[10px] text-zinc-400 mt-1">
                  {isAr ? 'يتم التحديث دورياً بموافقة التلميذ' : 'Updated periodically upon student approval'}
                </span>
              </div>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                {isAr ? 'منهجية حل مواضيع العلوم الطبيعية والرياضيات' : 'Methodology for Natural Sciences & Math'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="aspect-video rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center p-4 text-center">
                <Video className="w-8 h-8 text-amber-500/60 mb-2" />
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  {isAr ? 'جلسة محادثة إنجليزية تفاعلية (البليدة)' : 'English Interactive Speaking Session (Blida)'}
                </span>
                <span className="text-[10px] text-zinc-400 mt-1">
                  {isAr ? 'مقتطفات من أفواج المحادثة التطبيقية' : 'Excerpts from speaking cohorts'}
                </span>
              </div>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                {isAr ? 'كسر حاجز الخجل والحديث بالإنجليزية بطلاقة' : 'Overcoming hesitance & fluent speaking'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="aspect-video rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center p-4 text-center">
                <Video className="w-8 h-8 text-amber-500/60 mb-2" />
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  {isAr ? 'حفل توزيع الشهادات المعتمدة (خميس مليانة)' : 'Accredited Certificate Delivery Ceremony'}
                </span>
                <span className="text-[10px] text-zinc-400 mt-1">
                  {isAr ? 'توثيق رسمي لتسليم الشهادات البريطانية' : 'Official graduation highlights'}
                </span>
              </div>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                {isAr ? 'فرحة الطلاب بالحصول على شهادات إنهاء المستويات' : 'Graduates celebrating level completion'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-amber-500 text-black text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-black text-amber-400 text-xs font-black uppercase font-sora">
              {academyCampaign.academicYear}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              {t.testimonials.ctaBoxTitle}
            </h2>
            <p className="text-xs sm:text-sm font-medium opacity-90 max-w-xl mx-auto leading-relaxed">
              {t.testimonials.ctaBoxSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-black hover:bg-zinc-900 text-white font-black text-sm sm:text-base shadow-xl active:scale-95 transition-transform cursor-pointer"
            >
              {t.testimonials.ctaBoxBtn}
            </button>
            <Link
              to="/branches-contact"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-zinc-100 text-black font-black text-sm sm:text-base active:scale-95 transition-transform"
            >
              {isAr ? 'الفروع والتواصل المباشر' : 'Branches & Contact'}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Modal for Sharing a Genuine Testimonial */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />

          <div
            className="relative z-10 w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6 text-start max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 id="modal-title" className="text-lg font-black text-zinc-950 dark:text-white">
                  {t.testimonials.modalTitle}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {t.testimonials.modalSubtitle}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitStory} className="space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 font-bold">
                  {formError}
                </div>
              )}

              <div>
                <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1" htmlFor="st-name">
                  {t.testimonials.fullNameLabel} *
                </label>
                <input
                  id="st-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.testimonials.fullNamePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm outline-none focus:border-amber-500 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                    {t.testimonials.categoryLabel} *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs font-bold outline-none focus:border-amber-500 text-zinc-900 dark:text-white"
                  >
                    <option value="languages">{t.testimonials.categoryLanguages}</option>
                    <option value="academic">{t.testimonials.categoryAcademic}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1" htmlFor="st-program">
                    {t.testimonials.programLabel}
                  </label>
                  <input
                    id="st-program"
                    type="text"
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    placeholder={isAr ? 'مثال: اللغة الإنجليزية B1' : 'e.g. English B1'}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs outline-none focus:border-amber-500 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1" htmlFor="st-quote">
                  {t.testimonials.quoteLabel} *
                </label>
                <textarea
                  id="st-quote"
                  required
                  rows={3}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder={t.testimonials.quotePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs outline-none focus:border-amber-500 resize-none text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1" htmlFor="st-outcome">
                  {t.testimonials.outcomeLabel}
                </label>
                <input
                  id="st-outcome"
                  type="text"
                  value={formData.outcome}
                  onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                  placeholder={t.testimonials.outcomePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs outline-none focus:border-amber-500 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold hover:bg-zinc-200"
                >
                  {t.testimonials.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black flex items-center gap-1.5 shadow-md"
                >
                  <Send className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.testimonials.submitBtn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
