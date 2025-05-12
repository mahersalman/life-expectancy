'use client';

import React, { useEffect, useState } from 'react';
import type { FormData } from '@/app/type';

interface Props {
  data: FormData;
}

export default function Results({ data }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ xgb: number; saint: number } | null>(
    null,
  );

  useEffect(() => {
    const fetchResults = async () => {
      setError(null);
      const numeric = [
        data.sex === 'male' ? 0 : 1,
        data.physicalHealthDays,
        data.mentalHealthDays,
        data.physicalActivities ? 1 : 0,
        data.sleepHours,
        data.hadHeartAttack ? 1 : 0,
        data.hadAngina ? 1 : 0,
        data.hadStroke ? 1 : 0,
        data.hadAsthma ? 1 : 0,
        data.hadCOPD ? 1 : 0,
        data.hadDepressiveDisorder ? 1 : 0,
        data.hadKidneyDisease ? 1 : 0,
        data.hadArthritis ? 1 : 0,
        data.hadDiabetes ? 1 : 0,
        data.deafOrHardOfHearing ? 1 : 0,
        data.blindOrVisionDifficulty ? 1 : 0,
        data.difficultyConcentrating ? 1 : 0,
        data.difficultyWalking ? 1 : 0,
        data.difficultyDressingBathing ? 1 : 0,
        data.difficultyErrands ? 1 : 0,
        data.smokerStatus,
        data.eCigaretteUsage,
        60, // placeholder age
        data.bmi,
        data.alcoholDrinkers ? 1 : 0,
        data.fluVaxLast12 ? 1 : 0,
        data.pneumoVaxEver ? 1 : 0,
        data.tetanusLast10Tdap ? 1 : 0,
        data.highRiskLastYear ? 1 : 0,
      ];

      try {
        const res = await fetch('/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ features: numeric }),
        });
        const json = await res.json();
        if (res.ok)
          setResults({ xgb: json.prediction[0], saint: json.prediction[1] });
        else setError(json.error || 'Error occurred');
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(`Network error: ${e.message}`);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [data]);

  if (loading) return <p className="text-center">Loading predictions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl font-bold text-blue-600">Predictions</h2>
      <p>
        <strong>XGBoost:</strong> {results!.xgb}
      </p>
      <p>
        <strong>SAINT:</strong> {results!.saint}
      </p>
    </div>
  );
}
