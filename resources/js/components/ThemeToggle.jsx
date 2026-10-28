import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '../hooks/use-appearance';

export default function ThemeToggle() {
  const { appearance, updateAppearance } = useAppearance();
  const transitionTimeout = useRef();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark);
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const Icon = isDark ? Sun : Moon;

  function toggleTheme() {
    updateAppearance(isDark ? 'light' : 'dark', true);
    window.clearTimeout(transitionTimeout.current);
    transitionTimeout.current = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
      transitionTimeout.current = undefined;
    }, 420);
  }

  return createPortal(
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <Icon size={19} aria-hidden="true" />
    </button>,
    document.body,
  );
}
