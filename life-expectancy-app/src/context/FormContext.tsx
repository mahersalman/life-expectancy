'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { initialFormData } from '@/utils/initialData';
import { FormData } from '@/app/type';

export interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const FormContext = createContext<FormContextType>({
  formData: initialFormData,
  setFormData: () => undefined,
});

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);
