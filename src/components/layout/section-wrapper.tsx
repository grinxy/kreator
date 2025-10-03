import React, { CSSProperties } from "react"
import { cn } from "@/lib/utils"

type SectionWrapperProps = {
  children: React.ReactNode
  className?: string
  id?: string
  style?: CSSProperties
  innerClassName?: string
}

export const SectionWrapper = ({ children, className, id, style, innerClassName }: SectionWrapperProps) => {
  return (
    <section id={id} style={style} className={cn("w-full py-10", className)}>
      <div className={cn("max-w-7xl mx-auto px-4", innerClassName)}>{children}</div>
    </section>
  )
}
