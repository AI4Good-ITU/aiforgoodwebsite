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

/*
 * Re-applies a saved theme choice before hydration, so a visitor who picked
 * the opposite of their OS setting does not see the page flash to it first.
 * The client component initialises its own state from the same key.
 */
const RESTORE_THEME = `try{var t=localStorage.getItem('summit-theme');if(t==='light'||t==='dark'){document.getElementById('summit').dataset.theme=t}}catch(e){}`

export default function Summit27Page() {
  // The theme class supplies the colour tokens that both this page's
  // stylesheet and the shared components in @/components/ui read. It follows
  // the OS unless the client sets `data-theme` on that element.
  return (
    <>
      <SummitClient themeClass={`${avenir.variable} ${theme.summit}`} />
      <script dangerouslySetInnerHTML={{ __html: RESTORE_THEME }} />
    </>
  )
}
