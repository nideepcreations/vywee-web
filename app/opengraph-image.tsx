import { ImageResponse } from 'next/og';

import { SITE } from '@/constants/site';

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default social card, rendered to PNG at build time.
 *
 * Generating it means the card can never drift from the brand name and
 * tagline, and there is no binary asset to keep in sync.
 *
 * Colours are literal rather than token references because this renders
 * outside the browser, where CSS custom properties have nothing to resolve
 * against. The values mirror `--vy-ink-950` and the dark-mode gradient stops —
 * the card sits on an ink background, so it uses the lifted pair.
 *
 * Inline styles are required: the renderer supports no stylesheets or classes.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#070b16',
        padding: '80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <svg width="96" height="96" viewBox="0 0 32 32">
          <defs>
            <linearGradient
              id="og-mark-gradient"
              x1="4"
              y1="4"
              x2="28"
              y2="28"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#6b74ff" />
              <stop offset="1" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <path
            d="M5.5 6.5 L16 17.5 L26.5 6.5 M16 17.5 L16 27.5"
            fill="none"
            stroke="url(#og-mark-gradient)"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ fontSize: '64px', fontWeight: 700, color: '#ffffff' }}>{SITE.name}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          style={{
            fontSize: '68px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {SITE.tagline}
        </div>
        <div style={{ fontSize: '32px', color: '#8d97b0', lineHeight: 1.4, maxWidth: '900px' }}>
          Research products, compare your options, and find what is actually worth buying.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          height: '10px',
          width: '100%',
          backgroundImage: 'linear-gradient(90deg, #2b34e0 0%, #9333ea 100%)',
        }}
      />
    </div>,
    size,
  );
}
