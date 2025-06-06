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
import { useLanguage } from '@/context/LanguageContext';
import { simulatorText } from 'Translations/simulatorText';
/**
 * Simulator
 *
 * Interactive "what-if" panel that lets users adjust lifestyle and personal parameters
 * to see their impact on the predicted life expectancy.
 *
 * Renders sliders and toggles bound to simData state and calls fetchResult to update prediction.
 */
export default function Simulator() {
  // Access shared form data and navigation hooks
  const { formData } = useFormContext();
  const navigate = useNavigate();
  const { setAnimationKey } = useLottie();
  const { language } = useLanguage();
  const text = simulatorText[language.code];
  // Local state for simulation data, loading/error, and result
  const [simData, setSimData] = useState(formData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  // BMI calculation utility
  const calcBMI = (height: number, weight: number) => {
    if (height <= 0 || weight <= 0) {
      return 0;
    }

    const h = (height / 100) ** 2;
    return weight / h;
  };

  // Set Lottie animation to "plus" on mount
  useEffect(() => {
    setAnimationKey('plus');
  }, [setAnimationKey]);

  // Sync incoming formData to local simData when form updates
  useEffect(() => {
    setSimData(formData);
  }, [formData]);

  /**
   * updatePrediction
   * Calls the backend API with simData and updates the result state
   */
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
          {text.title}
        </motion.h2>

        {/* Sliders */}
        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <SliderWithLabels
              label={text.sleep}
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
              label={text.weight}
              value={simData.personalInfo.weight}
              min={30}
              max={200}
              step={1}
              tickLabels={['30', '50', '70', '90', '110', '130', '150', '170', '190', '200']}
              onChange={(v) =>
                setSimData((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    weight: v,
                    bmi: calcBMI(prev.personalInfo.height, v),
                  },
                }))
              }
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <SliderWithLabels
              label={text.smokerStatus}
              value={simData.lifestyle.smokerStatus}
              min={0}
              max={3}
              tickLabels={text.smokerTicks}
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
              label={text.eCigaretteUsage}
              value={simData.lifestyle.eCigaretteUsage}
              min={0}
              max={3}
              tickLabels={text.ecigTicks}
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
              label={text.alcohol}
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
              label={text.physical}
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
            {loading ? text.running : text.predict}
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
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{text.resultTitle}</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              {result.toFixed(1)}{' '}
              <span className="text-sm sm:text-base text-gray-700">{text.years}</span>
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
          {text.backToResults}
        </button>
      </div>
    </div>
  );
}
