'use client';

import React, { useEffect, useState } from 'react';
import Tips from './Tips';
import { useLottie } from '@/context/LottieContext';
import { fetchResult } from '@/utils/fetchResult';
import { useFormContext } from '@/context/FormContext';

export default function Results() {
  const { setAnimationKey } = useLottie();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const { formData } = useFormContext();

  useEffect(() => {
    setAnimationKey('protection');
    fetchResult(formData)
      .then((value) => {
        setResult(value);
        setError(null);
      })
      .catch((err: Error) => {
        console.error('Prediction error:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formData, setAnimationKey]);

  return (
    <div className="flex items-center justify-center p-6 bg-cover bg-center">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-6">
        {/* Title or status */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-center">
          {loading
            ? 'Calculating your estimate...'
            : error
              ? 'Oops, something went wrong'
              : 'Your Estimated Life Expectancy'}
        </h1>

        {/* Loading state */}
        {loading && (
          <p className="text-center text-gray-500">Please wait while we compute your result.</p>
        )}

        {/* Error state */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Success state */}
        {!loading && !error && result !== null && (
          <div className="text-center">
            <span className="text-5xl md:text-6xl font-extrabold text-green-600">
              {result.toFixed(1)}
            </span>
            <span className="ml-2 text-lg md:text-xl text-gray-700">years</span>
          </div>
        )}

        {/* Divider + Tips */}
        {!loading && !error && result !== null && (
          <>
            <hr className="border-gray-200" />
            <h2 className="text-lg font-semibold text-gray-800">Personalized Health Tips</h2>
            <Tips />
          </>
        )}
      </div>
    </div>
  );
}
