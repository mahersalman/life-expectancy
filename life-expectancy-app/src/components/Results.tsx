// src/components/Results.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLottie } from '@/context/LottieContext';
import { useFormContext } from '@/context/FormContext';
import { fetchResult } from '@/utils/fetchResult';
import Tips from './Tips';

export default function Results() {
  const { setAnimationKey } = useLottie();
  const { formData } = useFormContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

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
      .finally(() => setLoading(false));
  }, [formData, setAnimationKey]);

  console.log('formData: ', formData);
  return (
    <div className="flex flex-col items-center p-6 bg-cover bg-center">
      {/* ----- Card with Results & Tips ----- */}
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6">
        {/* Title / Status */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-center">
          {loading
            ? 'Calculating your estimate...'
            : error
              ? 'Oops, something went wrong'
              : 'Your Estimated Life Expectancy'}
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Please wait while we compute your result.</p>
        )}

        {/* Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Success */}
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

      {/* ----- Button Outside the Card ----- */}
      <div className="mt-6">
        <button
          onClick={() => navigate('/simulator')}
          className="
            inline-block px-8 py-3
            bg-gradient-to-r from-blue-500 to-purple-600
            text-white font-semibold
            rounded-full shadow-lg
            hover:shadow-xl transform hover:scale-105
            transition
          "
        >
          Try the Simulator
        </button>
      </div>
    </div>
  );
}
