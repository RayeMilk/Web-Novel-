"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen } from "lucide-react"

interface ReadingProgressProps {
  chapterId: number
  totalChapters: number
  estimatedReadingTime: number // in minutes
}

export default function ReadingProgress({ chapterId, totalChapters, estimatedReadingTime }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [startTime] = useState(Date.now())

  // Calculate chapter progress percentage
  const chapterProgress = Math.round((chapterId / totalChapters) * 100)

  // Update scroll progress as user reads
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setProgress(Math.round(scrollProgress))

      // Update time spent reading
      setTimeSpent(Math.round((Date.now() - startTime) / 1000 / 60))
    }

    window.addEventListener("scroll", updateProgress)

    // Set initial progress
    updateProgress()

    // Save reading position to localStorage
    const saveReadingPosition = () => {
      localStorage.setItem(`reading-position-chapter-${chapterId}`, window.scrollY.toString())

      // Save reading stats
      const readingStats = JSON.parse(localStorage.getItem("reading-stats") || "{}")
      const today = new Date().toISOString().split("T")[0]

      if (!readingStats[today]) {
        readingStats[today] = 0
      }

      readingStats[today] += timeSpent
      localStorage.setItem("reading-stats", JSON.stringify(readingStats))
    }

    window.addEventListener("beforeunload", saveReadingPosition)

    // Restore reading position
    const savedPosition = localStorage.getItem(`reading-position-chapter-${chapterId}`)
    if (savedPosition) {
      window.scrollTo(0, Number.parseInt(savedPosition))
    }

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("beforeunload", saveReadingPosition)
      saveReadingPosition()
    }
  }, [chapterId, startTime, timeSpent])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t z-10 py-2 px-4">
      <div className="container max-w-4xl flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>
                Chapter {chapterId} of {totalChapters}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{estimatedReadingTime} min read</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>Current progress: {progress}%</span>
            <Badge variant="outline" className="h-5">
              {chapterProgress}% of novel
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="h-1" />
      </div>
    </div>
  )
}

