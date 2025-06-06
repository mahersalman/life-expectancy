// src/translations/resultsText.ts

import { LanguageType } from '@/app/type';

export const resultsText: Record<
  LanguageType,
  {
    calculating: string;
    error: string;
    title: string;
    loadingMsg: string;
    errorMsg: string;
    years: string;
    tipsTitle: string;
    trySimulator: string;
    startOver: string;
  }
> = {
  en: {
    calculating: 'Calculating your estimate...',
    error: 'Oops, something went wrong',
    title: 'Your Estimated Life Expectancy',
    loadingMsg: 'Please wait while we compute your result.',
    errorMsg: 'An error occurred while generating your result.',
    years: 'years',
    tipsTitle: 'Personalized Health Tips',
    trySimulator: 'Try the Simulator',
    startOver: 'Start Over',
  },
  he: {
    calculating: 'מחשב את ההערכה שלך...',
    error: 'אופס, משהו השתבש',
    title: 'תוחלת החיים הצפויה שלך',
    loadingMsg: 'אנא המתן בזמן שאנו מחשבים את התוצאה שלך.',
    errorMsg: 'אירעה שגיאה בעת יצירת התוצאה שלך.',
    years: 'שנים',
    tipsTitle: 'טיפים מותאמים אישית לבריאות',
    trySimulator: 'נסה את הסימולטור',
    startOver: 'התחל מחדש',
  },
  ar: {
    calculating: 'جارٍ حساب التقدير...',
    error: 'عذرًا، حدث خطأ ما',
    title: 'متوسط العمر المتوقع المُقدر',
    loadingMsg: 'يرجى الانتظار أثناء حساب النتيجة.',
    errorMsg: 'حدث خطأ أثناء إنشاء النتيجة.',
    years: 'سنوات',
    tipsTitle: 'نصائح صحية مخصصة',
    trySimulator: 'جرّب المحاكي',
    startOver: 'ابدأ من جديد',
  },
};
