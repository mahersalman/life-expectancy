'use client';

export type Question =
  | {
      name: string;
      label: string;
      question: string;
      type: 'number';
      min?: number;
      max?: number;
    }
  | {
      name: string;
      label: string;
      question: string;
      type: 'radio';
      options: { label: string; value: string }[];
    };

// 1. Personal Information
export const personalInfoQuestions: Question[] = [
  {
    name: 'sex',
    label: 'Sex',
    question: 'What is your sex?',
    type: 'radio',
    options: [
      { label: 'Male', value: '0' },
      { label: 'Female', value: '1' },
    ],
  },
  {
    name: 'height',
    label: 'Height (cm)',
    question: 'What is your height? (in cm)',
    type: 'number',
    min: 0,
  },
  {
    name: 'weight',
    label: 'Weight (kg)',
    question: 'What is your weight? (in kg)',
    type: 'number',
    min: 0,
  },
];

// 2. Lifestyle
export const lifestyleQuestions: Question[] = [
  {
    name: 'smokerStatus',
    label: 'Smoking Status',
    question: 'What is your smoking status?',
    type: 'radio',
    options: [
      { label: 'Never smoked', value: '0' },
      { label: 'Former smoker', value: '1' },
      { label: 'Smoke on some days', value: '2' },
      { label: 'Smoke every day', value: '3' },
    ],
  },
  {
    name: 'eCigaretteUsage',
    label: 'E-Cigarette Usage',
    question: 'What is your e-cigarette usage status?',
    type: 'radio',
    options: [
      { label: 'Never used', value: '0' },
      { label: 'Former user', value: '1' },
      { label: 'Use on some days', value: '2' },
      { label: 'Use every day', value: '3' },
    ],
  },
  {
    name: 'physicalActivities',
    label: 'Physical Activity',
    question: 'Did you do any physical activity or exercise in the past month?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'sleepHours',
    label: 'Sleep Hours',
    question: 'On average, how many hours of sleep do you get in a 24-hour period?',
    type: 'number',
    min: 1,
    max: 24,
  },
  {
    name: 'alcoholDrinkers',
    label: 'Alcohol Consumption',
    question: 'Have you had at least one drink of alcohol in the past 30 days?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
];

// 3. Medical History
export const medicalHistoryQuestions: Question[] = [
  {
    name: 'hadHeartAttack',
    label: 'Heart Attack',
    question: 'Have you ever had a heart attack?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'hadAngina',
    label: 'Angina / CHD',
    question: 'Have you ever been diagnosed with angina or coronary heart disease?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'hadStroke',
    label: 'Stroke',
    question: 'Have you ever had a stroke?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'hadAsthma',
    label: 'Asthma',
    question: 'Have you ever been told you have asthma?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'hadCOPD',
    label: 'COPD / Emphysema',
    question: 'Have you ever been diagnosed with COPD or emphysema?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'hadDepressiveDisorder',
    label: 'Depressive Disorder',
    question: 'Have you ever been diagnosed with a depressive disorder?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'hadKidneyDisease',
    label: 'Kidney Disease',
    question: 'Have you ever had kidney disease (excluding stones and bladder infections)?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'hadArthritis',
    label: 'Arthritis',
    question: 'Have you ever been diagnosed with arthritis?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'hadDiabetes',
    label: 'Diabetes',
    question: 'Have you ever been diagnosed with diabetes?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'deafOrHardOfHearing',
    label: 'Hearing Difficulty',
    question: 'Are you deaf or do you have serious difficulty hearing?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'blindOrVisionDifficulty',
    label: 'Vision Difficulty',
    question: 'Are you blind or do you have serious difficulty seeing even with glasses?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'difficultyConcentrating',
    label: 'Concentration Difficulty',
    question: 'Do you have serious difficulty concentrating, remembering, or making decisions?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'difficultyWalking',
    label: 'Mobility Difficulty',
    question: 'Do you have serious difficulty walking or climbing stairs?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'difficultyDressingBathing',
    label: 'Self-Care Difficulty',
    question: 'Do you have difficulty dressing or bathing yourself?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'difficultyErrands',
    label: 'Errands Difficulty',
    question: 'Do you have difficulty doing errands alone (e.g., shopping or doctor visits)?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
];

// 4. Preventive Care
export const preventiveCareQuestions: Question[] = [
  {
    name: 'fluVaxLast12',
    label: 'Flu Vaccine',
    question: 'Have you had a flu vaccine in the past 12 months?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'pneumoVaxEver',
    label: 'Pneumonia Vaccine',
    question: 'Have you ever had a pneumonia vaccine?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'tetanusLast10Tdap',
    label: 'Tdap Vaccine',
    question: 'Have you had a tetanus (Tdap) vaccine in the past 10 years?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'highRiskLastYear',
    label: 'High-Risk Status',
    question: 'Were you considered high-risk for COVID-19 or similar diseases last year?',
    type: 'radio',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
];
