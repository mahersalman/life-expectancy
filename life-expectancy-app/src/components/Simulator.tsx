// src/components/Simulator.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SliderWithLabels from './SliderWithLabelsV2';
import ToggleWithLabel from './ToggleWithLabel';
import { useFormContext } from '@/context/FormContext';
import { fetchResult } from '@/utils/fetchResult';
import { SmokingStatus, ECigaretteUsage } from '@/app/type';
import { useLottie } from '@/context/LottieContext';

export default function Simulator() {
  const { formData } = useFormContext();
  const navigate = useNavigate();
  const { setAnimationKey } = useLottie();

  const [simData, setSimData] = useState(formData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    setAnimationKey('plus');
  }, [setAnimationKey]);

  useEffect(() => {
    setSimData(formData);
  }, [formData]);

  const updatePrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetchResult(simData);
      setResult(r);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          relative w-full max-w-md sm:max-w-lg
          bg-white bg-opacity-90 backdrop-blur-xl
          rounded-2xl shadow-2xl p-6 sm:p-8
          flex flex-col space-y-6
        "
      >
        {/* Header */}
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="
            text-2xl sm:text-3xl font-bold text-center
            bg-gradient-to-r from-blue-500 to-purple-600
            bg-clip-text text-transparent
          "
        >
          Life Expectancy Simulator
        </motion.h2>

        {/* Sliders */}
        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <SliderWithLabels
              label="Sleep Hours"
              value={simData.lifestyle.sleepHours}
              min={1}
              max={14}
              onChange={(v) =>
                setSimData((prev) => ({
                  ...prev,
                  lifestyle: { ...prev.lifestyle, sleepHours: v },
                }))
              }
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <SliderWithLabels
              label="Weight (kg)"
              value={simData.personalInfo.weight}
              min={30}
              max={200}
              step={1}
              tickLabels={['30', '50', '70', '90', '110', '130', '150', '170', '190', '200']}
              onChange={(v) =>
                setSimData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, weight: v },
                }))
              }
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <SliderWithLabels
              label="Smoker Status"
              value={simData.lifestyle.smokerStatus}
              min={0}
              max={3}
              tickLabels={['Never', 'Former', 'Some days', 'Every day']}
              onChange={(v) =>
                setSimData((prev) => ({
                  ...prev,
                  lifestyle: { ...prev.lifestyle, smokerStatus: v as SmokingStatus },
                }))
              }
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <SliderWithLabels
              label="E-Cigarette Usage"
              value={simData.lifestyle.eCigaretteUsage}
              min={0}
              max={3}
              tickLabels={['Never', 'Former', 'Some days', 'Every day']}
              onChange={(v) =>
                setSimData((prev) => ({
                  ...prev,
                  lifestyle: { ...prev.lifestyle, eCigaretteUsage: v as ECigaretteUsage },
                }))
              }
            />
          </motion.div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div whileTap={{ scale: 0.95 }}>
            <ToggleWithLabel
              label="Alcohol Drinker"
              value={simData.lifestyle.alcoholDrinkers}
              onChange={(v) =>
                setSimData((prev) => ({
                  ...prev,
                  lifestyle: { ...prev.lifestyle, alcoholDrinkers: v },
                }))
              }
            />
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <ToggleWithLabel
              label="Physical Activities"
              value={simData.lifestyle.physicalActivities}
              onChange={(v) =>
                setSimData((prev) => ({
                  ...prev,
                  lifestyle: { ...prev.lifestyle, physicalActivities: v },
                }))
              }
            />
          </motion.div>
        </div>

        {/* Predict button */}
        <div className="text-center">
          <motion.button
            onClick={updatePrediction}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            className="
              inline-block px-6 sm:px-8 py-2 sm:py-3
              bg-gradient-to-r from-green-500 to-teal-500
              text-white font-semibold
              rounded-full shadow-lg
              hover:shadow-2xl transition
              disabled:opacity-50
            "
          >
            {loading ? 'Running…' : 'Predict'}
          </motion.button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}

        {/* Result */}
        {result !== null && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-4 space-y-2"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Estimated Life Expectancy
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              {result.toFixed(1)} <span className="text-sm sm:text-base text-gray-700">years</span>
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Back link */}
      <div className="mt-6">
        <button
          onClick={() => navigate('/result')}
          className="text-sm sm:text-base text-gray-600 hover:text-gray-800 underline transition"
        >
          ← Back to Results
        </button>
      </div>
    </div>
  );
}
