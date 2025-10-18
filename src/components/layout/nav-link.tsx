"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NavLinkProps {
  readonly href: string
  readonly children: ReactNode
  readonly className?: string
  readonly onClick?: () => void
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick?.()
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetId === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "relative inline-block px-2 py-1",
        "text-foreground transition-colors duration-200 hover:text-primary",
        // underline
        "after:content-[''] after:absolute after:left-0 after:bottom-0",
        "after:h-0.5 after:w-0 after:bg-primary after:transition-[width] after:duration-200",
        "hover:after:w-full focus-visible:after:w-full",
        className
      )}
    >
      {children}
    </a>
  )
}
