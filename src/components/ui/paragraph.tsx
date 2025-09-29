import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ParagraphProps {
  readonly children: ReactNode
  readonly className?: string
  readonly size?: "sm" | "base" | "lg" | "xl"
}

export function Paragraph({ children, className, size = "base" }: ParagraphProps) {
  const sizeStyles = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-relaxed",
    lg: "text-lg leading-relaxed",
    xl: "text-xl leading-relaxed",
  }

  return <p className={cn("text-pretty", sizeStyles[size], className)}>{children}</p>
}
