import { FormData, SmokingStatus } from '../app/type';

export const initialFormData: FormData = {
  sex: 'male',
  physicalHealthDays: 0,
  mentalHealthDays: 0,
  physicalActivities: false,
  sleepHours: 8,

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

  smokerStatus: SmokingStatus.Never,
  eCigaretteUsage: SmokingStatus.Never,

  bmi: 0,
  alcoholDrinkers: false,
  fluVaxLast12: false,
  pneumoVaxEver: false,
  tetanusLast10Tdap: false,
  highRiskLastYear: false,
};
