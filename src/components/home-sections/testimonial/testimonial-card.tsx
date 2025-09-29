import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { Paragraph } from "@/components/ui/paragraph"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface TestimonialCardProps {
  readonly content: string
  readonly author: string
  readonly role: string
  readonly company: string
  readonly initials: string
}

export function TestimonialCard({ content, author, role, company, initials }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            ))}
            <VisuallyHidden>5 de 5 estrellas</VisuallyHidden>
          </div>

          <Paragraph className="text-muted-foreground italic">"{content}"</Paragraph>

          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-sm">{author}</div>
              <div className="text-xs text-muted-foreground">
                {role}, {company}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
