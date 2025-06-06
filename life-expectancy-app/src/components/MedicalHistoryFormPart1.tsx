'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { medicalHistoryQuestions } from '@/utils/Questions';
import { useLanguage } from '@/context/LanguageContext';
import { MedicalHistoryFormPart1Text } from 'Translations/medicalHistoryFormPart1Text';

/**
 * MedicalHistoryFormPart1
 *
 * Renders the first half of the medical history questions (8 total).
 */
export default function MedicalHistoryFormPart1() {
  const { formData, setFormData } = useFormContext();
  const { medicalHistory } = formData;
  const { language } = useLanguage();
  const text = MedicalHistoryFormPart1Text[language.code];

  /**
   * handleChange
   * Updates form state based on yes/no (1/0) value
   */
  const handleChange = (name: string, raw: string) => {
    const value = raw === '1';
    setFormData((prev) => ({
      ...prev,
      medicalHistory: { ...prev.medicalHistory, [name]: value },
    }));
  };

  // Get only the first 8 radio-type questions
  const radios = medicalHistoryQuestions.filter((q) => q.type === 'radio').slice(0, 8);

  return (
    <div className="relative p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {text.step}
        </span>
        <h3 className="mt-1 text-3xl font-bold text-gray-800">{text.title}</h3>
        <p className="mt-2 text-gray-600">{text.subtitle}</p>
      </motion.div>

      {/* Question List */}
      <div className="space-y-4">
        {radios.map((q) => {
          const current = medicalHistory[q.name as keyof typeof medicalHistory] as boolean;
          return (
            <div
              key={q.name}
              className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center hover:shadow-lg transition-shadow"
            >
              {/* Question */}
              <div className="text-base text-gray-800 font-medium sm:w-3/4">
                {q.question[language.code]}
              </div>

              {/* Radio Options */}
              <div className="flex space-x-3 mt-3 sm:mt-0 sm:w-1/4 justify-center">
                {q.options.map((opt) => {
                  const isSelected = current === (opt.value === '1');
                  return (
                    <label
                      key={opt.value}
                      className={`px-4 py-2 rounded-full cursor-pointer text-sm font-semibold transition ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.name}
                        value={opt.value}
                        checked={isSelected}
                        onChange={(e) => handleChange(q.name, e.target.value)}
                        className="hidden"
                      />
                      {opt.label[language.code]}
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
