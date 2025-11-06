import { RegistrationForm } from "@/components/registration/RegistrationForm"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

export function RegistrationSection() {
  return (
    <SectionWrapper id="registro" className="py-16 bg-[var(--kreator-gray-light)]/60" aria-labelledby="registro-title">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0">
          {/* Text block on the left */}
          <div className="space-y-6 text-center lg:text-left">
            <h1
              id="registro-title"
              className="text-3xl lg:text-5xl text-[var(--kreator-blue)] font-[family-name:var(--font-poppins)]"
            >
              Únete a la Comunidad<br></br> Kreator
            </h1>

            <p className="text-lg text-[var(--kreator-gray-dark)] font-[family-name:var(--font-opensans)] leading-relaxed max-w-lg mx-auto lg:mx-0">
              Kreator es la primera{" "}
              <strong className="text-[var(--kreator-gray-dark)]">
                comunidad empresarial colaborativa por equipos
              </strong>
              , creada para <strong className="text-[var(--kreator-gray-dark)]">autónomos y pymes</strong> que quieren
              vender más, generar contactos de calidad y crecer en red.
            </p>

            <p className="text-base text-[var(--kreator-gray-dark)] font-[family-name:var(--font-opensans)] leading-relaxed max-w-lg mx-auto lg:mx-0">
              En cada equipo solo puede haber{" "}
              <strong className="text-[var(--kreator-gray-dark)]">un profesional por sector</strong>, lo que te
              garantiza visibilidad y elimina la competencia interna. Una misma zona puede tener{" "}
              <strong className="text-[var(--kreator-gray-dark)]">varios equipos</strong>, según el volumen de negocio
              disponible.
            </p>

            <ul className="space-y-3 pt-2 max-w-lg mx-auto flex flex-col items-center lg:items-start text-center lg:text-left">
              {[
                "Comisiones desde el primer mes",
                "Sin permanencia ni compromisos",
                "Equipos locales colaborativos",
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="inline-block size-5 flex-shrink-0 rounded-sm bg-[var(--kreator-blue)] text-white text-center leading-[20px] font-bold">
                    ✓
                  </span>
                  <span className="text-[var(--kreator-gray-dark)] text-base font-[family-name:var(--font-opensans)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form on the right */}
          <div>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
