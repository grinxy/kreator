export interface Stat {
  readonly value: string
  readonly label: string
}

export const stats: readonly Stat[] = [
  {
    value: "5,000+",
    label: "Referrals Exitosos",
  },
  {
    value: "98%",
    label: "Satisfacción del Cliente",
  },
  {
    value: "50+",
    label: "Sectores Industriales",
  },
  {
    value: "24/7",
    label: "Soporte Especializado",
  },
] as const
