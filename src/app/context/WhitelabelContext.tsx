"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WhitelabelSettings {
  businessName: string;
  ownerName: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  logoUrl: string | null;
}

interface WhitelabelContextType {
  settings: WhitelabelSettings;
  updateSettings: (newSettings: Partial<WhitelabelSettings>) => void;
}

const defaultSettings: WhitelabelSettings = {
  businessName: '',
  ownerName: '',
  primaryColor: '#1f2937', // Default dark gray for sidebar
  secondaryColor: '#374151', // Default slightly lighter gray
  tertiaryColor: '#4b5563', // Default even lighter gray
  logoUrl: null,
};

const WhitelabelContext = createContext<WhitelabelContextType | undefined>(undefined);

export const WhitelabelProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<WhitelabelSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<WhitelabelSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <WhitelabelContext.Provider value={{ settings, updateSettings }}>
      {children}
    </WhitelabelContext.Provider>
  );
};

export const useWhitelabel = () => {
  const context = useContext(WhitelabelContext);
  if (!context) {
    throw new Error('useWhitelabel must be used within a WhitelabelProvider');
  }
  return context;
};
