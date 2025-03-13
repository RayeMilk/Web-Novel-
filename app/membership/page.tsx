import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"

export default function MembershipPage() {
  return (
    <div className="container py-10 max-w-5xl">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-bold">Premium Membership</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock exclusive content and support your favorite authors with a premium membership.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Free</CardTitle>
            <div className="text-4xl font-bold">$0</div>
            <CardDescription>Forever free</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Access to all free novels and chapters</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Create reading lists</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Leave comments and reviews</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Follow your favorite authors</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link href="/signup" className="w-full">
                Sign Up
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-primary relative">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg flex items-center">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Popular
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Premium</CardTitle>
            <div className="text-4xl font-bold">$4.99</div>
            <CardDescription>per month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Access to all premium chapters and novels</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Early access to new releases</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Ad-free reading experience</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Direct messaging with authors</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Download chapters for offline reading</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Link href="/signup?plan=premium" className="w-full">
                Subscribe Now
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How does the premium subscription work?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Premium subscription gives you unlimited access to all premium content across the platform. You'll be
                charged monthly and can cancel anytime. Your subscription supports the authors you read.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I cancel my subscription?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time from your account settings. You'll continue to have
                premium access until the end of your billing period.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do authors get paid?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Authors receive a share of subscription revenue based on how much time premium members spend reading
                their content. This ensures fair compensation for creators.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is there a free trial?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                New users can enjoy a 7-day free trial of premium membership. You can cancel anytime during the trial
                period and won't be charged.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

