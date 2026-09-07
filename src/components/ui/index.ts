/**
 * Shared UI primitives. Import from here rather than reaching into a
 * component's folder:
 *
 *   import { Badge, Button, Tabs } from '@/components/ui'
 *
 * These read their colours from CSS custom properties, so they need a theme
 * class from src/styles/theme.module.css on an ancestor.
 *
 * Tabs, SidePanel, ChipGroup and SegmentedControl wrap Radix primitives for
 * keyboard navigation and focus management; Button, Badge, Eyebrow and Toast
 * are plain.
 */

export { Button } from './Button/Button'
export type { ButtonProps, ButtonSize, ButtonHierarchy } from './Button/Button'

export { Badge } from './Badge/Badge'
export type { BadgeProps, BadgeColor } from './Badge/Badge'

export { Eyebrow } from './Eyebrow/Eyebrow'
export type { EyebrowProps } from './Eyebrow/Eyebrow'

export { Tabs } from './Tabs/Tabs'
export type { TabsRootProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './Tabs/Tabs'

export { SidePanel } from './SidePanel/SidePanel'
export type { SidePanelProps } from './SidePanel/SidePanel'

export { ChipGroup } from './ChipGroup/ChipGroup'
export type { ChipGroupProps } from './ChipGroup/ChipGroup'

export { SegmentedControl } from './SegmentedControl/SegmentedControl'
export type {
  SegmentedControlProps,
  SegmentedControlOption,
} from './SegmentedControl/SegmentedControl'

export { Toast } from './Toast/Toast'
export type { ToastProps } from './Toast/Toast'
