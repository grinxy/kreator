export function useSearchFilter() {
  function filterNestedData(
    data: Record<string, string[]>,
    search: string
  ): Record<string, string[]> {
    const term = search.toLowerCase().trim()
    if (!term) return data

    const filtered: Record<string, string[]> = {}

    for (const [group, items] of Object.entries(data)) {
      const groupMatches = group.toLowerCase().includes(term)
      const matchingItems = items.filter(item =>
        item.toLowerCase().includes(term)
      )

      // if the group or any of its elements match, we keep it
      if (groupMatches || matchingItems.length > 0) {
        filtered[group] = groupMatches ? items : matchingItems
      }
    }

    return Object.keys(filtered).length > 0 ? filtered : {}
  }

  return { filterNestedData }
}
