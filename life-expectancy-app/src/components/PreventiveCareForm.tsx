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

      {/* Header */}
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

      {/* Questions list */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {preventiveCareQuestions
          .filter((q) => q.type === 'radio')
          .map((q) => {
            const current = preventiveCare[q.name as keyof typeof preventiveCare] as boolean;
            return (
              <div
                key={q.name}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center"
              >
                {/* Question text */}
                <div className="w-full sm:w-3/4">
                  <span className="font-medium text-gray-800">{q.question}</span>
                </div>

                {/* Buttons */}
                <div className="w-full sm:w-1/4 mt-2 sm:mt-0 flex justify-center space-x-2">
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
              </div>
            );
          })}
      </motion.div>
    </div>
  );
}
