import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="inicio" className="relative bg-kreator-blue text-white py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-balance">
            Haz crecer tu negocio con la 1ª red exclusiva por zonas
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-100">Un solo profesional por sector y zona.</p>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Un solo profesional por sector en tu área. Multiplica tus oportunidades gracias a los contactos de todo tu
            equipo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-kreator-yellow hover:bg-kreator-orange text-white font-semibold px-8 py-6 text-lg transition-all duration-200 hover:scale-105"
              data-analytics="hero-cta-register"
            >
              <Link href="/registro">Reserva tu plaza ahora</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-300">Reserva ahora tu sector profesional y zona.</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[7px] bg-kreator-yellow" />

    </section>
  )
}
