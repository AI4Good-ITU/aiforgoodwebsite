'use client'

/* eslint-disable @next/next/no-img-element */

import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import styles from './SidePanel.module.css'

export type SidePanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Rendered as the dialog's accessible name. */
  title: string
  /** Optional line under the title. */
  subtitle?: React.ReactNode
  /** Optional full-bleed image header. */
  image?: { src: string; alt: string }
  /**
   * Element to portal into. Radix defaults to document.body, which would put
   * the panel outside the themed subtree — CSS custom properties inherit down
   * the DOM, so the panel would render with none of its colours or fonts.
   * Pass the themed page root to keep them.
   */
  container?: HTMLElement | null
  children?: React.ReactNode
}

/**
 * A right-hand sheet built on Radix Dialog.
 *
 * Radix handles the things a hand-rolled panel almost always misses: it traps
 * Tab inside the panel, restores focus to whatever opened it on close, locks
 * body scroll, marks the rest of the page aria-hidden, and closes on Escape
 * and on scrim click. Previously this page wired up only Escape.
 */
export function SidePanel({
  open,
  onOpenChange,
  title,
  subtitle,
  image,
  container,
  children,
}: SidePanelProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={container ?? undefined}>
        <Dialog.Overlay className={styles.scrim} />
        {/*
          The title is the accessible name, so no separate description is
          needed; opting out keeps Radix from warning about its absence.
        */}
        <Dialog.Content className={styles.panel} aria-describedby={undefined}>
          {image ? (
            <div className={styles.imageWrap}>
              <img className={styles.image} src={image.src} alt={image.alt} />
              <Dialog.Close className={styles.close} aria-label="Close">
                ×
              </Dialog.Close>
            </div>
          ) : (
            <Dialog.Close className={`${styles.close} ${styles.closeBare}`} aria-label="Close">
              ×
            </Dialog.Close>
          )}
          <div className={styles.body}>
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
            {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
