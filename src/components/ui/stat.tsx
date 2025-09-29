import { cn } from "@/lib/utils"

interface StatProps {
  readonly value: string
  readonly label: string
  readonly className?: string
}

export function Stat({ value, label, className }: StatProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-2xl md:text-3xl font-bold text-primary">{value}</div>
      <div className="text-sm md:text-base text-muted-foreground mt-1">{label}</div>
    </div>
  )
}
