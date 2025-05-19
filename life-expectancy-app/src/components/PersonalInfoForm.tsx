// src/components/PersonalInfoForm.tsx
'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { personalInfoQuestions } from '@/utils/Questions';

export default function PersonalInfoForm() {
  const { formData, setFormData } = useFormContext();
  const { personalInfo } = formData;
  const { height, weight } = personalInfo;

  // Recalculate BMI whenever height or weight change
  useEffect(() => {
    if (height > 0 && weight > 0) {
      const rawBmi = weight / Math.pow(height / 100, 2);
      const bmi = parseFloat(rawBmi.toFixed(1));
      if (bmi !== personalInfo.bmi) {
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            bmi,
          },
        }));
      }
    }
  }, [height, weight, personalInfo.bmi, setFormData]);

  const handleChange = (name: string, raw: string, type: 'number' | 'radio') => {
    let value: number | string;
    if (type === 'number') {
      value = Number(raw) || 0;
    } else {
      const q = personalInfoQuestions.find((q) => q.name === 'sex');
      const opt = q?.type === 'radio' && q.options?.find((o) => o.value === raw);
      value = opt && 'label' in opt ? opt.label : '';
    }
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  return (
    <div
      className="
        relative
        bg-white/90 backdrop-blur-md rounded-2xl shadow-lg
        w-full max-w-md sm:max-w-lg lg:max-w-2xl
        mx-auto
        p-6 sm:p-8 md:p-10
      "
    >
      {/* Decorative blob (smaller or hidden on phone) */}
      <div
        className="
          hidden sm:block
          absolute -top-10 -left-10
          w-24 h-24 sm:w-32 sm:h-32
          bg-purple-100 rounded-full opacity-50
        "
        aria-hidden
      />

      {/* Step header */}
      <motion.div
        className="mb-8 text-center px-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
          Step 1 of 4
        </span>
        <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-800">Personal Information</h3>
        <p className="mt-1 text-gray-600 text-sm sm:text-base">
          Let’s get to know you—just a few quick details.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        className="space-y-6 sm:space-y-8 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {personalInfoQuestions.map((q) => {
          const current = personalInfo[q.name as keyof typeof personalInfo];

          // numeric inputs
          if (q.type === 'number') {
            return (
              <div key={q.name} className="flex flex-col items-stretch sm:items-center">
                <label
                  htmlFor={q.name}
                  className="mb-2 text-base sm:text-lg font-medium text-gray-700 text-center"
                >
                  {q.question}
                </label>
                <input
                  id={q.name}
                  name={q.name}
                  type="number"
                  min={q.min}
                  max={q.max}
                  value={current as number}
                  onChange={(e) => handleChange(q.name, e.target.value, 'number')}
                  className="
                    w-full sm:w-72 h-12 sm:h-14
                    text-center text-lg sm:text-2xl p-2 sm:p-3
                    border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-purple-300
                  "
                />
              </div>
            );
          }

          // radio (sex)
          return (
            <fieldset key={q.name} className="flex flex-col items-center px-2">
              <legend className="mb-2 text-base sm:text-lg font-medium text-gray-700 text-center">
                {q.question}
              </legend>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                {q.options.map((opt) => {
                  const isSelected = current === opt.label;
                  return (
                    <label
                      key={opt.value}
                      className={`
                        flex-1
                        px-4 py-2 sm:px-8 sm:py-4
                        text-center text-base sm:text-xl font-semibold
                        rounded-lg cursor-pointer
                        transition
                        ${
                          isSelected
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={q.name}
                        value={opt.value}
                        checked={isSelected}
                        onChange={(e) => handleChange(q.name, e.target.value, 'radio')}
                        className="hidden"
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </motion.form>
    </div>
  );
}
