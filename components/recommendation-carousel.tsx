"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

// Sample recommended novels based on reading history
const recommendedNovels = [
  {
    id: 5,
    title: "Shadows of Eternity",
    author: "Rebecca Winters",
    cover: "/placeholder.svg?height=400&width=300",
    genre: "Fantasy",
    rating: 4.7,
    isPremium: true,
    similarity: "Based on your interest in mystery novels",
  },
  {
    id: 6,
    title: "The Forgotten City",
    author: "James Chen",
    cover: "/placeholder.svg?height=400&width=300",
    genre: "Mystery",
    rating: 4.9,
    isPremium: true,
    similarity: "Readers who enjoyed 'The Silent Echo' also liked this",
  },
  {
    id: 7,
    title: "Echoes in the Dark",
    author: "Maria Rodriguez",
    cover: "/placeholder.svg?height=400&width=300",
    genre: "Thriller",
    rating: 4.6,
    isPremium: false,
    similarity: "New release from an author you might like",
  },
  {
    id: 8,
    title: "The Last Detective",
    author: "Thomas Wright",
    cover: "/placeholder.svg?height=400&width=300",
    genre: "Mystery",
    rating: 4.8,
    isPremium: true,
    similarity: "Similar to books in your reading history",
  },
  {
    id: 9,
    title: "Whispers of the Past",
    author: "Sarah Johnson",
    cover: "/placeholder.svg?height=400&width=300",
    genre: "Historical Mystery",
    rating: 4.5,
    isPremium: false,
    similarity: "Trending in Mystery",
  },
]

export default function RecommendationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (currentIndex < recommendedNovels.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(recommendedNovels.length - 1)
    }
  }

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  // Scroll carousel to current index
  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentIndex * (carouselRef.current.offsetWidth / 3)
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recommended For You</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {recommendedNovels.map((novel, index) => (
          <Card
            key={novel.id}
            className={`flex-shrink-0 w-[calc(33.333%-16px)] min-w-[250px] snap-start transition-all duration-300 ${
              index === currentIndex ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
          >
            <CardContent className="p-0">
              <Link href={`/novel/${novel.id}`} className="block">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg">
                  <Image src={novel.cover || "/placeholder.svg"} alt={novel.title} fill className="object-cover" />
                  {novel.isPremium && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold line-clamp-1">{novel.title}</h3>
                  <p className="text-sm text-muted-foreground">by {novel.author}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{novel.genre}</Badge>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-3 w-3 fill-current mr-1" />
                      {novel.rating}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{novel.similarity}</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

