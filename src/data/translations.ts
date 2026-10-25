import { academyCampaign } from './academyData';

export type Language = 'ar' | 'en';

export interface Translations {
  common: {
    academyName: string;
    academyNameAr: string;
    academyNameEn: string;
    academySubtitle: string;
    slogan: string;
    locationName: string;
    locationFull: string;
    cityState: string;
    academicYear: string;
    startDate: string;
    registrationStatus: string;
    specialPriceBadge: string;
    fullLevelPrice: string;
    monthlyPrice: string;
    blidaPrice: string;
    adultsSessions: string;
    kidsSessions: string;
    registerNow: string;
    contactUs: string;
    callNow: string;
    explorePrograms: string;
    findNearestBranch: string;
    allRightsReserved: string;
    openForYear: string;
    mottoTagline1: string;
    mottoTagline2: string;
    backToSchool: string;
    britishCert: string;
    individualFollowUp: string;
    modernMethods: string;
    skilledTeachers: string;
    close: string;
    submit: string;
    loading: string;
  };
  nav: {
    home: string;
    languages: string;
    academic: string;
    specialOffer: string;
    features: string;
    contact: string;
    testimonials: string;
    faq: string;
    topBannerNotice: string;
  };
  hero: {
    badgeStatus: string;
    badgeDate: string;
    mainTitlePrefix: string;
    mainTitleSuffix: string;
    subtitle: string;
    offerBannerTitle: string;
    offerBannerSubtitle: string;
    offerBookBtn: string;
    visualSubtitle: string;
    limitedSeatsNote: string;
    inquiryLine: string;
  };
  specialOffer: {
    badge: string;
    mainHeading: string;
    description: string;
    check1: string;
    check2: string;
    check3: string;
    check4: string;
    boxTitle: string;
    boxSubtitle: string;
    boxPriceLabel: string;
    boxPriceNote: string;
    boxBtn: string;
    orCallDirectly: string;
  };
  languages: {
    sectionBadge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    targetAudienceLabel: string;
    highlightsTitle: string;
    registerInProgram: string;
    inquirePhone: string;
    currentCostLabel: string;
    monthlyCostLabel: string;
    fullLevelCostLabel: string;
    blidaCostLabel: string;
    classSessionsLabel: string;
    adultsSessionFrequency: string;
    kidsSessionFrequency: string;
    perLevel: string;
    programLaunch: string;
    studySeason: string;
    followUpType: string;
    teachingMethod: string;
    academyLocation: string;
    viewDetails: string;
    skillLevelsTitle: string;
    skillLevelsSubtitle: string;
    cefrCoverageLabel: string;
    overallCurriculumCoverage: string;
    programs: {
      id: string;
      title: string;
      subTitleEn: string;
      badge: string;
      description: string;
      highlights: string[];
      priceTag: string;
      targetAudience: string;
      certification?: string;
      cefrLevels: string;
      overallCoveragePercent: number;
      skillCompetencies: {
        id: string;
        name: string;
        percent: number;
        levelBadge: string;
        description: string;
      }[];
    }[];
  };
  academic: {
    sectionBadge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    featuresLabel: string;
    bookSupportBtn: string;
    boxBadge: string;
    boxTitle: string;
    boxDescription: string;
    boxRegisterBtn: string;
    boxInquireBtn: string;
    programs: {
      id: string;
      title: string;
      subTitleEn: string;
      badge: string;
      description: string;
      highlights: string[];
      priceTag: string;
      targetAudience: string;
    }[];
  };
  pillars: {
    sectionBadge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    boxMottoBadge: string;
    boxFootnote: string;
    items: {
      id: string;
      title: string;
      description: string;
      iconName: string;
    }[];
  };
  contact: {
    sectionBadge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    locationCardTitle: string;
    locationTransitNote: string;
    phonesTitle: string;
    phonesBadge: string;
    copyPhoneTitle: string;
    callAction: string;
    emailLabel: string;
    hoursLabel: string;
    hoursValue: string;
    hoursNote: string;
    mapTitle: string;
    directionsTitle: string;
    directions: string[];
    bookVisitBtn: string;
  };
  faq: {
    sectionBadge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  testimonials: {
    sectionBadge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    filterAll: string;
    filterLanguages: string;
    filterAcademic: string;
    verifiedBadge: string;
    editableBadge: string;
    shareBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    programLabel: string;
    categoryLabel: string;
    categoryLanguages: string;
    categoryAcademic: string;
    quoteLabel: string;
    quotePlaceholder: string;
    outcomeLabel: string;
    outcomePlaceholder: string;
    ratingLabel: string;
    submitBtn: string;
    cancelBtn: string;
    successMessage: string;
    validationError: string;
    ctaBoxTitle: string;
    ctaBoxSubtitle: string;
    ctaBoxBtn: string;
    items: {
      id: string;
      studentName: string;
      program: string;
      category: 'languages' | 'academic';
      quote: string;
      outcome: string;
      period: string;
      rating: number;
      initials: string;
    }[];
  };
  modal: {
    formBadge: string;
    titlePrefix: string;
    subtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    optional: string;
    programLabel: string;
    levelLabel: string;
    timingLabel: string;
    timingOptions: {
      evening: string;
      weekend: string;
      morning: string;
      flexible: string;
    };
    levelOptions: {
      beginner: string;
      intermediate: string;
      advanced: string;
      bac: string;
      bem: string;
    };
    notesLabel: string;
    notesPlaceholder: string;
    infoFooterDate: string;
    infoFooterLocation: string;
    submitBtn: string;
    successBadge: string;
    successTitle: string;
    successMessage: string;
    reservationCodeLabel: string;
    programReviewLabel: string;
    phoneReviewLabel: string;
    locationReviewLabel: string;
    startReviewLabel: string;
    registerAnotherBtn: string;
    closeBtn: string;
    validationError: string;
  };
  mobileBar: {
    callPrimary: string;
    callSecondary: string;
    registerNow: string;
  };
  footer: {
    description: string;
    quickLinksTitle: string;
    home: string;
    languages: string;
    academic: string;
    offer: string;
    features: string;
    faq: string;
    contactTitle: string;
    officialPhones: string;
    reserveNowBtn: string;
    copyright: string;
  };
  newsletter: {
    sectionBadge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    emailPlaceholder: string;
    namePlaceholder: string;
    interestLabel: string;
    interestLanguages: string;
    interestAcademic: string;
    interestAll: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMessage: string;
    resetBtn: string;
    privacyNote: string;
    perk1: string;
    perk2: string;
    perk3: string;
    perk4: string;
    directCallPrompt: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    common: {
      academyName: 'أكاديمية Your Academy',
      academyNameAr: 'أكاديمية Your Academy',
      academyNameEn: 'YOUR ACADEMY',
      academySubtitle: 'أكاديمية اللغات والدعم المدرسي',
      slogan: 'طريقك نحو النجاح يبدأ من هنا',
      locationName: 'عين الدفلى — الرئيسي | البليدة',
      locationFull: 'فرع عين الدفلى (الرئيسي): حي الإخوة شوال، طريق مسجد مالك ابن أنس • فرع البليدة: 09000',
      cityState: 'عين الدفلى (الرئيسي) + البليدة',
      academicYear: academyCampaign.academicYearEn,
      startDate: academyCampaign.startDateArFull,
      registrationStatus: academyCampaign.registrationStatus,
      specialPriceBadge: `عرض ${academyCampaign.offer}`,
      fullLevelPrice: '9000 دج للمستوى الكامل',
      monthlyPrice: '3000 دج شهرياً',
      blidaPrice: '4000 دج (فرع البليدة)',
      adultsSessions: '4 حصص شهرياً للكبار',
      kidsSessions: '8 حصص شهرياً للأطفال',
      registerNow: 'سجل الآن',
      contactUs: 'تواصل معنا',
      callNow: 'اتصل بنا',
      explorePrograms: 'اكتشف برامجنا',
      findNearestBranch: 'ابحث عن أقرب فرع لك',
      allRightsReserved: 'جميع الحقوق محفوظة',
      openForYear: academyCampaign.academicYearEn,
      mottoTagline1: 'DO WHAT YOU LOVE',
      mottoTagline2: 'LOVE WHAT YOU DO',
      backToSchool: 'BACK TO SCHOOL',
      britishCert: 'شهادة بالتعاون مع منظمة بريطانية',
      individualFollowUp: 'متابعة فردية لكل تلميذ',
      modernMethods: 'طرق حديثة في الشرح',
      skilledTeachers: 'أساتذة شباب متمكنين',
      close: 'إغلاق',
      submit: 'تأكيد التسجيل الأولي',
      loading: 'جاري الإرسال...',
    },
    nav: {
      home: 'الرئيسية',
      languages: 'برامج اللغات',
      academic: 'الدعم المدرسي',
      specialOffer: 'عرض 9000 دج',
      features: 'مميزاتنا',
      contact: 'فروعنا والتواصل',
      testimonials: 'تجارب طلابنا',
      faq: 'الأسئلة الشائعة',
      topBannerNotice: `موسم ${academyCampaign.academicYearEn} • ${academyCampaign.startDateArFull} • فرع عين الدفلى (الرئيسي) + فرع البليدة`,
    },
    hero: {
      badgeStatus: academyCampaign.registrationStatus,
      badgeDate: academyCampaign.academicYearEn,
      mainTitlePrefix: 'أكاديمية',
      mainTitleSuffix: 'تحسين المستوى في مختلف اللغات والدعم المدرسي',
      subtitle: 'الدعم المدرسي مع أساتذة شباب متمكنين، طرق حديثة في الشرح، ومتابعة فردية لكل تلميذ وحصص دعم مخصصة للأقسام النهائية في خميس مليانة.',
      offerBannerTitle: academyCampaign.offer,
      offerBannerSubtitle: `${academyCampaign.startDateArFull} • شهادة نهاية المستوى بالتعاون مع منظمة بريطانية`,
      offerBookBtn: 'احجز بهذا العرض',
      visualSubtitle: 'أكاديمية اللغات والدعم المدرسي',
      limitedSeatsNote: 'المقاعد محدودة لضمان المتابعة الفردية لكل تلميذ',
      inquiryLine: 'خط التسجيل والاستفسار',
    },
    specialOffer: {
      badge: 'عرض الموسم الترويجي',
      mainHeading: academyCampaign.offer,
      description: 'فرصة استثنائية لتحسين مستواك في اللغات الحية (الإنجليزية، الفرنسية، الإسبانية، أو الألمانية) ضمن مجموعات تفاعلية وبطرق شرح حديثة ومتابعة فردية دقيقة.',
      check1: 'برنامج تعليمي متكامل لمستوى كامل',
      check2: 'شهادة نهاية المستوى بالتعاون مع منظمة بريطانية',
      check3: 'متابعة فردية لكل متدرب لتثبيت المكتسبات',
      check4: 'أساتذة شباب متمكنين وطرق شرح حديثة',
      boxTitle: 'احجز مكانك في العرض',
      boxSubtitle: 'الأماكن محددة لضمان الجودة والمتابعة الفردية',
      boxPriceLabel: 'السعر الرسمي للمستوى الكامل',
      boxPriceNote: 'شامل كل حصص المستوى والمرافقة',
      boxBtn: 'سجل الآن بهذا السعر',
      orCallDirectly: 'أو اتصل بنا مباشرة:',
    },
    languages: {
      sectionBadge: 'برامج اللغات الحية في Your Academy',
      title: 'تحسين المستوى في',
      titleHighlight: 'مختلف اللغات',
      subtitle: 'دورات تدريبية متقنة تهدف إلى كسر حاجز الخوف وبناء الطلاقة والمحادثة السليمة، باعتماد طرق حديثة في الشرح ومتابعة فردية لكل متدرب.',
      targetAudienceLabel: 'الفئة المستهدفة:',
      highlightsTitle: 'أبرز محاور وبرنامج الدورة:',
      registerInProgram: 'سجل الآن في',
      inquirePhone: 'استفسر عبر الهاتف',
      currentCostLabel: 'تفاصيل التسعيرة والاشتراك',
      monthlyCostLabel: 'الاشتراك الشهري',
      fullLevelCostLabel: 'المستوى الكامل',
      blidaCostLabel: 'تسعيرة فرع البليدة',
      classSessionsLabel: 'الحصص الشهرية المعتمدة',
      adultsSessionFrequency: 'الكبار (البالغين): 4 حصص شهرياً',
      kidsSessionFrequency: 'الأطفال: 8 حصص شهرياً',
      perLevel: 'للمستوى الكامل',
      programLaunch: 'انطلاق البرنامج',
      studySeason: 'الموسم الدراسي',
      followUpType: 'متابعة فردية لكل تلميذ',
      teachingMethod: 'طرق حديثة في الشرح',
      academyLocation: 'مقر الأكاديمية: جنان قدور بلعيد',
      viewDetails: 'عرض التفاصيل',
      skillLevelsTitle: 'مستويات المهارات المشمولة في المنهاج',
      skillLevelsSubtitle: 'مؤشرات دائرية تفاعلية توضح نسب تغطية المهارات الأساسية في المنهاج الدراسي ومستويات الإتقان المكتسبة.',
      cefrCoverageLabel: 'نطاق المستويات المشمولة',
      overallCurriculumCoverage: 'نسبة شمولية المنهاج',
      programs: [
        {
          id: 'lang-en',
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
          targetAudience: 'المبتدئين، الطلاب، والراغبين في تطوير المستوى',
          certification: 'شهادة بالتعاون مع منظمة بريطانية',
          cefrLevels: 'A1 ➔ B2',
          overallCoveragePercent: 88,
          skillCompetencies: [
            {
              id: 'en-speaking',
              name: 'المحادثة والطلاقة الشفوية',
              percent: 92,
              levelBadge: 'B2',
              description: 'التحدث بثقة في المواقف اليومية والدراسية وكسر حاجز الخوف',
            },
            {
              id: 'en-listening',
              name: 'الاستماع والفهم السمعي',
              percent: 88,
              levelBadge: 'B2',
              description: 'استيعاب الحوارات التلقائية والمقاطع الصوتية المتنوعة',
            },
            {
              id: 'en-grammar',
              name: 'القواعد التطبيقية والتراكيب',
              percent: 84,
              levelBadge: 'B1+',
              description: 'استخدام القواعد بسلاسة ودون تردد في سياقات عملية',
            },
            {
              id: 'en-vocab',
              name: 'المفردات والتواصل اليومي',
              percent: 86,
              levelBadge: 'B2',
              description: 'اكتساب رصيد لغوي متين ومصطلحات معاصرة شائعة',
            },
          ],
        },
        {
          id: 'lang-fr',
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
          targetAudience: 'التلاميذ والطلبة والمهنيين',
          certification: 'شهادة إتمام المستوى',
          cefrLevels: 'A1 ➔ B2',
          overallCoveragePercent: 85,
          skillCompetencies: [
            {
              id: 'fr-expression',
              name: 'التعبير الشفوي والمحادثة',
              percent: 90,
              levelBadge: 'B2',
              description: 'المشاركة الفعالة في الحوارات والنقاشات بأسلوب سليم',
            },
            {
              id: 'fr-listening',
              name: 'الفهم السمعي والاستيعاب',
              percent: 86,
              levelBadge: 'B2',
              description: 'فهم المحادثات الفرنسية السريعة والتقارير المسموعة',
            },
            {
              id: 'fr-grammar',
              name: 'النحو والتصريف (Conjugaison)',
              percent: 85,
              levelBadge: 'B1+',
              description: 'ضبط قواعد الصرف وتراكيب الجمل المركبة بدقة',
            },
            {
              id: 'fr-writing',
              name: 'التعبير الكتابي وفهم النصوص',
              percent: 82,
              levelBadge: 'B1+',
              description: 'صياغة الرسائل والفقرات بأسلوب أكاديمي منظم',
            },
          ],
        },
        {
          id: 'lang-es',
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
          targetAudience: 'محبو اللغات والطلاب',
          certification: 'شهادة إتمام المستوى',
          cefrLevels: 'A1 ➔ B1',
          overallCoveragePercent: 82,
          skillCompetencies: [
            {
              id: 'es-pronunciation',
              name: 'النطق السليم والصوتيات',
              percent: 88,
              levelBadge: 'B1',
              description: 'إتقان مخارج الحروف الإسبانية وقواعد النبر واللكنة',
            },
            {
              id: 'es-speaking',
              name: 'المحادثة وحوارات السفر',
              percent: 85,
              levelBadge: 'B1',
              description: 'التواصل السلس في مواقف السفر واللقاءات اليومية',
            },
            {
              id: 'es-listening',
              name: 'الفهم السمعي والاستماع',
              percent: 80,
              levelBadge: 'B1',
              description: 'استيعاب الحوارات التلقائية بين المتحدثين الأصليين',
            },
            {
              id: 'es-grammar',
              name: 'التراكيب والمفردات الأساسية',
              percent: 78,
              levelBadge: 'A2+',
              description: 'بناء الجمل السليمة وتوظيف المفردات الأكثر استخداماً',
            },
          ],
        },
        {
          id: 'lang-de',
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
          targetAudience: 'الراغبون في الدراسة بالخارج والمهتمون',
          certification: 'شهادة إتمام المستوى',
          cefrLevels: 'A1 ➔ B1',
          overallCoveragePercent: 78,
          skillCompetencies: [
            {
              id: 'de-speaking',
              name: 'النطق والتحدث الأساسي (Sprechen)',
              percent: 82,
              levelBadge: 'B1',
              description: 'مخارج الحروف الألمانية وتكوين الجمل التخاطبية',
            },
            {
              id: 'de-grammar',
              name: 'القواعد الألمانية والتراكيب (Grammatik)',
              percent: 80,
              levelBadge: 'B1',
              description: 'فهم حالات الإعراب (Kasus) وترتيب الجملة الألمانية',
            },
            {
              id: 'de-listening',
              name: 'الاستماع والفهم (Hörverstehen)',
              percent: 76,
              levelBadge: 'A2+',
              description: 'استيعاب الأسئلة المباشرة والتسجيلات الصوتية الأساسية',
            },
            {
              id: 'de-vocab',
              name: 'المفردات للدراسة والعمل (Wortschatz)',
              percent: 75,
              levelBadge: 'A2+',
              description: 'رصيد لغوي للتحضير لاختبارات المستويات وفرص السفر',
            },
          ],
        },
      ],
    },
    academic: {
      sectionBadge: 'حصص الدعم المدرسي والتفوق الأكاديمي',
      title: 'الدعم المدرسي مع',
      titleHighlight: 'أساتذة شباب متمكنين',
      subtitle: 'برامج دعم بيداغوجية مخصصة للأقسام النهائية والسنوات الدراسية المختلفة في خميس مليانة، تركّز على الفهم العميق، حل التمارين والمواضيع النموذجية، والمتابعة الفردية لكل تلميذ.',
      featuresLabel: 'مميزات هذا المسار:',
      bookSupportBtn: 'احجز مقعدك في الدعم',
      boxBadge: 'منهجية العمل في Your Academy',
      boxTitle: 'حصص دعم للأقسام النهائية: نرافقك من أول درس حتى يوم الامتحان',
      boxDescription: 'لا نكتفي بتقديم الدروس فقط؛ بل نركز على التدريب العملي، حل سلاسل التمارين النموذجية، والتعامل مع ضغط الاختبارات بطرق بيداغوجية حديثة بإشراف نخبة من الأساتذة الشباب المتمكنين.',
      boxRegisterBtn: 'سجل في حصص الأقسام النهائية',
      boxInquireBtn: 'استفسار فوري',
      programs: [
        {
          id: 'acad-bac',
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
      ],
    },
    pillars: {
      sectionBadge: 'رؤيتنا البيداغوجية وقيمنا',
      title: 'لماذا تختار',
      titleHighlight: 'أكاديمية Your Academy',
      subtitle: 'نجمع بين الطاقة الشبابية والخبرة التربوية والوسائل العصرية لنقدم لك تجربة تعليمية متميزة تصنع الفارق الحقيقي في مسارك.',
      boxMottoBadge: 'YOUR ACADEMY MOTTO',
      boxFootnote: 'في عين الدفلى (الرئيسي) والبليدة • بيئة تعليمية محفزة تشجعك على التعلم بشغف وتميز',
      items: [
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
      ],
    },
    contact: {
      sectionBadge: 'المقر ومعلومات التواصل المعتمدة',
      title: 'تواصل معنا و',
      titleHighlight: 'تفضل بزيارة فروعنا',
      subtitle: 'أبواب التسجيل والاستفسار مفتوحة في فرعينا (عين الدفلى الرئيسي والبليدة). يمكنك الاتصال بنا مباشرة أو إرسال طلب تسجيلك.',
      locationCardTitle: 'فروع الأكاديمية',
      locationTransitNote: 'فروعنا مجهزة وميسرة الوصول بالقرب من وسائل النقل والمرافق الأساسية.',
      phonesTitle: 'أرقام الهواتف الرسمية',
      phonesBadge: 'متاحة للاتصال المباشر',
      copyPhoneTitle: 'نسخ الرقم',
      callAction: 'اتصال',
      emailLabel: 'البريد الإلكتروني',
      hoursLabel: 'أوقات العمل والاستقبال',
      hoursValue: 'السبت إلى الخميس: من 08:30 إلى 18:00',
      hoursNote: '(يرجى الاتصال المسبق لتأكيد الموعد الدقيق)',
      mapTitle: 'خريطة الوصول إلى المقر',
      directionsTitle: 'إرشادات الوصول:',
      directions: [
        'الفرع الرئيسي: حي الإخوة شوال، طريق مسجد مالك ابن أنس — عين الدفلى (44000).',
        'فرع البليدة: البليدة، الجزائر (09000).',
        'في حال واجهت أي صعوبة في تحديد موقعنا، اتصل بنا مباشرة وسيرشدك فريق الاستقبال فوراً.',
      ],
      bookVisitBtn: 'سجل الآن أو احجز موعد زيارة',
    },
    faq: {
      sectionBadge: 'إجابات واضحة ومباشرة',
      title: 'الأسئلة',
      titleHighlight: 'الشائعة',
      subtitle: 'كل ما تود معرفته حول التسجيل، برامج اللغات، الدعم المدرسي، وعروض الموسم في Your Academy.',
      items: [
        {
          q: 'كم تبلغ تكلفة الاشتراك الشهري وتكلفة المستوى الكامل في اللغات؟',
          a: 'تبلغ تكلفة الاشتراك الشهري 3000 دج شهرياً، بينما تبلغ تكلفة دورة المستوى الكامل 9000 دج للمستوى كاملاً. ونحافظ على تسعيرة فرع البليدة كاشتراك مخصص بقيمة 4000 دج وفقاً لبرنامج وتجهيزات الفرع.',
        },
        {
          q: 'كم عدد الحصص الشهرية في دورات اللغات للكبار والأطفال؟',
          a: 'يتضمن البرنامج الدراسي توزيعاً شهرياً دقيقاً ومدروساً:\n• فئة الكبار (البالغين): 4 حصص شهرياً بمعدل حصة أسبوعية مركزة ومكثفة.\n• فئة الأطفال: 8 حصص شهرياً بمعدل حصتين أسبوعياً لضمان التكرار والممارسة التفاعلية المستمرة.',
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
      ],
    },
    testimonials: {
      sectionBadge: 'قصص نجاح وتجارب طلابنا',
      title: 'تجارب حقيقية تعكس',
      titleHighlight: 'فعالية طريقتنا في الشرح',
      subtitle: 'آراء وانطباعات تلاميذنا في تحسين اللغات ودعم الأقسام النهائية في خميس مليانة، وكيف ساعدتهم المتابعة الفردية والأساتذة الشباب على تحقيق أهدافهم.',
      filterAll: 'جميع التجارب',
      filterLanguages: 'تحسين اللغات (عرض 9000 دج)',
      filterAcademic: 'دعم البكالوريا وBEM',
      verifiedBadge: 'تلميذ بالأكاديمية',
      editableBadge: 'تجربة موثقة',
      shareBtn: 'شارك تجربتك في الأكاديمية',
      modalTitle: 'أضف رأيك أو تجربتك',
      modalSubtitle: 'نسعد بمشاركة تجربتك في Your Academy لإلهام زملائك الجدد. شاركنا انطباعك عن الأساتذة وطريقة الشرح.',
      fullNameLabel: 'الاسم واللقب',
      fullNamePlaceholder: 'مثال: أمين ب.',
      programLabel: 'البرنامج الدراسي',
      categoryLabel: 'نوع البرنامج',
      categoryLanguages: 'برامج اللغات الحية',
      categoryAcademic: 'الدعم المدرسي والأقسام النهائية',
      quoteLabel: 'رأيك في طريقة التدريس والمتابعة',
      quotePlaceholder: 'اكتب انطباعك عن الأساتذة، طريقة الشرح، أو التقدم الذي حققته...',
      outcomeLabel: 'النتيجة أو النقطة الإيجابية البارزة',
      outcomePlaceholder: 'مثال: كسر حاجز الحديث بالإنجليزية / تحسن ملحوظ في الرياضيات',
      ratingLabel: 'التقييم',
      submitBtn: 'نشر التجربة',
      cancelBtn: 'إلغاء',
      successMessage: 'شكراً لمشاركة تجربتك! تمت إضافة رأيك بنجاح.',
      validationError: 'يرجى ملء الاسم والبرنامج ورأيك للمتابعة.',
      ctaBoxTitle: 'ابدأ قصة نجاحك الخاصة في Your Academy',
      ctaBoxSubtitle: `${academyCampaign.registrationStatus} لموسم ${academyCampaign.academicYear}. مقاعد محدودة لضمان المتابعة الفردية لكل تلميذ.`,
      ctaBoxBtn: 'احجز مقعدك الآن',
      items: [
        {
          id: 'test-1',
          studentName: 'سارة م.',
          program: 'اللغة الإنجليزية — المستوى الكامل (English)',
          category: 'languages',
          quote: 'كنت أجد صعوبة كبيرة في التحدث والتعبير باللغة الإنجليزية رغم حفظي للقواعد. في Your Academy، أسلوب الأستاذ الشاب التفاعلي والتركيز على المحادثة اليومية جعلني أتكلم بطلاقة وبدون أي خوف.',
          outcome: 'اكتساب الثقة والطلاقة في المحادثة',
          period: 'موسم 2024 / 2025',
          rating: 5,
          initials: 'SM',
        },
        {
          id: 'test-2',
          studentName: 'أحمد ك.',
          program: 'دعم الأقسام النهائية — شعبة علوم تجريبية (BAC)',
          category: 'academic',
          quote: 'ما يميز الأكاديمية هو المتابعة الفردية وحل السلاسل النموذجية المتوافقة مع منهجية البكالوريا الجديدة. الأساتذة قريبون جداً منا ويجيبون عن كل استفسار بصبر واحترافية عالية.',
          outcome: 'تحصيل ممتاز ومنهجية واضحة في حل المواضيع',
          period: 'تحضير البكالوريا',
          rating: 5,
          initials: 'AK',
        },
        {
          id: 'test-3',
          studentName: 'ياسمين ب.',
          program: 'اللغة الفرنسية — تحسين المستوى والمحادثة (Français)',
          category: 'languages',
          quote: 'العرض الترويجي 9000 دج للمستوى كامل كان فرصة ممتازة جداً. الجو داخل القاعة مريح وتفاعلي، وعدد التلاميذ في الفوج مدروس يسمح للأستاذ بالتركيز مع كل واحد منا ومساعدتنا.',
          outcome: 'إتقان التعبير الشفهي والكتابي بالفرنسية',
          period: 'دورة تحسين المستوى',
          rating: 5,
          initials: 'YB',
        },
        {
          id: 'test-4',
          studentName: 'أيوب د.',
          program: 'دعم شهادة التعليم المتوسط (BEM)',
          category: 'academic',
          quote: 'طرق الشرح حديثة وممتعة، بعيدة تماماً عن الحفظ التلقيني. ساعدتني الحصص في تنظيم وقتي وفهم المواد الأساسية بكل سهولة وتجاوز الصعوبات قبل الامتحانات الرسمية.',
          outcome: 'تفوق دراسي وثقة عالية في الامتحانات',
          period: 'تحضير BEM',
          rating: 5,
          initials: 'AD',
        },
      ],
    },
    modal: {
      formBadge: `استمارة التسجيل الأولي • موسم ${academyCampaign.academicYear}`,
      titlePrefix: 'سجل الآن في',
      subtitle: 'طريقك نحو النجاح يبدأ من هنا. املأ بياناتك وسيتصل بك فريق الأكاديمية لتأكيد تسجيلك وموعد انطلاق الفوج.',
      fullNameLabel: 'الاسم واللقب',
      fullNamePlaceholder: 'مثال: محمد بوعلام',
      phoneLabel: 'رقم الهاتف',
      phonePlaceholder: '05 / 06 / 07 ...',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'example@mail.com',
      optional: '(اختياري)',
      programLabel: 'البرنامج المطلوب',
      levelLabel: 'المستوى الحالي أو الصف',
      timingLabel: 'الفترة المفضلة للحصص',
      timingOptions: {
        evening: 'الفترة المسائية (بعد الدوام)',
        weekend: 'عطلة نهاية الأسبوع (الجمعة / السبت)',
        morning: 'الفترة الصباحية',
        flexible: 'مرن / حسب التوفر',
      },
      levelOptions: {
        beginner: 'مبتدئ / المستوى الأول',
        intermediate: 'متوسط',
        advanced: 'متقدم',
        bac: 'سنة ثالثة ثانوي — تحضير البكالوريا',
        bem: 'سنة رابعة متوسط — تحضير BEM',
      },
      notesLabel: 'ملاحظات أو أسئلة إضافية',
      notesPlaceholder: 'أي تفاصيل ترغب بإعلامنا بها مسبقاً...',
      infoFooterDate: `بداية البرنامج: ${academyCampaign.startDate}`,
      infoFooterLocation: 'مقرنا: فرع عين الدفلى (الرئيسي) + فرع البليدة',
      submitBtn: 'إرسال طلب التسجيل وحجز المقعد',
      successBadge: 'تم استلام طلب التسجيل بنجاح',
      successTitle: 'مرحباً بك في Your Academy!',
      successMessage: 'شكراً لك. تم تسجيل طلبك المبدئي وسيتصل بك أحد مسؤولي الأكاديمية لتثبيت تسجيلك النهائي.',
      reservationCodeLabel: 'رمز حجز المقعد:',
      programReviewLabel: 'البرنامج:',
      phoneReviewLabel: 'رقم الهاتف:',
      locationReviewLabel: 'المقر:',
      startReviewLabel: 'انطلاق الموسم:',
      registerAnotherBtn: 'تسجيل طلب آخر',
      closeBtn: 'إغلاق',
      validationError: 'يرجى إدخال الاسم الكامل ورقم هاتف جزائري صالح للاتصال.',
    },
    mobileBar: {
      callPrimary: 'فرع عين الدفلى (الرئيسي)',
      callSecondary: 'فرع البليدة',
      registerNow: 'سجل الآن',
    },
    footer: {
      description: 'أكاديمية تعليمية متخصصة في تحسين المستوى في اللغات الحية (الإنجليزية، الفرنسية، الإسبانية، والألمانية) والدعم المدرسي للأقسام النهائية بمرافقة أساتذة شباب متمكنين وطرق حديثة في الشرح.',
      quickLinksTitle: 'روابط سريعة',
      home: 'الرئيسية',
      languages: 'برامج اللغات (عرض 9000 دج)',
      academic: 'حصص دعم البكالوريا وBEM',
      offer: 'تفاصيل العرض الترويجي',
      features: 'مميزات التعلم في الأكاديمية',
      faq: 'الأسئلة الشائعة',
      contactTitle: 'فروعنا والتواصل',
      officialPhones: 'أرقام الاتصال الرسمية',
      reserveNowBtn: `احجز مقعدك الآن (موسم ${academyCampaign.academicYear})`,
      copyright: 'جميع الحقوق محفوظة © {year} • أكاديمية Your Academy (فرع عين الدفلى الرئيسي + فرع البليدة).',
    },
    newsletter: {
      sectionBadge: 'مجتمعنا الأكاديمي • تواصل دائم',
      title: 'انضم إلى مجتمع',
      titleHighlight: 'Your Academy الأكاديمي',
      subtitle: 'كن أول من يطّلع على مواعيد انطلاق الأفواج الجديدة، ورشات اللغات التفاعلية، حصص الدعم المكثفة للأقسام النهائية والنصائح التعليمية في خميس مليانة.',
      emailPlaceholder: 'أدخل بريدك الإلكتروني (example@mail.com)...',
      namePlaceholder: 'الاسم الكامل (اختياري)...',
      interestLabel: 'ما هو اهتمامك الأكبر؟',
      interestLanguages: 'برامج اللغات (عرض 9000 دج)',
      interestAcademic: 'دعم البكالوريا و BEM',
      interestAll: 'جميع الأنشطة والمستجدات',
      submitBtn: 'انضم إلى مجتمعنا الأكاديمي',
      submittingBtn: 'جاري الاشتراك...',
      successTitle: 'مرحباً بك في مجتمع Your Academy!',
      successMessage: 'تم تسجيل اشتراكك بنجاح. ستصلك أحدث المستجدات، إعلانات الدورات والفعاليات الأكاديمية على بريدك.',
      resetBtn: 'تسجيل بريد آخر',
      privacyNote: 'نحترم خصوصيتك تماماً. لا نرسل أي رسائل مزعجة، فقط التحديثات والمواعيد المفيدة لدراستك.',
      perk1: 'إشعارات مبكرة قبل اكتمال المقاعد',
      perk2: 'نصائح حصرية لتعلم اللغات ومنهجية الامتحانات',
      perk3: 'دعوات لحضور الورشات والتقييمات التجريبية',
      perk4: 'عروض حصرية وتخفيضات خاصة بالمشتركين',
      directCallPrompt: 'هل لديك استفسار عاجل؟ يمكنك أيضاً الاتصال بنا مباشرة:',
    },
  },
  en: {
    common: {
      academyName: 'YOUR ACADEMY',
      academyNameAr: 'أكاديمية Your Academy',
      academyNameEn: 'YOUR ACADEMY',
      academySubtitle: 'Languages & Academic Support Academy',
      slogan: 'Your path to success starts here',
      locationName: 'Aïn Defla (Main) | Blida',
      locationFull: 'Aïn Defla Branch (Main): Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas • Blida Branch: 09000',
      cityState: 'Aïn Defla (Main) + Blida',
      academicYear: academyCampaign.academicYearEn,
      startDate: 'September 18, 2026',
      registrationStatus: 'Registration Open',
      specialPriceBadge: '9,000 DZD per level offer',
      fullLevelPrice: '9,000 DZD for full level',
      monthlyPrice: '3,000 DZD per month',
      blidaPrice: '4,000 DZD (Blida Branch)',
      adultsSessions: '4 sessions / month (Adults)',
      kidsSessions: '8 sessions / month (Kids)',
      registerNow: 'Register Now',
      contactUs: 'Contact Us',
      callNow: 'Call Us',
      explorePrograms: 'Explore Programs',
      findNearestBranch: 'Find Your Nearest Branch',
      allRightsReserved: 'All rights reserved',
      openForYear: academyCampaign.academicYearEn,
      mottoTagline1: 'DO WHAT YOU LOVE',
      mottoTagline2: 'LOVE WHAT YOU DO',
      backToSchool: 'BACK TO SCHOOL',
      britishCert: 'Certificate in collaboration with a British organization',
      individualFollowUp: 'Individual follow-up for every student',
      modernMethods: 'Modern teaching methods',
      skilledTeachers: 'Skilled young teachers',
      close: 'Close',
      submit: 'Confirm Pre-Registration',
      loading: 'Submitting...',
    },
    nav: {
      home: 'Home',
      languages: 'Language Programs',
      academic: 'Academic Support',
      specialOffer: '9000 DZD Offer',
      features: 'Why Choose Us',
      contact: 'Branches & Contact',
      testimonials: 'Student Stories',
      faq: 'FAQ',
      topBannerNotice: `Season ${academyCampaign.academicYearEn} • Program starts September 18, 2026 • Aïn Defla (Main) + Blida Branches`,
    },
    hero: {
      badgeStatus: 'Registration Open',
      badgeDate: academyCampaign.academicYearEn,
      mainTitlePrefix: 'Academy',
      mainTitleSuffix: 'Level Improvement in Living Languages & Academic Support',
      subtitle: 'Academic support with skilled young teachers, modern teaching methods, individual follow-up for every student, and dedicated support sessions for final exam classes in Khemis Miliana.',
      offerBannerTitle: 'Full Level for only 9,000 DZD',
      offerBannerSubtitle: 'Program starts September 18, 2026 • End-of-level certificate in collaboration with a British organization',
      offerBookBtn: 'Book This Offer',
      visualSubtitle: 'Languages & Academic Support Academy',
      limitedSeatsNote: 'Seats are strictly limited to ensure individual follow-up for each student',
      inquiryLine: 'Registration & Inquiry Hotline',
    },
    specialOffer: {
      badge: 'Season Promotional Offer',
      mainHeading: 'Full level for only 9,000 DZD',
      description: 'An exceptional opportunity to boost your proficiency in living languages (English, French, Spanish, or German) with interactive group dynamics, modern teaching methods, and precise individual follow-up.',
      check1: 'Comprehensive curriculum for a full level',
      check2: 'End-of-level certificate in collaboration with a British organization',
      check3: 'Individual follow-up for every student to consolidate learning',
      check4: 'Skilled young teachers with modern explanation techniques',
      boxTitle: 'Reserve Your Seat in the Offer',
      boxSubtitle: 'Limited seats to maintain educational quality and individual coaching',
      boxPriceLabel: 'Official price for a full level',
      boxPriceNote: 'Includes all sessions and individual pedagogical accompaniment',
      boxBtn: 'Register Now at This Price',
      orCallDirectly: 'Or call us directly:',
    },
    languages: {
      sectionBadge: 'Living Language Programs at Your Academy',
      title: 'Level Improvement in',
      titleHighlight: 'Living Languages',
      subtitle: 'Master practical languages, overcome communication barriers, and gain true fluency through modern explanation methods and individual follow-up for each student.',
      targetAudienceLabel: 'Target Audience:',
      highlightsTitle: 'Key Course Highlights & Modules:',
      registerInProgram: 'Register in',
      inquirePhone: 'Inquire by Phone',
      currentCostLabel: 'Tuition & Pricing Options',
      monthlyCostLabel: 'Monthly Subscription',
      fullLevelCostLabel: 'Full-Level Course',
      blidaCostLabel: 'Blida Branch Tuition',
      classSessionsLabel: 'Monthly Class Frequency',
      adultsSessionFrequency: 'Adults: 4 sessions per month',
      kidsSessionFrequency: 'Kids: 8 sessions per month',
      perLevel: 'for full level',
      programLaunch: 'Program Launch',
      studySeason: 'Academic Season',
      followUpType: 'Individual follow-up for each student',
      teachingMethod: 'Modern explanation methods',
      academyLocation: 'Location: Djenane Kaddour Belaid',
      viewDetails: 'View details',
      skillLevelsTitle: 'Curriculum Skill Levels Covered',
      skillLevelsSubtitle: 'Interactive circular progress indicators illustrating core skill coverage across the curriculum and acquired proficiency milestones.',
      cefrCoverageLabel: 'CEFR Levels Covered',
      overallCurriculumCoverage: 'Overall Curriculum Depth',
      programs: [
        {
          id: 'lang-en',
          title: 'English Language',
          subTitleEn: 'English Language',
          badge: 'Most Popular',
          description: 'A comprehensive training program focusing on accurate speaking, developing fluency, and building confidence in daily, academic, and professional communication.',
          highlights: [
            'Develop practical Speaking & Listening skills',
            'Simplify applied grammar for spontaneous, natural usage',
            'End-of-level certificate in collaboration with a British organization',
            'Individual coaching and regular progress corrections',
          ],
          priceTag: '9,000 DZD for full level',
          targetAudience: 'Beginners, students, and professionals aiming to boost proficiency',
          certification: 'Certificate in collaboration with a British organization',
          cefrLevels: 'A1 ➔ B2',
          overallCoveragePercent: 88,
          skillCompetencies: [
            {
              id: 'en-speaking',
              name: 'Speaking & Oral Fluency',
              percent: 92,
              levelBadge: 'B2',
              description: 'Confident everyday conversations, natural rhythm, and overcoming speech hesitation',
            },
            {
              id: 'en-listening',
              name: 'Listening & Auditory Comprehension',
              percent: 88,
              levelBadge: 'B2',
              description: 'Understanding native pacing, diverse accents, and spontaneous audio dialogues',
            },
            {
              id: 'en-grammar',
              name: 'Applied Practical Grammar',
              percent: 84,
              levelBadge: 'B1+',
              description: 'Instinctive grammar usage without hesitation or mechanical memorization',
            },
            {
              id: 'en-vocab',
              name: 'Vocabulary & Everyday Idioms',
              percent: 86,
              levelBadge: 'B2',
              description: 'Essential contemporary vocabulary for academic, travel, and career settings',
            },
          ],
        },
        {
          id: 'lang-fr',
          title: 'French Language',
          subTitleEn: 'Langue Française',
          badge: 'Academic & Career Growth',
          description: 'Focused training on oral and written expression, text comprehension, and accurate terminology for academic and professional advancement.',
          highlights: [
            'Emphasis on active oral expression (Expression Orale)',
            'Mastery of conjugation, grammar, and sentence structure',
            'Interactive practical exercises and structured discussions',
            'Detailed pedagogical accompaniment for every student',
          ],
          priceTag: '9,000 DZD for full level',
          targetAudience: 'Pupils, university students, and working professionals',
          certification: 'Level completion certificate',
          cefrLevels: 'A1 ➔ B2',
          overallCoveragePercent: 85,
          skillCompetencies: [
            {
              id: 'fr-expression',
              name: 'Oral Expression & Conversation',
              percent: 90,
              levelBadge: 'B2',
              description: 'Active debate participation and spontaneous spoken French communication',
            },
            {
              id: 'fr-listening',
              name: 'Auditory Comprehension & Listening',
              percent: 86,
              levelBadge: 'B2',
              description: 'Deciphering authentic spoken French discussions and spoken audio files',
            },
            {
              id: 'fr-grammar',
              name: 'Conjugation & Grammatical Structure',
              percent: 85,
              levelBadge: 'B1+',
              description: 'Accurate verb tenses, syntax alignment, and polished sentence construction',
            },
            {
              id: 'fr-writing',
              name: 'Written Expression & Text Analysis',
              percent: 82,
              levelBadge: 'B1+',
              description: 'Structuring clear letters, academic compositions, and cohesive paragraphs',
            },
          ],
        },
        {
          id: 'lang-es',
          title: 'Spanish Language',
          subTitleEn: 'Idioma Español',
          badge: 'Global Language & Practical Communication',
          description: 'Learn Spanish from scratch through structured, engaging steps designed to help you converse smoothly and confidently in everyday situations.',
          highlights: [
            'Master accurate pronunciation and phonetics from day one',
            'Practice real-life dialogues for travel and everyday scenarios',
            'Modern and enjoyable teaching techniques that reinforce key vocabulary',
            'A supportive environment encouraging continuous verbal practice',
          ],
          priceTag: '9,000 DZD for full level',
          targetAudience: 'Language lovers, students, and enthusiasts',
          certification: 'Level completion certificate',
          cefrLevels: 'A1 ➔ B1',
          overallCoveragePercent: 82,
          skillCompetencies: [
            {
              id: 'es-pronunciation',
              name: 'Accurate Phonetics & Pronunciation',
              percent: 88,
              levelBadge: 'B1',
              description: 'Mastering Spanish letter sounds, accents, and natural vocal articulation',
            },
            {
              id: 'es-speaking',
              name: 'Practical Dialogues & Travel Spanish',
              percent: 85,
              levelBadge: 'B1',
              description: 'Smooth communication in travel, everyday transactions, and meeting people',
            },
            {
              id: 'es-listening',
              name: 'Listening & Audio Comprehension',
              percent: 80,
              levelBadge: 'B1',
              description: 'Grasping spoken dialogues among native Spanish speakers in common contexts',
            },
            {
              id: 'es-grammar',
              name: 'Core Grammar & Essential Vocabulary',
              percent: 78,
              levelBadge: 'A2+',
              description: 'Solid sentence formation and mastering high-frequency words effortlessly',
            },
          ],
        },
        {
          id: 'lang-de',
          title: 'German Language',
          subTitleEn: 'Deutsche Sprache',
          badge: 'Academic & International Opportunities',
          description: 'Build a solid foundation in German for beginners according to recognized standards, tailored for those preparing for study or work opportunities.',
          highlights: [
            'Master German pronunciation and phonetic articulation',
            'Grasp core sentence patterns and fundamental grammar',
            'Practical listening and speaking workshops',
            'Ongoing assessment to track comprehension step by step',
          ],
          priceTag: '9,000 DZD for full level',
          targetAudience: 'Individuals planning to study abroad and motivated learners',
          certification: 'Level completion certificate',
          cefrLevels: 'A1 ➔ B1',
          overallCoveragePercent: 78,
          skillCompetencies: [
            {
              id: 'de-speaking',
              name: 'Basic Speaking & Articulation (Sprechen)',
              percent: 82,
              levelBadge: 'B1',
              description: 'Correct German phonetics and constructing functional conversational phrases',
            },
            {
              id: 'de-grammar',
              name: 'German Grammar & Cases (Grammatik)',
              percent: 80,
              levelBadge: 'B1',
              description: 'Understanding sentence order, gender articles, and German case structures (Kasus)',
            },
            {
              id: 'de-listening',
              name: 'Listening & Comprehension (Hörverstehen)',
              percent: 76,
              levelBadge: 'A2+',
              description: 'Comprehending direct instructions, spoken prompts, and standard audio recordings',
            },
            {
              id: 'de-vocab',
              name: 'Study & Daily Vocabulary (Wortschatz)',
              percent: 75,
              levelBadge: 'A2+',
              description: 'Core lexicon tailored for exam readiness, study abroad plans, and visa prep',
            },
          ],
        },
      ],
    },
    academic: {
      sectionBadge: 'Academic Support & Exam Excellence',
      title: 'Academic Support with',
      titleHighlight: 'Skilled Young Teachers',
      subtitle: 'Specialized pedagogical support programs for final exam classes and various school grades in Khemis Miliana, emphasizing deep concept comprehension, model problem-solving, and personalized student tracking.',
      featuresLabel: 'Program Highlights:',
      bookSupportBtn: 'Reserve Support Seat',
      boxBadge: 'Pedagogical Approach at Your Academy',
      boxTitle: 'Final Classes Support: Guiding you from the first lesson until exam day',
      boxDescription: 'We go beyond basic tutoring: we prioritize hands-on practice, thorough past exam solutions, and anxiety management through modern teaching methods led by talented young educators.',
      boxRegisterBtn: 'Register for Final Exam Support',
      boxInquireBtn: 'Instant Inquiry',
      programs: [
        {
          id: 'acad-bac',
          title: 'Final Exam Support — Baccalaureate (BAC)',
          subTitleEn: 'BAC Exam Support',
          badge: 'Focused Support for Final Classes',
          description: 'Pedagogical and psychological guidance enabling students to grasp full syllabus subjects and master official exam answering methodologies.',
          highlights: [
            'Young teachers well-versed in ministerial curricula and exam formats',
            'Intensive drills on exercise series and past national BAC papers',
            'Targeted focus on conceptual clarity and resolving difficult problem areas',
            'Individual tracking to remedy weak spots before official test dates',
          ],
          priceTag: 'Affordable rates per subject and stream',
          targetAudience: '3rd-year secondary school students (all branches)',
        },
        {
          id: 'acad-bem',
          title: 'Middle School Certificate Support (BEM)',
          subTitleEn: 'BEM Exam Support',
          badge: 'Solidifying Fundamentals & Exam Prep',
          description: 'Guiding 4th-year middle school students to comprehend key subjects deeply, cultivate precise answering skills, and eliminate exam stress.',
          highlights: [
            'Clear, simplified explanation of core subjects',
            'Solving past official BEM exams and predicted model topics',
            'Continuous monitoring to assess progress and rectify misunderstandings',
            'Optimized group sizes ensuring full teacher-student interaction',
          ],
          priceTag: 'Accessible rates with flexible options',
          targetAudience: '4th-year middle school students (BEM candidates)',
        },
        {
          id: 'acad-level',
          title: 'Academic Level Boost & General School Support',
          subTitleEn: 'Academic Level Boost',
          badge: 'Addressing Cumulative Learning Gaps',
          description: 'Tutoring sessions for middle and high school grades designed to build robust foundations in key subjects before crucial milestone exams.',
          highlights: [
            'Accurate diagnostic assessment of student level and challenges',
            'Progressive exercises moving step by step from basic to advanced',
            'Modern interactive explanation techniques that spark motivation',
            'Regular communication with parents regarding performance progress',
          ],
          priceTag: 'Periodic rolling enrollments',
          targetAudience: 'Middle and secondary school students',
        },
      ],
    },
    pillars: {
      sectionBadge: 'Our Pedagogical Vision & Values',
      title: 'Why Choose',
      titleHighlight: 'Your Academy',
      subtitle: 'We combine youthful energy, teaching competence, and modern methods to deliver an educational experience that makes a genuine difference in your journey.',
      boxMottoBadge: 'YOUR ACADEMY MOTTO',
      boxFootnote: 'In Khemis Miliana, Djenane Kaddour Belaid • An inspiring educational environment to learn with passion and distinction',
      items: [
        {
          id: 'pillar-1',
          title: 'Individual follow-up for every student',
          description: 'We accompany each learner, pinpoint strengths, and address difficulties step by step to guarantee genuine, measurable progress.',
          iconName: 'UserCheck',
        },
        {
          id: 'pillar-2',
          title: 'Modern teaching methods',
          description: 'Using interactive media and contemporary techniques to simplify concepts and make learning enjoyable and applicable rather than passive memorization.',
          iconName: 'Sparkles',
        },
        {
          id: 'pillar-3',
          title: 'Skilled young teachers',
          description: 'A dynamic, pedagogical team combining high competence, passion for teaching, and the ability to convey knowledge smoothly and engagingly.',
          iconName: 'GraduationCap',
        },
        {
          id: 'pillar-4',
          title: 'Support sessions for final classes',
          description: 'Intensive prep programs dedicated to Baccalaureate (BAC) and Middle School Certificate (BEM) exams, prioritizing technique and model solving.',
          iconName: 'BookOpen',
        },
        {
          id: 'pillar-5',
          title: 'Level improvement in living languages',
          description: 'Specialized training courses to upgrade language proficiency in English, French, Spanish, and German.',
          iconName: 'Languages',
        },
        {
          id: 'pillar-6',
          title: 'Certificate in collaboration with a British organization',
          description: 'Upon completing level requirements and passing the evaluation, students receive an end-of-level certificate in collaboration with a British organization.',
          iconName: 'Award',
        },
      ],
    },
    contact: {
      sectionBadge: 'Headquarters & Official Contact Info',
      title: 'Contact Us &',
      titleHighlight: 'Visit Our Branches',
      subtitle: 'Registration and inquiries are open at our two official branches (Aïn Defla Main Branch and Blida Branch). Call us directly or submit your online pre-registration.',
      locationCardTitle: 'Our Academy Branches',
      locationTransitNote: 'Conveniently located in Aïn Defla (Main) and Blida, with easy transit access and parking.',
      phonesTitle: 'Official Phone Numbers',
      phonesBadge: 'Available for direct calls',
      copyPhoneTitle: 'Copy phone number',
      callAction: 'Call',
      emailLabel: 'Email Address',
      hoursLabel: 'Working & Reception Hours',
      hoursValue: 'Saturday to Thursday: 08:30 to 18:00',
      hoursNote: '(Please call ahead to confirm your exact appointment)',
      mapTitle: 'Directions Map to the Academy',
      directionsTitle: 'How to Reach Us:',
      directions: [
        'Main Branch: Hay El Ikhwa Chaoual, Route Mosquee Malik Ibn Anas, Aïn Defla, Algeria (44000).',
        'Blida Branch: Blida, Algeria (09000).',
        'If you experience any difficulty finding our location, call us directly and our reception team will guide you.',
      ],
      bookVisitBtn: 'Register Now or Schedule a Visit',
    },
    faq: {
      sectionBadge: 'Clear & Direct Answers',
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      subtitle: 'Everything you need to know regarding registration, language programs, academic support, and seasonal offers at Your Academy.',
      items: [
        {
          q: 'How much do the monthly subscription and full-level course cost?',
          a: 'The monthly subscription is 3,000 DZD per month, while the full-level course costs 9,000 DZD for the complete level. Additionally, the Blida branch maintains a dedicated branch-specific price of 4,000 DZD according to local campus facilities.',
        },
        {
          q: 'How many monthly sessions are provided for adults and children?',
          a: 'Our monthly course structure provides:\n• Adults: 4 sessions per month (one focused weekly session format).\n• Kids: 8 sessions per month (two interactive sessions per week for steady progress and fluency).',
        },
        {
          q: 'What is the applicable price for the Blida branch?',
          a: 'The confirmed tuition for the Blida branch is 4,000 DZD, preserved as a dedicated branch-specific price distinct from general pricing (including 4 sessions per month for adults or 8 sessions per month for kids).',
        },
        {
          q: 'When do academic programs start at the academy?',
          a: `Academic programs for the ${academyCampaign.academicYear} season commence on September 18, 2026. Registrations are currently open to book limited seats.`,
        },
        {
          q: 'Which languages are taught at Your Academy?',
          a: 'We offer specialized courses in four major living languages: English, French, Spanish, and German, across age groups (adults and kids) and proficiency levels.',
        },
        {
          q: 'Where are Your Academy branches located?',
          a: 'Your Academy operates across four official equipped campuses: Main Branch in Aïn Defla (Hay El Ikhwa Chaoual), Blida Branch (Blida 09000), Khemis Miliana Branch (Under Wazir El Qlayel store), and El Attaf Branch.',
        },
        {
          q: 'What certificate is granted upon completing a language level?',
          a: 'Upon fulfilling course requirements and assessments, students receive an end-of-level certificate in collaboration with a British organization.',
        },
        {
          q: 'Is academic support available for final classes like BAC and BEM?',
          a: 'Yes, we provide focused, intensive support for final classes (BAC and BEM) led by skilled young teachers, emphasizing methodology, past paper solutions, and individual coaching.',
        },
        {
          q: 'How can I register or reserve a seat?',
          a: 'You can register directly through the online form on this website, or call our branch phones (Aïn Defla: 0552 40 40 59, Blida: 0560 40 40 00, Khemis Miliana: 0551 40 40 59, El Attaf: 0670 40 66 59).',
        },
      ],
    },
    testimonials: {
      sectionBadge: 'Student Success Stories & Experiences',
      title: 'Real Experiences Highlighting',
      titleHighlight: 'Our Teaching Methodology',
      subtitle: 'Feedback and impressions from our students in language improvement and final exam support in Khemis Miliana, and how individual follow-up and skilled young teachers helped them achieve concrete progress.',
      filterAll: 'All Stories',
      filterLanguages: 'Language Programs (9,000 DZD Offer)',
      filterAcademic: 'BAC & BEM Academic Support',
      verifiedBadge: 'Academy Student',
      editableBadge: 'Documented Experience',
      shareBtn: 'Share Your Academy Experience',
      modalTitle: 'Share Your Story / Feedback',
      modalSubtitle: 'We love hearing how Your Academy supported your journey. Share your feedback about the teachers and learning experience.',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'e.g. Amin B.',
      programLabel: 'Enrolled Program',
      categoryLabel: 'Program Category',
      categoryLanguages: 'Living Language Programs',
      categoryAcademic: 'Academic Support & Exam Classes',
      quoteLabel: 'Your Feedback & Review',
      quotePlaceholder: 'Describe your impressions of the teachers, explanations, or your personal progress...',
      outcomeLabel: 'Key Outcome / Highlight',
      outcomePlaceholder: 'e.g. Overcame hesitation speaking English / Significant math improvement',
      ratingLabel: 'Rating',
      submitBtn: 'Publish Story',
      cancelBtn: 'Cancel',
      successMessage: 'Thank you for sharing your experience! Your review has been added successfully.',
      validationError: 'Please fill in your name, program, and review to proceed.',
      ctaBoxTitle: 'Start Your Own Success Story at Your Academy',
      ctaBoxSubtitle: `Enrollment is open for the ${academyCampaign.academicYear} season. Limited seats to ensure personalized follow-up.`,
      ctaBoxBtn: 'Reserve Your Seat Now',
      items: [
        {
          id: 'test-1',
          studentName: 'Sarah M.',
          program: 'English Language — Full Level (English)',
          category: 'languages',
          quote: 'I used to struggle speaking and expressing myself in English despite knowing the grammar rules. At Your Academy, the young teacher\'s interactive approach and emphasis on daily speaking broke down my hesitation completely.',
          outcome: 'Gained conversational fluency and genuine confidence',
          period: '2024 / 2025 Season',
          rating: 5,
          initials: 'SM',
        },
        {
          id: 'test-2',
          studentName: 'Ahmed K.',
          program: 'Final Exam Support — Experimental Sciences (BAC)',
          category: 'academic',
          quote: 'What truly distinguishes the academy is the individual coaching and solving model exam problem sets tailored to the updated Baccalaureate format. The teachers relate to us and address every inquiry with patience and dedication.',
          outcome: 'Strong academic performance & clear exam methodology',
          period: 'BAC Preparation',
          rating: 5,
          initials: 'AK',
        },
        {
          id: 'test-3',
          studentName: 'Yasmine B.',
          program: 'French Language — Proficiency & Conversation (Français)',
          category: 'languages',
          quote: 'The promotional offer of 9,000 DZD for a full level was an outstanding opportunity. The classroom environment is encouraging and comfortable, and carefully sized groups allow the teacher to focus on each of us and correct mistakes in real time.',
          outcome: 'Mastery of oral and written French communication',
          period: 'Level Improvement Course',
          rating: 5,
          initials: 'YB',
        },
        {
          id: 'test-4',
          studentName: 'Ayoub D.',
          program: 'Middle School Support (BEM Prep)',
          category: 'academic',
          quote: 'The teaching methods are modern and engaging, far from dry, passive memorization. The classes helped me organize my study timetable, master core subjects easily, and overcome doubts before official exams.',
          outcome: 'Academic excellence and strong exam readiness',
          period: 'BEM Preparation',
          rating: 5,
          initials: 'AD',
        },
      ],
    },
    modal: {
      formBadge: `Pre-Registration Form • Season ${academyCampaign.academicYear}`,
      titlePrefix: 'Register Now at',
      subtitle: 'Your path to success starts here. Fill in your details and our academy team will contact you to confirm your enrollment and group start date.',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'e.g. Mohamed Boualam',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '05 / 06 / 07 ...',
      emailLabel: 'Email Address',
      emailPlaceholder: 'example@mail.com',
      optional: '(Optional)',
      programLabel: 'Desired Program',
      levelLabel: 'Current Level or Grade',
      timingLabel: 'Preferred Session Timing',
      timingOptions: {
        evening: 'Evening sessions (after school/work)',
        weekend: 'Weekend sessions (Friday / Saturday)',
        morning: 'Morning sessions',
        flexible: 'Flexible / Based on availability',
      },
      levelOptions: {
        beginner: 'Beginner / Level 1',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        bac: '3rd Year Secondary — BAC Prep',
        bem: '4th Year Middle School — BEM Prep',
      },
      notesLabel: 'Additional Notes or Inquiries',
      notesPlaceholder: 'Any details or questions you would like us to know in advance...',
      infoFooterDate: 'Program start: September 18, 2026',
      infoFooterLocation: 'Branches: Aïn Defla (Main) + Blida',
      submitBtn: 'Submit Pre-Registration & Reserve Seat',
      successBadge: 'Registration Request Received Successfully',
      successTitle: 'Welcome to Your Academy!',
      successMessage: 'Thank you. Your pre-registration has been recorded, and an academy coordinator will contact you shortly to finalize your enrollment.',
      reservationCodeLabel: 'Seat Booking Code:',
      programReviewLabel: 'Program:',
      phoneReviewLabel: 'Phone:',
      locationReviewLabel: 'Location:',
      startReviewLabel: 'Season Start:',
      registerAnotherBtn: 'Register Another Student',
      closeBtn: 'Close',
      validationError: 'Please provide your full name and a valid Algerian phone number.',
    },
    mobileBar: {
      callPrimary: 'Aïn Defla (Main)',
      callSecondary: 'Blida Branch',
      registerNow: 'Register Now',
    },
    footer: {
      description: 'Educational academy specialized in living language proficiency (English, French, Spanish, and German) and academic support for exam classes, guided by competent young teachers and modern explanations.',
      quickLinksTitle: 'Quick Links',
      home: 'Home',
      languages: 'Language Programs (9000 DZD Offer)',
      academic: 'Baccalaureate & BEM Support',
      offer: 'Special Offer Details',
      features: 'Academy Pillars & Values',
      faq: 'Frequently Asked Questions',
      contactTitle: 'Branches & Contact',
      officialPhones: 'Official Contact Numbers',
      reserveNowBtn: `Reserve Your Seat (${academyCampaign.academicYear} Season)`,
      copyright: 'All rights reserved © {year} • YOUR ACADEMY (Aïn Defla Main Branch + Blida Branch).',
    },
    newsletter: {
      sectionBadge: 'Academic Community • Continuous Engagement',
      title: 'Join Our Academic',
      titleHighlight: 'Community at Your Academy',
      subtitle: 'Be the first to receive updates on new cohort schedules, interactive language workshops, intensive BAC/BEM preparation seminars, and exclusive study guides in Khemis Miliana.',
      emailPlaceholder: 'Enter your email address (example@mail.com)...',
      namePlaceholder: 'Full name (optional)...',
      interestLabel: 'Primary area of interest:',
      interestLanguages: 'Language Programs (9,000 DZD Offer)',
      interestAcademic: 'BAC & BEM Academic Support',
      interestAll: 'All Academy News & Events',
      submitBtn: 'Join Our Academic Community',
      submittingBtn: 'Subscribing...',
      successTitle: 'Welcome to Our Community!',
      successMessage: "You're now subscribed. You will receive timely announcements, event invites, and helpful learning insights straight to your inbox.",
      resetBtn: 'Subscribe Another Email',
      privacyNote: 'We strictly respect your privacy. Zero spam — only genuinely valuable academic announcements and study tips.',
      perk1: 'Early notifications before cohort seats fill up',
      perk2: 'Exclusive language learning & exam methodology tips',
      perk3: 'Invitations to free trial workshops and assessments',
      perk4: 'Special seasonal privileges and member offers',
      directCallPrompt: 'Need immediate information? Feel free to contact our administrative desk:',
    },
  },
};
