import Link from "next/link"

export { Footer as default }
export function Footer() {
  return (
    <footer id="footer" className="bg-kreator-blue text-white py-12">
      <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img
              src="/logo-kreator-blue.png"
              alt="Kreator"
              className="h-8 w-auto mb-4 brightness-0 invert"
              width="96"
              height="32"
            />
            <p className="text-gray-300 leading-relaxed">
              La primera red empresarial exclusiva por zonas para profesionales y pymes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-kreator-yellow">Producto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#sobre-kreator" className="hover:text-kreator-yellow transition-colors duration-200">
                  Qué es Kreator
                </Link>
              </li>
              <li>
                <Link href="#como-funciona" className="hover:text-kreator-yellow transition-colors duration-200">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="#perfiles" className="hover:text-kreator-yellow transition-colors duration-200">
                  Perfiles y Precios
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-kreator-yellow">Empresa</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:text-kreator-yellow transition-colors duration-200">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-kreator-yellow transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="hover:text-kreator-yellow transition-colors duration-200">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-kreator-yellow">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/aviso-legal" className="hover:text-kreator-yellow transition-colors duration-200">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidad" className="hover:text-kreator-yellow transition-colors duration-200">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="hover:text-kreator-yellow transition-colors duration-200">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#004A8F] mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Kreator. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
