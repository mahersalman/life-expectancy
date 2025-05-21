'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { initialFormData } from '@/utils/initialData';
import { FormData } from '@/app/type';

/**
 * FormContextType
 *
 * @property formData - current form values of type FormData
 * @property setFormData - state updater for formData
 */
export interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

/**
 * FormContext
 *
 * Provides formData and setFormData across the app.
 * Initialized with default initialFormData and a no-op setter.
 */
export const FormContext = createContext<FormContextType>({
  formData: initialFormData,
  setFormData: () => undefined,
});

/**
 * FormProvider
 *
 * Wraps children in FormContext, managing:
 * - formData state initialized to initialFormData
 * - setFormData function to update formData
 *
 * Usage:
 * <FormProvider>
 *   <App />
 * </FormProvider>
 */
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>;
};

/**
 * useFormContext
 *
 * Custom hook to consume FormContext.
 *
 * Returns:
 * { formData, setFormData }
 */
export const useFormContext = () => useContext(FormContext);
