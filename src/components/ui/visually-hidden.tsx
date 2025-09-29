import type { ReactNode } from "react"

interface VisuallyHiddenProps {
  readonly children: ReactNode
}

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="sr-only">{children}</span>
}
