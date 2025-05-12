'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioQuestion from './RadioQuestion';
import type { FormData } from '@/app/type';
import { questions } from '@/utils/Questions';

interface Props {
  data: FormData;
  setData: (data: FormData) => void;
}

export default function UserForm({ data, setData }: Props) {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const total = questions.length;
  const progress = Math.round(((step + 1) / total) * 100);

  const handleRadioChange = (name: keyof FormData, rawValue: string) => {
    let value: string | boolean | number = rawValue;
    if (rawValue === 'true' || rawValue === 'false')
      value = rawValue === 'true';
    if (['smokerStatus', 'eCigaretteUsage'].includes(name)) value = +rawValue;
    setData({ ...data, [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value ? +value : 0 });
  };

  const next = () =>
    step < total - 1 ? setStep((s) => s + 1) : navigate('/review');

  const q = questions[step];

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-blue-600 transition-width duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-700 text-right">
          Step {step + 1} of {total}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white/70 p-6 rounded-lg">
        {q.type === 'radio' ? (
          <RadioQuestion
            label={q.label}
            name={q.name}
            options={q.options!}
            value={`${data[q.name]}`}
            onChange={handleRadioChange}
          />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">{q.label}</h3>
            <input
              type="number"
              name={String(q.name)}
              min={q.min}
              max={q.max}
              value={data[q.name] as number}
              onChange={handleNumberChange}
              className="w-24 text-center p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-black"
            />
          </div>
        )}
      </div>

      {/* Next / Review Button */}
      <button
        onClick={next}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-transform transform hover:scale-105"
      >
        {step < total - 1 ? 'Next' : 'Review Answers'}
      </button>
    </div>
  );
}
