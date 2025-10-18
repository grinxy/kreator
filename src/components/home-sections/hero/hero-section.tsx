import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <SectionWrapper id="inicio" className="relative bg-kreator-blue text-white py-12 md:py-33">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-balance">
          Haz crecer tu negocio con la 1ª red <span className="text-kreator-yellow">exclusiva</span> por zonas
        </h1>

        <p className="text-lg md:text-2xl mb-4 text-gray-100">Un solo profesional por sector y zona.</p>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Un solo profesional por sector en tu área. Multiplica tus oportunidades gracias a los contactos de todo tu
          equipo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="cta" size="lg">
            <Link href="/registro" id="cta-hero-reserva" data-gtm="cta_hero_reserva">
              Reserva tu plaza ahora
            </Link>
          </Button>
        </div>
        <p className="mt-6 mb-4 md:mb-0 text-sm text-gray-300">Reserva ahora tu sector profesional y zona.</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[7px] bg-kreator-yellow" />
      {/* Flechita animada */}
      <Link
        href="#sobre-kreator"
        className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 text-kreator-yellow cursor-pointer animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </Link>
    </SectionWrapper>
  )
}
