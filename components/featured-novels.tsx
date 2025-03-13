import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star, BookOpen, Clock } from "lucide-react"

// Sample data for featured novels
const featuredNovels = [
  {
    id: 1,
    title: "The Silent Echo",
    author: "Elena Michaels",
    cover: "/placeholder.svg?height=400&width=300",
    genre: "Mystery",
    rating: 4.8,
    chapters: 32,
    isPremium: true,
  },
  {
    id: 2,
    title: "Beyond the Horizon",
    author: "Marcus Chen",
    cover: "/placeholder.svg?height=400&width=300",
    genre: "Science Fiction",
    rating: 4.6,
    chapters: 45,
    isPremium: false,
  },
  {
    id: 3,
    title: "Whispers in the Dark",
    author: "Sophia Williams",
    cover: "/placeholder.svg?height=400&width=300",
    genre: "Horror",
    rating: 4.7,
    chapters: 28,
    isPremium: true,
  },
  {
    id: 4,
    title: "The Last Kingdom",
    author: "Alexander Reed",
    cover: "/placeholder.svg?height=400&width=300",
    genre: "Fantasy",
    rating: 4.9,
    chapters: 56,
    isPremium: false,
  },
]

export default function FeaturedNovels() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {featuredNovels.map((novel) => (
        <Link key={novel.id} href={`/novel/${novel.id}`} className="group">
          <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
            <CardHeader className="p-0">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={novel.cover || "/placeholder.svg"}
                  alt={novel.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {novel.isPremium && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{novel.title}</h3>
              <p className="text-sm text-muted-foreground">by {novel.author}</p>
              <div className="flex items-center mt-2">
                <Badge variant="secondary" className="mr-2">
                  {novel.genre}
                </Badge>
                <div className="flex items-center text-sm text-amber-500">
                  <Star className="h-3 w-3 fill-current mr-1" />
                  {novel.rating}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                {novel.chapters} Chapters
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Updated 2d ago
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

