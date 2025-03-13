"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, BookOpen, FileText, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UploadNovel() {
  const router = useRouter()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [hasPremiumContent, setHasPremiumContent] = useState(false)

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setCoverImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Novel uploaded successfully!",
        description: "Your novel has been uploaded and is now being processed.",
      })
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-6">Upload Your Novel</h1>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Novel Details
          </TabsTrigger>
          <TabsTrigger value="chapters" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Chapters
          </TabsTrigger>
          <TabsTrigger value="publish" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Publishing Options
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Novel Details</CardTitle>
                <CardDescription>Provide information about your novel to help readers discover it.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cover">Cover Image</Label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 h-64">
                      {coverImage ? (
                        <div className="relative w-full h-full">
                          <img
                            src={coverImage || "/placeholder.svg"}
                            alt="Cover preview"
                            className="w-full h-full object-contain"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute bottom-2 right-2"
                            onClick={() => setCoverImage(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full space-y-2 text-center">
                          <Upload className="h-10 w-10 text-muted-foreground" />
                          <p className="text-sm font-medium">Drag and drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">Recommended size: 600×800px</p>
                          <Input
                            id="cover"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverImageChange}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("cover")?.click()}
                          >
                            Select File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Enter your novel's title" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fantasy">Fantasy</SelectItem>
                          <SelectItem value="sci-fi">Science Fiction</SelectItem>
                          <SelectItem value="mystery">Mystery</SelectItem>
                          <SelectItem value="romance">Romance</SelectItem>
                          <SelectItem value="thriller">Thriller</SelectItem>
                          <SelectItem value="horror">Horror</SelectItem>
                          <SelectItem value="historical">Historical Fiction</SelectItem>
                          <SelectItem value="ya">Young Adult</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" placeholder="adventure, magic, dragons" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Write a compelling description of your novel..."
                    className="min-h-32"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline">
                  Save Draft
                </Button>
                <Button type="button" onClick={() => document.querySelector('[data-value="chapters"]')?.click()}>
                  Continue to Chapters
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="chapters">
            <Card>
              <CardHeader>
                <CardTitle>Chapters</CardTitle>
                <CardDescription>Upload your chapters and organize them in the desired order.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Chapter 1</h3>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="premium-chapter" className="text-sm cursor-pointer">
                        Premium Chapter
                      </Label>
                      <Switch id="premium-chapter" checked={hasPremiumContent} onCheckedChange={setHasPremiumContent} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chapter-title">Chapter Title</Label>
                    <Input id="chapter-title" placeholder="Enter chapter title" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chapter-content">Chapter Content</Label>
                    <Textarea
                      id="chapter-content"
                      placeholder="Write or paste your chapter content here..."
                      className="min-h-64"
                      required
                    />
                  </div>

                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Add Another Chapter
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="details"]')?.click()}
                >
                  Back to Details
                </Button>
                <Button type="button" onClick={() => document.querySelector('[data-value="publish"]')?.click()}>
                  Continue to Publishing
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="publish">
            <Card>
              <CardHeader>
                <CardTitle>Publishing Options</CardTitle>
                <CardDescription>Configure how your novel will be published and accessed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Premium Content</h3>
                      <p className="text-sm text-muted-foreground">
                        Make certain chapters available only to premium subscribers
                      </p>
                    </div>
                    <Switch checked={hasPremiumContent} onCheckedChange={setHasPremiumContent} />
                  </div>

                  {hasPremiumContent && (
                    <div className="border p-4 rounded-lg space-y-4">
                      <h3 className="font-medium">Premium Content Settings</h3>

                      <div className="space-y-2">
                        <Label htmlFor="premium-price">Subscription Price (per month)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            id="premium-price"
                            type="number"
                            min="1"
                            step="0.99"
                            defaultValue="4.99"
                            className="pl-8"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="premium-description">Premium Content Description</Label>
                        <Textarea
                          id="premium-description"
                          placeholder="Describe what subscribers will get with premium access..."
                          className="min-h-20"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="publish-date">Publication Date</Label>
                    <Input id="publish-date" type="date" />
                    <p className="text-xs text-muted-foreground">Leave blank to publish immediately after approval</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="mature-content" />
                    <Label htmlFor="mature-content" className="text-sm cursor-pointer">
                      This novel contains mature content
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="chapters"]')?.click()}
                >
                  Back to Chapters
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>Publish Novel</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}

