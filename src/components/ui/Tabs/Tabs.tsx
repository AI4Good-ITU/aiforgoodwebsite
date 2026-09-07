'use client'

import React from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'

import styles from './Tabs.module.css'

/**
 * Thin styled wrapper over Radix Tabs.
 *
 * Radix supplies the parts of the ARIA tabs pattern that are tedious to get
 * right by hand: roving tabindex, arrow-key navigation between triggers,
 * Home/End, and the aria-controls/aria-labelledby pairing between each
 * trigger and its panel.
 *
 *   <Tabs.Root value={String(day)} onValueChange={(v) => setDay(Number(v))}>
 *     <Tabs.List label="Programme day">
 *       <Tabs.Trigger value="0" label="Wed 7 July" sub="Opening" />
 *     </Tabs.List>
 *     <Tabs.Content value="0">…</Tabs.Content>
 *   </Tabs.Root>
 */

export type TabsRootProps = RadixTabs.TabsProps

function Root({ className, ...rest }: TabsRootProps) {
  return <RadixTabs.Root className={className} {...rest} />
}

export type TabsListProps = Omit<RadixTabs.TabsListProps, 'aria-label'> & {
  /** Accessible name for the tab strip. */
  label: string
}

function List({ label, className, ...rest }: TabsListProps) {
  return (
    <RadixTabs.List
      aria-label={label}
      className={[styles.list, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}

export type TabsTriggerProps = Omit<RadixTabs.TabsTriggerProps, 'children'> & {
  label: string
  /** Small uppercase line under the label. */
  sub?: string
}

function Trigger({ label, sub, className, ...rest }: TabsTriggerProps) {
  return (
    <RadixTabs.Trigger className={[styles.trigger, className].filter(Boolean).join(' ')} {...rest}>
      <span className={styles.label}>{label}</span>
      {sub ? <span className={styles.sub}>{sub}</span> : null}
    </RadixTabs.Trigger>
  )
}

export type TabsContentProps = RadixTabs.TabsContentProps

function Content({ className, ...rest }: TabsContentProps) {
  return <RadixTabs.Content className={className} {...rest} />
}

export const Tabs = { Root, List, Trigger, Content }
