import React from 'react'

import styles from './Eyebrow.module.css'

export type EyebrowProps = {
  children: React.ReactNode
  className?: string
}

/** Section label: uppercase micro-type with a spectrum dot. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return <span className={[styles.eyebrow, className].filter(Boolean).join(' ')}>{children}</span>
}
