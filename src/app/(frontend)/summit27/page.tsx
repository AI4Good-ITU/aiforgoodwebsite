import React from 'react'
import type { Metadata } from 'next'

import theme from '@/styles/theme.module.css'

import SummitClient from './SummitClient'
import { avenir } from './fonts'

const TITLE = "AI for Good Summit 2027 - Unlock AI's potential to serve humanity"
const DESCRIPTION =
  'The AI for Good Global Summit 2026, led by ITU, aims to unlock AI’s potential to serve humanity through building skills and standards, and advancing partnerships to solve global challenges.'
const OG_IMAGE = '/img/summit27-og.jpg'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1920, height: 1080 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function Summit27Page() {
  // The theme class supplies the colour tokens that both this page's
  // stylesheet and the shared components in @/components/ui read. It follows
  // the OS unless <html data-theme> says otherwise (see the frontend layout).
  return <SummitClient themeClass={`${avenir.variable} ${theme.summit}`} />
}
