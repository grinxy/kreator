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
  "Ingeniero Industrial",
  "Técnico Industrial",
  "Director de Operaciones",
  "Gerente de Producción",
  "Consultor Industrial",
  "Especialista en Automatización",
  "Responsable de Calidad",
  "Jefe de Mantenimiento",
  "Otro",
] as const

export type Zone = typeof zones[number]
export type Profession = typeof professions[number]