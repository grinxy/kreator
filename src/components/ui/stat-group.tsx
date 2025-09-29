import { Stat } from "@/components/ui/stat"
import { stats } from "@/data/stats"

export function StatGroup() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, index) => (
        <Stat key={index} value={stat.value} label={stat.label} />
      ))}
    </div>
  )
}
