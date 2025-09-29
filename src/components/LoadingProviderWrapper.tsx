"use client";
import { Suspense } from 'react';
import LoadingProvider from './LoadingProvider';

export default function LoadingProviderWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <Suspense fallback={null}>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </Suspense>
  );
}