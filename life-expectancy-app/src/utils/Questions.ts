'use client';
import { LanguageType } from '@/app/type';

type TranslatedText = Record<LanguageType, string>;

/**
 * Question type
 *
 * Union defining a form question schema:
 * - number: numeric input with optional min/max
 * - radio: selectable options list
 */
export type Question =
  | {
      name: string;
      label: TranslatedText;
      question: TranslatedText;
      type: 'number';
      min?: number;
      max?: number;
    }
  | {
      name: string;
      label: TranslatedText;
      question: TranslatedText;
      type: 'radio';
      options: { label: TranslatedText; value: string }[];
    };

/**
 * personalInfoQuestions
 *
 * Inputs: sex (radio), height (number), weight (number)
 * Purpose: Collect basic demographic and anthropometric data
 */
export const personalInfoQuestions: Question[] = [
  {
    name: 'sex',
    label: {
      en: 'Sex',
      he: 'מין',
      ar: 'الجنس',
    },
    question: {
      en: 'What is your sex?',
      he: 'מה המין שלך?',
      ar: 'ما هو جنسك؟',
    },
    type: 'radio',
    options: [
      {
        label: { en: 'Male', he: 'זכר', ar: 'ذكر' },
        value: '0',
      },
      {
        label: { en: 'Female', he: 'נקבה', ar: 'أنثى' },
        value: '1',
      },
    ],
  },
  {
    name: 'height',
    label: {
      en: 'Height (cm)',
      he: 'גובה (ס"מ)',
      ar: 'الطول (سم)',
    },
    question: {
      en: 'What is your height? (in cm)',
      he: 'מה הגובה שלך? (בס"מ)',
      ar: 'ما هو طولك؟ (بالسم)',
    },
    type: 'number',
    min: 0,
  },
  {
    name: 'weight',
    label: {
      en: 'Weight (kg)',
      he: 'משקל (ק"ג)',
      ar: 'الوزن (كغ)',
    },
    question: {
      en: 'What is your weight? (in kg)',
      he: 'מה המשקל שלך? (בק"ג)',
      ar: 'ما هو وزنك؟ (بالكغ)',
    },
    type: 'number',
    min: 0,
  },
];

/**
 * lifestyleQuestions
 *
 * Inputs: smokerStatus, eCigaretteUsage, physicalActivities, sleepHours, alcoholDrinkers
 * Purpose: Capture lifestyle habits affecting health
 */
export const lifestyleQuestions: Question[] = [
  {
    name: 'smokerStatus',
    label: {
      en: 'Smoking Status',
      he: 'סטטוס עישון',
      ar: 'حالة التدخين',
    },
    question: {
      en: 'What is your smoking status?',
      he: 'מהו מצב העישון שלך?',
      ar: 'ما هي حالة التدخين الخاصة بك؟',
    },
    type: 'radio',
    options: [
      {
        label: { en: 'Never smoked', he: 'מעולם לא עישנתי', ar: 'لم أدخن قط' },
        value: '0',
      },
      {
        label: { en: 'Former smoker', he: 'מעשן לשעבר', ar: 'مدخن سابق' },
        value: '1',
      },
      {
        label: { en: 'Smoke on some days', he: 'מעשן לעיתים', ar: 'أدخن في بعض الأيام' },
        value: '2',
      },
      {
        label: { en: 'Smoke every day', he: 'מעשן כל יום', ar: 'أدخن كل يوم' },
        value: '3',
      },
    ],
  },
  {
    name: 'eCigaretteUsage',
    label: {
      en: 'E-Cigarette Usage',
      he: 'שימוש בסיגריה אלקטרונית',
      ar: 'استخدام السجائر الإلكترونية',
    },
    question: {
      en: 'What is your e-cigarette usage status?',
      he: 'מהו מצב השימוש שלך בסיגריה אלקטרונית?',
      ar: 'ما هي حالة استخدام السجائر الإلكترونية الخاصة بك؟',
    },
    type: 'radio',
    options: [
      {
        label: { en: 'Never used', he: 'מעולם לא השתמשתי', ar: 'لم أستخدم أبداً' },
        value: '0',
      },
      {
        label: { en: 'Former user', he: 'משתמש לשעבר', ar: 'مستخدم سابق' },
        value: '1',
      },
      {
        label: { en: 'Use on some days', he: 'משתמש לעיתים', ar: 'أستخدمها في بعض الأيام' },
        value: '2',
      },
      {
        label: { en: 'Use every day', he: 'משתמש כל יום', ar: 'أستخدمها كل يوم' },
        value: '3',
      },
    ],
  },
  {
    name: 'physicalActivities',
    label: {
      en: 'Physical Activity',
      he: 'פעילות גופנית',
      ar: 'النشاط البدني',
    },
    question: {
      en: 'Did you do any physical activity or exercise in the past month?',
      he: 'האם ביצעת פעילות גופנית או התעמלות בחודש האחרון?',
      ar: 'هل قمت بأي نشاط بدني أو تمرين خلال الشهر الماضي؟',
    },
    type: 'radio',
    options: [
      {
        label: { en: 'No', he: 'לא', ar: 'لا' },
        value: '0',
      },
      {
        label: { en: 'Yes', he: 'כן', ar: 'نعم' },
        value: '1',
      },
    ],
  },
  {
    name: 'sleepHours',
    label: {
      en: 'Sleep Hours',
      he: 'שעות שינה',
      ar: 'ساعات النوم',
    },
    question: {
      en: 'On average, how many hours of sleep do you get in a 24-hour period?',
      he: 'בממוצע, כמה שעות שינה אתה מקבל ב-24 שעות?',
      ar: 'في المتوسط، كم عدد ساعات النوم التي تحصل عليها خلال 24 ساعة؟',
    },
    type: 'number',
    min: 1,
    max: 24,
  },
  {
    name: 'alcoholDrinkers',
    label: {
      en: 'Alcohol Consumption',
      he: 'צריכת אלכוהול',
      ar: 'استهلاك الكحول',
    },
    question: {
      en: 'Have you had at least one drink of alcohol in the past 30 days?',
      he: 'האם שתית לפחות משקה אלכוהולי אחד ב-30 הימים האחרונים?',
      ar: 'هل تناولت مشروبًا كحوليًا واحدًا على الأقل خلال الثلاثين يومًا الماضية؟',
    },
    type: 'radio',
    options: [
      {
        label: { en: 'No', he: 'לא', ar: 'لا' },
        value: '0',
      },
      {
        label: { en: 'Yes', he: 'כן', ar: 'نعم' },
        value: '1',
      },
    ],
  },
];
/**
 * medicalHistoryQuestions
 *
 * Inputs: hadHeartAttack, hadAngina, hadStroke, hadAsthma, hadCOPD,
 *         hadDepressiveDisorder, hadKidneyDisease, hadArthritis,
 *         hadDiabetes, deafOrHardOfHearing, blindOrVisionDifficulty,
 *         difficultyConcentrating, difficultyWalking,
 *         difficultyDressingBathing, difficultyErrands
 * Purpose: Record past diagnoses and functional limitations
 */
export const medicalHistoryQuestions: Question[] = [
  {
    name: 'hadHeartAttack',
    label: {
      en: 'Heart Attack',
      he: 'התקף לב',
      ar: 'نوبة قلبية',
    },
    question: {
      en: 'Have you ever had a heart attack?',
      he: 'האם אי פעם היה לך התקף לב?',
      ar: 'هل سبق أن أُصبت بنوبة قلبية؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'hadAngina',
    label: {
      en: 'Angina / CHD',
      he: 'תעוקת חזה / מחלת לב כלילית',
      ar: 'الذبحة الصدرية / مرض القلب التاجي',
    },
    question: {
      en: 'Have you ever been diagnosed with angina or coronary heart disease?',
      he: 'האם אובחנת בתעוקת חזה או מחלת לב כלילית?',
      ar: 'هل تم تشخيصك بالذبحة الصدرية أو مرض القلب التاجي؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'hadStroke',
    label: {
      en: 'Stroke',
      he: 'שבץ מוחי',
      ar: 'سكتة دماغية',
    },
    question: {
      en: 'Have you ever had a stroke?',
      he: 'האם אי פעם היה לך שבץ מוחי?',
      ar: 'هل سبق وأن أُصبت بسكتة دماغية؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'hadAsthma',
    label: {
      en: 'Asthma',
      he: 'אסתמה',
      ar: 'الربو',
    },
    question: {
      en: 'Have you ever been told you have asthma?',
      he: 'האם נאמר לך שיש לך אסתמה?',
      ar: 'هل تم إخبارك بأنك مصاب بالربو؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'hadCOPD',
    label: {
      en: 'COPD / Emphysema',
      he: 'COPD / נפחת',
      ar: 'الانسداد الرئوي المزمن / النفاخ',
    },
    question: {
      en: 'Have you ever been diagnosed with COPD or emphysema?',
      he: 'האם אובחנת ב-COPD או נפחת?',
      ar: 'هل تم تشخيصك بمرض الانسداد الرئوي المزمن أو النفاخ؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'hadDepressiveDisorder',
    label: {
      en: 'Depressive Disorder',
      he: 'הפרעת דיכאון',
      ar: 'اضطراب اكتئابي',
    },
    question: {
      en: 'Have you ever been diagnosed with a depressive disorder?',
      he: 'האם אובחנת בהפרעת דיכאון?',
      ar: 'هل تم تشخيصك باضطراب اكتئابي؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'hadKidneyDisease',
    label: {
      en: 'Kidney Disease',
      he: 'מחלת כליות',
      ar: 'مرض الكلى',
    },
    question: {
      en: 'Have you ever had kidney disease (excluding stones and bladder infections)?',
      he: 'האם הייתה לך מחלת כליות (למעט אבנים וזיהומים בשלפוחית)?',
      ar: 'هل سبق وأن أصبت بمرض في الكلى (باستثناء الحصوات والتهابات المثانة)؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'hadArthritis',
    label: {
      en: 'Arthritis',
      he: 'דלקת פרקים',
      ar: 'التهاب المفاصل',
    },
    question: {
      en: 'Have you ever been diagnosed with arthritis?',
      he: 'האם אובחנת בדלקת פרקים?',
      ar: 'هل تم تشخيصك بالتهاب المفاصل؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'hadDiabetes',
    label: {
      en: 'Diabetes',
      he: 'סוכרת',
      ar: 'داء السكري',
    },
    question: {
      en: 'Have you ever been diagnosed with diabetes?',
      he: 'האם אובחנת בסוכרת?',
      ar: 'هل تم تشخيصك بداء السكري؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'deafOrHardOfHearing',
    label: {
      en: 'Hearing Difficulty',
      he: 'קושי בשמיעה',
      ar: 'صعوبة في السمع',
    },
    question: {
      en: 'Are you deaf or do you have serious difficulty hearing?',
      he: 'האם אתה חירש או שיש לך קושי חמור בשמיעה?',
      ar: 'هل أنت أصم أو لديك صعوبة شديدة في السمع؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'blindOrVisionDifficulty',
    label: {
      en: 'Vision Difficulty',
      he: 'קושי בראייה',
      ar: 'صعوبة في الرؤية',
    },
    question: {
      en: 'Are you blind or do you have serious difficulty seeing even with glasses?',
      he: 'האם אתה עיוור או שיש לך קושי חמור בראייה גם עם משקפיים?',
      ar: 'هل أنت أعمى أو لديك صعوبة شديدة في الرؤية حتى مع النظارات؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'difficultyConcentrating',
    label: {
      en: 'Concentration Difficulty',
      he: 'קושי בריכוז',
      ar: 'صعوبة في التركيز',
    },
    question: {
      en: 'Do you have serious difficulty concentrating, remembering, or making decisions?',
      he: 'האם יש לך קושי חמור בריכוז, בזיכרון או בקבלת החלטות?',
      ar: 'هل لديك صعوبة شديدة في التركيز أو التذكر أو اتخاذ القرارات؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'difficultyWalking',
    label: {
      en: 'Mobility Difficulty',
      he: 'קושי בניידות',
      ar: 'صعوبة في الحركة',
    },
    question: {
      en: 'Do you have serious difficulty walking or climbing stairs?',
      he: 'האם יש לך קושי חמור בהליכה או בעלייה במדרגות?',
      ar: 'هل لديك صعوبة شديدة في المشي أو صعود السلالم؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'difficultyDressingBathing',
    label: {
      en: 'Self-Care Difficulty',
      he: 'קושי בטיפול עצמי',
      ar: 'صعوبة في العناية بالنفس',
    },
    question: {
      en: 'Do you have difficulty dressing or bathing yourself?',
      he: 'האם יש לך קושי להתלבש או להתקלח בעצמך?',
      ar: 'هل لديك صعوبة في ارتداء الملابس أو الاستحمام بنفسك؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'difficultyErrands',
    label: {
      en: 'Errands Difficulty',
      he: 'קושי בביצוע סידורים',
      ar: 'صعوبة في أداء المهام',
    },
    question: {
      en: 'Do you have difficulty doing errands alone (e.g., shopping or doctor visits)?',
      he: 'האם יש לך קושי לבצע סידורים לבד (כגון קניות או ביקור אצל רופא)?',
      ar: 'هل لديك صعوبة في القيام بالمهام بمفردك (مثل التسوق أو زيارة الطبيب)؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
];
/**
 * preventiveCareQuestions
 *
 * Inputs: fluVaxLast12, pneumoVaxEver, tetanusLast10Tdap, highRiskLastYear
 * Purpose: Track vaccination and risk-group status for preventive measures
 */
export const preventiveCareQuestions: Question[] = [
  {
    name: 'fluVaxLast12',
    label: {
      en: 'Flu Vaccine',
      he: 'חיסון שפעת',
      ar: 'لقاح الإنفلونزا',
    },
    question: {
      en: 'Have you had a flu vaccine in the past 12 months?',
      he: 'האם קיבלת חיסון נגד שפעת ב-12 החודשים האחרונים?',
      ar: 'هل تلقيت لقاح الإنفلونزا خلال الـ 12 شهرًا الماضية؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'pneumoVaxEver',
    label: {
      en: 'Pneumonia Vaccine',
      he: 'חיסון לדלקת ריאות',
      ar: 'لقاح الالتهاب الرئوي',
    },
    question: {
      en: 'Have you ever had a pneumonia vaccine?',
      he: 'האם אי פעם קיבלת חיסון לדלקת ריאות?',
      ar: 'هل سبق أن تلقيت لقاحًا ضد الالتهاب الرئوي؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'tetanusLast10Tdap',
    label: {
      en: 'Tdap Vaccine',
      he: 'חיסון טטנוס (Tdap)',
      ar: 'لقاح الكزاز (Tdap)',
    },
    question: {
      en: 'Have you had a tetanus (Tdap) vaccine in the past 10 years?',
      he: 'האם קיבלת חיסון טטנוס (Tdap) בעשר השנים האחרונות?',
      ar: 'هل تلقيت لقاح الكزاز (Tdap) خلال السنوات العشر الماضية؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
  {
    name: 'highRiskLastYear',
    label: {
      en: 'High-Risk Status',
      he: 'סטטוס בסיכון גבוה',
      ar: 'حالة عالية الخطورة',
    },
    question: {
      en: 'Were you considered high-risk for COVID-19 or similar diseases last year?',
      he: 'האם נחשבת לאדם בסיכון גבוה ל-COVID-19 או למחלות דומות בשנה שעברה?',
      ar: 'هل كنت تعتبر من الفئة عالية الخطورة للإصابة بـ COVID-19 أو أمراض مماثلة في العام الماضي؟',
    },
    type: 'radio',
    options: [
      { label: { en: 'No', he: 'לא', ar: 'لا' }, value: '0' },
      { label: { en: 'Yes', he: 'כן', ar: 'نعم' }, value: '1' },
    ],
  },
];
