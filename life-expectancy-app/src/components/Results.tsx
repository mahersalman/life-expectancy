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

import React from 'react';
import { useFormContext } from '@/context/FormContext';

export default function Results() {
  const { formData } = useFormContext();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-8"
      style={{ backgroundImage: `url('/path-to-background.jpg')` }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 w-full max-w-3xl overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Submitted Data</h1>
        <pre className="text-sm font-mono text-gray-900 whitespace-pre-wrap">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
