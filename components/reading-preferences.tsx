"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Moon, Sun, Type, AlignLeft } from "lucide-react"

type FontFamily = "serif" | "sans-serif" | "monospace"
type Theme = "light" | "sepia" | "dark"

interface ReadingPreferences {
  fontSize: number
  lineHeight: number
  fontFamily: FontFamily
  theme: Theme
}

const defaultPreferences: ReadingPreferences = {
  fontSize: 18,
  lineHeight: 1.6,
  fontFamily: "serif",
  theme: "light",
}

export default function ReadingPreferences() {
  const [preferences, setPreferences] = useState<ReadingPreferences>(defaultPreferences)

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("readingPreferences")
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("readingPreferences", JSON.stringify(preferences))

    // Apply preferences to the reading container
    const readingContainer = document.getElementById("reading-container")
    if (readingContainer) {
      readingContainer.style.fontSize = `${preferences.fontSize}px`
      readingContainer.style.lineHeight = preferences.lineHeight.toString()
      readingContainer.style.fontFamily = preferences.fontFamily

      // Remove all theme classes
      readingContainer.classList.remove(
        "bg-white",
        "text-black",
        "bg-amber-50",
        "text-stone-800",
        "bg-gray-900",
        "text-gray-100",
      )

      // Apply theme
      switch (preferences.theme) {
        case "light":
          readingContainer.classList.add("bg-white", "text-black")
          break
        case "sepia":
          readingContainer.classList.add("bg-amber-50", "text-stone-800")
          break
        case "dark":
          readingContainer.classList.add("bg-gray-900", "text-gray-100")
          break
      }
    }
  }, [preferences])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Reading preferences</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Reading Preferences</h4>

          <Tabs defaultValue="text">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="display" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Display
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Font Size</label>
                  <span className="text-sm text-muted-foreground">{preferences.fontSize}px</span>
                </div>
                <Slider
                  value={[preferences.fontSize]}
                  min={14}
                  max={24}
                  step={1}
                  onValueChange={(value) => setPreferences({ ...preferences, fontSize: value[0] })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Line Height</label>
                  <span className="text-sm text-muted-foreground">{preferences.lineHeight.toFixed(1)}</span>
                </div>
                <Slider
                  value={[preferences.lineHeight * 10]}
                  min={12}
                  max={20}
                  step={1}
                  onValueChange={(value) => setPreferences({ ...preferences, lineHeight: value[0] / 10 })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Font Family</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={preferences.fontFamily === "serif" ? "default" : "outline"}
                    className="text-sm h-9"
                    onClick={() => setPreferences({ ...preferences, fontFamily: "serif" })}
                  >
                    Serif
                  </Button>
                  <Button
                    variant={preferences.fontFamily === "sans-serif" ? "default" : "outline"}
                    className="text-sm h-9"
                    onClick={() => setPreferences({ ...preferences, fontFamily: "sans-serif" })}
                  >
                    Sans
                  </Button>
                  <Button
                    variant={preferences.fontFamily === "monospace" ? "default" : "outline"}
                    className="text-sm h-9"
                    onClick={() => setPreferences({ ...preferences, fontFamily: "monospace" })}
                  >
                    Mono
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={preferences.theme === "light" ? "default" : "outline"}
                    className="text-sm h-9"
                    onClick={() => setPreferences({ ...preferences, theme: "light" })}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant={preferences.theme === "sepia" ? "default" : "outline"}
                    className="text-sm h-9"
                    onClick={() => setPreferences({ ...preferences, theme: "sepia" })}
                  >
                    <AlignLeft className="h-4 w-4 mr-2" />
                    Sepia
                  </Button>
                  <Button
                    variant={preferences.theme === "dark" ? "default" : "outline"}
                    className="text-sm h-9"
                    onClick={() => setPreferences({ ...preferences, theme: "dark" })}
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Button>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full text-sm" onClick={() => setPreferences(defaultPreferences)}>
                  Reset to Defaults
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}

