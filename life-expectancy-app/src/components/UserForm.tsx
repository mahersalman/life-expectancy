// src/components/UserForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLottie } from '@/context/LottieContext';

import PersonalInfoForm from './PersonalInfoForm';
import LifestyleForm from './LifestyleForm';
import MedicalHistoryFormPart1 from './MedicalHistoryFormPart1';
import MedicalHistoryFormPart2 from './MedicalHistoryFormPart2';

import PreventiveCareForm from './PreventiveCareForm';
import { userFormText } from 'Translations/userFormText';
import { useLanguage } from '@/context/LanguageContext';
/**
 * UserForm
 *
 * Manages the multi-step questionnaire:
 * - Reads and syncs current step from URL query
 * - Updates Lottie animation based on step
 * - Renders the appropriate form section
 * - Provides Back/Next (or Review) navigation buttons
 */

export default function UserForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAnimationKey } = useLottie();
  const { language } = useLanguage();
  const text = userFormText[language.code];
  const total = 5; // Total number of form steps
  const params = new URLSearchParams(location.search);
  const paramStep = Number(params.get('step'));
  const initialStep = !isNaN(paramStep) && paramStep >= 0 && paramStep < total ? paramStep : 0;

  const [step, setStep] = useState(initialStep);

  // Sync step query param
  useEffect(() => {
    const search = new URLSearchParams(location.search);
    if (search.get('step') !== String(step)) {
      search.set('step', String(step));
      navigate({ pathname: location.pathname, search: search.toString() }, { replace: true });
    }
  }, [step, navigate, location.pathname, location.search]);

  // Swap Lottie animation
  useEffect(() => {
    const keys = ['writing', 'habits', 'search', 'search', 'vaccinate'] as const;
    setAnimationKey(keys[step]);
  }, [step, setAnimationKey]);

  // Move forward or to review page if on last step
  const next = () => (step < total - 1 ? setStep((s) => s + 1) : navigate('/review'));

  // Move backward
  const back = () => {
    if (step == 0) {
      navigate('/');
    } else {
      setStep((s) => s - 1);
    }
  };

  // Render the form component for the current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <LifestyleForm />;
      case 2:
        return <MedicalHistoryFormPart1 />;
      case 3:
        return <MedicalHistoryFormPart2 />;
      case 4:
        return <PreventiveCareForm />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="relative flex flex-col w-full px-4 sm:px-6 md:px-8 lg:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Current step form */}
      <div className="w-full">{renderStep()}</div>

      {/* Navigation buttons */}
      <div className="mt-6 pt-6 border-t">
        <div
          className="flex flex-col-reverse sm:flex-row
                     justify-center sm:justify-between
                     items-center gap-4
                     max-w-md mx-auto px-4"
        >
          {/* Back button */}
          <button
            onClick={back}
            className="
              flex items-center justify-center space-x-2
              w-auto px-5 py-3
              bg-white border-2 border-gray-300
              rounded-full shadow-sm
              hover:bg-gray-100 transition
            "
          >
            <span className="text-gray-700 font-medium">{text.back}</span>
          </button>

          {/* Next / Review button */}
          <button
            onClick={next}
            className="
              flex items-center justify-center space-x-2
              w-auto px-6 py-3
              bg-gradient-to-br from-blue-500 to-indigo-600
              text-white
              rounded-full shadow-lg
              hover:from-blue-600 hover:to-indigo-700
              transition
            "
          >
            <span className="font-medium">{step < total - 1 ? text.next : text.review}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
