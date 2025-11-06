"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NavLinkProps {
  readonly href: string
  readonly children: ReactNode
  readonly className?: string
  readonly onClick?: () => void
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname()

  // Si el enlace es Inicio y ya estamos en la raíz, no añadimos el hash
  const isHomeLink = href === "/#inicio"
  const shouldStayOnHome = pathname === "/" && isHomeLink
  const finalHref = shouldStayOnHome ? "/" : href

  return (
    <Link
      href={finalHref}
      onClick={onClick}
      className={cn(
        "relative inline-block px-2 py-1",
        "text-foreground transition-colors duration-200 hover:text-primary",
        "after:content-[''] after:absolute after:left-0 after:bottom-0",
        "after:h-0.5 after:w-0 after:bg-primary after:transition-[width] after:duration-200",
        "hover:after:w-full focus-visible:after:w-full",
        className
      )}
    >
      {children}
    </Link>
  )
}
