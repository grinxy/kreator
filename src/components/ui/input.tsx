import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border border-[var(--kreator-gray-dark)]/50',
        // text and placeholder
        'text-[var(--kreator-gray-dark)] placeholder:text-[color-mix(in oklch,var(--kreator-gray-dark)_60%,white)]',
        // base structure
        'flex h-8 w-full min-w-0 rounded-md bg-transparent px-3 mt-0.5 text-base shadow-sm transition-[color,box-shadow,border-color] outline-none',
        // hover
        'hover:border-[var(--kreator-gray-dark)] focus-visible:border-[var(--kreator-gray-dark)]',
        // additional states
        'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  )
}

export { Input }
