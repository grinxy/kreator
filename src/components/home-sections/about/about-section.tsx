import { SectionWrapper } from "@/components/layout/section-wrapper"

export function AboutSection() {
  return (
    <SectionWrapper id="sobre-kreator" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-kreator-blue mb-8 text-center">¿Qué es Kreator?</h2>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            Kreator es la primera comunidad empresarial exclusiva por zonas, creada para autónomos y pymes que quieren
            vender más y ampliar sus contactos.
          </p>

          <p>
            En cada área solo puede haber un profesional por sector, lo que te da visibilidad y elimina la competencia
            interna dentro de tu zona.
          </p>

          <div className="bg-kreator-gray-light p-6 rounded-lg my-8">
            <h3 className="text-xl font-semibold text-kreator-blue mb-4">
              Formarás parte de un equipo local multidisciplinar, con perfiles como:
            </h3>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-800">
              <li className="flex items-start gap-2">
                <span>🏗️</span>
                <span>Construcción</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📢</span>
                <span>Marketing on/offline & Comunicación</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⚖️</span>
                <span>Legal & Financiero</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💼</span>
                <span>Servicios y productos para empresas & particulares</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💆</span>
                <span>Salud, Bienestar & Belleza</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🍽️</span>
                <span>Eventos & Restauración</span>
              </li>
            </ul>
          </div>

          <p>Cada miembro comparte sus contactos y oportunidades, multiplicando tu alcance.</p>

          <div className="bg-blue-50 border-l-4 border-kreator-blue p-6 my-6">
            <p className="font-semibold text-kreator-blue mb-2">💡 Ejemplo:</p>
            <p className="text-gray-700">
              El hermano de tu compañero puede necesitar tu servicio, o la empresa del padre de otro puede contratarte.
              Con Kreator, esas conexiones se convierten en clientes reales.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-kreator-blue mb-4">
              Además de ampliar tu red, puedes generar ingresos de dos formas:
            </h3>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li className="text-gray-700">
                Cada nuevo profesional que invites a la red reduce tu cuota mes a mes (hasta incluso generar saldo
                positivo).
              </li>
              <li className="text-gray-700">
                Cada trabajo que refieras a otros compañeros te aporta una comisión inmediata.
              </li>
            </ol>
          </div>

          <div className="bg-kreator-blue text-white p-6 rounded-lg text-center mt-8">
            <p className="text-xl font-bold">
              El resultado: más clientes, más ingresos y una red sólida de apoyo comercial en tu zona.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
