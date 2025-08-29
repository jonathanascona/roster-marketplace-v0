"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, DollarSign, Star, Shield, Users, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { AvailabilityBadge } from "@/components/portfolio/availability-badge"
import { SkillTags } from "@/components/portfolio/skill-tags"

// Mock data - in real app this would come from API
const talentData = [
  {
    id: "1",
    username: "sarah-chen",
    name: "Sarah Chen",
    role: "Senior Data Engineer",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "San Francisco, CA",
    availability: "full-time" as const,
    hourlyRate: 175,
    salaryRange: "180k-220k",
    verified: true,
    rating: 4.9,
    skills: ["Python", "SQL", "Apache Spark", "AWS", "Docker", "Kubernetes"],
    responseTime: "< 2 hours",
  },
  {
    id: "2",
    username: "alex-rodriguez",
    name: "Alex Rodriguez",
    role: "ML Engineer",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "New York, NY",
    availability: "contract" as const,
    hourlyRate: 200,
    salaryRange: "200k-250k",
    verified: true,
    rating: 4.8,
    skills: ["Python", "TensorFlow", "PyTorch", "GCP", "Kubernetes", "MLOps"],
    responseTime: "< 4 hours",
  },
  {
    id: "3",
    username: "emily-wang",
    name: "Emily Wang",
    role: "Frontend Engineer",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Austin, TX",
    availability: "fractional" as const,
    hourlyRate: 150,
    salaryRange: "160k-190k",
    verified: true,
    rating: 4.7,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
    responseTime: "< 1 hour",
  },
  {
    id: "4",
    username: "david-kim",
    name: "David Kim",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Seattle, WA",
    availability: "full-time" as const,
    hourlyRate: 165,
    salaryRange: "170k-200k",
    verified: true,
    rating: 4.9,
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Python", "Go"],
    responseTime: "< 3 hours",
  },
  {
    id: "5",
    username: "maria-gonzalez",
    name: "Maria Gonzalez",
    role: "Product Designer",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Los Angeles, CA",
    availability: "contract" as const,
    hourlyRate: 140,
    salaryRange: "140k-170k",
    verified: true,
    rating: 4.8,
    skills: ["Figma", "Design Systems", "User Research", "Prototyping", "React"],
    responseTime: "< 2 hours",
  },
  {
    id: "6",
    username: "james-wilson",
    name: "James Wilson",
    role: "Backend Engineer",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Chicago, IL",
    availability: "full-time" as const,
    hourlyRate: 155,
    salaryRange: "150k-180k",
    verified: true,
    rating: 4.6,
    skills: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "TypeScript", "AWS"],
    responseTime: "< 4 hours",
  },
]

const availabilityOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "contract", label: "Contract" },
  { value: "fractional", label: "Fractional" },
]

const locationOptions = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Los Angeles, CA",
  "Chicago, IL",
  "Remote",
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [rateRange, setRateRange] = useState([100, 300])
  const [showFilters, setShowFilters] = useState(false)

  // Get all unique skills from talent data
  const allSkills = Array.from(new Set(talentData.flatMap((talent) => talent.skills))).sort()

  // Filter talent based on search criteria
  const filteredTalent = talentData.filter((talent) => {
    const matchesSearch =
      searchQuery === "" ||
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((skill) => talent.skills.includes(skill))

    const matchesAvailability = selectedAvailability.length === 0 || selectedAvailability.includes(talent.availability)

    const matchesLocation = selectedLocation === "" || talent.location === selectedLocation

    const matchesRate = talent.hourlyRate >= rateRange[0] && talent.hourlyRate <= rateRange[1]

    return matchesSearch && matchesSkills && matchesAvailability && matchesLocation && matchesRate
  })

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const toggleAvailability = (availability: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(availability) ? prev.filter((a) => a !== availability) : [...prev, availability],
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-foreground">Roster</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Talent</h1>
          <p className="text-muted-foreground">Discover verified professionals ready for your next project</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, role, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(selectedSkills.length > 0 ||
                selectedAvailability.length > 0 ||
                selectedLocation ||
                rateRange[0] > 100 ||
                rateRange[1] < 300) && (
                <Badge variant="secondary" className="ml-1">
                  {selectedSkills.length +
                    selectedAvailability.length +
                    (selectedLocation ? 1 : 0) +
                    (rateRange[0] > 100 || rateRange[1] < 300 ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  {/* Skills Filter */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Skills</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {allSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <label htmlFor={skill} className="text-sm cursor-pointer">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Availability</h3>
                    <div className="space-y-2">
                      {availabilityOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.value}
                            checked={selectedAvailability.includes(option.value)}
                            onCheckedChange={() => toggleAvailability(option.value)}
                          />
                          <label htmlFor={option.value} className="text-sm cursor-pointer">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Location</h3>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any location</SelectItem>
                        {locationOptions.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rate Range Filter */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Hourly Rate</h3>
                    <div className="space-y-4">
                      <Slider
                        value={rateRange}
                        onValueChange={setRateRange}
                        max={300}
                        min={50}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${rateRange[0]}/hr</span>
                        <span>${rateRange[1]}/hr</span>
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedSkills([])
                      setSelectedAvailability([])
                      setSelectedLocation("")
                      setRateRange([100, 300])
                    }}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredTalent.length} {filteredTalent.length === 1 ? "professional" : "professionals"} found
              </p>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="rate-low">Rate: Low to High</SelectItem>
                  <SelectItem value="rate-high">Rate: High to Low</SelectItem>
                  <SelectItem value="recent">Recently Joined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Talent Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTalent.map((talent) => (
                <Card key={talent.id} className="hover:shadow-lg transition-shadow cursor-pointer">
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

                          <div className="text-xs text-muted-foreground">Responds in {talent.responseTime}</div>
                        </div>

                        {/* CTA */}
                        <Button className="w-full" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTalent.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No talent found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find more professionals.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedSkills([])
                    setSelectedAvailability([])
                    setSelectedLocation("")
                    setRateRange([100, 300])
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
