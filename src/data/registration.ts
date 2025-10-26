import profesionalesData from "./profesionals-list.json"
import provinciasData from "./provinces.json"

// Type definitions for the data structures
type ProfesionesData = Record<string, string[]>

// New structure: Region -> Province -> Comarcas[]
type ProvinciasData = Record<string, Record<string, string[]>>

// Export profession categories and professions
export const professionCategories = Object.keys(profesionalesData as ProfesionesData)

export const professionsData = profesionalesData as ProfesionesData

// Get all professions as a flat array for backwards compatibility
export const professions = Object.values(profesionalesData as ProfesionesData).flat()

// Export region/province data
export const regionsData = provinciasData as ProvinciasData

// Get all region names
export const regions = Object.keys(provinciasData as ProvinciasData)

// Get all provinces from all regions
export const provinces = Object.entries(provinciasData as ProvinciasData).flatMap(([_, provincesObj]) =>
  Object.keys(provincesObj)
)

// Get all comarcas as a flat array
export const zones = Object.entries(provinciasData as ProvinciasData).flatMap(([_, provincesObj]) =>
  Object.values(provincesObj).flat()
)

export type ProfessionCategory = string
export type Profession = string
export type Region = string
export type Province = string
export type Zone = string