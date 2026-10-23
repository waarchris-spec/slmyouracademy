import React, { useId } from 'react';
import { motion } from 'motion/react';

interface CircularProgressBarProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  levelBadge?: string;
  label?: string;
  description?: string;
  animateKey?: string | number;
  delay?: number;
  compact?: boolean;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percent,
  size = 100,
  strokeWidth = 8,
  levelBadge,
  label,
  description,
  animateKey,
  delay = 0,
  compact = false,
}) => {
  const gradientId = useId();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  if (compact) {
    return (
      <div
        className="flex items-center gap-3"
        role="progressbar"
        aria-valuenow={clampedPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `${clampedPercent}%`}
      >
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            className="-rotate-90 origin-center overflow-visible"
            viewBox={`0 0 ${size} ${size}`}
          >
            <defs>
              <linearGradient id={`grad-compact-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>
            </defs>

            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-zinc-200 dark:text-zinc-800"
            />

            {/* Animated Progress Circle */}
            <motion.circle
              key={animateKey ? `${animateKey}-${clampedPercent}` : clampedPercent}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={`url(#grad-compact-${gradientId})`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{
                duration: 1.1,
                ease: [0.25, 1, 0.5, 1],
                delay,
              }}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            <span className="font-sora font-black text-xs sm:text-sm text-zinc-950 dark:text-white leading-none">
              {clampedPercent}
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">%</span>
            </span>
            {levelBadge && (
              <span className="text-[9px] font-sora font-extrabold text-amber-700 dark:text-amber-300 mt-0.5 px-1 py-0.2 rounded bg-amber-400/15 leading-none">
                {levelBadge}
              </span>
            )}
          </div>
        </div>

        {(label || description) && (
          <div className="space-y-0.5 text-start">
            {label && (
              <p className="text-xs font-black text-zinc-900 dark:text-white leading-tight">
                {label}
              </p>
            )}
            {description && (
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-amber-400/50 hover:shadow-md transition-all group"
      role="progressbar"
      aria-valuenow={clampedPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label}: ${clampedPercent}%` : `${clampedPercent}%`}
    >
      {/* Circle Container */}
      <div className="relative my-1" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90 origin-center overflow-visible"
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            <linearGradient id={`grad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-zinc-200 dark:text-zinc-800"
          />

          {/* Animated Progress Circle */}
          <motion.circle
            key={animateKey ? `${animateKey}-${clampedPercent}` : clampedPercent}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={`url(#grad-${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay,
            }}
            strokeLinecap="round"
            filter={`url(#glow-${gradientId})`}
          />
        </svg>

        {/* Center Percentage & Milestone Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
          <div className="flex items-baseline justify-center font-sora font-black text-zinc-950 dark:text-white leading-none">
            <span className="text-xl sm:text-2xl font-black tracking-tight">{clampedPercent}</span>
            <span className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 ms-0.5">%</span>
          </div>

          {levelBadge && (
            <span className="mt-1 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-sora font-extrabold tracking-wide leading-none shadow-xs">
              {levelBadge}
            </span>
          )}
        </div>
      </div>

      {/* Label and Milestone Description */}
      {label && (
        <h4 className="mt-3 text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {label}
        </h4>
      )}

      {description && (
        <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {description}
        </p>
      )}
    </div>
  );
};
