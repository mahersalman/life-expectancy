'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { preventiveCareQuestions } from '@/utils/Questions';
import { useLanguage } from '@/context/LanguageContext';
import { PreventiveCareFormText } from 'Translations/preventiveCareFormText';

/**
 * PreventiveCareForm
 *
 * Final step: preventive care questions using radio (boolean) answers.
 */
export default function PreventiveCareForm() {
  const { formData, setFormData } = useFormContext();
  const { preventiveCare } = formData;
  const { language } = useLanguage();

  const handleChange = (name: string, raw: string) => {
    const value = raw === '1';
    setFormData((prev) => ({
      ...prev,
      preventiveCare: { ...prev.preventiveCare, [name]: value },
    }));
  };

  return (
    <div className="relative p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
      {/* Blue accent */}
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
          {PreventiveCareFormText[language.code].step}
        </span>
        <h3 className="mt-1 text-2xl font-bold text-gray-800">
          {PreventiveCareFormText[language.code].title}
        </h3>
        <p className="mt-2 text-gray-600">{PreventiveCareFormText[language.code].subtitle}</p>
      </motion.div>

      {/* Questions */}
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
                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center
                           transition-shadow hover:shadow-lg"
              >
                {/* Question */}
                <div className="w-full sm:w-3/4">
                  <span className="font-medium text-gray-800">{q.question[language.code]}</span>
                </div>

                {/* Answer options */}
                <div className="w-full sm:w-1/4 mt-3 sm:mt-0 flex justify-center space-x-2">
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
                        {opt.label[language.code]}
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
