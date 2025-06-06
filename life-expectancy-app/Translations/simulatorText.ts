// src/translations/simulatorText.ts

import { LanguageType } from '@/app/type';

export const simulatorText: Record<
  LanguageType,
  {
    title: string;
    sleep: string;
    weight: string;
    smokerStatus: string;
    smokerTicks: string[];
    eCigaretteUsage: string;
    ecigTicks: string[];
    alcohol: string;
    physical: string;
    predict: string;
    running: string;
    resultTitle: string;
    years: string;
    backToResults: string;
  }
> = {
  en: {
    title: 'Life Expectancy Simulator',
    sleep: 'Sleep Hours',
    weight: 'Weight (kg)',
    smokerStatus: 'Smoker Status',
    smokerTicks: ['Never', 'Former', 'Some days', 'Every day'],
    eCigaretteUsage: 'E-Cigarette Usage',
    ecigTicks: ['Never', 'Former', 'Some days', 'Every day'],
    alcohol: 'Alcohol Drinker',
    physical: 'Physical Activities',
    predict: 'Predict',
    running: 'Running…',
    resultTitle: 'Estimated Life Expectancy',
    years: 'years',
    backToResults: '← Back to Results',
  },
  he: {
    title: 'סימולטור תוחלת חיים',
    sleep: 'שעות שינה',
    weight: 'משקל (ק"ג)',
    smokerStatus: 'סטטוס עישון',
    smokerTicks: ['אף פעם', 'בעבר', 'חלק מהזמן', 'כל יום'],
    eCigaretteUsage: 'שימוש בסיגריות אלקטרוניות',
    ecigTicks: ['אף פעם', 'בעבר', 'חלק מהזמן', 'כל יום'],
    alcohol: 'שותה אלכוהול',
    physical: 'פעילות גופנית',
    predict: 'חשב',
    running: 'מריץ...',
    resultTitle: 'תוחלת החיים הצפויה',
    years: 'שנים',
    backToResults: '← חזרה לתוצאות',
  },
  ar: {
    title: 'محاكي متوسط العمر المتوقع',
    sleep: 'ساعات النوم',
    weight: 'الوزن (كجم)',
    smokerStatus: 'حالة التدخين',
    smokerTicks: ['أبدًا', 'سابقًا', 'بعض الأيام', 'كل يوم'],
    eCigaretteUsage: 'استخدام السجائر الإلكترونية',
    ecigTicks: ['أبدًا', 'سابقًا', 'بعض الأيام', 'كل يوم'],
    alcohol: 'يتناول الكحول',
    physical: 'نشاط بدني',
    predict: 'توقع',
    running: 'يتم التشغيل...',
    resultTitle: 'متوسط العمر المتوقع المقدر',
    years: 'سنوات',
    backToResults: '← العودة إلى النتائج',
  },
};
