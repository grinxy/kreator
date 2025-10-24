export const zones = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Bilbao",
  "Málaga",
  "Zaragoza",
  "Murcia",
  "Palma",
  "Las Palmas",
  "Valladolid",
  "Córdoba",
] as const

export const professions = [
  "Ingeniero/a Industrial",
  "Técnico/a Industrial",
  "Director/a de Operaciones",
  "Gerente de Producción",
  "Consultor/a Industrial",
  "Especialista en Automatización",
  "Responsable de Calidad",
  "Jefe/a de Mantenimiento",
  "Otro",
] as const

export type Zone = typeof zones[number]
export type Profession = typeof professions[number]