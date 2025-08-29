"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, ExternalLink, Github, Globe, Save, Eye, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function PortfolioEditor() {
  const [profile, setProfile] = useState({
    name: "Sarah Chen",
    role: "Senior Data Engineer",
    location: "San Francisco, CA",
    bio: "Passionate data engineer with 6+ years of experience building scalable data pipelines and ML infrastructure.",
    availability: "full-time",
    hourlyRate: "150-200",
    salaryRange: "180k-220k",
    skills: ["Python", "SQL", "Apache Spark", "AWS", "Docker"],
    workProofs: [
      {
        id: "1",
        type: "github",
        title: "Real-time Data Pipeline",
        description: "Scalable streaming data pipeline using Kafka and Spark",
        url: "https://github.com/sarahchen/data-pipeline",
      },
    ],
  })

  const [newSkill, setNewSkill] = useState("")
  const [newProof, setNewProof] = useState({
    type: "github",
    title: "",
    description: "",
    url: "",
  })
  const [linkCopied, setLinkCopied] = useState(false)

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const addWorkProof = () => {
    if (newProof.title && newProof.url) {
      setProfile((prev) => ({
        ...prev,
        workProofs: [...prev.workProofs, { ...newProof, id: Date.now().toString() }],
      }))
      setNewProof({ type: "github", title: "", description: "", url: "" })
    }
  }

  const removeWorkProof = (proofId: string) => {
    setProfile((prev) => ({
      ...prev,
      workProofs: prev.workProofs.filter((proof) => proof.id !== proofId),
    }))
  }

  const copyProfileLink = () => {
    navigator.clipboard.writeText(`https://roster.tech/${profile.name.toLowerCase().replace(" ", "-")}`)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-foreground">Roster</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/profile/${profile.name.toLowerCase().replace(" ", "-")}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Link>
              </Button>
              <Button size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Edit Portfolio</h1>
            <p className="text-muted-foreground">Update your profile to attract the right opportunities</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt={profile.name} />
                      <AvatarFallback className="text-lg">
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role/Title</Label>
                      <Input
                        id="role"
                        value={profile.role}
                        onChange={(e) => setProfile((prev) => ({ ...prev, role: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell employers about your experience, skills, and what you're looking for..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g., Python, React, AWS)"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Work Proofs */}
              <Card>
                <CardHeader>
                  <CardTitle>Work Proofs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.workProofs.map((proof) => (
                    <div key={proof.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            {proof.type === "github" && <Github className="h-5 w-5" />}
                            {proof.type === "blog" && <Globe className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{proof.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{proof.description}</p>
                            <a
                              href={proof.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              {proof.url}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeWorkProof(proof.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Add New Proof */}
                  <div className="border border-dashed border-border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Add Work Proof</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={newProof.type}
                          onValueChange={(value) => setNewProof((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="github">GitHub Repository</SelectItem>
                            <SelectItem value="kaggle">Kaggle Notebook</SelectItem>
                            <SelectItem value="blog">Blog Post</SelectItem>
                            <SelectItem value="tableau">Tableau Dashboard</SelectItem>
                            <SelectItem value="opensource">Open Source Project</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={newProof.title}
                          onChange={(e) => setNewProof((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Project title"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={newProof.description}
                        onChange={(e) => setNewProof((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the project"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input
                        value={newProof.url}
                        onChange={(e) => setNewProof((prev) => ({ ...prev, url: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                    <Button onClick={addWorkProof} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Proof
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={profile.availability}
                      onValueChange={(value) => setProfile((prev) => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="fractional">Fractional</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Hourly Rate</Label>
                    <Input
                      value={profile.hourlyRate}
                      onChange={(e) => setProfile((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                      placeholder="e.g., 150-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Salary Range</Label>
                    <Input
                      value={profile.salaryRange}
                      onChange={(e) => setProfile((prev) => ({ ...prev, salaryRange: e.target.value }))}
                      placeholder="e.g., 180k-220k"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Profile Link */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        value={`roster.tech/${profile.name.toLowerCase().replace(" ", "-")}`}
                        readOnly
                        className="text-sm"
                      />
                      <Button variant="outline" size="sm" onClick={copyProfileLink}>
                        {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Share this link to showcase your profile</p>
                  </div>
                </CardContent>
              </Card>

              {/* Verification */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Identity Verified</span>
                    <Badge variant="default">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Skills Verified</span>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Complete Verification
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
