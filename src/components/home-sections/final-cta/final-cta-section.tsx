import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FinalCTASection() {
  return (
    <section id="contacto" className="py-16 md:py-40 bg-kreator-gradient-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Tu sector en tu zona puede estar disponible todavía
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            No dejes que otro profesional ocupe tu lugar en la red exclusiva de tu área.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-kreator-yellow hover:bg-kreator-orange text-white font-semibold px-10 py-7 text-xl transition-all duration-200 hover:scale-105 mb-8"
            data-analytics="final-cta-register"
          >
            <Link href="/registro">Reserva tu sector ahora</Link>
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
      </div>
    </section>
  )
}
