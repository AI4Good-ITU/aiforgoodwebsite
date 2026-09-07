/**
 * Shared UI primitives. Import from here rather than reaching into a
 * component's folder:
 *
 *   import { Badge, Button } from '@/components/ui'
 *
 * These read their colours from CSS custom properties, so they need a theme
 * class from src/styles/theme.module.css on an ancestor.
 */

export { Button } from './Button/Button'
export type { ButtonProps, ButtonSize, ButtonHierarchy } from './Button/Button'

export { Badge } from './Badge/Badge'
export type { BadgeProps, BadgeColor } from './Badge/Badge'
