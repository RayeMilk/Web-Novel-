"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Lock, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PremiumPreviewProps {
  chapterId: number
  chapterTitle: string
  previewContent: string
  fullContent: string
  onSubscribe: () => void
}

export default function PremiumPreview({
  chapterId,
  chapterTitle,
  previewContent,
  fullContent,
  onSubscribe,
}: PremiumPreviewProps) {
  const { toast } = useToast()
  const [showPreview, setShowPreview] = useState(false)
  const [previewsRemaining, setPreviewsRemaining] = useState(() => {
    // Get remaining previews from localStorage
    return Number.parseInt(localStorage.getItem("premium-previews-remaining") || "3")
  })

  const handlePreviewToggle = () => {
    if (!showPreview && previewsRemaining > 0) {
      setShowPreview(true)
      setPreviewsRemaining((prev) => prev - 1)

      // Save remaining previews to localStorage
      localStorage.setItem("premium-previews-remaining", (previewsRemaining - 1).toString())

      // Show toast with remaining previews
      toast({
        title: "Premium Content Preview",
        description: `You have ${previewsRemaining - 1} free previews remaining today.`,
      })

      // Start timer to hide preview after 2 minutes
      setTimeout(
        () => {
          setShowPreview(false)
          toast({
            title: "Preview ended",
            description: "Subscribe to continue reading premium content.",
          })
        },
        2 * 60 * 1000,
      ) // 2 minutes
    } else if (previewsRemaining <= 0) {
      toast({
        title: "No previews remaining",
        description: "You've used all your free previews for today. Subscribe to access premium content.",
        variant: "destructive",
      })
    } else {
      setShowPreview(false)
    }
  }

  // Reset previews at midnight
  useState(() => {
    const now = new Date()
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // tomorrow
      0,
      0,
      0, // midnight
    )
    const msToMidnight = night.getTime() - now.getTime()

    const resetPreviews = () => {
      localStorage.setItem("premium-previews-remaining", "3")
      setPreviewsRemaining(3)
    }

    const timer = setTimeout(resetPreviews, msToMidnight)

    return () => clearTimeout(timer)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Chapter {chapterId}: {chapterTitle}
        </h2>
        <Badge className="flex items-center gap-1 bg-primary text-primary-foreground">
          <Star className="h-3 w-3 fill-current" />
          Premium Chapter
        </Badge>
      </div>

      {showPreview ? (
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: previewContent }} />

          <div className="mt-8 not-prose">
            <Card className="bg-muted/50 border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <Lock className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Continue Reading with Premium</h3>
                  <p className="text-muted-foreground mt-1">
                    You're previewing premium content. Subscribe to continue reading.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button onClick={onSubscribe}>
                    <Star className="h-4 w-4 mr-2" />
                    Subscribe Now
                  </Button>
                  <Button variant="outline" onClick={handlePreviewToggle}>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="bg-muted/50">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <Lock className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold">Premium Content</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                This chapter is available exclusively to premium subscribers.
                {previewsRemaining > 0 && <> You can preview it for 2 minutes or subscribe for unlimited access.</>}
              </p>
            </div>
            <div className="flex gap-4">
              <Button onClick={onSubscribe}>
                <Star className="h-4 w-4 mr-2" />
                Subscribe Now
              </Button>
              {previewsRemaining > 0 && (
                <Button variant="outline" onClick={handlePreviewToggle}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview ({previewsRemaining} left)
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

