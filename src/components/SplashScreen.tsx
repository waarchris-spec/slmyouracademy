import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface SplashScreenProps {
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  isBokeh?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const { isRtl } = useLanguage();

  // Lock body scroll while splash screen is visible to prevent any layout shifting
  useEffect(() => {
    if (isVisible) {
      const originalOverflow = document.body.style.overflow;
      const originalBg = document.body.style.backgroundColor;
      document.body.style.overflow = 'hidden';
      document.body.style.backgroundColor = '#070E1E';
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.backgroundColor = originalBg;
      };
    }
  }, [isVisible]);

  // Detect reduced-motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Precise Timeline Control: Total duration 3.2s (or 0.8s for reduced motion)
  useEffect(() => {
    const totalDuration = isReducedMotion ? 800 : 3200;
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, totalDuration);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        setIsVisible(false);
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, isReducedMotion]);

  // High-performance particle set (lightweight, GPU-composited, zero CPU filter recalculation)
  const particles: Particle[] = useMemo(() => {
    return [
      // Bokeh golden orbs (pre-softened with CSS radial gradients)
      { id: 1, x: 10, y: 20, size: 36, opacity: 0.2, duration: 3.2, delay: 0.1, driftX: 10, driftY: -12, isBokeh: true },
      { id: 2, x: 90, y: 22, size: 40, opacity: 0.22, duration: 3.4, delay: 0.15, driftX: -12, driftY: -14, isBokeh: true },
      { id: 3, x: 14, y: 80, size: 44, opacity: 0.25, duration: 3.3, delay: 0.2, driftX: 14, driftY: -16, isBokeh: true },
      { id: 4, x: 86, y: 76, size: 38, opacity: 0.22, duration: 3.5, delay: 0.25, driftX: -12, driftY: -15, isBokeh: true },

      // Golden micro sparks (crisp transform3d only)
      { id: 5, x: 24, y: 34, size: 3, opacity: 0.85, duration: 3.0, delay: 0.1, driftX: 8, driftY: -16 },
      { id: 6, x: 76, y: 30, size: 3.5, opacity: 0.9, duration: 3.2, delay: 0.15, driftX: -8, driftY: -14 },
      { id: 7, x: 30, y: 66, size: 2.5, opacity: 0.75, duration: 2.8, delay: 0.2, driftX: 10, driftY: -18 },
      { id: 8, x: 70, y: 70, size: 3, opacity: 0.8, duration: 3.1, delay: 0.25, driftX: -9, driftY: -16 },
      { id: 9, x: 45, y: 22, size: 2.5, opacity: 0.7, duration: 2.9, delay: 0.3, driftX: 5, driftY: -12 },
      { id: 10, x: 55, y: 82, size: 3, opacity: 0.75, duration: 3.2, delay: 0.22, driftX: -6, driftY: -15 },
    ];
  }, []);

  const handleSkip = () => {
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.aside
          key="cinematic-splash-screen"
          role="region"
          aria-label="Your Academy Intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: isReducedMotion ? 1 : 1.03,
            transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
          }}
          className="fixed inset-0 top-0 left-0 w-screen h-screen min-h-[100dvh] min-w-full z-[99999] flex flex-col items-center justify-center bg-[#070E1E] text-white select-none overflow-hidden"
          id="website-splash-screen"
          style={{
            backgroundColor: '#070E1E',
            backgroundImage:
              'radial-gradient(ellipse at 50% 45%, rgba(242,174,11,0.22) 0%, rgba(242,174,11,0.08) 32%, rgba(7,14,30,0.98) 68%, #070E1E 100%)',
            transform: 'translateZ(0)',
            willChange: 'opacity, transform',
          }}
        >
          {/* =========================================================================
              LAYER 1: CENTRAL ATMOSPHERIC GOLDEN RADIANCE (Zero-lag radial gradient)
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.85, 1, 0.8],
              scale: [0.8, 1.05, 1.15, 1.2],
            }}
            transition={{
              duration: 3.2,
              times: [0, 0.25, 0.65, 1],
              ease: 'easeOut',
            }}
            className="absolute w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] lg:w-[720px] lg:h-[720px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 212, 71, 0.24) 0%, rgba(242, 174, 11, 0.12) 35%, rgba(217, 150, 0, 0.03) 60%, transparent 75%)',
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
            }}
            aria-hidden="true"
          />

          {/* =========================================================================
              LAYER 2: HARDWARE-ACCELERATED GOLDEN LIGHT RIBBON (No heavy filter)
             ========================================================================= */}
          {!isReducedMotion && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 1440 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              style={{ transform: 'translateZ(0)' }}
            >
              <defs>
                <linearGradient id="goldRibbonSharp" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#F2AE0B" stopOpacity="0" />
                  <stop offset="25%" stopColor="#F2AE0B" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FFE58A" stopOpacity="0.95" />
                  <stop offset="75%" stopColor="#FFC62A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F2AE0B" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="goldRibbonGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#F2AE0B" stopOpacity="0" />
                  <stop offset="30%" stopColor="#F2AE0B" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#FFD447" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#F7C62F" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#F2AE0B" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Underlying Soft Glow Track (Wide stroke replaces expensive Gaussian Blur) */}
              <motion.path
                d="M -100 440 C 300 480, 520 320, 720 340 C 920 360, 1140 480, 1540 430"
                stroke="url(#goldRibbonGlow)"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 0.9, 1, 1],
                  opacity: [0, 0.8, 0.75, 0.4],
                }}
                transition={{
                  delay: 0.35,
                  duration: 2.5,
                  times: [0, 0.45, 0.8, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* Crisp Core Golden Ribbon */}
              <motion.path
                d="M -100 440 C 300 480, 520 320, 720 340 C 920 360, 1140 480, 1540 430"
                stroke="url(#goldRibbonSharp)"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 0.9, 1, 1],
                  opacity: [0, 0.95, 0.9, 0.55],
                }}
                transition={{
                  delay: 0.35,
                  duration: 2.5,
                  times: [0, 0.45, 0.8, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </svg>
          )}

          {/* =========================================================================
              LAYER 3: LIGHTWEIGHT GPU PARTICLES & BOKEH (Zero Layout Thrashing)
             ========================================================================= */}
          {!isReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              {particles.map((p) => {
                if (p.isBokeh) {
                  return (
                    <motion.span
                      key={p.id}
                      initial={{
                        opacity: 0,
                        x: `${p.x}vw`,
                        y: `${p.y}vh`,
                      }}
                      animate={{
                        opacity: [0, p.opacity, p.opacity * 0.9, 0],
                        x: [`${p.x}vw`, `${p.x + p.driftX * 0.04}vw`],
                        y: [`${p.y}vh`, `${p.y + p.driftY * 0.05}vh`],
                      }}
                      transition={{
                        delay: p.delay,
                        duration: p.duration,
                        ease: 'easeOut',
                      }}
                      style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        borderRadius: '50%',
                        background:
                          'radial-gradient(circle, rgba(255, 198, 42, 0.45) 0%, rgba(242, 174, 11, 0.15) 50%, transparent 75%)',
                        position: 'absolute',
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                      }}
                    />
                  );
                }

                return (
                  <motion.span
                    key={p.id}
                    initial={{
                      opacity: 0,
                      x: `${p.x}vw`,
                      y: `${p.y}vh`,
                    }}
                    animate={{
                      opacity: [0, p.opacity, p.opacity * 0.85, 0],
                      x: [`${p.x}vw`, `${p.x + p.driftX * 0.06}vw`],
                      y: [`${p.y}vh`, `${p.y + p.driftY * 0.08}vh`],
                    }}
                    transition={{
                      delay: p.delay,
                      duration: p.duration,
                      ease: 'easeOut',
                    }}
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      borderRadius: '50%',
                      backgroundColor: '#FFE58A',
                      boxShadow: '0 0 6px 1px rgba(255, 212, 71, 0.8)',
                      position: 'absolute',
                      transform: 'translateZ(0)',
                      willChange: 'transform, opacity',
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* =========================================================================
              LAYER 4: SUBTLE EDUCATIONAL MOTIFS WATERMARKS
             ========================================================================= */}
          {!isReducedMotion && (
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
              {/* Graduation Cap (Top Left) */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.18, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                className="absolute top-[18%] left-[20%] sm:left-[22%] w-10 h-10 sm:w-14 sm:h-14 text-amber-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </motion.div>

              {/* Open Book (Top Right) */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.18, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                className="absolute top-[26%] right-[18%] sm:right-[20%] w-9 h-9 sm:w-12 sm:h-12 text-amber-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </motion.div>

              {/* Globe (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.16, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                className="absolute bottom-[28%] left-[12%] sm:left-[15%] w-9 h-9 sm:w-12 sm:h-12 text-amber-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </motion.div>

              {/* Chat / Speech Bubble (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.16, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                className="absolute bottom-[26%] right-[22%] sm:right-[24%] w-8 h-8 sm:w-10 sm:h-10 text-amber-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </motion.div>
            </div>
          )}

          {/* =========================================================================
              LAYER 5: MAIN HERO STAGE (GPU-Composited Pure Transforms)
             ========================================================================= */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto px-4" style={{ transform: 'translateZ(0)' }}>
            
            {/* Logo Squircle with Golden Halo and Rim Backlight */}
            <div className="relative flex items-center justify-center mb-6">
              
              {/* Top Golden Light Flare */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: [0, 0.9, 1, 0.8],
                  scale: [0.7, 1.15, 1.25, 1.1],
                }}
                transition={{
                  delay: isReducedMotion ? 0 : 0.55,
                  duration: 1.4,
                  ease: 'easeOut',
                }}
                className="absolute -top-5 w-32 h-12 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse, rgba(255, 229, 138, 0.75) 0%, rgba(242, 174, 11, 0.4) 45%, transparent 75%)',
                  transform: 'translateZ(0)',
                }}
                aria-hidden="true"
              />

              {/* Pulsing Golden Halo behind the Squircle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: isReducedMotion ? 0.4 : [0, 0.75, 0.85, 0.6],
                  scale: isReducedMotion ? 1 : [0.85, 1.15, 1.25, 1.2],
                }}
                transition={{
                  delay: isReducedMotion ? 0 : 0.75,
                  duration: isReducedMotion ? 0.3 : 1.3,
                  times: [0, 0.45, 0.75, 1],
                  ease: 'easeOut',
                }}
                className="absolute inset-0 -m-3 sm:-m-4 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 212, 71, 0.45) 0%, rgba(242, 174, 11, 0.2) 50%, transparent 75%)',
                  transform: 'translateZ(0)',
                }}
                aria-hidden="true"
              />

              {/* Exact Official Logo Image in White Rounded Squircle (100% Locked Original Asset) */}
              <motion.div
                initial={
                  isReducedMotion
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.88, y: 16 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: isReducedMotion ? 0 : 0.35,
                  duration: isReducedMotion ? 0.2 : 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-[28px] sm:rounded-[36px] bg-white p-3.5 sm:p-4 flex items-center justify-center shadow-[0_0_35px_rgba(242,174,11,0.3)] border-2 border-amber-300/60 overflow-hidden"
                style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
              >
                <img
                  src="/assets/your-academy-logo.png"
                  alt="Your Academy"
                  width="144"
                  height="144"
                  className="w-full h-full object-contain select-none pointer-events-none"
                  loading="eager"
                  decoding="sync"
                />
              </motion.div>
            </div>

            {/* Title Reveal: YOUR ACADEMY (Pure Transform + Opacity for 60fps) */}
            <motion.h1
              initial={
                isReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: isReducedMotion ? 0.05 : 1.1,
                duration: isReducedMotion ? 0.2 : 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sora tracking-[0.18em] sm:tracking-[0.24em] uppercase text-white leading-tight"
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            >
              YOUR ACADEMY
            </motion.h1>

            {/* Arabic Tagline: طريقك نحو النجاح يبدأ من هنا */}
            <motion.p
              initial={
                isReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: isReducedMotion ? 0.1 : 1.45,
                duration: isReducedMotion ? 0.2 : 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-sm sm:text-base lg:text-lg font-bold text-[#FFC62A] font-cairo mt-2.5 tracking-wide"
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            >
              طريقك نحو النجاح يبدأ من هنا
            </motion.p>

            {/* Subline / Locations line */}
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 6 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: isReducedMotion ? 0.15 : 1.75,
                duration: isReducedMotion ? 0.2 : 0.55,
                ease: 'easeOut',
              }}
              className="mt-2.5 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold text-zinc-300 font-sora tracking-[0.14em] uppercase"
              style={{ transform: 'translateZ(0)' }}
            >
              <span>YOUR ACADEMY</span>
              <span className="text-amber-400 font-bold">—</span>
              <span>ACADEMY</span>
            </motion.div>

            {/* Golden Horizontal Pill Accent Line: 0% -> 100% width */}
            <div className="mt-5 w-28 sm:w-36 h-[3.5px] relative flex items-center justify-center overflow-hidden rounded-full">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  delay: isReducedMotion ? 0.2 : 2.05,
                  duration: isReducedMotion ? 0.2 : 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full h-full rounded-full origin-center"
                style={{
                  background:
                    'linear-gradient(90deg, #D99600 0%, #FFD447 50%, #D99600 100%)',
                  boxShadow: '0 0 8px 1px rgba(255, 212, 71, 0.7)',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                }}
              />
            </div>

          </div>

          {/* =========================================================================
              LAYER 6: BOTTOM HORIZON LIGHT REFLECTION (GPU Accelerated)
             ========================================================================= */}
          {!isReducedMotion && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{
                opacity: [0, 0.7, 0.85, 0.6],
                scaleX: [0.7, 1, 1.05, 1],
              }}
              transition={{
                delay: 0.5,
                duration: 2.2,
                ease: 'easeOut',
              }}
              className="absolute bottom-0 inset-x-0 h-16 pointer-events-none flex items-end justify-center"
              aria-hidden="true"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Bottom center gold flare */}
              <div
                className="w-80 sm:w-96 h-8 rounded-full"
                style={{
                  background:
                    'radial-gradient(ellipse at center bottom, rgba(255, 212, 71, 0.4) 0%, rgba(242, 174, 11, 0.15) 50%, transparent 80%)',
                }}
              />
              {/* Fine light line */}
              <div
                className="absolute bottom-0 inset-x-0 h-[1px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(242, 174, 11, 0.2) 20%, rgba(255, 212, 71, 0.6) 50%, rgba(242, 174, 11, 0.2) 80%, transparent 100%)',
                }}
              />
            </motion.div>
          )}

          {/* =========================================================================
              Subtle Skip Button for Accessibility
             ========================================================================= */}
          <motion.button
            type="button"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className={`absolute top-5 ${
              isRtl ? 'left-5' : 'right-5'
            } z-20 px-3 py-1.5 rounded-full text-[11px] font-bold text-amber-300/80 hover:text-amber-300 bg-zinc-900/60 hover:bg-zinc-800/80 border border-amber-500/20 backdrop-blur-md transition-all cursor-pointer`}
            aria-label={isRtl ? 'تخطي المقدمة' : 'Skip Intro'}
          >
            {isRtl ? 'تخطي ✕' : 'Skip ✕'}
          </motion.button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
