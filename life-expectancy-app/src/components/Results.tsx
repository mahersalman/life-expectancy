/* src/components/Results.tsx */
'use client';

import React, { useEffect, useState } from 'react';
import type { FormData } from '@/app/type';
import { tips, Tip } from '@/utils/Tips';
interface Props {
  data: FormData;
}

export default function Results({ data }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ xgb: number; saint: number } | null>(null);

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
  const appliedTips: Tip[] = tips.filter((tip) => tip.condition(data));

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/path-to-background.jpg')` }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Life Expectancy Calculator
        </h1>

        {
          /*loading ? (
          <p className="text-center text-gray-700">Loading predictions...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (*/
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Predictions</h2>
              <p className="text-3xl font-bold text-blue-600">
                {/*results!.xgb.toFixed(1)*/} yrs (XGBoost)
              </p>
            </div>

            {appliedTips.length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Tips</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {appliedTips.map(({ id, title, effect, advice }) => (
                    <div
                      key={id}
                      className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
                    >
                      <h4 className="font-semibold text-gray-700">
                        {title} <span className="text-sm text-gray-500">({effect})</span>
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">{advice}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-700 italic">
                Great job! No areas flagged for improvement.
              </p>
            )}
          </>
        }
      </div>
    </div>
  );
}
