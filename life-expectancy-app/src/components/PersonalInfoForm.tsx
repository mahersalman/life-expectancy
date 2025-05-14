// src/components/PersonalInfoForm.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { personalInfoQuestions } from '@/utils/Questions';

export default function PersonalInfoForm() {
  const { formData, setFormData } = useFormContext();
  const { personalInfo } = formData;

  const handleChange = (name: string, raw: string, type: 'number' | 'radio') => {
    const value = type === 'number' ? Number(raw) || 0 : raw === '1';
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  return (
    <div
      className="
        relative p-12
        bg-white/90 backdrop-blur-md rounded-2xl shadow-lg
        w-full max-w-3xl mx-auto
      "
    >
      {/* Decorative blob */}
      <div
        className="absolute -top-12 -left-12 w-40 h-40 bg-purple-100 rounded-full opacity-50"
        aria-hidden
      />

      {/* Step header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center"
      >
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Step 1 of 4
        </span>
        <h3 className="mt-2 text-3xl font-bold text-gray-800">Personal Information</h3>
        <p className="mt-3 text-gray-600">Let’s get to know you—just a few quick details.</p>
      </motion.div>

      {/* Form */}
      <motion.form
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {personalInfoQuestions.map((q) => {
          const current = personalInfo[q.name as keyof typeof personalInfo];

          // Number inputs
          if (q.type === 'number') {
            return (
              <div key={q.name} className="flex flex-col items-center">
                <label
                  htmlFor={q.name}
                  className="mb-3 text-lg font-medium text-gray-700 text-center"
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
                    w-72 h-14 text-center text-2xl p-3
                    border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm
                  "
                />
              </div>
            );
          }

          // Radio buttons (sex)
          return (
            <fieldset key={q.name} className="flex flex-col items-center">
              <legend className="mb-3 font-medium text-gray-700 text-center">{q.question}</legend>
              <div className="flex gap-8">
                {q.options.map((opt) => {
                  const isSelected = Boolean(current) === (opt.value === '1');
                  return (
                    <label
                      key={opt.value}
                      className={`
                        px-10 py-4 rounded-lg cursor-pointer text-center text-xl font-semibold
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
