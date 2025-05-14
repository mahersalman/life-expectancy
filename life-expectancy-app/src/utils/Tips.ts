/* src/app/tips.ts */
import { FormData, SmokingStatus } from '@/app/type';

export interface Tip {
  /** unique key for rendering */
  id: string;
  /** title to display */
  title: string;
  /** short description of the life‑expectancy effect */
  effect: string;
  /** show this tip if it returns true */
  condition: (data: FormData) => boolean;
  /** actionable advice for the user */
  advice: string;
}

export const tips: Tip[] = [
  {
    id: 'smoking',
    title: 'Smoking',
    effect: '–6.8 to –8.8 years',
    condition: (data) => data.smokerStatus !== SmokingStatus.Never,
    advice: 'Quitting smoking can add up to 8.8 years to your lifespan.',
  },
  {
    id: 'physical-activity',
    title: 'Physical Activity',
    effect: '+0.4 to +6.9 years',
    condition: (data) => data.physicalActivities === false,
    advice: 'Try to get at least 150 minutes of moderate exercise per week.',
  },
  {
    id: 'sleep',
    title: 'Sleep',
    effect: '–1 to –3 years',
    condition: (data) => data.sleepHours < 7 || data.sleepHours >= 9,
    advice: 'Aim for 7–8 hours of quality sleep each night.',
  },
  {
    id: 'heart-attack',
    title: 'History of Heart Attack',
    effect: '–12 years',
    condition: (data) => data.hadHeartAttack === true,
    advice: 'Follow a heart‑healthy lifestyle and your doctor’s recommendations.',
  },
  {
    id: 'stroke',
    title: 'History of Stroke',
    effect: '–5.5 to –7.4 years',
    condition: (data) => data.hadStroke === true,
    advice: 'Control your blood pressure and cholesterol to lower stroke risk.',
  },
  {
    id: 'diabetes',
    title: 'Type 2 Diabetes',
    effect: '–6 years',
    condition: (data) => data.hadDiabetes === true,
    advice: 'Manage blood sugar with diet, exercise, and medication as needed.',
  },
  {
    id: 'copd',
    title: 'COPD',
    effect: '–0.7 to –5.8 years',
    condition: (data) => data.hadCOPD === true,
    advice: 'Avoid smoking and air pollutants; adhere to your treatment plan.',
  },
  {
    id: 'asthma',
    title: 'Asthma',
    effect: '–3.3 years',
    condition: (data) => data.hadAsthma === true,
    advice: 'Maintain good asthma control and avoid known triggers.',
  },
  {
    id: 'depression',
    title: 'Depressive Disorder',
    effect: '–12 to –21 years',
    condition: (data) => data.hadDepressiveDisorder === true,
    advice: 'Seek support from mental health professionals to improve wellbeing.',
  },
  {
    id: 'kidney-disease',
    title: 'Kidney Disease',
    effect: '–6 years',
    condition: (data) => data.hadKidneyDisease === true,
    advice: 'Manage blood pressure and blood sugar to protect kidney health.',
  },
  {
    id: 'arthritis',
    title: 'Arthritis',
    effect: '–0 to –10 years',
    condition: (data) => data.hadArthritis === true,
    advice: 'Keep joints mobile with low‑impact exercise and proper treatment.',
  },
  {
    id: 'disabilities',
    title: 'Disabilities',
    effect: '–0 to –10 years',
    condition: (data) =>
      [
        data.deafOrHardOfHearing,
        data.blindOrVisionDifficulty,
        data.difficultyConcentrating,
        data.difficultyWalking,
        data.difficultyDressingBathing,
        data.difficultyErrands,
      ].some((flag) => flag === true),
    advice: 'Consider assistive devices and therapies to enhance independence.',
  },
  {
    id: 'bmi',
    title: 'Obesity (BMI ≥ 30)',
    effect: 'Men: –4.2 yrs; Women: –3.5 yrs',
    condition: (data) => data.bmi >= 30,
    advice: 'Maintain a healthy BMI (18.5–24.9) through balanced diet and exercise.',
  },
];
