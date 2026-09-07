'use client'

import React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import styles from './SegmentedControl.module.css'

export type SegmentedControlOption = {
  value: string
  label: string
}

export type SegmentedControlProps = {
  value: string
  onValueChange: (value: string) => void
  options: readonly SegmentedControlOption[]
  /** Accessible name for the group. Not rendered. */
  label: string
}

/**
 * A boxed two-or-more-way switch on Radix ToggleGroup — same primitive as
 * ChipGroup, different skin, and likewise always keeps one option selected.
 */
export function SegmentedControl({ value, onValueChange, options, label }: SegmentedControlProps) {
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
      {options.map((option) => (
        <ToggleGroup.Item key={option.value} value={option.value} className={styles.item}>
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
