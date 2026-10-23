import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  MessageSquareQuote
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ACADEMY_INFO, academyCampaign } from '../data/academyData';

interface TestimonialsProps {
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

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenRegister }) => {
  const { t, isRtl, language } = useLanguage();
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

  // Combined stories: default translated items + user-created stories
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
      program: isRtl ? 'اللغة الإنجليزية (English)' : 'English Language (English)',
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
      program: formData.program || (isRtl ? 'برنامج Your Academy' : 'Your Academy Program'),
      category: formData.category,
      quote: formData.quote.trim(),
      outcome: formData.outcome.trim() || (isRtl ? 'تحسن وتطور مستمر' : 'Continuous progress & growth'),
      period: isRtl ? `موسم ${academyCampaign.academicYear}` : `${academyCampaign.academicYear} Season`,
      rating: formData.rating,
      initials: initials || 'YA',
      isCustom: true,
    };

    const updated = [newStory, ...userStories];
    setUserStories(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // LocalStorage fallback
    }

    setIsModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4500);
  };

  const handleDeleteCustomStory = (id: string) => {
    const updated = userStories.filter((s) => s.id !== id);
    setUserStories(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // LocalStorage fallback
    }
  };

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-zinc-50/60 dark:bg-[#070B11] relative overflow-hidden transition-colors border-t border-zinc-200/80 dark:border-zinc-800/80"
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/25 text-amber-800 dark:text-amber-400 text-xs font-black tracking-wide">
              <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{t.testimonials.sectionBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
              {t.testimonials.title}{' '}
              <span className="text-amber-600 dark:text-amber-400 relative inline-block">
                {t.testimonials.titleHighlight}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {t.testimonials.subtitle}
            </p>
          </div>

          {/* Action to Add / Share Story */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={handleOpenModal}
              id="open-share-testimonial-btn"
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-amber-500/40 text-zinc-900 dark:text-white hover:bg-amber-500 hover:text-black dark:hover:bg-amber-400 dark:hover:text-black font-bold text-xs flex items-center gap-2 shadow-sm transition-all duration-200"
            >
              <Plus className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:text-black" />
              <span>{t.testimonials.shareBtn}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <button
            onClick={() => setActiveFilter('all')}
            id="filter-all-testimonials"
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeFilter === 'all'
                ? 'bg-amber-500 dark:bg-amber-400 text-black shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            <span>{t.testimonials.filterAll}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/15 font-bold">
              {allStories.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('languages')}
            id="filter-languages-testimonials"
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeFilter === 'languages'
                ? 'bg-amber-500 dark:bg-amber-400 text-black shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{t.testimonials.filterLanguages}</span>
          </button>

          <button
            onClick={() => setActiveFilter('academic')}
            id="filter-academic-testimonials"
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeFilter === 'academic'
                ? 'bg-amber-500 dark:bg-amber-400 text-black shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.testimonials.filterAcademic}</span>
          </button>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccessToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between gap-3 shadow-md"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.testimonials.successMessage}</span>
              </div>
              <button
                onClick={() => setShowSuccessToast(false)}
                className="text-emerald-700 dark:text-emerald-300 hover:opacity-75"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredStories.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="group relative bg-white dark:bg-[#0F141F] rounded-3xl p-6 sm:p-7 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-amber-400/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              id={`testimonial-card-${item.id}`}
            >
              {/* Watermark Quote Icon */}
              <Quote
                className={`absolute top-6 ${
                  isRtl ? 'left-6' : 'right-6'
                } w-10 h-10 text-amber-500/10 dark:text-amber-400/10 group-hover:text-amber-500/20 transition-colors pointer-events-none`}
              />

              <div className="space-y-4">
                {/* Header: Student Info & Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {/* Initials Avatar */}
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-900 dark:text-amber-300 font-extrabold text-sm font-sora shrink-0">
                      {item.initials}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base text-zinc-950 dark:text-white">
                          {item.studentName}
                        </h4>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span>{t.testimonials.verifiedBadge}</span>
                        </span>
                      </div>

                      <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                        {item.program}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 shrink-0 pt-1" dir="ltr">
                    {Array.from({ length: item.rating }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote Content */}
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed font-normal pt-1">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Card Footer: Key Outcome & Season Tag */}
              <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 font-bold">
                  <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>{item.outcome}</span>
                </div>

                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <span>{item.period}</span>
                  {item.isCustom && (
                    <button
                      onClick={() => handleDeleteCustomStory(item.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 text-[11px] underline"
                      title="حذف هذا الرأي المضاف محلياً"
                    >
                      {isRtl ? 'حذف' : 'Remove'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Motivation Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white border-2 border-amber-500/40 shadow-xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-start max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-black">
                {t.common.openForYear}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {t.testimonials.ctaBoxTitle}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {t.testimonials.ctaBoxSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => onOpenRegister()}
                id="testimonials-cta-register-btn"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                <span>{t.testimonials.ctaBoxBtn}</span>
                {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              <a
                href={`tel:${ACADEMY_INFO.phones[0]}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span dir="ltr">{ACADEMY_INFO.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Share / Add Story Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg my-8 rounded-3xl bg-white dark:bg-[#0F141F] border-2 border-amber-500/40 p-6 sm:p-7 shadow-2xl text-start transition-colors"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-5 ${
                  isRtl ? 'left-5' : 'right-5'
                } p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors`}
                aria-label={t.testimonials.cancelBtn}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1.5 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-[11px] font-black">
                  <Sparkles className="w-3 h-3" />
                  <span>{t.testimonials.editableBadge}</span>
                </div>
                <h3 className="text-2xl font-black text-zinc-950 dark:text-white">
                  {t.testimonials.modalTitle}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {t.testimonials.modalSubtitle}
                </p>
              </div>

              {/* Form Error */}
              {formError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-bold">
                  {formError}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmitStory} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5">
                    {t.testimonials.fullNameLabel} <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.testimonials.fullNamePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>

                {/* Category & Program */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5">
                      {t.testimonials.categoryLabel}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as 'languages' | 'academic',
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs outline-none focus:border-amber-500"
                    >
                      <option value="languages">{t.testimonials.categoryLanguages}</option>
                      <option value="academic">{t.testimonials.categoryAcademic}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5">
                      {t.testimonials.programLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      placeholder={isRtl ? 'مثال: اللغة الإنجليزية (عرض 9000 دج)' : 'e.g. English (9000 DZD Offer)'}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Quote */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5">
                    {t.testimonials.quoteLabel} <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={t.testimonials.quotePlaceholder}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                  />
                </div>

                {/* Outcome */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5">
                    {t.testimonials.outcomeLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.testimonials.outcomePlaceholder}
                    value={formData.outcome}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs outline-none focus:border-amber-500"
                  />
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1.5">
                    {t.testimonials.ratingLabel}
                  </label>
                  <div className="flex items-center gap-2" dir="ltr">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <button
                        type="button"
                        key={starNum}
                        onClick={() => setFormData({ ...formData, rating: starNum })}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            starNum <= formData.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-zinc-300 dark:text-zinc-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <span>{t.testimonials.submitBtn}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs transition-colors"
                  >
                    {t.testimonials.cancelBtn}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
