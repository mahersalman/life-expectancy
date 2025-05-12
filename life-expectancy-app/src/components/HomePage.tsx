import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Welcome to the Life Expectancy Calculator!
      </h2>
      <p className="text-gray-600 text-center">
        This tool helps you estimate your life expectancy based on various
        factors. Click the button below to get started.
      </p>
      <button
        onClick={() => navigate('/form')}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-shadow hover:shadow-lg"
      >
        Start Now
      </button>
    </div>
  );
}
