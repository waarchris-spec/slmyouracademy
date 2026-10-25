import React from 'react';
import { Link } from 'react-router-dom';
import { ACADEMY_INFO, CAMPAIGN_MOTTO, BRANCH_CONTACT_NUMBERS } from '../data/academyData';
import { Phone, MapPin, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BlurUpImage } from './BlurUpImage';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister }) => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const isAr = language === 'ar';

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-300 dark:border-zinc-900 text-zinc-600 dark:text-zinc-400 pt-16 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:pb-16 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-zinc-200 dark:border-zinc-900">
          
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4 text-start">
            <Link to="/" className="flex items-center gap-3 inline-flex group">
              <img
                src={isDark ? '/assets/your-academy-symbol-dark.png' : '/assets/your-academy-symbol-light.png'}
                alt="Your Academy"
                className="w-11 h-11 object-contain group-hover:scale-105 transition-transform shrink-0 select-none"
                width="44"
                height="44"
              />
              <div>
                <span className="font-extrabold text-xl text-zinc-950 dark:text-white tracking-tight font-sora block">
                  YOUR ACADEMY
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                  {t.common.academyName}
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-800 dark:text-zinc-300 font-bold">
              {t.common.slogan}
            </p>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-amber-700 dark:text-amber-400 font-sora font-bold">
                {CAMPAIGN_MOTTO.tagline1}
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-sora font-bold">
                {CAMPAIGN_MOTTO.tagline2}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3 text-start">
            <h4 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {t.footer.home}
                </Link>
              </li>
              <li>
                <Link to="/languages" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {t.footer.languages}
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-bold text-amber-700 dark:text-amber-400">
                  {isAr ? 'مناهج وكتب الأكاديمية' : 'Books & Curriculum'}
                </Link>
              </li>
              <li>
                <Link to="/academic-support" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {t.footer.academic}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-semibold">
                  {isAr ? 'الموارد والبرامج الأكاديمية' : 'Academic Resources'}
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-semibold">
                  {isAr ? 'مجتمع الناجحين' : 'Success Community'}
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-semibold">
                  {isAr ? 'قصص وتجارب النجاح' : 'Success Stories'}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {isAr ? 'برامجنا والرزنامة' : 'Programs & Calendar'}
                </Link>
              </li>
              <li>
                <Link to="/why-your-academy" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {isAr ? 'لماذا Your Academy؟' : 'Why Your Academy?'}
                </Link>
              </li>
              <li>
                <Link
                  to="/branches-contact"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{isAr ? 'الفروع والتواصل' : 'Branches & Contact'}</span>
                </Link>
              </li>
              <li>
                <Link to="/registration" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {isAr ? 'التسجيل والعروض' : 'Registration & Offers'}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {t.footer.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Both Locations */}
          <div className="lg:col-span-4 space-y-4 text-start">
            <div>
              <h4 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider mb-2">
                {language === 'ar' ? 'فروعنا الرسمية' : 'Our Locations'}
              </h4>
              
              {/* Both Locations Cards */}
              <div className="space-y-2 text-xs">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    language === 'ar'
                      ? 'حي الإخوة شوال، طريق مسجد مالك ابن أنس، عين الدفلى، الجزائر 44000'
                      : 'Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas, Aïn Defla, Algeria, 44000'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-500/40 dark:border-amber-400/40 shadow-sm flex items-start gap-2.5 hover:border-amber-500 transition-colors group/footloc block"
                  title={language === 'ar' ? 'عرض على خريطة Google' : 'View on Google Maps'}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 group-hover/footloc:scale-110 transition-transform" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-zinc-950 dark:text-white block group-hover/footloc:text-amber-600 dark:group-hover/footloc:text-amber-400 transition-colors">
                          {language === 'ar' ? 'Your Academy - عين الدفلى (الرئيسي)' : 'Your Academy - Aïn Defla (Main)'}
                        </span>
                        <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.2 rounded font-black">
                          {language === 'ar' ? 'الرئيسي' : 'MAIN'}
                        </span>
                      </div>
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium block mt-0.5">
                        📍 {language === 'ar' ? 'حي الإخوة شوال، طريق مسجد مالك ابن أنس' : 'Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas'}
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold block text-[11px] mt-0.5">
                        📞 0552 40 40 59
                      </span>
                    </div>
                  </div>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    language === 'ar'
                      ? 'تحت محل وزير القلايل مقابل زواق المصور، خميس مليانة، الجزائر 44000'
                      : 'Under Wazir El Qlayel store, opposite Zouak Photographer, Khemis Miliana, Algeria, 44000'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-2.5 hover:border-amber-400/60 transition-colors group/footloc block"
                  title={language === 'ar' ? 'عرض على خريطة Google' : 'View on Google Maps'}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 group-hover/footloc:scale-110 transition-transform" />
                    <div>
                      <span className="font-bold text-zinc-950 dark:text-white block group-hover/footloc:text-amber-600 dark:group-hover/footloc:text-amber-400 transition-colors">
                        {language === 'ar' ? 'Your Academy - خميس مليانة' : 'Your Academy - Khemis Miliana'}
                      </span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium block mt-0.5">
                        📍 {language === 'ar' ? 'تحت محل وزير القلايل مقابل زواق المصور، خميس مليانة' : 'Under Wazir El Qlayel store, opp. Zouak, Khemis Miliana'}
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold block text-[11px] mt-0.5">
                        📞 0551 40 40 59
                      </span>
                    </div>
                  </div>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('El Attaf, Algeria, 44000')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-2.5 hover:border-amber-400/60 transition-colors group/footloc block"
                  title={language === 'ar' ? 'عرض على خريطة Google' : 'View on Google Maps'}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 group-hover/footloc:scale-110 transition-transform" />
                    <div>
                      <span className="font-bold text-zinc-950 dark:text-white block group-hover/footloc:text-amber-600 dark:group-hover/footloc:text-amber-400 transition-colors">
                        {language === 'ar' ? 'Your Academy - العطاف' : 'Your Academy - El Attaf Branch'}
                      </span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium block mt-0.5">
                        📍 {language === 'ar' ? 'العطاف، الجزائر 44000' : 'El Attaf, Algeria, 44000'}
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold block text-[11px] mt-0.5">
                        📞 0670 40 66 59
                      </span>
                    </div>
                  </div>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    language === 'ar' ? 'البليدة، الجزائر 09000' : 'Blida, Algeria 09000'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-2.5 hover:border-amber-400/60 transition-colors group/footloc block"
                  title={language === 'ar' ? 'عرض على خريطة Google' : 'View on Google Maps'}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 group-hover/footloc:scale-110 transition-transform" />
                    <div>
                      <span className="font-bold text-zinc-950 dark:text-white block group-hover/footloc:text-amber-600 dark:group-hover/footloc:text-amber-400 transition-colors">
                        {language === 'ar' ? 'Your Academy - البليدة' : 'Your Academy - Blida Branch'}
                      </span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium block mt-0.5">
                        📍 {language === 'ar' ? 'البليدة، الجزائر (09000)' : 'Blida, Algeria (09000)'}
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold block text-[11px] mt-0.5">
                        📞 0560 40 40 00
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Official Contact Numbers Section for All 4 Branches */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="space-y-2">
                <span className="text-zinc-950 dark:text-white block text-xs font-black tracking-wide">
                  {language === 'ar' ? 'أرقام الاتصال الرسمية' : t.footer.officialPhones}
                </span>

                <div className="space-y-1.5">
                  {BRANCH_CONTACT_NUMBERS.map((b) => (
                    <a
                      key={b.branchId}
                      href={b.telLink}
                      className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/60 dark:hover:border-amber-400/60 flex items-center justify-between gap-2 shadow-xs transition-all group active:scale-[0.99] block"
                      title={`${language === 'ar' ? 'اتصال مباشر:' : 'Call:'} ${b.phone}`}
                      aria-label={`${language === 'ar' ? 'اتصال بـ' : 'Call'} ${language === 'ar' ? b.branchNameAr : b.branchNameEn}: ${b.phone}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-amber-400/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-zinc-950 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {language === 'ar' ? b.branchNameAr : b.branchNameEn}
                        </span>
                      </div>
                      <span className="font-bold text-amber-700 dark:text-amber-400 font-sora shrink-0 text-[11px] tracking-tight" dir="ltr">
                        {b.phone}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Email information */}
              <div className="pt-1 flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Mail className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                <a href={`mailto:${ACADEMY_INFO.email}`} className="hover:text-amber-600 dark:hover:text-amber-400 font-medium" dir="ltr">
                  {ACADEMY_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-colors shadow-xs"
              >
                {t.footer.reserveNowBtn}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-start">
          <div>
            {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle variant="footer" />
            <div className="flex items-center gap-2">
              <span>{t.common.slogan}</span>
              <span className="text-amber-500 dark:text-amber-400">•</span>
              <span className="font-sora text-[11px] text-zinc-500 dark:text-zinc-400">{t.common.openForYear}</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

