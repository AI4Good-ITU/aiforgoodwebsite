import React from 'react'

import styles from './Eyebrow.module.css'

export type EyebrowProps = {
  children: React.ReactNode
  className?: string
}

/** Section label: uppercase micro-type above a heading. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return <span className={[styles.eyebrow, className].filter(Boolean).join(' ')}>{children}</span>
}
