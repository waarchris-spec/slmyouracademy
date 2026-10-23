import React from 'react';
import { ACADEMY_INFO, CAMPAIGN_MOTTO } from '../data/academyData';
import { Check, ChevronLeft, ChevronRight, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SpecialOfferBannerProps {
  onOpenRegister: (program?: string) => void;
}

export const SpecialOfferBanner: React.FC<SpecialOfferBannerProps> = ({ onOpenRegister }) => {
  const { t, isRtl, language } = useLanguage();

  return (
    <section id="special-offer" className="py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Golden-Black Promo Box */}
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black p-8 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          
          {/* Subtle Graphic background patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-black/10 rounded-full blur-2xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Offer Headline & Details */}
            <div className="lg:col-span-8 space-y-4 text-start">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-black text-amber-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider font-sora">
                  {CAMPAIGN_MOTTO.backToSchool}
                </span>
                <span className="bg-black/15 text-black font-bold text-xs px-3 py-1 rounded-full font-sora">
                  {CAMPAIGN_MOTTO.year}
                </span>
                <span className="bg-white/80 text-black font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {t.common.startDate}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
                {t.specialOffer.mainHeading}
              </h2>

              <p className="text-base sm:text-lg font-bold text-black/85 max-w-2xl leading-relaxed">
                {t.specialOffer.description}
              </p>

              {/* Verified Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm font-bold text-black">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t.specialOffer.check1}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t.specialOffer.check2}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t.specialOffer.check3}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t.specialOffer.check4}</span>
                </div>
              </div>

            </div>

            {/* Instant Action Box */}
            <div className="lg:col-span-4 bg-black text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-5 text-center">
              
              <div className="space-y-1">
                <span className="text-amber-400 text-xs font-black uppercase tracking-wider font-sora">
                  LIMITED ENROLLMENT
                </span>
                <p className="text-xl font-black">
                  {t.specialOffer.boxTitle}
                </p>
                <p className="text-xs text-zinc-400">
                  {t.specialOffer.boxSubtitle}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-2.5">
                <div className="grid grid-cols-2 gap-2 pb-2.5 border-b border-zinc-800">
                  <div className="p-2 rounded-xl bg-zinc-950/80 border border-amber-500/30">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">{language === 'ar' ? 'الاشتراك الشهري' : 'Monthly'}</span>
                    <span className="text-lg sm:text-xl font-black text-amber-400 font-sora block">
                      {language === 'ar' ? '3000 دج' : '3,000 DZD'}
                    </span>
                    <span className="text-[9px] text-zinc-500 block">{language === 'ar' ? 'شهرياً' : 'per month'}</span>
                  </div>

                  <div className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">{language === 'ar' ? 'المستوى الكامل' : 'Full Level'}</span>
                    <span className="text-lg sm:text-xl font-black text-white font-sora block">
                      {language === 'ar' ? '9000 دج' : '9,000 DZD'}
                    </span>
                    <span className="text-[9px] text-zinc-500 block">{language === 'ar' ? 'للمستوى كاملاً' : 'complete level'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-300 px-1">
                  <span>📍 {language === 'ar' ? 'تسعيرة فرع البليدة:' : 'Blida Branch rate:'}</span>
                  <span className="font-black text-amber-400 font-sora">{language === 'ar' ? '4000 دج' : '4,000 DZD'}</span>
                </div>

                <div className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-800/80">
                  <span>📅 {language === 'ar' ? 'الكبار: 4 حصص شهرياً • الأطفال: 8 حصص شهرياً' : 'Adults: 4 sessions/mo • Kids: 8 sessions/mo'}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenRegister(t.specialOffer.mainHeading)}
                className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                id="promo-box-register-btn"
              >
                <span>{t.specialOffer.boxBtn}</span>
                {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              <div className="pt-1 border-t border-zinc-800 flex items-center justify-center gap-2 text-xs text-zinc-300 flex-wrap">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t.specialOffer.orCallDirectly}</span>
                <a href={`tel:${ACADEMY_INFO.phones[0]}`} className="font-bold text-amber-400 hover:underline" dir="ltr">
                  {ACADEMY_INFO.phones[0]}
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

