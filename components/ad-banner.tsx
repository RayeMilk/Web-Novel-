"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

interface AdBannerProps {
  position: "top" | "bottom" | "sidebar" | "in-content"
  size: "small" | "medium" | "large"
  showCloseButton?: boolean
}

// Sample ad data - in a real app, this would come from an ad network API
const sampleAds = [
  {
    id: 1,
    title: "Discover the Fantasy Series Everyone's Talking About",
    description: "The Chronicles of Eldoria - Now available in hardcover and e-book",
    image: "/placeholder.svg?height=200&width=400",
    url: "/sponsored/fantasy-series",
    sponsor: "Penguin Books",
  },
  {
    id: 2,
    title: "Listen to Your Favorite Novels",
    description: "Get 3 months free of AudioBooks Premium",
    image: "/placeholder.svg?height=200&width=400",
    url: "/sponsored/audiobooks",
    sponsor: "AudioBooks Premium",
  },
  {
    id: 3,
    title: "Write Your Own Story",
    description: "Professional writing software for aspiring authors",
    image: "/placeholder.svg?height=200&width=400",
    url: "/sponsored/writing-software",
    sponsor: "StoryForge Pro",
  },
  {
    id: 4,
    title: "Limited Edition Book Box",
    description: "Receive curated novels monthly with exclusive merchandise",
    image: "/placeholder.svg?height=200&width=400",
    url: "/sponsored/book-box",
    sponsor: "LitCrate",
  },
]

export default function AdBanner({ position, size, showCloseButton = true }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentAd, setCurrentAd] = useState(sampleAds[0])
  const [impressionLogged, setImpressionLogged] = useState(false)

  // Select a random ad on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sampleAds.length)
    setCurrentAd(sampleAds[randomIndex])
  }, [])

  // Log impression when ad is viewed
  useEffect(() => {
    if (isVisible && !impressionLogged) {
      // In a real app, this would call an analytics API
      console.log(`Ad impression logged: ${currentAd.id} - ${currentAd.title}`)
      setImpressionLogged(true)
    }
  }, [isVisible, currentAd, impressionLogged])

  // Handle ad click
  const handleAdClick = () => {
    // In a real app, this would call an analytics API
    console.log(`Ad click logged: ${currentAd.id} - ${currentAd.title}`)
  }

  if (!isVisible) return null

  // Determine ad size and layout based on position and size props
  const getAdStyles = () => {
    switch (position) {
      case "top":
      case "bottom":
        return "w-full"
      case "sidebar":
        return "w-full h-full"
      case "in-content":
        return "w-full my-6"
      default:
        return "w-full"
    }
  }

  const getAdContentStyles = () => {
    switch (size) {
      case "small":
        return "flex items-center p-2 gap-3"
      case "medium":
        return "p-4"
      case "large":
        return "p-0"
      default:
        return "p-4"
    }
  }

  return (
    <Card className={`${getAdStyles()} overflow-hidden border-dashed border-muted-foreground/30`}>
      <CardContent className={`${getAdContentStyles()} relative`}>
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 z-10"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Close ad</span>
          </Button>
        )}

        <Link href={currentAd.url} onClick={handleAdClick} className="block w-full">
          {size === "small" ? (
            <>
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src={currentAd.image || "/placeholder.svg"}
                  alt={currentAd.title}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium line-clamp-1">{currentAd.title}</h4>
                <p className="text-xs text-muted-foreground">Sponsored by {currentAd.sponsor}</p>
              </div>
            </>
          ) : size === "medium" ? (
            <>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0">
                  <Image
                    src={currentAd.image || "/placeholder.svg"}
                    alt={currentAd.title}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{currentAd.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{currentAd.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">Sponsored by {currentAd.sponsor}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-t-lg">
                <Image
                  src={currentAd.image || "/placeholder.svg"}
                  alt={currentAd.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium">{currentAd.title}</h4>
                <p className="text-sm text-muted-foreground">{currentAd.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-muted-foreground">Sponsored by {currentAd.sponsor}</p>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </>
          )}
        </Link>
      </CardContent>
    </Card>
  )
}

