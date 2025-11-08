import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
