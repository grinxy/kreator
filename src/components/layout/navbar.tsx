import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavLink } from "@/components/layout/nav-link"
import { MobileMenu } from "@/components/layout/mobile-menu"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/#inicio" aria-label="Ir al inicio" className="flex items-center">
              <Image
                src="/logo-kreator.png"
                alt="Kreator - Sinergias Empresariales"
                width={160}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navegación principal">
            <NavLink href="#inicio">Inicio</NavLink>
            <NavLink href="#caracteristicas">Características</NavLink>
            <NavLink href="#testimonios">Testimonios</NavLink>
            <NavLink href="#contacto">Contacto</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant={"link"} className="cursor-pointer text-lg">
              Iniciar Sesión
            </Button>
            <Button size="sm" asChild>
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
