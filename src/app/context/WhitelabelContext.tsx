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
  resetSettings: () => void; // Add resetSettings to the interface
}

export const defaultSettings: WhitelabelSettings = {
  businessName: '',
  ownerName: '',
  primaryColor: '#476c2e', // Default dark gray for sidebar
  secondaryColor: '#ffbd5a', // Default slightly lighter gray
  tertiaryColor: '#0b2d65', // Default even lighter gray
  logoUrl: null,
};

const WhitelabelContext = createContext<WhitelabelContextType | undefined>(undefined);

export const WhitelabelProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<WhitelabelSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<WhitelabelSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  const resetSettings = () => { // Implement resetSettings
    setSettings(defaultSettings);
  };

  return (
    <WhitelabelContext.Provider value={{ settings, updateSettings, resetSettings }}>
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
