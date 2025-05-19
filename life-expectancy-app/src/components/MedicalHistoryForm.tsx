'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { medicalHistoryQuestions } from '@/utils/Questions';

export default function MedicalHistoryForm() {
  const { formData, setFormData } = useFormContext();
  const { medicalHistory } = formData;

  const handleChange = (name: string, raw: string) => {
    const value = raw === '1';
    setFormData((prev) => ({
      ...prev,
      medicalHistory: { ...prev.medicalHistory, [name]: value },
    }));
  };

  // only radio questions
  const radios = medicalHistoryQuestions.filter((q) => q.type === 'radio');

  // refs and state to track scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
      {/* Red accent circle */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full mix-blend-multiply opacity-50"
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
          Step 3 of 4
        </span>
        <h3 className="mt-1 text-2xl font-bold text-gray-800">Medical History</h3>
        <p className="mt-2 text-gray-600">Any diagnoses or conditions we should know about?</p>
      </motion.div>

      {/* Scrollable list with fade overlays */}
      <div className="relative">
        {/* top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/90 to-transparent" />

        <motion.div
          ref={scrollRef}
          className="overflow-y-auto max-h-[40rem] space-y-4 scrollbar-thin scrollbar-thumb-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {radios.map((q) => {
            const current = medicalHistory[q.name as keyof typeof medicalHistory] as boolean;
            return (
              <div
                key={q.name}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center transition-shadow hover:shadow-lg"
              >
                {/* Question */}
                <div className="text-gray-800 font-medium sm:w-3/4">{q.question}</div>

                {/* Toggle pills */}
                <div className="flex space-x-4 mt-3 sm:mt-0 sm:w-1/4 justify-center">
                  {q.options.map((opt) => {
                    const isSelected = current === (opt.value === '1');
                    return (
                      <label
                        key={opt.value}
                        className={`
                          px-4 py-2 rounded-full cursor-pointer text-sm font-semibold transition
                          ${
                            isSelected
                              ? 'bg-red-600 text-white'
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

        {/* bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/90 to-transparent" />
      </div>
    </div>
  );
}
