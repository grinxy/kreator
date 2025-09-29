import { Card, CardContent } from "@/components/ui/card"
import { IconWrapper } from "@/components/ui/icon-wrapper"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  readonly icon: LucideIcon
  readonly title: string
  readonly description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <IconWrapper icon={icon} size="xl" className="text-primary" />
          </div>
          <Heading level={3} className="text-lg">
            {title}
          </Heading>
          <Paragraph size="sm" className="text-muted-foreground">
            {description}
          </Paragraph>
        </div>
      </CardContent>
    </Card>
  )
}
