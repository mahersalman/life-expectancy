'use client';

import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { tips, TipCondition } from '@/utils/tips';

export default function Tips() {
  const { formData } = useFormContext();

  // flatten all four parts into one object
  const flatData: Record<string, unknown> = {
    ...formData.personalInfo,
    ...formData.lifestyle,
    ...formData.medicalHistory,
    ...formData.preventiveCare,
  };

  // collect matching tip messages
  const messages: string[] = [];
  Object.entries(tips).forEach(([field, conditions]) => {
    const value = flatData[field];
    (conditions as TipCondition<unknown>[]).forEach((cond) => {
      if (cond.check(value, formData)) {
        messages.push(cond.message);
      }
    });
  });

  if (messages.length === 0) {
    return <p className="text-gray-600 italic text-sm">No specific tips right now—great job!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className="
            p-3 bg-yellow-50 rounded-lg
            border-l-4 border-yellow-300
            shadow-sm hover:shadow-md transition-shadow
          "
        >
          <p className="text-xs text-yellow-800 leading-snug">{msg}</p>
        </div>
      ))}
    </div>
  );
}
