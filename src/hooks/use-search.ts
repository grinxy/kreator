/**
 * Filtro inteligente para estructuras anidadas tipo:
 * { grupo: [elementos] } → ejemplo: { "Valencia": ["Horta Nord", "Safor", ...] }
 */
export function useSearchFilter() {
  function filterNestedData(
    data: Record<string, string[]>,
    search: string
  ): Record<string, string[]> {
    const term = search.toLowerCase().trim()
    if (!term) return data // sin texto, devuelve todo

    const filtered: Record<string, string[]> = {}

    for (const [group, items] of Object.entries(data)) {
      const groupMatches = group.toLowerCase().includes(term)
      const matchingItems = items.filter(item =>
        item.toLowerCase().includes(term)
      )

      // si el grupo o alguno de sus elementos coincide, lo mantenemos
      if (groupMatches || matchingItems.length > 0) {
        filtered[group] = groupMatches ? items : matchingItems
      }
    }

    // Si no hubo coincidencias, devuelve vacío (no todo)
    return Object.keys(filtered).length > 0 ? filtered : {}
  }

  return { filterNestedData }
}
