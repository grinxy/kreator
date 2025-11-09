import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { SectionDivider } from "@/components/ui/section-divider"

export function AboutSection() {
  return (
    <div className="relative">
      <SectionWrapper id="sobre-kreator" className="py-16 md:py-24 bg-white scroll-mt-10 md:scroll-mt-2">
        <div className="relative max-w-4xl mx-auto z-10">
          <h2 className="text-2xl md:text-4xl text-kreator-blue mb-8 text-center">¿Qué es Kreator?</h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Kreator es la primera comunidad empresarial colaborativa por equipos, creada para autónomos y pymes que
              quieren vender más, generar contactos de calidad y crecer en red.
            </p>

            <p>
              En cada equipo solo puede haber un/a profesional por sector, lo que te da visibilidad y elimina la
              competencia interna dentro del grupo.<br></br> En una misma zona puede haber varios equipos, según el volumen de
              negocio disponible.
            </p>

            <p></p>

            <div className="bg-kreator-gray-light p-6 rounded-lg my-8">
              <h3 className="text-lg md:text-xl text-kreator-blue mb-4">
                Formarás parte de un equipo local multidisciplinar, con perfiles como:
              </h3>
              <ul className="text-base md:text-lg grid md:grid-cols-2 gap-3 text-gray-800">
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

            <div className="text-base md:text-xl bg-blue-50 border-l-4 border-kreator-blue p-6 my-6">
              <p className="font-semibold text-kreator-blue mb-2">💡 Ejemplo:</p>
              <p className="text-gray-700">
                El hermano de tu compañero puede necesitar tu servicio, o la empresa del padre de otro puede
                contratarte. Con Kreator, esas conexiones se convierten en clientes reales.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-2xl text-kreator-blue mb-4">
                Además de ampliar tu red, puedes generar ingresos de dos formas:
              </h3>
              <ol className="text-base md:text-xl list-decimal list-inside space-y-3 ml-4">
                <li className="text-gray-700">
                  Cada nuevo/a profesional que invites a la red reduce tu cuota mes a mes (hasta incluso generar saldo
                  positivo).
                </li>
                <li className="text-gray-700">
                  Cada trabajo que refieras a otros/as compañeros/as te aporta una comisión inmediata.
                </li>
              </ol>
            </div>

            <div className="bg-kreator-blue text-white p-6 rounded-lg text-center mt-8">
              <p className="text-lg md:text-xl font-bold">
                El resultado: más clientes, más ingresos y una red sólida de apoyo comercial en tu zona.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden">
        <SectionDivider color="var(--kreator-yellow)" />
      </div>
    </div>
  )
}
