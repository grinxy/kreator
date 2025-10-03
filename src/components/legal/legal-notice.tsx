import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Aviso Legal | Kreator",
  description:
    "Aviso legal de Kreator - Información legal sobre el uso de nuestra plataforma de networking profesional industrial.",
  robots: "index, follow",
}

export function LegalNotice() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl text-center font-bold mt-4 text-balance">Aviso Legal</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Información General</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
                Información y de Comercio Electrónico, se informa a los usuarios de los datos identificativos de la
                empresa:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="font-medium text-foreground mb-2">Denominación social:</p>
                <p className="text-muted-foreground mb-4">[NOMBRE DE LA EMPRESA]</p>

                <p className="font-medium text-foreground mb-2">NIF/CIF:</p>
                <p className="text-muted-foreground mb-4">[CIF DE LA EMPRESA]</p>

                <p className="font-medium text-foreground mb-2">Domicilio social:</p>
                <p className="text-muted-foreground mb-4">[DIRECCIÓN COMPLETA]</p>

                <p className="font-medium text-foreground mb-2">Correo electrónico:</p>
                <p className="text-muted-foreground mb-4">legal@kreator.com</p>

                <p className="font-medium text-foreground mb-2">Teléfono:</p>
                <p className="text-muted-foreground">[TELÉFONO DE CONTACTO]</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Objeto y Ámbito de Aplicación</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El presente aviso legal regula el uso del sitio web <strong>kreator.com</strong> (en adelante, "la
                Plataforma"), propiedad de [NOMBRE DE LA EMPRESA], que pone a disposición de los usuarios de forma
                gratuita.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                La utilización de la Plataforma atribuye la condición de usuario e implica la aceptación plena de todas
                las cláusulas de este aviso legal. Si no está conforme con cualquiera de estas condiciones, no utilice
                esta Plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">3. Condiciones de Uso</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">3.1. Uso Permitido</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La Plataforma está destinada exclusivamente a profesionales del sector industrial para facilitar el
                    networking y la generación de referrals comerciales. El usuario se compromete a utilizar la
                    Plataforma de forma lícita y conforme a la legislación vigente.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">3.2. Prohibiciones</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Utilizar la Plataforma para fines ilícitos o no autorizados</li>
                    <li>Transmitir contenido ofensivo, difamatorio o que infrinja derechos de terceros</li>
                    <li>Intentar acceder a áreas restringidas del sistema</li>
                    <li>Interferir con el funcionamiento normal de la Plataforma</li>
                    <li>Utilizar la información obtenida para fines distintos al networking profesional</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">4. Propiedad Intelectual e Industrial</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Todos los contenidos de la Plataforma, incluyendo textos, imágenes, diseños, logotipos, código fuente y
                cualquier otro elemento, son propiedad de [NOMBRE DE LA EMPRESA] o de terceros que han autorizado su
                uso, y están protegidos por las leyes de propiedad intelectual e industrial.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra
                forma de explotación de dichos contenidos sin autorización expresa y por escrito del titular de los
                derechos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Responsabilidad</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                [NOMBRE DE LA EMPRESA] no se hace responsable de los daños y perjuicios que pudieran derivarse del uso
                incorrecto de la Plataforma, de la falta de disponibilidad o continuidad del funcionamiento de la misma,
                ni de los contenidos introducidos por los usuarios.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                La Plataforma puede contener enlaces a sitios web de terceros. [NOMBRE DE LA EMPRESA] no controla ni se
                hace responsable del contenido de dichos sitios web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Modificaciones</h2>
              <p className="text-muted-foreground leading-relaxed">
                [NOMBRE DE LA EMPRESA] se reserva el derecho de modificar el presente aviso legal en cualquier momento.
                Las modificaciones serán efectivas desde su publicación en la Plataforma. Se recomienda revisar
                periódicamente este documento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Legislación Aplicable y Jurisdicción</h2>
              <p className="text-muted-foreground leading-relaxed">
                El presente aviso legal se rige por la legislación española. Para la resolución de cualquier
                controversia que pudiera derivarse del acceso o uso de la Plataforma, las partes se someten expresamente
                a la jurisdicción de los Juzgados y Tribunales de [CIUDAD], renunciando a cualquier otro fuero que
                pudiera corresponderles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Para cualquier consulta relacionada con este aviso legal, puede contactar con nosotros a través de:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-muted-foreground mb-2">
                  <strong>Email:</strong> legal@kreator.com
                </p>
                <p className="text-muted-foreground">
                  <strong>Dirección postal:</strong> [DIRECCIÓN COMPLETA]
                </p>
              </div>
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
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
