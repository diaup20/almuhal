import { SiteData } from '../types';

const heavyFleetImg = '/src/assets/images/heavy_truck_fleet_1786835541377.jpg';
const portakabinImg = '/src/assets/images/portakabin_transport_1786835552808.jpg';
const containerImg = '/src/assets/images/container_transport_1786835565647.jpg';

export const defaultSiteData: SiteData = {
  adminPin: 'almhal!@#123',
  adminUsername: 'almhal',
  adminPassword: 'almhal!@#123',
  
  hero: {
    headline: 'المهل للنقليات وخدمات النقل الشاملة',
    subheadline: 'الشريك الموثوق في نقل البركسات، الحاويات، الصبيات الخرسانية، الحديد والمعدات الثقيلة بأعلى معايير الأمان والسرعة في جميع أنحاء المملكة.',
    badgeText: 'أسطول حديث وسرعة في التنفيذ 🚛',
    primaryCtaText: 'اطلب خدمة نقل الآن',
    secondaryCtaText: 'تواصل معنا مباشرة',
    heroImageUrl: heavyFleetImg,
    trucksCountBadge: 'أكثر من 150 شاحنة ومقطورة',
    deliveriesCountBadge: '99.8% نسبة الالتزام بالمواعيد',
  },

  about: {
    title: 'من نحن - المهل للنقليات',
    subtitle: 'خبرة عريقة في حلول النقل الثقيل واللوجستي',
    descriptionParagraph1: 'تعتبر شركة "المهل للنقليات وخدمات النقل" واحدة من الشركات الوطنية الرائدة المتخصصة في خدمات نقل البضائع، البركسات، والمعدات الثقيلة داخل المملكة العربية السعودية ودول الخليج. تأسست الشركة برؤية واضحة تهدف لتوفير حلول نقل آمنة وسريعة تعتمد على أعلى معايير الجودة العالمية.',
    descriptionParagraph2: 'نمتلك أسطولاً متكاملاً من الشاحنات الحديثة والمقطورات المجهزة بأحدث تقنيات التتبع والسلامة، مع فريق احترافي من السائقين والمهندسين واللوجستيين المدربين للتعامل مع المنقولات الضخمة والحساسة وضمان وصولها بسلاسة وأمان تام.',
    experienceYears: '15+',
    highlights: [
      'أسطول حديث ومجهز للشحنات الأحجام والأنواع المختلفة',
      'تغطية شاملة لجميع مناطق المملكة والمدن الرئيسية',
      'تأمين كامل على المنقولات وسلامة الأحمال',
      'التزام تام بالمواعيد المحددة والسرعة في الإنجاز',
      'خدمة عملاء ودعم لوجستي على مدار 24/7'
    ]
  },

  services: [
    {
      id: 'srv-portakabins',
      title: 'نقل البركسات والمباني الجاهزة',
      shortDesc: 'نقل سريع وآمن لكافة أنواع البركسات والمكاتب والمباني المتنقلة بأحجامها المختلفة.',
      fullDesc: 'نوفر مقطورات وشاحنات متخصصة مجهزة بكرينات هيدروليكية لنقل وتحميل وتنزيل البركسات والمباني الجاهزة للمواقع والمشاريع الإنشائية والصناعية مع التثبيت المحكم.',
      iconName: 'Home',
      imageUrl: portakabinImg,
      category: 'نقل مباني جاهزة',
      popular: true,
    },
    {
      id: 'srv-containers',
      title: 'نقل الحاويات والشحن اللوجستي',
      shortDesc: 'نقل الحاويات البحرية والتجارية (20 قدم و40 قدم) من وإلى الموانئ والمستودعات.',
      fullDesc: 'خدمة نقل الحاويات الجافة والمبردة بين الموانئ والمستودعات والمصانع بدقة متناهية، مع توفير أساطيل مقطورات مخصصة وسائقين محترفين للتخليص والنقل المباشر.',
      iconName: 'Container',
      imageUrl: containerImg,
      category: 'نقل شحن وحاويات',
      popular: true,
    },
    {
      id: 'srv-concrete-precast',
      title: 'نقل الصبيات والمجسمات الخرسانية',
      shortDesc: 'نقل الصبيات الجاهزة والقواعد الخرسانية الضخمة لمواقع البناء والمشاريع.',
      fullDesc: 'نعتمد على مقطورات منخفضة التسميك (Lowbed) ومجهزة لتحمل أوزان الصبيات الخرسانية الثقيلة وقواعد الأبراج والجسور مع الالتزام بأقصى درجات أمان الطرق.',
      iconName: 'Layers',
      imageUrl: heavyFleetImg,
      category: 'إنشاءات ومواد بناء',
      popular: false,
    },
    {
      id: 'srv-steel-metals',
      title: 'نقل الحديد والهياكل المعدنية',
      shortDesc: 'نقل حديد التسليح، الأنابيب، الهياكل والقطاعات المعدنية الثقيلة بكفاءة.',
      fullDesc: 'نقل آمن لحديد البناء والأنابيب الضخمة والشرائح المعدنية الممدودة مع استخدام وسائل تربيط وحماية معتمدة تفادياً لأي انزلاق أو تلف أثناء المسارات الطويلة.',
      iconName: 'Box',
      imageUrl: heavyFleetImg,
      category: 'مواد إنشائية',
      popular: true,
    },
    {
      id: 'srv-generators',
      title: 'نقل المولدات الكهربائية والمحولات',
      shortDesc: 'نقل وتثبيت المولدات الضخمة ومحولات الطاقة الكهربائية لمواقع العمل الحقلية.',
      fullDesc: 'خدمة نقل متخصصة للمولدات الكهربائية ومحطات الطاقة المؤقتة ذات الأوزان الكبيرة، مع العناية الفائقة بنقاط التثبيت وأجهزة الامتصاص للصدمات.',
      iconName: 'Zap',
      imageUrl: heavyFleetImg,
      category: 'معدات طاقة',
      popular: false,
    },
    {
      id: 'srv-large-ac',
      title: 'نقل المكيفات الكبيرة والمركزية',
      shortDesc: 'نقل وحدات التكييف المركزي والمبردات الصناعية (Chillers) للمباني والمنشآت.',
      fullDesc: 'نقل متخصص لوحدات التكييف المركزية الضخمة (Chillers & Package Units) مع حماية الهياكل والأنابيب الحساسة وتأمين التوصيل للمواقع بأمان تام.',
      iconName: 'Wind',
      imageUrl: heavyFleetImg,
      category: 'تكييف وتبريد صناعي',
      popular: false,
    },
    {
      id: 'srv-general-heavy',
      title: 'جميع خدمات النقل العام والشحن الثقيل',
      shortDesc: 'حلول شاملة لنقل البضائع، المعدات والآليات بكافة أنواعها لجميع مدن المملكة.',
      fullDesc: 'تغطي خدماتنا كافة متطلبات قطاعات المقاولات والصناعة والتجارة، عبر حلول نقل مخصصة وأساطيل متنوعة تناسب الوزن والحجم ووجهة التوصيل المطلوبة.',
      iconName: 'Truck',
      imageUrl: heavyFleetImg,
      category: 'نقل عام وشامل',
      popular: true,
    }
  ],

  features: [
    {
      id: 'feat-1',
      title: 'سرعة الاستجابة والتنفيذ',
      description: 'نمتلك أسطولاً جاهزاً للتحرك السريع لتلبية طلبات النقل الطارئة والمجدولة في أسرع وقت.',
      iconName: 'Clock'
    },
    {
      id: 'feat-2',
      title: 'الالتزام التام بالمواعيد',
      description: 'نلتزم بدقة بالمواعيد المتفق عليها للتسليم والتسلم لتفادي أي تأخير في مشاريع عملائنا.',
      iconName: 'CheckCircle2'
    },
    {
      id: 'feat-3',
      title: 'أعلى درجات الأمان والحماية',
      description: 'استخدام أفضل معدات التربيط والتثبيت مع نظام تتبع GPS مستمر لكل شاحنة أثناء الرحلة.',
      iconName: 'ShieldCheck'
    },
    {
      id: 'feat-4',
      title: 'خبرة ميدانية واسعة',
      description: 'فريق عمل وسائقون محترفون ذوو خبرة طويلة في التعامل مع الطرق الشديدة والأحمال الثقيلة.',
      iconName: 'Award'
    },
    {
      id: 'feat-5',
      title: 'تغطية شاملة للمملكة والخليج',
      description: 'نصل إلى كافة المدن والمحافظات السعودية والمناطق الصناعية والمشاريع النائية والخليج.',
      iconName: 'MapPin'
    },
    {
      id: 'feat-6',
      title: 'أسعار تنافسية وجهوزية 24/7',
      description: 'تقديم أفضل الأسعار الاقتصادية مع استجابة فورية ودعم مستمر لكافة استفساراتكم.',
      iconName: 'Sparkles'
    }
  ],

  stats: [
    {
      id: 'stat-1',
      label: 'عملية نقل ناجحة',
      value: '12,500',
      suffix: '+',
      iconName: 'Truck'
    },
    {
      id: 'stat-2',
      label: 'شاحنة ومقطورة متطورة',
      value: '150',
      suffix: '+',
      iconName: 'Shield'
    },
    {
      id: 'stat-3',
      label: 'عميل وشركة تثق بنا',
      value: '850',
      suffix: '+',
      iconName: 'Users'
    },
    {
      id: 'stat-4',
      label: 'مدن ومناطق مغطاة',
      value: '45',
      suffix: 'مدينة',
      iconName: 'MapPin'
    }
  ],

  gallery: [
    {
      id: 'gal-1',
      title: 'نقل أسطول بركسات ومكاتب متنقلة',
      category: 'نقل البركسات',
      imageUrl: portakabinImg,
      description: 'عملية تحميل ونقل وتنزيل بركسات ومكاتب جاهزة لمشروع إنشائي ضخم بمدينة الرياض.'
    },
    {
      id: 'gal-2',
      title: 'نقل شحنات حاويات شحن ثقيلة',
      category: 'نقل الحاويات',
      imageUrl: containerImg,
      description: 'نقل حاويات تجارية 40 قدم مباشرة من الميناء إلى المستودعات الرئيسية.'
    },
    {
      id: 'gal-3',
      title: 'أسطول الشاحنات والمقطورات الحديثة',
      category: 'النقل الثقيل',
      imageUrl: heavyFleetImg,
      description: 'تجهيز أسطول مقطورات المهل للنقليات لنقل الأحمال الكبيرة والمعدات الثقيلة.'
    },
    {
      id: 'gal-4',
      title: 'نقل صبيات وقواعد خرسانية جاهزة',
      category: 'نقل الصبيات',
      imageUrl: portakabinImg,
      description: 'نقل وتثبيت القواعد الخرسانية الضخمة للمشاريع الإنشائية بدقة عالية.'
    },
    {
      id: 'gal-5',
      title: 'نقل الهياكل والمجسمات الحديدية',
      category: 'نقل الحديد',
      imageUrl: heavyFleetImg,
      description: 'نقل القطع والهياكل الصلبة المصنعة للمصانع والورش الكبرى.'
    }
  ],

  contactInfo: {
    phonePrimary: '+966 50 123 4567',
    phoneSecondary: '+966 55 987 6543',
    whatsappNumber: '966501234567',
    email: 'info@almahl-transport.com',
    address: 'شارع حسين سرحان - بجانب رافعة ونش كرين مكة أحجام وأنواع مختلفة للايجار',
    cityRegion: 'مكة المكرمة، المملكة العربية السعودية',
    workingHours: 'على مدار 24 ساعة - 7 أيام في الأسبوع',
    mapEmbedUrl: 'https://maps.google.com/maps?q=21.4440190,39.8523705&hl=ar&z=16&output=embed',
    googleMapsUrl: 'https://www.google.com/maps?q=21.4440190,39.8523705',
    socials: {
      twitter: 'https://twitter.com/almahl_transport',
      instagram: 'https://instagram.com/almahl_transport',
      linkedin: 'https://linkedin.com/company/almahl-transport',
      facebook: 'https://facebook.com/almahltransport'
    }
  },

  seo: {
    siteTitle: 'المهل للنقليات وخدمات النقل في مكة | نقل حاويات وبركسات وتريلات',
    metaDescription: 'شركة المهل للنقليات وخدمات النقل في مكة المكرمة - متخصصون في المهل للنقليات، نقليات مكة، خدمات النقل في مكة، نقل الحاويات، نقل البركسات، نقل الحديد، نقل المولدات، نقل المعدات الثقيلة والتريلات.',
    keywords: [
      'المهل للنقليات',
      'نقليات مكة',
      'خدمات النقل في مكة',
      'نقل الحاويات',
      'نقل البركسات',
      'نقل الحديد',
      'نقل المولدات',
      'نقل المعدات الثقيلة',
      'تأجير التريلات',
      'نقل صبيات وخرسانة',
      'خدمات النقل الثقيل'
    ],
    ogImage: heavyFleetImg,
    canonicalUrl: 'https://almuhal.vercel.app/',
    schemaOrgName: 'المهل للنقليات وخدمات النقل',
    schemaPhone: '+966501234567',
    schemaAddress: 'مكة المكرمة، منطقة مكة المكرمة، المملكة العربية السعودية'
  }
};
