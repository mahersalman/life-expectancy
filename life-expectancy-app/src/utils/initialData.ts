import {
  PersonalInfo,
  Lifestyle,
  MedicalHistory,
  PreventiveCare,
  FormData,
  SmokingStatus,
  ECigaretteUsage,
} from '@/app/type';

/**
 * initialPersonalInfo
 *
 * Inputs:
 * - height (cm)
 * - weight (kg)
 * - sex ('Male' | 'Female')
 * - bmi (calculated)
 *
 * Purpose:
 * Default values for the personalInfo section of the form.
 */
export const initialPersonalInfo: PersonalInfo = {
  height: 0,
  weight: 0,
  sex: 'Male',
  bmi: 0,
};

/**
 * initialLifestyle
 *
 * Inputs:
 * - smokerStatus (0–3)
 * - eCigaretteUsage (0–3)
 * - physicalActivities (boolean)
 * - sleepHours (hours per day)
 * - alcoholDrinkers (boolean)
 *
 * Purpose:
 * Default values for the lifestyle section of the form.
 */
export const initialLifestyle: Lifestyle = {
  smokerStatus: 0 as SmokingStatus,
  eCigaretteUsage: 0 as ECigaretteUsage,
  physicalActivities: false,
  sleepHours: 0,
  alcoholDrinkers: false,
};

/**
 * initialMedicalHistory
 *
 * Inputs:
 * - hadHeartAttack, hadAngina, hadStroke, hadAsthma, hadCOPD,
 *   hadDepressiveDisorder, hadKidneyDisease, hadArthritis, hadDiabetes,
 *   deafOrHardOfHearing, blindOrVisionDifficulty,
 *   difficultyConcentrating, difficultyWalking,
 *   difficultyDressingBathing, difficultyErrands (all boolean)
 *
 * Purpose:
 * Default values for the medicalHistory section of the form.
 */
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

/**
 * initialPreventiveCare
 *
 * Inputs:
 * - fluVaxLast12
 * - pneumoVaxEver
 * - tetanusLast10Tdap
 * - highRiskLastYear (all boolean)
 *
 * Purpose:
 * Default values for the preventiveCare section of the form.
 */
export const initialPreventiveCare: PreventiveCare = {
  fluVaxLast12: false,
  pneumoVaxEver: false,
  tetanusLast10Tdap: false,
  highRiskLastYear: false,
};

/**
 * initialFormData
 *
 * Inputs:
 * - personalInfo
 * - lifestyle
 * - medicalHistory
 * - preventiveCare
 *
 * Purpose:
 * Aggregates all initial section values into the complete FormData object.
 */
export const initialFormData: FormData = {
  personalInfo: initialPersonalInfo,
  lifestyle: initialLifestyle,
  medicalHistory: initialMedicalHistory,
  preventiveCare: initialPreventiveCare,
};
