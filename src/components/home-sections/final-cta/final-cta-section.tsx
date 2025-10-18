import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/layout/section-wrapper"

export function FinalCTASection() {
  return (
    <SectionWrapper id="contacto" className="py-16 md:py-48 bg-kreator-gradient-blue text-white scroll-mt-10">
      <div className="mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
          Tu sector en tu zona puede estar disponible todavía
        </h2>
        <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          No dejes que otro profesional ocupe tu lugar en la red exclusiva de tu área.
        </p>

        <Button asChild variant="cta" size="lg" className="mb-8">
          <Link href="/registro" id="cta-final-reserva" data-gtm="cta_final_reserva">
            Reserva tu sector ahora
          </Link>
        </Button>

        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="text-kreator-yellow text-xl">✓</span>
            <span>Sin permanencia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-kreator-yellow text-xl">✓</span>
            <span>Exclusividad garantizada</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-kreator-yellow text-xl">✓</span>
            <span>Comisiones desde el primer mes</span>
          </div>
        </div>

        <p className="mt-12 text-2xl font-semibold text-kreator-yellow">
          La 1ª red exclusiva por zonas para profesionales
        </p>
      </div>
    </SectionWrapper>
  )
}
