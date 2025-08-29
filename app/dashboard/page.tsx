"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  Mail,
  Star,
  TrendingUp,
  Users,
  CreditCard,
  Settings,
  Edit3,
  Shield,
  Calendar,
  DollarSign,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { UserMenu } from "@/components/auth/user-menu"

// Mock user data - in real app this would come from auth context
const mockUser = {
  id: "1",
  name: "Sarah Chen",
  email: "sarah@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
  type: "talent" as const, // or "employer"
}

// Mock data for worker dashboard
const workerStats = {
  profileViews: 234,
  introRequests: 12,
  responseRate: 95,
  rating: 4.9,
  profileCompleteness: 85,
  verificationStatus: {
    identity: true,
    skills: false,
    portfolio: true,
  },
  recentActivity: [
    {
      id: "1",
      type: "view",
      message: "TechCorp viewed your profile",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "intro",
      message: "StartupXYZ requested an introduction",
      time: "1 day ago",
    },
    {
      id: "3",
      type: "view",
      message: "DataCorp viewed your profile",
      time: "2 days ago",
    },
  ],
  introRequests: [
    {
      id: "1",
      company: "TechCorp",
      role: "Senior Data Engineer",
      message: "We're looking for a data engineer to join our ML team...",
      budget: "$180k-220k",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      company: "StartupXYZ",
      role: "Data Architect",
      message: "Interested in discussing a fractional role...",
      budget: "$200/hour",
      time: "1 day ago",
      status: "accepted",
    },
  ],
}

// Mock data for employer dashboard
const employerStats = {
  credits: 15,
  introsSent: 8,
  responseRate: 75,
  savedTalent: 23,
  recentIntros: [
    {
      id: "1",
      talent: "Sarah Chen",
      role: "Senior Data Engineer",
      status: "responded",
      time: "2 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      talent: "Alex Rodriguez",
      role: "ML Engineer",
      status: "pending",
      time: "1 day ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      talent: "Emily Wang",
      role: "Frontend Engineer",
      status: "declined",
      time: "3 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  savedLists: [
    {
      id: "1",
      name: "Data Engineers",
      count: 12,
      updated: "2 days ago",
    },
    {
      id: "2",
      name: "Frontend Developers",
      count: 8,
      updated: "1 week ago",
    },
  ],
}

export default function DashboardPage() {
  const [userType] = useState<"talent" | "employer">(mockUser.type)

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
              {userType === "employer" && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/search">Find Talent</Link>
                </Button>
              )}
              <UserMenu user={mockUser} />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userType === "talent" ? <WorkerDashboard /> : <EmployerDashboard />}
      </div>
    </div>
  )
}

function WorkerDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile and track your opportunities</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/portfolio">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Portfolio
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold text-foreground">{workerStats.profileViews}</p>
              </div>
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Intro Requests</p>
                <p className="text-2xl font-bold text-foreground">{workerStats.introRequests}</p>
              </div>
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +3 this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold text-foreground">{workerStats.responseRate}%</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              Avg: 2 hours
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold text-foreground">{workerStats.rating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 fill-current" />
            </div>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              From 8 reviews
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Completeness */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Completeness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{workerStats.profileCompleteness}%</span>
              </div>
              <Progress value={workerStats.profileCompleteness} className="w-full" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Add more work proofs</span>
                  <Badge variant="outline">+10%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Complete skills verification</span>
                  <Badge variant="outline">+5%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Intro Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Intro Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {workerStats.introRequests.map((request) => (
                <div key={request.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{request.company}</h4>
                      <p className="text-sm text-muted-foreground">{request.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={request.status === "pending" ? "secondary" : "default"}>{request.status}</Badge>
                      <span className="text-xs text-muted-foreground">{request.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm">
                      <DollarSign className="h-4 w-4" />
                      {request.budget}
                    </div>
                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                        <Button size="sm">Accept</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Identity</span>
                </div>
                {workerStats.verificationStatus.identity ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="text-sm">Skills</span>
                </div>
                {workerStats.verificationStatus.skills ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">Portfolio</span>
                </div>
                {workerStats.verificationStatus.portfolio ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Complete Verification
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {workerStats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                <Link href="/dashboard/portfolio">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Portfolio
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                <Link href="/profile/sarah-chen">
                  <Eye className="mr-2 h-4 w-4" />
                  View Public Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function EmployerDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Manage your talent search and intro requests</p>
        </div>
        <Button asChild>
          <Link href="/search">
            <Users className="mr-2 h-4 w-4" />
            Find Talent
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credits Balance</p>
                <p className="text-2xl font-bold text-foreground">{employerStats.credits}</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <Button size="sm" variant="outline" className="mt-2 bg-transparent">
              Buy More Credits
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Intros Sent</p>
                <p className="text-2xl font-bold text-foreground">{employerStats.introsSent}</p>
              </div>
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2 this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold text-foreground">{employerStats.responseRate}%</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              Avg: 1 day
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Saved Talent</p>
                <p className="text-2xl font-bold text-foreground">{employerStats.savedTalent}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />2 lists
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Intro Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Intro Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {employerStats.recentIntros.map((intro) => (
                <div key={intro.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={intro.avatar || "/placeholder.svg"} alt={intro.talent} />
                        <AvatarFallback>
                          {intro.talent
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-foreground">{intro.talent}</h4>
                        <p className="text-sm text-muted-foreground">{intro.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          intro.status === "responded"
                            ? "default"
                            : intro.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {intro.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{intro.time}</span>
                    </div>
                  </div>
                  {intro.status === "responded" && (
                    <div className="mt-3">
                      <Button size="sm" variant="outline">
                        View Conversation
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Saved Lists */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Lists</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {employerStats.savedLists.map((list) => (
                <div key={list.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">{list.name}</h4>
                    <p className="text-sm text-muted-foreground">{list.count} people</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{list.updated}</div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Create New List
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                <Link href="/search">
                  <Users className="mr-2 h-4 w-4" />
                  Find Talent
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <CreditCard className="mr-2 h-4 w-4" />
                Buy Credits
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </CardContent>
          </Card>

          {/* Credit Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">This Month</span>
                <span className="text-sm font-medium">8 credits used</span>
              </div>
              <Progress value={53} className="w-full" />
              <div className="text-xs text-muted-foreground">15 credits remaining</div>
              <Button size="sm" className="w-full">
                Buy More Credits
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
