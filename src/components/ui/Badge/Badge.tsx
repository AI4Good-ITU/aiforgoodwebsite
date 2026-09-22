import React from 'react'

import styles from './Badge.module.css'

export type BadgeColor = 'slate' | 'green' | 'sky' | 'purple' | 'orange' | 'pink'

/**
 * Outline pill: a tinted fill, a one-step-darker border and the family's ink.
 * The three values per family are theme tokens, so a badge reads the same way
 * in both modes without this component knowing which one is active.
 */
const TONE: Record<BadgeColor, string> = {
  slate: styles.slate,
  green: styles.green,
  sky: styles.sky,
  purple: styles.purple,
  orange: styles.orange,
  pink: styles.pink,
}

export type BadgeProps = {
  color?: BadgeColor
  children: React.ReactNode
}

export function Badge({ color = 'slate', children }: BadgeProps) {
  return <span className={`${styles.badge} ${TONE[color] ?? TONE.slate}`}>{children}</span>
}
