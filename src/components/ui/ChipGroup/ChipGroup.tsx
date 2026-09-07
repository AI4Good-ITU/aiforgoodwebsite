'use client'

import React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import styles from './ChipGroup.module.css'

export type ChipGroupProps = {
  /** Currently selected option. */
  value: string
  onValueChange: (value: string) => void
  options: readonly string[]
  /** Accessible name for the group; also rendered as a visible legend. */
  label: string
}

/**
 * A row of pill filters where exactly one is always selected, on Radix
 * ToggleGroup. Radix gives the group a roving tabindex, so the row is one
 * stop in the tab order and arrow keys move between chips.
 *
 * Radix clears the value when the active item is pressed again; the empty
 * string is swallowed here so the selection can never become nothing.
 */
export function ChipGroup({ value, onValueChange, options, label }: ChipGroupProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(next) => {
        if (next) onValueChange(next)
      }}
      aria-label={label}
      className={styles.root}
    >
      <span className={styles.legend} aria-hidden="true">
        {label}
      </span>
      {options.map((option) => (
        <ToggleGroup.Item key={option} value={option} className={styles.chip}>
          {option}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
