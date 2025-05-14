// src/components/MedicalHistoryForm.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '@/context/FormContext';
import { medicalHistoryQuestions } from '@/utils/Questions';

export default function MedicalHistoryForm() {
  const { formData, setFormFormData } = useFormContext();
  const { medicalHistory } = formData;

  // pagination state
  const pageSize = 10;
  const radios = medicalHistoryQuestions.filter((q) => q.type === 'radio');
  const pageCount = Math.ceil(radios.length / pageSize);
  const [page, setPage] = useState(0);

  const handleChange = (name: string, raw: string) => {
    const value = raw === '1';
    setFormFormData((prev) => ({
      ...prev,
      medicalHistory: { ...prev.medicalHistory, [name]: value },
    }));
  };

  const visible = radios.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="relative p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
      {/* Red accent */}
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

      {/* Table window */}
      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <table className="w-full table-auto border-separate border-spacing-y-2">
          <tbody>
            {visible.map((q) => {
              const current = (medicalHistory as any)[q.name] as boolean;
              return (
                <tr key={q.name} className="bg-white rounded-lg shadow-sm">
                  <td className="p-4 align-top text-gray-800 w-3/4">
                    <span className="font-medium">{q.question}</span>
                  </td>
                  <td className="p-4 align-top w-1/4">
                    <div className="flex justify-around">
                      {q.options.map((opt) => {
                        const isSelected = current === (opt.value === '1');
                        return (
                          <label
                            key={opt.value}
                            className={`
                              flex items-center space-x-2 cursor-pointer
                              ${isSelected ? 'text-red-700' : 'text-gray-600 hover:text-red-700'}
                            `}
                          >
                            <input
                              type="radio"
                              name={q.name}
                              value={opt.value}
                              checked={isSelected}
                              onChange={(e) => handleChange(q.name, e.target.value)}
                              className="form-radio h-5 w-5"
                            />
                            <span className="text-sm">{opt.label}</span>
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

      {/* Pager controls */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
        <span className="self-center text-gray-600">
          {page * pageSize + 1}–{Math.min((page + 1) * pageSize, radios.length)} of {radios.length}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          disabled={page === pageCount - 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
      </div>
    </div>
  );
}
