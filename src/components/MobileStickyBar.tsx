import React, { useState } from 'react';
import { ACADEMY_INFO, academyCampaign, branchFacebookUrls } from '../data/academyData';
import {
  Phone,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
  Sparkles,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Copy,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface MobileStickyBarProps {
  onOpenRegister: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenRegister }) => {
  const { t, isRtl, language } = useLanguage();
  const [showCallSheet, setShowCallSheet] = useState(false);
  const [showFacebookHub, setShowFacebookHub] = useState(false);

  const branches = [
    {
      id: 'ain-defla',
      name: isRtl ? 'فرع عين الدفلى — الرئيسي' : 'Aïn Defla — Main HQ',
      phone: '0552 40 40 59',
      whatsappRaw: '213552404059',
      address: isRtl ? 'حي الإخوة شوال، طريق مسجد مالك ابن أنس' : 'Hay El Ikhwa Chaoual, Aïn Defla',
      exactAddress: isRtl ? 'حي الإخوة شوال، طريق مسجد مالك ابن أنس، عين الدفلى، الجزائر 44000' : 'Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas, Aïn Defla, Algeria, 44000',
      isMain: true,
    },
    {
      id: 'khemis-miliana',
      name: isRtl ? 'فرع خميس مليانة' : 'Khemis Miliana Branch',
      phone: '0551 40 40 59',
      whatsappRaw: '213551404059',
      address: isRtl ? 'تحت محل وزير القلايل مقابل زواق المصور' : 'Under Wazir El Qlayel, Khemis Miliana',
      exactAddress: isRtl ? 'تحت محل وزير القلايل مقابل زواق المصور، خميس مليانة، الجزائر 44000' : 'Under Wazir El Qlayel store, opposite Zouak Photographer, Khemis Miliana, Algeria, 44000',
      isMain: false,
    },
    {
      id: 'el-attaf',
      name: isRtl ? 'فرع العطاف' : 'El Attaf Branch',
      phone: '0670 40 66 59',
      whatsappRaw: '213670406659',
      address: isRtl ? 'العطاف، الجزائر 44000' : 'El Attaf, Algeria, 44000',
      exactAddress: 'El Attaf, Algeria, 44000',
      isMain: false,
    },
    {
      id: 'blida',
      name: isRtl ? 'فرع البليدة' : 'Blida Branch',
      phone: '0560 40 40 00',
      whatsappRaw: '213560404000',
      address: isRtl ? 'البليدة، الجزائر 09000' : 'Blida, Algeria 09000',
      exactAddress: isRtl ? 'البليدة، الجزائر 09000' : 'Blida, Algeria, 09000',
      isMain: false,
    },
  ];

  // 4 Official Academy Branches for Facebook Contact Hub
  const facebookBranches = [
    {
      id: 'ain-defla',
      nameAr: 'فرع عين الدفلى — الرئيسي',
      nameEn: 'Aïn Defla — Main HQ',
      badgeAr: 'الفرع الرئيسي',
      badgeEn: 'Main Branch',
      url: branchFacebookUrls['ain-defla'], // https://www.facebook.com/youracademy44
      isMain: true,
    },
    {
      id: 'blida',
      nameAr: 'فرع البليدة',
      nameEn: 'Blida Branch',
      badgeAr: 'فرع معتمد',
      badgeEn: 'Branch',
      url: branchFacebookUrls['blida'], // https://www.facebook.com/youracademyblida
      isMain: false,
    },
    {
      id: 'khemis-miliana',
      nameAr: 'فرع خميس مليانة',
      nameEn: 'Khemis Miliana Branch',
      badgeAr: 'فرع معتمد',
      badgeEn: 'Branch',
      url: branchFacebookUrls['khemis-miliana'], // https://www.facebook.com/YourAcademy.khemismiliana
      isMain: false,
    },
    {
      id: 'el-attaf',
      nameAr: 'فرع العطاف',
      nameEn: 'El Attaf Branch',
      badgeAr: 'فرع معتمد',
      badgeEn: 'Branch',
      url: branchFacebookUrls['el-attaf'], // https://www.facebook.com/profile.php?id=100086080088537
      isMain: false,
    },
  ];

  // Verified Suggested Inquiry Categories
  const quickInquiryTopics = [
    {
      id: 'general',
      titleAr: 'استفسار عام عن التسجيل والأسعار',
      titleEn: 'General Inquiry & Tuition Fees',
      icon: HelpCircle,
      msgAr: 'السلام عليكم، حبيت نستفسر على التسجيل والأسعار في Your Academy.',
      msgEn: 'Hello, I would like to inquire about registration and tuition fees at Your Academy.',
    },
    {
      id: 'languages',
      titleAr: 'دورات اللغات الأجنبية',
      titleEn: 'Foreign Language Courses',
      icon: BookOpen,
      msgAr: 'السلام عليكم، حبيت نستفسر على دورات اللغات المتوفرة وكيفاش نقدر نسجل.',
      msgEn: 'Hello, I would like to inquire about available language courses and how to enroll.',
    },
    {
      id: 'academic',
      titleAr: 'الدعم المدرسي وتحضير شهادة البكالوريا',
      titleEn: 'Academic Support & BAC/BEM Prep',
      icon: GraduationCap,
      msgAr: 'السلام عليكم، حبيت نستفسر على الدعم المدرسي وتحضير الأقسام النهائية.',
      msgEn: 'Hello, I would like to ask about academic tutoring and final exam preparation.',
    },
  ];

  const [selectedBranchId, setSelectedBranchId] = useState<string>('ain-defla');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('general');
  const [customMessage, setCustomMessage] = useState<string>(
    isRtl
      ? 'السلام عليكم، حبيت نستفسر على التسجيل والأسعار في Your Academy.'
      : 'Hello, I would like to inquire about registration and tuition fees at Your Academy.'
  );
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    const found = quickInquiryTopics.find((t) => t.id === topicId);
    if (found) {
      setCustomMessage(isRtl ? found.msgAr : found.msgEn);
    }
  };

  const handleManualCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(customMessage);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 3000);
      } else {
        setCopyStatus('failed');
      }
    } catch {
      setCopyStatus('failed');
    }
  };

  const handleCopyAndOpenFacebook = async () => {
    const branch = facebookBranches.find((b) => b.id === selectedBranchId) || facebookBranches[0];
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(customMessage);
        setCopyStatus('copied');
      }
    } catch {
      setCopyStatus('failed');
    }

    setTimeout(() => {
      setCopyStatus('idle');
    }, 4000);

    // Open official branch Facebook page in a new tab safely
    window.open(branch.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* 1. Branch Call & Navigation Selector Sheet */}
      {showCallSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCallSheet(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full sm:max-w-md bg-white dark:bg-[#0B0F17] rounded-t-3xl sm:rounded-3xl border border-amber-500/30 p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pb-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200 text-start">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-950 dark:text-white">
                <Phone className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-black">
                  {isRtl ? 'اختر الفرع للاتصال المباشر أو الملاحة' : 'Select Branch to Call or Map'}
                </h3>
              </div>
              <button
                onClick={() => setShowCallSheet(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center cursor-pointer"
                aria-label="Close call sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {branches.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/50 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-zinc-950 dark:text-white truncate">
                        {b.name}
                      </span>
                      {b.isMain && (
                        <span className="px-1.5 py-0.2 bg-amber-500 text-black text-[9px] font-black rounded shrink-0">
                          {isRtl ? 'الرئيسي' : 'MAIN'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {b.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        b.exactAddress
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-amber-600 dark:text-amber-400 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-colors active:scale-95"
                      title={isRtl ? 'عرض الموقع على الخريطة' : 'View on Google Maps'}
                      aria-label={`${b.name} - Google Maps`}
                    >
                      <MapPin className="w-4 h-4" />
                    </a>

                    <a
                      href={`tel:${b.phone.replace(/\s/g, '')}`}
                      className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs shrink-0 flex items-center gap-1.5 font-sora shadow-sm active:scale-95 transition-transform"
                      dir="ltr"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{b.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Facebook Contact Hub Modal / Sheet */}
      {showFacebookHub && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowFacebookHub(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full sm:max-w-lg bg-white dark:bg-[#0B0F17] rounded-t-3xl sm:rounded-3xl border border-[#1877F2]/40 p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pb-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200 text-start max-h-[88vh] sm:max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 text-zinc-950 dark:text-white">
                <div className="w-8 h-8 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FacebookIcon className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black">
                    {isRtl ? 'التواصل عبر Facebook' : 'Connect via Facebook'}
                  </h3>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    {isRtl
                      ? 'اختار الفرع أو نوع الاستفسار ونتوجهو بيك للصفحة الرسمية المناسبة.'
                      : 'Choose branch or inquiry type and we will direct you to the official page.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFacebookHub(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                aria-label="Close Facebook hub sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Featured Main Branch Block */}
            <div className="p-3.5 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/30 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2] fill-current" />
                  <span className="font-extrabold text-zinc-900 dark:text-white">
                    {isRtl ? 'الفرع الرئيسي — عين الدفلى' : 'Main Branch — Aïn Defla'}
                  </span>
                </div>
                <span className="text-[10px] bg-[#1877F2] text-white font-black px-2 py-0.5 rounded-full shadow-xs">
                  {isRtl ? 'الفرع الرئيسي' : 'Main Branch'}
                </span>
              </div>
              <a
                href={branchFacebookUrls['ain-defla']}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] active:bg-[#0e65d9] text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                id="featured-main-branch-facebook-btn"
                aria-label={isRtl ? 'فتح صفحة الفرع على Facebook' : 'Open Branch on Facebook'}
              >
                <FacebookIcon className="w-4 h-4 fill-white shrink-0" />
                <span>{isRtl ? 'فتح صفحة الفرع على Facebook' : 'Open Branch on Facebook'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80 shrink-0" />
              </a>
            </div>

            {/* Inquiry Suggestions Section */}
            <div className="space-y-2">
              <span className="text-[11px] font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                {isRtl ? 'اختر موضوع الاستفسار:' : 'Choose Inquiry Topic:'}
              </span>

              <div className="space-y-1.5">
                {quickInquiryTopics.map((topic) => {
                  const TopicIcon = topic.icon;
                  const isSelected = selectedTopicId === topic.id;

                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleSelectTopic(topic.id)}
                      className={`w-full p-2.5 rounded-xl border flex items-center justify-between gap-2.5 text-start transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1877F2]/10 border-[#1877F2] text-[#1877F2] font-black ring-1 ring-[#1877F2]/40 shadow-xs'
                          : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#1877F2] text-white'
                              : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          <TopicIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold truncate">
                          {isRtl ? topic.titleAr : topic.titleEn}
                        </span>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#1877F2] shrink-0" />
                      ) : (
                        <ChevronLeft className={`w-3.5 h-3.5 text-zinc-400 ${isRtl ? '' : 'rotate-180'} shrink-0`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prepared Inquiry Message Box */}
            <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-zinc-600 dark:text-zinc-400">
                  {isRtl ? 'نص الاستفسار المقترح (جاهز للنسخ):' : 'Prepared Inquiry (Ready to Copy):'}
                </span>
                <button
                  type="button"
                  onClick={handleManualCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-colors cursor-pointer"
                  title={isRtl ? 'نسخ النص' : 'Copy text'}
                >
                  {copyStatus === 'copied' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400 font-black">{isRtl ? 'تم النسخ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'نسخ النص' : 'Copy text'}</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={2}
                className="w-full text-xs font-medium text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-[#1877F2] resize-none leading-relaxed"
                dir={isRtl ? 'rtl' : 'ltr'}
              />

              {copyStatus === 'copied' && (
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{isRtl ? 'تم نسخ نص الاستفسار بنجاح! يمكنك لصقه في محادثة الصفحة.' : 'Message copied to clipboard! You can paste it in the chat.'}</span>
                </p>
              )}
            </div>

            {/* Branch Selection Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                  {isRtl ? 'فروع الأكاديمية على Facebook' : 'Academy Branches on Facebook'}
                </span>
                <span className="text-[10px] text-zinc-500 font-bold">
                  {isRtl ? 'اختر الفرع المطلوب' : 'Select branch'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {facebookBranches.map((b) => {
                  const isSelected = selectedBranchId === b.id;

                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBranchId(b.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between gap-1.5 cursor-pointer min-h-[64px] ${
                        isSelected
                          ? 'bg-[#1877F2]/10 border-[#1877F2] ring-2 ring-[#1877F2]/40 shadow-xs'
                          : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center gap-1 w-full justify-center">
                        <span className="text-[11px] text-zinc-950 dark:text-white font-black truncate">
                          {isRtl ? b.nameAr : b.nameEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {b.isMain ? (
                          <span className="text-[9px] bg-amber-500 text-black font-black px-1.5 py-0.2 rounded">
                            {isRtl ? 'الرئيسي' : 'HQ'}
                          </span>
                        ) : (
                          <span className="text-[9px] text-zinc-500 dark:text-zinc-400 font-medium">
                            {isRtl ? 'فرع معتمد' : 'Branch'}
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-[9px] bg-[#1877F2] text-white font-bold px-1.5 py-0.2 rounded">
                            {isRtl ? 'محدد ✓' : 'Selected'}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-1 space-y-2">
              <button
                type="button"
                onClick={handleCopyAndOpenFacebook}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] active:bg-[#0e65d9] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1877F2]/25 active:scale-98 transition-all cursor-pointer"
                id="copy-and-open-facebook-btn"
                aria-label={isRtl ? 'نسخ الاستفسار وفتح Facebook' : 'Copy Inquiry & Open Facebook'}
              >
                <FacebookIcon className="w-4 h-4 fill-white shrink-0" />
                <span>{isRtl ? 'نسخ الاستفسار وفتح Facebook' : 'Copy Inquiry & Open Facebook'}</span>
                <ExternalLink className="w-4 h-4 text-white/90 shrink-0" />
              </button>

              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
                {isRtl
                  ? '💡 سيتم نسخ نص استفسارك وفتح الصفحة الرسمية للفرع المحدد في تبويب جديد. يمكنك لصق النص في رسائل الصفحة والتواصل مع الإدارة.'
                  : '💡 Copies inquiry and opens the branch Facebook page in a new tab. Paste the message to start your chat.'}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          FLOATING IOS-INSPIRED GLASS BAR (Touch target >= 44px, Safe-Area aware, 14px corners)
         ========================================================================= */}
      <div className="fixed bottom-[max(0.85rem,calc(0.75rem+env(safe-area-inset-bottom,0px)))] inset-x-0 z-40 pointer-events-none flex justify-center items-center px-3 sm:px-4">
        <aside
          aria-label={isRtl ? 'شريط الإجراءات والاتصال السريع' : 'Quick Actions Bar'}
          className="pointer-events-auto relative max-w-fit w-auto inline-flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-[14px] bg-white/30 dark:bg-zinc-950/45 backdrop-blur-xl backdrop-saturate-150 border border-white/50 dark:border-white/10 ring-1 ring-black/[0.04] dark:ring-white/[0.06] shadow-[0_12px_36px_-6px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6),0_4px_16px_rgba(0,0,0,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.12)] transition-all select-none"
        >
          {/* Subtle top specular glass reflection */}
          <div className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 dark:via-white/20 to-transparent rounded-[14px]" />

          {/* 1. Direct Call Button with Branch Selector (Min 44px touch target) */}
          <button
            onClick={() => setShowCallSheet(true)}
            className="min-h-[44px] h-[44px] px-3.5 sm:px-4 rounded-[10px] sm:rounded-xl bg-black/[0.05] hover:bg-black/[0.09] active:bg-black/[0.13] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] dark:active:bg-white/[0.18] border border-black/[0.05] dark:border-white/[0.1] text-zinc-800 dark:text-zinc-100 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer backdrop-blur-md shadow-xs"
            id="mobile-sticky-call-btn"
            aria-label={isRtl ? 'اتصل بنا' : 'Call Us'}
          >
            <Phone className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 shrink-0" />
            <span className="whitespace-nowrap">{isRtl ? 'اتصال' : 'Call'}</span>
          </button>

          {/* 2. Direct Facebook Contact Hub Button (Min 44px touch target) */}
          <button
            onClick={() => setShowFacebookHub(true)}
            className="min-h-[44px] h-[44px] px-3.5 sm:px-4 rounded-[10px] sm:rounded-xl bg-[#1877F2]/90 hover:bg-[#1877F2] active:bg-[#1565C0] text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/25 shadow-sm shadow-[#1877F2]/30 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            id="mobile-sticky-facebook-btn"
            aria-label={isRtl ? 'التواصل عبر Facebook' : 'Contact on Facebook'}
            title={isRtl ? 'التواصل عبر Facebook' : 'Contact on Facebook'}
          >
            <FacebookIcon className="w-3.5 h-3.5 text-white fill-current shrink-0" />
            <span className="whitespace-nowrap">{isRtl ? 'تواصل Facebook' : 'Facebook'}</span>
          </button>

          {/* 3. High-Contrast Register CTA (Min 44px touch target) */}
          <button
            onClick={onOpenRegister}
            className="group min-h-[44px] h-[44px] px-4 sm:px-5 rounded-[10px] sm:rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:brightness-105 active:scale-95 text-zinc-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-amber-300/70 dark:border-amber-300/50 shadow-md shadow-amber-500/30 transition-all cursor-pointer"
            id="mobile-sticky-register"
          >
            <Sparkles className="w-3.5 h-3.5 fill-black shrink-0 transition-transform group-hover:rotate-12" />
            <span className="whitespace-nowrap">{t.common.registerNow}</span>
            {isRtl ? (
              <ChevronLeft className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>

        </aside>
      </div>
    </>
  );
};
