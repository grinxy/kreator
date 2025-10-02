import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfilesSection() {
  return (
    <section id="perfiles" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-kreator-blue mb-12 text-center">Elige tu Perfil</h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Profesional Card */}
          <Card className="border-2 border-kreator-blue hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-kreator-gradient-blue py-3 text-white">
              <CardTitle className="text-2xl">Profesional</CardTitle>
              <CardDescription className="text-gray-200">
                Perfecto para autónomos y pymes que quieren aumentar ventas.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-kreator-yellow font-bold">✓</span>
                  <span className="text-gray-700">Accedes a clientes compartidos gracias a tu equipo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-kreator-yellow font-bold">✓</span>
                  <span className="text-gray-700">Puedes ganar dinero recomendando trabajos a otros compañeros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-kreator-yellow font-bold">✓</span>
                  <span className="text-gray-700">
                    Tus comisiones reducen tu cuota mensual... ¡y si superan tu cuota, incluso generas ingresos!
                  </span>
                </li>
              </ul>

              <div className="bg-kreator-gray-light p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-kreator-blue">Cuota de inscripción</span>
                  <span className="text-xl font-bold text-kreator-blue">80 € + IVA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-kreator-blue">Cuota mensual</span>
                  <span className="text-xl font-bold text-kreator-blue">40 € + IVA</span>
                </div>
                <p className="text-sm text-gray-600 text-center mt-2">(sin permanencia)</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-kreator-yellow hover:bg-kreator-orange text-white font-semibold py-6 text-lg transition-all duration-200 hover:scale-105"
                data-analytics="profile-professional-register"
              >
                <Link href="/registro?perfil=profesional">Registrarme como Profesional</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Team Leader Card */}
          <Card className="border-2 border-kreator-yellow hover:shadow-2xl transition-shadow duration-300 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-kreator-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
              Liderazgo
            </div>
            <CardHeader className="py-3 bg-kreator-gradient-yellow to-kreator-orange text-white">
              <CardTitle className="text-2xl">Jefe de Equipo</CardTitle>
              <CardDescription className="text-gray-100">
                Para profesionales con red de contactos y liderazgo.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-kreator-yellow font-bold">✓</span>
                  <span className="text-gray-700">
                    Te conviertes en la figura de referencia en tu zona y lideras un grupo de profesionales
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-kreator-yellow font-bold">✓</span>
                  <span className="text-gray-700">
                    Comisiones más altas: cada profesional directo que sumes te acerca a cuota cero (o incluso saldo
                    positivo)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-kreator-yellow font-bold">✓</span>
                  <span className="text-gray-700">Ingresos extra por los negocios que refieras dentro del equipo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-kreator-yellow font-bold">✓</span>
                  <span className="text-gray-700">
                    Mayor visibilidad y prestigio: eres el punto de conexión entre sectores en tu zona
                  </span>
                </li>
              </ul>

              <div className="bg-kreator-gray-light p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-kreator-blue">Cuota de inscripción</span>
                  <span className="text-xl font-bold text-kreator-blue">250 € + IVA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-kreator-blue">Cuota mensual</span>
                  <span className="text-xl font-bold text-kreator-blue">60 € + IVA</span>
                </div>
                <p className="text-sm text-gray-600 text-center mt-2">(sin permanencia)</p>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border-l-4 border-kreator-blue text-sm text-gray-700">
                <p className="font-semibold mb-1">Nota:</p>
                <p>
                  Cuota de inscripción inicial 80 € + IVA como profesional. En caso de ser elegido como jefe de equipo,
                  se abonarán los 170 € + IVA restantes.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-kreator-blue hover:bg-[#002A52] text-white font-semibold py-6 text-lg transition-all duration-200 hover:scale-105"
                data-analytics="profile-team-leader-apply"
              >
                <Link href="/registro?perfil=jefe-equipo">Postularme como Jefe de Equipo</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
