import React from 'react'

import styles from './Button.module.css'

export type ButtonSize = 'md' | 'lg' | 'xl'
export type ButtonHierarchy = 'primary' | 'secondary-gray' | 'link-gray'

const SIZE: Record<ButtonSize, string> = {
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
}

const HIERARCHY: Record<ButtonHierarchy, string> = {
  primary: styles.primary,
  'secondary-gray': styles.secondaryGray,
  'link-gray': styles.linkGray,
}

export type ButtonProps = {
  size?: ButtonSize
  hierarchy?: ButtonHierarchy
  fullWidth?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Expects a theme class on an ancestor for its colours. Deliberately has no
 * `'use client'` directive: it holds no state, so it compiles into whichever
 * environment imports it and stays usable from both server and client trees.
 */
export function Button({
  size = 'md',
  hierarchy = 'primary',
  fullWidth = false,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        styles.btn,
        SIZE[size],
        HIERARCHY[hierarchy],
        fullWidth && styles.fullWidth,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
