"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'theme-preference';

export const themes = {
  light: 'light',
  dark: 'dark',
  system: 'system'
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.system);
  const [resolvedTheme, setResolvedTheme] = useState('light');

  // Get system theme preference
  const getSystemTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }, []);

  // Resolve the actual theme based on current setting
  const resolveTheme = useCallback((currentTheme) => {
    if (currentTheme === themes.system) {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  // Apply theme to document
  const applyTheme = useCallback((themeToApply) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeToApply);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(themeToApply);
    }
  }, []);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme && Object.values(themes).includes(storedTheme)) {
      setTheme(storedTheme);
    } else {
      setTheme(themes.system);
    }
  }, []);

  // Update resolved theme when theme or system preference changes
  useEffect(() => {
    const newResolvedTheme = resolveTheme(theme);
    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
  }, [theme, resolveTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === themes.system) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        const newResolvedTheme = resolveTheme(theme);
        setResolvedTheme(newResolvedTheme);
        applyTheme(newResolvedTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, resolveTheme, applyTheme]);

  // Toggle between themes
  const toggleTheme = useCallback(() => {
    const themeOrder = [themes.light, themes.dark, themes.system];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const nextTheme = themeOrder[nextIndex];
    
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }, [theme]);

  // Set specific theme
  const setSpecificTheme = useCallback((newTheme) => {
    if (Object.values(themes).includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
  }, []);

  const value = {
    theme,
    resolvedTheme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isLight: resolvedTheme === 'light',
    isDark: resolvedTheme === 'dark',
    isSystem: theme === themes.system
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
