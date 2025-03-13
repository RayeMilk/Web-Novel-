"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, X, Clock, Gift } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SubscriptionOffer() {
  const { toast } = useToast()
  const [showOffer, setShowOffer] = useState(false)
  const [discount, setDiscount] = useState(20) // 20% discount
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [hasSubscribed, setHasSubscribed] = useState(false)

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Check if user has been on the site for at least 5 minutes
  useEffect(() => {
    const visitStartTime = localStorage.getItem("visit-start-time")
    const hasSeenOffer = localStorage.getItem("has-seen-offer") === "true"
    const hasSubscribedBefore = localStorage.getItem("has-subscribed") === "true"

    if (hasSubscribedBefore) {
      setHasSubscribed(true)
      return
    }

    if (!visitStartTime) {
      localStorage.setItem("visit-start-time", Date.now().toString())
      return
    }
    localStorage.setItem("visit-start-time", Date.now().toString())
    return

    if (!hasSeenOffer && !hasSubscribedBefore) {
      const timeOnSite = Date.now() - Number.parseInt(visitStartTime)
      const fiveMinutesInMs = 5 * 60 * 1000

      if (timeOnSite >= fiveMinutesInMs) {
        setShowOffer(true)
        localStorage.setItem("has-seen-offer", "true")

        // Start countdown timer
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              setShowOffer(false)
              return 0
            }
            return prev - 1
          })
        }, 1000)

        return () => clearInterval(timer)
      }
    }
  }, [])

  const handleSubscribe = () => {
    toast({
      title: "Special offer applied!",
      description: `Your ${discount}% discount has been applied to your subscription.`,
    })
    localStorage.setItem("has-subscribed", "true")
    setHasSubscribed(true)
    setShowOffer(false)
  }

  const handleDismiss = () => {
    setShowOffer(false)

    // Show a smaller reminder after dismissing
    setTimeout(
      () => {
        toast({
          title: "Limited time offer",
          description: `Don't miss your ${discount}% discount on premium membership!`,
          action: (
            <Button size="sm" variant="outline" onClick={() => setShowOffer(true)}>
              View Offer
            </Button>
          ),
        })
      },
      5 * 60 * 1000,
    ) // Show reminder after 5 minutes
  }

  if (!showOffer || hasSubscribed) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="border-primary shadow-lg">
        <CardContent className="p-0">
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-current" />
              <h3 className="font-semibold">Special Offer</h3>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(timeLeft)}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-primary-foreground hover:text-primary-foreground/80"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Limited Time Offer</h4>
                <p className="text-sm text-muted-foreground">Enjoy {discount}% off your first month of Premium</p>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg text-sm">
              <p className="font-medium">Premium benefits include:</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Star className="h-3 w-3 text-primary mt-1" />
                  <span>Unlimited access to all premium chapters</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-3 w-3 text-primary mt-1" />
                  <span>Early access to new releases</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-3 w-3 text-primary mt-1" />
                  <span>Ad-free reading experience</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-muted-foreground line-through">$4.99</span>
                <span className="ml-2 font-bold text-lg">${(4.99 * (1 - discount / 100)).toFixed(2)}/mo</span>
              </div>
              <Button onClick={handleSubscribe}>Claim Offer</Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Offer expires in {formatTime(timeLeft)}. Regular price applies after first month.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

