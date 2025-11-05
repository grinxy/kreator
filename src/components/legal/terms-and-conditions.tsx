import type { Metadata } from "next"
import { FileText, Users, CreditCard, Shield, AlertTriangle, Network, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Kreator",
  description:
    "Términos y Condiciones del servicio de Kreator: registro, cuotas, referidos y uso de la plataforma profesional exclusiva por zonas.",
  robots: "index, follow",
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mt-4 text-balance">Términos y Condiciones del Servicio</h1>
          <p className="text-primary-foreground/80 mt-2">
            Normas de uso, registro y funcionamiento de la plataforma Kreator
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Objeto del Documento</h2>
                <p className="text-muted-foreground leading-relaxed">
                  El presente documento regula el acceso, registro y uso de la plataforma <strong>Kreator</strong>,
                  propiedad de Kreator Synergies S.L.U., así como las condiciones de contratación, pago y participación
                  en la red profesional exclusiva por zonas.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Información General</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de
                  Comercio Electrónico (LSSI-CE), se informa que la plataforma <strong>kreator.team</strong> es
                  propiedad de:
                </p>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="text-muted-foreground mb-1">
                    <strong>Denominación social:</strong> Kreator Synergies S.L.U.
                  </p>
                  <p className="text-muted-foreground mb-1">
                    <strong>NIF/CIF:</strong> B55460612
                  </p>
                  <p className="text-muted-foreground mb-1">
                    <strong>Domicilio social:</strong> Calle Santa María 11, 1C, 17230 Palamós (Girona), España
                  </p>
                  <p className="text-muted-foreground mb-1">
                    <strong>Correo electrónico:</strong> info@kreator.team
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Teléfono:</strong> +34 629 90 44 63
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Objeto del Servicio</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kreator ofrece una plataforma digital de networking profesional que conecta autónomos y pymes por
                  zonas geográficas, permitiendo la generación de oportunidades de negocio y comisiones entre sus
                  miembros.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Registro y Acceso</h2>
                <div className="flex items-start gap-3 mb-3">
                  <Users className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">
                    El registro en la plataforma es voluntario y requiere la aceptación de estos Términos y Condiciones,
                    así como de la{" "}
                    <Link href="/politica-privacidad" className="text-[var(--kreator-orange)] hover:underline">
                      Política de Privacidad
                    </Link>
                    . El usuario debe proporcionar información veraz, completa y actualizada.
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Kreator se reserva el derecho de suspender o eliminar cualquier cuenta que incumpla estas condiciones
                  o utilice la plataforma con fines ilícitos o contrarios a su propósito profesional.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Cuotas y Pagos</h2>
                <div className="flex items-start gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">
                    La inscripción en Kreator implica el pago de una cuota inicial y mensual según el perfil elegido:
                  </p>
                </div>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li>
                    <strong>Profesional:</strong> Inscripción 80 € + IVA | Mensualidad 40 € + IVA
                  </li>
                  <li>
                    <strong>Jefe de Equipo:</strong> Inscripción 250 € + IVA | Mensualidad 60 € + IVA
                  </li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Los pagos se gestionan de forma segura a través de <strong>Stripe</strong> u otros métodos
                  autorizados. No existe compromiso de permanencia, y el usuario puede cancelar su suscripción en
                  cualquier momento antes del siguiente ciclo de facturación.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Programa de Referidos</h2>
                <div className="flex items-start gap-3 mb-3">
                  <Network className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">
                    Kreator ofrece un sistema de referidos mediante el cual los usuarios registrados pueden obtener
                    comisiones mensuales recurrentes por cada nuevo miembro activo que se registre utilizando su enlace
                    o código de referido.
                  </p>
                </div>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li>Profesional: 10 €/mes por profesional referido activo</li>
                  <li>Jefe de Equipo: 20 €/mes por profesional directo activo</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Las comisiones se aplican automáticamente sobre la cuota mensual. Si el saldo neto resulta negativo,
                  se genera una autofactura positiva a favor del usuario.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Uso de la Plataforma</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Utilizar la plataforma con fines profesionales lícitos y respetuosos.</li>
                  <li>No publicar contenido ofensivo, engañoso o que infrinja derechos de terceros.</li>
                  <li>No suplantar identidades ni intentar acceder a áreas restringidas.</li>
                  <li>No compartir información privada de otros usuarios sin consentimiento.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Exclusividad por Zona y Sector</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cada profesional contará con exclusividad de su sector dentro del equipo al que pertenezca. Podrán
                  existir varios equipos en una misma zona geográfica, en función del tamaño o densidad del área (por
                  ejemplo, grandes zonas metropolitanas podrán incluir más de un equipo). La asignación del sector
                  dentro de cada equipo se realizará por orden de registro y validación, garantizando que ningún otro
                  miembro del mismo equipo represente el mismo sector. Kreator se reserva el derecho de revisar o
                  reasignar los sectores en caso de inactividad prolongada o incumplimiento de las normas internas.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Responsabilidad</h2>
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">
                    Kreator no se hace responsable de los acuerdos, negocios o transacciones que los usuarios realicen
                    entre sí a través de la plataforma. Cada usuario es responsable de la veracidad de la información
                    que comparte y del cumplimiento de sus compromisos profesionales.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">9. Cancelación y Baja</h2>
                <div className="flex items-start gap-3 mb-3">
                  <RefreshCcw className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">
                    El usuario puede cancelar su cuenta en cualquier momento desde su panel o contactando con soporte en{" "}
                    <strong>info@kreator.team</strong>. La baja no genera reembolsos de cuotas ya abonadas, salvo error
                    técnico imputable a la plataforma.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">10. Modificaciones del Servicio</h2>
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">
                    Kreator podrá actualizar o modificar las funcionalidades, tarifas o condiciones del servicio previa
                    notificación al usuario. Las modificaciones serán efectivas desde su publicación en la web o
                    comunicación directa al usuario registrado.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">11. Legislación y Jurisdicción</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estos Términos y Condiciones se rigen por la legislación española. Para cualquier controversia, las
                  partes se someten expresamente a los Juzgados y Tribunales de [CIUDAD], renunciando a cualquier otro
                  fuero que pudiera corresponderles.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Última actualización:{" "}
                  {new Date().toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="legal" size="sm">
              <Link href="/#inicio">Volver al Inicio</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
