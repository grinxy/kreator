import { SectionWrapper } from "@/components/layout/SectionWrapper"

export function HowItWorksSection() {
  return (
    <SectionWrapper id="como-funciona" className="py-16 md:py-32 bg-kreator-gray-light scroll-mt-10 md:scroll-mt-2">
      <h2 className="text-2xl md:text-4xl text-kreator-blue mb-12 text-center">¿Cómo funciona?</h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-kreator-yellow text-kreator-blue rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
            1
          </div>
          <h2 className="text:lg md:text-xl text-kreator-blue mb-4 text-center">Bloquea tu sector</h2>
          <p className="text-gray-700 mb-4 text-center leading-relaxed">
            Elige tu sector y únete a un equipo activo en tu zona.
          </p>
          <p className="text-gray-700 text-center leading-relaxed">
            Serás el único profesional que lo represente dentro de ese grupo.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-kreator-yellow text-kreator-blue rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
            2
          </div>
          <h2 className="text:lg md:text-xl text-kreator-blue mb-4 text-center">Conéctate con tu equipo</h2>
          <p className="text-gray-700 mb-4 text-center leading-relaxed">
            Formarás parte de un grupo local de profesionales de distintos sectores.
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-kreator-yellow">•</span>
              <span>Reunión presencial semanal para conoceros y generar confianza.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-kreator-yellow">•</span>
              <span>Comparte y recibe oportunidades de negocio reales.</span>
            </li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-kreator-yellow text-kreator-blue rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
            3
          </div>
          <h2 className="text:lg md:text-xl text-kreator-blue mb-4 text-center">Cobra comisiones</h2>
          <p className="text-gray-700 mb-4 text-center leading-relaxed">Dos formas de ganar:</p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-kreator-yellow">•</span>
              <span>Cada profesional directo que invites reduce tu cuota (hasta generarte ingresos).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-kreator-yellow">•</span>
              <span>Cada trabajo que refieras a un compañero te da una comisión inmediata.</span>
            </li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}
