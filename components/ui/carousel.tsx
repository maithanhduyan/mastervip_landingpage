"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CarouselProps {
  /** Array of items to display in the carousel */
  children: React.ReactNode[]
  /** Number of items to show at once on different screen sizes */
  itemsToShow?: {
    sm?: number
    md?: number
    lg?: number
  }
  /** Auto-play interval in milliseconds (0 to disable) */
  autoPlayInterval?: number
  /** Whether to show navigation arrows */
  showArrows?: boolean
  /** Whether to show navigation dots */
  showDots?: boolean
  /** Additional class name for the carousel container */
  className?: string
  /** Additional class name for each slide */
  slideClassName?: string
}

export function Carousel({
  children,
  itemsToShow = { sm: 1, md: 2, lg: 3 },
  autoPlayInterval = 0,
  showArrows = true,
  showDots = true,
  className,
  slideClassName,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const totalItems = React.Children.count(children)

  // Determine how many items to show based on screen size
  const [visibleItems, setVisibleItems] = useState(itemsToShow.lg || 3)

  // Update visible items on window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleItems(itemsToShow.sm || 1)
      } else if (width < 1024) {
        setVisibleItems(itemsToShow.md || 2)
      } else {
        setVisibleItems(itemsToShow.lg || 3)
      }
    }

    handleResize() // Initial call
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [itemsToShow])

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayInterval <= 0 || isHovering) return

    const interval = setInterval(() => {
      goToNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlayInterval, currentIndex, isHovering, totalItems])

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, totalItems - visibleItems)
      return prevIndex < maxIndex ? prevIndex + 1 : prevIndex
    })
  }, [totalItems, visibleItems])

  const goToSlide = useCallback(
    (index: number) => {
      const maxIndex = Math.max(0, totalItems - visibleItems)
      setCurrentIndex(Math.min(Math.max(0, index), maxIndex))
    },
    [totalItems, visibleItems],
  )

  // Touch event handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Calculate if we can navigate in a direction
  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < totalItems - visibleItems

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={carouselRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className={cn(
                "flex-shrink-0",
                `w-full sm:w-1/${itemsToShow.sm} md:w-1/${itemsToShow.md} lg:w-1/${itemsToShow.lg}`,
                "px-2",
                slideClassName,
              )}
              style={{ flex: `0 0 ${100 / visibleItems}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            disabled={!canGoBack}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all",
              canGoBack ? "hover:bg-yellow-600 opacity-100" : "opacity-50 cursor-not-allowed",
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            disabled={!canGoForward}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all",
              canGoForward ? "hover:bg-yellow-600 opacity-100" : "opacity-50 cursor-not-allowed",
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {showDots && totalItems > visibleItems && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalItems - visibleItems + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentIndex === index ? "bg-yellow-500 w-4" : "bg-gray-500 hover:bg-yellow-400",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
