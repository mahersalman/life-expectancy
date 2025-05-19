'use client';

import React from 'react';

interface SliderWithLabelsProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  originalValue?: number;
  onChange: (newValue: number) => void;
  optionalNote?: string;
  tickLabels?: string[];
}

/**
 * Choose a border color class based on the label.
 * Extend this map as you add more sliders.
 */
const ACCENT_MAP: Record<string, string> = {
  'Sleep Hours': 'border-blue-400',
  BMI: 'border-green-400',
  'Smoker Status': 'border-red-300',
  'E-Cigarette Usage': 'border-yellow-400',
};

export default function SliderWithLabelsV2({
  label,
  value,
  min,
  max,
  step = 1,
  originalValue,
  onChange,
  optionalNote,
  tickLabels,
}: SliderWithLabelsProps) {
  const accentClass = ACCENT_MAP[label] || 'border-purple-400';
  // build ticks: either custom labels or numeric
  const ticks = tickLabels
    ? tickLabels
    : Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => String(min + i * step));

  return (
    <div
      className={`
        p-4 mb-6 bg-white rounded-lg shadow-sm
        border-l-4 ${accentClass}
      `}
    >
      {/* header */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}: <span className="font-semibold">{value}</span>
      </label>

      {/* slider */}
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                   range-thumb-primary range-track-primary focus:outline-none"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />

      {/* tick marks */}
      <div className="relative w-full h-4 mt-3">
        {ticks.map((t, i) => (
          <div
            key={i}
            className="absolute left-0 h-full flex items-start"
            style={{ left: `${(i / (ticks.length - 1)) * 100}%` }}
          >
            <span className="inline-block w-px h-2 bg-gray-400" />
          </div>
        ))}
      </div>

      {/* tick labels */}
      <div className="relative w-full flex justify-between mt-1 text-xs text-gray-600">
        {ticks.map((t, i) => (
          <span
            key={i}
            className="absolute transform -translate-x-1/2"
            style={{ left: `${(i / (ticks.length - 1)) * 100}%` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* original & note */}
      {originalValue !== undefined && (
        <p className="mt-2 text-xs text-gray-500">Original: {originalValue}</p>
      )}
      {optionalNote && <p className="mt-1 text-xs text-gray-500 italic">{optionalNote}</p>}
    </div>
  );
}
