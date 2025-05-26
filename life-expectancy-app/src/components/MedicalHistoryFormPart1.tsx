'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { medicalHistoryQuestions } from '@/utils/Questions';

/**
 * This component renders the first half of the medical history questions (8 total).
 * It reads and updates form state from context, and animates its header.
 */
export default function MedicalHistoryFormPart1() {
  // Grab the current form data and updater from our context
  const { formData, setFormData } = useFormContext();
  const { medicalHistory } = formData;

  /**
   * handleChange
   * @param name - key of the medicalHistory field
   * @param raw  - string '0' or '1'
   * Updates context state for each question answer
   */
  const handleChange = (name: string, raw: string) => {
    const value = raw === '1';
    setFormData((prev) => ({
      ...prev,
      medicalHistory: { ...prev.medicalHistory, [name]: value },
    }));
  };

  // Filter to only radio-type questions, then take the first 8
  const radios = medicalHistoryQuestions.filter((q) => q.type === 'radio');
  const slice = radios.slice(0, 8);

  return (
    <div className="relative p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
      {/* Animated header with step indicator, title, and subtitle */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Step 3 of 5
        </span>
        <h3 className="mt-1 text-3xl font-bold text-gray-800">Let’s Gather Your Medical History</h3>
        <p className="mt-2 text-gray-600">
          Tell us about any past conditions so we can personalize your results.
        </p>
      </motion.div>

      {/* Questions list: each card shows a question and two radio options */}
      <div className="space-y-4">
        {slice.map((q) => {
          // Determine if this question is currently answered 'Yes' (true) or 'No' (false)
          const current = medicalHistory[q.name as keyof typeof medicalHistory] as boolean;
          return (
            <div
              key={q.name}
              className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center hover:shadow-lg transition-shadow"
            >
              {/* Question text */}
              <div className="text-base text-gray-800 font-medium sm:w-3/4">{q.question}</div>

              {/* Radio options as pill-buttons */}
              <div className="flex space-x-3 mt-3 sm:mt-0 sm:w-1/4 justify-center">
                {q.options.map((opt) => {
                  const isSelected = current === (opt.value === '1');
                  return (
                    <label
                      key={opt.value}
                      className={
                        `px-4 py-2 rounded-full cursor-pointer text-sm font-semibold transition ` +
                        (isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                      }
                    >
                      {/* Hidden native radio input to manage state */}
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
      </div>
    </div>
  );
}
