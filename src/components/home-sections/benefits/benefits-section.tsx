export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 md:py-24 bg-kreator-gray-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-kreator-blue mb-12 text-center">Beneficios</h2>

        <div className="max-w-4xl mx-auto">
          <ul className="space-y-4">
            <li className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-kreator-yellow rounded-full flex items-center justify-center text-white text-xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold text-kreator-blue mb-2">Exclusividad de sector en tu zona</h3>
                <p className="text-gray-700">
                  Serás el único profesional de tu sector en tu área, eliminando la competencia interna.
                </p>
              </div>
            </li>

            <li className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-kreator-yellow rounded-full flex items-center justify-center text-white text-xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold text-kreator-blue mb-2">
                  Clientes gracias a la red extendida de tus compañeros
                </h3>
                <p className="text-gray-700">Accede a oportunidades de negocio compartidas por todo tu equipo local.</p>
              </div>
            </li>

            <li className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-kreator-yellow rounded-full flex items-center justify-center text-white text-xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold text-kreator-blue mb-2">
                  Comisiones mensuales por referidos directos
                </h3>
                <p className="text-gray-700">
                  Reduce tu cuota o genera ingresos adicionales invitando a otros profesionales.
                </p>
              </div>
            </li>

            <li className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-kreator-yellow rounded-full flex items-center justify-center text-white text-xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold text-kreator-blue mb-2">
                  Networking continuo con profesionales locales
                </h3>
                <p className="text-gray-700">
                  Reuniones semanales presenciales para fortalecer relaciones y generar confianza.
                </p>
              </div>
            </li>

            <li className="bg-kreator-gradient-blue p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-start gap-4 text-white">
              <div className="flex-shrink-0 w-12 h-12 bg-kreator-yellow rounded-full flex items-center justify-center text-white text-xl font-bold">
                🚀
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Próximamente: programa de puntos y referidos indirectos</h3>
                <p className="text-gray-200">Nuevas formas de maximizar tus ingresos y beneficios dentro de la red.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
