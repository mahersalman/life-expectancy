// useEffect(() => {
//   const fetchResults = async () => {
//     setError(null);
//     const numeric = [
//       data.sex === 'male' ? 0 : 1,
//       data.physicalHealthDays,
//       data.mentalHealthDays,
//       data.physicalActivities ? 1 : 0,
//       data.sleepHours,
//       data.hadHeartAttack ? 1 : 0,
//       data.hadAngina ? 1 : 0,
//       data.hadStroke ? 1 : 0,
//       data.hadAsthma ? 1 : 0,
//       data.hadCOPD ? 1 : 0,
//       data.hadDepressiveDisorder ? 1 : 0,
//       data.hadKidneyDisease ? 1 : 0,
//       data.hadArthritis ? 1 : 0,
//       data.hadDiabetes ? 1 : 0,
//       data.deafOrHardOfHearing ? 1 : 0,
//       data.blindOrVisionDifficulty ? 1 : 0,
//       data.difficultyConcentrating ? 1 : 0,
//       data.difficultyWalking ? 1 : 0,
//       data.difficultyDressingBathing ? 1 : 0,
//       data.difficultyErrands ? 1 : 0,
//       data.smokerStatus,
//       data.eCigaretteUsage,
//       60, // placeholder age
//       data.bmi,
//       data.alcoholDrinkers ? 1 : 0,
//       data.fluVaxLast12 ? 1 : 0,
//       data.pneumoVaxEver ? 1 : 0,
//       data.tetanusLast10Tdap ? 1 : 0,
//       data.highRiskLastYear ? 1 : 0,
//     ];

//     try {
//       const res = await fetch('/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ features: numeric }),
//       });
//       const json = await res.json();
//       if (res.ok) {
//         setResults({ xgb: json.prediction[0], saint: json.prediction[1] });
//       } else {
//         setError(json.error || 'Error occurred');
//       }
//     } catch (e: unknown) {
//       setError(e instanceof Error ? `Network error: ${e.message}` : 'An unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchResults();
// }, [data]);

// filter applicable tips
'use client';

import React, { useEffect } from 'react';
import Tips from './Tips';
import { useLottie } from '@/context/LottieContext';

export default function Results() {
  const { setAnimationKey } = useLottie();

  useEffect(() => {
    setAnimationKey('protection');
  }, []);
  const resultXgboost = 70;

  return (
    <div
      className="
        flex items-center justify-center
        p-6 bg-cover bg-center
      "
    >
      <div
        className="
          w-full max-w-xl
          bg-white/90 backdrop-blur-md rounded-2xl shadow-lg
          p-6 space-y-6
        "
      >
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-center">
          Your Estimated Life Expectancy
        </h1>

        {/* Prediction */}
        <div className="text-center">
          <span className="text-5xl md:text-6xl font-extrabold text-green-600">
            {resultXgboost}
          </span>
          <span className="ml-2 text-lg md:text-xl text-gray-700">years</span>
        </div>

        <hr className="border-gray-200" />

        {/* Tips header */}
        <h2 className="text-lg font-semibold text-gray-800">Personalized Health Tips</h2>

        {/* Tips grid */}
        <Tips />
      </div>
    </div>
  );
}
