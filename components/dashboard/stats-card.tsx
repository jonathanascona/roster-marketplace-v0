import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  subtitle?: string
  className?: string
}

export function StatsCard({ title, value, icon: Icon, trend, subtitle, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
          <Icon className="h-8 w-8 text-primary" />
        </div>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${trend.positive ? "text-green-600" : "text-red-600"}`}>
            <span>{trend.value}</span>
          </div>
        )}
        {subtitle && (
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <span>{subtitle}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
