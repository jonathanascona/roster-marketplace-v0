import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, DollarSign, Star, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { AvailabilityBadge } from "@/components/portfolio/availability-badge"
import { SkillTags } from "@/components/portfolio/skill-tags"

interface TalentCardProps {
  talent: {
    id: string
    username: string
    name: string
    role: string
    avatar?: string
    location: string
    availability: "full-time" | "contract" | "fractional" | "not-available"
    hourlyRate: number
    verified: boolean
    rating: number
    skills: string[]
    responseTime: string
  }
  className?: string
}

export function TalentCard({ talent, className }: TalentCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${className}`}>
      <CardContent className="p-6">
        <Link href={`/profile/${talent.username}`}>
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
                <AvatarFallback>
                  {talent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground truncate">{talent.name}</h3>
                  {talent.verified && <Shield className="h-4 w-4 text-primary flex-shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground truncate">{talent.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-current text-yellow-500" />
                  <span className="text-xs text-muted-foreground">{talent.rating}</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <AvailabilityBadge status={talent.availability} />
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <DollarSign className="h-3 w-3" />${talent.hourlyRate}/hr
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {talent.location}
              </div>

              <SkillTags skills={talent.skills} limit={4} />

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                Responds in {talent.responseTime}
              </div>
            </div>

            {/* CTA */}
            <Button className="w-full" size="sm">
              View Profile
            </Button>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
