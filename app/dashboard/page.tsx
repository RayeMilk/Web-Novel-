"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Star, Clock, ChevronRight, BarChart } from "lucide-react"

export default function Dashboard() {
  const [readingStats, setReadingStats] = useState<Record<string, number>>({})
  const [bookmarks, setBookmarks] = useState<number[]>([])
  const [readingHistory, setReadingHistory] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("reading")

  // Sample novels data (in a real app, this would come from an API)
  const novels = [
    {
      id: 1,
      title: "The Silent Echo",
      author: "Elena Michaels",
      cover: "/placeholder.svg?height=400&width=300",
      genre: "Mystery",
      lastRead: "2 hours ago",
      progress: 45,
      isPremium: true,
    },
    {
      id: 2,
      title: "Beyond the Horizon",
      author: "Marcus Chen",
      cover: "/placeholder.svg?height=400&width=300",
      genre: "Science Fiction",
      lastRead: "Yesterday",
      progress: 78,
      isPremium: false,
    },
    {
      id: 3,
      title: "Whispers in the Dark",
      author: "Sophia Williams",
      cover: "/placeholder.svg?height=400&width=300",
      genre: "Horror",
      lastRead: "3 days ago",
      progress: 23,
      isPremium: true,
    },
  ]

  // Load user data on component mount
  useEffect(() => {
    // Load reading stats
    const stats = JSON.parse(localStorage.getItem("reading-stats") || "{}")
    setReadingStats(stats)

    // Load bookmarks
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarked-novels") || "[]")
    setBookmarks(savedBookmarks)

    // Load reading history
    const history = JSON.parse(localStorage.getItem("reading-history") || "[]")
    setReadingHistory(history)
  }, [])

  // Calculate total reading time
  const totalReadingTime = Object.values(readingStats).reduce((sum, time) => sum + (time as number), 0)

  // Calculate reading streak
  const calculateStreak = () => {
    const dates = Object.keys(readingStats).sort()
    if (dates.length === 0) return 0

    const today = new Date().toISOString().split("T")[0]
    const hasReadToday = dates.includes(today)

    if (hasReadToday) {
      let streak = 1
      const prevDate = new Date(today)
      prevDate.setDate(prevDate.getDate() - 1)

      while (true) {
        const dateStr = prevDate.toISOString().split("T")[0]
        if (readingStats[dateStr]) {
          streak++
          prevDate.setDate(prevDate.getDate() - 1)
        } else {
          break
        }
      }

      return streak
    }

    return 0
  }

  const readingStreak = calculateStreak()

  // Get novels from bookmarks and history
  const bookmarkedNovels = novels.filter((novel) => bookmarks.includes(novel.id))
  const historyNovels = novels.filter((novel) => readingHistory.includes(novel.id))

  // Format minutes to hours and minutes
  const formatReadingTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Get last 7 days for reading chart
  const getLast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toISOString().split("T")[0])
    }
    return days
  }

  const last7Days = getLast7Days()
  const readingData = last7Days.map((day) => readingStats[day] || 0)

  return (
    <div className="container py-10 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">{formatReadingTime(totalReadingTime)}</h3>
            <p className="text-muted-foreground">Total Reading Time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">{readingHistory.length}</h3>
            <p className="text-muted-foreground">Novels Read</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">{readingStreak}</h3>
            <p className="text-muted-foreground">Day Reading Streak</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Reading Activity
            </h3>
            <div className="h-60 flex items-end justify-between gap-2">
              {readingData.map((minutes, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="bg-primary/80 w-full rounded-t-sm"
                    style={{
                      height: `${Math.max((minutes / 60) * 100, 5)}%`,
                      opacity: minutes > 0 ? 1 : 0.3,
                    }}
                  ></div>
                  <span className="text-xs text-muted-foreground mt-2">
                    {new Date(last7Days[index]).toLocaleDateString(undefined, { weekday: "short" })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="reading">Continue Reading</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="reading" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historyNovels.length > 0 ? (
              historyNovels.map((novel) => (
                <Card key={novel.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Link href={`/novel/${novel.id}`} className="block">
                      <div className="flex p-4 gap-4">
                        <div className="relative h-24 w-16 flex-shrink-0">
                          <Image
                            src={novel.cover || "/placeholder.svg"}
                            alt={novel.title}
                            fill
                            className="object-cover rounded-sm"
                          />
                          {novel.isPremium && (
                            <div className="absolute -top-1 -right-1">
                              <Badge className="bg-primary text-primary-foreground h-5">
                                <Star className="h-3 w-3 mr-0.5" />
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold line-clamp-1">{novel.title}</h3>
                          <p className="text-sm text-muted-foreground">by {novel.author}</p>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{novel.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div
                                className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${novel.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground">Last read {novel.lastRead}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't started reading any novels yet.</p>
                <Link href="/browse">
                  <Button>Browse Novels</Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bookmarks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedNovels.length > 0 ? (
              bookmarkedNovels.map((novel) => (
                <Card key={novel.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Link href={`/novel/${novel.id}`} className="block">
                      <div className="flex p-4 gap-4">
                        <div className="relative h-24 w-16 flex-shrink-0">
                          <Image
                            src={novel.cover || "/placeholder.svg"}
                            alt={novel.title}
                            fill
                            className="object-cover rounded-sm"
                          />
                          {novel.isPremium && (
                            <div className="absolute -top-1 -right-1">
                              <Badge className="bg-primary text-primary-foreground h-5">
                                <Star className="h-3 w-3 mr-0.5" />
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold line-clamp-1">{novel.title}</h3>
                          <p className="text-sm text-muted-foreground">by {novel.author}</p>
                          <Badge variant="secondary" className="mt-2">
                            {novel.genre}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't bookmarked any novels yet.</p>
                <Link href="/browse">
                  <Button>Browse Novels</Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historyNovels.length > 0 ? (
              historyNovels.map((novel) => (
                <Card key={novel.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Link href={`/novel/${novel.id}`} className="block">
                      <div className="flex p-4 gap-4">
                        <div className="relative h-24 w-16 flex-shrink-0">
                          <Image
                            src={novel.cover || "/placeholder.svg"}
                            alt={novel.title}
                            fill
                            className="object-cover rounded-sm"
                          />
                          {novel.isPremium && (
                            <div className="absolute -top-1 -right-1">
                              <Badge className="bg-primary text-primary-foreground h-5">
                                <Star className="h-3 w-3 mr-0.5" />
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold line-clamp-1">{novel.title}</h3>
                          <p className="text-sm text-muted-foreground">by {novel.author}</p>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Last read {novel.lastRead}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground mb-4">Your reading history is empty.</p>
                <Link href="/browse">
                  <Button>Browse Novels</Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

