import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface IconWrapperProps {
  readonly icon: LucideIcon
  readonly size?: "sm" | "md" | "lg" | "xl"
  readonly className?: string
  readonly "aria-hidden"?: boolean
}

export function IconWrapper({
  icon: Icon,
  size = "md",
  className,
  "aria-hidden": ariaHidden = true,
}: IconWrapperProps) {
  const sizeStyles = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  }

  return <Icon className={cn(sizeStyles[size], className)} aria-hidden={ariaHidden} />
}
