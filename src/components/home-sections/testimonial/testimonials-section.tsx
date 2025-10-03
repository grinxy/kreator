import { Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { SectionWrapper } from "@/components/layout/section-wrapper"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Director de Ventas, IndustrialTech",
      content:
        "Kreator ha transformado completamente mi forma de hacer networking. He conseguido 3 nuevos clientes importantes en solo 2 meses.",
      initials: "CM",
    },
    {
      name: "Ana Rodríguez",
      role: "Gerente de Proyectos, MetalWorks",
      content:
        "La plataforma es intuitiva y las conexiones que he hecho son de alta calidad. Estoy realmente contenta. Definitivamente recomiendo Kreator.",
      initials: "AR",
    },
    {
      name: "Luis García",
      role: "CEO, Automatización Plus",
      content:
        "El sistema de referrals es excelente. He podido expandir mi negocio a nuevos sectores gracias a las conexiones de Kreator.",
      initials: "LG",
    },
  ]

  return (
    <SectionWrapper id="testimonios" className="py-16 md:py-24 bg-muted" aria-labelledby="testimonials-heading">
      <div className="text-center mb-12">
        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-kreator-blue mb-4">
          Lo que dicen nuestros clientes
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border">
            <CardContent className="p-6">
              <div className="flex mb-4" role="img" aria-label="5 estrellas">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-kreator-yellow fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <Avatar className="mr-3">
                  <AvatarFallback className="bg-kreator-gray-light text-kreator-blue font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-kreator-blue">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}
