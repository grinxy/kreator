"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <SectionWrapper
      id="inicio"
      className="relative flex flex-col justify-center items-center bg-kreator-blue text-white min-h-[90dvh]"
    >
      <div className="text-center max-w-6xl mx-auto mt-2 md:mt-14">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6 text-balance">
          Haz crecer tu negocio con la 1ª red por equipos, con{" "}
          <span className="text-kreator-yellow font-bold font-heading">exclusividad</span> de sector
        </h1>

        <h3 className="text-lg md:text-2xl mb-4 text-gray-100">Un solo profesional por sector en cada equipo.</h3>

        <h3 className="text-lg md:text-xl mb-8 text-gray-200">
          Multiplica tus oportunidades con los contactos y proyectos compartidos de tu equipo local.
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="cta" size="lg">
            <Link href="/registro" id="cta-hero-reserva" data-gtm="cta_hero_reserva">
              Reserva tu plaza ahora
            </Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-gray-300 font-semibold">Sin permanencia · Comisiones desde el primer mes</p>
      </div>

      {/* Yellow edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[7px] bg-kreator-yellow" />

      {/* Arrow */}
      <div className="mt-12 md:mt-20 flex justify-center">
        <Link
          href="#sobre-kreator"
          className="text-kreator-yellow hover:text-kreator-yellow/80 transition-colors duration-200 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 md:w-10 md:h-10" />
        </Link>
      </div>
    </SectionWrapper>
  )
}
