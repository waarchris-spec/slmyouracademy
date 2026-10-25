import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { AcademyBook } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BookDetailModal } from './BookDetailModal';
import { INITIAL_ACADEMY_BOOKS } from '../data/defaultBooks';
import { OfficialBookCover } from './OfficialBookCover';

interface AcademyBooksSectionProps {
  onOpenRegister: (program?: string) => void;
  titleOverride?: string;
  subtitleOverride?: string;
}

/**
 * AcademyBooksSection
 * 
 * Re-designed Books section combining:
 * 1. DESIGN REFERENCE (IMAGE 1):
 *    - Deep dark navy/black background.
 *    - Premium navy cards with refined rounded corners and subtle golden borders.
 *    - Language and category filter tabs above the grid with live counters.
 *    - Clean typography, metadata rows, and dedicated "عرض التفاصيل" (View Details) button.
 * 
 * 2. OFFICIAL BOOK CONTENT (IMAGE 2):
 *    - Official YOUR ENGLISH (Levels 1 to 6) — Student's Book & Workbook series.
 *    - Authentic Your Academy branding, level numbers, and author attribution.
 *    - Verified French and Spanish/German academy textbooks.
 */
export const AcademyBooksSection: React.FC<AcademyBooksSectionProps> = ({
  onOpenRegister,
  titleOverride,
  subtitleOverride,
}) => {
  const { isRtl } = useLanguage();

  // Books data initialized from official series
  const [books] = useState<AcademyBook[]>(INITIAL_ACADEMY_BOOKS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Detail Modal state
  const [selectedBookForDetail, setSelectedBookForDetail] = useState<AcademyBook | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (book: AcademyBook) => {
    setSelectedBookForDetail(book);
    setIsDetailModalOpen(true);
  };

  // Compute live counts for each filter category
  const englishBooks = books.filter(
    (b) => b.category.includes('إنجليزية') || b.category.includes('English')
  );
  const frenchBooks = books.filter(
    (b) => b.category.includes('فرنسية') || b.category.includes('French')
  );
  const modernBooks = books.filter(
    (b) => b.category.includes('الحية') || b.category.includes('Modern')
  );
  const bacBooks = books.filter(
    (b) =>
      b.badge?.includes('BAC') ||
      b.badge?.includes('بكالوريا') ||
      b.category.includes('بكالوريا') ||
      b.level.includes('BAC')
  );

  // Filter categories matching layout of Image 1
  const categories = [
    {
      id: 'all',
      labelAr: `جميع الكتب والمناهج (${books.length})`,
      labelEn: `All Books (${books.length})`,
      count: books.length,
    },
    {
      id: 'english',
      labelAr: `اللغة الإنجليزية (${englishBooks.length})`,
      labelEn: `English Track (${englishBooks.length})`,
      count: englishBooks.length,
    },
    {
      id: 'french',
      labelAr: `اللغة الفرنسية (${frenchBooks.length})`,
      labelEn: `French Track (${frenchBooks.length})`,
      count: frenchBooks.length,
    },
    {
      id: 'modern',
      labelAr: `اللغات الحية (${modernBooks.length})`,
      labelEn: `Modern Languages (${modernBooks.length})`,
      count: modernBooks.length,
    },
    {
      id: 'bac',
      labelAr: `تحضير البكالوريا (${bacBooks.length})`,
      labelEn: `BAC Preparation (${bacBooks.length})`,
      count: bacBooks.length,
    },
  ];

  const filteredBooks = books.filter((book) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'english') {
      return book.category.includes('إنجليزية') || book.category.includes('English');
    }
    if (selectedCategory === 'french') {
      return book.category.includes('فرنسية') || book.category.includes('French');
    }
    if (selectedCategory === 'modern') {
      return book.category.includes('الحية') || book.category.includes('Modern');
    }
    if (selectedCategory === 'bac') {
      return (
        book.badge?.includes('BAC') ||
        book.badge?.includes('بكالوريا') ||
        book.category.includes('بكالوريا') ||
        book.level.includes('BAC')
      );
    }
    return true;
  });

  return (
    <section
      id="academy-books"
      className="py-12 sm:py-16 relative overflow-hidden scroll-mt-24 bg-[#070A12] dark:bg-[#070A12] text-white"
    >
      {/* Subtle brand ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 text-start max-w-2xl">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-bold text-amber-400">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isRtl
                  ? 'المناهج التعليمية والكتب الحصرية للأكاديمية'
                  : 'Official Academy Curricula & Textbooks'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{isRtl ? `${books.length} مناهج معتمدة` : `${books.length} Accredited Curricula`}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {titleOverride || (isRtl ? 'كتب ومناهج' : 'Academy Textbooks &')}{' '}
              <span className="text-amber-400">
                {subtitleOverride || (isRtl ? 'Your Academy المعتمدة' : 'Official Curriculum')}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {isRtl
                ? 'حقائب بيداغوجية مصممة خصيصاً من طرف فريق الأكاديمية لترافق كل تلميذ خطوة بخطوة من التأسيس إلى الطلاقة التامة والامتياز في الامتحانات الرسمية.'
                : 'Dedicated pedagogical coursebooks designed exclusively by Your Academy faculty to guide learners from foundation to fluency and exam distinction.'}
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-[#0E1526] border border-zinc-800 text-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-start">
              <span className="font-bold text-white block">
                {isRtl ? 'سلسلة YOUR ENGLISH' : 'YOUR ENGLISH Series'}
              </span>
              <span className="text-zinc-400 text-[11px]">
                {isRtl ? 'المستويات 1 إلى 6 كاملة' : 'Levels 1 through 6'}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs (Visual presentation inspired by Image 1) */}
        <div
          className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto scrollbar-none"
          role="tablist"
          aria-label={isRtl ? 'أقسام الكتب والمناهج' : 'Book categories'}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25 scale-[1.02]'
                    : 'bg-[#101726] text-zinc-300 border border-zinc-800 hover:border-amber-400/50 hover:text-white'
                }`}
              >
                <span>{isRtl ? cat.labelAr : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            BOOK CARDS GRID (Desktop 3 cols, Tablet 2, Mobile 1)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book, index) => {
              return (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group relative rounded-3xl bg-[#0E1526] border border-zinc-800/80 hover:border-amber-400/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Top Book Cover Showcase (Aspect Ratio 1:1.41) */}
                  <div className="relative pt-6 px-6 pb-3 flex items-center justify-center bg-gradient-to-b from-[#141D33] to-transparent">
                    <div
                      onClick={() => handleOpenDetail(book)}
                      className="cursor-pointer transition-transform duration-300 group-hover:-translate-y-1 w-full max-w-[230px]"
                    >
                      <OfficialBookCover book={book} isRtl={isRtl} />
                    </div>
                  </div>

                  {/* Card Body: Verified Metadata & Information */}
                  <div className="p-6 pt-2 flex flex-col flex-grow text-start justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Category & Level Header */}
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="text-amber-400 font-bold">{book.level}</span>
                        <span className="text-zinc-600" aria-hidden="true">·</span>
                        <span className="text-zinc-400 truncate">{book.category}</span>
                      </div>

                      {/* Official Book Title */}
                      <h3
                        onClick={() => handleOpenDetail(book)}
                        className="text-base sm:text-lg font-black text-white group-hover:text-amber-400 transition-colors leading-snug cursor-pointer line-clamp-2"
                      >
                        {book.titleAr || book.title}
                      </h3>

                      {/* English Subtitle for Bilingual Clarity */}
                      <p className="text-[11px] font-semibold text-zinc-400 font-sora truncate" dir="ltr">
                        {book.title}
                      </p>

                      {/* Short Verified Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal line-clamp-3">
                        {book.descriptionAr || book.description}
                      </p>
                    </div>

                    {/* Card Footer: Edition Tag & Details Action Button */}
                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-zinc-400 font-medium truncate">
                        <span>{book.edition || 'طبعة 2026 / 2027 المعتمدة'}</span>
                      </div>

                      {/* Details Button matching Image 1 */}
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(book)}
                        className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-400 text-amber-400 hover:text-black font-black text-xs border border-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
                      >
                        <span>{isRtl ? 'عرض التفاصيل' : 'Details'}</span>
                        {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Filter State Fallback */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#0E1526] border border-zinc-800">
            <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">
              {isRtl ? 'لا توجد مناهج متطابقة مع هذا القسم حالياً' : 'No books in this category'}
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              {isRtl ? 'يمكنك استعراض جميع كتب ومناهج الأكاديمية الرسمية' : 'View all official academy books'}
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-black"
            >
              {isRtl ? 'عرض جميع الكتب' : 'View All Books'}
            </button>
          </div>
        )}

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
