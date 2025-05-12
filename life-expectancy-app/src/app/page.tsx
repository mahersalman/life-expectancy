'use client';

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserForm from '@components/UserForm';

import type { FormData } from '@/app/type';
import { initialFormData } from '@/utils/initialFormData';
import Review from '@/components/Review';
import Results from '@/components/Results';
import HomePage from '@/components/HomePage';

export default function Main() {
  const [data, setData] = useState<FormData>(initialFormData);

  return (
    <div className="bg-image min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
          Life Expectancy Calculator
        </h1>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/form"
            element={<UserForm data={data} setData={setData} />}
          />
          <Route path="/review" element={<Review data={data} />} />
          <Route path="/result" element={<Results data={data} />} />
        </Routes>
      </div>
    </div>
  );
}
