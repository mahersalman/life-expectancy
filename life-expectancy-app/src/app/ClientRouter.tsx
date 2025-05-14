// components/ClientRouter.tsx
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import HashRouter (no SSR)
const HashRouter = dynamic(() => import('react-router-dom').then((mod) => mod.HashRouter), {
  ssr: false,
});

export default function ClientRouter({ children }: { children: React.ReactNode }) {
  return <HashRouter>{children}</HashRouter>;
}
