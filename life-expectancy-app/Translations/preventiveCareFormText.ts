// src/translations/preventiveCareForm.ts
import { LanguageType } from '@/app/type';

export const PreventiveCareFormText: Record<
  LanguageType,
  {
    step: string;
    title: string;
    subtitle: string;
  }
> = {
  en: {
    step: 'Step 5 of 5',
    title: 'Preventive Care',
    subtitle: 'Let us know about your recent check-ups and screenings.',
  },
  he: {
    step: 'שלב 5 מתוך 5',
    title: 'טיפול מונע',
    subtitle: 'ספר לנו על חיסונים ובדיקות שביצעת לאחרונה.',
  },
  ar: {
    step: 'الخطوة 5 من 5',
    title: 'الرعاية الوقائية',
    subtitle: 'أخبرنا عن الفحوصات واللقاحات التي تلقيتها مؤخرًا.',
  },
};
