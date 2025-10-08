import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavLink } from "@/components/layout/nav-link"
import { MobileMenu } from "@/components/layout/mobile-menu"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" aria-label="Ir al inicio de Kreator" className="flex items-center">
              <Image
                src="/brand/horizontal/logo-kreator-default-horizontal.svg"
                alt="Kreator - Sinergias Empresariales"
                width={160}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-6" role="navigation" aria-label="Navegación principal">
            <NavLink href="#inicio">Inicio</NavLink>
            <NavLink href="#como-funciona">Cómo Funciona</NavLink>
            <NavLink href="#sobre-kreator">Qué es Kreator</NavLink>
            <NavLink href="#perfiles">Perfiles</NavLink>
            <NavLink href="#beneficios">Beneficios</NavLink>
            <NavLink href="#contacto">Contacto</NavLink>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" aria-label="Iniciar sesión en Kreator">
              <Link href="login">Iniciar sesión</Link>
            </Button>
            <Button asChild variant="navbar" size="sm">
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}