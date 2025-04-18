import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  setThemeMode: (themeMode: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeHomeProvider = ({ children }: { children: ReactNode }) => {
  // Get themeMode from localStorage (fallback to light themeMode if not set)
  const storedThemeMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(storedThemeMode || 'light');

  useEffect(() => {
    // Persist themeMode in localStorage
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setAppThemeMode = (themeMode: 'light' | 'dark') => {
    setThemeMode(themeMode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, setThemeMode: setAppThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
