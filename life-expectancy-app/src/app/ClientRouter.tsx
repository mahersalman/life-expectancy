// components/ClientRouter.tsx
'use client';
import dynamic from 'next/dynamic';
import React from 'react';
const BrowserRouter = dynamic(
  () => import('react-router-dom').then((mod) => mod.BrowserRouter),
  { ssr: false },
);

export default function ClientRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
