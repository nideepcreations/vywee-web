import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { SITE } from '@/constants/site';

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default social card.
 *
 * The card is still generated at build time, so the name and tagline can never
 * drift from `constants/site.ts` — but the mark itself is the approved raster
 * artwork, read from disk and inlined as a data URI rather than redrawn. The
 * renderer has no network access and no CSS custom properties, which is why
 * the file is read locally and the colours are literal.
 */
export default async function OpengraphImage() {
  // Pre-composited on the card's own background: the renderer does not
  // honour PNG alpha, so a transparent mark would show a pale halo.
  const mark = await readFile(join(process.cwd(), 'public', 'og-mark.png'));
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <img src={markSrc} width={104} height={100} alt="" />
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
          backgroundImage:
            'linear-gradient(90deg, #25D6FF 0%, #1F79FF 30%, #8A20F2 60%, #F62BE6 100%)',
        }}
      />
    </div>,
    size,
  );
}
