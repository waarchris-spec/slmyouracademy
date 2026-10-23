import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { FaqSection } from '../components/FaqSection';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { HelpCircle, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FaqPageProps {
  onOpenRegister: (program?: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenRegister }) => {
  const { isRtl, language, t } = useLanguage();
  const isAr = language === 'ar';

  usePageMeta({
    titleAr: 'الأسئلة الشائعة — إجابات وافية حول التسجيل والأسعار والشهادات',
    titleEn: 'Frequently Asked Questions — Tuition, Sessions & Enrollment FAQ',
    descAr: 'إجابات عن كافة الأسئلة الشائعة حول برامج اللغات، الاشتراك الشهري 3000 دج، تكلفة المستوى 9000 دج، تسعيرة فرع البليدة 4000 دج، وحصص الكبار (4) والأطفال (8).',
    descEn: 'Comprehensive answers about language tracks, 3,000 DZD monthly subscription, 9,000 DZD full level, 4,000 DZD Blida branch rate, and session frequency (Adults 4, Kids 8).',
  });

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Page Header */}
      <PageHeader
        badge={isAr ? 'مركز المساعدة والاستفسارات' : 'Help & Inquiries Center'}
        badgeIcon={<HelpCircle className="w-4 h-4 text-amber-500" />}
        breadcrumbs={[{ label: isAr ? 'الأسئلة الشائعة' : 'FAQ' }]}
        title={isAr ? 'الإجابات الرسمية عن' : 'Official Answers to'}
        titleHighlight={isAr ? 'أكثر الأسئلة تكراراً' : 'Common Questions'}
        description={
          isAr
            ? 'جمعنا لكم هنا أهم الاستفسارات المتكررة حول شروط التسجيل، مواعيد انطلاق الأفواج، طبيعة الشهادات الممنوحة، وتفاصيل عروض البرامج.'
            : 'Explore clear answers to common inquiries regarding enrollment procedures, cohort dates, accredited certificates, and seasonal pricing.'
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isAr ? 'سجل الآن مباشرة' : 'Register Directly'}</span>
            </button>
            <Link
              to="/contact"
              className="px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-300 dark:border-zinc-700 transition-colors"
            >
              {isAr ? 'لم تجد سؤالك؟ تواصل معنا' : 'Have a Question? Contact Us'}
            </Link>
          </div>
        }
      />

      {/* Main FAQ Accordion Component */}
      <FaqSection />

      {/* Bottom Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-start">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
              {isAr ? 'هل لديك استفسار إضافي لم تجده هنا؟' : 'Have More Questions Not Answered Here?'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              {isAr
                ? 'فريق الاستقبال في فروعنا مستعد للرد الفوري ومساعدتك في اختيار البرنامج الأنسب.'
                : 'Our front-desk team at all branches is ready to assist you right away.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm active:scale-95 transition-all"
            >
              {isAr ? 'تواصل معنا الآن' : 'Contact Us'}
            </Link>
            <a
              href="tel:0552404059"
              className="p-3.5 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
              title="0552 40 40 59"
            >
              <Phone className="w-5 h-5 text-amber-500" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
