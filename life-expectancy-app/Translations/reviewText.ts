import { LanguageType } from '@/app/type';

export const reviewText: Record<
  LanguageType,
  {
    steps: {
      personalInfo: string;
      lifestyle: string;
      medicalHistory: string;
      preventiveCare: string;
    };
    getPredictions: string;
  }
> = {
  en: {
    steps: {
      personalInfo: 'Personal Information',
      lifestyle: 'Lifestyle Habits',
      medicalHistory: 'Medical History',
      preventiveCare: 'Preventive Care',
    },
    getPredictions: 'Get Predictions',
  },
  he: {
    steps: {
      personalInfo: 'מידע אישי',
      lifestyle: 'הרגלי חיים',
      medicalHistory: 'היסטוריה רפואית',
      preventiveCare: 'טיפול מונע',
    },
    getPredictions: 'קבל תחזית',
  },
  ar: {
    steps: {
      personalInfo: 'معلومات شخصية',
      lifestyle: 'عادات نمط الحياة',
      medicalHistory: 'السجل الطبي',
      preventiveCare: 'الرعاية الوقائية',
    },
    getPredictions: 'احصل على التوقعات',
  },
};
