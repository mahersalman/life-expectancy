import {
  PersonalInfo,
  Lifestyle,
  MedicalHistory,
  PreventiveCare,
  FormData,
  SmokingStatus,
  ECigaretteUsage,
} from '@/app/type';

export const initialPersonalInfo: PersonalInfo = {
  age: 0,
  height: 0,
  weight: 0,
  sex: 'Male',
};

export const initialLifestyle: Lifestyle = {
  smokerStatus: 0 as SmokingStatus,
  eCigaretteUsage: 0 as ECigaretteUsage,
  physicalActivities: false,
  sleepHours: 0,
  alcoholDrinkers: false,
};

export const initialMedicalHistory: MedicalHistory = {
  hadHeartAttack: false,
  hadAngina: false,
  hadStroke: false,
  hadAsthma: false,
  hadCOPD: false,
  hadDepressiveDisorder: false,
  hadKidneyDisease: false,
  hadArthritis: false,
  hadDiabetes: false,
  deafOrHardOfHearing: false,
  blindOrVisionDifficulty: false,
  difficultyConcentrating: false,
  difficultyWalking: false,
  difficultyDressingBathing: false,
  difficultyErrands: false,
};

export const initialPreventiveCare: PreventiveCare = {
  fluVaxLast12: false,
  pneumoVaxEver: false,
  tetanusLast10Tdap: false,
  highRiskLastYear: false,
};

export const initialFormData: FormData = {
  personalInfo: initialPersonalInfo,
  lifestyle: initialLifestyle,
  medicalHistory: initialMedicalHistory,
  preventiveCare: initialPreventiveCare,
};
