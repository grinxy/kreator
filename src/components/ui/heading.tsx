import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface HeadingProps {
  readonly level: 1 | 2 | 3 | 4 | 5 | 6
  readonly children: ReactNode
  readonly className?: string
  readonly id?: string
}

export function Heading({ level, children, className, id }: HeadingProps) {
  const Component = `h${level}` as const

  const baseStyles = "font-bold text-balance"
  const levelStyles = {
    1: "text-4xl md:text-5xl lg:text-6xl leading-tight",
    2: "text-3xl md:text-4xl lg:text-5xl leading-tight",
    3: "text-2xl md:text-3xl leading-tight",
    4: "text-xl md:text-2xl leading-tight",
    5: "text-lg md:text-xl leading-tight",
    6: "text-base md:text-lg leading-tight",
  }

  return (
    <Component id={id} className={cn(baseStyles, levelStyles[level], className)}>
      {children}
    </Component>
  )
}
