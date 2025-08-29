import { Badge } from "@/components/ui/badge"

interface SkillTagsProps {
  skills: string[]
  limit?: number
  className?: string
}

export function SkillTags({ skills, limit, className }: SkillTagsProps) {
  const displaySkills = limit ? skills.slice(0, limit) : skills
  const remainingCount = limit && skills.length > limit ? skills.length - limit : 0

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displaySkills.map((skill) => (
        <Badge key={skill} variant="secondary" className="text-xs">
          {skill}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="outline" className="text-xs">
          +{remainingCount} more
        </Badge>
      )}
    </div>
  )
}
