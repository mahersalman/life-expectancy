// src/components/UserForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLottie } from '@/context/LottieContext';

import PersonalInfoForm from './PersonalInfoForm';
import LifestyleForm from './LifestyleForm';
import MedicalHistoryForm from './MedicalHistoryForm';
import PreventiveCareForm from './PreventiveCareForm';

export default function UserForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAnimationKey } = useLottie();

  const total = 4;
  // Parse ?step=N
  const params = new URLSearchParams(location.search);
  const paramStep = Number(params.get('step'));
  const initialStep = !isNaN(paramStep) && paramStep >= 0 && paramStep < total ? paramStep : 0;

  const [step, setStep] = useState(initialStep);

  // Keep URL in sync (optional)
  useEffect(() => {
    const search = new URLSearchParams(location.search);
    if (search.get('step') !== String(step)) {
      search.set('step', String(step));
      navigate({ pathname: location.pathname, search: search.toString() }, { replace: true });
    }
  }, [step, navigate, location.pathname, location.search]);

  // Swap lottie based on step
  useEffect(() => {
    const keys = ['welcome', 'dance', 'welcome', 'dance'] as const;
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
      className="relative flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* current step */}
      <div className="pr-4">{renderStep()}</div>

      {/* nav */}
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
