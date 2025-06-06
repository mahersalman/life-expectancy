import { LanguageType } from '@/app/type';

export const languageSelectorText: Record<LanguageType, Record<string, string>> = {
  en: {
    title: 'Choose the form language:',
    en: 'English',
    he: 'Hebrew',
    ar: 'Arabic',
  },
  he: {
    title: 'בחר את שפת הטופס:',
    en: 'אנגלית',
    he: 'עברית',
    ar: 'ערבית',
  },
  ar: {
    title: 'اختر لغة النموذج:',
    en: 'الإنجليزية',
    he: 'العبرية',
    ar: 'العربية',
  },
};
