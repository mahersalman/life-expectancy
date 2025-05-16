'use client';
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

import Vaccinate from '@/Lottie/Vaccinate.json';
import medicalSearch from '@/Lottie/medicalSearch.json';
import healthHabits from '@/Lottie/healthHabits.json';
import doctorWriting from '@/Lottie/doctorWriting.json';
import robotHello from '@/Lottie/robotHello.json';
import Review from '@/Lottie/review.json';
import Protection from '@/Lottie/Protection.json';
export type AnimationKey =
  | 'welcome'
  | 'writing'
  | 'vaccinate'
  | 'search'
  | 'habits'
  | 'review'
  | 'protection';

const animationMap: Record<AnimationKey, object> = {
  welcome: robotHello,
  vaccinate: Vaccinate,
  search: medicalSearch,
  habits: healthHabits,
  writing: doctorWriting,
  review: Review,
  protection: Protection,
};

interface LottieContextValue {
  animationKey: AnimationKey;
  animationData: object;
  setAnimationKey: (key: AnimationKey) => void;
}

const LottieContext = createContext<LottieContextValue | undefined>(undefined);

export function LottieProvider({ children }: { children: ReactNode }) {
  const [animationKey, setAnimationKey] = useState<AnimationKey>('writing');
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
