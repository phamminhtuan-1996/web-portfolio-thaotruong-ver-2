"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

export default function LoadingProvider({
  children
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Handle initial page load and refresh only
  useEffect(() => {
    // Skip loading if CV parameter is present
    const hasCVParam = searchParams.get('cv') !== null;

    if (hasCVParam) {
      setIsLoading(false);
    }
    // Otherwise keep isLoading as true (initial state)
  }, [searchParams]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <LoadingScreen
          duration={2500}
          onLoadingComplete={handleLoadingComplete}
        />
      )}
      {children}
    </LoadingContext.Provider>
  );
}