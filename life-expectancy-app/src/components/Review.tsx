// src/components/Review.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLottie } from '@/context/LottieContext';

import ReviewCard from './ReviewCard';

const steps = [
  { key: 'personalInfo' as const, title: 'Personal Information' },
  { key: 'lifestyle' as const, title: 'Lifestyle Habits' },
  { key: 'medicalHistory' as const, title: 'Medical History' },
  { key: 'preventiveCare' as const, title: 'Preventive Care' },
];

export default function Review() {
  const { setAnimationKey } = useLottie();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(0);

  const prev = () => {
    if (step > 0) {
      setDir(-1);
      setStep((s) => s - 1);
    }
  };
  const next = () => {
    if (step < steps.length - 1) {
      setDir(1);
      setStep((s) => s + 1);
    }
  };

  const handleEdit = () => {
    navigate(`/form?step=${step}`);
  };

  useEffect(() => {
    setAnimationKey('review');
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 w-full px-4 md:px-0">
      {/* slider viewport */}
      <div className="relative w-full max-w-2xl sm:max-w-3xl h-[50vh] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={step}
            initial={{ x: dir > 0 ? 200 : -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir > 0 ? -200 : 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <ReviewCard
              categoryKey={steps[step].key}
              title={steps[step].title}
              onEdit={handleEdit}
            />
          </motion.div>
        </AnimatePresence>

        {/* ← */}
        <button
          onClick={prev}
          disabled={step === 0}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </button>

        {/* → */}
        <button
          onClick={next}
          disabled={step === steps.length - 1}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={24} className="text-gray-600" />
        </button>
      </div>

      {/* step indicator */}
      <div className="text-gray-600">
        {step + 1} / {steps.length}
      </div>

      {/* final action */}
      <button
        onClick={() => navigate('/result')}
        className="w-full max-w-sm py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-shadow hover:shadow-lg"
      >
        Get Predictions
      </button>
    </div>
  );
}
