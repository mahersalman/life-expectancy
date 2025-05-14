// src/components/HomePage.tsx
'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLottie } from '@/context/LottieContext';
import Lottie from 'lottie-react';
import CareCompanion from '@/Lottie/CareCompanion.json';

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
    setAnimationKey('welcome'); // kicks off the same welcome animation
  }, [setAnimationKey]);

  return (
    <motion.div
      className="relative flex flex-col items-center space-y-8 px-4 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main welcome Lottie */}
      <div className="w-40 h-40">
        <Lottie animationData={CareCompanion} loop autoplay />
      </div>

      {/* Headline & Intro */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center max-w-lg">
        Welcome to the Life Expectancy Calculator!
      </h2>
      <p className="max-w-md text-gray-600 text-center">
        By answering four quick sections—Personal Info, Lifestyle, Medical History, and Preventive
        Care—our XGBoost model will estimate your personalized life expectancy.
      </p>

      {/* Static preview of the four sections */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {categories.map(({ key, title, emoji }) => (
          <div key={key} className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
            <div className="text-4xl">{emoji}</div>
            <span className="mt-2 text-sm font-medium text-gray-700">{title}</span>
          </div>
        ))}
      </div>

      {/* “Get Started” button with your original gradient style */}
      <motion.button
        onClick={() => navigate('/form')}
        className="mt-4 px-8 py-3 font-semibold rounded-full transition-shadow hover:shadow-lg"
        whileHover={{ scale: 1.05 }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}
