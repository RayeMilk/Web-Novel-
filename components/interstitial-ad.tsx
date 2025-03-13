"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, ExternalLink } from "lucide-react"

interface InterstitialAdProps {
  onClose: () => void
  autoCloseTime?: number // in seconds
}

// Sample interstitial ad data
const interstitialAd = {
  id: 1,
  title: "Upgrade to Premium",
  description: "Enjoy an ad-free experience and unlock all premium content with a subscription.",
  image: "/placeholder.svg?height=400&width=600",
  url: "/membership",
  cta: "Subscribe Now",
  sponsor: "NovelNest Premium",
}

export default function InterstitialAd({ onClose, autoCloseTime = 5 }: InterstitialAdProps) {
  const [timeLeft, setTimeLeft] = useState(autoCloseTime)
  const [adClicked, setAdClicked] = useState(false)

  // Auto-close timer
  useEffect(() => {
    if (timeLeft <= 0) {
      onClose()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, onClose])

  // Log impression when ad is shown
  useEffect(() => {
    // In a real app, this would call an analytics API
    console.log(`Interstitial ad impression logged: ${interstitialAd.id}`)
  }, [])

  const handleAdClick = () => {
    // In a real app, this would call an analytics API
    console.log(`Interstitial ad click logged: ${interstitialAd.id}`)
    setAdClicked(true)
    // Don't close the ad immediately to ensure the click registers
    setTimeout(() => {
      window.open(interstitialAd.url, "_blank")
    }, 300)
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-card border rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10"
          onClick={onClose}
          disabled={timeLeft > 0}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close ad</span>
        </Button>

        {/* Ad content */}
        <div className="relative aspect-video w-full">
          <Image
            src={interstitialAd.image || "/placeholder.svg"}
            alt={interstitialAd.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold">{interstitialAd.title}</h3>
            <p className="text-muted-foreground mt-1">{interstitialAd.description}</p>
          </div>

          <Button className="w-full" onClick={handleAdClick}>
            {interstitialAd.cta}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Ad closes in {timeLeft}s</span>
              <button
                className="text-primary hover:underline disabled:text-muted-foreground disabled:no-underline"
                onClick={onClose}
                disabled={timeLeft > 0}
              >
                {timeLeft > 0 ? "Please wait..." : "Skip Ad"}
              </button>
            </div>
            <Progress value={(timeLeft / autoCloseTime) * 100} className="h-1" />
          </div>

          <p className="text-xs text-muted-foreground text-center">Sponsored by {interstitialAd.sponsor}</p>
        </div>
      </div>
    </div>
  )
}

