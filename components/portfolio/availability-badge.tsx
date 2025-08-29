import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Calendar } from "lucide-react"

interface AvailabilityBadgeProps {
  status: "full-time" | "contract" | "fractional" | "not-available"
  className?: string
}

export function AvailabilityBadge({ status, className }: AvailabilityBadgeProps) {
  const config = {
    "full-time": {
      label: "Full-time",
      variant: "default" as const,
      icon: CheckCircle,
    },
    contract: {
      label: "Contract",
      variant: "secondary" as const,
      icon: Calendar,
    },
    fractional: {
      label: "Fractional",
      variant: "secondary" as const,
      icon: Clock,
    },
    "not-available": {
      label: "Not Available",
      variant: "outline" as const,
      icon: XCircle,
    },
  }

  const { label, variant, icon: Icon } = config[status]

  return (
    <Badge variant={variant} className={className}>
      <Icon className="mr-1 h-3 w-3" />
      {label}
    </Badge>
  )
}
