// PoolingContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface PoolingContextType {
  source: string | null;
  setSource: (source: string | null) => void;
  destination: string | null;
  setDestination: (destination: string | null) => void;
}

const PoolingContext = createContext<PoolingContextType | undefined>(undefined);

export const PoolingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [source, setSource] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);

  return (
    <PoolingContext.Provider value={{ source, setSource, destination, setDestination }}>
      {children}
    </PoolingContext.Provider>
  );
};

export const usePooling = () => {
  const context = useContext(PoolingContext);
  if (!context) {
    throw new Error('usePooling must be used within a PoolingProvider');
  }
  return context;
};
