import { Users, Target, TrendingUp, FileText, Shield, Zap } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Red Verificada",
      description:
        "Conecta con profesionales verificados de la industria. Cada miembro pasa por un proceso de validación para garantizar la calidad de la red.",
      iconBg: "bg-kreator-blue",
      iconColor: "text-white",
    },
    {
      icon: Target,
      title: "Matching Inteligente",
      description:
        "Nuestro algoritmo encuentra las conexiones más relevantes basado en tu sector, experiencia y objetivos de negocio.",
      iconBg: "bg-kreator-blue",
      iconColor: "text-white",
    },
    {
      icon: TrendingUp,
      title: "Analytics Avanzado",
      description:
        "Mide el impacto de tus conexiones con métricas detalladas sobre referrals, conversiones y crecimiento de tu red.",
      iconBg: "bg-kreator-blue",
      iconColor: "text-white",
    },
    {
      icon: FileText,
      title: "Sectores Especializados",
      description:
        "Encuentra contactos en más de 50 sectores industriales, desde manufactura hasta energías renovables y construcción.",
      iconBg: "bg-kreator-blue",
      iconColor: "text-white",
    },
    {
      icon: Shield,
      title: "Sistema de Referrals",
      description:
        "Gestiona y rastrea tus referrals con nuestro sistema automatizado que facilita el seguimiento de oportunidades.",
      iconBg: "bg-kreator-blue",
      iconColor: "text-white",
    },
    {
      icon: Zap,
      title: "Conexión Instantánea",
      description:
        "Conecta con otros profesionales al instante a través de nuestra plataforma integrada de mensajería y videoconferencia.",
      iconBg: "bg-kreator-blue",
      iconColor: "text-white",
    },
  ]

  return (
    <section id="caracteristicas" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kreator-blue mb-4 font-sans">
            Todo lo que Necesitas para <span className="text-kreator-yellow">Expandir</span> tu Red
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Herramientas poderosas diseñadas específicamente para profesionales industriales que buscan generar más
            oportunidades de negocio.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group p-6 bg-white border-l-4 border-kreator-yellow rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 ${feature.iconBg} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-kreator-blue mb-3 group-hover:text-kreator-yellow transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
