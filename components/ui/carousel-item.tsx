import type React from "react"
import { cn } from "@/lib/utils"

export interface CarouselItemProps {
  /** The content to display in the carousel item */
  children: React.ReactNode
  /** Additional class name for the carousel item */
  className?: string
}

export function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <div
      className={cn(
        "bg-gray-900 rounded-xl overflow-hidden h-full border border-gray-800 transition-all duration-300 hover:border-yellow-600/50 hover:shadow-lg hover:shadow-yellow-600/10",
        className,
      )}
    >
      {children}
    </div>
  )
}
