'use client';
import React from 'react';
import { ResultsProps } from '@/app/type';

export default function ResultsPage({ name, results }: ResultsProps) {
  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">Well done, {name}!</h2>
      <p className="text-md text-gray-700 mb-6">
        Based on your input, here’s your predicted life expectancy:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow border">
          <h4 className="text-blue-600 font-semibold text-lg mb-2">XGBoost Model</h4>
          <p className="text-2xl font-bold text-gray-800">
            {Number(results.xgb).toFixed(1)} <span className="text-sm text-gray-500">years</span>
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border">
          <h4 className="text-purple-600 font-semibold text-lg mb-2">SAINT Model</h4>
          <p className="text-2xl font-bold text-gray-800">
            {Number(results.saint).toFixed(1)} <span className="text-sm text-gray-500">years</span>
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border">
          <h4 className="text-green-600 font-semibold text-lg mb-2">Final Prediction</h4>
          <p className="text-2xl font-bold text-gray-800">
            {((Number(results.xgb) + Number(results.saint)) / 2).toFixed(1)}
            <span className="text-sm text-gray-500"> years (avg)</span>
          </p>
        </div>
      </div>

      {/* 🔁 Restart Button */}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
      >
        Start Over
      </button>
    </div>
  );
}