export enum SmokingStatus {
  Never = 0,
  Former = 1,
  SomeDays = 2,
  EveryDay = 3,
}

export interface FormData {
  sex: 'male' | 'female';
  physicalHealthDays: number;
  mentalHealthDays: number;
  physicalActivities: boolean;
  sleepHours: number;

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

  smokerStatus: SmokingStatus;
  eCigaretteUsage: SmokingStatus;

  bmi: number;
  alcoholDrinkers: boolean;
  fluVaxLast12: boolean;
  pneumoVaxEver: boolean;
  tetanusLast10Tdap: boolean;
  highRiskLastYear: boolean;
}
