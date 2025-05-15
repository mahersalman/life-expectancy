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
}

export default function ReviewCard({ categoryKey, questions, title, className = '' }: Props) {
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
        h-full w-full bg-white rounded-2xl shadow-lg
        p-6 overflow-auto
        ${className}
      `}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {questions.map((q) => (
          <div key={q.name} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <dt className="text-sm font-medium text-gray-600">{q.label}</dt>
            <dd className="mt-1 text-lg font-semibold text-indigo-700">{formatAnswer(q)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
