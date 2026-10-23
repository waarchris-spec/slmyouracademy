import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'icon' | 'menu' | 'footer';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  className = '',
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const titleText = isDark
    ? 'التبديل إلى الوضع الفاتح (Light Mode)'
    : 'التبديل إلى الوضع الداكن (Dark Mode)';

  const accessibleLabel = isDark
    ? 'المظهر الحالي: الوضع الداكن. انقر للتبديل إلى الوضع الفاتح'
    : 'المظهر الحالي: الوضع الفاتح. انقر للتبديل إلى الوضع الداكن';

  if (variant === 'menu') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 text-right ${
          isDark
            ? 'bg-zinc-900/90 border-zinc-800 text-zinc-100 hover:border-amber-400/50'
            : 'bg-zinc-100 border-zinc-300 text-zinc-900 hover:border-amber-500'
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${className}`}
        aria-label={accessibleLabel}
        title={titleText}
        id="theme-toggle-menu"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-amber-400/20 text-amber-400'
                : 'bg-amber-100 text-amber-600'
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 transition-transform duration-300 -rotate-12 hover:rotate-0" />
            )}
          </div>
          <div className="text-right">
            <span className="block text-sm font-bold">
              {isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
            </span>
            <span
              className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
            >
              {isDark ? 'تفعيل المظهر النهاري' : 'تفعيل المظهر الليلي'}
            </span>
          </div>
        </div>

        <span
          className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
            isDark
              ? 'bg-zinc-800 text-amber-300 border-zinc-700'
              : 'bg-white text-amber-700 border-zinc-300 shadow-sm'
          }`}
        >
          {isDark ? 'داكن' : 'فاتح'}
        </span>
      </button>
    );
  }

  if (variant === 'footer') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all duration-200 ${
          isDark
            ? 'bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:text-amber-400 hover:border-amber-400/50'
            : 'bg-white border-zinc-300 text-zinc-800 hover:text-amber-600 hover:border-amber-500 shadow-sm'
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${className}`}
        aria-label={accessibleLabel}
        title={titleText}
        id="theme-toggle-footer"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-amber-600" />
        )}
        <span>{isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
      </button>
    );
  }

  // Default: 'icon'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 sm:p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center group ${
        isDark
          ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-amber-300 hover:border-amber-400/50'
          : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-amber-600 hover:border-amber-400 hover:bg-white shadow-sm'
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-95 ${className}`}
      aria-label={accessibleLabel}
      title={titleText}
      id="theme-toggle-button"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-amber-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
      <span className="sr-only">{titleText}</span>
    </button>
  );
};
