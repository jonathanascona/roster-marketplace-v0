import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, DollarSign, ExternalLink, Github, Globe, Mail, Shield, Star, Clock } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const profileData = {
  id: "1",
  username: "sarah-chen",
  name: "Sarah Chen",
  role: "Senior Data Engineer",
  avatar: "/placeholder.svg?height=120&width=120",
  location: "San Francisco, CA",
  availability: "Full-time",
  rate: "$150-200/hour",
  salaryRange: "$180k-220k",
  verified: true,
  rating: 4.9,
  bio: "Passionate data engineer with 6+ years of experience building scalable data pipelines and ML infrastructure. I specialize in Python, SQL, and cloud platforms, with a focus on creating robust, maintainable systems that drive business insights.",
  skills: [
    "Python",
    "SQL",
    "Apache Spark",
    "AWS",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "Redis",
    "Apache Kafka",
    "dbt",
    "Airflow",
    "Terraform",
  ],
  workProofs: [
    {
      id: "1",
      type: "github",
      title: "Real-time Data Pipeline",
      description: "Scalable streaming data pipeline using Kafka and Spark",
      url: "https://github.com/sarahchen/data-pipeline",
      stars: 234,
    },
    {
      id: "2",
      type: "kaggle",
      title: "Customer Churn Prediction",
      description: "ML model achieving 94% accuracy on customer retention",
      url: "https://kaggle.com/sarahchen/churn-prediction",
      stars: 89,
    },
    {
      id: "3",
      type: "blog",
      title: "Building Fault-Tolerant Data Systems",
      description: "Technical deep-dive into resilient architecture patterns",
      url: "https://medium.com/@sarahchen/fault-tolerant-data",
      stars: 156,
    },
    {
      id: "4",
      type: "tableau",
      title: "Sales Performance Dashboard",
      description: "Interactive dashboard for executive reporting",
      url: "https://public.tableau.com/sarahchen/sales-dashboard",
      stars: 67,
    },
  ],
  joinedDate: "2023-08-15",
  responseTime: "< 2 hours",
}

export default function ProfilePage({ params }: { params: { username: string } }) {
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
                <Link href="/search">Browse Talent</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                    <AvatarFallback className="text-2xl">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">{profileData.name}</h1>
                      {profileData.verified && <Shield className="h-6 w-6 text-primary" />}
                    </div>
                    <p className="text-xl text-muted-foreground mb-2">{profileData.role}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        {profileData.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Responds in {profileData.responseTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={profileData.availability === "Full-time" ? "default" : "secondary"}>
                        {profileData.availability}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <DollarSign className="h-4 w-4" />
                      <span>{profileData.rate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined{" "}
                        {new Date(profileData.joinedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Button size="lg" className="w-full md:w-auto">
                    <Mail className="mr-2 h-4 w-4" />
                    Request Introduction
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
                </CardContent>
              </Card>

              {/* Work Proofs */}
              <Card>
                <CardHeader>
                  <CardTitle>Work Proofs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileData.workProofs.map((proof) => (
                    <div
                      key={proof.id}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            {proof.type === "github" && <Github className="h-5 w-5" />}
                            {proof.type === "kaggle" && <div className="h-5 w-5 bg-primary rounded" />}
                            {proof.type === "blog" && <Globe className="h-5 w-5" />}
                            {proof.type === "tableau" && <div className="h-5 w-5 bg-accent rounded" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{proof.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{proof.description}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Star className="h-3 w-3" />
                              <span>{proof.stars} stars</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={proof.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Verified Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Status</span>
                      <Badge variant="default">{profileData.availability}</Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Hourly Rate</span>
                      <span className="text-sm text-muted-foreground">{profileData.rate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Salary Range</span>
                      <span className="text-sm text-muted-foreground">{profileData.salaryRange}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interested in working with {profileData.name.split(" ")[0]}? Request an introduction to start the
                    conversation.
                  </p>
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Request Introduction
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">Costs 1 credit • No spam guarantee</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
