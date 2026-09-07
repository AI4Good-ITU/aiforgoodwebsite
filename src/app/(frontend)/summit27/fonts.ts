import localFont from 'next/font/local'

/**
 * Avenir Next W1G — the AI for Good brand display face, licensed and vendored
 * under src/fonts. Exposed as --font-avenir.
 */
export const avenir = localFont({
  src: [
    { path: '../../../fonts/AvenirNextW1G-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../../fonts/AvenirNextW1G-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../../fonts/AvenirNextW1G-Demi.otf', weight: '600', style: 'normal' },
    { path: '../../../fonts/AvenirNextW1G-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-avenir',
  display: 'swap',
})
