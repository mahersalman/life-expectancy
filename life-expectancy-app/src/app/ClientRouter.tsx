'use client';

import dynamic from 'next/dynamic';
import React from 'react';

/**
 * ClientRouter
 *
 * Wraps the app in a hash-based router on the client side only.
 * - Dynamically loads `HashRouter` from `react-router-dom` with SSR disabled
 * - Ensures client-side routing without server-side rendering errors
 *
 * @param children - React nodes to be rendered within the router context
 */

const HashRouter = dynamic(() => import('react-router-dom').then((mod) => mod.HashRouter), {
  ssr: false,
});

export default function ClientRouter({ children }: { children: React.ReactNode }) {
  return <HashRouter>{children}</HashRouter>;
}
