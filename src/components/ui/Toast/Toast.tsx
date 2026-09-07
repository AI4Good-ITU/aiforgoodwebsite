import React from 'react'

import styles from './Toast.module.css'

export type ToastProps = {
  /** Shown when set; the toast fades out when this goes back to null. */
  message: React.ReactNode | null
}

/**
 * A transient status pill, always mounted so it can transition in and out.
 *
 * Deliberately not Radix Toast: this is a single non-interactive message with
 * no queue, no action and nothing to dismiss, so `role="status"` with a polite
 * live region is the whole requirement. Radix Toast earns its complexity —
 * provider, viewport, swipe handling, focus management for actions — only
 * once toasts stack or contain controls.
 */
export function Toast({ message }: ToastProps) {
  return (
    <div
      className={[styles.toast, message && styles.shown].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
    >
      <span className={styles.dot} />
      <span className={styles.text}>{message}</span>
    </div>
  )
}
