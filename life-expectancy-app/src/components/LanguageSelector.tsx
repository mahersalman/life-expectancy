'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { LanguageType } from '@/app/type';
import { languageSelectorText } from 'Translations/languageSelectorText';

const languages: { code: LanguageType; name: string; emoji: string }[] = [
  { code: 'en', name: 'English', emoji: '🇺🇸' },
  { code: 'he', name: 'Hebrew', emoji: '🇮🇱' },
  { code: 'ar', name: 'Arabic', emoji: '🇸🇦' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const text = languageSelectorText[language.code];
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-sm sm:text-base text-gray-700 font-medium">{text.title}</p>
      <div className="flex space-x-4">
        {languages.map(({ code, emoji }) => (
          <motion.button
            key={code}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(code)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg shadow-md transition
              ${
                language.code === code
                  ? 'bg-indigo-500 text-white font-semibold'
                  : 'bg-white text-gray-700 hover:bg-indigo-100'
              }
            `}
          >
            <span className="text-xl">{emoji}</span>
            <span>{text[code]}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export function FloatingLanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const text = languageSelectorText[language.code];
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="fixed bottom-4 left-4 z-50">
      <div className="relative">
        {/* Toggle button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="
            bg-white text-gray-700 shadow-lg
            hover:bg-indigo-50 transition
            px-4 py-2 rounded-lg
            border border-gray-200
            text-sm font-medium flex items-center gap-x-1.5
          "
        >
          <span className="text-xl">🌐</span>
          <span>{text[language.code]}</span>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="
              absolute bottom-full mb-2 left-0
              flex flex-col space-y-2
              bg-white p-2 rounded-lg shadow-lg border border-gray-200
              z-50
            "
          >
            {languages.map(({ code, emoji }) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code);
                  setOpen(false);
                }}
                className={`
                  flex items-center space-x-2 px-3 py-1 rounded-md
                  text-sm transition whitespace-nowrap
                  ${language.code === code ? 'bg-indigo-100 font-semibold' : 'hover:bg-gray-100'}
                `}
              >
                <span>{emoji}</span>
                <span>{text[code]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
