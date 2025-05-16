// src/utils/tips.ts

import { FormData, PersonalInfo, Lifestyle, MedicalHistory, PreventiveCare } from '@/app/type';

export interface TipCondition<T> {
  check: (value: T, allData?: FormData) => boolean;
  message: string;
}

// Union of every field in FormData
type AllFieldKeys =
  | keyof PersonalInfo
  | keyof Lifestyle
  | keyof MedicalHistory
  | keyof PreventiveCare;

export const tips: Record<AllFieldKeys, TipCondition<never>[]> = {
  // PersonalInfo (no tips)
  age: [],
  height: [],
  weight: [],

  // Lifestyle
  smokerStatus: [
    {
      check: (v: number) => v === 2,
      message: 'Smoke on some days: life expectancy reduction up to ~6.8 years.',
    },
    {
      check: (v: number) => v === 3,
      message: 'Smoke every day: life expectancy reduction up to ~8.8 years.',
    },
  ],
  eCigaretteUsage: [
    { check: (v: number) => v === 0, message: 'Never used e-cigarettes: minimal risk.' },
    {
      check: (v: number) => v > 0,
      message: 'E-cigarette use: potential respiratory risks under study.',
    },
  ],
  physicalActivities: [
    {
      check: (v: boolean) => v === true,
      message: 'Regular physical activity: adds ~0.4–6.9 years to life expectancy.',
    },
    {
      check: (v: boolean) => v === false,
      message: 'No physical activity: missing potential lifespan gain of up to ~6.9 years.',
    },
  ],
  sleepHours: [
    {
      check: (v: number) => v < 7,
      message:
        'Sleeping less than 7 hours : associated with ~1–3 years reduction in life expectancy.',
    },
    {
      check: (v: number) => v >= 9,
      message:
        'Sleeping less than 9 hours: associated with ~1–3 years reduction in life expectancy.',
    },
  ],
  alcoholDrinkers: [
    {
      check: (v: boolean) => v === true,
      message: 'Alcohol consumption: may reduce life expectancy by 6.9 years depending on level.',
    },
  ],

  // MedicalHistory
  hadHeartAttack: [
    { check: (v: boolean) => v === true, message: 'History of heart attack: –12 years.' },
  ],
  hadAngina: [
    {
      check: (v: boolean) => v === true,
      message: 'Angina/CHD: estimated reduction ~8–10 years.',
    },
  ],
  hadStroke: [
    {
      check: (v: boolean) => v === true,
      message: 'History of stroke: –5.5–7.4 years.',
    },
  ],
  hadAsthma: [{ check: (v: boolean) => v === true, message: 'Asthma: –3.3 years.' }],
  hadCOPD: [
    {
      check: (v: boolean) => v === true,
      message: 'COPD/emphysema: –2.2–5.8 years (smoking status dependent).',
    },
  ],
  hadDepressiveDisorder: [
    {
      check: (v: boolean) => v === true,
      message: 'Depression: –12–21 years.',
    },
  ],
  hadKidneyDisease: [{ check: (v: boolean) => v === true, message: 'Kidney disease: –6 years.' }],
  hadArthritis: [
    {
      check: (v: boolean) => v === true,
      message: 'Arthritis (RA): –0–10 years depending on severity.',
    },
  ],
  hadDiabetes: [{ check: (v: boolean) => v === true, message: 'Diabetes (Type 2): –6 years.' }],
  deafOrHardOfHearing: [],
  blindOrVisionDifficulty: [],
  difficultyConcentrating: [],
  difficultyWalking: [],
  difficultyDressingBathing: [],
  difficultyErrands: [],

  // PreventiveCare
  fluVaxLast12: [
    {
      check: (v: boolean) => v === true,
      message: 'Flu vaccine last 12 months: associated with up to +10 years.',
    },
  ],
  pneumoVaxEver: [
    {
      check: (v: boolean) => v === true,
      message: 'Pneumococcal vaccine ever: associated with up to +10 years.',
    },
  ],
  tetanusLast10Tdap: [
    {
      check: (v: boolean) => v === true,
      message: 'Tdap vaccine past 10 years: protective effect on life expectancy.',
    },
  ],
  highRiskLastYear: [
    {
      check: (v: boolean) => v === true,
      message:
        'High-risk group last year: consider ongoing preventive measures to maintain health.',
    },
  ],
  sex: [],
};
