// src/components/LifestyleForm.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { lifestyleQuestions } from '@/utils/Questions';

export default function LifestyleForm() {
  const { formData, setFormData } = useFormContext();
  const { lifestyle } = formData;

  const handleChange = (name: string, raw: string, type: 'number' | 'radio') => {
    let value: any;
    if (type === 'number') {
      value = Number(raw) || 0;
    } else if (name === 'smokerStatus' || name === 'eCigaretteUsage') {
      value = Number(raw);
    } else {
      value = raw === '1';
    }
    setFormData((prev) => ({
      ...prev,
      lifestyle: { ...prev.lifestyle, [name]: value },
    }));
  };

  return (
    <div
      className="
        relative p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg
        w-full max-w-2xl mx-auto
      "
    >
      {/* Green accent */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 bg-green-100 rounded-full opacity-50"
        aria-hidden
      />

      {/* Header */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Step 2 of 4
        </span>
        <h3 className="mt-1 text-2xl font-bold text-gray-800">Lifestyle</h3>
        <p className="mt-2 text-gray-600">Tell us about your daily habits and routines.</p>
      </motion.div>

      {/* Form */}
      <motion.form
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {lifestyleQuestions.map((q) => {
          const current = (lifestyle as any)[q.name];

          // Number fields
          if (q.type === 'number') {
            return (
              <div key={q.name} className="flex flex-col items-center">
                <label htmlFor={q.name} className="mb-2 text-gray-700 font-medium text-center">
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
                    w-48 h-12 text-center text-lg p-2
                    border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-green-300
                  "
                />
              </div>
            );
          }

          // Radio fields
          const isEnumGroup = q.name === 'smokerStatus' || q.name === 'eCigaretteUsage';

          return (
            <fieldset key={q.name} className="flex flex-col items-center">
              <legend className="mb-2 font-medium text-gray-700 text-center">{q.question}</legend>

              <div
                className={
                  isEnumGroup ? 'grid grid-cols-4 gap-4 w-full max-w-xl' : 'grid grid-cols-2 gap-4'
                }
              >
                {q.options.map((opt) => {
                  const selected = isEnumGroup
                    ? current === Number(opt.value)
                    : String(current) === opt.value;

                  return (
                    <label
                      key={opt.value}
                      className={`
                        px-4 py-2 rounded-lg cursor-pointer text-center text-sm font-medium
                        transition
                        ${
                          selected
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={q.name}
                        value={opt.value}
                        checked={selected}
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
