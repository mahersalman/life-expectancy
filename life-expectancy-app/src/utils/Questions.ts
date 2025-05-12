'use client';
import { FormData, SmokingStatus } from '@/app/type';

export type Question =
  | {
      name: keyof FormData;
      label: string;
      type: 'radio';
      options: { label: string; value: string }[];
    }
  | {
      name: keyof FormData;
      label: string;
      type: 'number';
      min?: number;
      max?: number;
    };

export const questions: Question[] = [
  {
    name: 'sex',
    label: 'What is your sex?',
    type: 'radio',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
  },
  {
    name: 'physicalHealthDays',
    label:
      'In the past 30 days, how many days was your physical health not good? (0–30)',
    type: 'number',
    min: 0,
    max: 30,
  },
  {
    name: 'mentalHealthDays',
    label:
      'In the past 30 days, how many days was your mental health not good? (0–30)',
    type: 'number',
    min: 0,
    max: 30,
  },
  {
    name: 'physicalActivities',
    label:
      'Did you participate in any physical activity or exercise in the past month?',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'sleepHours',
    label: 'On average, how many hours of sleep do you get per night? (1–24)',
    type: 'number',
    min: 1,
    max: 24,
  },
  {
    name: 'hadHeartAttack',
    label: 'Have you ever had a heart attack? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'hadAngina',
    label:
      'Have you ever been diagnosed with angina or coronary heart disease? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'hadStroke',
    label: 'Have you ever had a stroke? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'hadAsthma',
    label: 'Have you ever been told you have asthma? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'hadCOPD',
    label: 'Have you ever been diagnosed with COPD or emphysema? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'hadDepressiveDisorder',
    label: 'Have you ever been diagnosed with a depressive disorder?',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'hadKidneyDisease',
    label:
      'Have you ever had kidney disease (excluding stones and infections)? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'hadArthritis',
    label: 'Have you ever been diagnosed with arthritis?',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'hadDiabetes',
    label: 'Have you ever been diagnosed with diabetes? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'deafOrHardOfHearing',
    label: 'Are you deaf or do you have serious difficulty hearing? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'blindOrVisionDifficulty',
    label:
      'Are you blind or do you have serious difficulty seeing even with glasses? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'difficultyConcentrating',
    label:
      'Do you have serious difficulty concentrating, remembering, or making decisions?',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'difficultyWalking',
    label: 'Do you have serious difficulty walking or climbing stairs?',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'difficultyDressingBathing',
    label: 'Do you have difficulty dressing or bathing?',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'difficultyErrands',
    label:
      'Do you have difficulty doing errands alone (e.g., shopping or visiting a doctor)? ',
    type: 'radio',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
  },
  {
    name: 'smokerStatus',
    label: 'What is your smoking status? ',
    type: 'radio',
    options: [
      { label: 'Never', value: `${SmokingStatus.Never}` },
      { label: 'Former', value: `${SmokingStatus.Former}` },
      { label: 'Some days', value: `${SmokingStatus.SomeDays}` },
      { label: 'Every day', value: `${SmokingStatus.EveryDay}` },
    ],
  },
  {
    name: 'eCigaretteUsage',
    label: 'What is your e-cigarette usage status? ',
    type: 'radio',
    options: [
      { label: 'Never', value: `${SmokingStatus.Never}` },
      { label: 'Former', value: `${SmokingStatus.Former}` },
      { label: 'Some days', value: `${SmokingStatus.SomeDays}` },
      { label: 'Every day', value: `${SmokingStatus.EveryDay}` },
    ],
  },
  { name: 'bmi', label: 'What is your BMI? ', type: 'number' },
];
