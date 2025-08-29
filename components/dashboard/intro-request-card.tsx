"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign } from "lucide-react"

interface IntroRequest {
  id: string
  company?: string
  talent?: string
  role: string
  message: string
  budget: string
  time: string
  status: "pending" | "accepted" | "declined" | "responded"
  avatar?: string
}

interface IntroRequestCardProps {
  request: IntroRequest
  type: "worker" | "employer"
  onAccept?: (id: string) => void
  onDecline?: (id: string) => void
  className?: string
}

export function IntroRequestCard({ request, type, onAccept, onDecline, className }: IntroRequestCardProps) {
  const displayName = type === "worker" ? request.company : request.talent

  return (
    <Card className={`border border-border ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            {type === "employer" && request.avatar && (
              <Avatar className="h-10 w-10">
                <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.talent} />
                <AvatarFallback>
                  {request.talent
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <h4 className="font-semibold text-foreground">{displayName}</h4>
              <p className="text-sm text-muted-foreground">{request.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                request.status === "pending"
                  ? "secondary"
                  : request.status === "accepted" || request.status === "responded"
                    ? "default"
                    : "outline"
              }
            >
              {request.status}
            </Badge>
            <span className="text-xs text-muted-foreground">{request.time}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-2">{request.message}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <DollarSign className="h-4 w-4" />
            {request.budget}
          </div>

          {request.status === "pending" && type === "worker" && onAccept && onDecline && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onDecline(request.id)}>
                Decline
              </Button>
              <Button size="sm" onClick={() => onAccept(request.id)}>
                Accept
              </Button>
            </div>
          )}

          {request.status === "responded" && type === "employer" && (
            <Button size="sm" variant="outline">
              View Conversation
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
