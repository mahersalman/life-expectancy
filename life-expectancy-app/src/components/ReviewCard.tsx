'use client';

import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { useLanguage } from '@/context/LanguageContext';
import { reviewCardText } from 'Translations/reviewCardText';
/**
 * ReviewCard
 *
 * Displays a summary of a specific form section from formData.
 *
 * Props:
 * - categoryKey: key of the formData section to render (e.g., 'personalInfo')
 * - title: section title displayed in the header
 * - onEdit: optional callback to trigger editing this section
 * - className: optional additional styling classes
 */
interface Props {
  categoryKey: keyof ReturnType<typeof useFormContext>['formData'];
  title: string;
  onEdit?: () => void;
  className?: string;
}

export default function ReviewCard({ categoryKey, title, onEdit, className = '' }: Props) {
  const { formData } = useFormContext();
  const { language } = useLanguage();

  const section = formData[categoryKey] as unknown as Record<
    string,
    string | number | boolean | null
  >;

  const localizedLabels = reviewCardText[language.code][categoryKey] || {};
  const meta = reviewCardText[language.code].meta;

  return (
    <div
      className={`h-full w-full bg-white rounded-2xl shadow-md p-6 overflow-auto border border-gray-200 ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-indigo-700 uppercase tracking-wide">{title}</h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
          >
            {meta.edit}
          </button>
        )}
      </div>

      {/* Data Fields */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(section).map(([key, val]) => (
          <div
            key={key}
            className="p-4 bg-gray-50 rounded-lg shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition-shadow"
          >
            <dt className="text-sm font-medium text-indigo-600 mb-1">
              {(localizedLabels as Record<string, string>)[key] || key}
            </dt>
            <dd className="text-lg font-semibold text-gray-800">
              {typeof val === 'boolean' ? (val ? meta.yes : meta.no) : String(val ?? '—')}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
