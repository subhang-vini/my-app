"use client";

import { useTheme } from "../../contexts/ThemeContext";
import styles from "./ThemeToggle.module.css";

/**
 * ThemeToggle component for switching between light, dark, and system themes
 */
export default function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme, isSystem } = useTheme();

  const getIcon = () => {
    if (isSystem) {
      return '🖥️'; // System theme
    }
    return resolvedTheme === 'dark' ? '🌙' : '☀️';
  };

  const getLabel = () => {
    if (isSystem) {
      return `System (${resolvedTheme})`;
    }
    return resolvedTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
      title={`Current: ${getLabel()}. Click to cycle themes.`}
    >
      <span className={styles.icon}>{getIcon()}</span>
      <span className={styles.label}>{getLabel()}</span>
    </button>
  );
}
