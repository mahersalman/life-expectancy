// src/components/UserForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLottie } from '@/context/LottieContext';

import PersonalInfoForm from './PersonalInfoForm';
import LifestyleForm from './LifestyleForm';
import MedicalHistoryForm from './MedicalHistoryForm';
import PreventiveCareForm from './PreventiveCareForm';

export default function UserForm() {
  const navigate = useNavigate();
  const { setAnimationKey } = useLottie();
  const [step, setStep] = useState(0);
  const total = 4;

  useEffect(() => {
    const keys = ['step1', 'step2', 'step3', 'step4'] as const;
    setAnimationKey(keys[step]);
  }, [step, setAnimationKey]);

  const next = () => (step < total - 1 ? setStep((s) => s + 1) : navigate('/review'));
  const back = () => step > 0 && setStep((s) => s - 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <LifestyleForm />;
      case 2:
        return <MedicalHistoryForm />;
      case 3:
        return <PreventiveCareForm />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="relative flex flex-col" /* removed h-full */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🌟 renderStep itself is sized via its own max-w */}
      <div className="pr-4">{renderStep()}</div>

      {/* Sticky nav at bottom */}
      <div className="mt-6 pt-6 border-t flex justify-between">
        <button
          onClick={back}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={next}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {step < total - 1 ? 'Next' : 'Review'}
        </button>
      </div>
    </motion.div>
  );
}
