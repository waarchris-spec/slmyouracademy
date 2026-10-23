import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface MetaOptions {
  titleAr: string;
  titleEn: string;
  descAr?: string;
  descEn?: string;
}

export const usePageMeta = ({ titleAr, titleEn, descAr, descEn }: MetaOptions) => {
  const { language } = useLanguage();

  useEffect(() => {
    const isAr = language === 'ar';
    const baseTitle = isAr ? 'أكاديمية Your Academy' : 'Your Academy';
    const title = isAr ? `${titleAr} | ${baseTitle}` : `${titleEn} | ${baseTitle}`;
    document.title = title;

    const description = isAr ? descAr : descEn;
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [language, titleAr, titleEn, descAr, descEn]);
};
