import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import type { Theme } from '@/types';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <SunIcon size={20} weight="regular" />
      ) : (
        <MoonIcon size={20} weight="regular" />
      )}
    </button>
  );
}
