"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Users, Star } from "lucide-react"
import MonetizationSettings from "@/components/monetization-settings"

export default function MonetizationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample revenue data
  const revenueData = {
    total: 12458.75,
    subscriptions: 8945.5,
    microtransactions: 2145.25,
    ads: 1368.0,
    monthlyGrowth: 18.5,
    subscribers: 1245,
    conversionRate: 4.8,
  }

  // Sample revenue breakdown
  const revenueBreakdown = [
    { source: "Premium Subscriptions", amount: 8945.5, percentage: 71.8 },
    { source: "Chapter Purchases", amount: 2145.25, percentage: 17.2 },
    { source: "Ad Revenue", amount: 1368.0, percentage: 11.0 },
  ]

  // Sample monthly revenue data
  const monthlyRevenue = [
    { month: "Jan", subscriptions: 5240, microtransactions: 1120, ads: 840 },
    { month: "Feb", subscriptions: 5680, microtransactions: 1340, ads: 920 },
    { month: "Mar", subscriptions: 6120, microtransactions: 1560, ads: 980 },
    { month: "Apr", subscriptions: 6580, microtransactions: 1780, ads: 1040 },
    { month: "May", subscriptions: 7240, microtransactions: 1920, ads: 1120 },
    { month: "Jun", subscriptions: 7890, microtransactions: 2040, ads: 1240 },
    { month: "Jul", subscriptions: 8945, microtransactions: 2145, ads: 1368 },
  ]

  return (
    <div className="container py-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Monetization Dashboard</h1>
          <p className="text-muted-foreground">Manage and track your revenue streams</p>
        </div>
        <Button>
          <DollarSign className="mr-2 h-4 w-4" />
          Withdraw Funds
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">${revenueData.total.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">{revenueData.monthlyGrowth}%</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Premium Subscribers</p>
                <h3 className="text-2xl font-bold">{revenueData.subscribers.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="font-medium">Conversion Rate:</span>
              <span className="ml-1 text-muted-foreground">{revenueData.conversionRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Revenue Per User</p>
                <h3 className="text-2xl font-bold">$9.87</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">12.4%</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="microtransactions">Microtransactions</TabsTrigger>
          <TabsTrigger value="ads">Advertising</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Your revenue sources for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">[Revenue Pie Chart Visualization]</div>
              </div>
              <div className="grid gap-4 mt-4">
                {revenueBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === 0 ? "bg-primary" : index === 1 ? "bg-blue-500" : "bg-green-500"
                        }`}
                      ></div>
                      <span>{item.source}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{item.percentage}%</span>
                      <span className="font-medium">${item.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <CardDescription>Revenue growth over the past 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">[Revenue Line Chart Visualization]</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Analytics</CardTitle>
              <CardDescription>Performance metrics for your subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Subscribers</p>
                  <p className="text-2xl font-bold">1,245</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Churn Rate</p>
                  <p className="text-2xl font-bold">3.2%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Lifetime Value</p>
                  <p className="text-2xl font-bold">$124.50</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Subscription Plans</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Basic Plan</h5>
                      <p className="text-sm text-muted-foreground">$2.99/month</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">342 subscribers</p>
                      <p className="text-sm text-muted-foreground">$1,022.58/month</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg border-primary bg-primary/5">
                    <div>
                      <h5 className="font-medium">Premium Plan</h5>
                      <p className="text-sm text-muted-foreground">$4.99/month</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">768 subscribers</p>
                      <p className="text-sm text-muted-foreground">$3,832.32/month</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Premium+ Plan</h5>
                      <p className="text-sm text-muted-foreground">$9.99/month</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">135 subscribers</p>
                      <p className="text-sm text-muted-foreground">$1,348.65/month</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="microtransactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Microtransaction Analytics</CardTitle>
              <CardDescription>Performance metrics for your pay-per-chapter model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Purchases</p>
                  <p className="text-2xl font-bold">2,168</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg. Purchase Value</p>
                  <p className="text-2xl font-bold">$0.99</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">2.8%</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Top Selling Chapters</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="font-medium text-lg">1</div>
                      <div>
                        <h5 className="font-medium">The Silent Echo: Chapter 4</h5>
                        <p className="text-sm text-muted-foreground">Elena Michaels</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">342 purchases</p>
                      <p className="text-sm text-muted-foreground">$338.58</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="font-medium text-lg">2</div>
                      <div>
                        <h5 className="font-medium">Whispers in the Dark: Chapter 7</h5>
                        <p className="text-sm text-muted-foreground">Sophia Williams</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">287 purchases</p>
                      <p className="text-sm text-muted-foreground">$284.13</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="font-medium text-lg">3</div>
                      <div>
                        <h5 className="font-medium">Beyond the Horizon: Chapter 12</h5>
                        <p className="text-sm text-muted-foreground">Marcus Chen</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">254 purchases</p>
                      <p className="text-sm text-muted-foreground">$251.46</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advertising Analytics</CardTitle>
              <CardDescription>Performance metrics for your ad placements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Impressions</p>
                  <p className="text-2xl font-bold">245,687</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Click-Through Rate</p>
                  <p className="text-2xl font-bold">3.8%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg. CPM</p>
                  <p className="text-2xl font-bold">$5.57</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Ad Performance by Type</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Banner Ads</h5>
                      <p className="text-sm text-muted-foreground">Top, bottom, and sidebar placements</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">142,568 impressions</p>
                      <p className="text-sm text-muted-foreground">$568.24 revenue</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg border-primary bg-primary/5">
                    <div>
                      <h5 className="font-medium">Interstitial Ads</h5>
                      <p className="text-sm text-muted-foreground">Full-screen ads between chapters</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">58,432 impressions</p>
                      <p className="text-sm text-muted-foreground">$524.76 revenue</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Reward Ads</h5>
                      <p className="text-sm text-muted-foreground">Opt-in video ads for rewards</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">44,687 impressions</p>
                      <p className="text-sm text-muted-foreground">$275.00 revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <MonetizationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

