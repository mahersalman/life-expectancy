export type LanguageType = 'en' | 'he' | 'ar';
export type Direction = 'ltr' | 'rtl';
export interface LanguageConfig {
  code: LanguageType;
  dir: Direction;
}

export type SmokingStatus = 0 | 1 | 2 | 3;
export type ECigaretteUsage = 0 | 1 | 2 | 3;

export interface PersonalInfo {
  height: number;
  weight: number;
  sex: string;
  bmi: number;
}

export interface Lifestyle {
  smokerStatus: SmokingStatus;
  eCigaretteUsage: ECigaretteUsage;
  physicalActivities: boolean;
  sleepHours: number;
  alcoholDrinkers: boolean;
}

export interface MedicalHistory {
  hadHeartAttack: boolean;
  hadAngina: boolean;
  hadStroke: boolean;
  hadAsthma: boolean;
  hadCOPD: boolean;
  hadDepressiveDisorder: boolean;
  hadKidneyDisease: boolean;
  hadArthritis: boolean;
  hadDiabetes: boolean;
  deafOrHardOfHearing: boolean;
  blindOrVisionDifficulty: boolean;
  difficultyConcentrating: boolean;
  difficultyWalking: boolean;
  difficultyDressingBathing: boolean;
  difficultyErrands: boolean;
}

export interface PreventiveCare {
  fluVaxLast12: boolean;
  pneumoVaxEver: boolean;
  tetanusLast10Tdap: boolean;
  highRiskLastYear: boolean;
}

export interface FormData {
  personalInfo: PersonalInfo;
  lifestyle: Lifestyle;
  medicalHistory: MedicalHistory;
  preventiveCare: PreventiveCare;
}
