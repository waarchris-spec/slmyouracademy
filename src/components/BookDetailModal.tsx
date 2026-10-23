import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, CheckCircle2, Award, Clock, ArrowRight, ArrowLeft, Bookmark, Layers, Sparkles } from 'lucide-react';
import { AcademyBook } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BookDetailModalProps {
  book: AcademyBook | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: (program?: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  onOpenRegister,
}) => {
  const { isRtl } = useLanguage();

  if (!isOpen || !book) return null;

  const handleEnrollWithBook = () => {
    onClose();
    onOpenRegister(book.titleAr || book.title);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0D131F] rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-10 my-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">
                  {book.category}
                </span>
                <span className="text-sm font-black text-zinc-900 dark:text-white">
                  {book.level}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Book Cover Visual (Prominent original presentation) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-[280px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-2 border-zinc-200/80 dark:border-amber-400/20 bg-zinc-950 aspect-[1/1.41] flex items-center justify-center">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* 3D Spine & Lighting Sheen */}
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/50 via-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                {book.badge && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black shadow-lg">
                    {book.badge}
                  </span>
                )}
              </div>

              {/* Meta tags below image */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs text-zinc-500 dark:text-zinc-400">
                {book.edition && (
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 font-medium">
                    {book.edition}
                  </span>
                )}
                {book.pages && (
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 font-medium">
                    {book.pages}
                  </span>
                )}
              </div>
            </div>

            {/* Book Information & Syllabus */}
            <div className="md:col-span-7 space-y-6 text-start">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-black mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{book.level}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white leading-tight">
                  {book.titleAr || book.title}
                </h3>
                <p className="text-xs sm:text-sm font-sora font-semibold text-amber-600 dark:text-amber-400 mt-1">
                  {book.title}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                {book.descriptionAr || book.description}
              </p>

              {/* Target Audience */}
              {book.targetAudience && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <span className="font-black text-amber-900 dark:text-amber-300 block mb-0.5">
                    {isRtl ? 'الفئة المستهدفة:' : 'Target Audience:'}
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {book.targetAudience}
                  </span>
                </div>
              )}

              {/* Syllabus / Features list */}
              {book.features && book.features.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span>{isRtl ? 'محاور المنهاج ومحتوى الكتاب:' : 'Syllabus Highlights:'}</span>
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    {book.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleEnrollWithBook}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm transition-all shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isRtl ? 'حجز مقعد والتسجيل مع هذا المقرر' : 'Enroll With This Curriculum'}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3.5 px-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-colors cursor-pointer"
                >
                  {isRtl ? 'إغلاق' : 'Close'}
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
