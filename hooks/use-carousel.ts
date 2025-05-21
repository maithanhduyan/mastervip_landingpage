"use client"

import { useState, useEffect, useCallback } from "react"

interface UseCarouselProps {
  totalItems: number
  itemsToShow: {
    sm?: number
    md?: number
    lg?: number
  }
  autoPlayInterval?: number
}

export function useCarousel({ totalItems, itemsToShow, autoPlayInterval = 0 }: UseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
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

  // Calculate if we can navigate in a direction
  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < totalItems - visibleItems

  return {
    currentIndex,
    visibleItems,
    setIsHovering,
    goToPrevious,
    goToNext,
    goToSlide,
    canGoBack,
    canGoForward,
  }
}
