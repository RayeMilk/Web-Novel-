"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Flame, Trophy, Calendar, Clock } from "lucide-react"

export default function ReadingStreak() {
  const [streak, setStreak] = useState(0)
  const [todayMinutes, setTodayMinutes] = useState(0)
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [dailyGoal] = useState(30) // 30 minutes daily reading goal

  useEffect(() => {
    // Load reading stats from localStorage
    const readingStats = JSON.parse(localStorage.getItem("reading-stats") || "{}")
    const today = new Date().toISOString().split("T")[0]

    // Calculate today's reading time
    const todayTime = readingStats[today] || 0
    setTodayMinutes(todayTime)

    // Calculate total reading time
    let total = 0
    Object.values(readingStats).forEach((time: any) => {
      total += time as number
    })
    setTotalMinutes(total)

    // Calculate streak
    let currentStreak = 0
    const dates = Object.keys(readingStats).sort()

    if (dates.length > 0) {
      // Check if user read today
      const hasReadToday = dates.includes(today)

      if (hasReadToday) {
        currentStreak = 1

        // Check previous days
        const prevDate = new Date(today)
        prevDate.setDate(prevDate.getDate() - 1)

        while (true) {
          const dateStr = prevDate.toISOString().split("T")[0]
          if (readingStats[dateStr]) {
            currentStreak++
            prevDate.setDate(prevDate.getDate() - 1)
          } else {
            break
          }
        }
      }
    }

    setStreak(currentStreak)
  }, [])

  // Calculate progress towards daily goal
  const goalProgress = Math.min(Math.round((todayMinutes / dailyGoal) * 100), 100)

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Reading Streak</span>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              <span>
                {streak} {streak === 1 ? "day" : "days"}
              </span>
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                Today's Goal: {todayMinutes}/{dailyGoal} minutes
              </span>
              <span className="text-xs text-muted-foreground">{goalProgress}% complete</span>
            </div>
            <Progress value={goalProgress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{streak} Day Streak</p>
                <p className="text-xs text-muted-foreground">Keep it going!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{totalMinutes} Total Minutes</p>
                <p className="text-xs text-muted-foreground">Across all books</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

