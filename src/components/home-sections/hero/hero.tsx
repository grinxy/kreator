import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { StatGroup } from "@/components/ui/stat-group"

export function Hero() {
  return (
    <section id="inicio" className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Heading level={1} className="text-primary">
                Conecta, Refiere y Haz Crecer Tu Negocio Industrial
              </Heading>
              <Paragraph size="lg" className="text-muted-foreground max-w-2xl">
                Únete a la plataforma líder que conecta profesionales industriales para generar referrals de calidad y
                expandir tu red de contactos. Transforma tu experiencia en oportunidades de negocio.
              </Paragraph>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" aria-label="Comenzar ahora - Registro gratuito">
                Comenzar Ahora
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base bg-transparent"
                aria-label="Ver demostración de la plataforma"
              >
                Ver Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Configuración en 5 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Soporte gratuito</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Image src="/icon.jpg" alt="" width={32} height={32} className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">10,000+</div>
                    <div className="text-sm text-muted-foreground">Profesionales Conectados</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <StatGroup />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
