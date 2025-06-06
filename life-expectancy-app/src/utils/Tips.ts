import { FormData, PersonalInfo, Lifestyle, MedicalHistory, PreventiveCare } from '@/app/type';

/**
 * TipCondition<T>
 *
 * Defines a check function and message for generating health tips.
 * - check: returns true when the tip applies to the given field value
 * - message: advice shown when check passes
 */
export interface TipCondition<T> {
  check: (value: T, allData?: FormData) => boolean;
  message: {
    en: string;
    he: string;
    ar: string;
  };
}

// Gather all possible form field keys across sections
type AllFieldKeys =
  | keyof PersonalInfo
  | keyof Lifestyle
  | keyof MedicalHistory
  | keyof PreventiveCare;

/**
 * tips
 *
 * Maps each field key to an array of TipConditions.
 * At results time, the app evaluates each condition against the user's data
 * and displays any messages whose checks return true.
 */
export const tips: Record<AllFieldKeys, TipCondition<never>[]> = {
  // PersonalInfo
  height: [],
  weight: [],
  bmi: [
    {
      check: (v: number) => v <= 18.5,
      message: {
        en: 'BMI ≤ 18.5: associated with ~4 years reduction in life expectancy.',
        he: 'BMI קטן מ-18.5: ירידה צפויה של כ-4 שנים בתוחלת החיים.',
        ar: 'BMI أقل من أو يساوي 18.5: مرتبط بانخفاض ~4 سنوات في متوسط العمر المتوقع.',
      },
    },
    {
      check: (v: number, allData?: FormData) => v >= 30 && allData?.personalInfo.sex === 'Male',
      message: {
        en: 'BMI ≥ 30: associated with ~4.2 years reduction.',
        he: 'BMI מעל 30: ירידה של כ-4.2 שנים בתוחלת החיים לגברים.',
        ar: 'BMI أكبر من أو يساوي 30: انخفاض ~4.2 سنوات في العمر المتوقع للرجال.',
      },
    },
    {
      check: (v: number, allData?: FormData) => v >= 30 && allData?.personalInfo.sex === 'Female',
      message: {
        en: 'BMI ≥ 30: associated with ~3.5 years reduction.',
        he: 'BMI מעל 30: ירידה של כ-3.5 שנים בתוחלת החיים לנשים.',
        ar: 'BMI أكبر من أو يساوي 30: انخفاض ~3.5 سنوات في العمر المتوقع للنساء.',
      },
    },
  ],
  // Lifestyle
  smokerStatus: [
    {
      check: (v: number) => v === 2,
      message: {
        en: 'Smoke on some days: life expectancy reduction up to ~6.8 years.',
        he: 'עישון חלקי: הפחתה בתוחלת החיים עד כ-6.8 שנים.',
        ar: 'التدخين في بعض الأيام: انخفاض متوقع في العمر حتى ~6.8 سنوات.',
      },
    },
    {
      check: (v: number) => v === 3,
      message: {
        en: 'Smoke every day: life expectancy reduction up to ~8.8 years.',
        he: 'עישון יומיומי: הפחתה בתוחלת החיים עד כ-8.8 שנים.',
        ar: 'التدخين يومياً: انخفاض متوقع في العمر حتى ~8.8 سنوات.',
      },
    },
  ],
  eCigaretteUsage: [
    {
      check: (v: number) => v > 0,
      message: {
        en: 'E-cigarette use: potential respiratory risks under study.',
        he: 'שימוש בסיגריות אלקטרוניות: סיכונים נשימתיים פוטנציאליים הנחקרים כעת.',
        ar: 'استخدام السجائر الإلكترونية: مخاطر تنفسية محتملة قيد الدراسة.',
      },
    },
  ],
  physicalActivities: [
    {
      check: (v: boolean) => v === false,
      message: {
        en: 'No physical activity: missing potential lifespan gain of up to ~6.9 years.',
        he: 'ללא פעילות גופנית: החמצת תוספת פוטנציאלית של עד כ-6.9 שנים בתוחלת החיים.',
        ar: 'عدم ممارسة النشاط البدني: فقدان محتمل لزيادة العمر حتى ~6.9 سنوات.',
      },
    },
  ],
  sleepHours: [
    {
      check: (v: number) => v < 7,
      message: {
        en: 'Sleeping less than 7 hours: associated with ~1–3 years reduction in life expectancy.',
        he: 'שינה של פחות מ-7 שעות: ירידה של כ-1–3 שנים בתוחלת החיים.',
        ar: 'النوم أقل من 7 ساعات: مرتبط بانخفاض ~1–3 سنوات في متوسط العمر المتوقع.',
      },
    },
    {
      check: (v: number) => v >= 9,
      message: {
        en: 'Sleeping more than 9 hours: associated with ~1–3 years reduction in life expectancy.',
        he: 'שינה של יותר מ-9 שעות: ירידה של כ-1–3 שנים בתוחלת החיים.',
        ar: 'النوم أكثر من 9 ساعات: مرتبط بانخفاض ~1–3 سنوات في متوسط العمر المتوقع.',
      },
    },
  ],
  alcoholDrinkers: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'Alcohol consumption: may reduce life expectancy by 6.9 years depending on level.',
        he: 'צריכת אלכוהול: עשויה לקצר את תוחלת החיים בכ-6.9 שנים בהתאם לרמה.',
        ar: 'استهلاك الكحول: قد يقلل متوسط العمر المتوقع حتى ~6.9 سنوات حسب الكمية.',
      },
    },
  ],

  // MedicalHistory
  hadHeartAttack: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'History of heart attack: –12 years.',
        he: 'היסטוריה של התקף לב: קיצור של כ-12 שנים בתוחלת החיים.',
        ar: 'تاريخ الإصابة بنوبة قلبية: نقص ~12 سنة في متوسط العمر المتوقع.',
      },
    },
  ],
  hadAngina: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'Angina/CHD: estimated reduction ~8–10 years.',
        he: 'תעוקת חזה/מחלת לב כלילית: ירידה מוערכת של כ-8–10 שנים.',
        ar: 'الذبحة الصدرية/مرض القلب التاجي: انخفاض متوقع ~8–10 سنوات.',
      },
    },
  ],
  hadStroke: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'History of stroke: –5.5–7.4 years.',
        he: 'היסטוריה של שבץ: קיצור של כ-5.5–7.4 שנים בתוחלת החיים.',
        ar: 'تاريخ الإصابة بسكتة دماغية: نقص ~5.5–7.4 سنوات في العمر.',
      },
    },
  ],
  hadAsthma: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'Asthma: –3.3 years.',
        he: 'אסטמה: קיצור של כ-3.3 שנים בתוחלת החיים.',
        ar: 'الربو: نقص ~3.3 سنوات في متوسط العمر.',
      },
    },
  ],
  hadCOPD: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'COPD/emphysema: –2.2–5.8 years (smoking status dependent).',
        he: 'מחלת ריאות חסימתית כרונית/אמפיזמה: קיצור של כ-2.2–5.8 שנים (בהתאם לעישון).',
        ar: 'الانسداد الرئوي المزمن/النفاخ: نقص ~2.2–5.8 سنوات (حسب التدخين).',
      },
    },
  ],
  hadDepressiveDisorder: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'Depression: –12–21 years.',
        he: 'דיכאון: קיצור של כ-12–21 שנים בתוחלת החיים.',
        ar: 'الاكتئاب: نقص ~12–21 سنوات في متوسط العمر المتوقع.',
      },
    },
  ],
  hadKidneyDisease: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'Kidney disease: –6 years.',
        he: 'מחלת כליות: קיצור של כ-6 שנים בתוחלת החיים.',
        ar: 'مرض الكلى: نقص ~6 سنوات في العمر المتوقع.',
      },
    },
  ],
  hadArthritis: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'Arthritis (RA): –0–10 years depending on severity.',
        he: 'דלקת מפרקים שגרונית: קיצור של 0–10 שנים לפי חומרת המצב.',
        ar: 'التهاب المفاصل الروماتويدي: نقص ~0–10 سنوات حسب شدة الحالة.',
      },
    },
  ],
  hadDiabetes: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'Diabetes (Type 2): –6 years.',
        he: 'סוכרת סוג 2: קיצור של כ-6 שנים בתוחלת החיים.',
        ar: 'داء السكري من النوع الثاني: نقص ~6 سنوات في العمر المتوقع.',
      },
    },
  ],
  deafOrHardOfHearing: [],
  blindOrVisionDifficulty: [],
  difficultyConcentrating: [],
  difficultyWalking: [],
  difficultyDressingBathing: [],
  difficultyErrands: [],

  // PreventiveCare
  fluVaxLast12: [
    {
      check: (v: boolean) => v === false,
      message: {
        en: 'Flu vaccine last 12 months: associated with up to +10 years.',
        he: 'חיסון שפעת ב-12 החודשים האחרונים: עשוי להוסיף עד 10 שנים לתוחלת החיים.',
        ar: 'لقاح الإنفلونزا في آخر 12 شهراً: قد يزيد متوسط العمر حتى 10 سنوات.',
      },
    },
  ],
  pneumoVaxEver: [
    {
      check: (v: boolean) => v === false,
      message: {
        en: 'Pneumococcal vaccine ever: associated with up to +10 years.',
        he: 'חיסון נגד פנאומוקוק: עשוי להוסיף עד 10 שנים לתוחלת החיים.',
        ar: 'لقاح المكورات الرئوية: قد يزيد متوسط العمر حتى 10 سنوات.',
      },
    },
  ],
  tetanusLast10Tdap: [
    {
      check: (v: boolean) => v === false,
      message: {
        en: 'Tdap vaccine past 10 years: protective effect on life expectancy.',
        he: 'חיסון טטנוס/Tdap בעשור האחרון: השפעה מגינה על תוחלת החיים.',
        ar: 'لقاح Tdap خلال السنوات العشر الأخيرة: تأثير وقائي على متوسط العمر.',
      },
    },
  ],
  highRiskLastYear: [
    {
      check: (v: boolean) => v === true,
      message: {
        en: 'High-risk group last year: consider ongoing preventive measures to maintain health.',
        he: 'בקבוצת סיכון בשנה האחרונה: שקול אמצעי מניעה מתמשכים לשמירה על הבריאות.',
        ar: 'مجموعة عالية الخطورة في العام الماضي: ينصح باتخاذ تدابير وقائية مستمرة للحفاظ على الصحة.',
      },
    },
  ],
  sex: [],
};
