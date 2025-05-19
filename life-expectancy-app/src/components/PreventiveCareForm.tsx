// src/components/PreventiveCareForm.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { preventiveCareQuestions } from '@/utils/Questions';

export default function PreventiveCareForm() {
  const { formData, setFormData } = useFormContext();
  const { preventiveCare } = formData;

  const handleChange = (name: string, raw: string) => {
    const value = raw === '1';
    setFormData((prev) => ({
      ...prev,
      preventiveCare: { ...prev.preventiveCare, [name]: value },
    }));
  };

  return (
    <div className="relative p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
      {/* Blue accent circle */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50"
        aria-hidden
      />

      {/* Step header */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Step 4 of 4
        </span>
        <h3 className="mt-1 text-2xl font-bold text-gray-800">Preventive Care</h3>
        <p className="mt-2 text-gray-600">
          Let us know about your recent check-ups and screenings.
        </p>
      </motion.div>

      {/* Questions table */}
      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <table className="w-full table-auto border-separate border-spacing-y-4">
          <tbody>
            {preventiveCareQuestions
              .filter((q) => q.type === 'radio')
              .map((q) => {
                const current = preventiveCare[q.name as keyof typeof preventiveCare] as boolean;
                return (
                  <tr key={q.name} className="bg-white rounded-xl shadow-sm">
                    {/* Question */}
                    <td className="p-4 align-top text-gray-800 w-3/4">
                      <span className="font-medium">{q.question}</span>
                    </td>
                    {/* No / Yes pills */}
                    <td className="p-4 align-top w-1/4">
                      <div className="flex justify-center space-x-2">
                        {q.options.map((opt) => {
                          const isSelected = current === (opt.value === '1');
                          return (
                            <label
                              key={opt.value}
                              className={`
                                px-3 py-1.5 rounded-full cursor-pointer text-sm font-medium transition
                                ${
                                  isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
                              `}
                            >
                              <input
                                type="radio"
                                name={q.name}
                                value={opt.value}
                                checked={isSelected}
                                onChange={(e) => handleChange(q.name, e.target.value)}
                                className="hidden"
                              />
                              {opt.label}
                            </label>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
