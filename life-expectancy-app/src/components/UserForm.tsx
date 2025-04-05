'use client';
import React, { useState } from 'react';
import { UserFormProp } from '@/app/type';

export default function UserForm({ name, data, setData, onNext }: UserFormProp) {
  const fields = [
    { name: 'Height', label: 'Height (cm)', placeholder: 'Enter height' },
    { name: 'Weight', label: 'Weight (kg)', placeholder: 'Enter weight' },
    { name: 'Alcohol', label: 'Alcohol Consumption (liters/week)', placeholder: 'e.g. 1.5' },
    { name: 'Income', label: 'Personal Income (USD/year)', placeholder: 'e.g. 20000' },
    { name: 'Schooling', label: 'Schooling (years)', placeholder: 'e.g. 12' },
    { name: 'Smoking', label: 'Smoking (per day)', placeholder: 'e.g. 15.5' },
    { name: 'Physical_Activity', label: 'Physical activity (hours/week)', placeholder: 'e.g. 30.2' },
  ];

  const [step, setStep] = useState(0);
  const progress = ((step + 1) / (fields.length + 1)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === fields.length - 1) {
      onNext(); // done
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-10 max-w-md w-full text-center text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Hi {name}, let's take some details</h1>

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-6 mb-6">
        <div className="bg-blue-500 h-6 rounded-full" style={{ width: `${progress}%` }} />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-700">
          {progress.toFixed(0)}%
        </div>
      </div>

      {/* Dynamic Input Field */}
      <div className="mb-6 text-left">
        <label htmlFor={fields[step].name} className="block text-gray-700 font-medium mb-2">
          {fields[step].label}
        </label>
        <input
          id={fields[step].name}
          name={fields[step].name}
          type="number"
          placeholder={fields[step].placeholder}
          value={data[fields[step].name as keyof typeof data]}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300"
        onClick={handleNext}
      >
        {step === fields.length - 1 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}