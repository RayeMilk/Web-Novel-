import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <span className="font-medium">NovelNest</span>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} NovelNest. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

