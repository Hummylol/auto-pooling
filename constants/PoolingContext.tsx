// PoolingContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface LocationData {
  coordinates: string;
  address: string;
}

interface PoolingContextType {
  source: LocationData | null;
  destination: LocationData | null;
  setSource: (location: LocationData | null) => void;
  setDestination: (location: LocationData | null) => void;
}

const PoolingContext = createContext<PoolingContextType | undefined>(undefined);

export function PoolingProvider({ children }: { children: React.ReactNode }) {
  const [source, setSource] = useState<LocationData | null>(null);
  const [destination, setDestination] = useState<LocationData | null>(null);

  return (
    <PoolingContext.Provider
      value={{
        source,
        destination,
        setSource,
        setDestination,
      }}
    >
      {children}
    </PoolingContext.Provider>
  );
}

export function usePooling() {
  const context = useContext(PoolingContext);
  if (context === undefined) {
    throw new Error('usePooling must be used within a PoolingProvider');
  }
  return context;
}
