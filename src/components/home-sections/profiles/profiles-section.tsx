import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionWrapper } from "@/components/layout/section-wrapper"

export function ProfilesSection() {
  return (
    <SectionWrapper id="perfiles" className="bg-white" innerClassName="py-10 md:py-16">
      <h2 className="text-2xl md:text-4xl font-bold text-kreator-blue text-center mb-8 sm:mb-12">
        Elige tu perfil
      </h2>

      <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {/* Profesional */}
        <Card className="border-2 border-kreator-blue hover:shadow-2xl transition-shadow">
          <CardHeader className="bg-kreator-gradient-blue py-3 text-white">
            <CardTitle className="text-xl md:text-2xl">Profesional</CardTitle>
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
                  Tus comisiones reducen tu cuota mensual… ¡y si la superan, generas ingresos!
                </span>
              </li>
            </ul>

            <div className="bg-kreator-gray-light p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-kreator-blue">Cuota de inscripción</span>
                <span className="text-lg sm:text-xl font-bold text-kreator-blue">80 € + IVA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-kreator-blue">Cuota mensual</span>
                <span className="text-lg sm:text-xl font-bold text-kreator-blue">40 € + IVA</span>
              </div>
              <p className="text-sm text-gray-600 text-center mt-2">(sin permanencia)</p>
            </div>
          </CardContent>

          <CardFooter>
            <Button asChild variant="profileYellow" className="w-full" data-analytics="profile-professional-register">
              <Link href="/registro?perfil=profesional">Soy profesional</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Team Leader */}
        <Card className="relative border-2 border-kreator-yellow hover:shadow-2xl transition-shadow">
          <div className="absolute left-1/2 -top-3 sm:-top-4 -translate-x-1/2 bg-kreator-yellow text-kreator-blue px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            Liderazgo
          </div>

          <CardHeader className="py-3 bg-kreator-gradient-yellow to-kreator-orange text-kreator-blue">
            <CardTitle className="text-xl sm:text-2xl">Jefe de Equipo</CardTitle>
            <CardDescription className="text-kreator-blue">
              Para profesionales con red de contactos y liderazgo.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-kreator-yellow font-bold">✓</span>
                <span className="text-gray-700">Lidera un grupo de profesionales en tu zona</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-kreator-yellow font-bold">✓</span>
                <span className="text-gray-700">Comisiones más altas por profesionales directos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-kreator-yellow font-bold">✓</span>
                <span className="text-gray-700">Ingresos extra por referidos del equipo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-kreator-yellow font-bold">✓</span>
                <span className="text-gray-700">Mayor visibilidad y prestigio en tu zona</span>
              </li>
            </ul>

            <div className="bg-kreator-gray-light p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-kreator-blue">Cuota de inscripción</span>
                <span className="text-lg sm:text-xl font-bold text-kreator-blue">250 € + IVA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-kreator-blue">Cuota mensual</span>
                <span className="text-lg sm:text-xl font-bold text-kreator-blue">60 € + IVA</span>
              </div>
              <p className="text-sm text-gray-600 text-center mt-2">(sin permanencia)</p>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border-l-4 border-kreator-blue text-sm text-gray-700">
              <p className="font-semibold mb-1">Nota:</p>
              <p>
                Inscripción inicial 80 € + IVA como profesional. Si eres elegido como jefe de equipo, se abonan 170 € +
                IVA adicionales.
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Button asChild variant="profileBlue" className="w-full" data-analytics="profile-team-leader-apply">
              <Link href="/registro?perfil=jefe-equipo">Ser jefe de equipo</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </SectionWrapper>
  )
}
