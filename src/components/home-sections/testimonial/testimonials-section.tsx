import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Director de Ventas, IndustrialTech",
      content:
        "Kreator ha transformado completamente mi forma de hacer networking. He conseguido 3 nuevos clientes importantes en solo 2 meses.",
      initials: "CM",
      bgColor: "bg-kreator-blue",
      textColor: "text-white",
    },
    {
      name: "Ana Rodríguez",
      role: "Gerente de Proyectos, MetalWorks",
      content:
        "La plataforma es intuitiva, moderna y las conexiones que he hecho son de alta calidad.  Definitivamente recomiendo Kreator.",
      initials: "AR",
      bgColor: "bg-kreator-blue",
      textColor: "text-white",
    },
    {
      name: "Luis García",
      role: "CEO, Automatización Plus",
      content:
        "El sistema de referrals es excelente. He podido expandir mi negocio a nuevos sectores gracias a las conexiones de Kreator.",
      initials: "LG",
      bgColor: "bg-kreator-blue",
      textColor: "text-white",
    },
  ]

  return (
    <section id="testimonios" className="py-30 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kreator-blue mb-4 font-sans">
            Lo que dicen nuestros <span className="text-kreator-yellow">Usuarios</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-kreator-yellow fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className={`w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center mr-3 shrink-0`}>
                  <span className={`${testimonial.textColor} font-semibold`}>{testimonial.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-kreator-blue">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
