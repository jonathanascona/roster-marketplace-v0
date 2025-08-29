"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface SearchFiltersProps {
  selectedSkills: string[]
  selectedAvailability: string[]
  selectedLocation: string
  rateRange: number[]
  allSkills: string[]
  onSkillToggle: (skill: string) => void
  onAvailabilityToggle: (availability: string) => void
  onLocationChange: (location: string) => void
  onRateRangeChange: (range: number[]) => void
  onClearFilters: () => void
}

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

export function SearchFilters({
  selectedSkills,
  selectedAvailability,
  selectedLocation,
  rateRange,
  allSkills,
  onSkillToggle,
  onAvailabilityToggle,
  onLocationChange,
  onRateRangeChange,
  onClearFilters,
}: SearchFiltersProps) {
  return (
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
                  onCheckedChange={() => onSkillToggle(skill)}
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
                  onCheckedChange={() => onAvailabilityToggle(option.value)}
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
          <Select value={selectedLocation} onValueChange={onLocationChange}>
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
              onValueChange={onRateRangeChange}
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
        <Button variant="outline" onClick={onClearFilters} className="w-full bg-transparent">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
