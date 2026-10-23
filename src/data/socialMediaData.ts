export interface SocialBranchLink {
  id: string;
  branchNameAr: string;
  branchNameEn: string;
  handleOrLabel: string;
  url: string;
}

export interface SocialPlatformConfig {
  id: 'facebook' | 'instagram' | 'tiktok';
  name: string;
  taglineAr: string;
  taglineEn: string;
  brandColor: string;
  branches: SocialBranchLink[];
}

/**
 * Official Your Academy Social Media Profiles
 * CRITICAL: The branch order across Facebook & Instagram is confirmed and strictly maintained:
 * 1. Aïn Defla
 * 2. Blida
 * 3. Khemis Miliana
 * 4. El Attaf
 *
 * All URLs and query parameters are preserved verbatim.
 * TikTok contains solely the main academy account (@youracademy44).
 */
export const SOCIAL_MEDIA_PLATFORMS: SocialPlatformConfig[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    taglineAr: 'صفحات الفروع الرسمية على فيسبوك',
    taglineEn: 'Official Branch Pages on Facebook',
    brandColor: '#1877F2',
    branches: [
      {
        id: 'fb-ain-defla',
        branchNameAr: 'عين الدفلى',
        branchNameEn: 'Aïn Defla',
        handleOrLabel: 'youracademy44',
        url: 'https://www.facebook.com/youracademy44',
      },
      {
        id: 'fb-blida',
        branchNameAr: 'البليدة',
        branchNameEn: 'Blida',
        handleOrLabel: 'youracademyblida',
        url: 'https://www.facebook.com/youracademyblida',
      },
      {
        id: 'fb-khemis-miliana',
        branchNameAr: 'خميس مليانة',
        branchNameEn: 'Khemis Miliana',
        handleOrLabel: 'YourAcademy.khemismiliana',
        url: 'https://www.facebook.com/YourAcademy.khemismiliana',
      },
      {
        id: 'fb-el-attaf',
        branchNameAr: 'العطاف',
        branchNameEn: 'El Attaf',
        handleOrLabel: 'Your Academy El Attaf',
        url: 'https://www.facebook.com/profile.php?id=100086080088537',
      },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    taglineAr: 'حسابات إنستغرام لجميع الفروع',
    taglineEn: 'Official Branch Accounts on Instagram',
    brandColor: '#E1306C',
    branches: [
      {
        id: 'ig-ain-defla',
        branchNameAr: 'عين الدفلى',
        branchNameEn: 'Aïn Defla',
        handleOrLabel: '@your.academy44',
        url: 'https://www.instagram.com/your.academy44?xtok=MWxrOGh6bmlmdDh3cQ==',
      },
      {
        id: 'ig-blida',
        branchNameAr: 'البليدة',
        branchNameEn: 'Blida',
        handleOrLabel: '@youracademy_blida',
        url: 'https://www.instagram.com/youracademy_blida?cplk=Y2p5aTJsNWE5cDZu',
      },
      {
        id: 'ig-khemis-miliana',
        branchNameAr: 'خميس مليانة',
        branchNameEn: 'Khemis Miliana',
        handleOrLabel: '@youracademy_khmis',
        url: 'https://www.instagram.com/youracademy_khmis?rpxt=d2JueDdubzh2bG9v',
      },
      {
        id: 'ig-el-attaf',
        branchNameAr: 'العطاف',
        branchNameEn: 'El Attaf',
        handleOrLabel: '@youracademyattaf',
        url: 'https://www.instagram.com/youracademyattaf?srtk=MTdoOGUzZm12MGVjNQ==',
      },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    taglineAr: 'الحساب الرسمي الموحد للأكاديمية',
    taglineEn: 'Official Main Academy Account',
    brandColor: '#000000',
    branches: [
      {
        id: 'tt-main',
        branchNameAr: 'الحساب الرئيسي — جميع الفروع',
        branchNameEn: 'Main Academy Account',
        handleOrLabel: '@youracademy44',
        url: 'https://www.tiktok.com/@youracademy44?_r=1&_t=ZS-9AkCKvGc2Q4',
      },
    ],
  },
];
