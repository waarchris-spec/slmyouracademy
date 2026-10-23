import React from 'react';
import { Share2, ArrowUpRight } from 'lucide-react';
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

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({ id = 'social-media' }) => {
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

        {/* =========================================================================
            3 LARGE VERTICAL CARDS (Full-Card Platform Branding)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* =======================================================================
              CARD 1: FACEBOOK (Full-card Facebook blue theme)
             ======================================================================= */}
          <div className="rounded-3xl shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-start group bg-gradient-to-b from-[#1877F2] via-[#0F60C8] to-[#0A4799] border-2 border-[#388BFD]/40 text-white shadow-blue-500/10">
            {/* Facebook Header */}
            <div className="p-6 relative overflow-hidden bg-white/10 backdrop-blur-md border-b border-white/15 text-white">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner bg-white/20 border border-white/30">
                    <FacebookIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight font-sora">
                      Facebook
                    </h3>
                    <p className="text-xs font-medium text-blue-100">
                      {isAr ? 'صفحات الفروع الرسمية' : 'Official Branch Pages'}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/20 text-white border border-white/20">
                  4 {isAr ? 'صفحات' : 'Pages'}
                </span>
              </div>

              {/* Decorative Subtle Facebook F watermark */}
              <div
                className="absolute -bottom-6 -right-6 text-white/10 pointer-events-none select-none"
                aria-hidden="true"
              >
                <FacebookIcon className="w-32 h-32" />
              </div>
            </div>

            {/* Clear Divider */}
            <div className="h-0.5 bg-white/20" />

            {/* Branch List (1. Aïn Defla, 2. Blida, 3. Khemis Miliana, 4. El Attaf) */}
            <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                {facebookConfig?.branches.map((branch, idx) => (
                  <a
                    key={branch.id}
                    href={branch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3.5 rounded-2xl flex items-center justify-between gap-3 group/row transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 text-white shadow-xs backdrop-blur-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-colors bg-white/20 text-white group-hover/row:bg-white group-hover/row:text-[#0A4799]">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm truncate transition-colors text-white group-hover/row:text-amber-300">
                            {isAr ? `فرع ${branch.branchNameAr}` : `${branch.branchNameEn} Branch`}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-black font-black">
                              {isAr ? 'الرئيسي' : 'HQ'}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono block truncate text-blue-100/90" dir="ltr">
                          facebook.com/{branch.handleOrLabel}
                        </span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all bg-white/15 text-white group-hover/row:bg-white group-hover/row:text-[#0A4799]">
                      <ArrowUpRight className="w-4 h-4 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 text-[11px] flex items-center justify-between border-t border-white/15 text-blue-100">
                <span>{isAr ? 'تحديثات يومية وإعلانات التسجيل' : 'Daily news & registration'}</span>
                <span className="font-mono text-[10px] font-bold text-white">
                  @youracademy
                </span>
              </div>
            </div>

          </div>

          {/* =======================================================================
              CARD 2: INSTAGRAM (Full-card iconic Instagram gradient)
             ======================================================================= */}
          <div className="rounded-3xl shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-start group bg-gradient-to-b from-[#8134AF] via-[#DD2A7B] to-[#F58529] border-2 border-pink-400/40 text-white shadow-pink-500/10">
            {/* Instagram Header */}
            <div className="p-6 relative overflow-hidden bg-black/15 backdrop-blur-md border-b border-white/15 text-white">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner bg-white/20 border border-white/30">
                    <InstagramIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight font-sora">
                      Instagram
                    </h3>
                    <p className="text-xs font-medium text-pink-100">
                      {isAr ? 'حسابات إنستغرام لجميع الفروع' : 'Official Branch Accounts'}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/20 text-white border border-white/20">
                  4 {isAr ? 'حسابات' : 'Accounts'}
                </span>
              </div>

              {/* Decorative Subtle Instagram watermark */}
              <div
                className="absolute -bottom-6 -right-6 text-white/10 pointer-events-none select-none"
                aria-hidden="true"
              >
                <InstagramIcon className="w-32 h-32" />
              </div>
            </div>

            {/* Clear Divider */}
            <div className="h-0.5 bg-white/20" />

            {/* Branch List (1. Aïn Defla, 2. Blida, 3. Khemis Miliana, 4. El Attaf) */}
            <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                {instagramConfig?.branches.map((branch, idx) => (
                  <a
                    key={branch.id}
                    href={branch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3.5 rounded-2xl flex items-center justify-between gap-3 group/row transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white bg-black/20 hover:bg-black/30 border border-white/15 hover:border-white/30 text-white shadow-xs backdrop-blur-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-colors bg-white/20 text-white group-hover/row:bg-white group-hover/row:text-[#DD2A7B]">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm truncate transition-colors text-white group-hover/row:text-amber-300">
                            {isAr ? `فرع ${branch.branchNameAr}` : `${branch.branchNameEn} Branch`}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-black font-black">
                              {isAr ? 'الرئيسي' : 'HQ'}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono block truncate text-pink-100/90" dir="ltr">
                          {branch.handleOrLabel}
                        </span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all bg-white/15 text-white group-hover/row:bg-white group-hover/row:text-[#DD2A7B]">
                      <ArrowUpRight className="w-4 h-4 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 text-[11px] flex items-center justify-between border-t border-white/15 text-pink-100">
                <span>{isAr ? 'ريلز، ستوريز، وتكريم الأوائل' : 'Reels, stories & student honors'}</span>
                <span className="font-mono text-[10px] font-bold text-white">
                  @youracademy
                </span>
              </div>
            </div>

          </div>

          {/* =======================================================================
              CARD 3: TIKTOK (Full-card dark charcoal theme with cyan & pink accents)
             ======================================================================= */}
          <div className="rounded-3xl shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-start group bg-[#05070B] border-2 border-zinc-800/90 hover:border-[#25F4EE]/40 text-white relative shadow-black/40">
            {/* Ambient Cyan & Pink Corner Lighting */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#25F4EE]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#FE2C55]/10 rounded-full blur-2xl" />
            </div>

            {/* TikTok Header */}
            <div className="bg-[#05070B] text-white p-6 relative overflow-hidden border-b border-zinc-800/80">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white relative shadow-inner">
                    <TikTokIcon className="w-7 h-7 text-white drop-shadow-[1.5px_1.5px_0px_#25F4EE] drop-shadow-[-1.5px_-1.5px_0px_#FE2C55]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black tracking-tight font-sora">
                        TikTok
                      </h3>
                      <span className="w-2 h-2 rounded-full bg-[#25F4EE] animate-pulse" />
                    </div>
                    <p className="text-xs text-zinc-300 font-medium">
                      {isAr ? 'الحساب الرسمي الموحد للأكاديمية' : 'Unified Official Account'}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-800/90 border border-zinc-700 text-[#25F4EE]">
                  {isAr ? 'حساب رئيسي' : 'Official'}
                </span>
              </div>

              {/* Decorative Subtle TikTok watermark */}
              <div
                className="absolute -bottom-6 -right-6 text-white/5 pointer-events-none select-none"
                aria-hidden="true"
              >
                <TikTokIcon className="w-32 h-32" />
              </div>
            </div>

            {/* Clear Divider with Cyan & Pink Line */}
            <div className="h-1 bg-gradient-to-r from-[#25F4EE] via-white/50 to-[#FE2C55]" />

            {/* TikTok Card Body: Single Main Academy Account across entire card */}
            <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between space-y-4 relative z-10">
              
              <div className="space-y-4">
                {/* Highlighted Profile Box (Full Dark Charcoal Theme) */}
                <div className="p-4 rounded-2xl space-y-3 transition-colors bg-zinc-900/90 border border-zinc-800/90 hover:border-[#25F4EE]/40 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center font-black text-sm border-2 border-[#25F4EE] shrink-0 shadow-[0_0_12px_rgba(37,244,238,0.2)]">
                      YA
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-base text-white leading-snug">
                        Your Academy
                      </h4>
                      <span className="text-xs font-mono font-bold text-[#FE2C55] block" dir="ltr">
                        @youracademy44
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {isAr
                      ? 'الحساب المركزي الشامل لجميع فروع أكاديمية Your Academy: فيديوهات قصيرة للتعلم السريع، تصحيح مخارج الحروف، ونشاطات حية مع طلابنا.'
                      : 'The central account serving all academy branches: quick spoken fluency drills, phonetics tutorials, and lively student activities.'}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25F4EE] shadow-[0_0_6px_#25F4EE]" />
                    <span>{isAr ? 'يغطي الفروع الأربعة: عين الدفلى، البليدة، خميس مليانة، والعطاف' : 'Covers Aïn Defla, Blida, Khemis Miliana & El Attaf'}</span>
                  </div>
                </div>

                {/* Direct Action Link with Cyan & Pink hover states */}
                {tiktokConfig?.branches[0] && (
                  <a
                    href={tiktokConfig.branches[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-2xl bg-zinc-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(37,244,238,0.25)] transition-all group/btn border border-zinc-700/80 hover:border-[#25F4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25F4EE]"
                  >
                    <TikTokIcon className="w-4 h-4 text-[#25F4EE] group-hover/btn:scale-110 transition-transform" />
                    <span>{isAr ? 'تابع @youracademy44 على تيك توك' : 'Follow @youracademy44 on TikTok'}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover/btn:text-[#25F4EE] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>{isAr ? 'المحتوى البيداغوجي والتفاعلي' : 'Interactive video tutorials'}</span>
                <span className="font-mono text-[10px] text-[#25F4EE] font-bold">@youracademy44</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
