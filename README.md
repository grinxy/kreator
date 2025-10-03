# Kreator Landing Page

Landing page profesional para **Kreator**, la plataforma que conecta profesionales industriales para generar *referrals* y hacer crecer negocios.

## 🚀 Características

- **Next.js 14.2.16** con App Router  
- **React 18** y **React DOM 18**  
- **TypeScript 5** estricto para type safety  
- **Tailwind CSS 4.1.9** para estilos modernos  
- **Estructura de componentes clara** (UI, Layout, Sections, Registration)  
- **Accesibilidad completa** (WAI-ARIA, navegación por teclado)  
- **Responsive design** (mínimo 300px de ancho)  
- **Tests unitarios** con Vitest + React Testing Library  
- **Tests E2E** con Playwright  

## 🛠️ Instalación y Desarrollo

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Construir para producción
pnpm build

# Ejecutar en producción
pnpm start
```

## 🧪 Testing

```bash
# Tests unitarios
pnpm test

# Tests unitarios en modo watch
pnpm test:watch

# Tests E2E
pnpm test:e2e

# Tests E2E con interfaz visual
pnpm test:e2e:ui
```

## 📁 Estructura del Proyecto

```bash
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página de inicio
│   └── globals.css      # Estilos globales
├── components/          # Componentes reutilizables
│   ├── layout/          # Navbar, footer, header, mobile menu
│   ├── registration/    # Formulario y sección de registro
│   ├── sections/        # Bloques de la landing (hero, features, testimonials, cta)
│   └── ui/              # Elementos pequeños (botones, inputs, badges…)
├── data/                # Datos tipados para contenido
│   ├── features.ts
│   ├── stats.ts
│   └── testimonials.ts
├── hooks/               # Custom hooks
├── lib/                 # Utilidades y lógica auxiliar
```

Otras carpetas relevantes:

```bash
e2e/          # Tests end-to-end
__tests__/    # Tests unitarios
public/       # Assets estáticos (imágenes, favicons, etc.)
```

## 🎯 Accesibilidad

La landing page cumple con las mejores prácticas de accesibilidad:

- ✅ Navegación 100% por teclado  
- ✅ Focus visible en todos los elementos interactivos  
- ✅ ARIA labels y roles apropiados  
- ✅ Estructura semántica HTML5  
- ✅ Contraste de colores WCAG AA  
- ✅ Textos alternativos para imágenes  
- ✅ Focus trap en menú móvil  

## 🎨 Branding

Los colores de marca están definidos en `src/app/globals.css`:

- **Azul Principal**: #003c71  
- **Naranja Acento**: #FFA00E  
- **Grises**: Para textos y fondos  

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado desde 300px  
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)  
- **Componentes fluidos**: Se adaptan automáticamente al tamaño de pantalla  

## 🔧 Scripts Disponibles

- `pnpm dev` - Servidor de desarrollo  
- `pnpm build` - Construcción para producción  
- `pnpm start` - Servidor de producción  
- `pnpm lint` - Linting con ESLint  
- `pnpm test` - Tests unitarios  
- `pnpm test:e2e` - Tests end-to-end  

## 👥 Colaboradores

Proyecto creado y mantenido por:

- [Mónica](https://github.com/grinxy)  
- [Aless](https://github.com/AlessHub)  
- [Jess](https://github.com/jess-ar)

## 📄 Licencia

© 2025 Kreator. Todos los derechos reservados.

