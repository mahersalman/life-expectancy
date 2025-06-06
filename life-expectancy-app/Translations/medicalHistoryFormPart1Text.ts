import { LanguageType } from '@/app/type';

export const MedicalHistoryFormPart1Text: Record<
  LanguageType,
  {
    title: string;
    subtitle: string;
    step: string;
  }
> = {
  en: {
    step: 'Step 3 of 5',
    title: 'Let’s Gather Your Medical History',
    subtitle: 'Tell us about any past conditions so we can personalize your results.',
  },
  he: {
    step: 'שלב 3 מתוך 5',
    title: 'בוא נאסוף את ההיסטוריה הרפואית שלך',
    subtitle: 'ספר לנו על מחלות שהיו לך בעבר כדי להתאים את התוצאה אישית.',
  },
  ar: {
    step: 'الخطوة 3 من 5',
    title: 'دعنا نجمع تاريخك الطبي',
    subtitle: 'أخبرنا بأي أمراض سابقة لديك لنخصص نتائجك.',
  },
};
