import React from 'react'

import styles from './Badge.module.css'

export type BadgeColor = 'brand' | 'success' | 'blue' | 'indigo' | 'pink' | 'warning' | 'gray'

/**
 * Each badge renders as a tinted pill: the hue at low alpha behind the hue
 * itself. Self-contained rather than themed, so a badge colour means the same
 * thing on every page.
 */
const HUE: Record<BadgeColor, string> = {
  brand: '#7B5CFA',
  success: '#12B76A',
  blue: '#2E90FA',
  indigo: '#6172F3',
  pink: '#EE46BC',
  warning: '#F79009',
  gray: '#98A2B3',
}

export type BadgeProps = {
  color?: BadgeColor | string
  children: React.ReactNode
}

export function Badge({ color = 'gray', children }: BadgeProps) {
  const hue = HUE[color as BadgeColor] ?? HUE.gray
  return (
    <span className={styles.badge} style={{ background: `${hue}24`, color: hue }}>
      {children}
    </span>
  )
}
