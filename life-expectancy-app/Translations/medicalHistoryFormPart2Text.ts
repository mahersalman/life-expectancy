import { LanguageType } from '@/app/type';

export const MedicalHistoryFormPart2Text: Record<
  LanguageType,
  {
    step: string;
    title: string;
    subtitle: string;
  }
> = {
  en: {
    step: 'Step 4 of 5',
    title: 'More Medical History',
    subtitle: 'A few more quick questions to complete your profile.',
  },
  he: {
    step: 'שלב 4 מתוך 5',
    title: 'עוד קצת היסטוריה רפואית',
    subtitle: 'רק עוד כמה שאלות קצרות כדי להשלים את הפרופיל שלך.',
  },
  ar: {
    step: 'الخطوة 4 من 5',
    title: 'المزيد من التاريخ الطبي',
    subtitle: 'بعض الأسئلة السريعة الأخرى لإكمال ملفك الشخصي.',
  },
};
