'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FormData } from '@/app/type';

const sections = [
  {
    title: 'General Info',
    keys: ['sex', 'physicalHealthDays', 'mentalHealthDays', 'sleepHours'],
  },
  { title: 'Medical History', prefix: 'had' },
  { title: 'Daily Functioning', prefix: 'difficulty' },
  {
    title: 'Lifestyle & Risk',
    keys: ['smokerStatus', 'eCigaretteUsage', 'bmi', 'alcoholDrinkers'],
  },
];

export default function DataTable({ data }: { data: FormData }) {
  const [idx, setIdx] = useState(0);
  const sec = sections[idx];
  const entries = Object.entries(data).filter(([k]) =>
    sec.keys
      ? sec.keys.includes(k as keyof FormData)
      : k.startsWith(sec.prefix as string),
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-center text-blue-600">
        {sec.title}
      </h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={sec.title}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {entries.map(([k, v]) => (
            <div key={k} className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <div className="text-sm text-gray-500 capitalize">{k}</div>
              <div className="mt-1 font-medium text-gray-800">
                {typeof v === 'boolean'
                  ? v
                    ? 'Yes'
                    : 'No'
                  : typeof v === 'number'
                    ? v.toLocaleString()
                    : String(v)}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between">
        <button
          onClick={() =>
            setIdx((i) => (i - 1 + sections.length) % sections.length)
          }
          className="font-semibold text-blue-600"
        >
          ← Previous
        </button>
        <span className="text-gray-500">
          {idx + 1}/{sections.length}
        </span>
        <button
          onClick={() => setIdx((i) => (i + 1) % sections.length)}
          className="font-semibold text-blue-600"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
