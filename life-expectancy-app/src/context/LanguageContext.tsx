'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LanguageType, LanguageConfig } from '@/app/type';

export const LanguageConfigs: Record<LanguageType, LanguageConfig> = {
  en: { code: 'en', dir: 'ltr' },
  he: { code: 'he', dir: 'rtl' },
  ar: { code: 'ar', dir: 'rtl' },
};

interface LanguageContextType {
  language: LanguageConfig;
  setLanguage: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLangCode] = useState<LanguageConfig>(LanguageConfigs.en); // default English

  const setLanguage = (lang: LanguageType) => {
    setLangCode(LanguageConfigs[lang]);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
