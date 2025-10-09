"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavLink } from "./nav-link"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  readonly className?: string
}

export function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu()
        buttonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // Focus trap
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      document.addEventListener("keydown", handleTabKey)
      firstElement?.focus()

      return () => document.removeEventListener("keydown", handleTabKey)
    }
  }, [isOpen])

  return (
    <div className={cn("lg:hidden", className)}>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg z-50"
        >
          <nav className="flex flex-col p-4 space-y-2">
            <NavLink href="#inicio" onClick={closeMenu}>
              Inicio
            </NavLink>
            <NavLink href="#como-funciona" onClick={closeMenu}>
              Cómo Funciona
            </NavLink>
            <NavLink href="#sobre-kreator" onClick={closeMenu}>
              Qué es Kreator
            </NavLink>
            <NavLink href="#perfiles" onClick={closeMenu}>
              Perfiles
            </NavLink>
            <NavLink href="#beneficios" onClick={closeMenu}>
              Beneficios
            </NavLink>
            <NavLink href="#contacto" onClick={closeMenu}>
              Contacto
            </NavLink>
            <div className="pt-4 border-t border-border space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Iniciar sesión
              </Button>
              <Button size="sm" className="w-full" asChild>
                <Link href="/registro" onClick={closeMenu}>
                  Registrarse
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
