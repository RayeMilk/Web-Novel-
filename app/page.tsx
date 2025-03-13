import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Upload, Star, ChevronRight } from "lucide-react"
import FeaturedNovels from "@/components/featured-novels"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Share Your Stories With The World
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Upload your novels, build your audience, and offer premium content to your dedicated readers.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/upload">
                <Button className="h-11 px-8">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Novel
                </Button>
              </Link>
              <Link href="/browse">
                <Button variant="outline" className="h-11 px-8">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Novels
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Novels */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Featured Novels</h2>
              <p className="text-muted-foreground">Discover the most popular stories on our platform</p>
            </div>
            <FeaturedNovels />
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Star className="mr-1 h-4 w-4" />
                Premium Membership
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Unlock Exclusive Content</h2>
              <p className="text-muted-foreground md:text-xl">
                Subscribe to access special chapters, early releases, and author interactions.
              </p>
              <Link href="/membership">
                <Button className="h-10 px-8">
                  Join Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              <ul className="grid gap-4">
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Exclusive Chapters</h3>
                    <p className="text-sm text-muted-foreground">
                      Access special content not available to regular readers
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Early Access</h3>
                    <p className="text-sm text-muted-foreground">Read new chapters before they're publicly available</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Ad-Free Reading</h3>
                    <p className="text-sm text-muted-foreground">Enjoy an uninterrupted reading experience</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Start sharing your stories in three simple steps
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Create an Account</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Sign up for free and set up your author profile
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Upload Your Novel</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Share your work chapter by chapter with customizable settings
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Grow Your Audience</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Build a following and offer premium content to subscribers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

