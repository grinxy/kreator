"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NavLinkProps {
  readonly href: string
  readonly children: ReactNode
  readonly className?: string
  readonly onClick?: () => void
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  if (href.startsWith("#")) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      onClick?.()

      const targetId = href.replace("#", "")
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }

    return (
      <a
        href={href}
        onClick={handleClick}
        className={cn(
          "text-foreground hover:text-primary transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "rounded-sm px-2 py-1",
          className,
        )}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "text-foreground hover:text-primary transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "rounded-sm px-2 py-1",
        className,
      )}
    >
      {children}
    </Link>
  )
}
