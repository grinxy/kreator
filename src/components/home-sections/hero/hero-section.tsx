import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section id="inicio" className="py-30 bg-kreator-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">
            Conecta, Refiere y <span className="text-kreator-yellow">Haz Crecer</span> Tu Negocio Industrial
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            La plataforma líder que conecta profesionales industriales para generar referrals de calidad y expandir tu
            red de contactos estratégicos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant={"primary"} className="cursor-pointer py-6.5 text-lg">
              Comenzar Ahora
            </Button>
            <Button variant={"outline"} className="cursor-pointer py-6 text-lg">
              Ver Demo
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-white/80">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-kreator-yellow mr-2">10,000+</span>
              <span>Profesionales</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-kreator-yellow mr-2">500+</span>
              <span>Empresas</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-kreator-yellow mr-2">95%</span>
              <span>Satisfacción</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
