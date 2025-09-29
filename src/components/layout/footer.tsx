import Image from "next/image"
import { Heading } from "@/components/ui/heading"
import { NavLink } from "@/components/layout/nav-link"
import { Facebook, Linkedin, Instagram } from "lucide-react"
import { IconWrapper } from "@/components/ui/icon-wrapper"

export function Footer() {
  return (
    <footer id="contacto" className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo-kreator.png"
                alt="Kreator"
                width={120}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-md">
              La plataforma líder que conecta profesionales industriales para generar referrals de calidad y expandir
              redes de contactos profesionales.
            </p>
          </div>

          <div className="space-y-4">
            <Heading level={3} className="text-lg text-primary-foreground">
              Producto
            </Heading>
            <nav className="flex flex-col space-y-2" aria-label="Enlaces de producto">
              <NavLink href="#caracteristicas" className="text-primary-foreground/80 hover:text-primary-foreground">
                Características
              </NavLink>
              <NavLink href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                Precios
              </NavLink>
            </nav>
          </div>

          <div className="space-y-4">
            <Heading level={3} className="text-lg text-primary-foreground">
              Soporte
            </Heading>
            <nav className="flex flex-col space-y-2" aria-label="Enlaces de soporte">
              <NavLink href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                Centro de Ayuda
              </NavLink>
              <NavLink href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                Contacto
              </NavLink>
            </nav>
          </div>

          <div className="space-y-4">
            <Heading level={3} className="text-lg text-primary-foreground">
              Legal
            </Heading>
            <nav className="flex flex-col space-y-2" aria-label="Enlaces legales">
              <NavLink href="/aviso-legal" className="text-primary-foreground/80 hover:text-primary-foreground">
                Aviso Legal
              </NavLink>
              <NavLink href="/politica-privacidad" className="text-primary-foreground/80 hover:text-primary-foreground">
                Política de Privacidad
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">© 2025 Kreator. Todos los derechos reservados.</p>

            <div className="flex items-center space-x-4">
              <span className="text-primary-foreground/60 text-sm mr-2">Síguenos:</span>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <IconWrapper icon={Facebook} size="sm" aria-hidden={false} />
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Síguenos en LinkedIn"
              >
                <IconWrapper icon={Linkedin} size="sm" aria-hidden={false} />
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <IconWrapper icon={Instagram} size="sm" aria-hidden={false} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
