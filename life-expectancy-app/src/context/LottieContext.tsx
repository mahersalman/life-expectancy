'use client';
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

import Vaccinate from '@/Lottie/Vaccinate.json';
import medicalSearch from '@/Lottie/medicalSearch.json';
import healthHabits from '@/Lottie/healthHabits.json';
import doctorWriting from '@/Lottie/doctorWriting.json';
import robotHello from '@/Lottie/robotHello.json';
import Review from '@/Lottie/review.json';
import Protection from '@/Lottie/Protection.json';
import Plus from '@/Lottie/plus.json';
export type AnimationKey =
  | 'welcome'
  | 'writing'
  | 'vaccinate'
  | 'search'
  | 'habits'
  | 'review'
  | 'protection'
  | 'plus';

const animationMap: Record<AnimationKey, object> = {
  welcome: robotHello,
  vaccinate: Vaccinate,
  search: medicalSearch,
  habits: healthHabits,
  writing: doctorWriting,
  review: Review,
  protection: Protection,
  plus: Plus,
};

/**
 * LottieContextValue
 *
 * @property animationKey - the current selected animation key
 * @property animationData - the JSON data for the selected Lottie animation
 * @property setAnimationKey - callback to change the active animation key
 */
interface LottieContextValue {
  animationKey: AnimationKey;
  animationData: object;
  setAnimationKey: (key: AnimationKey) => void;
}

const LottieContext = createContext<LottieContextValue | undefined>(undefined);

/**
 * LottieProvider
 *
 * Wraps children with LottieContext, managing:
 * - animationKey state (default: 'writing')
 * - memoized animationData based on the current key
 *
 * Usage:
 * <LottieProvider>
 *   <YourApp />
 * </LottieProvider>
 */
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

/**
 * useLottie
 *
 * Custom hook to consume LottieContext.
 * Throws an error if used outside of LottieProvider.
 *
 * Returns:
 * { animationKey, animationData, setAnimationKey }
 */
export function useLottie() {
  const ctx = useContext(LottieContext);
  if (!ctx) {
    throw new Error('useLottie must be used inside a <LottieProvider>');
  }
  return ctx;
}
