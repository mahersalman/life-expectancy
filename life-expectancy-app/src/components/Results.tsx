// src/components/Results.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLottie } from '@/context/LottieContext';
import { useFormContext } from '@/context/FormContext';
import { fetchResult } from '@/utils/fetchResult';
import DisplayTips from './DisplayTips';
import { initialFormData } from '@/utils/initialData';

export default function Results() {
  const { setAnimationKey } = useLottie();
  const { formData, setFormData } = useFormContext();
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

  const handleStartOver = () => {
    setFormData(initialFormData);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-cover bg-center">
      {/* Results & Tips Card */}
      <div
        className="w-full max-w-md sm:max-w-lg md:max-w-xl
                      bg-white/90 backdrop-blur-md rounded-2xl shadow-lg
                      p-6 sm:p-8 md:p-10 space-y-6"
      >
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 text-center">
          {loading
            ? 'Calculating your estimate...'
            : error
              ? 'Oops, something went wrong'
              : 'Your Estimated Life Expectancy'}
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 text-sm sm:text-base">
            Please wait while we compute your result.
          </p>
        )}

        {/* Error */}
        {error && <p className="text-center text-red-500 text-sm sm:text-base">{error}</p>}

        {/* Success */}
        {!loading && !error && result !== null && (
          <div className="flex items-baseline justify-center space-x-2">
            <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-600">
              {result.toFixed(1)}
            </span>
            <span className="text-base sm:text-lg md:text-xl text-gray-700">years</span>
          </div>
        )}

        {/* Divider + Tips */}
        {!loading && !error && result !== null && (
          <>
            <hr className="border-gray-200" />
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Personalized Health Tips
            </h2>
            <DisplayTips />
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0">
        <button
          onClick={() => navigate('/simulator')}
          className="w-full sm:w-auto px-4 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition"
        >
          Try the Simulator
        </button>
        <button
          onClick={handleStartOver}
          className="w-full sm:w-auto px-4 sm:px-8 py-3 bg-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-full shadow hover:bg-gray-300 transition"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
