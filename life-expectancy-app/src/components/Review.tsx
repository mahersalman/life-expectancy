'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Review() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/*<DataTable data={data} />*/}
      <button
        onClick={() => navigate('/result')}
        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-shadow hover:shadow-lg"
      >
        Get Predictions
      </button>
    </div>
  );
}
