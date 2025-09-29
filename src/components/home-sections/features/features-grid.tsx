import { FeatureCard } from "@/components/ui/feature-card"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { features } from "@/data/features"

export function FeaturesGrid() {
  return (
    <section id="caracteristicas" className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <Heading level={2} className="text-primary">
            Características que Impulsan tu Crecimiento
          </Heading>
          <Paragraph size="lg" className="text-muted-foreground max-w-3xl mx-auto">
            Descubre las herramientas avanzadas que te ayudarán a conectar con los profesionales correctos y generar
            referrals de alta calidad en tu sector industrial.
          </Paragraph>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  )
}
