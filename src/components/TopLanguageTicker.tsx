import React from 'react';

/**
 * Top Moving Language Bar (Infinite Marquee Ticker)
 *
 * Brand Identity for Your Academy (خميس مليانة)
 * Continuously scrolls the multilingual greeting sequence from Right to Left.
 */
const TICKER_TEXT =
  'Hello · Hola · Bonjour · Ciao · Olá · こんにちは · Merhaba · مرحبا · Привет · Namaste · ';

export const TopLanguageTicker: React.FC = () => {
  // Repeat the sequence 6 times per track so each block is comfortably wider than 4K screens (zero gaps or flicker)
  const repeatedText = TICKER_TEXT.repeat(6);

  return (
    <div
      className="ticker relative z-50 select-none cursor-default"
      dir="ltr"
      role="region"
      aria-label="Multilingual Greeting Ticker"
    >
      <div className="ticker-track">
        <span className="ticker-text">{repeatedText}</span>
        <span className="ticker-text" aria-hidden="true">
          {repeatedText}
        </span>
      </div>
    </div>
  );
};
