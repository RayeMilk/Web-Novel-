"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, Check, X, Play } from "lucide-react"

interface RewardAdProps {
  onComplete: () => void
  onSkip: () => void
  reward: string
}

export default function RewardAd({ onComplete, onSkip, reward }: RewardAdProps) {
  const [adState, setAdState] = useState<"initial" | "playing" | "completed">("initial")
  const [progress, setProgress] = useState(0)
  const [adDuration] = useState(15) // 15 seconds video ad

  // Simulate video ad playback
  useEffect(() => {
    if (adState !== "playing") return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / adDuration

        if (newProgress >= 100) {
          clearInterval(interval)
          setAdState("completed")
          return 100
        }

        return newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [adState, adDuration])

  // Log ad completion
  useEffect(() => {
    if (adState === "completed") {
      // In a real app, this would call an analytics API
      console.log("Reward ad completed")
      // Wait a moment before calling onComplete to show the completion state
      const timer = setTimeout(() => {
        onComplete()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [adState, onComplete])

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6 space-y-4">
          {adState === "initial" && (
            <>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Watch an Ad to Unlock</h3>
                  <p className="text-sm text-muted-foreground">Watch a short video to unlock {reward}</p>
                </div>
              </div>

              <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Ad preview"
                  fill
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full h-16 w-16" onClick={() => setAdState("playing")}>
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => setAdState("playing")}>
                  Watch Ad
                </Button>
                <Button variant="outline" className="flex-1" onClick={onSkip}>
                  Skip
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">Ad duration: {adDuration} seconds</p>
            </>
          )}

          {adState === "playing" && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Ad Playing</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onSkip}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=500" alt="Video ad" fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-white">
                      <span>Ad: Premium Membership</span>
                      <span>{Math.round(progress)}% complete</span>
                    </div>
                    <Progress value={progress} className="h-1" />
                  </div>
                </div>
              </div>

              <p className="text-sm text-center">Please watch the entire ad to unlock {reward}</p>
            </>
          )}

          {adState === "completed" && (
            <>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
                  <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Thank You!</h3>
                  <p className="text-sm text-muted-foreground">You've unlocked {reward}</p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md">
                <p className="text-center font-medium">Enjoy your reward!</p>
              </div>

              <Button onClick={onComplete}>Continue</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

