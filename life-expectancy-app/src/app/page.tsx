'use client';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useLottie } from '@/context/LottieContext';

import HomePage from '@components/HomePage';
import UserForm from '@components/UserForm';
import Review from '@components/Review';
import Results from '@components/Results';
import InfoPanel from '@/components/InfoPanel';
import Simulator from '@/components/Simulator';
import { useLanguage } from '@/context/LanguageContext';
import { FloatingLanguageSelector } from '@components/LanguageSelector';
import Logo from '@/components/logo';

/**
 * Main entry component that sets up layout, animations, and routing
 * Name: Main
 * Inputs: none (uses React Router, Framer Motion, Lottie contexts)
 * Purpose: Bootstraps the app shell and renders pages based on route
 */
export default function Main() {
  const { animationData } = useLottie();
  const { language } = useLanguage();
  return (
    <div
      dir={language.dir}
      className="
    relative flex flex-col items-center
    pt-8 sm:pt-12 md:pt-16
    px-4 sm:px-6 lg:px-0
    min-h-screen
    bg-gradient-to-br from-blue-50 to-cyan-50
  "
    >
      <FloatingLanguageSelector />
      {/* App title */}
      <Logo />
      {/* Animated mascot (hidden on small) */}
      <motion.div
        initial={{ x: 300, y: -300, opacity: 0, scale: 0.6 }}
        animate={{ x: -20, y: 20, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 55 }}
        className="
          hidden md:block
          absolute top-0 right-0 z-10
          w-40 h-40
          sm:w-48 sm:h-48
          md:w-64 md:h-64
          lg:w-72 lg:h-72
        "
      >
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      {/* Clipped card container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          relative z-10
          w-full
          max-w-xl sm:max-w-2xl md:max-w-3xl
          mx-auto
          bg-white/80 backdrop-blur-md
          rounded-[2rem] shadow-xl
          overflow-visible
          py-8 sm:py-10 md:py-12
          px-6 sm:px-8 md:px-16
          flex flex-col justify-center items-center
          min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh]
        "
        style={{
          clipPath: 'polygon(0% 5%, 100% 0%, 95% 100%, 0% 95%)',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<UserForm />} />
          <Route path="/review" element={<Review />} />
          <Route path="/result" element={<Results />} />
          <Route path="/simulator" element={<Simulator />} />
        </Routes>
      </motion.div>

      {/* Persistent info panel trigger */}
      <InfoPanel />
    </div>
  );
}
