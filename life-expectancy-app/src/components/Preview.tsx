'use client';
import React, { useState } from 'react';
import { PreviewProp } from '@/app/type';

export default function Preview({ name, data, onNext, setResults }: PreviewProp) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    const heightM = parseFloat(data.Height) / 100;
    const bmi = parseFloat(data.Weight) / (heightM * heightM);

    const numericInput = [
      bmi,
      parseFloat(data.Alcohol),
      parseFloat(data.Income),
      parseFloat(data.Schooling),
      parseFloat(data.Smoking),
      parseFloat(data.Physical_Activity),
    ];
    console.log('num',numericInput)
    try {
      const response = await fetch("http://127.0.0.1:4001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: numericInput }),
      });

      const result = await response.json();

      if (response.ok) {
        setResults({
          xgb: result.prediction[0],
          saint: result.prediction[1],
        });
        onNext();
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err: any) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-xl w-full mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Almost there, {name}!</h2>
      <p className="text-gray-600 text-center mb-6">Please confirm your details before submitting:</p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border border-gray-200 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3 border border-gray-200 text-left">Field</th>
              <th className="p-3 border border-gray-200 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key} className="text-gray-800 text-sm hover:bg-gray-50 transition">
                <td className="p-3 border border-gray-200 capitalize">{key.replace('_', ' ')}</td>
                <td className="p-3 border border-gray-200">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && (
        <p className="text-red-600 text-sm font-medium mb-4 text-center">{error}</p>
      )}

      {loading && (
        <p className="text-blue-500 text-sm mb-4 text-center">Calculating prediction...</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-3 font-semibold rounded-md transition duration-300 ${
          loading
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {loading ? 'Processing...' : 'Submit Prediction'}
      </button>
    </div>
  );
}