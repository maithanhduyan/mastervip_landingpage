"use client"

import { useState, useEffect } from "react"
import { MobileNav } from "./mobile-nav"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  // Navigation links
  const links = [
    { href: "#about", label: "About" },
    { href: "#features", label: "Features" },
    { href: "#preview", label: "Preview" },
    { href: "#vip-cards", label: "VIP Cards" },
    { href: "#pilots", label: "Pilots" },
  ]

  // Get section IDs from links
  const sectionIds = links.map((link) => link.href.replace("#", ""))

  // Track active section
  const activeSection = useActiveSection(sectionIds)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-black bg-opacity-90 backdrop-blur-sm shadow-lg" : "bg-transparent",
        "border-b border-gray-800",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f9d423] to-[#d4af37] bg-clip-text text-transparent">
                MasterVIP
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors",
                  activeSection === link.href.replace("#", "")
                    ? "text-yellow-400 font-medium"
                    : "text-gray-300 hover:text-white",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <button className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-transparent border border-yellow-600 rounded-md hover:bg-yellow-600 hover:bg-opacity-20 transition-colors">
              Request Invite
            </button>

            {/* Mobile Navigation */}
            <MobileNav links={links} activeSection={activeSection} className="ml-4" />
          </div>
        </div>
      </div>
    </nav>
  )
}
