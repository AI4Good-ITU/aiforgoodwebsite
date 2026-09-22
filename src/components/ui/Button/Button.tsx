import React from 'react'

import styles from './Button.module.css'

export type ButtonSize = 'md' | 'lg' | 'xl'
export type ButtonHierarchy = 'primary' | 'secondary-gray' | 'link-gray' | 'on-band'

const SIZE: Record<ButtonSize, string> = {
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
}

const HIERARCHY: Record<ButtonHierarchy, string> = {
  primary: styles.primary,
  'secondary-gray': styles.secondaryGray,
  'link-gray': styles.linkGray,
  'on-band': styles.onBand,
}

type Common = {
  size?: ButtonSize
  hierarchy?: ButtonHierarchy
  fullWidth?: boolean
  children: React.ReactNode
}

/** With `href` the button is a real link, so it navigates without JavaScript. */
export type ButtonProps =
  | (Common & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | (Common & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)

/**
 * Expects a theme class on an ancestor for its colours. Deliberately has no
 * `'use client'` directive: it holds no state, so it compiles into whichever
 * environment imports it and stays usable from both server and client trees.
 */
export function Button(props: ButtonProps) {
  const { size = 'md', hierarchy = 'primary', fullWidth = false, children, className } = props
  const cls = [styles.btn, SIZE[size], HIERARCHY[hierarchy], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ')

  if (props.href !== undefined) {
    const { size: _s, hierarchy: _h, fullWidth: _f, children: _c, className: _cl, ...rest } = props
    const external = /^https?:/.test(props.href)
    return (
      <a
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
        {...rest}
      >
        {children}
      </a>
    )
  }

  const { size: _s, hierarchy: _h, fullWidth: _f, children: _c, className: _cl, type = 'button', ...rest } = props
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  )
}
