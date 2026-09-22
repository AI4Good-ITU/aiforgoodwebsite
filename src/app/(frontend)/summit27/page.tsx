import React from 'react'
import type { Metadata } from 'next'

import theme from '@/styles/theme.module.css'

import SummitClient from './SummitClient'
import { avenir } from './fonts'

export const metadata: Metadata = {
  title: 'AI for Good Global Summit 2027',
  description:
    'The AI for Good Global Summit returns to Palexpo, Geneva, 7–10 July 2027. 1,000+ speakers, 200+ exhibitors and 50+ UN agencies.',
}

export default function Summit27Page() {
  // The theme class supplies the colour tokens that both this page's
  // stylesheet and the shared components in @/components/ui read. It follows
  // the OS unless <html data-theme> says otherwise (see the frontend layout).
  return <SummitClient themeClass={`${avenir.variable} ${theme.summit}`} />
}
