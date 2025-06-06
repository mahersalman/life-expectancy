// src/translations/userFormText.ts

import { LanguageType } from '@/app/type';

export const userFormText: Record<
  LanguageType,
  {
    back: string;
    next: string;
    review: string;
  }
> = {
  en: {
    back: 'Back',
    next: 'Next',
    review: 'Review',
  },
  he: {
    back: 'חזור',
    next: 'הבא',
    review: 'סקירה',
  },
  ar: {
    back: 'رجوع',
    next: 'التالي',
    review: 'مراجعة',
  },
};
