'use client';

import React from 'react';

/**
 * ToggleWithLabel
 *
 * Renders a labeled toggle (checkbox) input with optional display of the original value.
 *
 * Props:
 * - label: text label displayed next to the checkbox
 * - value: current boolean state of the toggle
 * - originalValue: (optional) previous state, shown as "Original: Yes/No"
 * - onChange: callback invoked with the new boolean state when toggled
 */

interface ToggleWithLabelProps {
  label: string;
  value: boolean;
  originalValue?: boolean;
  onChange: (newValue: boolean) => void;
}

export default function ToggleWithLabel({
  label,
  value,
  originalValue,
  onChange,
}: ToggleWithLabelProps) {
  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow-sm border-l-4 border-teal-400">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="toggle toggle-primary"
        />
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      {originalValue !== undefined && (
        <p className="mt-2 text-xs text-gray-500">Original: {originalValue ? 'Yes' : 'No'}</p>
      )}
    </div>
  );
}
