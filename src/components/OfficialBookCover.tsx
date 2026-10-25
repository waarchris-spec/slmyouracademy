import React, { useState } from 'react';
import { Headphones, MessageSquare, PenTool } from 'lucide-react';
import { AcademyBook } from '../types';

interface OfficialBookCoverProps {
  book: AcademyBook;
  className?: string;
  showHoverHint?: boolean;
  isRtl?: boolean;
}

const LEVEL_COLORS: Record<number, { bg: string; text: string; ring: string }> = {
  1: { bg: 'bg-emerald-500', text: 'text-white', ring: 'ring-emerald-400/40' },
  2: { bg: 'bg-blue-600', text: 'text-white', ring: 'ring-blue-400/40' },
  3: { bg: 'bg-purple-600', text: 'text-white', ring: 'ring-purple-400/40' },
  4: { bg: 'bg-teal-600', text: 'text-white', ring: 'ring-teal-400/40' },
  5: { bg: 'bg-sky-500', text: 'text-white', ring: 'ring-sky-400/40' },
  6: { bg: 'bg-rose-600', text: 'text-white', ring: 'ring-rose-400/40' },
};

/**
 * OfficialBookCover
 *
 * Renders authentic Your Academy book presentation:
 * - If the book belongs to the official "YOUR ENGLISH — Student's Book & Workbook" series (Levels 1-6),
 *   it faithfully renders the official cover artwork shown in the official reference:
 *   - "Baccalauréat" top badge
 *   - "YOUR [N] ENGLISH — Student's Book & Workbook" with verified level color badges
 *   - Dark grey 11 banner
 *   - Warm golden yellow lower block with "YOUR" watermark
 *   - Listen, Speak, Write skill modules
 *   - Author attribution: "Cours Elaboré: Ahmed Salim"
 * - For other verified academy books (French, Spanish & German), it renders the original cover image
 *   with realistic 3D spine crease and subtle paper lighting.
 */
export const OfficialBookCover: React.FC<OfficialBookCoverProps> = ({
  book,
  className = '',
  showHoverHint = true,
  isRtl = true,
}) => {
  const [imageError, setImageError] = useState(false);

  // Check if book belongs to the official YOUR ENGLISH series (Levels 1 to 6)
  const isYourEnglishSeries =
    book.id.startsWith('book-your-english-') ||
    book.title.toUpperCase().includes('YOUR') && book.title.toUpperCase().includes('ENGLISH');

  const match = book.title.match(/YOUR\s*(\d+)\s*ENGLISH/i);
  const levelNum = match ? parseInt(match[1], 10) : book.order || 1;
  const levelStyle = LEVEL_COLORS[levelNum] || LEVEL_COLORS[1];

  return (
    <div
      className={`relative w-full aspect-[1/1.41] rounded-2xl overflow-hidden shadow-[0_14px_36px_-6px_rgba(0,0,0,0.4)] dark:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.8)] border-2 border-zinc-200/80 dark:border-amber-400/25 bg-zinc-950 select-none ${className}`}
    >
      {/* If it has an uploaded image AND it's not failing to load, render the image */}
      {book.coverImage && !imageError && !isYourEnglishSeries ? (
        <img
          src={book.coverImage}
          alt={book.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        /* Official YOUR ENGLISH Cover Design directly reflecting IMAGE 2 */
        <div className="w-full h-full flex flex-col justify-between bg-white text-zinc-950 font-sans relative overflow-hidden" dir="ltr">
          {/* Top Half: Crisp White with Title and Level */}
          <div className="pt-3 px-3.5 pb-2 bg-white flex flex-col items-start relative z-10">
            {/* Top Badge: Baccalauréat */}
            <div className="mb-2">
              <span className="inline-block px-1.5 py-0.5 rounded-[3px] bg-amber-400 text-black text-[8px] sm:text-[9px] font-black uppercase tracking-wider shadow-xs">
                Baccalauréat
              </span>
            </div>

            {/* Title Row: YOUR [N] ENGLISH */}
            <div className="w-full flex items-center gap-1.5 leading-none">
              <span className="font-black text-xs sm:text-sm md:text-base tracking-tight text-zinc-950 font-sora">
                YOUR
              </span>
              <span
                className={`inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full ${levelStyle.bg} ${levelStyle.text} text-[10px] sm:text-xs font-black shadow-xs shrink-0`}
              >
                {levelNum}
              </span>
              <span className="font-black text-xs sm:text-sm md:text-base tracking-tight text-zinc-950 font-sora">
                ENGLISH
              </span>
            </div>

            {/* Subtitle: Student's Book & Workbook */}
            <p className="text-[8px] sm:text-[9px] font-bold text-zinc-700 tracking-tight mt-1">
              Student's Book & Workbook
            </p>
          </div>

          {/* Dark Charcoal Accent Bar with 11 Indicator */}
          <div className="w-full bg-[#1E2430] py-0.5 px-3 flex items-center justify-center border-y border-zinc-900/40 relative z-10 shadow-xs">
            <span className="px-1.5 py-0.2 rounded-xs bg-[#2B3444] text-amber-300 font-mono font-black text-[9px] sm:text-[10px] tracking-widest border border-amber-400/20">
              11
            </span>
          </div>

          {/* Lower Half: Warm Golden Yellow with Background Watermark */}
          <div className="flex-1 bg-gradient-to-b from-amber-400 via-amber-400 to-yellow-500 relative flex flex-col justify-between p-3 overflow-hidden">
            {/* Subtle Stylized "YOUR" Watermark Typography */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20 overflow-hidden"
              aria-hidden="true"
            >
              <span className="text-6xl sm:text-7xl font-black text-amber-900/60 leading-none tracking-tighter transform -rotate-12 scale-125">
                YOUR
              </span>
            </div>

            {/* Middle Your Academy Badge Watermark */}
            <div className="relative z-10 flex items-center justify-center pt-2">
              <div className="px-2.5 py-1 rounded-full bg-black/10 backdrop-blur-xs border border-black/10 flex items-center gap-1.5">
                <span className="text-[9px] sm:text-[10px] font-black text-zinc-950 tracking-wide">
                  YOUR ACADEMY
                </span>
              </div>
            </div>

            {/* Bottom Section: Three Core Skills & Author */}
            <div className="relative z-10 space-y-1.5">
              {/* Three Skills Row: Listen · Speak · Write */}
              <div className="bg-white/90 backdrop-blur-xs rounded-lg py-1 px-2 flex items-center justify-around shadow-xs border border-white/60 text-zinc-800">
                <div className="flex items-center gap-1">
                  <Headphones className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-900" />
                  <span className="text-[7.5px] sm:text-[8.5px] font-bold">Listen</span>
                </div>
                <span className="text-zinc-300 text-[8px]">·</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-900" />
                  <span className="text-[7.5px] sm:text-[8.5px] font-bold">Speak</span>
                </div>
                <span className="text-zinc-300 text-[8px]">·</span>
                <div className="flex items-center gap-1">
                  <PenTool className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-900" />
                  <span className="text-[7.5px] sm:text-[8.5px] font-bold">Write</span>
                </div>
              </div>

              {/* Author attribution verified from Image 2 */}
              <div className="text-center">
                <span className="text-[7px] sm:text-[8px] font-extrabold text-zinc-900/80 block leading-none">
                  Cours Elaboré: Ahmed Salim
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Realistic 3D Spine Crease & Surface Lighting */}
      <div
        className="absolute inset-y-0 left-0 w-3.5 sm:w-4 bg-gradient-to-r from-black/50 via-white/10 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Top Badge Overlay */}
      {book.badge && (
        <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-black shadow-md z-30 pointer-events-none">
          {book.badge}
        </span>
      )}

      {/* Hover Overlay Hint */}
      {showHoverHint && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 pointer-events-none">
          <span className="px-3 py-1.5 rounded-xl bg-amber-400 text-black text-xs font-black shadow-lg flex items-center gap-1.5">
            <span>{isRtl ? 'عرض المنهاج' : 'View Syllabus'}</span>
          </span>
        </div>
      )}
    </div>
  );
};
