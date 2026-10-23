import React from 'react';
import { ExternalLink, Sparkles, Share2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SOCIAL_MEDIA_PLATFORMS, SocialBranchLink } from '../data/socialMediaData';

/**
 * Authentic SVG Brand Logos
 */
const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.8.1V9.4a6.31 6.31 0 0 0-.8-.05A6.34 6.34 0 0 0 3 15.69 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.31V9.22a8.16 8.16 0 0 0 4.91 1.62V7.39a4.85 4.85 0 0 1-1-.7z" />
  </svg>
);

interface SocialMediaSectionProps {
  id?: string;
}

export const SocialMediaSectionOriginal: React.FC<SocialMediaSectionProps> = ({ id = 'social-media' }) => {
  const { isRtl, language } = useLanguage();
  const isAr = language === 'ar';

  const facebookConfig = SOCIAL_MEDIA_PLATFORMS.find((p) => p.id === 'facebook');
  const instagramConfig = SOCIAL_MEDIA_PLATFORMS.find((p) => p.id === 'instagram');
  const tiktokConfig = SOCIAL_MEDIA_PLATFORMS.find((p) => p.id === 'tiktok');

  return (
    <section id={id} className="relative py-12 sm:py-16 scroll-mt-24">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <Share2 className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAr ? 'قنوات التواصل الاجتماعي الرسمية' : 'Official Social Channels'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? '4 فروع معتمدة' : '4 Campuses'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            {isAr ? 'تابعونا على' : 'Find Us on'}{' '}
            <span className="text-amber-500 dark:text-amber-400">
              {isAr ? 'شبكات التواصل الاجتماعي' : 'Social Media'}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {isAr
              ? 'ابق على تواصل مستمر مع إدارة وأساتذة الأكاديمية: تابع فعاليات الطلاب، إعلانات انطلاق الأفواج، وأحدث الفيديوهات التعليمية الخاصة بكل فرع.'
              : 'Connect directly with Your Academy faculty across our official accounts for timetable announcements, student achievements, and branch updates.'}
          </p>
        </div>

        {/* 3 LARGE VERTICAL CARDS (Original Header-Only Branding) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* CARD 1: FACEBOOK */}
          <div className="rounded-3xl bg-white dark:bg-[#0E1422] border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-start group">
            <div className="bg-[#1877F2] text-white p-6 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                    <FacebookIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight font-sora">Facebook</h3>
                    <p className="text-xs text-white/90 font-medium">
                      {isAr ? 'صفحات الفروع الرسمية' : 'Official Branch Pages'}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  4 {isAr ? 'صفحات' : 'Pages'}
                </span>
              </div>
              <div className="absolute -bottom-6 -right-6 text-white/10 pointer-events-none select-none" aria-hidden="true">
                <FacebookIcon className="w-32 h-32" />
              </div>
            </div>

            <div className="h-1 bg-blue-600/30" />

            <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {facebookConfig?.branches.map((branch, idx) => (
                  <a
                    key={branch.id}
                    href={branch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-3 rounded-2xl flex items-center justify-between gap-3 group/row hover:bg-blue-50/70 dark:hover:bg-blue-950/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 group-hover/row:bg-[#1877F2] group-hover/row:text-white transition-colors">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-zinc-900 dark:text-white group-hover/row:text-[#1877F2] dark:group-hover/row:text-blue-400 transition-colors truncate">
                            {isAr ? `فرع ${branch.branchNameAr}` : `${branch.branchNameEn} Branch`}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400">
                              {isAr ? 'الرئيسي' : 'HQ'}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono block truncate" dir="ltr">
                          facebook.com/{branch.handleOrLabel}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover/row:bg-[#1877F2] group-hover/row:text-white flex items-center justify-center shrink-0 transition-all">
                      <ArrowUpRight className="w-4 h-4 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>{isAr ? 'تحديثات يومية وإعلانات التسجيل' : 'Daily news & registration'}</span>
                <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold">@youracademy</span>
              </div>
            </div>
          </div>

          {/* CARD 2: INSTAGRAM */}
          <div className="rounded-3xl bg-white dark:bg-[#0E1422] border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-start group">
            <div className="bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white p-6 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                    <InstagramIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight font-sora">Instagram</h3>
                    <p className="text-xs text-white/90 font-medium">
                      {isAr ? 'حسابات إنستغرام لجميع الفروع' : 'Official Branch Accounts'}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  4 {isAr ? 'حسابات' : 'Accounts'}
                </span>
              </div>
              <div className="absolute -bottom-6 -right-6 text-white/10 pointer-events-none select-none" aria-hidden="true">
                <InstagramIcon className="w-32 h-32" />
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] opacity-50" />

            <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {instagramConfig?.branches.map((branch, idx) => (
                  <a
                    key={branch.id}
                    href={branch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-3 rounded-2xl flex items-center justify-between gap-3 group/row hover:bg-pink-50/70 dark:hover:bg-pink-950/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DD2A7B]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 group-hover/row:bg-[#DD2A7B] group-hover/row:text-white transition-colors">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-zinc-900 dark:text-white group-hover/row:text-[#DD2A7B] dark:group-hover/row:text-pink-400 transition-colors truncate">
                            {isAr ? `فرع ${branch.branchNameAr}` : `${branch.branchNameEn} Branch`}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400">
                              {isAr ? 'الرئيسي' : 'HQ'}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono block truncate" dir="ltr">
                          {branch.handleOrLabel}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover/row:bg-[#DD2A7B] group-hover/row:text-white flex items-center justify-center shrink-0 transition-all">
                      <ArrowUpRight className="w-4 h-4 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>{isAr ? 'ريلز، ستوريز، وتكريم الأوائل' : 'Reels, stories & student honors'}</span>
                <span className="font-mono text-[10px] text-pink-600 dark:text-pink-400 font-bold">@youracademy</span>
              </div>
            </div>
          </div>

          {/* CARD 3: TIKTOK */}
          <div className="rounded-3xl bg-white dark:bg-[#0E1422] border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-start group">
            <div className="bg-[#05070B] text-white p-6 relative overflow-hidden border-b border-zinc-800">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white relative shadow-inner">
                    <TikTokIcon className="w-7 h-7 text-white drop-shadow-[1px_1px_0px_rgba(37,244,238,0.9)] drop-shadow-[-1px_-1px_0px_rgba(254,44,85,0.9)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black tracking-tight font-sora">TikTok</h3>
                      <span className="w-2 h-2 rounded-full bg-[#25F4EE] animate-pulse" />
                    </div>
                    <p className="text-xs text-zinc-300 font-medium">
                      {isAr ? 'الحساب الرسمي الموحد للأكاديمية' : 'Unified Official Account'}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[#25F4EE]">
                  {isAr ? 'حساب رئيسي' : 'Official'}
                </span>
              </div>
              <div className="absolute -bottom-6 -right-6 text-white/5 pointer-events-none select-none" aria-hidden="true">
                <TikTokIcon className="w-32 h-32" />
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#25F4EE] via-white/40 to-[#FE2C55]" />

            <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center font-black text-sm border-2 border-[#25F4EE] shrink-0 shadow-md">
                      YA
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-base text-zinc-950 dark:text-white leading-snug">
                        Your Academy
                      </h4>
                      <span className="text-xs font-mono font-bold text-[#FE2C55] dark:text-[#FE2C55] block" dir="ltr">
                        @youracademy44
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {isAr
                      ? 'الحساب المركزي الشامل لجميع فروع أكاديمية Your Academy: فيديوهات قصيرة للتعلم السريع، تصحيح مخارج الحروف، ونشاطات حية مع طلابنا.'
                      : 'The central account serving all academy branches: quick spoken fluency drills, phonetics tutorials, and lively student activities.'}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{isAr ? 'يغطي الفروع الأربعة: عين الدفلى، البليدة، خميس مليانة، والعطاف' : 'Covers Aïn Defla, Blida, Khemis Miliana & El Attaf'}</span>
                  </div>
                </div>

                {tiktokConfig?.branches[0] && (
                  <a
                    href={tiktokConfig.branches[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-2xl bg-zinc-950 hover:bg-black text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all group/btn border border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25F4EE]"
                  >
                    <TikTokIcon className="w-4 h-4 text-[#25F4EE] group-hover/btn:scale-110 transition-transform" />
                    <span>{isAr ? 'تابع @youracademy44 على تيك توك' : 'Follow @youracademy44 on TikTok'}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>{isAr ? 'المحتوى البيداغوجي والتفاعلي' : 'Interactive video tutorials'}</span>
                <span className="font-mono text-[10px] text-zinc-700 dark:text-zinc-300 font-bold">@youracademy44</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
