import React, { CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  id?: string
  style?: CSSProperties
  innerClassName?: string
}

export const SectionWrapper = ({
  children,
  className,
  id,
  style,
  innerClassName,
  ...props
}: SectionWrapperProps) => {
  return (
    <section
      id={id}
      style={style}
      className={cn("w-full py-10", className)}
      {...props}
    >
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", innerClassName)}>{children}</div>
    </section>
  )
}
