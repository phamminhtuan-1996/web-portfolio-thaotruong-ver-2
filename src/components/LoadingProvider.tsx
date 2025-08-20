"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  // Handle route changes
  useEffect(() => {
    if (!isInitialLoad) {
      setIsLoading(true);
    }
  }, [pathname, searchParams, isInitialLoad]);

  // Handle page refresh (F5)
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('isRefreshing', 'true');
    };

    const checkRefresh = () => {
      const isRefreshing = sessionStorage.getItem('isRefreshing');
      if (isRefreshing) {
        sessionStorage.removeItem('isRefreshing');
        setIsLoading(true);
        setIsInitialLoad(true);
      }
    };

    checkRefresh();
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <LoadingScreen 
          duration={isInitialLoad ? 2500 : 1500}
          onLoadingComplete={handleLoadingComplete}
        />
      )}
      {children}
    </LoadingContext.Provider>
  );
}