import { SectionWrapper } from "@/components/layout/section-wrapper"

export function HowItWorksSection() {
  return (
    <SectionWrapper id="como-funciona" className="py-16 md:py-32 bg-kreator-gray-light scroll-mt-10 md:scroll-mt-2">
      <h2 className="text-2xl md:text-4xl font-bold text-kreator-blue mb-12 text-center">¿Cómo funciona?</h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-kreator-yellow text-kreator-blue rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
            1
          </div>
          <h3 className="text:lg md:text-xl font-bold text-kreator-blue mb-4 text-center">Bloquea tu sector</h3>
          <p className="text-gray-700 text-center leading-relaxed">
            Elige tu sector en tu zona y asegúrate la exclusividad: nadie más podrá representarlo.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-kreator-yellow text-kreator-blue rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
            2
          </div>
          <h3 className="text:lg md:text-xl font-bold text-kreator-blue mb-4 text-center">Conéctate con tu equipo</h3>
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
          <h3 className="text:lg md:text-xl font-bold text-kreator-blue mb-4 text-center">Cobra comisiones</h3>
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
