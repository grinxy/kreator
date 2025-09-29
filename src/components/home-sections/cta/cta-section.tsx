import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export function CTASection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Heading level={2} className="text-primary">
              ¿Listo para Expandir tu Red?
            </Heading>
            <Paragraph size="lg" className="text-muted-foreground">
              Únete a miles de profesionales industriales que ya están generando referrals exitosos y haciendo crecer
              sus negocios con Kreator.
            </Paragraph>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base" aria-label="Comenzar gratis - Sin compromiso">
              Comenzar Gratis
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base bg-transparent"
              aria-label="Solicitar demostración personalizada"
            >
              Solicitar Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm text-muted-foreground pt-8 border-t border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span>
              <span>Sin tarjeta de crédito requerida</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span>
              <span>Configuración en 5 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span>
              <span>Soporte gratuito incluido</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
