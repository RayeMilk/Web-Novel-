"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Simulate logged in state - in a real app this would come from auth context
  const isLoggedIn = false

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => document.body.click()}>
                <BookOpen className="h-6 w-6" />
                <span className="font-bold text-xl">NovelNest</span>
              </Link>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    pathname === "/" && "text-foreground font-medium",
                  )}
                  onClick={() => document.body.click()}
                >
                  Home
                </Link>
                <Link
                  href="/browse"
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    pathname === "/browse" && "text-foreground font-medium",
                  )}
                  onClick={() => document.body.click()}
                >
                  Browse
                </Link>
                <Link
                  href="/upload"
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    pathname === "/upload" && "text-foreground font-medium",
                  )}
                  onClick={() => document.body.click()}
                >
                  Upload
                </Link>
                <Link
                  href="/membership"
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    pathname === "/membership" && "text-foreground font-medium",
                  )}
                  onClick={() => document.body.click()}
                >
                  Membership
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 mr-6 hidden md:flex">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-xl">NovelNest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className={cn(
              "text-muted-foreground hover:text-foreground transition-colors",
              pathname === "/" && "text-foreground font-medium",
            )}
          >
            Home
          </Link>
          <Link
            href="/browse"
            className={cn(
              "text-muted-foreground hover:text-foreground transition-colors",
              pathname === "/browse" && "text-foreground font-medium",
            )}
          >
            Browse
          </Link>
          <Link
            href="/upload"
            className={cn(
              "text-muted-foreground hover:text-foreground transition-colors",
              pathname === "/upload" && "text-foreground font-medium",
            )}
          >
            Upload
          </Link>
          <Link
            href="/membership"
            className={cn(
              "text-muted-foreground hover:text-foreground transition-colors",
              pathname === "/membership" && "text-foreground font-medium",
            )}
          >
            Membership
          </Link>
        </nav>

        <div className="flex items-center ml-auto gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input type="search" placeholder="Search novels..." className="w-[200px] md:w-[300px] mr-2" autoFocus />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

