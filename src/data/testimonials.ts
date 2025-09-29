export interface Testimonial {
  readonly content: string
  readonly author: string
  readonly role: string
  readonly company: string
  readonly initials: string
}

export const testimonials: readonly Testimonial[] = [
  {
    content:
      "Kreator ha transformado completamente nuestra estrategia de crecimiento. En 6 meses hemos triplicado nuestras conexiones industriales y generado más de 50 referrals calificados.",
    author: "María Rodríguez",
    role: "Directora de Ventas",
    company: "MetalTech",
    initials: "MR",
  },
  {
    content:
      "La plataforma es increíblemente intuitiva y el matching inteligente realmente funciona. Hemos cerrado 3 contratos importantes gracias a las conexiones que hicimos aquí.",
    author: "Carlos López",
    role: "CEO",
    company: "Construcciones López",
    initials: "CL",
  },
  {
    content:
      "El ROI ha sido excepcional. Por cada euro invertido en Kreator, hemos generado 15 euros en nuevos negocios. Es una herramienta indispensable para cualquier empresa industrial.",
    author: "Ana Sánchez",
    role: "Gerente",
    company: "EcoEnergía Industrial",
    initials: "AS",
  },
] as const
