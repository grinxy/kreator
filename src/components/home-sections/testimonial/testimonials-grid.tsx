import { TestimonialCard } from "@/components/home-sections/testimonial/testimonial-card"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { testimonials } from "@/data/testimonials"

export function TestimonialsGrid() {
  return (
    <section id="testimonios" className="py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <Heading level={2} className="text-primary">
            Lo que Dicen Nuestros Clientes
          </Heading>
          <Paragraph size="lg" className="text-muted-foreground max-w-3xl mx-auto">
            Descubre cómo profesionales industriales como tú están transformando sus negocios y generando resultados
            excepcionales con Kreator.
          </Paragraph>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              initials={testimonial.initials}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
