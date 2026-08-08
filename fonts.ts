import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google';

/**
 * Three roles, three faces:
 * - Bricolage Grotesque gives headlines a slightly engineered, opinionated voice.
 * - Instrument Sans keeps long reviews readable without shouting.
 * - JetBrains Mono locks prices and specs to a tabular grid.
 *
 * All three are self-hosted by next/font, so there is no render-blocking
 * request to a font CDN and no layout shift on first paint.
 */
export const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
  weight: ['500', '600', '700', '800'],
});

export const fontSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
  weight: ['400', '500', '600', '700'],
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
});

export const fontVariables = [fontDisplay.variable, fontSans.variable, fontMono.variable].join(' ');
