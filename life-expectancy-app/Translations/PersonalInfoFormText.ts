// src/translations/PersonalInfoFormText.ts
import { LanguageType } from '@/app/type';

export const PersonalInfoFormText: Record<
  LanguageType,
  {
    title: string;
    subtitle: string;
  }
> = {
  en: {
    title: 'Personal Information',
    subtitle: 'Let’s get to know you—just a few quick details.',
  },
  he: {
    title: 'מידע אישי',
    subtitle: 'כמה פרטים בסיסיים כדי להתחיל',
  },
  ar: {
    title: 'معلومات شخصية',
    subtitle: 'بعض التفاصيل الأساسية لنبدأ',
  },
};
