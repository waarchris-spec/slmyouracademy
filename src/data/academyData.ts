import { ContactInfo, ProgramItem, AcademyLocation } from '../types';

/**
 * Generates the official Google Maps Search Intent URL for mobile and desktop navigation.
 * Standard format: https://www.google.com/maps/search/?api=1&query=...
 * Mobile platforms (iOS Safari, Android Chrome) automatically intercept this universal link
 * to open the native Google Maps app pre-filled with the exact physical address.
 */
export const getGoogleMapsIntentUrl = (fullPhysicalAddress: string): string => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullPhysicalAddress.trim())}`;
};

/**
 * Reusable locations data structure for Your Academy
 * Supporting official academy branches with exact address strings for Google Maps:
 * 1. Aïn Defla — Main Location (الرئيسي)
 * 2. Blida — Branch
 * 3. Khemis Miliana — Branch
 */
/**
 * Official verified Facebook URLs for all four Your Academy branches
 */
export const branchFacebookUrls: Record<string, string> = {
  "ain-defla": "https://www.facebook.com/youracademy44",
  "blida": "https://www.facebook.com/youracademyblida",
  "khemis-miliana": "https://www.facebook.com/YourAcademy.khemismiliana",
  "el-attaf": "https://www.facebook.com/profile.php?id=100086080088537",
};

export const academyLocations: AcademyLocation[] = [
  {
    id: "ain-defla",
    name: "Your Academy - عين الدفلى (الرئيسي)",
    nameAr: "فرع عين الدفلى — الرئيسي",
    city: "عين الدفلى",
    cityEn: "Aïn Defla",
    address: "حي الإخوة شوال، طريق مسجد مالك ابن أنس",
    locationEn: "Aïn Defla, Algeria, 44000",
    phone: "0552 40 40 59",
    isMain: true,
    postalCode: "44000",
    addressEn: "Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas, Aïn Defla",
    branchNameAr: "فرع عين الدفلى — الرئيسي",
    branchNameEn: "Aïn Defla Branch (Main)",
    cityFullAr: "عين الدفلى، الجزائر 44000",
    cityFullEn: "Aïn Defla, Algeria, 44000",
    exactAddressAr: "حي الإخوة شوال، طريق مسجد مالك ابن أنس، عين الدفلى، الجزائر 44000",
    exactAddressEn: "Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas, Aïn Defla, Algeria, 44000",
    mapUrl: getGoogleMapsIntentUrl("حي الإخوة شوال، طريق مسجد مالك ابن أنس، عين الدفلى، الجزائر 44000"),
    facebookUrl: branchFacebookUrls["ain-defla"],
  },
  {
    id: "blida",
    name: "Your Academy - البليدة",
    nameAr: "فرع البليدة",
    city: "البليدة",
    cityEn: "Blida",
    address: "البليدة، الجزائر 09000",
    locationEn: "Blida, Algeria",
    phone: "0560 40 40 00",
    isMain: false,
    postalCode: "09000",
    addressEn: "Blida, Algeria, 09000",
    branchNameAr: "فرع البليدة",
    branchNameEn: "Blida Branch",
    cityFullAr: "البليدة، الجزائر 09000",
    cityFullEn: "Blida, Algeria, 09000",
    exactAddressAr: "البليدة، الجزائر 09000",
    exactAddressEn: "Blida, Algeria, 09000",
    mapUrl: getGoogleMapsIntentUrl("البليدة، الجزائر 09000"),
    facebookUrl: branchFacebookUrls["blida"],
  },
];

export const khemisMilianaLocation: AcademyLocation = {
  id: "khemis-miliana",
  name: "Your Academy - خميس مليانة",
  nameAr: "فرع خميس مليانة",
  city: "خميس مليانة",
  cityEn: "Khemis Miliana",
  address: "تحت محل وزير القلايل مقابل زواق المصور، خميس مليانة",
  locationEn: "Khemis Miliana, Algeria, 44000",
  phone: "0551 40 40 59",
  isMain: false,
  postalCode: "44000",
  addressEn: "Under Wazir El Qlayel store, opposite Zouak Photographer, Khemis Miliana",
  branchNameAr: "فرع خميس مليانة",
  branchNameEn: "Khemis Miliana Branch",
  cityFullAr: "خميس مليانة، الجزائر 44000",
  cityFullEn: "Khemis Miliana, Algeria, 44000",
  exactAddressAr: "تحت محل وزير القلايل مقابل زواق المصور، خميس مليانة، الجزائر 44000",
  exactAddressEn: "Under Wazir El Qlayel store, opposite Zouak Photographer, Khemis Miliana, Algeria, 44000",
  mapUrl: getGoogleMapsIntentUrl("تحت محل وزير القلايل مقابل زواق المصور، خميس مليانة، الجزائر 44000"),
  facebookUrl: branchFacebookUrls["khemis-miliana"],
};

export const elAttafLocation: AcademyLocation = {
  id: "el-attaf",
  name: "Your Academy - العطاف",
  nameAr: "فرع العطاف",
  nameEn: "El Attaf Branch",
  city: "العطاف",
  cityEn: "El Attaf",
  address: "العطاف، الجزائر 44000",
  locationEn: "El Attaf, Algeria, 44000",
  phone: "0670 40 66 59",
  email: "youracademyattaf@gmail.com",
  facebookName: "Your Academy - العطاف",
  facebookUrl: branchFacebookUrls["el-attaf"],
  descriptionAr: "أكاديمية تعلم اللغات الأجنبية في بلدية العطاف لصانع المحتوى يونس تضمن لكم جودة التعليم والتعلّم مع نخبة من الأساتذة 💛",
  categoryAr: "مدرسة خاصة",
  categoryEn: "Private School",
  isMain: false,
  postalCode: "44000",
  addressEn: "El Attaf, Algeria, 44000",
  branchNameAr: "فرع العطاف",
  branchNameEn: "El Attaf Branch",
  cityFullAr: "العطاف، الجزائر 44000",
  cityFullEn: "El Attaf, Algeria, 44000",
  exactAddressAr: "العطاف، الجزائر 44000",
  exactAddressEn: "El Attaf, Algeria, 44000",
  mapUrl: getGoogleMapsIntentUrl("El Attaf, Algeria, 44000"),
};

export const allAcademyLocations: AcademyLocation[] = [
  academyLocations[0], // Aïn Defla (Main)
  academyLocations[1], // Blida Branch
  khemisMilianaLocation, // Khemis Miliana Branch
  elAttafLocation, // El Attaf Branch
];


/**
 * Centralized Active Campaign Information
 * Update these values to update campaign details across the whole application.
 */
export const academyCampaign = {
  academicYear: "2026 / 2027",
  academicYearEn: "Open For 2026 / 2027",
  startDate: "18 سبتمبر 2026",
  startDateArFull: "بداية البرنامج الدراسي يوم 18 سبتمبر 2026",
  registrationStatus: "التسجيلات مفتوحة",
  offer: "مستوى كامل 9000 دج فقط",
  monthlyPrice: "3000 دج شهرياً",
  monthlyPriceEn: "3,000 DZD per month",
  fullLevelPrice: "9000 دج للمستوى الكامل",
  fullLevelPriceEn: "9,000 DZD for full level",
  blidaPrice: "4000 دج (فرع البليدة)",
  blidaPriceEn: "4,000 DZD (Blida Branch)",
  adultsSessions: "4 حصص شهرياً للكبار",
  adultsSessionsEn: "4 sessions / month (Adults)",
  kidsSessions: "8 حصص شهرياً للأطفال",
  kidsSessionsEn: "8 sessions / month (Kids)",
};

export const ACADEMY_PRICING = {
  monthly: {
    amount: 3000,
    formattedAr: '3000 دج / شهرياً',
    formattedEn: '3,000 DZD / month',
    labelAr: 'الاشتراك الشهري',
    labelEn: 'Monthly Subscription',
  },
  fullLevel: {
    amount: 9000,
    formattedAr: '9000 دج للمستوى الكامل',
    formattedEn: '9,000 DZD for full level',
    labelAr: 'المستوى الدراسي الكامل',
    labelEn: 'Full-Level Course',
  },
  blidaBranch: {
    amount: 4000,
    formattedAr: '4000 دج (فرع البليدة)',
    formattedEn: '4,000 DZD (Blida Branch)',
    labelAr: 'تسعيرة فرع البليدة المخصصة',
    labelEn: 'Blida Branch Dedicated Tuition',
  },
  classFrequency: {
    adults: {
      sessionsPerMonth: 4,
      formattedAr: '4 حصص شهرياً (فئة الكبار / البالغين)',
      formattedEn: '4 sessions per month (Adults)',
    },
    kids: {
      sessionsPerMonth: 8,
      formattedAr: '8 حصص شهرياً (فئة الأطفال)',
      formattedEn: '8 sessions per month (Kids)',
    },
  },
};

export const BRANCH_CONTACT_NUMBERS = [
  {
    branchId: 'ain-defla',
    branchNameAr: 'فرع عين الدفلى — الرئيسي',
    branchNameEn: 'Aïn Defla — Main Branch',
    phone: '0552 40 40 59',
    telLink: 'tel:+213552404059',
    isMain: true,
  },
  {
    branchId: 'blida',
    branchNameAr: 'فرع البليدة',
    branchNameEn: 'Blida Branch',
    phone: '0560 40 40 00',
    telLink: 'tel:+213560404000',
    isMain: false,
  },
  {
    branchId: 'khemis-miliana',
    branchNameAr: 'فرع خميس مليانة',
    branchNameEn: 'Khemis Miliana Branch',
    phone: '0551 40 40 59',
    telLink: 'tel:+213551404059',
    isMain: false,
  },
  {
    branchId: 'el-attaf',
    branchNameAr: 'فرع العطاف',
    branchNameEn: 'El Attaf Branch',
    phone: '0670 40 66 59',
    telLink: 'tel:+213670406659',
    isMain: false,
  },
];

export const ACADEMY_INFO: ContactInfo = {
  academyNameAr: 'أكاديمية Your Academy',
  academyNameEn: 'YOUR ACADEMY',
  slogan: 'طريقك نحو النجاح يبدأ من هنا',
  locationName: 'عين الدفلى (الرئيسي) • البليدة • خميس مليانة • العطاف',
  locationFull: 'فرع عين الدفلى (الرئيسي): 0552 40 40 59 • فرع البليدة: 0560 40 40 00 • فرع خميس مليانة: 0551 40 40 59 • فرع العطاف: 0670 40 66 59',
  cityState: 'عين الدفلى • البليدة • خميس مليانة • العطاف',
  phones: ['0552 40 40 59', '0560 40 40 00', '0551 40 40 59', '0670 40 66 59'],
  email: 'youracademykn@gmail.com',
  startDateCampaign: `بداية البرنامج الدراسي يوم ${academyCampaign.startDate}`,
  academicYear: `Open For ${academyCampaign.academicYear}`,
  priceOffer: academyCampaign.offer,
};

export const CAMPAIGN_MOTTO = {
  backToSchool: 'BACK TO SCHOOL',
  year: `Open For ${academyCampaign.academicYear}`,
  tagline1: 'DO WHAT YOU LOVE',
  tagline2: 'LOVE WHAT YOU DO',
  status: academyCampaign.registrationStatus,
};

export const CORE_PILLARS = [
  {
    id: 'pillar-1',
    title: 'متابعة فردية لكل تلميذ',
    description: 'نحرص على مرافقة كل متعلم وتحديد نقاط القوة لديه مع معالجة الصعوبات خطوة بخطوة لضمان التطور الحقيقي.',
    iconName: 'UserCheck',
  },
  {
    id: 'pillar-2',
    title: 'طرق حديثة في الشرح',
    description: 'استخدام الوسائل التفاعلية والتقنيات العصرية لتبسيط المفاهيم وجعل التعلم ممتعاً وتطبيقياً بعيداً عن التلقين.',
    iconName: 'Sparkles',
  },
  {
    id: 'pillar-3',
    title: 'أساتذة شباب متمكنين',
    description: 'فريق بيداغوجي شاب يتمتع بالحيوية والكفاءة العالية والشغف بالتعليم، قادر على إيصال المعلومة بكل سلاسة.',
    iconName: 'GraduationCap',
  },
  {
    id: 'pillar-4',
    title: 'حصص دعم للأقسام النهائية',
    description: 'برامج مكثفة مخصصة لشهادات البكالوريا (BAC) والتعليم المتوسط (BEM) تركّز على المنهجية وحل مواضيع الامتحانات.',
    iconName: 'BookOpen',
  },
  {
    id: 'pillar-5',
    title: 'تحسين المستوى في مختلف اللغات',
    description: 'دورات تدريبية متخصصة لرفع الكفاءة اللغوية في الإنجليزية، الفرنسية، الإسبانية، والألمانية.',
    iconName: 'Languages',
  },
  {
    id: 'pillar-6',
    title: 'شهادة بالتعاون مع منظمة بريطانية',
    description: 'يحصل المتدرج بعد اجتياز متطلبات المستوى على شهادة نهاية المستوى بالتعاون مع منظمة بريطانية.',
    iconName: 'Award',
  },
];

export const LANGUAGE_PROGRAMS: ProgramItem[] = [
  {
    id: 'lang-en',
    category: 'languages',
    title: 'اللغة الإنجليزية',
    subTitleEn: 'English Language',
    badge: 'الأكثر إقبالاً',
    description: 'برنامج تدريبي متكامل يركز على المحادثة السليمة واكتساب الطلاقة وبناء الثقة في التواصل اليومي والمهني والدراسي.',
    highlights: [
      'تطوير مهارات المحادثة والاستماع (Speaking & Listening)',
      'تبسيط القواعد التطبيقية واستخدامها التلقائي',
      'شهادة نهاية المستوى بالتعاون مع منظمة بريطانية',
      'متابعة فردية وتصحيح دوري للأخطاء',
    ],
    priceTag: '9000 دج للمستوى الكامل',
    durationNote: 'مستوى كامل مع متابعة مستمرة',
    targetAudience: 'المبتدئين، الطلاب، والراغبين في تطوير المستوى',
    certification: 'شهادة بالتعاون مع منظمة بريطانية',
  },
  {
    id: 'lang-fr',
    category: 'languages',
    title: 'اللغة الفرنسية',
    subTitleEn: 'Langue Française',
    badge: 'تطوير أكاديمي ومهني',
    description: 'دورة تركز على إتقان التعبير الشفوي والكتابي، فهم النصوص، واكتساب مصطلحات دقيقة تفيد في المسار الدراسي والمهني.',
    highlights: [
      'التركيز على مهارات التعبير الشفوي (Expression Orale)',
      'إتقان قواعد الصرف والنحو والتركيب اللغوي',
      'تمارين تطبيقية تفاعلية ونقاشات جماعية هادفة',
      'مرافقة بيداغوجية دقيقة لكل طالب',
    ],
    priceTag: '9000 دج للمستوى الكامل',
    durationNote: 'مستوى كامل مع أنشطة تطبيقية',
    targetAudience: 'التلاميذ والطلبة والمهنيين',
    certification: 'شهادة إتمام المستوى',
  },
  {
    id: 'lang-es',
    category: 'languages',
    title: 'اللغة الإسبانية',
    subTitleEn: 'Idioma Español',
    badge: 'لغة عالمية وتواصل عملي',
    description: 'تعلم الإسبانية من الصفر بخطوات مدروسة وبطريقة سلسة وشيقة تمكنك من التحدث والتواصل بطلاقة.',
    highlights: [
      'تعلم نطق الحروف والكلمات الإسبانية بالشكل الصحيح',
      'التدريب على حوارات المواقف اليومية والسفر',
      'طرق شرح حديثة وممتعة تثبت المفردات الأساسية',
      'بيئة تدريبية تشجع على الممارسة المستمرة',
    ],
    priceTag: '9000 دج للمستوى الكامل',
    durationNote: 'مستوى كامل مع تدريبات تفاعلية',
    targetAudience: 'محبو اللغات والطلاب',
    certification: 'شهادة إتمام المستوى',
  },
  {
    id: 'lang-de',
    category: 'languages',
    title: 'اللغة الألمانية',
    subTitleEn: 'Deutsche Sprache',
    badge: 'فرص دراسية ومهنية',
    description: 'بناء قاعدة قوية في الألمانية للمبتدئين وفق المعايير المعترف بها دولياً للراغبين في الدراسة أو العمل.',
    highlights: [
      'إتقان مخارج الحروف وقواعد النطق الألمانية',
      'فهم تراكيب الجملة والقواعد الأساسية بدقة',
      'تمارين استماع ومحادثة عملية',
      'متابعة مستوى الاستيعاب أولاً بأول',
    ],
    priceTag: '9000 دج للمستوى الكامل',
    durationNote: 'مستوى كامل مع متابعة مكثفة',
    targetAudience: 'الراغبون في الدراسة بالخارج والمهتمون',
    certification: 'شهادة إتمام المستوى',
  },
];

export const ACADEMIC_PROGRAMS: ProgramItem[] = [
  {
    id: 'acad-bac',
    category: 'academic',
    title: 'دعم الأقسام النهائية — شهادة البكالوريا (BAC)',
    subTitleEn: 'BAC Exam Support',
    badge: 'حصص دعم مركزة للأقسام النهائية',
    description: 'مرافقة بيداغوجية ونفسية للطلاب لتمكينهم من استيعاب كافة محاور المنهاج والتدريب على منهجية الإجابة النموذجية في الامتحانات الرسمية.',
    highlights: [
      'أساتذة شباب متمكنين من البرامج الوزارية وطرق الطرح',
      'حل مكثف لسلاسل التمارين ونماذج البكالوريات السابقة',
      'تركيز نوعي على فهم المفاهيم وحل الإشكاليات البيداغوجية',
      'متابعة فردية لضبط النقائص قبل المواعيد الرسمية',
    ],
    priceTag: 'أسعار مناسبة حسب المادة والمستوى',
    targetAudience: 'طلبة السنة الثالثة ثانوي (جميع الشعب)',
  },
  {
    id: 'acad-bem',
    category: 'academic',
    title: 'دعم شهادة التعليم المتوسط (BEM)',
    subTitleEn: 'BEM Exam Support',
    badge: 'تثبيت الأساسيات والتحضير للامتحان',
    description: 'توجيه تلاميذ الرابعة متوسط لفهم الدروس بعمق، اكتساب أسلوب الإجابة الدقيق، والتخلص من التوتر لضمان أعلى المعدلات.',
    highlights: [
      'شرح مبسط ومباشر للمواد الأساسية',
      'حل نماذج شهادات سابقة ومواضيع مقترحة',
      'متابعة مستمرة لتقييم تقدم التلميذ وتصحيح العثرات',
      'أفواج مدروسة تسمح بالتفاعل التام بين الأستاذ والتلميذ',
    ],
    priceTag: 'أسعار مناسبة مع خيارات مرنة',
    targetAudience: 'تلاميذ السنة الرابعة متوسط',
  },
  {
    id: 'acad-level',
    category: 'academic',
    title: 'تحسين المستوى والدعم المدرسي العام',
    subTitleEn: 'Academic Level Boost',
    badge: 'معالجة الثغرات التراكمية',
    description: 'حصص دعم مدرسي موجهة للسنوات المتوسطة والثانوية لبناء قاعدة متينة في المواد الرئيسية قبل خوض الامتحانات المصيرية.',
    highlights: [
      'تشخيص دقيق لمستوى التلميذ ونقاط ضعفه',
      'تمارين تدرجية من البسيط إلى المعقد',
      'طرق حديثة في التبسيط والشرح المحفز',
      'تواصل منتظم مع الأولياء لإطلاعهم على تطور النتائج',
    ],
    priceTag: 'تسجيلات دورية مفتوحة',
    targetAudience: 'تلاميذ التعليم المتوسط والثانوي',
  },
];

export const FAQS = [
  {
    q: 'كم تبلغ تكلفة الاشتراك الشهري وتكلفة المستوى الكامل في اللغات؟',
    a: 'تبلغ تكلفة الاشتراك الشهري 3000 دج شهرياً، بينما تبلغ تكلفة دورة المستوى الكامل 9000 دج للمستوى كاملاً. ونحافظ على تسعيرة فرع البليدة كاشتراك مخصص بقيمة 4000 دج وفقاً لبرنامج وتجهيزات الفرع.',
  },
  {
    q: 'كم عدد الحصص الشهرية في دورات اللغات للكبار والأطفال؟',
    a: 'يتضمن البرنامج الدراسي توزيعاً شهرياً دقيقاً ومدروساً:\n• فئة الكبار (البالغين): 4 حصص شهرياً بمعدل حصة أسبوعية مركزة.\n• فئة الأطفال: 8 حصص شهرياً بمعدل حصتين أسبوعياً لترسيخ الممارسة التفاعلية والطلاقة.',
  },
  {
    q: 'ما هي التسعيرة المعتمدة في فرع البليدة؟',
    a: 'تبلغ التسعيرة المعتمدة لفرع البليدة 4000 دج، حيث يتم الحفاظ عليها بشكل مستقل كتعريفة مخصصة لفرع البليدة وفقاً لبرنامج وتجهيزات الفرع (وتشمل 4 حصص شهرياً للكبار و8 حصص شهرياً للأطفال).',
  },
  {
    q: 'متى تنطلق البرامج الدراسية في الأكاديمية؟',
    a: `تنطلق البرامج الدراسية لموسم ${academyCampaign.academicYear} ابتداءً من يوم ${academyCampaign.startDate}، و${academyCampaign.registrationStatus} حالياً لحجز الأماكن المحدودة.`,
  },
  {
    q: 'ما هي اللغات المتوفرة في Your Academy؟',
    a: 'نوفر دورات متخصصة في أربع لغات حية رئيسية: اللغة الإنجليزية، اللغة الفرنسية، اللغة الإسبانية، واللغة الألمانية، لجميع الفئات والمستويات (كبار وأطفال).',
  },
  {
    q: 'أين تقع فروع أكاديمية Your Academy؟',
    a: 'تتواجد أكاديمية Your Academy في أربعة فروع رسمية مجهزة: المقر الرئيسي في عين الدفلى (حي الإخوة شوال)، فرع البليدة (09000)، فرع خميس مليانة (تحت محل وزير القلايل)، وفرع العطاف.',
  },
  {
    q: 'ما هي طبيعة الشهادة الممنوحة في اللغات؟',
    a: 'يحصل المتدرب بعد إتمام متطلبات المستوى واجتياز التقييم على شهادة نهاية المستوى بالتعاون مع منظمة بريطانية، تثبت اجتيازه للمستوى بنجاح.',
  },
  {
    q: 'هل تتوفر حصص دعم للأقسام النهائية كالبكالوريا وBEM؟',
    a: 'نعم، نوفر حصص دعم متخصصة ومكثفة للأقسام النهائية (BAC و BEM) مع أساتذة شباب متمكنين، تركّز على المنهجية وحل التمارين النموذجية والمتابعة الفردية لكل تلميذ.',
  },
  {
    q: 'كيف يمكنني التسجيل أو حجز مقعد؟',
    a: 'يمكنكم التسجيل مباشرة عبر استمارة التسجيل في هذا الموقع، أو بالاتصال المباشر بأرقام فروع الأكاديمية أو زيارة أقرب فرع إليكم.',
  },
];

export interface CalendarMilestone {
  id: string;
  dateAr: string;
  dateEn: string;
  monthBadgeAr: string;
  monthBadgeEn: string;
  dayBadge: string;
  titleAr: string;
  titleEn: string;
  category: 'launch' | 'registration' | 'eval' | 'camps' | 'exams' | 'graduation';
  categoryLabelAr: string;
  categoryLabelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  isKeyHighlight?: boolean;
  statusBadgeAr: string;
  statusBadgeEn: string;
  term: 1 | 2 | 3;
}

export const ACADEMIC_CALENDAR_2026_2027: CalendarMilestone[] = [
  {
    id: 'cal-1',
    dateAr: 'أوت - سبتمبر 2026',
    dateEn: 'Aug - Sep 2026',
    monthBadgeAr: 'أوت / سبتمبر',
    monthBadgeEn: 'Aug / Sep',
    dayBadge: 'الآن',
    titleAr: 'انطلاق التسجيلات المسبقة واختبارات تحديد المستوى',
    titleEn: 'Early Registration & Level Placement Tests',
    category: 'registration',
    categoryLabelAr: 'التسجيلات',
    categoryLabelEn: 'Registrations',
    descriptionAr: 'استقبال ملفات المتعلمين وتحديد المستوى في اللغات (الإنجليزية، الفرنسية، الإسبانية، الألمانية) وتوزيع الأفواج حسب السن والمستوى الأكاديمي.',
    descriptionEn: 'Student intake, diagnostic evaluations in languages (English, French, Spanish, German), and cohort assignment by age and level.',
    isKeyHighlight: false,
    statusBadgeAr: academyCampaign.registrationStatus,
    statusBadgeEn: 'Open Now',
    term: 1,
  },
  {
    id: 'cal-2',
    dateAr: academyCampaign.startDate,
    dateEn: 'September 18, 2026',
    monthBadgeAr: 'سبتمبر 2026',
    monthBadgeEn: 'Sep 2026',
    dayBadge: '18',
    titleAr: `الانطلاق الرسمي للبرنامج الدراسي والمستويات لموسم ${academyCampaign.academicYear}`,
    titleEn: `Official Academic Launch for ${academyCampaign.academicYear} Season`,
    category: 'launch',
    categoryLabelAr: 'الانطلاق الرسمي',
    categoryLabelEn: 'Official Launch',
    descriptionAr: `بداية الحصص الحضورية لبرامج اللغات الأجنبية بالاستفادة من ${academyCampaign.offer}، وانطلاق أفواج الدعم المدرسي لكافة الأطوار في مقر الأكاديمية بجنان قدور بلعيد.`,
    descriptionEn: `Classroom sessions begin for foreign languages with the ${academyCampaign.offer} promo, along with school support cohorts across all grade levels.`,
    isKeyHighlight: true,
    statusBadgeAr: 'الموعد الأبرز',
    statusBadgeEn: 'Featured Date',
    term: 1,
  },
  {
    id: 'cal-3',
    dateAr: '01 أكتوبر 2026',
    dateEn: 'October 01, 2026',
    monthBadgeAr: 'أكتوبر 2026',
    monthBadgeEn: 'Oct 2026',
    dayBadge: '01',
    titleAr: 'تفعيل الأفواج المسائية وتوقيتات نهاية الأسبوع (الجمعة والسبت)',
    titleEn: 'Evening Batches & Weekend Classes Activation',
    category: 'launch',
    categoryLabelAr: 'الأفواج المسائية',
    categoryLabelEn: 'Weekend & Evening',
    descriptionAr: 'انطلاق الجداول المرنة المخصصة للطلبة الجامعيين والعاملين وتلاميذ الطور الثانوي والنهائي الراغبين في حصص مكثفة بنهاية الأسبوع.',
    descriptionEn: 'Flexible timetables launch for university students, working professionals, and secondary students seeking weekend study schedules.',
    isKeyHighlight: false,
    statusBadgeAr: 'مؤكد',
    statusBadgeEn: 'Confirmed',
    term: 1,
  },
  {
    id: 'cal-4',
    dateAr: '15 نوفمبر 2026',
    dateEn: 'November 15, 2026',
    monthBadgeAr: 'نوفمبر 2026',
    monthBadgeEn: 'Nov 2026',
    dayBadge: '15',
    titleAr: 'التقييمات النصف فصلية وجلسات المتابعة الفردية للأولياء',
    titleEn: 'Mid-Term Progress Diagnostic & Parent Feedback Sessions',
    category: 'eval',
    categoryLabelAr: 'متابعة فردية',
    categoryLabelEn: 'Assessments',
    descriptionAr: 'اختبارات تقييم شفهية وكتابية لمتابعة مدى التطور اللغوي والتحصيل المدرسي، مع تقارير فردية موجهة لأولياء الأمور لمعالجة أي ثغرات.',
    descriptionEn: 'Oral and written diagnostic assessments to track fluency and academic gains, accompanied by personalized guidance for parents.',
    isKeyHighlight: false,
    statusBadgeAr: 'فصل أول',
    statusBadgeEn: 'Term 1',
    term: 1,
  },
  {
    id: 'cal-5',
    dateAr: '20 ديسمبر 2026 - جانفي 2027',
    dateEn: 'Dec 20, 2026 - Jan 2027',
    monthBadgeAr: 'ديسمبر / جانفي',
    monthBadgeEn: 'Dec / Jan',
    dayBadge: '20',
    titleAr: 'المخيم الشتوي المكثف في اللغات والمراجعات الاستدراكية',
    titleEn: 'Winter Language Intensive Camp & Term 1 Recovery Sessions',
    category: 'camps',
    categoryLabelAr: 'المخيم الشتوي',
    categoryLabelEn: 'Winter Camp',
    descriptionAr: 'ورشات محادثة ونوادٍ لغوية تفاعلية حية خلال العطلة الشتوية، بالإضافة إلى حصص دعم مركزة لتثبيت أساسيات الفصل الأول قبل استئناف الدراسة.',
    descriptionEn: 'Immersive conversation workshops and interactive language clubs during winter holidays, plus review classes for first-term foundations.',
    isKeyHighlight: false,
    statusBadgeAr: 'برنامج مكثف',
    statusBadgeEn: 'Intensive',
    term: 2,
  },
  {
    id: 'cal-6',
    dateAr: '20 مارس 2027',
    dateEn: 'March 20, 2027',
    monthBadgeAr: 'مارس 2027',
    monthBadgeEn: 'Mar 2027',
    dayBadge: '20',
    titleAr: 'انطلاق دورات العطلة الربيعية وبرامج الإعداد المصيري للشهادات',
    titleEn: 'Spring Immersion & Official Certificate Prep Sprint',
    category: 'camps',
    categoryLabelAr: 'عطلة الربيع',
    categoryLabelEn: 'Spring Sprint',
    descriptionAr: 'دورات سريعة مكثفة في اللغات الأجنبية، وبداية المخطط التكتيكي البيداغوجي لطلبة شهادتي التعليم المتوسط (BEM) والبكالوريا (BAC).',
    descriptionEn: 'Rapid immersion language tracks and kickoff of dedicated revision plans for BEM and BAC national certificate candidates.',
    isKeyHighlight: false,
    statusBadgeAr: 'فصل ثانٍ',
    statusBadgeEn: 'Term 2',
    term: 2,
  },
  {
    id: 'cal-7',
    dateAr: 'ماي - جوان 2027',
    dateEn: 'May - June 2027',
    monthBadgeAr: 'ماي / جوان',
    monthBadgeEn: 'May / Jun',
    dayBadge: '01',
    titleAr: 'ماراطون البكالوريا والبيام (BAC & BEM 2027) — اختبارات بيضاء نموذجية',
    titleEn: 'Final BAC & BEM Exam Marathon — Realistic Mock Testing',
    category: 'exams',
    categoryLabelAr: 'الامتحانات الرسمية',
    categoryLabelEn: 'Official Exams',
    descriptionAr: 'حل مواضيع مقترحة وبكالوريات تجريبية في ظروف الاختبارات الرسمية، ومرافقة نفسية ومنهجية لضمان التفوق وتحقيق أعلى المعدلات.',
    descriptionEn: 'Solving prior national exams under realistic timed testing conditions, accompanied by pedagogical coaching to maximize scores.',
    isKeyHighlight: true,
    statusBadgeAr: 'مرحلة حاسمة',
    statusBadgeEn: 'Crucial Sprint',
    term: 3,
  },
  {
    id: 'cal-8',
    dateAr: 'أواخر جوان 2027',
    dateEn: 'Late June 2027',
    monthBadgeAr: 'جوان 2027',
    monthBadgeEn: 'Jun 2027',
    dayBadge: '25',
    titleAr: 'حفل تسليم الشهادات المعتمدة وتكريم المتفوقين السنوي',
    titleEn: 'Annual Certificate Award Ceremony & Graduation Day',
    category: 'graduation',
    categoryLabelAr: 'تسليم الشهادات',
    categoryLabelEn: 'Certificates',
    descriptionAr: 'حفل بهيج لتكريم خريجي مستويات اللغات وتسليم الشهادات الرسمية بالتعاون مع المنظمة البريطانية، والاحتفاء بالناجحين في شهادات BEM و BAC.',
    descriptionEn: 'Graduation celebration delivering accredited certificates in collaboration with British organization partners, celebrating academy scholars.',
    isKeyHighlight: true,
    statusBadgeAr: 'شهادات دولية',
    statusBadgeEn: 'Certificates',
    term: 3,
  },
];
