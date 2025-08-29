import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Globe, Star } from "lucide-react"

interface WorkProof {
  id: string
  type: "github" | "kaggle" | "blog" | "tableau"
  title: string
  description: string
  url: string
  stars?: number
}

interface WorkProofCardProps {
  proof: WorkProof
  className?: string
}

export function WorkProofCard({ proof, className }: WorkProofCardProps) {
  const getIcon = () => {
    switch (proof.type) {
      case "github":
        return <Github className="h-5 w-5" />
      case "kaggle":
        return <div className="h-5 w-5 bg-primary rounded" />
      case "blog":
        return <Globe className="h-5 w-5" />
      case "tableau":
        return <div className="h-5 w-5 bg-accent rounded" />
      default:
        return <Globe className="h-5 w-5" />
    }
  }

  const getTypeLabel = () => {
    switch (proof.type) {
      case "github":
        return "GitHub"
      case "kaggle":
        return "Kaggle"
      case "blog":
        return "Blog"
      case "tableau":
        return "Tableau"
      default:
        return "Link"
    }
  }

  return (
    <Card className={`hover:bg-muted/50 transition-colors ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              {getIcon()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{proof.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {getTypeLabel()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{proof.description}</p>
              {proof.stars && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3" />
                  <span>{proof.stars} stars</span>
                </div>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href={proof.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
