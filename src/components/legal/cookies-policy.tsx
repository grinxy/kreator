import type { Metadata } from "next"
import Link from "next/link"
import { Cookie, Settings, BarChart3, Target, Globe, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Política de Cookies | Kreator",
  description:
    "Política de cookies de Kreator - Información sobre el uso de cookies y tecnologías similares en nuestra plataforma.",
  robots: "index, follow",
}

export function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mt-4 text-center text-balance">Política de Cookies</h1>
          <p className="text-primary-foreground/80 mt-2 text-center">Información sobre el uso de cookies en Kreator</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <section className="mb-8">
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Cookie className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Introducción</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    En Kreator utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación,
                    analizar el uso de nuestra plataforma y personalizar el contenido que te mostramos.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Esta política explica qué son las cookies, qué tipos utilizamos en nuestra web y cómo puedes
                    gestionarlas según tus preferencias. Al utilizar nuestra plataforma, aceptas el uso de cookies de
                    acuerdo con esta política.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Tipos de Cookies Utilizadas
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                En Kreator utilizamos diferentes tipos de cookies según su finalidad y funcionalidad:
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Cookies Técnicas o Necesarias</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Son esenciales para el correcto funcionamiento de la plataforma. Permiten la navegación y el uso de
                    las diferentes funcionalidades, como el acceso a áreas seguras o la gestión de tu sesión.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Ejemplos:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li>Cookies de sesión de usuario</li>
                      <li>Cookies de seguridad y autenticación</li>
                      <li>Cookies de preferencias de idioma</li>
                      <li>Cookies de carrito de compra (si aplica)</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3">
                      <strong>Duración:</strong> Sesión o hasta 1 año
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Cookies de Preferencias o Personalización
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Permiten recordar información para que accedas al servicio con determinadas características que
                    pueden diferenciar tu experiencia de la de otros usuarios, como el idioma, el número de resultados a
                    mostrar o el aspecto del servicio.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Ejemplos:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li>Preferencias de visualización (modo oscuro/claro)</li>
                      <li>Configuración de notificaciones</li>
                      <li>Preferencias de idioma y región</li>
                      <li>Configuración de privacidad personalizada</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3">
                      <strong>Duración:</strong> Hasta 2 años
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Cookies de Análisis o Estadísticas
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Nos permiten cuantificar el número de usuarios y realizar análisis estadísticos del uso que hacen
                    los usuarios de nuestros servicios. Para ello analizamos tu navegación en nuestra web con el fin de
                    mejorar la oferta de productos o servicios que te ofrecemos.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Ejemplos:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li>Google Analytics (análisis de tráfico y comportamiento)</li>
                      <li>Métricas de rendimiento de la plataforma</li>
                      <li>Análisis de páginas más visitadas</li>
                      <li>Tiempo de permanencia en la web</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3">
                      <strong>Duración:</strong> Hasta 2 años
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Cookies de Marketing o Publicidad
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Permiten gestionar de la forma más eficaz posible los espacios publicitarios que se incluyen en
                    nuestra web. Estas cookies almacenan información del comportamiento de los usuarios obtenida a
                    través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un
                    perfil específico para mostrar publicidad en función del mismo.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Ejemplos:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li>Cookies de redes sociales (Facebook, LinkedIn, Twitter)</li>
                      <li>Cookies de remarketing (Google Ads, Facebook Pixel)</li>
                      <li>Cookies de seguimiento de conversiones</li>
                      <li>Cookies de personalización de anuncios</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3">
                      <strong>Duración:</strong> Hasta 2 años
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6" />
                Cookies de Terceros
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Además de nuestras propias cookies, utilizamos servicios de terceros que pueden instalar cookies en tu
                dispositivo cuando visitas nuestra plataforma. Estos terceros tienen sus propias políticas de privacidad
                y cookies.
              </p>

              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Google Analytics</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Utilizamos Google Analytics para analizar el uso de nuestra web y obtener estadísticas sobre el
                    comportamiento de los usuarios.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Más información:</strong>{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline"
                    >
                      Política de privacidad de Google
                    </a>
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Redes Sociales</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Nuestra web puede incluir plugins de redes sociales (Facebook, LinkedIn, Twitter, Instagram) que
                    pueden instalar cookies para facilitar la interacción con estas plataformas.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Te recomendamos revisar las políticas de privacidad de cada red social para conocer cómo gestionan
                    tus datos.
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Servicios de Marketing</h4>
                  <p className="text-sm text-muted-foreground">
                    Podemos utilizar servicios de terceros como Google Ads, Facebook Pixel u otras plataformas de
                    marketing digital que instalan cookies para medir la efectividad de nuestras campañas publicitarias
                    y personalizar los anuncios que te mostramos.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Gestión de Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tienes el control total sobre las cookies que se instalan en tu dispositivo. Puedes gestionar tus
                preferencias de las siguientes formas:
              </p>

              <div className="space-y-4">
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">1. Banner de Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    La primera vez que visitas nuestra web, te mostramos un banner donde puedes aceptar o rechazar las
                    cookies no esenciales. Puedes modificar tus preferencias en cualquier momento desde el enlace
                    "Configurar cookies" disponible en el pie de página.
                  </p>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">2. Configuración del Navegador</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Puedes configurar tu navegador para aceptar, rechazar o eliminar cookies. A continuación te
                    indicamos cómo hacerlo en los navegadores más comunes:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                    <li>
                      <strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de
                      sitios
                    </li>
                    <li>
                      <strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio
                    </li>
                    <li>
                      <strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web
                    </li>
                    <li>
                      <strong>Microsoft Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies y
                      permisos del sitio
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Importante:</strong> Ten en cuenta que si deshabilitas las cookies técnicas o necesarias,
                    algunas funcionalidades de la plataforma pueden no funcionar correctamente. Las cookies de
                    preferencias, análisis y marketing son opcionales y puedes deshabilitarlas sin afectar el
                    funcionamiento básico de la web.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Cambios en la Política de Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Kreator se reserva el derecho a modificar esta Política de Cookies en cualquier momento para adaptarla a
                cambios legislativos, jurisprudenciales o en nuestra forma de operar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cuando realicemos cambios significativos en esta política, te lo notificaremos mediante un aviso
                destacado en nuestra plataforma o por correo electrónico. Te recomendamos revisar esta política
                periódicamente para estar informado sobre cómo utilizamos las cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6" />
                Contacto
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Si tienes alguna duda sobre esta Política de Cookies o sobre cómo gestionamos las cookies en nuestra
                plataforma, puedes contactarnos en:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-muted-foreground mb-2">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@kreator.com" className="text-secondary hover:underline">
                    info@kreator.com
                  </a>
                </p>
                <p className="text-muted-foreground">
                  <strong>Responsable:</strong> Kreator - Plataforma de Networking Profesional
                </p>
              </div>
            </section>

            <div className="pt-6 border-t border-border">
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
