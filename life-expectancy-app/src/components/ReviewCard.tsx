// src/components/ReviewCard.tsx
'use client';

import React from 'react';
import { Question } from '@/utils/Questions';
import { useFormContext } from '@/context/FormContext';

interface Props {
  categoryKey: keyof ReturnType<typeof useFormContext>['formData'];
  questions: Question[];
  title: string;
  className?: string;
  onEdit?: () => void;
}

export default function ReviewCard({
  categoryKey,
  questions,
  title,
  className = '',
  onEdit,
}: Props) {
  const { formData } = useFormContext();
  const answers = (formData as any)[categoryKey];

  const formatAnswer = (q: Question) => {
    const raw = answers[q.name];
    if (q.type === 'number') return raw ?? '—';
    if (q.options) {
      const opt = q.options.find((o) => String(o.value) === String(raw));
      return opt?.label ?? '—';
    }
    return raw ? 'Yes' : 'No';
  };

  return (
    <div
      className={`
        h-full w-full
        bg-white rounded-2xl shadow-lg
        p-6 overflow-auto
        border border-gray-200
        ${className}
      `}
    >
      {/* header with Edit */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-indigo-700 uppercase tracking-wide">{title}</h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="
              text-sm font-medium text-indigo-600
              hover:text-indigo-800 transition
            "
          >
            Edit
          </button>
        )}
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {questions.map((q) => (
          <div
            key={q.name}
            className="
              p-5 bg-gray-50 rounded-lg shadow-sm
              border-l-4 border-indigo-500
              hover:shadow-md transition-shadow
            "
          >
            <dt className="text-base font-medium text-indigo-600 mb-1">{q.label}</dt>
            <dd className="text-lg font-semibold text-gray-800">{formatAnswer(q)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
