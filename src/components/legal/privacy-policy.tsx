import type { Metadata } from "next"
import { Shield, Eye, Download, Trash2, Edit, Ban } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Política de Privacidad | Kreator",
  description:
    "Política de privacidad de Kreator - Información sobre el tratamiento de datos personales conforme al RGPD y LOPDGDD.",
  robots: "index, follow",
}

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl text-center font-bold mt-4 text-balance">Política de Privacidad</h1>
          <p className="text-primary-foreground/80 text-center mt-2">Conforme al RGPD y LOPDGDD</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Compromiso con la Privacidad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En Kreator respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política
                  explica cómo recopilamos, utilizamos y protegemos tu información conforme al Reglamento General de
                  Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de los Derechos
                  Digitales (LOPDGDD).
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Responsable del Tratamiento</h2>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="font-medium text-foreground mb-2">Responsable:</p>
                  <p className="text-muted-foreground mb-4">Kreator Synergies S.L.U.</p>

                  <p className="font-medium text-foreground mb-2">NIF/CIF:</p>
                  <p className="text-muted-foreground mb-4">B55460612</p>

                  <p className="font-medium text-foreground mb-2">Dirección:</p>
                  <p className="text-muted-foreground mb-4">Calle Santa María 11, 1C, 17230 Palamós (Girona), España</p>

                  <p className="font-medium text-foreground mb-2">Email de contacto:</p>
                  <p className="text-muted-foreground mb-4">info@kreator.team</p>

                  <p className="font-medium text-foreground mb-2">Delegado de Protección de Datos (DPO):</p>
                  <p className="text-muted-foreground">info@kreator.team</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Datos que Recopilamos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Recopilamos los siguientes tipos de datos personales cuando utilizas nuestra plataforma:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-secondary pl-4">
                    <h3 className="text-lg font-medium text-foreground mb-2">Datos de Identificación</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Nombre y apellidos</li>
                      <li>Documento de identidad (DNI/NIE/CIF)</li>
                      <li>Correo electrónico</li>
                      <li>Número de teléfono</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <h3 className="text-lg font-medium text-foreground mb-2">Datos Profesionales</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Empresa y cargo</li>
                      <li>Sector de actividad</li>
                      <li>Información de contacto profesional</li>
                      <li>Experiencia y especialización</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <h3 className="text-lg font-medium text-foreground mb-2">Datos de Navegación</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Dirección IP</li>
                      <li>Información del navegador y dispositivo</li>
                      <li>Páginas visitadas y tiempo de navegación</li>
                      <li>Cookies y tecnologías similares</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Finalidades del Tratamiento</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Utilizamos tus datos personales para las siguientes finalidades:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Prestación del Servicio</h4>
                    <p className="text-sm text-muted-foreground">
                      Facilitar el networking profesional y la generación de referrals entre usuarios de la plataforma.
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Comunicación</h4>
                    <p className="text-sm text-muted-foreground">
                      Envío de notificaciones, actualizaciones del servicio y comunicaciones relacionadas con tu cuenta.
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Mejora del Servicio</h4>
                    <p className="text-sm text-muted-foreground">
                      Análisis de uso para mejorar la funcionalidad y experiencia de usuario de la plataforma.
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Cumplimiento Legal</h4>
                    <p className="text-sm text-muted-foreground">
                      Cumplimiento de obligaciones legales y regulatorias aplicables.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Base Legal del Tratamiento</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">El tratamiento de tus datos se basa en:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>
                    <strong>Consentimiento:</strong> Para el registro en la plataforma y comunicaciones comerciales
                  </li>
                  <li>
                    <strong>Ejecución contractual:</strong> Para la prestación de los servicios solicitados
                  </li>
                  <li>
                    <strong>Interés legítimo:</strong> Para la mejora del servicio y análisis de uso
                  </li>
                  <li>
                    <strong>Cumplimiento legal:</strong> Para el cumplimiento de obligaciones legales
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Tus Derechos</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Como titular de los datos, tienes los siguientes derechos que puedes ejercer contactando con nosotros:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Eye className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Derecho de Acceso</h4>
                      <p className="text-sm text-muted-foreground">
                        Conocer qué datos tenemos sobre ti y cómo los utilizamos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Edit className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Derecho de Rectificación</h4>
                      <p className="text-sm text-muted-foreground">Corregir datos inexactos o incompletos.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Trash2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Derecho de Supresión</h4>
                      <p className="text-sm text-muted-foreground">Solicitar la eliminación de tus datos personales.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Download className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Derecho de Portabilidad</h4>
                      <p className="text-sm text-muted-foreground">
                        Recibir tus datos en formato estructurado y legible.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Ban className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Derecho de Limitación</h4>
                      <p className="text-sm text-muted-foreground">
                        Restringir el tratamiento de tus datos en ciertos casos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Shield className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Derecho de Oposición</h4>
                      <p className="text-sm text-muted-foreground">
                        Oponerte al tratamiento de tus datos por motivos legítimos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Para ejercer tus derechos:</strong> Envía un email a <strong>info@kreator.team</strong>{" "}
                    adjuntando copia de tu documento de identidad. Responderemos en un plazo máximo de 30 días.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Cookies y Tecnologías de Seguimiento</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestra plataforma:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-medium text-foreground mb-2">Cookies Técnicas</h4>
                    <p className="text-muted-foreground text-sm">
                      Necesarias para el funcionamiento básico de la plataforma (sesión, preferencias, seguridad).
                    </p>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-medium text-foreground mb-2">Cookies Analíticas</h4>
                    <p className="text-muted-foreground text-sm">
                      Google Analytics para analizar el uso de la plataforma y mejorar nuestros servicios.
                    </p>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-medium text-foreground mb-2">Cookies de Personalización</h4>
                    <p className="text-muted-foreground text-sm">
                      Para recordar tus preferencias y personalizar tu experiencia.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  Puedes gestionar las cookies desde la configuración de tu navegador. Ten en cuenta que deshabilitar
                  ciertas cookies puede afectar la funcionalidad de la plataforma.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Conservación de Datos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades para las
                  que fueron recopilados:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>
                    <strong>Datos de cuenta:</strong> Mientras mantengas tu cuenta activa
                  </li>
                  <li>
                    <strong>Datos de comunicación:</strong> 3 años desde la última comunicación
                  </li>
                  <li>
                    <strong>Datos de navegación:</strong> 2 años desde la recopilación
                  </li>
                  <li>
                    <strong>Datos legales:</strong> Según los plazos establecidos por la legislación aplicable
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Seguridad de los Datos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra el
                  acceso no autorizado, la alteración, divulgación o destrucción, incluyendo:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Cifrado de datos en tránsito y en reposo</li>
                  <li>Control de acceso basado en roles</li>
                  <li>Auditorías regulares de seguridad</li>
                  <li>Formación del personal en protección de datos</li>
                  <li>Planes de respuesta ante incidentes de seguridad</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">9. Transferencias Internacionales</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En caso de realizar transferencias internacionales de datos, nos aseguraremos de que se realicen con
                  las garantías adecuadas conforme al RGPD, incluyendo decisiones de adecuación de la Comisión Europea o
                  cláusulas contractuales tipo.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">10. Modificaciones de la Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos cualquier cambio
                  significativo por email o mediante un aviso destacado en nuestra plataforma. Te recomendamos revisar
                  esta política periódicamente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">11. Contacto y Reclamaciones</h2>
                <div className="bg-muted/50 p-6 rounded-lg mb-4">
                  <p className="text-muted-foreground mb-4">
                    Para cualquier consulta sobre esta política de privacidad o el tratamiento de tus datos:
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Email:</strong> info@kreator.team
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>DPO:</strong> info@kreator.team
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Dirección postal:</strong> Calle Santa María 11, 1C, 17230 Palamós (Girona), España
                  </p>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Derecho a reclamar:</strong> Si consideras que el tratamiento de tus datos no se ajusta a la
                    normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD)
                    en <strong>www.aepd.es</strong>
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
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="legal" size="sm">
              <Link href="/#inicio">
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
