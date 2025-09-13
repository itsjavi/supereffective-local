import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'
import styles from './StickyToolbar.module.scss'

type StickyToolbarProps = {
  stickyness?: 'sticky' | 'fixed' | 'none'
  placement?: 'left' | 'center' | 'right' | 'distribute'
  vplacement?: 'top' | 'bottom' | 'center'
} & ComponentPropsWithoutRef<'div'>

export default function StickyToolbar({
  className,
  children,
  stickyness = 'sticky',
  placement = 'distribute',
  vplacement = 'top',
  ...props
}: StickyToolbarProps) {
  return (
    <div
      className={cn(
        styles.toolbar,
        {
          [styles.sticky]: stickyness === 'sticky',
          [styles.fixed]: stickyness === 'fixed',
        },
        className,
      )}
      {...props}
    >
      <div
        className={cn(styles.content, {
          [styles.placeLeft]: placement === 'left',
          [styles.placeCenter]: placement === 'center',
          [styles.placeRight]: placement === 'right',
          [styles.placeDistribute]: placement === 'distribute',
          [styles.vplaceTop]: vplacement === 'top',
          [styles.vplaceCenter]: vplacement === 'center',
          [styles.vplaceBottom]: vplacement === 'bottom',
        })}
      >
        {children}
      </div>
    </div>
  )
}
