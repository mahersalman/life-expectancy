'use client';
import React, { useState } from 'react';

interface ResultProps {
  Height: string;
  Weight: string;
  Alcohol: string;
  Income: string;
  Schooling: string;
  Smoking: string;
  Physical_Activity: string;
}

export default function Preview({ data }: { data: ResultProps }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    xgb: '',
    saint: '',
  });
  const [loadResult, setLoadResult] = useState(false);

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

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: numericInput }),
      });

      const result = await response.json();

      if (response.ok) {
        setResult({
          xgb: result.prediction[0],
          saint: result.prediction[1],
        });
        setLoadResult(true);
        console.log('Prediction:', result);
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
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Review Your Details</h2>

      <table className="w-full text-left border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Field</th>
            <th className="border border-gray-300 p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td className="border border-gray-300 p-2 font-medium capitalize">{key.replace('_', ' ')}</td>
              <td className="border border-gray-300 p-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && (
        <p className="text-red-600 text-sm font-medium mb-2 text-center">{error}</p>
      )}

      {loading && (
        <p className="text-gray-500 text-sm mb-2 text-center">Calculating prediction...</p>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit"}
      </button>

      {loadResult && (
        <div className="mt-6 p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Your Life Expectancy Prediction</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow border">
              <h4 className="text-blue-600 font-semibold text-lg mb-2">XGBoost Model</h4>
              <p className="text-2xl font-bold text-gray-800">{Number(result.xgb).toFixed(1)} <span className="text-sm text-gray-500">years</span></p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow border">
              <h4 className="text-purple-600 font-semibold text-lg mb-2">SAINT Model</h4>
              <p className="text-2xl font-bold text-gray-800">{Number(result.saint).toFixed(1)} <span className="text-sm text-gray-500">years</span></p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow border">
              <h4 className="text-green-600 font-semibold text-lg mb-2">Final Prediction</h4>
              <p className="text-2xl font-bold text-gray-800">
                {((Number(result.xgb) + Number(result.saint)) / 2).toFixed(1)}
                <span className="text-sm text-gray-500"> years (avg)</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
