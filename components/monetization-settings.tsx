"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star, DollarSign, Percent, Users, ShoppingBag, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MonetizationSettings() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("subscription")

  // Subscription settings
  const [subscriptionTiers, setSubscriptionTiers] = useState([
    { id: 1, name: "Basic", price: 2.99, features: ["Ad-free reading", "Bookmark unlimited novels"] },
    {
      id: 2,
      name: "Premium",
      price: 4.99,
      features: ["All Basic features", "Access to premium chapters", "Early access to new releases"],
    },
    {
      id: 3,
      name: "Premium+",
      price: 9.99,
      features: [
        "All Premium features",
        "Download novels for offline reading",
        "Exclusive author content",
        "Priority customer support",
      ],
    },
  ])

  // Microtransaction settings
  const [enableMicrotransactions, setEnableMicrotransactions] = useState(true)
  const [chapterPrice, setChapterPrice] = useState(0.99)
  const [bundleDiscount, setBundleDiscount] = useState(15)

  // Ad settings
  const [adSettings, setAdSettings] = useState({
    enableAds: true,
    bannerAds: true,
    interstitialAds: true,
    rewardAds: true,
    adFrequency: 3, // Show ads every X chapters
  })

  // Referral settings
  const [referralSettings, setReferralSettings] = useState({
    enableReferrals: true,
    referrerReward: 5, // $5 credit
    refereeDiscount: 30, // 30% off first month
    minimumPurchase: 0, // Minimum purchase amount to qualify for referral
  })

  // Merchandise settings
  const [merchandiseSettings, setMerchandiseSettings] = useState({
    enableMerchandise: false,
    profitMargin: 20, // 20% profit margin
    shippingMethod: "third-party",
  })

  const handleSaveSettings = () => {
    // In a real app, this would save settings to the backend
    toast({
      title: "Settings saved",
      description: "Your monetization settings have been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Monetization Settings</h2>
        <p className="text-muted-foreground">Configure how you earn revenue from your novels</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Subscription</span>
          </TabsTrigger>
          <TabsTrigger value="microtransactions" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Microtransactions</span>
          </TabsTrigger>
          <TabsTrigger value="ads" className="flex items-center gap-2">
            <Percent className="h-4 w-4" />
            <span className="hidden sm:inline">Ads</span>
          </TabsTrigger>
          <TabsTrigger value="referrals" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Referrals</span>
          </TabsTrigger>
          <TabsTrigger value="merchandise" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Merchandise</span>
          </TabsTrigger>
        </TabsList>

        {/* Subscription Settings */}
        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Tiers</CardTitle>
              <CardDescription>Configure your subscription plans and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriptionTiers.map((tier, index) => (
                <div key={tier.id} className="space-y-4 pb-4 border-b last:border-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{tier.name} Tier</h3>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={tier.price}
                        onChange={(e) => {
                          const newTiers = [...subscriptionTiers]
                          newTiers[index].price = Number.parseFloat(e.target.value)
                          setSubscriptionTiers(newTiers)
                        }}
                        className="w-20 h-8"
                        step="0.01"
                        min="0"
                      />
                      <span className="ml-1 text-muted-foreground">/mo</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Features</Label>
                    <div className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => {
                              const newTiers = [...subscriptionTiers]
                              newTiers[index].features[featureIndex] = e.target.value
                              setSubscriptionTiers(newTiers)
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              const newTiers = [...subscriptionTiers]
                              newTiers[index].features = newTiers[index].features.filter((_, i) => i !== featureIndex)
                              setSubscriptionTiers(newTiers)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newTiers = [...subscriptionTiers]
                        newTiers[index].features.push("New feature")
                        setSubscriptionTiers(newTiers)
                      }}
                    >
                      Add Feature
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={() => {
                  setSubscriptionTiers([
                    ...subscriptionTiers,
                    {
                      id: subscriptionTiers.length + 1,
                      name: `Tier ${subscriptionTiers.length + 1}`,
                      price: 14.99,
                      features: ["New tier feature"],
                    },
                  ])
                }}
              >
                Add Subscription Tier
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trial Options</CardTitle>
              <CardDescription>Configure free trial settings for new subscribers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Offer Free Trial</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to try premium features before subscribing
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Trial Duration (days)</Label>
                <Select defaultValue="7">
                  <SelectTrigger>
                    <SelectValue placeholder="Select trial duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Payment Method</Label>
                  <p className="text-sm text-muted-foreground">Require users to enter payment details to start trial</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Microtransactions Settings */}
        <TabsContent value="microtransactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Microtransaction Settings</CardTitle>
              <CardDescription>Configure pay-per-chapter and token options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Microtransactions</Label>
                  <p className="text-sm text-muted-foreground">Allow readers to purchase individual chapters</p>
                </div>
                <Switch checked={enableMicrotransactions} onCheckedChange={setEnableMicrotransactions} />
              </div>

              {enableMicrotransactions && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Single Chapter Price</Label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={chapterPrice}
                          onChange={(e) => setChapterPrice(Number.parseFloat(e.target.value))}
                          className="w-20 h-8"
                          step="0.10"
                          min="0"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This is the default price for a single premium chapter
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Bundle Discount (%)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[bundleDiscount]}
                          min={0}
                          max={50}
                          step={5}
                          onValueChange={(value) => setBundleDiscount(value[0])}
                          className="w-40"
                        />
                        <span className="w-8 text-right">{bundleDiscount}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Discount applied when readers purchase multiple chapters at once
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Token Packages</Label>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                          <span className="font-medium">Small Package</span>
                          <p className="text-xs text-muted-foreground">10 tokens</p>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <Input type="number" defaultValue="8.99" className="w-20 h-8" step="0.01" min="0" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                          <span className="font-medium">Medium Package</span>
                          <p className="text-xs text-muted-foreground">25 tokens</p>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <Input type="number" defaultValue="19.99" className="w-20 h-8" step="0.01" min="0" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                          <span className="font-medium">Large Package</span>
                          <p className="text-xs text-muted-foreground">50 tokens</p>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <Input type="number" defaultValue="34.99" className="w-20 h-8" step="0.01" min="0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ad Settings */}
        <TabsContent value="ads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ad Settings</CardTitle>
              <CardDescription>Configure how ads are displayed on your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Advertisements</Label>
                  <p className="text-sm text-muted-foreground">Show ads to non-premium users</p>
                </div>
                <Switch
                  checked={adSettings.enableAds}
                  onCheckedChange={(checked) => setAdSettings({ ...adSettings, enableAds: checked })}
                />
              </div>

              {adSettings.enableAds && (
                <>
                  <div className="space-y-2">
                    <Label>Ad Types</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-sm font-medium">Banner Ads</span>
                          <p className="text-xs text-muted-foreground">
                            Display banner ads at the top, bottom, or sidebar
                          </p>
                        </div>
                        <Switch
                          checked={adSettings.bannerAds}
                          onCheckedChange={(checked) => setAdSettings({ ...adSettings, bannerAds: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-sm font-medium">Interstitial Ads</span>
                          <p className="text-xs text-muted-foreground">
                            Show full-screen ads between chapter transitions
                          </p>
                        </div>
                        <Switch
                          checked={adSettings.interstitialAds}
                          onCheckedChange={(checked) => setAdSettings({ ...adSettings, interstitialAds: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-sm font-medium">Reward Ads</span>
                          <p className="text-xs text-muted-foreground">
                            Allow users to watch ads to unlock premium content
                          </p>
                        </div>
                        <Switch
                          checked={adSettings.rewardAds}
                          onCheckedChange={(checked) => setAdSettings({ ...adSettings, rewardAds: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Ad Frequency</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[adSettings.adFrequency]}
                          min={1}
                          max={10}
                          step={1}
                          onValueChange={(value) => setAdSettings({ ...adSettings, adFrequency: value[0] })}
                          className="w-40"
                        />
                        <span className="w-24 text-right">Every {adSettings.adFrequency} chapters</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      How often interstitial ads are shown between chapters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Ad Network</Label>
                    <Select defaultValue="google">
                      <SelectTrigger>
                        <SelectValue placeholder="Select ad network" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google AdSense</SelectItem>
                        <SelectItem value="meta">Meta Audience Network</SelectItem>
                        <SelectItem value="amazon">Amazon Publisher Services</SelectItem>
                        <SelectItem value="custom">Custom Ad Network</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referral Settings */}
        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Referral Program</CardTitle>
              <CardDescription>Configure your referral program to attract new users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Referral Program</Label>
                  <p className="text-sm text-muted-foreground">Allow users to earn rewards by referring friends</p>
                </div>
                <Switch
                  checked={referralSettings.enableReferrals}
                  onCheckedChange={(checked) => setReferralSettings({ ...referralSettings, enableReferrals: checked })}
                />
              </div>

              {referralSettings.enableReferrals && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Referrer Reward</Label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={referralSettings.referrerReward}
                          onChange={(e) =>
                            setReferralSettings({
                              ...referralSettings,
                              referrerReward: Number.parseFloat(e.target.value),
                            })
                          }
                          className="w-20 h-8"
                          step="1"
                          min="0"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Credit amount given to existing users when their referral subscribes
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Referee Discount</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[referralSettings.refereeDiscount]}
                          min={0}
                          max={50}
                          step={5}
                          onValueChange={(value) =>
                            setReferralSettings({
                              ...referralSettings,
                              refereeDiscount: value[0],
                            })
                          }
                          className="w-40"
                        />
                        <span className="w-8 text-right">{referralSettings.refereeDiscount}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Discount given to new users who sign up through a referral link
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Referral Qualification</Label>
                    <RadioGroup defaultValue="subscription">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="subscription" id="subscription" />
                        <Label htmlFor="subscription">Subscription purchase required</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="any-purchase" id="any-purchase" />
                        <Label htmlFor="any-purchase">Any purchase (including tokens)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="signup" id="signup" />
                        <Label htmlFor="signup">Sign up only (no purchase required)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Merchandise Settings */}
        <TabsContent value="merchandise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Merchandise Store</CardTitle>
              <CardDescription>Configure merchandise options for your novels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Merchandise Store</Label>
                  <p className="text-sm text-muted-foreground">Sell physical merchandise related to your novels</p>
                </div>
                <Switch
                  checked={merchandiseSettings.enableMerchandise}
                  onCheckedChange={(checked) =>
                    setMerchandiseSettings({ ...merchandiseSettings, enableMerchandise: checked })
                  }
                />
              </div>

              {merchandiseSettings.enableMerchandise && (
                <>
                  <div className="space-y-2">
                    <Label>Merchandise Types</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="books" className="rounded" defaultChecked />
                        <Label htmlFor="books">Physical Books</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="apparel" className="rounded" defaultChecked />
                        <Label htmlFor="apparel">Apparel</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="posters" className="rounded" defaultChecked />
                        <Label htmlFor="posters">Posters & Prints</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="accessories" className="rounded" defaultChecked />
                        <Label htmlFor="accessories">Accessories</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Profit Margin</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[merchandiseSettings.profitMargin]}
                          min={5}
                          max={50}
                          step={5}
                          onValueChange={(value) =>
                            setMerchandiseSettings({
                              ...merchandiseSettings,
                              profitMargin: value[0],
                            })
                          }
                          className="w-40"
                        />
                        <span className="w-8 text-right">{merchandiseSettings.profitMargin}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Your profit margin on merchandise sales</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Fulfillment Method</Label>
                    <Select
                      value={merchandiseSettings.shippingMethod}
                      onValueChange={(value) =>
                        setMerchandiseSettings({
                          ...merchandiseSettings,
                          shippingMethod: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fulfillment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="print-on-demand">Print on Demand</SelectItem>
                        <SelectItem value="third-party">Third-Party Fulfillment</SelectItem>
                        <SelectItem value="self-fulfillment">Self-Fulfillment</SelectItem>
                        <SelectItem value="dropshipping">Dropshipping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  )
}

