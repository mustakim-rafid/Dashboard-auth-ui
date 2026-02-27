'use client'

import { useState } from 'react'
import { Sidebar } from "@/components/module/dashboard/sidebar"
import { Header } from "@/components/module/dashboard/header"

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setIsOpen(true)} />

        <main className="flex-1 overflow-auto p-2">
          {children}
        </main>
      </div>
    </div>
  )
}