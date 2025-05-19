// src/components/Tips.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from '@/context/FormContext';
import { tips, TipCondition } from '@/utils/Tips';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Tips() {
  const { formData } = useFormContext();

  // flatten data
  const flatData: Record<string, unknown> = {
    ...formData.personalInfo,
    ...formData.lifestyle,
    ...formData.medicalHistory,
    ...formData.preventiveCare,
  };

  // state: page & pageSize
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  // gather messages
  const messages: string[] = [];
  Object.entries(tips).forEach(([field, conditions]) => {
    const value = flatData[field];
    (conditions as TipCondition<unknown>[]).forEach((cond) => {
      if (cond.check(value, formData)) messages.push(cond.message);
    });
  });
  useEffect(() => {
    // set initial
    setPageSize(computeSize());

    const handleResize = () => {
      const newSize = computeSize();
      setPageSize(newSize);

      // clamp page
      const maxPage = Math.ceil(messages.length / newSize) - 1;
      setPage((p) => Math.min(p, maxPage));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [messages.length]);

  if (!messages.length) {
    return <p className="text-gray-600 italic text-sm">No specific tips right now—great job!</p>;
  }

  // helper to compute size
  const computeSize = () => (typeof window !== 'undefined' && window.innerWidth < 640 ? 3 : 6);

  const pageCount = Math.ceil(messages.length / pageSize);
  const visible = messages.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {visible.map((msg, i) => (
          <div
            key={i + page * pageSize}
            className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-300 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-xs text-yellow-800 leading-snug">{msg}</p>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 bg-white rounded-full shadow disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-600">
            {page + 1} / {pageCount}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page === pageCount - 1}
            className="p-2 bg-white rounded-full shadow disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
