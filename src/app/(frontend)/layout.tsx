import React from 'react'
import './styles.css'

/*
 * Re-applies a saved theme choice before first paint, so a visitor who picked
 * the opposite of their OS setting does not see the page flash to it. It is a
 * plain inline script rather than next/script: `beforeInteractive` is queued
 * and run by the Next runtime, which can land after the first paint, whereas
 * an inline tag in <head> runs as the parser reaches it. It runs from <head>,
 * so the flag goes on <html>; the Summit page's theme class reads it from
 * there, and pages that do not use the flag ignore it.
 */
const RESTORE_THEME = `try{var t=localStorage.getItem('summit-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}`

export const metadata = {
  description: 'AI for Good website.',
  title: 'AI for Good',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESTORE_THEME }} />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
