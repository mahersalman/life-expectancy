import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientRouter from './ClientRouter';
import { LottieProvider } from '@/context/LottieContext';
import { FormProvider } from '@/context/FormContext';
import { LanguageProvider } from '@/context/LanguageContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Life-Expectancy-APP',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientRouter>
          <LanguageProvider>
            <FormProvider>
              <LottieProvider>{children}</LottieProvider>
            </FormProvider>
          </LanguageProvider>
        </ClientRouter>
      </body>
    </html>
  );
}
