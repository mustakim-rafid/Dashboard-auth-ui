'use client'

import { Search, Bell, Mail, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/ui/mode-toggler'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-background border-b border-border px-4 md:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 flex-1">

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar (sm+) */}
        <div className="hidden sm:flex w-full max-w-xs md:max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

            <Input
              type="text"
              placeholder="Search task"
              className="pl-9 pr-10 py-2 text-sm bg-background border border-border rounded-lg"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium hidden md:block">
              ⌘ F
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2 md:gap-4">

        <ModeToggle />

        {/* Mobile Search Button */}
        <button className="sm:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Mail (hidden on very small screens) */}
        <button className="xs:block p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Mail className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {/* User Profile (md+) */}
        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-semibold text-foreground">
              Totok Michael
            </p>
            <p className="text-xs text-muted-foreground">
              user1@example.com
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-linear-to-br from-orange-400 to-pink-400 shrink-0" />
        </div>
      </div>
    </header>
  )
}