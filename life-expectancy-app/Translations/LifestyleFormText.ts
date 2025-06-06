import { LanguageType } from '@/app/type';

export const lifestyleFormText: Record<
  LanguageType,
  {
    title: string;
    subtitle: string;
    selectPlaceholder: string;
  }
> = {
  en: {
    title: 'Lifestyle',
    subtitle: 'Tell us about your daily habits and routines.',
    selectPlaceholder: 'Select...',
  },
  he: {
    title: 'אורח חיים',
    subtitle: 'ספר לנו על ההרגלים היומיים שלך',
    selectPlaceholder: 'בחר...',
  },
  ar: {
    title: 'نمط الحياة',
    subtitle: 'أخبرنا عن عاداتك اليومية',
    selectPlaceholder: 'اختر...',
  },
};
