'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLottie } from '@/context/LottieContext';
import Lottie from 'lottie-react';
import CareCompanion from '@/Lottie/CareCompanion.json';

/**
 * HomePage
 *
 * Landing screen for the Life Expectancy Calculator:
 * - Sets Lottie to 'welcome' animation on mount
 * - Displays a Lottie animation and introduction text
 * - Shows four category cards for each form section
 * - 'Get Started' button navigates to the form
 */
const categories = [
  { key: 'step1', title: 'Personal Information', emoji: '👤' },
  { key: 'step2', title: 'Lifestyle', emoji: '🏃' },
  { key: 'step3', title: 'Medical History', emoji: '🩺' },
  { key: 'step4', title: 'Preventive Care', emoji: '🛡️' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { setAnimationKey } = useLottie();

  useEffect(() => {
    setAnimationKey('welcome');
  }, [setAnimationKey]);

  return (
    <motion.div
      className="relative flex flex-col items-center space-y-8 px-4 sm:px-6 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Responsive Lottie */}
      <div className="w-32 sm:w-40 md:w-48">
        <Lottie animationData={CareCompanion} loop autoplay />
      </div>

      {/* Responsive headline */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center max-w-lg">
        Welcome to the Life Expectancy Calculator!
      </h2>
      <p className="max-w-md text-gray-600 text-center">
        By answering four quick sections—Personal Info, Lifestyle, Medical History, and Preventive
        Care—our XGBoost model will estimate your personalized life expectancy.
      </p>

      {/* Always two columns */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md sm:max-w-lg">
        {categories.map(({ key, title, emoji }) => (
          <div key={key} className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
            <div className="text-4xl">{emoji}</div>
            <span className="mt-2 text-sm font-medium text-gray-700">{title}</span>
          </div>
        ))}
      </div>

      {/* Gradient “Get Started” button */}
      <motion.button
        onClick={() => navigate('/form')}
        whileHover={{ scale: 1.05 }}
        className="
          mt-4 px-6 sm:px-8 py-3 text-sm sm:text-base
          font-semibold rounded-full
          bg-gradient-to-br from-indigo-500 to-purple-600
          text-white transition-shadow hover:shadow-lg
        "
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}
