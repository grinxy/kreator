import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BadgeProps {
  readonly children: ReactNode
  readonly variant?: "default" | "secondary" | "accent"
  readonly className?: string
  readonly "aria-hidden"?: boolean
}

export function Badge({ children, variant = "default", className, "aria-hidden": ariaHidden }: BadgeProps) {
  const variantStyles = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        variantStyles[variant],
        className,
      )}
      aria-hidden={ariaHidden}
    >
      {children}
    </span>
  )
}
