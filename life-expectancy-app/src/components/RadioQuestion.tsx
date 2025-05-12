'use client';

import React from 'react';
import type { FormData } from '@/app/type';

type Option = { label: string; value: string };

interface Props {
  label: string;
  name: keyof FormData;
  value: string;
  options: Option[];
  onChange: (name: keyof FormData, value: string) => void;
}

export default function RadioQuestion({
  label,
  name,
  value,
  options,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-gray-800 text-center">
        {label}
      </h3>
      <div className="flex flex-wrap justify-center gap-6">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={String(name)}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(name, opt.value)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
