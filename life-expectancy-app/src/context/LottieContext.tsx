'use client';
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

// Import all of your Lottie JSONs once
import welcomeAnim from '@/Lottie/DoctorWelcome.json';
import step1Anim from '@/Lottie/DoctorDance.json';

export type AnimationKey = 'welcome' | 'dance';

const animationMap: Record<AnimationKey, object> = {
  welcome: welcomeAnim,
  dance: step1Anim,
};

interface LottieContextValue {
  animationKey: AnimationKey;
  animationData: object;
  setAnimationKey: (key: AnimationKey) => void;
}

const LottieContext = createContext<LottieContextValue | undefined>(undefined);

export function LottieProvider({ children }: { children: ReactNode }) {
  const [animationKey, setAnimationKey] = useState<AnimationKey>('welcome');
  // memoize the data so it only changes when key changes
  const animationData = useMemo(() => animationMap[animationKey], [animationKey]);

  return (
    <LottieContext.Provider value={{ animationKey, animationData, setAnimationKey }}>
      {children}
    </LottieContext.Provider>
  );
}

export function useLottie() {
  const ctx = useContext(LottieContext);
  if (!ctx) {
    throw new Error('useLottie must be used inside a <LottieProvider>');
  }
  return ctx;
}
