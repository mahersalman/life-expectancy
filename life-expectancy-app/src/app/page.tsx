// src/components/Main.tsx
'use client';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useLottie } from '@/context/LottieContext';

import HomePage from '@components/HomePage';
import UserForm from '@components/UserForm';
import Review from '@components/Review';
import Results from '@components/Results';

export default function Main() {
  const navigate = useNavigate();
  const { animationData } = useLottie();

  return (
    <div
      className="relative min-h-screen flex flex-col items-center pt-20 overflow-visible"
      style={{
        background: 'linear-gradient(135deg, #E8F0FE 0%, #E0F7FA 100%)',
      }}
    >
      {/* Title */}
      <motion.h1
        onClick={() => navigate('/')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-8 text-center cursor-pointer whitespace-nowrap"
      >
        Life Expectancy Calculator
      </motion.h1>

      {/* Mascot */}
      <motion.div
        initial={{ x: 300, y: -300, opacity: 0, scale: 0.6 }}
        animate={{ x: -20, y: 20, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 55 }}
        className="absolute top-0 right-0 z-10"
        style={{ width: 300, height: 300 }}
      >
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      {/* Card container centering its children */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-3xl mx-auto
                   bg-white/80 backdrop-blur-md rounded-2xl shadow-xl
                   overflow-visible p-10 md:p-16
                   flex flex-col justify-center items-center"
        style={{
          clipPath: 'polygon(0% 5%, 100% 0%, 95% 100%, 0% 95%)',
          minHeight: '70vh',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<UserForm />} />
          <Route path="/review" element={<Review />} />
          <Route path="/result" element={<Results />} />
        </Routes>
      </motion.div>
    </div>
  );
}
