import { Network, Target, TrendingUp, Building2, Handshake, Zap } from "lucide-react"

export interface Feature {
  readonly icon: typeof Network
  readonly title: string
  readonly description: string
}

export const features: readonly Feature[] = [
  {
    icon: Network,
    title: "Red Verificada",
    description: "Conecta con profesionales verificados de la industria con historial comprobado de éxito.",
  },
  {
    icon: Target,
    title: "Matching Inteligente",
    description: "Algoritmo avanzado que conecta automáticamente oportunidades relevantes para tu sector.",
  },
  {
    icon: TrendingUp,
    title: "Analytics Avanzado",
    description: "Métricas detalladas de tus referrals, conversiones y crecimiento de red profesional.",
  },
  {
    icon: Building2,
    title: "Sectores Especializados",
    description: "Enfoque específico en más de 50 sectores industriales con expertise especializado.",
  },
  {
    icon: Handshake,
    title: "Sistema de Referrals",
    description: "Plataforma integral para gestionar, rastrear y monetizar tus referencias profesionales.",
  },
  {
    icon: Zap,
    title: "Conexión Instantánea",
    description: "Conecta inmediatamente con profesionales relevantes mediante notificaciones en tiempo real.",
  },
] as const
