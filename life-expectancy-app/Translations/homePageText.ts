import { LanguageType } from '@/app/type';

/*HomePage*/
export const homePageText: Record<LanguageType, Record<string, string>> = {
  en: {
    title: 'Welcome to the Life Expectancy Calculator!',
    description:
      'By answering four quick sections—Personal Info, Lifestyle, Medical History, and Preventive Care—our XGBoost model will estimate your personalized life expectancy.',
    getStarted: 'Get Started',
    section_step1: 'Personal Information',
    section_step2: 'Lifestyle',
    section_step3: 'Medical History',
    section_step4: 'Preventive Care',
  },
  he: {
    title: 'ברוך הבא למחשבון תוחלת החיים!',
    description:
      'על ידי מענה על ארבעה חלקים מהירים—מידע אישי, אורח חיים, היסטוריה רפואית, וטיפול מונע—המודל שלנו יעריך את תוחלת החיים שלך.',
    getStarted: 'התחל',
    section_step1: 'מידע אישי',
    section_step2: 'אורח חיים',
    section_step3: 'היסטוריה רפואית',
    section_step4: 'טיפול מונע',
  },
  ar: {
    title: 'مرحبًا بك في حاسبة متوسط ​​العمر المتوقع!',
    description:
      'من خلال الإجابة على أربعة أقسام سريعة—المعلومات الشخصية، نمط الحياة، التاريخ الطبي، والرعاية الوقائية—سيقدّر نموذجنا متوسط ​​العمر المتوقع الخاص بك.',
    getStarted: 'ابدأ الآن',
    section_step1: 'المعلومات الشخصية',
    section_step2: 'نمط الحياة',
    section_step3: 'التاريخ الطبي',
    section_step4: 'الرعاية الوقائية',
  },
};
