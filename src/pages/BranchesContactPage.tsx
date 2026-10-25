import React, { useState, useRef, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { CommunityNewsletter } from '../components/CommunityNewsletter';
import { SocialMediaSection } from '../components/SocialMediaSection';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { ACADEMY_INFO, branchFacebookUrls } from '../data/academyData';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Building2,
  Copy,
  Navigation,
  Compass,
  Check,
  PhoneCall,
  ShieldCheck,
  X,
} from 'lucide-react';

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface BranchesContactPageProps {
  onOpenRegister: (program?: string) => void;
}

export const BranchesContactPage: React.FC<BranchesContactPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'الفروع والتواصل — المقر الرئيسي عين الدفلى، البليدة، خميس مليانة، والعطاف',
    titleEn: 'Branches & Contact — Aïn Defla (HQ), Blida, Khemis Miliana & El Attaf',
    descAr: 'الدليل الرسمي الشامل لكافة فروع أكاديمية Your Academy الأربعة وقنوات الاتصال: عين الدفلى، البليدة، خميس مليانة، والعطاف. هواتف مباشرة، مواقع Google Maps، وتواصل عبر فيسبوك.',
    descEn: 'Official comprehensive directory of Your Academy’s four campuses and direct contact channels: Aïn Defla (Main HQ), Blida, Khemis Miliana, and El Attaf. Direct phone lines, verified Google Maps, and Facebook contact.',
  });

  // State for one-click copy feedbacks
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [copiedAddressId, setCopiedAddressId] = useState<string | null>(null);
  const [activeBranchFilter, setActiveBranchFilter] = useState<string>('all');
  const [showBranchCallModal, setShowBranchCallModal] = useState(false);
  const branchCallModalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowBranchCallModal(false);
      }
    };
    if (showBranchCallModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showBranchCallModal]);

  // Contact Inquiry Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    branch: isAr ? 'فرع عين الدفلى — المقر الرئيسي' : 'Aïn Defla Main HQ',
    message: '',
  });

  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState('');

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard?.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleCopyAddress = (id: string, address: string) => {
    navigator.clipboard?.writeText(address);
    setCopiedAddressId(id);
    setTimeout(() => setCopiedAddressId(null), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim() || !contactForm.message.trim()) {
      setFormError(
        isAr
          ? 'يرجى ملء جميع الحقول الإلزامية (الاسم، الهاتف، ونص الرسالة).'
          : 'Please complete all required fields (Name, Phone, Message).'
      );
      return;
    }
    setFormError('');

    const mailtoSubject = encodeURIComponent(`رسالة استفسار من موقع Your Academy - ${contactForm.name}`);
    const mailtoBody = encodeURIComponent(
      `الاسم الكامل: ${contactForm.name}\nرقم الهاتف: ${contactForm.phone}\nالبريد الإلكتروني: ${contactForm.email || 'غير محدد'}\nالفرع المطلوب: ${contactForm.branch}\n\nنص الرسالة:\n${contactForm.message}`
    );

    window.open(`mailto:${ACADEMY_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
    setFormSent(true);
  };

  // The 4 Official Branches with verified data and Facebook URLs
  const branches = [
    {
      id: 'ain-defla',
      nameAr: 'فرع عين الدفلى — المقر الرئيسي',
      nameEn: 'Aïn Defla — Main HQ',
      cityAr: 'ولاية عين الدفلى',
      cityEn: 'Aïn Defla Province',
      badgeAr: 'المقر الرئيسي • MAIN HQ',
      badgeEn: 'MAIN HEADQUARTERS',
      addressAr: 'حي الإخوة شوال، طريق مسجد مالك ابن أنس، عين الدفلى، الجزائر 44000',
      addressEn: 'Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas, Aïn Defla, Algeria, 44000',
      phone: '0552 40 40 59',
      telLink: 'tel:+213552404059',
      email: ACADEMY_INFO.email,
      isMain: true,
      mapQuery: 'حي الإخوة شوال، طريق مسجد مالك ابن أنس، عين الدفلى، الجزائر 44000',
      facebookUrl: branchFacebookUrls['ain-defla'], // https://www.facebook.com/youracademy44
      hoursAr: 'السبت إلى الخميس: 08:30 - 18:00',
      hoursEn: 'Sat - Thu: 08:30 - 18:00',
      descriptionAr: 'المقر الإداري والأكاديمي الرئيسي، يضم قاعات تدريس تفاعلية ومكتبة المناهج والاستقبال المركزي.',
      descriptionEn: 'The central administrative & academic campus with interactive lecture halls and reception.',
    },
    {
      id: 'blida',
      nameAr: 'فرع البليدة',
      nameEn: 'Blida Branch',
      cityAr: 'ولاية البليدة',
      cityEn: 'Blida Province',
      badgeAr: 'فرع معتمد • BLIDA',
      badgeEn: 'ACCREDITED BRANCH',
      addressAr: 'البليدة، الجزائر 09000',
      addressEn: 'Blida, Algeria, 09000',
      phone: '0560 40 40 00',
      telLink: 'tel:+213560404000',
      email: ACADEMY_INFO.email,
      isMain: false,
      mapQuery: 'البليدة، الجزائر 09000',
      facebookUrl: branchFacebookUrls['blida'], // https://www.facebook.com/youracademyblida
      hoursAr: 'السبت إلى الخميس: 08:30 - 18:00',
      hoursEn: 'Sat - Thu: 08:30 - 18:00',
      descriptionAr: 'فرع معتمد يقدم كافة برامج اللغات والدعم المدرسي للأقسام النهائية بنفس الجودة المعتمدة.',
      descriptionEn: 'Official campus offering complete language tracks and exam tutoring in Blida.',
    },
    {
      id: 'khemis-miliana',
      nameAr: 'فرع خميس مليانة',
      nameEn: 'Khemis Miliana Branch',
      cityAr: 'ولاية عين الدفلى — خميس مليانة',
      cityEn: 'Khemis Miliana, Aïn Defla',
      badgeAr: 'فرع معتمد • KHEMIS',
      badgeEn: 'ACCREDITED BRANCH',
      addressAr: 'تحت محل وزير القلايل مقابل زواق المصور، خميس مليانة، الجزائر 44000',
      addressEn: 'Under Wazir El Qlayel store, opposite Zouak Photographer, Khemis Miliana, Algeria, 44000',
      phone: '0551 40 40 59',
      telLink: 'tel:+213551404059',
      email: 'youracademykn@gmail.com',
      isMain: false,
      mapQuery: 'تحت محل وزير القلايل مقابل زواق المصور، خميس مليانة، الجزائر 44000',
      facebookUrl: branchFacebookUrls['khemis-miliana'], // https://www.facebook.com/YourAcademy.khemismiliana
      hoursAr: 'السبت إلى الخميس: 08:30 - 18:00',
      hoursEn: 'Sat - Thu: 08:30 - 18:00',
      descriptionAr: 'موقع استراتيجي وسط المدينة مجهز بوسائل رقمية حديثة لتعليم اللغات ودعم شهادة البكالوريا.',
      descriptionEn: 'Convenient downtown campus equipped with digital learning tools and BAC support.',
    },
    {
      id: 'el-attaf',
      nameAr: 'فرع العطاف',
      nameEn: 'El Attaf Branch',
      cityAr: 'ولاية عين الدفلى — العطاف',
      cityEn: 'El Attaf, Aïn Defla',
      badgeAr: 'فرع معتمد • EL ATTAF',
      badgeEn: 'ACCREDITED BRANCH',
      addressAr: 'العطاف، الجزائر 44000',
      addressEn: 'El Attaf, Algeria, 44000',
      phone: '0670 40 66 59',
      telLink: 'tel:+213670406659',
      email: 'youracademyattaf@gmail.com',
      isMain: false,
      mapQuery: 'El Attaf, Algeria, 44000',
      facebookUrl: branchFacebookUrls['el-attaf'], // https://www.facebook.com/profile.php?id=100086080088537
      hoursAr: 'السبت إلى الخميس: 08:30 - 18:00',
      hoursEn: 'Sat - Thu: 08:30 - 18:00',
      descriptionAr: 'بيئة تعليمية محفزة بإشراف نخبة من الأساتذة لضمان تفوق أبنائنا في بلدية العطاف وما جاورها.',
      descriptionEn: 'Inspiring learning center guided by expert educators serving El Attaf and region.',
    },
  ];

  const filteredBranches =
    activeBranchFilter === 'all'
      ? branches
      : branches.filter((b) => b.id === activeBranchFilter);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Unified Page Header */}
      <PageHeader
        badge={
          isAr
            ? '4 فروع معتمدة • قنوات اتصال واستقبال مباشرة'
            : '4 Official Campuses • Direct Contact Channels'
        }
        badgeIcon={<Building2 className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'الفروع والتواصل' : 'Branches & Contact' }]}
        title={isAr ? 'فروع الأكاديمية والتواصل مع' : 'Official Branches & Contact for'}
        titleHighlight="YOUR ACADEMY"
        description={
          isAr
            ? 'المقر المعتمد الأقرب إليك في متناول يدك! تصفح عناوين الفروع الأربعة (عين الدفلى، البليدة، خميس مليانة، والعطاف)، اتصل مباشرة، افتح مسار الملاحة عبر خرائط Google، أو تواصل فوراً عبر صفحات فيسبوك الرسمية.'
            : 'Find your nearest official campus across Aïn Defla (HQ), Blida, Khemis Miliana, and El Attaf. Connect directly via phone, navigate with Google Maps, or contact our branch teams on Facebook.'
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isAr ? 'سجل في أقرب فرع إليك' : 'Register at Your Nearest Branch'}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowBranchCallModal(true)}
              className="px-5 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 transition-all flex items-center gap-2 shadow-xs active:scale-95 cursor-pointer"
              id="hero-call-branch-btn"
              aria-haspopup="dialog"
              aria-expanded={showBranchCallModal}
            >
              <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{isAr ? 'اتصل بأحد فروعنا' : 'Call a Branch'}</span>
            </button>
          </div>
        }
      />

      {/* Branch Call Selector Modal (Listing all 4 branches with direct tel: links) */}
      {showBranchCallModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="branch-call-modal-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowBranchCallModal(false)}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <div
            ref={branchCallModalRef}
            className="relative z-10 w-full max-w-lg bg-white dark:bg-[#0E131F] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-start max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="branch-call-modal-title"
                    className="text-base font-black text-zinc-950 dark:text-white leading-tight"
                  >
                    {isAr ? 'اتصل بأحد فروع الأكاديمية' : 'Call an Academy Branch'}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {isAr
                      ? 'اختر الفرع الأقرب إليك للتواصل المباشر مع إدارة الاستقبال'
                      : 'Choose your nearest branch for direct reception contact'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowBranchCallModal(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isAr ? 'إغلاق النافذة' : 'Close modal'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of 4 Branches */}
            <div className="space-y-2.5">
              {branches.map((b) => (
                <div
                  key={b.id}
                  className="p-3 sm:p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/50 flex items-center justify-between gap-3 transition-all"
                >
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-zinc-950 dark:text-white">
                        {isAr ? b.nameAr : b.nameEn}
                      </span>
                      {b.isMain ? (
                        <span className="px-1.5 py-0.5 bg-amber-500 text-black text-[9px] font-black rounded shrink-0">
                          {isAr ? 'الرئيسي' : 'HQ'}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[9px] font-bold rounded shrink-0">
                          {isAr ? 'فرع معتمد' : 'Branch'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {isAr ? b.cityAr : b.cityEn}
                    </p>
                  </div>

                  {/* Direct Call Button */}
                  <a
                    href={b.telLink}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-black text-xs shrink-0 flex items-center gap-1.5 font-sora shadow-xs active:scale-95 transition-transform"
                    dir="ltr"
                    title={`${isAr ? 'اتصال مباشر:' : 'Call:'} ${b.phone}`}
                    aria-label={`${isAr ? 'اتصال بـ' : 'Call'} ${isAr ? b.nameAr : b.nameEn}: ${b.phone}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{b.phone}</span>
                  </a>
                </div>
              ))}
            </div>

            {/* Note & Hours */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{isAr ? 'السبت - الخميس: 08:30 إلى 18:00' : 'Sat - Thu: 08:30 to 18:00'}</span>
              </div>
              <span className="font-semibold text-amber-700 dark:text-amber-400">
                4 {isAr ? 'فروع رسمية' : 'Official Branches'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Branch Filter & Fast Selector Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-start">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
            <Compass className="w-5 h-5 text-amber-500 shrink-0" />
            <span className="text-xs sm:text-sm font-black whitespace-nowrap">
              {isAr ? 'اختر الفرع لعرض تفاصيله:' : 'Filter by Branch:'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveBranchFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeBranchFilter === 'all'
                  ? 'bg-amber-500 text-black font-black shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {isAr ? 'جميع الفروع (4)' : 'All Branches (4)'}
            </button>
            {branches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBranchFilter(b.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeBranchFilter === b.id
                    ? 'bg-amber-500 text-black font-black shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {isAr ? b.nameAr.replace('فرع ', '') : b.nameEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The 4 Official Branches Complete Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-start space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'الدليل الرسمي للفروع المعتمدة' : 'Official Campuses Directory'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
            {isAr ? 'فروع Your Academy الأربعة' : 'The Four Official Branches'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {isAr
              ? 'تلتزم كافة فروع الأكاديمية بنفس المنهاج التعليمي المعتمد، ونفس معايير المتابعة الدقيقة، ونفس عروض الأسعار الرسمية.'
              : 'All academy campuses operate with identical certified curriculum standards and official tuition fee structures.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredBranches.map((b) => (
            <div
              key={b.id}
              className={`p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 text-start flex flex-col justify-between space-y-6 transition-all relative overflow-hidden group border-2 ${
                b.isMain
                  ? 'border-amber-500/70 shadow-xl ring-2 ring-amber-500/20'
                  : 'border-zinc-200 dark:border-zinc-800 shadow-md hover:border-amber-400'
              }`}
            >
              {/* Subtle Ambient Glow for Main Branch */}
              {b.isMain && (
                <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
              )}

              <div className="space-y-4 relative z-10">
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                      b.isMain
                        ? 'bg-amber-500 text-black shadow-md font-bold'
                        : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25'
                    }`}
                  >
                    <Building2 className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide border whitespace-nowrap ${
                      b.isMain
                        ? 'bg-amber-500 text-black border-amber-400 shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    {isAr ? b.badgeAr : b.badgeEn}
                  </span>
                </div>

                {/* Branch Title & Description */}
                <div>
                  <h3 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">
                    {isAr ? b.nameAr : b.nameEn}
                  </h3>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block mt-0.5">
                    {isAr ? b.cityAr : b.cityEn}
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {isAr ? b.descriptionAr : b.descriptionEn}
                  </p>
                </div>

                {/* Details Container */}
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/80 space-y-3 text-xs">
                  {/* Address */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>{isAr ? 'العنوان المعتمد:' : 'Physical Address:'}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyAddress(b.id, isAr ? b.addressAr : b.addressEn)}
                        className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                        title={isAr ? 'نسخ العنوان الكامل' : 'Copy address'}
                        aria-label="Copy address"
                      >
                        {copiedAddressId === b.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200 leading-snug line-clamp-2">
                      {isAr ? b.addressAr : b.addressEn}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>{isAr ? 'الهاتف المباشر:' : 'Direct Phone:'}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={b.telLink}
                        className="font-mono font-black text-amber-700 dark:text-amber-400 hover:underline"
                        dir="ltr"
                      >
                        {b.phone}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyPhone(b.phone)}
                        className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                        title={isAr ? 'نسخ رقم الهاتف' : 'Copy phone'}
                      >
                        {copiedPhone === b.phone ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>{isAr ? 'البريد الإلكتروني:' : 'Email:'}</span>
                    </span>
                    <a
                      href={`mailto:${b.email}`}
                      className="font-bold text-zinc-800 dark:text-zinc-200 hover:text-amber-600 truncate max-w-[130px]"
                      dir="ltr"
                      title={b.email}
                    >
                      {b.email}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>{isAr ? 'الاستقبال:' : 'Reception:'}</span>
                    </span>
                    <span className="font-bold text-zinc-700 dark:text-zinc-300">
                      {isAr ? b.hoursAr : b.hoursEn}
                    </span>
                  </div>

                  {/* Branch Pricing & Sessions */}
                  {b.id === 'blida' ? (
                    <div className="pt-2 border-t border-amber-500/30 flex flex-col gap-1 text-[11px] bg-amber-500/10 dark:bg-amber-500/15 p-2 rounded-xl border border-amber-400/40">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900 dark:text-amber-300">
                          💰 {isAr ? 'تسعيرة فرع البليدة:' : 'Blida Branch Tuition:'}
                        </span>
                        <span className="font-black text-amber-700 dark:text-amber-400 font-sora">
                          {isAr ? '4000 دج' : '4,000 DZD'}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
                        {isAr ? 'الكبار: 4 حصص شهرياً • الأطفال: 8 حصص شهرياً' : 'Adults: 4 sessions/mo • Kids: 8 sessions/mo'}
                      </span>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col gap-0.5 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400">
                          💰 {isAr ? 'الاشتراك المعتمد:' : 'Tuition Rates:'}
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sora">
                          {isAr ? '3000 دج/شهر • 9000 دج' : '3,000 /mo • 9,000 DZD'}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        {isAr ? 'الكبار: 4 حصص شهرياً • الأطفال: 8 حصص شهرياً' : 'Adults: 4 sessions/mo • Kids: 8 sessions/mo'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3 Action Buttons: Facebook + Map + Quick Call */}
              <div className="space-y-2 pt-2 relative z-10">
                {/* 1. Official Facebook Contact Button */}
                <a
                  href={b.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] active:bg-[#0e65d9] text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer select-none"
                  id={`branch-fb-btn-${b.id}`}
                  title={isAr ? `تواصل مع ${b.nameAr} عبر صفحة فيسبوك الرسمية` : `Contact ${b.nameEn} on Facebook`}
                >
                  <FacebookIcon className="w-4 h-4 fill-white shrink-0" />
                  <span>{isAr ? 'تواصل عبر فيسبوك' : 'Contact on Facebook'}</span>
                  <ExternalLink className="w-3 h-3 text-white/80 shrink-0" />
                </a>

                {/* 2. Official Google Maps Universal Link */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-sm cursor-pointer select-none"
                  id={`branch-map-btn-${b.id}`}
                  title={isAr ? `عرض موقع ${b.nameAr} على خريطة Google` : `View ${b.nameEn} on Google Maps`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
                  <span>{isAr ? 'موقع الفرع على الخريطة' : 'View on Map'}</span>
                  <ExternalLink className="w-3 h-3 text-black/70 shrink-0" />
                </a>

                {/* 3. Direct Phone Call Button */}
                <a
                  href={b.telLink}
                  className="w-full py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  id={`branch-call-btn-${b.id}`}
                >
                  <Phone className="w-3 h-3 text-amber-500" />
                  <span>{isAr ? 'اتصال مباشر بالفرع' : 'Call Direct Line'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Contact Form & Central Administration Reception Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Message Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-start space-y-6 shadow-xl">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAr ? 'مراسلة الإدارة المركزية والفروع' : 'Direct Inquiries Form'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                {isAr ? 'أرسل لنا استفسارك مباشرة' : 'Send an Inquiry to Any Branch'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isAr
                  ? 'اختر الفرع المطلوب واكتب استفسارك بالتفصيل. سيقوم فريق الاستقبال بمراجعة طلبك والرد عليك عبر الهاتف أو البريد الإلكتروني.'
                  : 'Select your target branch and write your question. Our reception team will get back to you promptly.'}
              </p>
            </div>

            {formSent ? (
              <div className="p-8 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-black text-zinc-950 dark:text-white">
                  {isAr ? 'تم فتح تطبيق البريد لإرسال رسالتكم بنجاح' : 'Email Client Triggered Successfully'}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? 'شكراً لتواصلكم مع Your Academy! تم تجهيز نص الرسالة وتوجيهها لإدارة الفرع المختار. لأي استفسار عاجل يمكنكم الاتصال بالهواتف المباشرة أعلاه.'
                    : 'Thank you for reaching out! Your message was formatted for our branch administration. For urgent inquiries, please call directly.'}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setFormSent(false)}
                    className="px-6 py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-xs font-bold text-zinc-900 dark:text-white hover:bg-zinc-300 cursor-pointer"
                  >
                    {isAr ? 'إرسال استفسار إضافي' : 'Send Another Inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1" htmlFor="cf-name">
                      {isAr ? 'الاسم الكامل' : 'Full Name'} *
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder={isAr ? 'محمد أمين' : 'John Doe'}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1" htmlFor="cf-phone">
                      {isAr ? 'رقم الهاتف' : 'Phone Number'} *
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="0552 40 40 59"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1" htmlFor="cf-email">
                      {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="example@mail.com"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1" htmlFor="cf-branch">
                      {isAr ? 'الفرع المطلوب التواصل معه' : 'Selected Branch'} *
                    </label>
                    <select
                      id="cf-branch"
                      value={contactForm.branch}
                      onChange={(e) => setContactForm({ ...contactForm, branch: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm outline-none focus:border-amber-500 font-bold"
                    >
                      <option value="فرع عين الدفلى — المقر الرئيسي">
                        {isAr ? 'فرع عين الدفلى — المقر الرئيسي' : 'Aïn Defla — Main HQ'}
                      </option>
                      <option value="فرع البليدة">
                        {isAr ? 'فرع البليدة' : 'Blida Branch'}
                      </option>
                      <option value="فرع خميس مليانة">
                        {isAr ? 'فرع خميس مليانة' : 'Khemis Miliana Branch'}
                      </option>
                      <option value="فرع العطاف">
                        {isAr ? 'فرع العطاف' : 'El Attaf Branch'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-300 mb-1" htmlFor="cf-message">
                    {isAr ? 'نص الاستفسار أو الرسالة' : 'Message / Inquiry'} *
                  </label>
                  <textarea
                    id="cf-message"
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder={
                      isAr
                        ? 'اكتب استفسارك بالتفصيل (حول اللغات، أسعار التسجيل، أو الدعم المدرسي)...'
                        : 'Write your inquiry details here (languages, tuition fees, tutoring)...'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm outline-none focus:border-amber-500 resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
                >
                  <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{isAr ? 'إرسال الاستفسار الآن' : 'Send Inquiry Now'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Reception Hours & Central Hotline (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-start">
            
            {/* Working Hours Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-zinc-950 dark:text-white">
                    {isAr ? 'أوقات العمل والاستقبال' : 'Working & Reception Hours'}
                  </h3>
                  <span className="text-xs text-zinc-500">{isAr ? 'موحدة في كافة الفروع' : 'Across all 4 branches'}</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-bold flex items-center justify-between">
                  <span>{isAr ? 'السبت إلى الخميس' : 'Saturday to Thursday'}</span>
                  <span className="text-amber-700 dark:text-amber-400 font-mono">08:30 — 18:00</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500">
                  {isAr
                    ? 'الجمعة: مغلق (أو مخصص للحصص الاستدراكية المبرمجة مسبقاً)'
                    : 'Friday: Closed (or reserved for pre-scheduled makeups)'}
                </div>
              </div>
            </div>

            {/* Central Hotline Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-amber-500 text-black space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-amber-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black">
                    {isAr ? 'الخط الساخن للمقر الرئيسي' : 'Main HQ Central Hotline'}
                  </h3>
                  <span className="text-xs font-bold opacity-85">
                    {isAr ? 'عين الدفلى • رد مباشر وسريع' : 'Aïn Defla • Fast direct support'}
                  </span>
                </div>
              </div>

              <a
                href="tel:0552404059"
                className="w-full py-3.5 px-4 rounded-2xl bg-black hover:bg-zinc-900 text-amber-400 font-black text-base flex items-center justify-center gap-2 font-mono shadow-md"
                dir="ltr"
              >
                <Phone className="w-4 h-4" />
                <span>0552 40 40 59</span>
              </a>

              <p className="text-xs font-medium text-center opacity-90 leading-relaxed">
                {isAr
                  ? 'حي الإخوة شوال، طريق مسجد مالك ابن أنس، عين الدفلى، الجزائر'
                  : 'Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas, Aïn Defla, Algeria'}
              </p>
            </div>

            {/* Branch Quality Assurance Note */}
            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-950 dark:text-white font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? 'ضمان نفس الجودة في كل الفروع' : 'Guaranteed Quality Standard'}</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isAr
                  ? 'سواء سجلت في عين الدفلى، البليدة، خميس مليانة، أو العطاف؛ ستحصل على نفس المنهاج الأكاديمي المعتمد ونفس المتابعة الفردية الدقيقة.'
                  : 'Whether you enroll in Aïn Defla, Blida, Khemis Miliana, or El Attaf, you receive the same certified quality and pedagogical care.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Branch Selection Guidance Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-start space-y-4">
          <div className="flex items-center gap-2.5">
            <Navigation className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
              {isAr ? 'كيف تختار الفرع الأنسب لك؟' : 'How to Choose Your Nearest Branch?'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            {isAr
              ? 'تعتمد كافة فروع Your Academy نفس المنهاج الأكاديمي، ونفس المعايير البيداغوجية، ونفس الأسعار الرسمية. يمكنك اختيار الفرع الأقرب إلى مقر سكنك أو عملك، كما يمكنك تحديد الفرع مباشرة في استمارة التسجيل الإلكتروني لحجز مقعدك فوراً.'
              : 'All Your Academy branches implement the exact same curriculum, pedagogical standards, and official tuition fees. Choose the campus closest to you, or select it directly in the pre-enrollment application.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs sm:text-sm transition-all cursor-pointer"
            >
              {isAr ? 'فتح استمارة التسجيل واختيار الفرع' : 'Open Registration Form & Pick Branch'}
            </button>
          </div>
        </div>
      </section>

      {/* 6. Official Social Media Channels (All 3 branded platforms) */}
      <SocialMediaSection />

      {/* 7. Community Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <CommunityNewsletter onOpenRegister={onOpenRegister} />
      </section>
    </div>
  );
};
