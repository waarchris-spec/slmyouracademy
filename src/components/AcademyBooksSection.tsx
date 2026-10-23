import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Info,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { AcademyBook } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BookDetailModal } from './BookDetailModal';
import { INITIAL_ACADEMY_BOOKS } from '../data/defaultBooks';

interface AcademyBooksSectionProps {
  onOpenRegister: (program?: string) => void;
  titleOverride?: string;
  subtitleOverride?: string;
}

/**
 * AcademyBooksSection
 * 
 * Clean, public-facing, display-only 3-column × 2-row desktop grid of six independent book cards.
 * Cover images and book metadata are developer-configured via src/data/defaultBooks.ts.
 * Preserves book cover aspect-ratio (1:1.41 standard book proportion) with realistic 3D spine crease.
 */
export const AcademyBooksSection: React.FC<AcademyBooksSectionProps> = ({
  onOpenRegister,
  titleOverride,
  subtitleOverride,
}) => {
  const { isRtl } = useLanguage();

  // Books data configured by developer in src/data/defaultBooks.ts
  const [books] = useState<AcademyBook[]>(INITIAL_ACADEMY_BOOKS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Detail Modal state
  const [selectedBookForDetail, setSelectedBookForDetail] = useState<AcademyBook | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (book: AcademyBook) => {
    setSelectedBookForDetail(book);
    setIsDetailModalOpen(true);
  };

  // Filter categories
  const categories = [
    { id: 'all', labelAr: 'جميع الكتب والمناهج (6)', labelEn: 'All Books (6)' },
    { id: 'english', labelAr: 'اللغة الإنجليزية', labelEn: 'English Track' },
    { id: 'french', labelAr: 'اللغة الفرنسية', labelEn: 'French Track' },
    { id: 'modern', labelAr: 'اللغات الحية & BAC', labelEn: 'Modern Languages & BAC' },
  ];

  const filteredBooks = books.filter((book) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'english') return book.category.includes('إنجليزية') || book.category.includes('English');
    if (selectedCategory === 'french') return book.category.includes('فرنسية') || book.category.includes('French');
    if (selectedCategory === 'modern') return book.category.includes('الحية') || book.category.includes('الدعم') || book.category.includes('Modern');
    return true;
  });

  return (
    <section
      id="academy-books"
      className="py-12 sm:py-16 relative overflow-hidden scroll-mt-24"
    >
      {/* Subtle brand ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 text-start max-w-2xl">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {isRtl
                  ? 'المناهج التعليمية والكتب الحصرية للأكاديمية'
                  : 'Official Academy Curricula & Textbooks'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{isRtl ? '6 مناهج معتمدة' : '6 Accredited Curricula'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
              {titleOverride || (isRtl ? 'كتب ومناهج' : 'Academy Textbooks &')}{' '}
              <span className="text-amber-500 dark:text-amber-400">
                {subtitleOverride || (isRtl ? 'Your Academy المعتمدة' : 'Official Curriculum')}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              {isRtl
                ? 'حقائب بيداغوجية مصممة خصيصاً من طرف فريق الأكاديمية لترافق كل تلميذ خطوة بخطوة من التأسيس إلى الطلاقة التامة والامتياز في الامتحانات الرسمية.'
                : 'Dedicated pedagogical coursebooks designed exclusively by Your Academy faculty to guide learners from foundation to fluency and exam distinction.'}
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/25 scale-105'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/50'
                }`}
              >
                {isRtl ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            THE 3-COLUMN × 2-ROW GRID OF SIX BOOK CARDS (Desktop 3 cols, Tablet 2, Mobile 1)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredBooks.map((book, index) => {
            return (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-3xl bg-white dark:bg-[#0E1422] border border-zinc-200 dark:border-zinc-800/80 hover:border-amber-400/60 dark:hover:border-amber-400/40 shadow-sm hover:shadow-xl dark:hover:shadow-amber-500/5 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Prominent Book Cover Container (Standard 1:1.41 Aspect Ratio) */}
                <div className="relative pt-6 px-6 pb-2 flex items-center justify-center bg-gradient-to-b from-zinc-100/70 to-transparent dark:from-zinc-900/40 dark:to-transparent">
                  <div
                    onClick={() => handleOpenDetail(book)}
                    className="relative w-full max-w-[240px] aspect-[1/1.41] rounded-2xl overflow-hidden shadow-[0_12px_30px_-8px_rgba(0,0,0,0.3)] dark:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.7)] border-2 border-zinc-200/80 dark:border-amber-400/25 bg-zinc-950 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-6px_rgba(247,198,47,0.25)] cursor-pointer"
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Realistic 3D Spine Crease & Surface Lighting */}
                    <div
                      className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/50 via-white/10 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Badge on cover if exists */}
                    {book.badge && (
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-amber-400 text-black text-[11px] font-black shadow-md z-10 pointer-events-none">
                        {book.badge}
                      </span>
                    )}

                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-xl bg-amber-400 text-black text-xs font-black shadow-lg flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'عرض المنهاج' : 'View Syllabus'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body: Metadata & Info */}
                <div className="p-6 pt-3 flex flex-col flex-grow text-start justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Category & Level (Clean Unboxed Metadata) */}
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">{book.level}</span>
                      <span aria-hidden="true">·</span>
                      <span>{book.category}</span>
                    </div>

                    {/* Book Title */}
                    <h3
                      onClick={() => handleOpenDetail(book)}
                      className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug cursor-pointer line-clamp-2"
                    >
                      {book.titleAr || book.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal line-clamp-3">
                      {book.descriptionAr || book.description}
                    </p>
                  </div>

                  {/* Card Footer: Edition tag & Details Action */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                      <span>{book.edition || 'طبعة 2026/2027'}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenDetail(book)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-400 text-amber-800 dark:text-amber-300 hover:text-black text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isRtl ? 'عرض التفاصيل' : 'Details'}</span>
                      {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Syllabus Detail Modal */}
      <BookDetailModal
        book={selectedBookForDetail}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedBookForDetail(null);
        }}
        onOpenRegister={onOpenRegister}
      />
    </section>
  );
};
