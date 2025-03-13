"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Star,
  Heart,
  Share2,
  MessageSquare,
  Lock,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bookmark,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import ReadingPreferences from "@/components/reading-preferences"
import ReadingProgress from "@/components/reading-progress"
import ReadingStreak from "@/components/reading-streak"
import RecommendationCarousel from "@/components/recommendation-carousel"
import PremiumPreview from "@/components/premium-preview"
import SubscriptionOffer from "@/components/subscription-offer"
import AdBanner from "@/components/ad-banner"
import InterstitialAd from "@/components/interstitial-ad"
import RewardAd from "@/components/reward-ad"

// Sample novel data
const novel = {
  id: 1,
  title: "The Silent Echo",
  author: "Elena Michaels",
  cover: "/placeholder.svg?height=600&width=400",
  genre: "Mystery",
  tags: ["suspense", "detective", "crime"],
  rating: 4.8,
  reviews: 124,
  reads: 3452,
  description:
    "In the quiet town of Millfield, a series of mysterious disappearances has the local police baffled. Detective Sarah Chen, known for her unorthodox methods and keen intuition, takes on the case that will challenge everything she thought she knew about her hometown. As she delves deeper into the investigation, she uncovers a web of secrets that spans generations, leading her to question who she can truly trust.",
  chapters: [
    { id: 1, title: "The Disappearance", isPremium: false, estimatedReadingTime: 12 },
    { id: 2, title: "First Clues", isPremium: false, estimatedReadingTime: 15 },
    { id: 3, title: "The Witness", isPremium: false, estimatedReadingTime: 10 },
    { id: 4, title: "Hidden Connections", isPremium: true, estimatedReadingTime: 18 },
    { id: 5, title: "The Truth Emerges", isPremium: true, estimatedReadingTime: 20 },
  ],
  isPremium: true,
  isUserSubscribed: false,
}

// Sample chapter content
const chapterContent = `
<p>Detective Sarah Chen pulled up to the curb outside the Miller residence, the blue and red lights from the patrol cars painting the suburban home in an eerie glow. It was the third disappearance this month, and the similarities were becoming impossible to ignore.</p>

<p>"What do we have?" she asked, approaching Officer Rodriguez who was taking notes by the front door.</p>

<p>"Emily Miller, 17. Parents say she never came home from school yesterday. Her backpack was found at the bus stop, but no signs of struggle. Just like the others."</p>

<p>Sarah nodded, pulling on latex gloves as she stepped into the house. The living room was immaculate, family photos lining the walls showing a smiling blonde teenager with her parents. A perfect family portrait that was now fractured by fear and uncertainty.</p>

<p>"I want to see her room," Sarah said, already heading for the stairs.</p>

<p>The bedroom was typical for a teenager – posters of bands on the walls, clothes scattered across a chair, a desk with schoolbooks neatly stacked. Sarah moved methodically through the space, looking for anything out of place.</p>

<p>Her attention was drawn to the laptop on the desk. Opening it revealed a password screen.</p>

<p>"Mrs. Miller," she called out. "Do you know your daughter's computer password?"</p>

<p>The mother appeared in the doorway, eyes red from crying. "She never told us. She was very private about her online life."</p>

<p>Sarah made a note to have the tech team look at it. "Did Emily mention any new friends recently? Anyone she seemed particularly interested in or afraid of?"</p>

<p>"No, nothing like that. She was excited about getting accepted to the summer writing program at the community college, but that's all."</p>

<p>Sarah's head snapped up. "Writing program? Was that run by Professor James Harmon?"</p>

<p>Mrs. Miller nodded slowly. "Yes, I think that was his name. Why? Is that important?"</p>

<p>Sarah didn't answer immediately, her mind racing. Both previous victims had connections to that same program.</p>

<p>"It might be nothing," she said finally, not wanting to alarm the mother further. "But I'll need to follow up on it."</p>

<p>As she left the room, Sarah pulled out her phone and dialed her partner.</p>

<p>"Mike, I need everything we have on Professor James Harmon from the community college. And I mean everything."</p>

<p>The third disappearance had just given them their first real lead, and Sarah wasn't about to let it slip away.</p>
`

// Sample premium chapter preview (first 30%)
const premiumChapterPreview = `
<p>Sarah stared at the evidence board in her office, photos of the three missing teenagers connected by red string to various locations and people. At the center was a photo of Professor James Harmon – mid-fifties, distinguished, with a reputation for mentoring gifted young writers.</p>

<p>"His background check came back clean," Mike said, handing her a coffee. "Not even a parking ticket. Taught at the community college for fifteen years, published several books, well-respected in academic circles."</p>

<p>"There has to be something we're missing," Sarah muttered, taking a sip of the bitter coffee. "Three students from his program disappear within weeks of each other? That's not coincidence."</p>

<p>"Maybe it's not about Harmon directly," Mike suggested. "Could be something else connecting the victims through the program."</p>

<p>Sarah nodded slowly, her eyes fixed on the timeline they'd constructed. "We need to talk to other students in that program. And I want to see Harmon's class materials, assignments, everything."</p>
`

// Sample premium chapter full content
const premiumChapterFullContent = `
<p>Sarah stared at the evidence board in her office, photos of the three missing teenagers connected by red string to various locations and people. At the center was a photo of Professor James Harmon – mid-fifties, distinguished, with a reputation for mentoring gifted young writers.</p>

<p>"His background check came back clean," Mike said, handing her a coffee. "Not even a parking ticket. Taught at the community college for fifteen years, published several books, well-respected in academic circles."</p>

<p>"There has to be something we're missing," Sarah muttered, taking a sip of the bitter coffee. "Three students from his program disappear within weeks of each other? That's not coincidence."</p>

<p>"Maybe it's not about Harmon directly," Mike suggested. "Could be something else connecting the victims through the program."</p>

<p>Sarah nodded slowly, her eyes fixed on the timeline they'd constructed. "We need to talk to other students in that program. And I want to see Harmon's class materials, assignments, everything."</p>

<p>Three hours later, Sarah was sitting in Professor Harmon's empty classroom, boxes of student assignments spread out before her. Mike had gone to interview other students, leaving her to sift through the papers.</p>

<p>The writing assignments were typical – personal essays, short stories, creative exercises. Nothing that immediately stood out as suspicious. But as she dug deeper into the boxes, she found a folder labeled "Special Projects."</p>

<p>Inside were more advanced assignments given only to select students – including all three victims. The theme connecting these assignments sent a chill down Sarah's spine: "Write about your deepest secrets."</p>

<p>She flipped through the papers, reading passages where teenagers had poured out their hearts, revealing family traumas, personal struggles, and in some cases, knowledge of illegal activities they'd witnessed. It was all there in black and white – vulnerabilities, leverage, secrets that someone might kill to keep hidden.</p>

<p>"Find anything interesting, Detective?"</p>

<p>Sarah's head snapped up. Professor Harmon stood in the doorway, his expression unreadable.</p>

<p>"These assignments," she said, holding up the folder. "You had them writing about their secrets."</p>

<p>Harmon stepped into the room, closing the door behind him. "It's a common writing exercise. Vulnerability creates authentic prose."</p>

<p>"And it also gave you information on all your students. Information that could be valuable... or dangerous."</p>

<p>His smile didn't reach his eyes. "I'm not sure I like what you're implying."</p>

<p>Sarah stood, maintaining distance between them. "Emily Miller wrote about witnessing something behind the old factory last year. Tina Brooks wrote about her stepfather's involvement in a hit and run. Jason Patel wrote about finding financial documents that suggested his uncle was embezzling from his company." She paused. "All three are now missing."</p>

<p>"Coincidence," Harmon said, but his voice had hardened.</p>

<p>"I don't think so," Sarah replied, reaching for her phone. "I think someone paid you for that information. Someone who needed to silence these kids."</p>

<p>Harmon moved with surprising speed for a man his age, knocking the phone from her hand. "You have no idea what you're getting into, Detective."</p>

<p>Sarah backed up, her hand moving to her weapon. "James Harmon, you're under arrest for—"</p>

<p>The classroom door burst open. Mike stood there, gun drawn. "Step away from her, Professor."</p>

<p>Harmon froze, then slowly raised his hands. "This is a misunderstanding."</p>

<p>"Save it," Mike said. "We found your offshore account. Regular payments from shell companies tied to some very powerful people in this town. People whose secrets were about to be exposed by these kids."</p>

<p>As Mike cuffed Harmon, Sarah gathered the papers – evidence that would hopefully lead them to the missing teenagers.</p>

<p>"The mayor's involved, isn't he?" she asked Harmon quietly.</p>

<p>The professor's silence was all the confirmation she needed.</p>

<p>"We're just getting started," she told him. "And we're going to find those kids."</p>
`

export default function NovelPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [currentChapter, setCurrentChapter] = useState(1)
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingTime, setReadingTime] = useState(0)
  const [showInterstitialAd, setShowInterstitialAd] = useState(false)
  const [showRewardAd, setShowRewardAd] = useState(false)
  const [tempPremiumAccess, setTempPremiumAccess] = useState(false)
  const [isPremiumUser, setIsPremiumUser] = useState(false)

  // Load reading history on component mount
  useEffect(() => {
    // Check if novel is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem("bookmarked-novels") || "[]")
    setIsBookmarked(bookmarks.includes(Number.parseInt(params.id)))

    // Check if user is premium
    const userIsPremium = localStorage.getItem("is-premium-user") === "true"
    setIsPremiumUser(userIsPremium)

    // Track reading time
    const startTime = Date.now()
    const interval = setInterval(() => {
      setReadingTime(Math.floor((Date.now() - startTime) / 1000 / 60))
    }, 60000) // Update every minute

    return () => {
      clearInterval(interval)

      // Save reading time when component unmounts
      const readingStats = JSON.parse(localStorage.getItem("reading-stats") || "{}")
      const today = new Date().toISOString().split("T")[0]

      if (!readingStats[today]) {
        readingStats[today] = 0
      }

      readingStats[today] += readingTime
      localStorage.setItem("reading-stats", JSON.stringify(readingStats))

      // Record this novel in reading history
      const readingHistory = JSON.parse(localStorage.getItem("reading-history") || "[]")
      if (!readingHistory.includes(Number.parseInt(params.id))) {
        readingHistory.unshift(Number.parseInt(params.id))
        localStorage.setItem("reading-history", JSON.stringify(readingHistory.slice(0, 20)))
      }
    }
  }, [params.id, readingTime])

  // Show interstitial ad when changing chapters (for non-premium users)
  useEffect(() => {
    if (!isPremiumUser && currentChapter > 1 && currentChapter % 2 === 0) {
      setShowInterstitialAd(true)
    }
  }, [currentChapter, isPremiumUser])

  const handleSubscribe = () => {
    // Simulate subscription process
    toast({
      title: "Subscription successful!",
      description: "You now have access to premium chapters.",
    })
    setShowSubscribeModal(false)
    setIsPremiumUser(true)
    localStorage.setItem("is-premium-user", "true")
    // In a real app, this would update the user's subscription status
    router.refresh()
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarked-novels") || "[]")
    const novelId = Number.parseInt(params.id)

    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter((id: number) => id !== novelId)
      localStorage.setItem("bookmarked-novels", JSON.stringify(updatedBookmarks))
      setIsBookmarked(false)
      toast({
        title: "Removed from bookmarks",
        description: "Novel removed from your reading list.",
      })
    } else {
      bookmarks.push(novelId)
      localStorage.setItem("bookmarked-novels", JSON.stringify(bookmarks))
      setIsBookmarked(true)
      toast({
        title: "Added to bookmarks",
        description: "Novel added to your reading list.",
      })
    }
  }

  const handleWatchRewardAd = () => {
    setShowRewardAd(true)
  }

  const handleRewardAdComplete = () => {
    setShowRewardAd(false)
    setTempPremiumAccess(true)

    // Temporary access expires after 24 hours
    setTimeout(
      () => {
        setTempPremiumAccess(false)
      },
      24 * 60 * 60 * 1000,
    )

    toast({
      title: "Premium access granted!",
      description: "You now have 24-hour access to premium chapters.",
    })
  }

  const handleRewardAdSkip = () => {
    setShowRewardAd(false)
  }

  const isPremiumChapter = novel.chapters[currentChapter - 1]?.isPremium
  const currentChapterData = novel.chapters[currentChapter - 1]
  const hasAccessToChapter = isPremiumUser || tempPremiumAccess || !isPremiumChapter

  return (
    <div className="container py-6 max-w-6xl">
      {/* Back button */}
      <Link href="/browse" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Browse
      </Link>

      {/* Top ad banner (only for non-premium users) */}
      {!isPremiumUser && (
        <div className="mb-6">
          <AdBanner position="top" size="medium" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Novel sidebar */}
        <div className="space-y-6">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
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

          <div className="space-y-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="icon"
                className={isBookmarked ? "text-primary" : ""}
                onClick={toggleBookmark}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Add to Reading List</DropdownMenuItem>
                  <DropdownMenuItem>Report Content</DropdownMenuItem>
                  <DropdownMenuItem>Follow Author</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-500 mr-1 fill-current" />
                <span>
                  {novel.rating} ({novel.reviews})
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{novel.reads} reads</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{novel.genre}</Badge>
              {novel.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {novel.isPremium && !isPremiumUser && (
              <div className="space-y-2">
                <Button className="w-full" onClick={() => setShowSubscribeModal(true)}>
                  <Star className="h-4 w-4 mr-2" />
                  Subscribe for Premium
                </Button>
                <Button variant="outline" className="w-full" onClick={handleWatchRewardAd}>
                  <Star className="h-4 w-4 mr-2" />
                  Watch Ad for 24h Access
                </Button>
              </div>
            )}
          </div>

          {/* Reading streak card - only shown on overview tab */}
          {activeTab === "overview" && <ReadingStreak />}

          {/* Sidebar ad - only for non-premium users */}
          {!isPremiumUser && activeTab === "overview" && <AdBanner position="sidebar" size="medium" />}
        </div>

        {/* Novel content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{novel.title}</h1>
            <p className="text-muted-foreground">by {novel.author}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{novel.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Chapters</h2>
                <div className="space-y-2">
                  {novel.chapters.map((chapter) => (
                    <Card key={chapter.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <button
                          className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors"
                          onClick={() => {
                            if (chapter.isPremium && !isPremiumUser && !tempPremiumAccess) {
                              setShowSubscribeModal(true)
                            } else {
                              setCurrentChapter(chapter.id)
                              setActiveTab("read")
                            }
                          }}
                        >
                          <div>
                            <span>
                              Chapter {chapter.id}: {chapter.title}
                            </span>
                            <div className="text-xs text-muted-foreground mt-1">
                              {chapter.estimatedReadingTime} min read
                            </div>
                          </div>
                          {chapter.isPremium && !isPremiumUser && !tempPremiumAccess ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* In-content ad - only for non-premium users */}
              {!isPremiumUser && <AdBanner position="in-content" size="large" />}

              {/* Recommendations */}
              <RecommendationCarousel />
            </TabsContent>

            <TabsContent value="read" className="space-y-6">
              {isPremiumChapter && !hasAccessToChapter ? (
                <PremiumPreview
                  chapterId={currentChapter}
                  chapterTitle={currentChapterData.title}
                  previewContent={premiumChapterPreview}
                  fullContent={premiumChapterFullContent}
                  onSubscribe={() => setShowSubscribeModal(true)}
                />
              ) : (
                <div className="relative">
                  <div className="absolute top-0 right-0 flex items-center gap-2">
                    <ReadingPreferences />
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">
                      Chapter {currentChapter}: {novel.chapters[currentChapter - 1]?.title}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentChapter <= 1}
                        onClick={() => setCurrentChapter((prev) => Math.max(prev - 1, 1))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {currentChapter} / {novel.chapters.length}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentChapter >= novel.chapters.length}
                        onClick={() => setCurrentChapter((prev) => Math.min(prev + 1, novel.chapters.length))}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* In-content ad - only for non-premium users */}
                  {!isPremiumUser && (
                    <div className="mb-6">
                      <AdBanner position="in-content" size="small" />
                    </div>
                  )}

                  <div id="reading-container" className="prose prose-stone dark:prose-invert max-w-none pb-16">
                    <div dangerouslySetInnerHTML={{ __html: chapterContent }} />
                  </div>

                  {/* In-content ad - only for non-premium users */}
                  {!isPremiumUser && (
                    <div className="my-6">
                      <AdBanner position="in-content" size="medium" />
                    </div>
                  )}

                  <div className="flex justify-between pt-6 border-t mt-8">
                    <Button
                      variant="outline"
                      className="flex items-center"
                      disabled={currentChapter <= 1}
                      onClick={() => setCurrentChapter((prev) => Math.max(prev - 1, 1))}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous Chapter
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center"
                      disabled={currentChapter >= novel.chapters.length}
                      onClick={() => setCurrentChapter((prev) => Math.min(prev + 1, novel.chapters.length))}
                    >
                      Next Chapter
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  {/* Reading progress bar */}
                  <ReadingProgress
                    chapterId={currentChapter}
                    totalChapters={novel.chapters.length}
                    estimatedReadingTime={currentChapterData.estimatedReadingTime}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Premium subscription modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
            <div className="text-center space-y-2">
              <Star className="h-8 w-8 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Unlock Premium Content</h2>
              <p className="text-muted-foreground">
                Subscribe to access all premium chapters and exclusive content from this author.
              </p>
            </div>

            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Monthly Subscription</span>
                <span className="text-xl font-bold">$4.99</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Star className="h-4 w-4 text-primary mr-2 mt-0.5" />
                  <span>Access to all premium chapters</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-4 w-4 text-primary mr-2 mt-0.5" />
                  <span>Early access to new releases</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-4 w-4 text-primary mr-2 mt-0.5" />
                  <span>Ad-free reading experience</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-4 w-4 text-primary mr-2 mt-0.5" />
                  <span>Support your favorite authors</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col space-y-2">
              <Button onClick={handleSubscribe}>Subscribe Now</Button>
              <Button variant="outline" onClick={() => setShowSubscribeModal(false)}>
                Cancel
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel your subscription at
              any time.
            </p>
          </div>
        </div>
      )}

      {/* Interstitial ad */}
      {showInterstitialAd && <InterstitialAd onClose={() => setShowInterstitialAd(false)} />}

      {/* Reward ad */}
      {showRewardAd && (
        <RewardAd onComplete={handleRewardAdComplete} onSkip={handleRewardAdSkip} reward="24-hour premium access" />
      )}

      {/* Limited-time subscription offer */}
      <SubscriptionOffer />
    </div>
  )
}

